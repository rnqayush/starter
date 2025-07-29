// Centralized data exports - all dummy data flows through this file

// Import all data and utility functions with namespaced aliases to avoid conflicts
import automobileData from './automobiles.json';
import ecommerceData from './ecommerce.json';
import * as BusinessData from './business';
import * as WeddingData from '../utils/weddingAPI';
import * as PlatformData from './platform';
// Hotel data now comes from hotels.json via hotelAPI
import {
  getStaticHotelData,
  getStaticBookingsData,
  getStaticAmenitiesData,
  getOwnerHotels,
} from '../utils/hotelAPI';
import hotelAPI from '../utils/hotelAPI';

// Export data arrays/objects from JSON
export const automobileCategories =
  automobileData.data.allCategories || automobileData.data.categories || [];
export const automobileVehicles =
  automobileData.data.allVehicles || automobileData.data.vehicles || [];
export const automobileVendors = [automobileData.data.vendor]; // Wrap in array for consistency

export const { businessTemplates } = BusinessData;

// Export ecommerce data from JSON
export const ecommerceCategories = ecommerceData.categories || [];
export const ecommerceProducts = ecommerceData.products || [];
export const ecommerceVendors = [ecommerceData.vendor]; // Wrap in array for consistency
export const sellerDashboardData = ecommerceData.analytics || {};

export const hotels = getStaticHotelData();
export const hotelBookings = getStaticBookingsData();
export const ownerHotels = getOwnerHotels('owner123'); // Default owner for compatibility
export const amenitiesList = getStaticAmenitiesData();

export const weddingVendors = WeddingData.getStaticWeddingVendors();
export const weddingBookings = WeddingData.getStaticWeddingBookings();

export const {
  storeCategories,
  platformStats,
  platformBenefits,
  platformTestimonials,
  pricingPlans,
  pricingFeatures,
  pricingFAQs,
  websiteTypes,
  colorOptions,
} = PlatformData;

// Export utility functions with prefixed names to avoid conflicts
// Automobile functions - using JSON data directly
export const getVehiclesByCategory = categoryId => {
  return automobileVehicles.filter(
    vehicle => vehicle.category.id === categoryId
  );
};

export const getVehicleById = id => {
  return automobileVehicles.find(vehicle => vehicle.id === id);
};

export const getFeaturedVehicles = () => {
  return automobileVehicles.filter(vehicle => vehicle.featured === true);
};

export const getOnSaleVehicles = () => {
  return automobileVehicles.filter(vehicle => vehicle.pricing?.onSale === true);
};

export const getVehiclesByAvailability = status => {
  return automobileVehicles.filter(
    vehicle => vehicle.availability?.status === status
  );
};

export const getVehiclesByCondition = condition => {
  return automobileVehicles.filter(vehicle => vehicle.condition === condition);
};

export const getVehiclesByMake = make => {
  return automobileVehicles.filter(
    vehicle => vehicle.make.toLowerCase() === make.toLowerCase()
  );
};

export const getVehiclesByPriceRange = (min, max) => {
  return automobileVehicles.filter(vehicle => {
    const price = vehicle.pricing?.price || 0;
    return price >= min && price <= max;
  });
};

export const getVehicleAvailabilityStatus = vehicle => {
  return vehicle.availability?.status || 'unknown';
};

export const getVehicleAvailabilityLabel = status => {
  const labels = {
    in_stock: 'In Stock',
    limited_stock: 'Limited Stock',
    out_of_stock: 'Out of Stock',
    pre_order: 'Pre-Order',
    sold: 'Sold',
  };
  return labels[status] || 'Unknown';
};

export const getVehicleAvailabilityColor = status => {
  const colors = {
    in_stock: '#10b981',
    limited_stock: '#f59e0b',
    out_of_stock: '#ef4444',
    pre_order: '#3b82f6',
    sold: '#6b7280',
  };
  return colors[status] || '#6b7280';
};

export const getAutomobileVendorsByLocation = location => {
  return automobileVendors.filter(
    vendor =>
      vendor.contact?.address?.city
        ?.toLowerCase()
        .includes(location.toLowerCase()) ||
      vendor.contact?.address?.state
        ?.toLowerCase()
        .includes(location.toLowerCase())
  );
};

export const getAutomobileVendorById = id => {
  return automobileVendors.find(vendor => vendor.id === id);
};

export const getAutomobileVendorBySlug = slug => {
  return automobileVendors.find(vendor => vendor.slug === slug);
};

export const getAutomobileVendorByIdOrSlug = identifier => {
  return (
    getAutomobileVendorById(identifier) || getAutomobileVendorBySlug(identifier)
  );
};

export const getAutomobileFeaturedVendors = () => {
  return automobileVendors.filter(vendor => vendor.settings?.featured === true);
};

export const searchAutomobileVendors = searchTerm => {
  const term = searchTerm.toLowerCase();
  return automobileVendors.filter(
    vendor =>
      vendor.name.toLowerCase().includes(term) ||
      vendor.businessInfo?.description?.toLowerCase().includes(term) ||
      vendor.specialties?.some(specialty =>
        specialty.toLowerCase().includes(term)
      )
  );
};

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

// Hotel functions - now from hotelAPI
export const { getHotelById, getHotelBySlug, getHotelByIdOrSlug, getRoomById } =
  hotelAPI;

// These need to be async now, but for compatibility we'll export sync versions
export const getHotelsByCity = city => {
  if (!Array.isArray(hotels)) return [];
  return hotels.filter(hotel =>
    hotel.city.toLowerCase().includes(city.toLowerCase())
  );
};

export const searchHotels = searchTerm => {
  if (!Array.isArray(hotels)) return [];
  const term = searchTerm.toLowerCase();
  return hotels.filter(
    hotel =>
      hotel.name.toLowerCase().includes(term) ||
      hotel.location.toLowerCase().includes(term) ||
      hotel.city.toLowerCase().includes(term)
  );
};

// Wedding functions - now from weddingAPI
export const {
  getVendorsByLocation: getWeddingVendorsByLocation,
  getVendorById: getWeddingVendorById,
  getFeaturedVendors: getWeddingFeaturedVendors,
  searchVendors: searchWeddingVendors,
  getBookingsByVendorId: getWeddingBookingsByVendorId,
  getBookingsByUserId: getWeddingBookingsByUserId,
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
