import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { AppContext } from "./context/AppContext";

// User Components
import HomePage from "./components/user/HomePage";
import HotelPage from "./components/user/HotelPage";
import RoomPage from "./components/user/RoomPage";
import BookingPage from "./components/user/BookingPage";
import MyBookingsPage from "./components/user/MyBookingsPage";
import LoginPage from "./components/auth/LoginPage";

// Hotel Owner Components
import OwnerDashboard from "./components/owner/OwnerDashboard";
import AddHotelPage from "./components/owner/AddHotelPage";
import MyHotelsPage from "./components/owner/MyHotelsPage";
import AddRoomPage from "./components/owner/AddRoomPage";
import BookingsReceivedPage from "./components/owner/BookingsReceivedPage";
import ProfileSettingsPage from "./components/owner/ProfileSettingsPage";

// Mock data
import { mockHotels, mockBookings, mockOwnerHotels } from "./data/mockData";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("customer"); // 'customer' or 'owner'
  const [hotels, setHotels] = useState(mockHotels);
  const [bookings, setBookings] = useState(mockBookings);
  const [ownerHotels, setOwnerHotels] = useState(mockOwnerHotels);

  const contextValue = {
    user,
    setUser,
    userType,
    setUserType,
    hotels,
    setHotels,
    bookings,
    setBookings,
    ownerHotels,
    setOwnerHotels,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <AppContainer>
          <GlobalStyle />
          <Routes>
            {/* User Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/hotel/:id" element={<HotelPage />} />
            <Route path="/room/:hotelId/:roomId" element={<RoomPage />} />
            <Route path="/booking/:hotelId/:roomId" element={<BookingPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Hotel Owner Routes */}
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/add-hotel" element={<AddHotelPage />} />
            <Route path="/owner/my-hotels" element={<MyHotelsPage />} />
            <Route path="/owner/add-room/:hotelId" element={<AddRoomPage />} />
            <Route path="/owner/bookings" element={<BookingsReceivedPage />} />
            <Route path="/owner/profile" element={<ProfileSettingsPage />} />
          </Routes>
        </AppContainer>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
