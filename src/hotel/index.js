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
  } else if (path === "/booking-confirmation") {
    return <BookingConfirmation />;
  } else if (path === "/my-bookings") {
    return <MyBookings />;
  } else if (path.includes("/rooms/")) {
    return <RoomDetail />;
  } else if (path.includes("/booking")) {
    return <Booking />;
  // eslint-disable-next-line no-useless-escape
  } else if (path.match(/^\/[^\/]+$/)) {
    // Single segment path like "/grand-luxury-resort" - hotel detail
    return <HotelDetail />;
  } else {
    return <HotelHome />;
  }
};

export default HotelModule;
