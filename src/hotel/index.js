import React from "react";
import { Routes, Route } from "react-router-dom";
import HotelHome from "./pages/HotelHome";
import HotelDetail from "./pages/HotelDetail";
import RoomDetail from "./pages/RoomDetail";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";

const HotelModule = () => {
  return (
    <Routes>
      <Route path="/" element={<HotelHome />} />
      <Route path="/hotel/:id" element={<HotelDetail />} />
      <Route path="/room/:hotelId/:roomId" element={<RoomDetail />} />
      <Route path="/booking/:hotelId/:roomId" element={<Booking />} />
      <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  );
};

export default HotelModule;
