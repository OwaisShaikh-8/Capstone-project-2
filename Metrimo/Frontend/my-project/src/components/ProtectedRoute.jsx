import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If not logged in → redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise → show the protected page
  return <Outlet />;
};

export default ProtectedRoute;
