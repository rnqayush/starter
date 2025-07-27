// Wedding API utility - mimics an API response with JSON data
import weddingData from '../DummyData/wedding.json';

// Simulate API delay for realistic behavior
const simulateApiDelay = (ms = 100) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Extract data from the JSON response structure
const getWeddingData = () => {
  if (weddingData.status === 'success' && weddingData.data) {
    return weddingData.data;
  }
  throw new Error('Failed to load wedding data');
};

// Get static vendor data from JSON
export const getStaticWeddingVendors = () => {
  try {
    const data = getWeddingData();
    return data.vendors || [];
  } catch (error) {
    console.error('Error loading wedding vendors:', error);
    return [];
  }
};

// Get static bookings data from JSON
export const getStaticWeddingBookings = () => {
  try {
    const data = getWeddingData();
    return data.bookings || [];
  } catch (error) {
    console.error('Error loading wedding bookings:', error);
    return [];
  }
};

// Async API functions that simulate real API calls

// Get all vendors
export const getWeddingVendors = async () => {
  await simulateApiDelay();
  try {
    const data = getWeddingData();
    return {
      success: true,
      data: data.vendors || [],
      meta: weddingData.meta
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

// Get vendor by ID
export const getVendorById = (id) => {
  try {
    const vendors = getStaticWeddingVendors();
    return vendors.find(vendor => vendor.id === id) || null;
  } catch (error) {
    console.error('Error finding vendor by ID:', error);
    return null;
  }
};

// Get vendor by ID (async version)
export const getVendorByIdAsync = async (id) => {
  await simulateApiDelay();
  return getVendorById(id);
};

// Get vendors by location
export const getVendorsByLocation = (city, state) => {
  try {
    const vendors = getStaticWeddingVendors();
    return vendors.filter(
      vendor =>
        vendor.city.toLowerCase() === city.toLowerCase() &&
        vendor.state.toLowerCase() === state.toLowerCase()
    );
  } catch (error) {
    console.error('Error finding vendors by location:', error);
    return [];
  }
};

// Get vendors by location (async version)
export const getVendorsByLocationAsync = async (city, state) => {
  await simulateApiDelay();
  return getVendorsByLocation(city, state);
};

// Get featured vendors
export const getFeaturedVendors = () => {
  try {
    const vendors = getStaticWeddingVendors();
    return vendors.filter(vendor => vendor.featured);
  } catch (error) {
    console.error('Error finding featured vendors:', error);
    return [];
  }
};

// Get featured vendors (async version)
export const getFeaturedVendorsAsync = async () => {
  await simulateApiDelay();
  return getFeaturedVendors();
};

// Search vendors
export const searchVendors = (query) => {
  try {
    const vendors = getStaticWeddingVendors();
    const searchTerm = query.toLowerCase();
    return vendors.filter(
      vendor =>
        vendor.name.toLowerCase().includes(searchTerm) ||
        vendor.specialties?.some(specialty =>
          specialty.toLowerCase().includes(searchTerm)
        ) ||
        vendor.description.toLowerCase().includes(searchTerm)
    );
  } catch (error) {
    console.error('Error searching vendors:', error);
    return [];
  }
};

// Search vendors (async version)
export const searchVendorsAsync = async (query) => {
  await simulateApiDelay();
  return searchVendors(query);
};

// Get all bookings
export const getWeddingBookings = async () => {
  await simulateApiDelay();
  try {
    const data = getWeddingData();
    return {
      success: true,
      data: data.bookings || [],
      meta: weddingData.meta
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

// Get bookings by vendor ID
export const getBookingsByVendorId = (vendorId) => {
  try {
    const bookings = getStaticWeddingBookings();
    return bookings.filter(booking => booking.vendorId === vendorId);
  } catch (error) {
    console.error('Error finding bookings by vendor ID:', error);
    return [];
  }
};

// Get bookings by user ID
export const getBookingsByUserId = (userId) => {
  try {
    const bookings = getStaticWeddingBookings();
    return bookings.filter(booking => booking.userId === userId);
  } catch (error) {
    console.error('Error finding bookings by user ID:', error);
    return [];
  }
};

// Create booking (simulate API call)
export const createBooking = async (bookingData) => {
  await simulateApiDelay(500); // Longer delay for create operations
  try {
    // In a real API, this would create the booking on the server
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    
    return {
      success: true,
      data: newBooking,
      message: 'Booking created successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

// Update vendor (simulate API call)
export const updateVendor = async (vendorId, updateData) => {
  await simulateApiDelay(300);
  try {
    // In a real API, this would update the vendor on the server
    const vendor = getVendorById(vendorId);
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    
    const updatedVendor = {
      ...vendor,
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    
    return {
      success: true,
      data: updatedVendor,
      message: 'Vendor updated successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

// Get vendor statistics
export const getVendorStats = async (vendorId) => {
  await simulateApiDelay();
  try {
    const vendor = getVendorById(vendorId);
    const bookings = getBookingsByVendorId(vendorId);
    
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    
    return {
      success: true,
      data: {
        vendorId,
        totalBookings: bookings.length,
        confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        totalRevenue: bookings
          .filter(b => b.status === 'confirmed')
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
        rating: vendor.rating,
        reviewCount: vendor.reviewCount
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null
    };
  }
};

// Legacy compatibility - export the same function names as the old JS file
export const weddingVendors = getStaticWeddingVendors();
export const getWeddingVendorById = getVendorById;
export const getWeddingFeaturedVendors = getFeaturedVendors;
export const getWeddingVendorsByLocation = getVendorsByLocation;
export const searchWeddingVendors = searchVendors;

// Default export for easy importing
const weddingAPI = {
  // Sync functions
  getStaticWeddingVendors,
  getStaticWeddingBookings,
  getVendorById,
  getVendorsByLocation,
  getFeaturedVendors,
  searchVendors,
  getBookingsByVendorId,
  getBookingsByUserId,
  
  // Async functions
  getWeddingVendors,
  getVendorByIdAsync,
  getVendorsByLocationAsync,
  getFeaturedVendorsAsync,
  searchVendorsAsync,
  getWeddingBookings,
  createBooking,
  updateVendor,
  getVendorStats,
  
  // Legacy compatibility
  weddingVendors,
  getWeddingVendorById,
  getWeddingFeaturedVendors,
  getWeddingVendorsByLocation,
  searchWeddingVendors
};

export default weddingAPI;
