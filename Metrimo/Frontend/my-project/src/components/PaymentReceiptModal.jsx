// PaymentReceiptModal.jsx
import React, { useState, useRef } from "react";
import {
  FaTimes,
  FaUpload,
  FaCheckCircle,
  FaFileImage,
  FaCalendarAlt,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTrash,
} from "react-icons/fa";

const PaymentReceiptModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  bookingData,
}) => {
  const [receiptFile, setReceiptFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setError("");

    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG, and WEBP images are allowed");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setReceiptFile(file);
    
    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = () => {
    setReceiptFile(null);
    setPreviewUrl(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!receiptFile) {
      setError("Please upload a payment receipt");
      return;
    }

    onSubmit(receiptFile);
  };

  const handleClose = () => {
    if (!isLoading) {
      handleRemoveFile();
      onClose();
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTimeSlot = (slot) => {
    if (!slot) return "N/A";
    return slot.charAt(0).toUpperCase() + slot.slice(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <FaUpload className="text-red-600" />
            Complete Your Booking
          </h3>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-500 hover:text-gray-700 transition disabled:opacity-50"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-6">
          {/* BOOKING SUMMARY */}
          {bookingData && (
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border border-red-200">
              <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-red-600" />
                Booking Summary
              </h4>
              
              <div className="space-y-3">
                {/* Venue Name */}
                {bookingData.venueName && (
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-red-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600">Venue</p>
                      <p className="font-semibold text-gray-800">
                        {bookingData.venueName}
                      </p>
                    </div>
                  </div>
                )}

                {/* Event Date */}
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Event Date</p>
                    <p className="font-semibold text-gray-800">
                      {formatDate(bookingData.date)}
                    </p>
                  </div>
                </div>

                {/* Time Slot */}
                <div className="flex items-start gap-3">
                  <FaClock className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Time Slot</p>
                    <p className="font-semibold text-gray-800">
                      {formatTimeSlot(bookingData.timeSlot)}
                    </p>
                  </div>
                </div>

                {/* Number of Guests */}
                <div className="flex items-start gap-3">
                  <FaUsers className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Number of Guests</p>
                    <p className="font-semibold text-gray-800">
                      {bookingData.guests} guests
                    </p>
                  </div>
                </div>

                {/* Total Amount */}
                <div className="flex items-start gap-3 pt-3 border-t border-red-200">
                  <FaMoneyBillWave className="text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-red-600">
                      ₹{bookingData.totalAmount?.toLocaleString() || "0"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FILE UPLOAD SECTION */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Upload Payment Receipt *
            </h4>
            
            {!receiptFile ? (
              <div
                onClick={() => !isLoading && fileInputRef.current?.click()}
                className={`border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition hover:border-red-400 hover:bg-red-50 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <FaFileImage className="mx-auto text-6xl text-gray-400 mb-4" />
                <p className="text-gray-700 font-medium mb-1">
                  Click to upload receipt
                </p>
                <p className="text-sm text-gray-500">
                  JPG, PNG, or WEBP (Max 5MB)
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={isLoading}
                />
              </div>
            ) : (
              <div className="border-2 border-green-300 rounded-xl p-4 bg-green-50">
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Payment receipt preview"
                    className="w-full h-64 object-contain rounded-lg bg-white"
                  />
                  <button
                    onClick={handleRemoveFile}
                    disabled={isLoading}
                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition disabled:opacity-50"
                  >
                    <FaTrash />
                  </button>
                </div>
                <div className="mt-3 flex items-center gap-2 text-green-700">
                  <FaCheckCircle />
                  <span className="font-medium">{receiptFile.name}</span>
                  <span className="text-sm text-gray-600">
                    ({(receiptFile.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
              </div>
            )}

            {error && (
              <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                <FaTimes />
                {error}
              </p>
            )}
          </div>

          {/* INSTRUCTIONS */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> Please upload a clear image of your payment receipt. 
              Your booking will be reviewed by the venue owner and confirmed once approved.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading || !receiptFile}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-6 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <FaCheckCircle />
                Confirm Booking
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceiptModal;