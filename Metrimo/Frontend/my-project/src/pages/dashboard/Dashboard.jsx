import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import {
  HiRectangleStack,
  HiSparkles,
  HiBuildingOffice2,
} from "react-icons/hi2";
import {
  FaUserAlt,
  FaBars,
  FaTimes,
  FaEnvelope,
} from "react-icons/fa";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import logo from "../../assets/images/logo.png";

// ✅ Mock Avatar component
const Avatar = ({ name, size, color }) => {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div
      style={{
        width: size + "px",
        height: size + "px",
        borderRadius: "50%",
        backgroundColor: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: size > 50 ? "24px" : "14px",
      }}
    >
      {initials}
    </div>
  );
};

// ============================= DASHBOARD LAYOUT =============================

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Sidebar Overlay (Mobile) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 z-40 h-full w-72 md:w-[20%] bg-white p-6 flex flex-col justify-between transform transition-transform duration-300 shadow-xl border-r border-gray-200 ${
          menuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <img
            className="h-[50px] w-[180px] mx-auto mb-8"
            src={logo}
            alt="Logo"
          />

          <div className="mt-12 flex flex-col gap-3">
            {/* Profile */}
            <Link
              onClick={() => setMenuOpen(false)}
              to="/dashboard/profile"
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all ${
                isActive("profile")
                  ? "bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white"
                  : "hover:bg-[#e63946]/10"
              }`}
            >
              <FaUserAlt />
              <span className="font-medium">Profile</span>
            </Link>

            {/* My Venues */}
            <Link
              onClick={() => setMenuOpen(false)}
              to="/dashboard/ownervenues"
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all ${
                isActive("venues")
                  ? "bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white"
                  : "hover:bg-[#e63946]/10"
              }`}
            >
              <HiBuildingOffice2 />
              <span className="font-medium">My Venues</span>
            </Link>

            {/* Bookings */}
            <Link
              onClick={() => setMenuOpen(false)}
              to="/dashboard/bookings"
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all ${
                isActive("bookings")
                  ? "bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white"
                  : "hover:bg-[#e63946]/10"
              }`}
            >
              <HiRectangleStack />
              <span className="font-medium">Bookings</span>
            </Link>

            {/* Queries */}
            {/* <Link
              onClick={() => setMenuOpen(false)}
              to="/dashboard/queries"
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all ${
                isActive("queries")
                  ? "bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white"
                  : "hover:bg-[#e63946]/10"
              }`}
            >
              <FaEnvelope />
              <span className="font-medium">Queries</span>
            </Link> */}

            {/* Settings */}
            {/* <Link
              onClick={() => setMenuOpen(false)}
              to="/dashboard/settings"
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all ${
                isActive("settings")
                  ? "bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white"
                  : "hover:bg-[#e63946]/10"
              }`}
            >
              <HiSparkles />
              <span className="font-medium">Settings</span>
            </Link> */}
          </div>
        </div>

        {/* Back to Home */}
        <Link
          onClick={() => setMenuOpen(false)}
          to={`/home/${user?.id}`}
          className="flex items-center gap-3 px-5 py-3 hover:bg-[#e63946]/10 rounded-2xl transition-all border border-gray-300 hover:border-[#e63946]/50"
        >
          <MdOutlineArrowBackIosNew className="text-[#e63946]" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white h-[10%] flex items-center justify-between px-6 py-4 shadow-md border-b border-gray-200">
          <button
            className="md:hidden text-[#e63946] hover:bg-[#e63946]/10 p-2 rounded-lg transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
            Dashboard
          </h3>
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full border border-gray-200">
            <p className="text-sm md:text-base font-medium hidden sm:block">
              {user?.name}
            </p>
            <Avatar size="35" name={user?.name || "User"} color="#e63946" />
          </div>
        </div>

        {/* Main Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;