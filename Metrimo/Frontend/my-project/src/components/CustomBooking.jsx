// CustomBookingForm.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaUtensils, FaCheckCircle } from "react-icons/fa";

// Zod schema
const customBookingSchema = z.object({
  date: z.string().nonempty("Event date is required"),
  guests: z
    .number({ invalid_type_error: "Guests must be a number" })
    .min(1, "At least 1 guest required")
    .max(500, "Maximum guests exceeded"),
  timeSlot: z.enum(["morning", "evening"], {
    errorMap: () => ({ message: "Please select a time slot" }),
  }),
  customizations: z
    .array(
      z.object({
        type: z.string(),
        value: z.string().optional(),
      })
    )
    .nonempty("At least one customization is required"),
});

const CustomBookingForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const customForm = useForm({
    resolver: zodResolver(customBookingSchema),
    defaultValues: {
      date: "",
      guests: "",
      timeSlot: "",
      customizations: [
        { type: "decoration", value: "" },
        { type: "food", value: "" },
        { type: "extraMeals", value: "" },
        { type: "waiters", value: "" },
        { type: "staff", value: "" },
        { type: "additionalRequests", value: "" },
      ],
    },
  });

  const handleFormSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // POST request to your API
      const response = await fetch("/api/custom-bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Custom booking submitted:", result);

      alert("Booking successfully submitted!");
      customForm.reset();
    } catch (error) {
      console.error("Failed to submit booking:", error);
      alert("Failed to submit booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-200  mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaUtensils className="text-blue-600 mr-3" />
        Customize Your Event
      </h2>

      <form
        onSubmit={customForm.handleSubmit(handleFormSubmit)}
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
            {...customForm.register("date")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {customForm.formState.errors.date && (
            <p className="mt-2 text-sm text-red-600">
              {customForm.formState.errors.date.message}
            </p>
          )}
        </div>

        {/* Number of Guests */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Number of Guests *
          </label>
          <input
            type="number"
            placeholder="Enter number of guests"
            {...customForm.register("guests", { valueAsNumber: true })}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
          {customForm.formState.errors.guests && (
            <p className="mt-2 text-sm text-red-600">
              {customForm.formState.errors.guests.message}
            </p>
          )}
        </div>

        {/* Time Slot */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Time Slot *
          </label>
          <select
            {...customForm.register("timeSlot")}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">Select time slot</option>
            <option value="morning">Morning</option>
            <option value="evening">Evening</option>
          </select>
          {customForm.formState.errors.timeSlot && (
            <p className="mt-2 text-sm text-red-600">
              {customForm.formState.errors.timeSlot.message}
            </p>
          )}
        </div>

        {/* Customizations */}
        <div className="space-y-6">
          {customForm.watch("customizations").map((item, index) => (
            <div key={item.type}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </label>
              <textarea
                placeholder={`Enter ${item.type} details`}
                rows={3}
                {...customForm.register(`customizations.${index}.value`)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <FaCheckCircle className="w-6 h-6" />
              Submit Query
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CustomBookingForm;
