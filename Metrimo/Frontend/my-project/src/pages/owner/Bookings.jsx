// pages/owner/Bookings.jsx
import React from "react";
import BookingCard from "../../components/BookingCard";
import useBooking from "../../hooks/useBookings";
import { FaSyncAlt, FaBan } from "react-icons/fa";
import useVenue from "../../hooks/useVenues";

const Bookings = () => {
   const {} = useVenue({
      shouldFetchOwnerVenues: true, // Auto-fetch owner's venues on mount
    });
  const { bookings, refetchOwnerBookings, isFetchingByOwner } = useBooking({
    shouldFetchByOwner: true,
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">My Bookings</h2>
            <p className="text-gray-500 mt-1">
              {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}{" "}
              found
            </p>
          </div>

          <button
            onClick={refetchOwnerBookings}
            disabled={isFetchingByOwner}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2 justify-center"
          >
            <FaSyncAlt
              className={`${isFetchingByOwner ? "animate-spin" : ""}`}
            />
            {isFetchingByOwner ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isFetchingByOwner && bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-gray-200">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-500 mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Loading your bookings...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!isFetchingByOwner && bookings.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-300">
          <FaBan className="text-6xl text-gray-300 mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No bookings found
          </h3>
          <p className="text-gray-500 text-center max-w-md">
            You haven't received any bookings yet. Share your venues to get
            started!
          </p>
        </div>
      )}

      {/* Bookings Grid */}
      {!isFetchingByOwner && bookings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;