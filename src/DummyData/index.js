// Centralized data exports - all dummy data flows through this file

// Import all data and utility functions with namespaced aliases to avoid conflicts
import automobileData from './automobiles.json';
import ecommerceData from './ecommerce.json';
import businessData from './business.json';
import * as WeddingData from '../utils/weddingAPI';
import platformData from './platform.json';
// Hotel data now comes from hotels.json via hotelAPI
import {
  getStaticHotelData,
  getStaticBookingsData,
  getStaticAmenitiesData,
  getOwnerHotels,
} from '../utils/hotelAPI';
import hotelAPI from '../utils/hotelAPI';

// Business data loaded successfully

// Export data arrays/objects from JSON
export const automobileCategories =
  automobileData.data.allCategories || automobileData.data.categories || [];
export const automobileVehicles =
  automobileData.data.allVehicles || automobileData.data.vehicles || [];
export const automobileVendors = [automobileData.data.vendor]; // Wrap in array for consistency

// Export business data from new JSON structure
export const businessTemplates = businessData.data.businessTemplates || [];
export const businesses = businessData.data.businesses || {};

// Export the raw business data for template lookups
export { businessData };

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

// Export platform data from JSON
export const storeCategories = platformData.exploreStores.categories || [];
export const platformStats = platformData.stats || [];
export const platformBenefits = platformData.whyChooseUs.benefits || [];
export const platformTestimonials = platformData.testimonials.items || [];
export const pricingPlans = platformData.pricing.plans || [];
export const pricingFeatures = platformData.pricing.features || [];
export const pricingFAQs = platformData.pricing.faqs || [];
export const websiteTypes = platformData.websiteTypes || [];
export const colorOptions = platformData.colorOptions || [];

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

// Business functions - updated to use new JSON structure
export const getBusinessTemplate = slug => {
  console.log('[getBusinessTemplate] Looking for slug:', slug);
  console.log('[getBusinessTemplate] businessData:', businessData);

  // Handle salon/business slug -> map to business data
  if (slug === 'salon' || slug === 'business') {
    // Note: JSON has 'buisness' spelling (typo), using correct key
    const result = businessData.data?.portfolio?.buisness || null;
    console.log('[getBusinessTemplate] Salon/business result:', result);
    return result;
  }
  // Handle freelancer/personal slug -> map to personal data
  if (slug === 'freelancer' || slug === 'personal') {
    const result = businessData.data?.portfolio?.personal || null;
    console.log('[getBusinessTemplate] Freelancer/personal result:', result);
    return result;
  }

  // Fallback to old businesses structure if it exists
  const fallback = businesses[slug] || null;
  console.log('[getBusinessTemplate] Fallback result:', fallback);
  return fallback;
};

export const getBusinessWebsiteData = slug => {
  return businesses[slug] || null;
};

export const getAllBusinessTypes = () => {
  return Object.keys(businesses);
};

export const updateBusinessWebsiteData = (slug, updatedData) => {
  if (businesses[slug]) {
    businesses[slug] = {
      ...businesses[slug],
      ...updatedData,
    };
    return businesses[slug];
  }
  return null;
};

// Ecommerce functions - using JSON data directly
export const getProductsByCategory = categorySlug => {
  return ecommerceProducts.filter(product => product.category === categorySlug);
};

export const getProductById = id => {
  return ecommerceProducts.find(product => product.id === parseInt(id));
};

export const getFeaturedProducts = () => {
  return ecommerceProducts.filter(product => product.featured);
};

export const getOnSaleProducts = () => {
  return ecommerceProducts.filter(product => product.pricing?.onSale);
};

export const getProductsByAvailability = availability => {
  return ecommerceProducts.filter(
    product => product.availability?.status === availability
  );
};

export const getProductAvailabilityStatus = product => {
  if (!product?.availability) return 'unknown';
  const { status, quantity } = product.availability;

  if (status === 'out_of_stock' || quantity === 0) {
    return 'out_of_stock';
  } else if (status === 'limited_stock' || quantity <= 5) {
    return 'limited_stock';
  } else if (status === 'pre_order') {
    return 'pre_order';
  } else {
    return 'in_stock';
  }
};

export const getProductAvailabilityLabel = status => {
  const labels = {
    in_stock: 'In Stock',
    out_of_stock: 'Out of Stock',
    limited_stock: 'Limited Stock',
    pre_order: 'Pre Order',
    unknown: 'Unknown',
  };
  return labels[status] || 'Unknown';
};

export const getProductAvailabilityColor = status => {
  const colors = {
    in_stock: '#10b981',
    out_of_stock: '#ef4444',
    limited_stock: '#f59e0b',
    pre_order: '#3b82f6',
    unknown: '#6b7280',
  };
  return colors[status] || '#6b7280';
};

export const getEcommerceVendorsByLocation = (city, state) => {
  return ecommerceVendors.filter(
    vendor =>
      vendor.businessInfo?.address?.city?.toLowerCase() ===
        city.toLowerCase() &&
      vendor.businessInfo?.address?.state?.toLowerCase() === state.toLowerCase()
  );
};

export const getEcommerceVendorById = id => {
  return ecommerceVendors.find(vendor => vendor.id === id);
};

export const getEcommerceVendorBySlug = slug => {
  return ecommerceVendors.find(vendor => vendor.slug === slug);
};

export const getEcommerceVendorByIdOrSlug = identifier => {
  const vendorBySlug = getEcommerceVendorBySlug(identifier);
  if (vendorBySlug) return vendorBySlug;
  return getEcommerceVendorById(identifier);
};

export const getEcommerceFeaturedVendors = () => {
  return ecommerceVendors.filter(vendor => vendor.featured);
};

export const searchEcommerceVendors = query => {
  const searchTerm = query.toLowerCase();
  return ecommerceVendors.filter(
    vendor =>
      vendor.name.toLowerCase().includes(searchTerm) ||
      vendor.businessInfo?.description?.toLowerCase().includes(searchTerm)
  );
};

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
