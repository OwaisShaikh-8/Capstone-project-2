import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt, FaUsers, FaWifi, FaParking, FaSnowflake, FaUtensils,
  FaGuitar, FaLightbulb, FaShieldAlt, FaVolumeUp, FaRestroom, FaBolt
} from "react-icons/fa";
import useVenue from "../../hooks/useVenues";

const ExploreVenues = () => {
  const [selectedCity, setSelectedCity] = useState("Karachi"); // Default city
  const [searchTerm, setSearchTerm] = useState("");

  const { venues = [], fetchVenuesByCity, isCityVenuesLoading } = useVenue({
    city: selectedCity,
    shouldFetchCityVenues: true,
  });

  const cities = ["Karachi", "Lahore", "Islamabad", "Hyderabad"];

  const amenityIcons = {
    "Parking": FaParking,
    "Wi-Fi": FaWifi,
    "Air Conditioning": FaSnowflake,
    "Catering": FaUtensils,
    "Stage": FaGuitar,
    "Lighting": FaLightbulb,
    "Security": FaShieldAlt,
    "Sound System": FaVolumeUp,
    "Restrooms": FaRestroom,
    "Generator Backup": FaBolt,
  };

  // Safe filtered venues
  const filteredVenues = (venues || []).filter(
    (venue) => venue.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Explore Venues
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover, filter, and check live availability for premium event venues across Pakistan.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search venues..."
          className="flex-1 px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search venues"
        />
        <select
          className="px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          aria-label="Filter by city"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Venues Grid with Loader */}
      <div className="max-w-7xl mx-auto">
        {isCityVenuesLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}

        {!isCityVenuesLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => {
                const primaryImage =
                  venue.images?.find((img) => img.isPrimary)?.url ||
                  venue.images?.[0]?.url ||
                  "/placeholder-venue.jpg";

                const amenities = venue.amenities || [];

                return (
                  <div key={venue._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={primaryImage}
                        alt={venue.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
                        {formatPrice(venue.pricePerDay)}/day
                      </div>
                      {venue.images?.length > 1 && (
                        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
                          +{(venue.images.length || 0) - 1} photos
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{venue.name || "Untitled Venue"}</h3>

                      <div className="flex items-center text-gray-600 mb-2">
                        <FaMapMarkerAlt className="mr-2 text-red-500" />
                        <span className="text-sm">{venue.address || "Address not available"}, {venue.city || "City unknown"}</span>
                      </div>

                      <div className="flex items-center text-gray-600 mb-4">
                        <FaUsers className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium">
                          Capacity: {venue.capacity || 0} guests
                        </span>
                      </div>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {venue.description || "No description available."}
                      </p>

                      {amenities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {amenities.slice(0, 4).map((amenity, idx) => {
                            const Icon = amenityIcons[amenity];
                            return (
                              <div
                                key={idx}
                                className="flex items-center bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700"
                              >
                                {Icon && <Icon className="mr-1" />}
                                {amenity}
                              </div>
                            );
                          })}
                          {amenities.length > 4 && (
                            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full text-xs text-blue-700 font-medium">
                              +{amenities.length - 4} more
                            </div>
                          )}
                        </div>
                      )}

                      <Link to={`/venues/${venue._id}`}>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                          View Details & Book
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🏛️</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No venues found in {selectedCity}.
                </h3>
                <p className="text-gray-500">
                  Try selecting a different city or adjusting your search term.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreVenues;
