// Centralized data exports - all dummy data flows through this file

// Import all data and utility functions with namespaced aliases to avoid conflicts
import * as AutomobileData from './automobiles';
import * as BusinessData from './business';
import * as EcommerceData from './ecommerce';
import * as HotelData from './hotels';
import * as WeddingData from './weddings';
import * as PlatformData from './platform';

// Export data arrays/objects
export const { automobileCategories, automobileVehicles, automobileVendors } =
  AutomobileData;

export const { businessTemplates } = BusinessData;

export const {
  ecommerceCategories,
  ecommerceProducts,
  ecommerceVendors,
  sellerDashboardData,
} = EcommerceData;

export const { hotels, hotelBookings, ownerHotels, amenitiesList } = HotelData;

export const { weddingVendors } = WeddingData;

export const {
  storeCategories,
  platformStats,
  platformBenefits,
  platformTestimonials,
  pricingPlans,
  pricingFeatures,
  pricingFAQs,
  websiteTypes,
  colorOptions
} = PlatformData;

// Export utility functions with prefixed names to avoid conflicts
// Automobile functions
export const {
  getVehiclesByCategory,
  getVehicleById,
  getFeaturedVehicles,
  getOnSaleVehicles,
  getVehiclesByAvailability,
  getVehiclesByCondition,
  getVehiclesByMake,
  getVehiclesByPriceRange,
  getAvailabilityStatus: getVehicleAvailabilityStatus,
  getAvailabilityLabel: getVehicleAvailabilityLabel,
  getAvailabilityColor: getVehicleAvailabilityColor,
  getVendorsByLocation: getAutomobileVendorsByLocation,
  getVendorById: getAutomobileVendorById,
  getVendorBySlug: getAutomobileVendorBySlug,
  getVendorByIdOrSlug: getAutomobileVendorByIdOrSlug,
  getFeaturedVendors: getAutomobileFeaturedVendors,
  searchVendors: searchAutomobileVendors,
} = AutomobileData;

// Business functions
export const { getBusinessTemplate } = BusinessData;

// Ecommerce functions
export const {
  getProductsByCategory,
  getProductById,
  getFeaturedProducts,
  getOnSaleProducts,
  getProductsByAvailability,
  updateProductAvailability,
  getAvailabilityStatus: getProductAvailabilityStatus,
  getAvailabilityLabel: getProductAvailabilityLabel,
  getAvailabilityColor: getProductAvailabilityColor,
  getVendorsByLocation: getEcommerceVendorsByLocation,
  getVendorById: getEcommerceVendorById,
  getVendorBySlug: getEcommerceVendorBySlug,
  getVendorByIdOrSlug: getEcommerceVendorByIdOrSlug,
  getFeaturedVendors: getEcommerceFeaturedVendors,
  searchVendors: searchEcommerceVendors,
} = EcommerceData;

// Hotel functions
export const {
  getHotelById,
  getHotelBySlug,
  getHotelByIdOrSlug,
  getRoomById,
  getHotelsByCity,
  searchHotels,
} = HotelData;

// Wedding functions
export const {
  getVendorsByLocation: getWeddingVendorsByLocation,
  getVendorById: getWeddingVendorById,
  getFeaturedVendors: getWeddingFeaturedVendors,
  searchVendors: searchWeddingVendors,
} = WeddingData;

// Legacy compatibility exports (maintain the exact same names for backward compatibility)
export const categories = automobileCategories;
export const vehicles = automobileVehicles;
export const products = ecommerceProducts;
export const bookings = hotelBookings;

// Generic vendor functions - these will route to the correct module based on context
export const getVendorBySlug = slug => {
  return getEcommerceVendorBySlug(slug) || getAutomobileVendorBySlug(slug);
};

export const getVendorById = id => {
  return (
    getWeddingVendorById(id) ||
    getEcommerceVendorById(id) ||
    getAutomobileVendorById(id)
  );
};
