import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";
import venueRoutes from "./routes/venueRoutes.js";

import bookingRoutes from "./routes/bookingRoutes.js";
// import customizationRoutes from "./routes/customizationRoutes.js";
// import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

// ==========================
// Middleware
// ==========================
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==========================
// MongoDB Connection
// ==========================
connectDB()

// ==========================
// Routes
// ==========================
app.use("/api/auth", authRoutes);
app.use("/api/venue", venueRoutes)
app.use("/api/booking", bookingRoutes)
// app.use("/api/venues", venueRoutes);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/customizations", customizationRoutes);
// app.use("/api/upload", uploadRoutes);

// ==========================
// Health Check
// ==========================
// app.get("/health", (req, res) => {
//   res.json({ status: "OK", message: "Server is running" });
// });

// ==========================
// Error Handling Middleware
// ==========================
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     message: "Something went wrong!",
//     error: process.env.NODE_ENV === "development" ? err.message : undefined,
//   });
// });

// ==========================
// 404 Handler
// ==========================
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// ==========================
// Start Server
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV}`);
});
