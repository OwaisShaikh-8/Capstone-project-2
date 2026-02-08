import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate,Link } from "react-router-dom";
import toast from "react-hot-toast";

// ✅ Zod schema for signup
const signupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phone: z
      .string()
      .min(10, "Enter a valid phone number")
      .max(15, "Phone number too long")
      .regex(/^[0-9]+$/, "Phone must contain only numbers"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const Signup = () => {
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();
  const { signup, user, loading, error } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(`/home/${user.id}`, { replace: true });
    }
  }, [user, navigate]);

  // Show API errors
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || "Signup failed");
    }
  }, [error]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      await signup({ ...data, role });
      toast.success("Signup successful!");
    } catch (err) {
      console.error(err);
      // Already handled via toast in useEffect
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#B90707] to-red-800 text-white flex flex-col justify-center items-center p-10 lg:p-20">
        <div className="max-w-md text-center lg:text-left">
          <div className="w-40 mb-6 mx-auto lg:mx-0">
            <img src={logo} alt="logo" className="w-full object-contain" />
          </div>
          {role === "customer" ? (
            <>
              <h1 className="text-4xl font-bold mb-4 leading-snug">
                Join <span className="text-yellow-300">Metrimo</span> Today
              </h1>
              <p className="text-lg text-gray-100 mb-6">
                Discover the best venues for weddings and events. Plan your
                perfect occasion with ease.
              </p>
              <ul className="space-y-3 text-gray-200">
                <li>✅ Explore 100+ verified venues</li>
                <li>✅ Transparent pricing & real-time availability</li>
                <li>✅ Instant secure booking</li>
              </ul>
            </>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4 leading-snug">
                Partner with <span className="text-yellow-300">Metrimo</span>
              </h1>
              <p className="text-lg text-gray-100 mb-6">
                Showcase your venues, attract more clients, and manage bookings
                effortlessly.
              </p>
              <ul className="space-y-3 text-gray-200">
                <li>✅ List and promote your venue for free</li>
                <li>✅ Manage bookings & availability in real-time</li>
                <li>✅ Connect with thousands of event planners</li>
              </ul>
            </>
          )}
        </div>
      </div>

      {/* Right Side Form */}
      <div className="lg:w-1/2 flex justify-center items-center p-10 lg:p-20 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {role === "customer"
              ? "Create Your Customer Account"
              : "Register as a Venue Owner"}
          </h2>

          {/* Role Selector */}
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Sign up as</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#B90707]"
            >
              <option value="customer">Customer</option>
              <option value="owner">Owner</option>
            </select>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-2">
                {role === "owner" ? "Owner Name" : "Full Name"}
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                {...register("name")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#B90707]`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#B90707]`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                {...register("phone")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#B90707]`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#B90707]`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-600 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password"
                {...register("confirmPassword")}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-[#B90707]`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 bg-gradient-to-r from-[#B90707] to-red-600 text-white rounded-lg font-bold transition-transform duration-300 shadow-md ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#B90707] font-semibold hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
