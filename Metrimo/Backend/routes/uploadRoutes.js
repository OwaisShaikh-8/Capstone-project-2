import express from "express";
import { uploadProfile } from "../config/cloudinary.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/profile", protect, uploadProfile.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    res.json({
      success: true,
      url: req.file.path,
      publicId: req.file.filename,
      message: "Image uploaded successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      message: "Server error during upload",
      error: error.message,
    });
  }
});

export default router;
