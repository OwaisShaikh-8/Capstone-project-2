import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ["customer", "owner"],
        message: "Role must be either customer or owner",
      },
      required: true,
    },
    profileImage: {
      type: String,
      default: "https://res.cloudinary.com/demo/image/upload/avatar-default.png",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for faster lookups
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });

const User = mongoose.model("User", userSchema);
export default User;
