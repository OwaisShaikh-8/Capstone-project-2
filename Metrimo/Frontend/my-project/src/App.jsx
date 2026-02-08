import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store,persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import PublicLayout from "./pages/public/PublicLayout";
import Signup from "./pages/public/Signup.jsx";
import Login from "./pages/public/Login.jsx";
import { Toaster } from "react-hot-toast";
import Testing from "./components/Testing.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SharedHome from "./pages/shared_page/SharedHome.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import OwnerVenues from "./pages/owner/OwnerVenues.jsx";
import ExploreVenues from "./pages/customer/ExploreVenues.jsx";
import VenueDetail from "./pages/customer/VenueDetail.jsx";
// import CDashboard from './pages/customer/dashboard/Dashboard.jsx';
// import CSettings from './pages/customer/dashboard/Settings.jsx';
// import MyBookings from './pages/customer/dashboard/MyBookings.jsx';
// import CProfile from './pages/customer/dashboard/Profile.jsx';

import Bookings from "./pages/owner/Bookings.jsx";
import Profile from "./pages/owner/Profile.jsx";
import Queries from "./pages/owner/Queries.jsx";
import Settings from "./pages/owner/Settings.jsx";
import BookingDetails from "./pages/owner/BookingDetails.jsx";

function App() {
  const router = createBrowserRouter([
    // Public routes
    { path: "/", element: <PublicLayout /> },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
    { path: "/testing", element: <Testing /> },

    {
      element: <ProtectedRoute />, // wrapper

      children: [
        // Shared Route for both custommer and owner
        { path: "/home/:id", element: <SharedHome /> },

        // Customer Routes

        { path: "/explorevenues", element: <ExploreVenues /> },
        { path: "/venues/:id", element: <VenueDetail /> },
        { path: "bookingdetails/:bookingId", element: <BookingDetails /> },

        // Owner Routes
        {
          path: "/dashboard",
          element: <Dashboard />,
          children: [
            { index: true, element: <Profile /> },
            { path: "profile", element: <Profile /> },
            { path: "bookings", element: <Bookings /> },
            { path: "settings", element: <Settings /> },
            { path: "queries", element: <Queries /> },
            { path: "ownervenues", element: <OwnerVenues /> },
          ],
        },
      ],
    },
  ]);
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>

      
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          duration: 3000,
          style: { background: "#333", color: "#fff" },
        }}
      />
       </PersistGate>
    </Provider>

  );
}

export default App;
