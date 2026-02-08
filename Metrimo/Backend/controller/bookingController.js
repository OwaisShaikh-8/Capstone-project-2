// controllers/bookingController.js
import Booking from "../models/bookingSchema.js";
import { cloudinary } from "../config/cloudinary.js";

// Add a new booking (with payment receipt upload)
export const addBooking = async (req, res) => {
  console.log("add booking hit")
  try {
    const { ownerId, customerId,venueId,date,customer, guests, timeSlot, customizations = [], totalAmount = 0 } = req.body;

    // Prepare booking data
    const bookingData = {
      ownerId,
      customerId,
      customer,
      date,
      venueId,
      guests,
      timeSlot,
      customizations: typeof customizations === 'string' ? JSON.parse(customizations) : customizations,
      totalAmount,
    };

    // If payment receipt file is uploaded (via multer-storage-cloudinary)
    if (req.file) {
      // File is already uploaded to Cloudinary by multer middleware
      bookingData.paymentReceipt = {
        url: req.file.path, // Cloudinary URL
        publicId: req.file.filename, // Cloudinary public_id
        uploadedAt: new Date(),
      };
    }

    // Create new booking
    const newBooking = new Booking(bookingData);
    const savedBooking = await newBooking.save();

    res.status(201).json({ success: true, booking: savedBooking });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get bookings by owner
export const getBookingsByOwner = async (req, res) => {
  try {
    const  ownerId  = req.user.id;
    const bookings = await Booking.find({ ownerId });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get bookings by customer
export const getBookingsByCustomer = async (req, res) => {
  try {
    const { customerId } = req.user.id;
    const bookings = await Booking.find({ customerId });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update booking status by owner (accept booking)
export const updateBookingByOwner = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!["accepted"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status update" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, booking: updatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel booking by owner (also deletes payment receipt from Cloudinary)
export const cancelBookingByOwner = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Delete payment receipt from Cloudinary if exists
    if (booking.paymentReceipt?.publicId) {
      try {
        await cloudinary.uploader.destroy(booking.paymentReceipt.publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting receipt from Cloudinary:", cloudinaryError);
        // Continue with cancellation even if Cloudinary deletion fails
      }
    }

    // Update booking status to canceled
    booking.status = "canceled";
    booking.cancellationReason = reason || "Canceled by owner";
    booking.paymentReceipt = {
      url: null,
      publicId: null,
      uploadedAt: null,
    };

    await booking.save();

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel booking by customer (also deletes payment receipt from Cloudinary)
export const cancelBookingByCustomer = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Delete payment receipt from Cloudinary if exists
    if (booking.paymentReceipt?.publicId) {
      try {
        await cloudinary.uploader.destroy(booking.paymentReceipt.publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting receipt from Cloudinary:", cloudinaryError);
        // Continue with cancellation even if Cloudinary deletion fails
      }
    }

    // Update booking status to canceled
    booking.status = "canceled";
    booking.cancellationReason = reason || "Canceled by customer";
    booking.paymentReceipt = {
      url: null,
      publicId: null,
      uploadedAt: null,
    };

    await booking.save();

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete booking (completely removes booking and payment receipt)
export const deleteBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Delete payment receipt from Cloudinary if exists
    if (booking.paymentReceipt?.publicId) {
      try {
        await cloudinary.uploader.destroy(booking.paymentReceipt.publicId);
      } catch (cloudinaryError) {
        console.error("Error deleting receipt from Cloudinary:", cloudinaryError);
        // Continue with deletion even if Cloudinary deletion fails
      }
    }

    // Delete booking from database
    await Booking.findByIdAndDelete(bookingId);

    res.status(200).json({ 
      success: true, 
      message: "Booking and payment receipt deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Check venue availability for a specific date and time slot
export const checkAvailability = async (req, res) => {
  console.log("check hit")
  try {
    const { venueId } = req.params;
    const { date, timeSlot } = req.query; // ✅ Changed from req.body to req.query

    if (!venueId || !date || !timeSlot) {
      return res.status(400).json({ 
        success: false, 
        message: "venueId, date, and timeSlot are required" 
      });
    }

    // Validate timeSlot enum
    if (!["noon", "evening"].includes(timeSlot)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid time slot. Must be 'noon' or 'evening'" 
      });
    }

    // Parse and validate date
    const bookingDate = new Date(date);
    if (isNaN(bookingDate.getTime())) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid date format" 
      });
    }

    // Check if there's already a booking for this venue, date, and time slot
    // Only check pending and accepted bookings (not canceled or completed)
    const existingBooking = await Booking.findOne({
      venueId,
      date: bookingDate,
      timeSlot,
      status: { $in: ["pending", "accepted"] },
    });

    const available = !existingBooking;

    res.status(200).json({ 
      success: true, 
      available,
      message: available 
        ? "Venue is available for the selected date and time" 
        : "Venue is already booked for this date and time slot"
    });
  } catch (error) {
    console.error("Check availability error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};