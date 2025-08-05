// API Services Index
// Centralized export for all API services

// Import all services
import authService from './authService';
import businessService from './businessService';
import ecommerceService, { ecommerceUtils } from './ecommerceService';
import hotelService from './hotelService';
import weddingService from './weddingService';

// Export individual services
export { 
  authService,
  businessService,
  ecommerceService,
  hotelService,
  weddingService,
  ecommerceUtils
};

// Export API services as a single object for convenient access
export const apiServices = {
  auth: authService,
  business: businessService,
  ecommerce: ecommerceService,
  hotel: hotelService,
  wedding: weddingService,
};

// Default export for easy importing
export default apiServices;

// Legacy exports for backward compatibility
// These match the old file structure for existing components

// Auth legacy wrappers
export const registerUser = authService.register.bind(authService);
export const loginUser = authService.login.bind(authService);
export const logoutUser = authService.logout.bind(authService);
export const refreshAuthToken = authService.refreshToken.bind(authService);
export const forgotPassword = authService.forgotPassword.bind(authService);
export const resetPassword = authService.resetPassword.bind(authService);
export const verifyEmail = authService.verifyEmail.bind(authService);
export const resendVerificationEmail = authService.resendVerificationEmail.bind(authService);

// Business legacy wrappers
export const fetchBusinessData = businessService.fetchBusinessData.bind(businessService);
export const updateBusinessData = businessService.updateBusinessData.bind(businessService);
export const fetchBusinessSection = businessService.fetchBusinessSection.bind(businessService);
export const updateBusinessSection = businessService.updateBusinessSection.bind(businessService);
export const fetchMultipleBusinessData = businessService.fetchMultipleBusinessData.bind(businessService);
export const validateBusinessData = businessService.validateBusinessData.bind(businessService);
export const checkAPIStatus = businessService.checkAPIStatus.bind(businessService);
export const detectBusinessType = businessService.detectBusinessType.bind(businessService);
export const getBusinessTypeConfig = businessService.getBusinessTypeConfig.bind(businessService);

// Legacy BusinessAPI export for full backward compatibility
export const BusinessAPI = {
  fetchBusinessData,
  updateBusinessData,
  fetchBusinessSection,
  updateBusinessSection,
  fetchMultipleBusinessData,
  validateBusinessData,
  checkAPIStatus,
  detectBusinessType,
  getBusinessTypeConfig,
};

// Ecommerce legacy wrapper - export the service directly as ecommerceAPI
export const ecommerceAPI = ecommerceService;

// Hotel legacy wrappers
export const fetchHotels = hotelService.fetchHotels.bind(hotelService);
export const fetchHotelById = hotelService.fetchHotelById.bind(hotelService);
export const fetchHotelSections = hotelService.fetchHotelSections.bind(hotelService);
export const fetchOwnerHotels = hotelService.fetchOwnerHotels.bind(hotelService);
export const fetchHotelRooms = hotelService.fetchHotelRooms.bind(hotelService);
export const fetchRoomById = hotelService.fetchRoomById.bind(hotelService);
export const fetchBookings = hotelService.fetchBookings.bind(hotelService);
export const fetchHotelReviews = hotelService.fetchHotelReviews.bind(hotelService);
export const searchHotels = hotelService.searchHotels.bind(hotelService);
export const fetchAmenitiesList = hotelService.fetchAmenitiesList.bind(hotelService);
export const fetchHotelsByCity = hotelService.fetchHotelsByCity.bind(hotelService);
export const fetchFeaturedHotels = hotelService.fetchFeaturedHotels.bind(hotelService);

// Hotel sync methods
export const getHotelByIdOrSlug = hotelService.getHotelByIdOrSlug.bind(hotelService);
export const getHotelById = hotelService.getHotelById.bind(hotelService);
export const getHotelBySlug = hotelService.getHotelBySlug.bind(hotelService);
export const getRoomById = hotelService.getRoomById.bind(hotelService);
export const getStaticHotelData = hotelService.getStaticHotelData.bind(hotelService);
export const getStaticBookingsData = hotelService.getStaticBookingsData.bind(hotelService);
export const getStaticAmenitiesData = hotelService.getStaticAmenitiesData.bind(hotelService);
export const getOwnerHotels = hotelService.getOwnerHotels.bind(hotelService);

// Wedding legacy exports
export const getWeddingVendors = weddingService.getWeddingVendors.bind(weddingService);
export const getStaticWeddingVendors = weddingService.getStaticWeddingVendors.bind(weddingService);
export const getStaticWeddingBookings = weddingService.getStaticWeddingBookings.bind(weddingService);
export const getVendorById = weddingService.getVendorById.bind(weddingService);
export const getVendorByIdAsync = weddingService.getVendorByIdAsync.bind(weddingService);
export const getVendorsByLocation = weddingService.getVendorsByLocation.bind(weddingService);
export const getVendorsByLocationAsync = weddingService.getVendorsByLocationAsync.bind(weddingService);
export const getFeaturedVendors = weddingService.getFeaturedVendors.bind(weddingService);
export const getFeaturedVendorsAsync = weddingService.getFeaturedVendorsAsync.bind(weddingService);
export const searchVendors = weddingService.searchVendors.bind(weddingService);
export const searchVendorsAsync = weddingService.searchVendorsAsync.bind(weddingService);
export const getWeddingBookings = weddingService.getWeddingBookings.bind(weddingService);
export const getBookingsByVendorId = weddingService.getBookingsByVendorId.bind(weddingService);
export const getBookingsByUserId = weddingService.getBookingsByUserId.bind(weddingService);
export const createBooking = weddingService.createBooking.bind(weddingService);
export const updateVendor = weddingService.updateVendor.bind(weddingService);
export const updateVendorSections = weddingService.updateVendorSections.bind(weddingService);
export const getVendorStats = weddingService.getVendorStats.bind(weddingService);
export const createWeddingWebsite = weddingService.createWeddingWebsite.bind(weddingService);

// Wedding additional exports
export const getVendorsObject = weddingService.getVendorsObject.bind(weddingService);
export const getSections = weddingService.getSections.bind(weddingService);
export const getWebsiteTemplates = weddingService.getWebsiteTemplates.bind(weddingService);
export const getDefaultSectionOrder = weddingService.getDefaultSectionOrder.bind(weddingService);
export const getDefaultSectionVisibility = weddingService.getDefaultSectionVisibility.bind(weddingService);

// Legacy naming for wedding
export const weddingVendors = weddingService.getStaticWeddingVendors();
export const getWeddingVendorById = weddingService.getVendorById.bind(weddingService);
export const getWeddingFeaturedVendors = weddingService.getFeaturedVendors.bind(weddingService);
export const getWeddingVendorsByLocation = weddingService.getVendorsByLocation.bind(weddingService);
export const searchWeddingVendors = weddingService.searchVendors.bind(weddingService);

// Wedding default export
export const weddingAPI = {
  getStaticWeddingVendors,
  getStaticWeddingBookings,
  getVendorById,
  getVendorsByLocation,
  getFeaturedVendors,
  searchVendors,
  getBookingsByVendorId,
  getBookingsByUserId,
  getVendorsObject,
  getSections,
  getWebsiteTemplates,
  getDefaultSectionOrder,
  getDefaultSectionVisibility,
  getWeddingVendors,
  getVendorByIdAsync,
  getVendorsByLocationAsync,
  getFeaturedVendorsAsync,
  searchVendorsAsync,
  getWeddingBookings,
  createBooking,
  updateVendor,
  updateVendorSections,
  getVendorStats,
  createWeddingWebsite,
  weddingVendors,
  getWeddingVendorById,
  getWeddingFeaturedVendors,
  getWeddingVendorsByLocation,
  searchWeddingVendors,
};
