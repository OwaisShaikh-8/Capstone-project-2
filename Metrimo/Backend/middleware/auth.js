import jwt from "jsonwebtoken";

// ==========================
// Protect routes - verify JWT
// ==========================
export const protect = (req, res, next) => {
  let token;

  // Get token from Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Check if token exists
  if (!token) {
    return res.status(401).json({
      message: "Not authorized. Please login to access this resource.",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      message: "Not authorized. Token is invalid or expired.",
    });
  }
};

// ==========================
// Restrict to owner role
// ==========================
export const ownerOnly = (req, res, next) => {
  if (req.user.role !== "owner") {
    return res.status(403).json({
      message: "Access denied. This resource is only available to venue owners.",
    });
  }
  next();
};

// ==========================
// Restrict to customer role
// ==========================
export const customerOnly = (req, res, next) => {
  if (req.user.role !== "customer") {
    return res.status(403).json({
      message: "Access denied. This resource is only available to customers.",
    });
  }
  next();
};

// ==========================
// Allow both roles (must be logged in)
// ==========================
export const authenticated = (req, res, next) => {
  if (!req.user || !req.user.id) {
    return res.status(401).json({
      message: "Authentication required.",
    });
  }
  next();
};
