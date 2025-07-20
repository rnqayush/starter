import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import WeddingHome from "./pages/WeddingHome";
import VendorDetail from "./pages/VendorDetail";
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
      <Route path="/weddings" element={<WeddingHome />} />
      <Route path="/weddings/booking/:vendorId" element={<BookingPage />} />
      <Route path="/weddings/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/weddings/my-bookings" element={<MyBookings />} />
      
      {/* Vendor-specific routes */}
      <Route path="/:vendorSlug" element={<VendorDetail />} />
      <Route path="/:vendorSlug/booking" element={<BookingPage />} />
      <Route path="/:vendorSlug/booking/:serviceId" element={<BookingPage />} />
    </Routes>
  );
};

export default WeddingModule;
