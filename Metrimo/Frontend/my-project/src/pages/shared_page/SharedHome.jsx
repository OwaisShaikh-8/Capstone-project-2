import React, { useState } from "react";
import { CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from "../../assets/images/logo.png"
// ✅ Navbar Component
const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const LogoutHandler = () => logout();

  const navItems =
    user?.role === "customer"
      ? [
          { name: "Home", path: `/home/${user.id}` },
          { name: "Explore Venues", path: "/explorevenues" },
        ]
      : [
          { name: "Home", path: `/home/${user.id}` },
          { name: "Dashboard", path: "/dashboard" },
        ];

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 relative z-20">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2  w-[120px]">
         <img className="object-cover" src={logo} alt="" />
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout Button */}
        <button
          onClick={LogoutHandler}
          className="hidden md:flex items-center gap-2 text-gray-700 border px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all"
        >
          <CiLogout className="text-lg" /> Logout
        </button>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? "opacity-0" : ""}`} />
          <span className={`w-6 h-0.5 bg-gray-800 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-inner flex flex-col gap-3 p-4 border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-700 font-medium hover:text-red-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button
            onClick={LogoutHandler}
            className="flex items-center justify-center gap-2 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            <CiLogout className="text-lg" /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

// ✅ SharedHome Component
const SharedHome = () => {
  const { user } = useAuth();

  const content = {
    customer: {
      greeting: "Welcome back",
      headline: "Plan your perfect event with ease",
      description:
        "Discover and book stunning venues that match your event's style, theme, and budget. From small gatherings to grand celebrations, find your ideal space today.",
      cta: "Explore Venues",
      ctaLink: "/explorevenue",
      stats: [
        { number: "500+", label: "Venues" },
        { number: "10K+", label: "Events" },
        { number: "4.9★", label: "Rating" },
      ],
    },
    owner: {
      greeting: "Welcome to your workspace",
      headline: "Manage your venues effortlessly",
      description:
        "Track bookings, manage availability, and grow your business with powerful tools and analytics.",
      cta: "Go to Dashboard",
      ctaLink: "/odashboard",
      stats: [
        { number: "24/7", label: "Support" },
        { number: "Real-time", label: "Updates" },
        { number: "Secure", label: "Payments" },
      ],
    },
  };

  const current = content[user?.role] || content.customer;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      <Navbar />
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold">
            {current.greeting},{" "}
            <span className="text-red-600">{user?.name || "Guest"}</span> 👋
          </h1>
          <p className="text-lg md:text-xl text-gray-600">{current.headline}</p>
        </div>

        <p className="max-w-2xl mx-auto text-gray-500">{current.description}</p>

        <Link
          to={current.ctaLink}
          className="inline-block bg-red-600 text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-red-700 transition-all"
        >
          {current.cta}
        </Link>

        <div className="grid grid-cols-3 gap-6 pt-10 max-w-2xl mx-auto">
          {current.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-red-600">{stat.number}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SharedHome;
