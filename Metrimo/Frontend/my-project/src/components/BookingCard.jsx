// components/BookingCard.jsx
import React from "react";
import useVenue from "../hooks/useVenues";
import {
  FaCalendar,
  FaUsers,
  FaDollarSign,
  FaClock,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaHourglassHalf,
  FaTimesCircle,
  FaBan,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingCard = ({ booking }) => {
  const navigate = useNavigate()
  const { venues } = useVenue();
  // Find venue details
  const venue = venues?.find((v) => v._id === booking?.venueId);
  const venueName = venue?.name || "Unknown Venue";
  const venueLocation = venue?.city || "";
  const venueImage = venue?.images?.[0].url || "/placeholder-venue.jpg";

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (amount == null) return "PKR 0";
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Get status configuration
  const getStatusConfig = (status) => {
    const configs = {
      accepted: {
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        badgeBg: "bg-green-100",
        badgeText: "text-green-700",
        icon: FaCheckCircle,
        iconColor: "text-green-600",
      },
      pending: {
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        badgeBg: "bg-yellow-100",
        badgeText: "text-yellow-700",
        icon: FaHourglassHalf,
        iconColor: "text-yellow-600",
      },
      rejected: {
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        badgeBg: "bg-red-100",
        badgeText: "text-red-700",
        icon: FaTimesCircle,
        iconColor: "text-red-600",
      },
      completed: {
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        badgeBg: "bg-blue-100",
        badgeText: "text-blue-700",
        icon: FaCheckCircle,
        iconColor: "text-blue-600",
      },
      cancelled: {
        bgColor: "bg-gray-50",
        borderColor: "border-gray-300",
        badgeBg: "bg-gray-100",
        badgeText: "text-gray-700",
        icon: FaBan,
        iconColor: "text-gray-600",
      },
    };
    return configs[status] || configs.pending;
  };

  const getPaymentConfig = (status) => {
    const configs = {
      paid: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        border: "border-emerald-300",
      },
      pending: {
        bg: "bg-orange-100",
        text: "text-orange-700",
        border: "border-orange-300",
      },
      failed: {
        bg: "bg-rose-100",
        text: "text-rose-700",
        border: "border-rose-300",
      },
    };
    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(booking?.status);
  const paymentConfig = getPaymentConfig(booking?.paymentStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <div
    onClick={() => navigate(`/bookingdetails/${booking._id}`)}
      className={`rounded-3xl border-2 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer  ${statusConfig.borderColor}`}
    >
      {/* Venue Image Header */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={venueImage}
          alt={venueName}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/placeholder-venue.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Status Badge Overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg backdrop-blur-sm ${statusConfig.badgeBg} ${statusConfig.badgeText} border ${statusConfig.borderColor}`}
          >
            <StatusIcon className="text-sm" />
            {booking?.status?.toUpperCase() || "Nan"}
          </span>
          
        </div>

        {/* Venue Name on Image */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-xl text-white drop-shadow-lg">
            {venueName}
          </h3>
          {venueLocation && (
            <div className="flex items-center text-white/90 text-sm mt-1 drop-shadow">
              <FaMapMarkerAlt className="mr-1" />
              <span>{venueLocation}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className={`p-6 ${statusConfig.bgColor}`}>
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Date */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-red-500 to-pink-500 p-2.5 rounded-lg">
                <FaCalendar className="text-white text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Booking Date
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatDate(booking?.date)}
                </p>
              </div>
            </div>
          </div>

          {/* Shift */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-amber-500 p-2.5 rounded-lg">
                <FaClock className="text-white text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Shift</p>
                <p className="text-sm font-semibold text-gray-900 capitalize">
                  {booking?.timeSlot || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Guest Count */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-2.5 rounded-lg">
                <FaUsers className="text-white text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Guests</p>
                <p className="text-sm font-semibold text-gray-900">
                  {booking?.guests || "Nan"} People
                </p>
              </div>
            </div>
          </div>

          {/* Total Amount */}
          <div className="bg-white rounded-xl p-3 border border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-emerald-500 to-green-500 p-2.5 rounded-lg">
                <FaDollarSign className="text-white text-lg" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total</p>
                <p className="text-sm font-semibold text-gray-900">
                  {formatCurrency(booking?.totalAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t border-gray-300">
          <div className="flex justify-between items-center text-xs text-gray-600">
            <span>
              Created: {booking?.createdAt ? new Date(booking.createdAt).toLocaleDateString() : "N/A"}
            </span>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">
              #{booking?._id?.slice(-8) || "--------"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
