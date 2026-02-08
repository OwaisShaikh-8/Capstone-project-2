// routes/bookingRoutes.js
import express from "express";
import { uploadReceipt } from "../config/cloudinary.js";
import {
  addBooking,
  getBookingsByOwner,
  getBookingsByCustomer,
  updateBookingByOwner,
  cancelBookingByOwner,
  cancelBookingByCustomer,
  deleteBooking,
  checkAvailability
} from "../controller/bookingController.js";
import { protect, customerOnly, ownerOnly } from "../middleware/auth.js";

const router = express.Router();

// ========================
// BOOKING ROUTES
// ========================
router.get("/check-availability/:venueId", checkAvailability);
// Create booking with payment receipt upload
router.post(
  "/create",
  protect,
  customerOnly,
  uploadReceipt.single("paymentReceipt"), // Use your configured Cloudinary uploader
  addBooking
);

// Get bookings by owner
router.get("/getbyowner", protect, ownerOnly, getBookingsByOwner);

// Get bookings by customer
router.get("/getbycustomer", protect, customerOnly, getBookingsByCustomer);

// Update booking status by owner (accept booking)
router.put("/owner/:bookingId", protect, ownerOnly, updateBookingByOwner);

// Cancel booking by owner (deletes payment receipt too)
router.put("/owner/cancel/:bookingId", protect, ownerOnly, cancelBookingByOwner);

// Cancel booking by customer (deletes payment receipt too)
router.put("/customer/cancel/:bookingId", protect, customerOnly, cancelBookingByCustomer);

// Delete booking completely (deletes payment receipt too)
router.delete("/:bookingId", protect, deleteBooking);





export default router;