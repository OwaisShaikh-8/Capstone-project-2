import React, { useEffect } from "react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../hooks/useAuth";

// ✅ Zod schema
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

 const Login = () => {
  // const navigate = useNavigate();
  const { login, user, loading, error } = useAuth();

  // Redirect if already logged in
  // useEffect(() => {
  //   if (user) {
  //     navigate(`/home/${user.id}`, { replace: true });
  //   }
  // }, [user, navigate]);

  // // Show API errors
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error?.data?.message || "Login failed");
  //   }
  // }, [error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
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
          <h1 className="text-4xl font-bold mb-4 leading-snug">
            Welcome Back to <span className="text-yellow-300">Metrimo</span>
          </h1>
          <p className="text-lg text-gray-100 mb-6">
            Log in to manage your bookings, explore venues, or handle your
            business seamlessly.
          </p>
          <ul className="space-y-3 text-gray-200">
            <li>✅ Manage your bookings</li>
            <li>✅ Explore verified venues</li>
            <li>✅ Secure & fast access</li>
          </ul>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="lg:w-1/2 flex justify-center items-center p-10 lg:p-20 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login to Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
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
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-gray-600 text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-[#B90707] font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;