// models/CustomBooking.js
import mongoose from "mongoose";

// Schema for each customization object
const customizationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Customization type is required"],
      trim: true,
    },
    value: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      min: [0, "Price cannot be negative"],
    },
  },
  { _id: false },
);

const BookingSchema = new mongoose.Schema(
  {
    venueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venue",
      required: [true, "Venue ID is required"],
      index: true,
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner ID is required"],
      index: true,
    },

    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Customer ID is required"],
      index: true,
    },
    customer: {
      type: String,
      required: [true, "Customer name is missing"],
    },

    date: {
      type: Date,
      required: [true, "Event date is required"],
    },

    guests: {
      type: Number,
      required: [true, "Number of guests is required"],
      min: [1, "At least 1 guest required"],
      max: [500, "Maximum guests exceeded"],
    },

    timeSlot: {
      type: String,
      enum: {
        values: ["noon", "evening"],
        message: "{VALUE} is not a valid time slot",
      },
      required: [true, "Time slot is required"],
    },

    customizations: {
      type: [customizationSchema],
      default: [],
      validate: {
        validator: function (arr) {
          return arr.length <= 20;
        },
        message: "Maximum 20 customizations allowed",
      },
    },

    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
      default: 0,
    },

    paymentReceipt: {
      url: {
        type: String,
        default: null,
      },
      publicId: {
        type: String,
        default: null,
      },
      uploadedAt: {
        type: Date,
        default: null,
      },
    },

    status: {
      type: String,
      enum: {
        values: ["pending", "accepted", "canceled", "completed"],
        message: "{VALUE} is not a valid status",
      },
      default: "pending",
      index: true,
    },

    cancellationReason: {
      type: String,
      default: null,
      maxlength: [500, "Cancellation reason too long"],
    },

    canceledAt: {
      type: Date,
      default: null,
    },

    acceptedAt: {
      type: Date,
      default: null,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// ============================
// INDEXES FOR BETTER PERFORMANCE
// ============================
BookingSchema.index({ ownerId: 1, status: 1 });
BookingSchema.index({ customerId: 1, status: 1 });
BookingSchema.index({ venueId: 1, date: 1 });
BookingSchema.index({ date: 1, timeSlot: 1 });

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
