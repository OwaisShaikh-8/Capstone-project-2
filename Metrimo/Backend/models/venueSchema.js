import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, "Venue name is required"],
      trim: true,
      minlength: [3, "Venue name must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
      index: true,
    },
    capacity: {
      type: Number,
      required: [true, "Capacity is required"],
      min: [1, "Capacity must be at least 1"],
    },
    pricePerDay: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    amenities: {
      type: [String],
      default: [],
      enum: [
        "Parking",
        "Wi-Fi",
        "Air Conditioning",
        "Catering",
        "Stage",
        "Lighting",
        "Security",
        "Sound System",
        "Restrooms",
        "Generator Backup",
      ],
    },
  },
  { timestamps: true }
);

// ✅ Indexes
venueSchema.index({ city: 1, status: 1 });
venueSchema.index({ pricePerDay: 1 });
venueSchema.index({ capacity: 1 });
venueSchema.index({ name: "text", description: "text", city: "text" });

const Venue = mongoose.model("Venue", venueSchema);

export default Venue;
