// Hotel Module Exports

// Pages
export { default as HotelDetail } from './pages/HotelDetail';
export { default as RoomDetail } from './pages/RoomDetail';
export { default as RoomList } from './pages/RoomList';
export { default as Booking } from './pages/Booking';
export { default as BookingConfirmation } from './pages/BookingConfirmation';

// Components
export { default as HotelNavbar } from './components/HotelNavbar';
export { default as HotelFooter } from './components/HotelFooter';
export { default as RoomCard } from './components/RoomCard';
export { default as HotelCategoryLanding } from './components/HotelCategoryLanding';

// Owner Components
export { default as AddHotelPageContent } from './components/owner/AddHotelPageContent';
export { default as AddRoomManager } from './components/owner/AddRoomManager';
export { default as AddRoomPageContent } from './components/owner/AddRoomPageContent';
export { default as AllRoomsManager } from './components/owner/AllRoomsManager';
export { default as BookingsReceivedPageContent } from './components/owner/BookingsReceivedPageContent';
export { default as EnhancedSidebar } from './components/owner/EnhancedSidebar';
export { default as OwnerDashboard } from './components/owner/OwnerDashboard';
export { default as ProfileSettingsPageContent } from './components/owner/ProfileSettingsPageContent';
export { default as SectionBasedHotelEditor } from './components/owner/SectionBasedHotelEditor';

// Store exports
export { default as hotelManagementSlice } from './store/hotelManagementSlice';
export * from './store/hotelManagementSlice';

// Utils
export * from './utils/hotelAPI';

// Data
export { default as hotelsData } from './data/hotels.json';

