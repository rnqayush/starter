import React from "react";
import { useLocation } from "react-router-dom";
import HotelHome from "./pages/HotelHome";
import HotelDetail from "./pages/HotelDetail";
import RoomDetail from "./pages/RoomDetail";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import MyBookings from "./pages/MyBookings";

const HotelModule = () => {
  const location = useLocation();
  const path = location.pathname;

  // Route based on URL path
  if (path === "/hotels") {
    return <HotelHome />;
  } else if (path.startsWith("/hotel/") && !path.includes("/room")) {
    return <HotelDetail />;
  } else if (path.startsWith("/room/")) {
    return <RoomDetail />;
  } else if (path.startsWith("/booking/") && !path.includes("confirmation")) {
    return <Booking />;
  } else if (path === "/booking-confirmation") {
    return <BookingConfirmation />;
  } else if (path === "/my-bookings") {
    return <MyBookings />;
  } else {
    return <HotelHome />;
  }
};

export default HotelModule;
