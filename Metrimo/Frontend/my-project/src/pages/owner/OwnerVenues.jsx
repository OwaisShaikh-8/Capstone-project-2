// pages/OwnerVenues.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import VenueCard from "../../components/VenueCard";
import * as z from "zod";
import {
  FaTimes,
  FaImages,
  FaCheck,
  FaTrash,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";
import useVenue from "../../hooks/useVenues";

const AMENITIES_OPTIONS = [
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
];

// ---------------- Zod Schema ----------------
const venueSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(1, "Address is required"),
  capacity: z.number().min(1, "Capacity must be at least 1"),
  price: z.number().min(0, "Price cannot be negative"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const OwnerVenues = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [localError, setLocalError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Get owner ID from auth state

  // ---------------- useVenue Hook ----------------
  const {
    venues,
    isOwnerVenuesLoading,
    isCreateVenueLoading,
    isDeleteVenueLoading,
    createNewVenue,
    removeVenue,
    fetchOwnerVenues,
    isOwnerVenuesError,
    isCreateVenueError,
    isDeleteVenueError,
    ownerVenuesError,
    createVenueError,
    deleteVenueError,
  } = useVenue({
    shouldFetchOwnerVenues: true, // Auto-fetch owner's venues on mount
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(venueSchema),
    defaultValues: {
      name: "",
      city: "",
      address: "",
      capacity: 0,
      price: 0,
      description: "",
    },
  });

  // Clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // ---------------- Image Handling ----------------
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 10) {
      setLocalError("Maximum 10 images allowed");
      return;
    }

    const invalidFiles = files.filter((file) => file.size > 5 * 1024 * 1024);
    if (invalidFiles.length > 0) {
      setLocalError(
        `Some images exceed 5MB: ${invalidFiles.map((f) => f.name).join(", ")}`,
      );
      return;
    }

    setSelectedImages(files);
    setLocalError("");
  };

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  // ---------------- Form Submit ----------------
  const onSubmit = async (data) => {
    setLocalError("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("name", data.name.trim());
      formData.append("description", data.description.trim());
      formData.append("address", data.address.trim());
      formData.append("city", data.city.trim());
      formData.append("capacity", data.capacity);
      formData.append("pricePerDay", data.price);

      if (selectedAmenities.length > 0) {
        formData.append("amenities", JSON.stringify(selectedAmenities));
      }

      if (selectedImages.length > 0) {
        selectedImages.forEach((file) => formData.append("images", file));
      }
      console.log(formData);
      console.log("Submitting venue data...");

      // Call the API
      const response = await createNewVenue(formData);

      // Reset form and state on success
      reset();
      setSelectedImages([]);
      setSelectedAmenities([]);
      setShowAddForm(false);
      setSuccessMessage("🎉 Venue created successfully!");

      // Optionally refetch venues to ensure fresh data
      await fetchOwnerVenues();
    } catch (err) {
      console.error("Error creating venue:", err);
      setLocalError(
        err?.response?.data?.message ||
          err?.message ||
          "An unexpected error occurred",
      );
    }
  };

  // ---------------- Delete Venue ----------------
  const handleDeleteVenue = async (id, venueName) => {
    if (!window.confirm(`Are you sure you want to delete "${venueName}"?`)) {
      return;
    }

    setLocalError("");
    setSuccessMessage("");

    try {
      await removeVenue(id);
      setSuccessMessage("✅ Venue deleted successfully!");

      // Optionally refetch venues
      await fetchOwnerVenues();
    } catch (err) {
      console.error("Error deleting venue:", err);
      setLocalError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to delete venue",
      );
    }
  };

  // ---------------- Handle Form Close ----------------
  const handleCloseForm = () => {
    setShowAddForm(false);
    setLocalError("");
    setSuccessMessage("");
    setSelectedImages([]);
    setSelectedAmenities([]);
    reset();
  };

  // Combine errors - prioritize local error, then API errors
  const displayError =
    localError ||
    (isCreateVenueError && createVenueError?.message) ||
    (isDeleteVenueError && deleteVenueError?.message) ||
    (isOwnerVenuesError && ownerVenuesError?.message);

  // ---------------- Loading State ----------------
  if (isOwnerVenuesLoading && venues.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
        <p className="ml-4 text-gray-600">Loading your venues...</p>
      </div>
    );
  }

  // ---------------- Add Form View ----------------
  if (showAddForm) {
    return (
      <div className="h-full flex flex-col gap-6 text-gray-900 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-800">Add New Venue</h2>
          <button
            onClick={handleCloseForm}
            className="text-gray-600 hover:text-red-500 transition-all"
            disabled={isCreateVenueLoading}
          >
            <FaTimes size={24} />
          </button>
        </div>

        {displayError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center justify-between">
            <span>{displayError}</span>
            <button
              onClick={() => setLocalError("")}
              className="text-red-700 hover:text-red-900"
            >
              <FaTimes />
            </button>
          </div>
        )}

        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center justify-between">
            <span>{successMessage}</span>
            <button
              onClick={() => setSuccessMessage("")}
              className="text-green-700 hover:text-green-900"
            >
              <FaTimes />
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded-3xl p-8 border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Venue Name *</label>
            <input
              {...register("name")}
              placeholder="Enter venue name"
              className="w-full bg-gray-50 rounded-xl p-3 mt-2 border focus:border-red-400 outline-none"
              disabled={isCreateVenueLoading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="text-sm font-medium">City *</label>
            <input
              {...register("city")}
              placeholder="e.g., Karachi"
              className="w-full bg-gray-50 rounded-xl p-3 mt-2 border focus:border-red-400 outline-none"
              disabled={isCreateVenueLoading}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Address *</label>
            <input
              {...register("address")}
              placeholder="Full address"
              className="w-full bg-gray-50 rounded-xl p-3 mt-2 border focus:border-red-400 outline-none"
              disabled={isCreateVenueLoading}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Capacity */}
          <div>
            <label className="text-sm font-medium">Capacity (guests) *</label>
            <input
              type="number"
              {...register("capacity", { valueAsNumber: true })}
              placeholder="e.g., 500"
              className="w-full bg-gray-50 rounded-xl p-3 mt-2 border focus:border-red-400 outline-none"
              disabled={isCreateVenueLoading}
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.capacity.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className="text-sm font-medium">Price per Day (PKR) *</label>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              placeholder="e.g., 150000"
              className="w-full bg-gray-50 rounded-xl p-3 mt-2 border focus:border-red-400 outline-none"
              disabled={isCreateVenueLoading}
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Description *</label>
            <textarea
              {...register("description")}
              rows="4"
              placeholder="Describe your venue..."
              className="w-full bg-gray-50 rounded-xl p-3 mt-2 border focus:border-red-400 outline-none"
              disabled={isCreateVenueLoading}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Amenities */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-3 block">Amenities</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {AMENITIES_OPTIONS.map((amenity) => (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  disabled={isCreateVenueLoading}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all disabled:opacity-50 ${
                    selectedAmenities.includes(amenity)
                      ? "bg-red-50 border-red-500 text-red-700"
                      : "bg-gray-50 border-gray-300 text-gray-700 hover:border-red-400"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                      selectedAmenities.includes(amenity)
                        ? "bg-red-500 border-red-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAmenities.includes(amenity) && (
                      <FaCheck className="text-white text-xs" />
                    )}
                  </div>
                  <span className="text-sm">{amenity}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Upload Images</label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-red-400 transition-all">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
                id="fileUpload"
                disabled={isCreateVenueLoading}
              />
              <label
                htmlFor="fileUpload"
                className={`cursor-pointer ${
                  isCreateVenueLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaImages className="text-4xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">
                  Click to upload images (max 10, 5MB each)
                </p>
              </label>
              {selectedImages.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {selectedImages.map((file, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg"
                    >
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-4">
            <button
              type="button"
              onClick={handleCloseForm}
              disabled={isCreateVenueLoading}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-300 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreateVenueLoading}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isCreateVenueLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                "Add Venue"
              )}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // ---------------- Venues List View ----------------
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Venues</h2>
          <p className="text-gray-500 mt-1">
            {venues.length} {venues.length === 1 ? "venue" : "venues"} found
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
        >
          + Add New Venue
        </button>
      </div>

      {displayError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 flex items-center justify-between">
          <span>{displayError}</span>
          <button
            onClick={() => setLocalError("")}
            className="text-red-700 hover:text-red-900"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-4 flex items-center justify-between">
          <span>{successMessage}</span>
          <button
            onClick={() => setSuccessMessage("")}
            className="text-green-700 hover:text-green-900"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {venues.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <FaImages className="text-6xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-4">
            No venues yet. Add your first venue!
          </p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all"
          >
            Get Started
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(venues) &&
            venues.map((venue) => (
              <VenueCard
                key={venue._id}
                venue={venue}
                onDelete={handleDeleteVenue}
                isDeleting={isDeleteVenueLoading}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default OwnerVenues;
