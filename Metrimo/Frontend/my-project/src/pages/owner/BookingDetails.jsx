// pages/owner/BookingDetails.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useBooking from "../../hooks/useBookings";
import useVenue from "../../hooks/useVenues";
import {
  FaCalendar,
  FaUsers,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowLeft,
  FaUser,
  FaInfoCircle,
  FaBan,
} from "react-icons/fa";

const BookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { bookings, acceptBookingByOwner, cancelBookingOwner, isAcceptingBooking, isCancelingByOwner } = useBooking({
    shouldFetchByOwner: true,
  });
  const { venues } = useVenue();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [actionType, setActionType] = useState(null);

  const booking = bookings?.find((b) => b._id === bookingId);
  const venue = venues?.find((v) => v._id === booking?.venueId);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="text-center">
          <FaInfoCircle className="text-6xl text-gray-300 mb-4 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Not Found</h2>
          <button
            onClick={() => navigate("/owner/bookings")}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
          >
            Back to Bookings
          </button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status) => {
    const colors = {
      accepted: "bg-green-100 text-green-700",
      pending: "bg-yellow-100 text-yellow-700",
      rejected: "bg-red-100 text-red-700",
      cancelled: "bg-gray-100 text-gray-700",
    };
    return colors[status] || colors.pending;
  };

  const handleAcceptBooking = async () => {
    await acceptBookingByOwner(booking._id);
    setShowConfirmModal(false);
    setActionType(null);
  };

  const handleRejectBooking = async () => {
    await cancelBookingOwner(booking._id);
    setShowConfirmModal(false);
    setActionType(null);
  };

  const handleConfirmAction = async () => {
    if (actionType === "accept") {
      await handleAcceptBooking();
    } else if (actionType === "reject") {
      await handleRejectBooking();
    }
  };

  const openConfirmModal = (type) => {
    setActionType(type);
    setShowConfirmModal(true);
  };

  const isProcessing = isAcceptingBooking || isCancelingByOwner;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/bookings")}
          className="flex items-center gap-2 text-gray-600 hover:text-red-500 mb-4"
        >
          <FaArrowLeft /> Back to Bookings
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Booking Details</h1>
            <p className="text-gray-600">ID: #{booking._id.slice(-8)}</p>
          </div>
          <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(booking.status)}`}>
            {booking.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Venue Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" /> Venue Information
            </h2>
            <div className="flex gap-4">
              {venue?.images?.[0]?.url && (
                <img
                  src={venue.images[0].url}
                  alt={venue.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div>
                <h3 className="text-lg font-bold">{venue?.name || "Unknown Venue"}</h3>
                <p className="text-gray-600">{venue?.address}</p>
                <p className="text-gray-600">{venue?.city}</p>
                <p className="text-gray-600">Capacity: {venue?.capacity} guests</p>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaCalendar className="text-purple-500" /> Event Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Event Date</p>
                <p className="font-semibold">{formatDate(booking.date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Shift</p>
                <p className="font-semibold capitalize">{booking.timeSlot}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Guests</p>
                <p className="font-semibold">{booking.guests} People</p>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Details</h2>
            <div className="space-y-3">
              <figure className="flex justify-center flex-col items-center text-center mb-4">
                <figcaption className="text-sm text-gray-600 mb-2">Payment Receipt</figcaption>
                <img 
                  src={booking.paymentReceipt.url} 
                  alt="Payment Receipt" 
                  className="max-w-full h-auto rounded-lg border border-gray-200"
                />
              </figure>
              <div className="flex justify-between">
                <span>Venue Rental</span>
                <span className="font-semibold">{formatCurrency(booking.totalAmount)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center bg-red-50 p-3 rounded">
                <span className="font-bold">Total Amount</span>
                <span className="text-xl font-bold text-red-600">
                  {formatCurrency(booking.totalAmount)}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Payment Status</p>
                <p className={`font-semibold capitalize ${
                  booking.paymentStatus === "paid" ? "text-green-600" : "text-orange-600"
                }`}>
                  {booking.paymentStatus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUser className="text-blue-500" /> Customer Info
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-semibold">{booking.customer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Customer ID</p>
                <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">{booking.customerId}</p>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Booking Info</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-500">Created</p>
                <p className="font-semibold">{new Date(booking.createdAt).toLocaleString()}</p>
              </div>
              {booking.acceptedAt && (
                <div>
                  <p className="text-gray-500">Accepted</p>
                  <p className="font-semibold">{new Date(booking.acceptedAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          {booking.status === "pending" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-800 mb-4">Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => openConfirmModal("accept")}
                  disabled={isProcessing}
                  className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaCheckCircle />
                  {isAcceptingBooking ? "Processing..." : "Accept Booking"}
                </button>
                <button
                  onClick={() => openConfirmModal("reject")}
                  disabled={isProcessing}
                  className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <FaTimesCircle />
                  {isCancelingByOwner ? "Processing..." : "Reject Booking"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                actionType === "accept" ? "bg-green-100" : "bg-red-100"
              }`}>
                {actionType === "accept" ? (
                  <FaCheckCircle className="text-3xl text-green-600" />
                ) : (
                  <FaTimesCircle className="text-3xl text-red-600" />
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {actionType === "accept" ? "Accept Booking?" : "Reject Booking?"}
              </h3>
              <p className="text-gray-600">
                {actionType === "accept"
                  ? "Confirm that you want to accept this booking."
                  : "This action cannot be undone. Are you sure you want to reject this booking?"}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setActionType(null);
                }}
                disabled={isProcessing}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                disabled={isProcessing}
                className={`flex-1 text-white py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                  actionType === "accept" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {isProcessing ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;