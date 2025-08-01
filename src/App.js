import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { AppContext } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { restoreUserSession } from './store/slices/authSlice';

// User Components
import PlatformHomePage from './components/user/PlatformHomePage';
import PricingPage from './components/user/PricingPage';
import BlogsPage from './components/user/BlogsPage';
import SingleBlogPage from './components/user/SingleBlogPage';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import StartBuilding from './components/StartBuilding';
import AuthGuard from './components/auth/AuthGuard';
import UserProfilePage from './components/user/UserProfilePage';

// Shared Components
import ScrollToTop from './components/shared/ScrollToTop';
import SmartRouter from './components/SmartRouter';

// Hotel Module
// Note: HotelModule removed as it's not used in current routing

// Mock data
import {
  hotels as hotelModuleData,
  hotelBookings,
  ownerHotels as hotelOwnerData,
} from './DummyData';

// Category Landing Pages
import HotelCategoryLanding from './components/category/HotelCategoryLanding';
import EcommerceCategoryLanding from './components/category/EcommerceCategoryLanding';
import WeddingCategoryLanding from './components/category/WeddingCategoryLanding';
import AutomobileCategoryLanding from './components/category/AutomobileCategoryLanding';
import BusinessCategoryLanding from './components/category/BusinessCategoryLanding';

// Store Listing Pages
import OwnerDashboard from './components/owner/OwnerDashboard';
import RoomDetail from './hotel/pages/RoomDetail';
import Booking from './hotel/pages/Booking';
import BookingConfirmation from './hotel/pages/BookingConfirmation';
import { NotificationProvider } from './ecommerce/components/NotificationSystem';
import RoomList from './hotel/pages/RoomList';
import ProductDetail from './ecommerce/pages/ProductDetail';
import ProductList from './ecommerce/pages/ProductList';
import SellerDashboard from './ecommerce/pages/SellerDashboard';
import VendorPortfolio from './weddings/pages/VendorPortfolio';
import VendorDashboard from './weddings/pages/VendorDashboard';
import Vehicles from './automobiles/pages/Vehicles';
import VehicleDetail from './automobiles/pages/VehicleDetail';
import DealerDashboard from './automobiles/pages/DealerDashboard';
import Wishlist from './automobiles/pages/Wishlist';
import BuisnessAdminDashboard from './business/pages/BuisnessAdminDashboard';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('customer'); // 'customer' or 'owner'

  // Initialize authentication session on app load
  useEffect(() => {
    dispatch(restoreUserSession());
  }, [dispatch]);

  // Get live hotel data from Redux, fallback to static data
  const liveHotels = useSelector(
    state => state.hotelManagement?.liveHotels || hotelModuleData
  );
  const draftHotels = useSelector(
    state => state.hotelManagement?.draftHotels || hotelModuleData
  );

  // For backwards compatibility, provide both live and static data
  const [hotels, setHotels] = useState(hotelModuleData);
  const [bookings, setBookings] = useState(hotelBookings);
  const [ownerHotels, setOwnerHotels] = useState(hotelOwnerData || []);

  const contextValue = {
    user,
    setUser,
    userType,
    setUserType,
    hotels: liveHotels, // Use live data from Redux for public pages
    setHotels,
    bookings,
    setBookings,
    ownerHotels: liveHotels, // Admin should also see current live data for selection
    setOwnerHotels,
    // Expose both live and draft data for components that need to distinguish
    liveHotels,
    draftHotels,
  };

  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <AppContext.Provider value={contextValue}>
            <Router>
              <AppContainer>
                <GlobalStyle />
                <ScrollToTop />
                <Routes>
                  {/* Main Platform Routes (Highest Priority) */}
                  <Route path="/" element={<PlatformHomePage />} />
                  <Route path="/blogs" element={<BlogsPage />} />
                  <Route path="/blog/:id" element={<SingleBlogPage />} />
                  <Route path="/pricing" element={<PricingPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/start-building" element={<StartBuilding />} />

                  {/* categories for website examples*/}
                  <Route path="/website-examples">
                    <Route path="hotel" element={<HotelCategoryLanding />} />
                    <Route
                      path="wedding"
                      element={<WeddingCategoryLanding />}
                    />
                    <Route
                      path="ecommerce"
                      element={<EcommerceCategoryLanding />}
                    />
                    <Route
                      path="automobile"
                      element={<AutomobileCategoryLanding />}
                    />
                    <Route
                      path="business"
                      element={<BusinessCategoryLanding />}
                    />
                  </Route>

                  {/* Generic slug routes (lowest priority) */}
                  <Route path="/:slug">
                    {/* smart router identifies vendor and give homepage of same */}
                    <Route index element={<SmartRouter />} />

                    {/*  hotel website routes */}
                    <Route path="hoteladmin" element={<OwnerDashboard />} />
                    <Route path="rooms" element={<RoomList />} />
                    <Route path="rooms/:roomId" element={<RoomDetail />} />
                    <Route path="rooms/booking/:roomId" element={<Booking />} />
                    <Route
                      path="bookingconfirmation"
                      element={<BookingConfirmation />}
                    />

                    {/*  Ecommerce website routes */}

                    <Route path="products" element={<ProductList />} />
                    <Route
                      path="productdetail/:productId"
                      element={<ProductDetail />}
                    />
                    <Route
                      path="selleradminpanel"
                      element={<SellerDashboard />}
                    />
                    {/*  Wedding website routes */}
                    <Route path="portfolio" element={<VendorPortfolio />} />
                    <Route
                      path="weddingadminpanel"
                      element={<VendorDashboard />}
                    />
                    {/*  automobile website routes */}
                    <Route path="vehicles" element={<Vehicles />} />
                    <Route
                      path="vehicledetail/:vehicleId"
                      element={<VehicleDetail />}
                    />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route
                      path="autoadmindasboard"
                      element={<DealerDashboard />}
                    />

                    {/*  buisness website routes */}
                    <Route
                      path="adminpanel"
                      element={<BuisnessAdminDashboard />}
                    />
                  </Route>
                </Routes>
              </AppContainer>
            </Router>
          </AppContext.Provider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
