import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import WeddingHome from "./pages/WeddingHome";
import VendorDetail from "./pages/VendorDetail";
import VendorPage from "./pages/VendorPage";
import VendorPortfolio from "./pages/VendorPortfolio";
import BookingPage from "./pages/BookingPage";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";

const WeddingModule = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

    // When accessed from SmartRouter (direct vendor URL like /elegant-events)
  // the path will be just "/", so we need to check if we're in a vendor context
  const isDirectVendorAccess = pathSegments.length === 1 && pathSegments[0] !== "weddings";

  return (
    <Routes>
      {/* Main wedding routes */}
      <Route path="/" element={isDirectVendorAccess ? <VendorPage /> : <WeddingHome />} />
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
