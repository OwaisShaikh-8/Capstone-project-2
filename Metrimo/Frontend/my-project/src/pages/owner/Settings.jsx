import React from "react";

const Settings = () => (
  <div className="flex flex-col gap-10 animate-fade-in">
    {/* Business Information Section */}
    <div className="bg-white shadow-md rounded-3xl p-8 border border-gray-200 w-full">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
        <div className="h-2 w-2 bg-[#e63946] rounded-full animate-pulse"></div>
        Business Information
      </h3>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["Business Name", "Email", "Phone", "Address"].map((label, i) => (
          <div key={i}>
            <label className="text-sm text-gray-600 font-medium">{label}</label>
            <input
              type={label === "Email" ? "email" : "text"}
              placeholder={
                label === "Business Name"
                  ? "Venue Hub"
                  : label === "Email"
                  ? "contact@venuehub.com"
                  : label === "Phone"
                  ? "+92 300 1234567"
                  : "Jamshoro, Pakistan"
              }
              className="w-full bg-gray-50 rounded-xl p-3 mt-2 text-gray-900 border border-gray-200 focus:outline-none focus:border-[#e63946] transition-all placeholder-gray-400"
            />
          </div>
        ))}

        <div className="col-span-2 flex justify-end mt-4">
          <button className="bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white px-8 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] transition-all transform hover:scale-105 font-medium">
            Save Changes
          </button>
        </div>
      </form>
    </div>

    {/* Change Password Section */}
    <div className="bg-white shadow-md rounded-3xl p-8 border border-gray-200 w-full">
      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
        <div className="h-2 w-2 bg-[#e63946] rounded-full animate-pulse"></div>
        Change Password
      </h3>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-600 font-medium">
            Current Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-gray-50 rounded-xl p-3 mt-2 text-gray-900 border border-gray-200 focus:outline-none focus:border-[#e63946] transition-all"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600 font-medium">
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full bg-gray-50 rounded-xl p-3 mt-2 text-gray-900 border border-gray-200 focus:outline-none focus:border-[#e63946] transition-all"
          />
        </div>

        <div className="md:col-span-2">
          <label className="text-sm text-gray-600 font-medium">
            Confirm New Password
          </label>
          <input
            type="password"
            placeholder="Re-enter new password"
            className="w-full bg-gray-50 rounded-xl p-3 mt-2 text-gray-900 border border-gray-200 focus:outline-none focus:border-[#e63946] transition-all"
          />
        </div>

        <div className="col-span-2 flex justify-end mt-4">
          <button className="bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white px-8 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(230,57,70,0.5)] transition-all transform hover:scale-105 font-medium">
            Update Password
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default Settings;
