import React from "react";
import { FaEnvelope } from "react-icons/fa";

// ✅ Reusable Avatar component
const Avatar = ({ name, size, color }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
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

// ✅ Queries Page Component
const Queries = () => {
  const queries = [
    {
      id: 1,
      customer: "Ahmed Khan",
      email: "ahmed@example.com",
      venue: "Royal Banquet Hall",
      message: "Is parking available for 100 cars?",
      date: "2025-11-02",
      status: "New",
    },
    {
      id: 2,
      customer: "Fatima Ali",
      email: "fatima@example.com",
      venue: "Skyline Garden",
      message: "Can we customize the decoration?",
      date: "2025-11-01",
      status: "Replied",
    },
  ];

  const getStatusStyle = (s) =>
    s === "New"
      ? "bg-yellow-100 text-yellow-700 border-yellow-300"
      : "bg-green-100 text-green-700 border-green-300";

  return (
    <div className="h-full flex flex-col gap-6 text-gray-900 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-1 bg-gradient-to-b from-[#e63946] to-[#ff6b6b] rounded-full"></div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
          Customer Queries
        </h2>
      </div>

      {/* Query List */}
      <div className="flex flex-col gap-4">
        {queries.map((q) => (
          <div
            key={q.id}
            className="bg-white rounded-3xl shadow-md border border-gray-200 p-6 hover:shadow-xl transition-all"
          >
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <Avatar name={q.customer} size={50} color="#e63946" />
                <div>
                  <h3 className="text-lg font-bold">{q.customer}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <FaEnvelope className="text-[#e63946]" />
                    {q.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-xs px-3 py-1.5 rounded-full border ${getStatusStyle(
                    q.status
                  )} font-medium`}
                >
                  {q.status}
                </span>
                <span className="text-sm text-gray-500">{q.date}</span>
              </div>
            </div>

            {/* Message */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Venue:</strong> {q.venue}
              </p>
              <p className="text-gray-700">{q.message}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-[#e63946] to-[#ff6b6b] text-white px-6 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(230,57,70,0.3)] transition-all font-medium">
                Reply
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2.5 rounded-xl transition-all border border-gray-300 font-medium">
                Mark as Resolved
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Queries;
