import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv" 


dotenv.config();
// ==========================
// Configure Cloudinary
// ==========================
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const receiptStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "venue-booking/receipt",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// ==========================
// Venue Image Storage
// ==========================
const venueStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "venue-booking/venues",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  },
});

// ==========================
// Multer Upload Configurations
// ==========================
export const uploadReceipt = multer({
  storage: receiptStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

export const uploadVenue = multer({
  storage: venueStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Export Cloudinary instance
export { cloudinary };
