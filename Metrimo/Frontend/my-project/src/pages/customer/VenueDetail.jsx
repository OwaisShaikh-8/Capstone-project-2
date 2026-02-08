import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import useVenue from "../../hooks/useVenues";
import useBooking from "../../hooks/useBookings";
// import CustomBookingForm from "../../components/CustomBooking";
import NormalBookingForm from "../../components/NormelBooking"; // Fixed typo
import {
  FaMapMarkerAlt,
  FaUsers,
  FaParking,
  FaWifi,
  FaSnowflake,
  FaUtensils,
  FaGuitar,
  FaLightbulb,
  FaShieldAlt,
  FaVolumeUp,
  FaRestroom,
  FaBolt,
} from "react-icons/fa";

const VenueDetail = () => {
  const { id } = useParams();
  const { activeVenue } = useVenue({
    venueId: id,
    shouldFetchActiveVenue: true,
  });
  const venue = activeVenue;
  const {checkVenueAvailability} = useBooking();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");

  const handleCheckAvailability = async () => {
    if (!date || !timeSlot) {
      toast.warning("Please select both date and time slot");
      return;
    }

    try {
        await checkVenueAvailability({
        venueId:id, 
        date,
        timeSlot,
      });

    } catch (error) {
      
    }
  };

  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading venue details...</p>
      </div>
    );
  }

  const venueImages = venue.images?.map((img) => img.url) || [];
  const currentImage =
    venueImages[selectedImageIndex] || "/placeholder-venue.jpg";

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const amenityIcons = {
    Parking: FaParking,
    "Wi-Fi": FaWifi,
    "Air Conditioning": FaSnowflake,
    Catering: FaUtensils,
    Stage: FaGuitar,
    Lighting: FaLightbulb,
    Security: FaShieldAlt,
    "Sound System": FaVolumeUp,
    Restrooms: FaRestroom,
    "Generator Backup": FaBolt,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 md:px-20">
      <Link
        to="/explorevenues"
        className="text-red-600 hover:underline mb-8 inline-block"
      >
        ← Back to Explore
      </Link>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Image Gallery */}
        <div className="lg:w-1/2">
          <div className="relative mb-4 rounded-2xl overflow-hidden shadow-xl">
            <img
              src={currentImage}
              alt={venue.name}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-semibold shadow-lg">
              {formatPrice(venue.pricePerDay)}/day
            </div>
          </div>

          {venueImages.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {venueImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`rounded-lg overflow-hidden transition-all ${
                    selectedImageIndex === idx
                      ? "ring-4 ring-red-600 shadow-lg"
                      : "ring-2 ring-gray-200 hover:ring-red-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Venue Info */}
        <div className="lg:w-1/2 flex flex-col justify-between bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div>
            <h1 className="text-4xl font-bold mb-3 text-gray-900">
              {venue.name}
            </h1>
            <div className="flex items-center text-gray-600 mb-2">
              <FaMapMarkerAlt className="text-red-600 mr-2" />
              <span>
                {venue.address}, {venue.city}
              </span>
            </div>
            <div className="inline-flex items-center bg-red-50 text-red-700 px-4 py-2 rounded-lg mb-4 font-medium">
              <FaUsers className="mr-2" />
              Capacity: {venue.capacity} Guests
            </div>
            <p className="text-gray-700 mb-6">{venue.description}</p>

            {/* Amenities */}
            {venue.amenities?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Available Amenities
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {venue.amenities.map((amenity, idx) => {
                    const Icon = amenityIcons[amenity];
                    return (
                      <div
                        key={idx}
                        className="flex items-center bg-gray-50 text-gray-700 px-3 py-2 rounded-lg border border-gray-200"
                      >
                        {Icon && <Icon className="text-red-600 mr-2" />}
                        <span className="text-sm font-medium">{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Availability Input */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Check Availability
              </label>

              {/* Date Picker */}
              <input
                type="date"
                min={new Date().toISOString().split("T")[0]}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 mb-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />

              {/* Time Slot Select */}
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-4 py-3 mb-4 border-2 border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              >
                <option value="">Select Time Slot</option>
                <option value="noon">Noon</option>
                <option value="evening">Evening</option>
              </select>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleCheckAvailability}
                disabled={!date || !timeSlot}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold
                 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed
                 transition"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div className="mt-10">
        <NormalBookingForm venue={venue} date={date} timeSlot={timeSlot} />
      </div>
    </div>
  );
};

export default VenueDetail;