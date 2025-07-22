import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { AppContext } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

// User Components
import PlatformHomePage from "./components/user/PlatformHomePage";
import PricingPage from "./components/user/PricingPage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";
import StartBuilding from "./components/StartBuilding";

// Shared Components
import ScrollToTop from "./components/shared/ScrollToTop";
import SmartRouter from "./components/SmartRouter";

// Hotel Module
import HotelModule from "./hotel";

// Owner Components
import AddHotelPage from "./components/owner/AddHotelPage";
import MyHotelsPage from "./components/owner/MyHotelsPage";
import AddRoomPage from "./components/owner/AddRoomPage";
import BookingsReceivedPage from "./components/owner/BookingsReceivedPage";
import ProfileSettingsPage from "./components/owner/ProfileSettingsPage";
import ContentManagerSelector from "./components/owner/ContentManagerSelector";
import HotelContentManager from "./components/owner/HotelContentManager";
import TestPage from "./components/owner/TestPage";
import AddHotelPageSimple from "./components/owner/AddHotelPageSimple";

// Mock data
import {
  hotels as hotelModuleData,
  bookings as hotelBookings,
  ownerHotels as hotelOwnerData,
} from "./hotel/data/hotels";

// Modules
import EcommerceModule from "./ecommerce";
import AutomobileModule from "./automobiles";
import WeddingModule from "./weddings";
import BusinessModule from "./business";
import SellerDashboardDemo from "./ecommerce/pages/SellerDashboardDemo";

// Category Landing Pages
import HotelCategoryLanding from "./components/category/HotelCategoryLanding";
import EcommerceCategoryLanding from "./components/category/EcommerceCategoryLanding";
import WeddingCategoryLanding from "./components/category/WeddingCategoryLanding";
import AutomobileCategoryLanding from "./components/category/AutomobileCategoryLanding";
import BusinessCategoryLanding from "./components/category/BusinessCategoryLanding";

// Store Listing Pages
import EcommerceStoresListing from "./ecommerce/pages/StoresListing";
import WeddingVendorsListing from "./weddings/pages/StoresListing";
import AutoDealersListing from "./automobiles/pages/StoresListing";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState("customer"); // 'customer' or 'owner'
  const [hotels, setHotels] = useState(hotelModuleData);
  const [bookings, setBookings] = useState(hotelBookings);
  const [ownerHotels, setOwnerHotels] = useState(hotelOwnerData);

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
    <ErrorBoundary>
      <AuthProvider>
        <AppContext.Provider value={contextValue}>
          <Router>
            <AppContainer>
              <GlobalStyle />
              <ScrollToTop />
              <Routes>
            {/* Main Platform Routes (Highest Priority) */}
            <Route path="/" element={<PlatformHomePage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/start-building" element={<StartBuilding />} />

            {/* Category Landing Pages */}
            <Route path="/category/hotel" element={<HotelCategoryLanding />} />
            <Route path="/category/ecommerce" element={<EcommerceCategoryLanding />} />
            <Route path="/category/wedding" element={<WeddingCategoryLanding />} />
            <Route path="/category/automobile" element={<AutomobileCategoryLanding />} />
            <Route path="/category/business" element={<BusinessCategoryLanding />} />

            {/* Directory & Listing Routes */}
            <Route path="/hotels" element={<HotelModule />} />
            <Route path="/ecommerce-stores" element={<EcommerceStoresListing />} />
            <Route path="/wedding-vendors" element={<WeddingVendorsListing />} />
            <Route path="/auto-dealers" element={<AutoDealersListing />} />
            <Route path="/business-websites" element={<BusinessModule />} />

            {/* Global Routes (Non-slug specific) */}
            <Route path="/booking-confirmation" element={<HotelModule />} />
            <Route path="/my-bookings" element={<HotelModule />} />
            <Route path="/ecommerce/*" element={<EcommerceModule />} />
            <Route path="/automobiles/*" element={<AutomobileModule />} />
            <Route path="/weddings/*" element={<WeddingModule />} />
            <Route path="/seller-dashboard-demo" element={<SellerDashboardDemo />} />

            {/* Legacy Owner Routes - Redirect to hotel slug pattern */}
            <Route path="/owner/add-hotel" element={<AddHotelPage />} />
            <Route path="/owner/my-hotels" element={<MyHotelsPage />} />
            <Route path="/owner/add-room/:hotelId" element={<AddRoomPage />} />
            <Route path="/owner/bookings" element={<BookingsReceivedPage />} />
            <Route path="/owner/profile" element={<ProfileSettingsPage />} />
            <Route path="/owner/content-manager" element={<ContentManagerSelector />} />
            <Route path="/owner/content-manager/:hotelId" element={<HotelContentManager />} />
            <Route path="/owner/dashboard" element={<HotelModule />} />

            {/* Unified Slug-based Routes - All demo websites */}
            {/* Owner/Dashboard Routes for all modules */}
            <Route path="/:slug/owner/*" element={<SmartRouter />} />
            <Route path="/:slug/owner" element={<SmartRouter />} />
            <Route path="/:slug/dashboard" element={<SmartRouter />} />
            <Route path="/:slug/seller-dashboard" element={<SmartRouter />} />
            <Route path="/:slug/dealer-dashboard" element={<SmartRouter />} />

            {/* E-commerce specific routes */}
            <Route path="/:slug/products" element={<SmartRouter />} />
            <Route path="/:slug/product/:id" element={<SmartRouter />} />
            <Route path="/:slug/cart" element={<SmartRouter />} />
            <Route path="/:slug/checkout" element={<SmartRouter />} />
            <Route path="/:slug/order-confirmation" element={<SmartRouter />} />
            <Route path="/:slug/my-enquiries" element={<SmartRouter />} />

            {/* Hotel specific routes */}
            <Route path="/:slug/rooms/:roomId" element={<SmartRouter />} />
            <Route path="/:slug/booking/:roomId" element={<SmartRouter />} />
            <Route path="/:slug/booking" element={<SmartRouter />} />

            {/* Automobile specific routes */}
            <Route path="/:slug/vehicles" element={<SmartRouter />} />
            <Route path="/:slug/vehicle/:id" element={<SmartRouter />} />
            <Route path="/:slug/wishlist" element={<SmartRouter />} />
            <Route path="/:slug/inventory" element={<SmartRouter />} />
            <Route path="/:slug/financing" element={<SmartRouter />} />
            <Route path="/:slug/trade-in" element={<SmartRouter />} />

            {/* Wedding vendor specific routes */}
            <Route path="/:slug/portfolio" element={<SmartRouter />} />
            <Route path="/:slug/booking/:serviceId" element={<SmartRouter />} />

            {/* Generic slug routes (lowest priority) */}
            <Route path="/:slug" element={<SmartRouter />} />

          </Routes>
            </AppContainer>
      </Router>
      </AppContext.Provider>
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
