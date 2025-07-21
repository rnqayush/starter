import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { AppContext } from "./context/AppContext";
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

// User Components
import PlatformHomePage from "./components/user/PlatformHomePage";
import LoginPage from "./components/auth/LoginPage";
import RegisterPage from "./components/auth/RegisterPage";

// Shared Components
import ScrollToTop from "./components/shared/ScrollToTop";
import SmartRouter from "./components/SmartRouter";

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

// Demo Website Pages
import DemoEcommerce from "./components/demo/DemoEcommerce";
import DemoWedding from "./components/demo/DemoWedding";
import DemoAutomobile from "./components/demo/DemoAutomobile";
import DemoBusiness from "./components/demo/DemoBusiness";

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
            {/* Main Routes */}
            <Route path="/" element={<PlatformHomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Category Landing Pages */}
            <Route path="/category/hotel" element={<HotelCategoryLanding />} />
            <Route path="/category/ecommerce" element={<EcommerceCategoryLanding />} />
            <Route path="/category/wedding" element={<WeddingCategoryLanding />} />
            <Route path="/category/automobile" element={<AutomobileCategoryLanding />} />
            <Route path="/category/business" element={<BusinessCategoryLanding />} />

            {/* Demo Website Pages */}
            <Route path="/demo-ecommerce" element={<DemoEcommerce />} />
            <Route path="/demo-wedding" element={<DemoWedding />} />
            <Route path="/demo-automobile" element={<DemoAutomobile />} />
            <Route path="/demo-business" element={<DemoBusiness />} />

            {/* Hotel Routes */}
            <Route path="/hotels" element={<HotelModule />} />
            <Route path="/booking-confirmation" element={<HotelModule />} />
            <Route path="/my-bookings" element={<HotelModule />} />

            {/* Store Listing Routes */}
            <Route
              path="/ecommerce-stores"
              element={<EcommerceStoresListing />}
            />
            <Route
              path="/wedding-vendors"
              element={<WeddingVendorsListing />}
            />
            <Route path="/auto-dealers" element={<AutoDealersListing />} />

                                    {/* Ecommerce Routes */}
            <Route path="/ecommerce/*" element={<EcommerceModule />} />

            {/* Automobile Routes */}
            <Route path="/automobiles/*" element={<AutomobileModule />} />

                        {/* Wedding Routes */}
            <Route path="/weddings/*" element={<WeddingModule />} />

                        {/* Business Website Routes */}
            <Route path="/business-websites" element={<BusinessModule />} />
            <Route path="/business/:businessSlug/owner" element={<BusinessModule />} />
            <Route path="/business/:businessSlug" element={<BusinessModule />} />

                                    {/* Store-specific Routes (more specific routes first) */}
            <Route path="/:storeSlug/products" element={<EcommerceModule />} />
            <Route
              path="/:storeSlug/product/:id"
              element={<EcommerceModule />}
            />
            <Route path="/:storeSlug/seller-dashboard" element={<EcommerceModule />} />
            <Route path="/:storeSlug/my-enquiries" element={<EcommerceModule />} />
            <Route path="/:storeSlug/cart" element={<EcommerceModule />} />
            <Route path="/:storeSlug/checkout" element={<EcommerceModule />} />
            <Route
              path="/:storeSlug/order-confirmation"
              element={<EcommerceModule />}
            />

                                    {/* Dealer-specific Routes (more specific routes first) */}
            <Route path="/:dealerSlug/vehicles" element={<AutomobileModule />} />
            <Route
              path="/:dealerSlug/vehicle/:id"
              element={<AutomobileModule />}
            />
            <Route path="/:dealerSlug/wishlist" element={<AutomobileModule />} />
            <Route path="/:dealerSlug/dealer-dashboard" element={<AutomobileModule />} />
            <Route path="/:dealerSlug/my-enquiries" element={<AutomobileModule />} />
            <Route path="/:dealerSlug/inventory" element={<AutomobileModule />} />
            <Route path="/:dealerSlug/financing" element={<AutomobileModule />} />
            <Route
              path="/:dealerSlug/trade-in"
              element={<AutomobileModule />}
            />

                                                            {/* Hotel-specific Routes (more specific routes first) */}
            <Route path="/:hotelSlug/rooms/:roomId" element={<HotelModule />} />
            <Route
              path="/:hotelSlug/booking/:roomId"
              element={<HotelModule />}
            />
            <Route path="/:hotelSlug/booking" element={<HotelModule />} />

            {/* Wedding vendor-specific Routes (more specific routes first) */}
            <Route path="/:vendorSlug/portfolio" element={<WeddingModule />} />
            <Route path="/:vendorSlug/dashboard" element={<WeddingModule />} />
            <Route path="/:vendorSlug/booking" element={<WeddingModule />} />
            <Route path="/:vendorSlug/booking/:serviceId" element={<WeddingModule />} />

            

                                    {/* Generic slug routes - SmartRouter determines hotel vs store */}
            <Route path="/:slug" element={<SmartRouter />} />

            {/* Seller Dashboard Demo */}
            <Route
              path="/seller-dashboard-demo"
              element={<SellerDashboardDemo />}
            />

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
    </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
