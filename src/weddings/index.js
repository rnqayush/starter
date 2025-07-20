import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import WeddingHome from "./pages/WeddingHome";
import VendorDetail from "./pages/VendorDetail";
import VendorPage from "./pages/VendorPage";
import BookingPage from "./pages/BookingPage";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";

const WeddingModule = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Handle different wedding routes
  const isVendorRoute = pathSegments.length >= 2 && pathSegments[0] !== "weddings";
  const vendorSlug = isVendorRoute ? pathSegments[0] : null;

  return (
    <Routes>
      {/* Main wedding routes */}
            <Route path="/" element={<WeddingHome />} />
      <Route path="/booking/:vendorId" element={<BookingPage />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      
            {/* Vendor-specific routes */}
      <Route path="/:vendorSlug" element={<VendorPage />} />
      <Route path="/:vendorSlug/booking" element={<BookingPage />} />
      <Route path="/:vendorSlug/booking/:serviceId" element={<BookingPage />} />
      <Route path="/:vendorSlug/detail" element={<VendorDetail />} />
    </Routes>
  );
};

export default WeddingModule;
