// NormalBookingForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCheckCircle } from "react-icons/fa";
import useVenue from "../hooks/useVenues";
import { useAuth } from "../hooks/useAuth";
import useBooking from "../hooks/useBookings";
import PaymentReceiptModal from "./PaymentReceiptModal";
import toast from "react-hot-toast";

const normalBookingSchema = z.object({
  date: z.string().min(1, "Event date is required"),
  guests: z
    .number({ invalid_type_error: "Guests must be a number" })
    .min(1, "At least 1 guest required")
    .max(500, "Maximum guests exceeded"),
  timeSlot: z.enum(["noon", "evening"], {
    errorMap: () => ({ message: "Please select a time slot" }),
  }),
});

const NormalBookingForm = () => {
  const { createBooking, isCreatingBooking } = useBooking();
  const { user } = useAuth();
  const { activeVenue } = useVenue();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const normalForm = useForm({
    resolver: zodResolver(normalBookingSchema),
    defaultValues: {
      date: "",
      guests: "",
      timeSlot: "",
    },
  });

  // Open payment modal
  const handleFormSubmit = (data) => {
    if (!activeVenue || !user) {
      toast.error("Missing venue or user information");
      return;
    }

    const payload = {
      ...data,
      venueId: activeVenue._id,
      venueName: activeVenue.name,
      ownerId: activeVenue.ownerId._id,
      customer:user.name,
      customerId: user.id,
      totalAmount: activeVenue.pricePerDay,
      customizations: [],
    };

    setBookingData(payload);
    setIsModalOpen(true);
  };

  // Final booking creation (ONLY place API is called)
  const handleReceiptSubmit = async (receiptFile) => {
    if (!bookingData || !receiptFile) {
      toast.error("Missing booking data or receipt file");
      return;
    }

    try {
      const formData = new FormData();

      // Append all booking data
      formData.append("venueId", bookingData.venueId);
      formData.append("ownerId", bookingData.ownerId);
      formData.append("customerId", bookingData.customerId);
      formData.append("customer", bookingData.customer);
      formData.append("date", bookingData.date);
      formData.append("guests", bookingData.guests);
      formData.append("timeSlot", bookingData.timeSlot);
      formData.append("totalAmount", bookingData.totalAmount);
      formData.append(
        "customizations",
        JSON.stringify(bookingData.customizations)
      );
      formData.append("paymentReceipt", receiptFile);

      // Log FormData for debugging (optional)
      console.log("Submitting booking with data:");
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await createBooking(formData);

      toast.success("Booking created successfully! Waiting for owner approval.");
      
      // Reset form and close modal
      setIsModalOpen(false);
      normalForm.reset();
      setBookingData(null);
    } catch (error) {
      console.error("Booking creation error:", error);
      toast.error(error?.message || "Failed to create booking");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    // Don't clear bookingData here in case user wants to retry
  };

  // Safety check for activeVenue
  if (!activeVenue) {
    return (
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <p className="text-gray-600 text-center">No venue selected</p>
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <FaCheckCircle className="text-red-600 mr-3" />
          Complete Your Normal Booking
        </h2>

        <form
          onSubmit={normalForm.handleSubmit(handleFormSubmit)}
          className="space-y-6"
        >
          {/* Event Date */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Event Date *
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              {...normalForm.register("date")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
            {normalForm.formState.errors.date && (
              <p className="mt-2 text-sm text-red-600">
                {normalForm.formState.errors.date.message}
              </p>
            )}
          </div>

          {/* Guests */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Number of Guests *
            </label>
            <input
              type="number"
              min="1"
              max="500"
              placeholder="Enter number of guests"
              {...normalForm.register("guests", { valueAsNumber: true })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            />
            {normalForm.formState.errors.guests && (
              <p className="mt-2 text-sm text-red-600">
                {normalForm.formState.errors.guests.message}
              </p>
            )}
          </div>

          {/* Time Slot */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Time Slot *
            </label>
            <select
              {...normalForm.register("timeSlot")}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            >
              <option value="">Select time slot</option>
              <option value="noon">Noon</option>
              <option value="evening">Evening</option>
            </select>
            {normalForm.formState.errors.timeSlot && (
              <p className="mt-2 text-sm text-red-600">
                {normalForm.formState.errors.timeSlot.message}
              </p>
            )}
          </div>

          {/* Amount */}
          <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-semibold text-lg">
                Total Amount:
              </span>
              <span className="text-3xl font-bold text-red-600">
                ₹{activeVenue.pricePerDay?.toLocaleString() || "0"}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isCreatingBooking}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-lg font-bold text-lg hover:from-red-700 hover:to-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaCheckCircle className="inline mr-2" />
            {isCreatingBooking ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>

      <PaymentReceiptModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleReceiptSubmit}
        isLoading={isCreatingBooking}
        bookingData={bookingData}
      />
    </>
  );
};

export default NormalBookingForm;