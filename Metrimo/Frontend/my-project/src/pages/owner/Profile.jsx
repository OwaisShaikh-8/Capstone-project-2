import React from "react";
import { useAuth } from "../../hooks/useAuth";
import Avatar from "react-avatar";
import { HiSparkles, HiBuildingOffice2 } from "react-icons/hi2";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import useVenue from "../../hooks/useVenues";

export const Profile = () => {
  const { user } = useAuth();
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

  return (
    <div className="h-full flex flex-col gap-6 text-gray-900 animate-fade-in">
      {/* ✅ Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-1 bg-gradient-to-b from-[#e63946] to-[#ff6b6b] rounded-full"></div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent">
          Vendor Profile
        </h2>
      </div>

      {/* ✅ Profile Card */}
      <div className="relative bg-white border border-gray-200 shadow-md rounded-3xl p-8 hover:shadow-xl transition-all">
        <div className="relative flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <Avatar name={user?.name || "User"} size="100" color="#e63946" />
            <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>
          <div className="flex flex-col gap-2 text-center sm:text-left">
            <h3 className="text-2xl font-bold flex items-center gap-2 justify-center sm:justify-start">
              {user?.name || "Vendor Name"}
              <HiSparkles className="text-[#e63946] animate-pulse" />
            </h3>
            <p className="text-gray-500 text-sm">{user?.email || "vendor@email.com"}</p>
          </div>
        </div>
      </div>

      {/* ✅ Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-[#e63946]/50 hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-[#e63946]/10 p-3 rounded-xl">
              <HiBuildingOffice2 className="text-[#e63946] text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Total Venues</p>
              <p className="text-2xl font-bold">5</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-green-500/50 hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/10 p-3 rounded-xl">
              <FaCheckCircle className="text-green-500 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Active Bookings</p>
              <p className="text-2xl font-bold">15</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-yellow-500/50 hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-500/10 p-3 rounded-xl">
              <FaClock className="text-yellow-500 text-2xl" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Pending Requests</p>
              <p className="text-2xl font-bold">7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
