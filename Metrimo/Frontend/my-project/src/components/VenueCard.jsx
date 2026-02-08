import React from "react";
import {
  FaImages,
  FaMapMarkerAlt,
  FaUsers,
  FaDollarSign,
  FaTrash,
} from "react-icons/fa";

const VenueCard = ({ venue, onDelete, isDeleting }) => {
  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all">
      <div className="relative h-48 bg-gray-200">
        {venue.images?.length > 0 ? (
          <img
            src={
              venue.images.find((img) => img.isPrimary)?.url ||
              venue.images[0].url
            }
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaImages className="text-gray-400 text-5xl" />
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
          {venue.status === "available" ? "🟢 Available" : "🔴 Unavailable"}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{venue.name}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <FaMapMarkerAlt className="mr-2 text-red-500" />
            {venue.city}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <FaUsers className="mr-2 text-blue-500" />
            {venue.capacity} guests
          </div>
          <div className="flex items-center text-gray-800 font-semibold">
            <FaDollarSign className="mr-2 text-green-500" />
            PKR {venue.pricePerDay?.toLocaleString()}/day
          </div>
        </div>

        {venue.amenities?.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Amenities:</p>
            <div className="flex flex-wrap gap-1">
              {venue.amenities.slice(0, 3).map((amenity, idx) => (
                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {amenity}
                </span>
              ))}
              {venue.amenities.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{venue.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onDelete(venue._id, venue.name)}
            disabled={isDeleting}
            className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Deleting...
              </>
            ) : (
              <>
                <FaTrash /> Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
