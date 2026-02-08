// import React from "react";
// import { MdEventAvailable } from "react-icons/md";
// import { HiMapPin, HiCalendar, HiClock as HiClockIcon } from "react-icons/hi2";

// const MyBookings = () => {
//   const bookings = [
//     {
//       id: 1,
//       venue: "Royal Banquet Hall",
//       location: "Karachi, Pakistan",
//       date: "2025-11-10",
//       time: "7:00 PM",
//       status: "Confirmed",
//       image: "https://images.unsplash.com/photo-1519167758481-83f29da8820c?w=400",
//     },
//     {
//       id: 2,
//       venue: "Skyline Garden",
//       location: "Hyderabad, Pakistan",
//       date: "2025-12-05",
//       time: "5:30 PM",
//       status: "Pending",
//       image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400",
//     },
//   ];

//   const getStatusStyle = (s) =>
//     s === "Confirmed"
//       ? "bg-green-100 text-green-700 border-green-300"
//       : "bg-yellow-100 text-yellow-700 border-yellow-300";

//   return (
//     <div className="h-full flex flex-col gap-6 text-gray-900 animate-fade-in">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div className="flex items-center gap-3">
//           <div className="h-10 w-1 bg-gradient-to-b from-[#e63946] to-[#ff6b6b] rounded-full"></div>
//           <h2 className="text-3xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
//             My Bookings
//           </h2>
//         </div>
//         <button className="bg-gradient-to-r from-[#e63946] to-[#ff6b6b] px-6 py-3 rounded-xl hover:shadow-[0_0_20px_rgba(230,57,70,0.3)] transition-all transform hover:scale-105 font-medium text-white flex items-center gap-2">
//           <span className="text-xl">+</span> New Booking
//         </button>
//       </div>

//       {/* Booking Cards */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {bookings.map((b) => (
//           <div
//             key={b.id}
//             className="bg-white rounded-3xl shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300"
//           >
//             <div className="relative h-40 overflow-hidden rounded-t-3xl">
//               <img
//                 src={b.image}
//                 alt={b.venue}
//                 className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
//               />
//               <span
//                 className={`absolute top-4 right-4 text-xs px-3 py-1.5 rounded-full border ${getStatusStyle(
//                   b.status
//                 )} backdrop-blur-sm font-medium`}
//               >
//                 {b.status}
//               </span>
//             </div>

//             <div className="p-6">
//               <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
//                 <MdEventAvailable className="text-[#e63946]" />
//                 {b.venue}
//               </h3>
//               <p className="flex items-center gap-2 text-gray-500 text-sm mb-4">
//                 <HiMapPin className="text-[#e63946]" />
//                 {b.location}
//               </p>

//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
//                   <p className="flex items-center gap-2 text-gray-400 text-xs mb-1">
//                     <HiCalendar className="text-[#e63946]" /> Date
//                   </p>
//                   <p className="font-medium">{b.date}</p>
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-3 border border-gray-200">
//                   <p className="flex items-center gap-2 text-gray-400 text-xs mb-1">
//                     <HiClockIcon className="text-[#e63946]" /> Time
//                   </p>
//                   <p className="font-medium">{b.time}</p>
//                 </div>
//               </div>

//               <button className="w-full mt-4 bg-[#e63946]/10 hover:bg-[#e63946]/20 text-[#e63946] py-2.5 rounded-xl transition-all border border-[#e63946]/30 hover:border-[#e63946]/60 font-medium">
//                 View Details
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyBookings;
