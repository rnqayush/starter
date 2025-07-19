import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { AppContext } from "./context/AppContext";

// User Components
import PlatformHomePage from "./components/user/PlatformHomePage";
import LoginPage from "./components/auth/LoginPage";

// Hotel Module
import HotelModule from "./hotel";

// Hotel Owner Components
import OwnerDashboard from "./components/owner/OwnerDashboard";
import AddHotelPage from "./components/owner/AddHotelPage";
import MyHotelsPage from "./components/owner/MyHotelsPage";
import AddRoomPage from "./components/owner/AddRoomPage";
import BookingsReceivedPage from "./components/owner/BookingsReceivedPage";
import ProfileSettingsPage from "./components/owner/ProfileSettingsPage";

// Mock data
import { mockHotels, mockBookings, mockOwnerHotels } from "./data/mockData";

// Modules
import EcommerceModule from "./ecommerce";

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
            {/* Main Routes */}
            <Route path="/" element={<PlatformHomePage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Hotel Routes */}
            <Route path="/hotels/*" element={<HotelModule />} />
            <Route path="/hotel/*" element={<HotelModule />} />
            <Route path="/room/*" element={<HotelModule />} />
            <Route path="/booking/*" element={<HotelModule />} />
            <Route path="/my-bookings" element={<HotelModule />} />

            {/* Ecommerce Routes */}
            <Route path="/ecommerce/*" element={<EcommerceModule />} />

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
