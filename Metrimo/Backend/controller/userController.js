import bcrypt from "bcryptjs";
import { generateToken } from "../config/jwt.js";
import User from "../models/userSchema.js";

// ✅ Generate JWT Token


// ✅ Register new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const { name, email, password, phone,confirmPassword, role } = req.body;

    // Validation
    if (!name || !email || !password || !phone || !role) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }


    if (password !== confirmPassword) {
      return res.status(400).jsom({
        message:"passwords not match",
        success:false
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email is already registered",
        success: false,
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      message:`Welcome to Metrimo ${user.name}`,
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// ✅ Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
        success: false,
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

   

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Generate token
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      message:`welcome back ${user.name}`,
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Server error during login",
      error: error.message,
    });
  }
};

// ✅ Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("GetMe error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const { name, phone, profileImage } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Update fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (profileImage) user.profileImage = profileImage;

    await user.save();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      message: "Server error during profile update",
      error: error.message,
    });
  }
};

// ✅ Change password
// @route   PUT /api/auth/change-password
// @access  Private
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Please provide both current and new password",
        success: false,
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Current password is incorrect",
        success: false,
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({
      message: "Server error during password change",
      error: error.message,
    });
  }
};
