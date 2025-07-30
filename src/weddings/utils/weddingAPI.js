// Wedding API utility - mimics an API response with JSON data
import weddingData from '../data/wedding.json';

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

// Convert vendors object to array for backward compatibility
const convertVendorsToArray = vendorsObject => {
  if (!vendorsObject || typeof vendorsObject !== 'object') {
    return [];
  }
  return Object.values(vendorsObject);
};

// Get static vendor data from JSON (converted to array for compatibility)
export const getStaticWeddingVendors = () => {
  try {
    const data = getWeddingData();
    // Handle both old array format and new object format
    if (Array.isArray(data.vendors)) {
      return data.vendors;
    } else if (data.vendors && typeof data.vendors === 'object') {
      return convertVendorsToArray(data.vendors);
    }
    return [];
  } catch (error) {
    console.error('Error loading wedding vendors:', error);
    return [];
  }
};

// Get vendors object (new format)
export const getVendorsObject = () => {
  try {
    const data = getWeddingData();
    if (
      data.vendors &&
      typeof data.vendors === 'object' &&
      !Array.isArray(data.vendors)
    ) {
      return data.vendors;
    } else if (Array.isArray(data.vendors)) {
      // Convert array to object for new format
      const vendorsObj = {};
      data.vendors.forEach(vendor => {
        if (vendor.id) {
          vendorsObj[vendor.id] = vendor;
        }
      });
      return vendorsObj;
    }
    return {};
  } catch (error) {
    console.error('Error loading vendors object:', error);
    return {};
  }
};

// Get sections configuration
export const getSections = () => {
  try {
    const data = getWeddingData();
    return data.sections || {};
  } catch (error) {
    console.error('Error loading sections:', error);
    return {};
  }
};

// Get website templates
export const getWebsiteTemplates = () => {
  try {
    const data = getWeddingData();
    return data.websiteTemplates || {};
  } catch (error) {
    console.error('Error loading website templates:', error);
    return {};
  }
};

// Get default section order
export const getDefaultSectionOrder = () => {
  try {
    const data = getWeddingData();
    return (
      data.defaultSectionOrder || [
        'hero',
        'about-us',
        'services-offered',
        'recent-work',
        'gallery',
        'packages-pricing',
        'testimonials',
        'faq',
        'contact',
        'footer',
      ]
    );
  } catch (error) {
    console.error('Error loading default section order:', error);
    return [
      'hero',
      'about-us',
      'services-offered',
      'recent-work',
      'gallery',
      'packages-pricing',
      'testimonials',
      'faq',
      'contact',
      'footer',
    ];
  }
};

// Get default section visibility
export const getDefaultSectionVisibility = () => {
  try {
    const data = getWeddingData();
    return (
      data.defaultSectionVisibility || {
        hero: true,
        'about-us': true,
        'services-offered': true,
        'recent-work': true,
        gallery: true,
        'packages-pricing': true,
        testimonials: true,
        faq: true,
        contact: true,
        footer: true,
      }
    );
  } catch (error) {
    console.error('Error loading default section visibility:', error);
    return {
      hero: true,
      'about-us': true,
      'services-offered': true,
      'recent-work': true,
      gallery: true,
      'packages-pricing': true,
      testimonials: true,
      faq: true,
      contact: true,
      footer: true,
    };
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
      data: convertVendorsToArray(data.vendors) || [],
      meta: weddingData.meta,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};

// Get vendor by ID - works with both array and object formats
export const getVendorById = id => {
  try {
    const data = getWeddingData();

    // Try object format first (new format)
    if (
      data.vendors &&
      typeof data.vendors === 'object' &&
      !Array.isArray(data.vendors)
    ) {
      return data.vendors[id] || null;
    }

    // Fallback to array format (old format)
    if (Array.isArray(data.vendors)) {
      return data.vendors.find(vendor => vendor.id === id) || null;
    }

    return null;
  } catch (error) {
    console.error('Error finding vendor by ID:', error);
    return null;
  }
};

// Get vendor by ID (async version)
export const getVendorByIdAsync = async id => {
  await simulateApiDelay();
  return getVendorById(id);
};

// Get vendors by location
export const getVendorsByLocation = (city, state) => {
  try {
    const vendors = getStaticWeddingVendors();
    return vendors.filter(
      vendor =>
        vendor.city &&
        vendor.state &&
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
export const searchVendors = query => {
  try {
    const vendors = getStaticWeddingVendors();
    const searchTerm = query.toLowerCase();
    return vendors.filter(
      vendor =>
        (vendor.name && vendor.name.toLowerCase().includes(searchTerm)) ||
        (vendor.specialties &&
          vendor.specialties.some(specialty =>
            specialty.toLowerCase().includes(searchTerm)
          )) ||
        (vendor.description &&
          vendor.description.toLowerCase().includes(searchTerm))
    );
  } catch (error) {
    console.error('Error searching vendors:', error);
    return [];
  }
};

// Search vendors (async version)
export const searchVendorsAsync = async query => {
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
      meta: weddingData.meta,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: [],
    };
  }
};

// Get bookings by vendor ID
export const getBookingsByVendorId = vendorId => {
  try {
    const bookings = getStaticWeddingBookings();
    return bookings.filter(booking => booking.vendorId === vendorId);
  } catch (error) {
    console.error('Error finding bookings by vendor ID:', error);
    return [];
  }
};

// Get bookings by user ID
export const getBookingsByUserId = userId => {
  try {
    const bookings = getStaticWeddingBookings();
    return bookings.filter(booking => booking.userId === userId);
  } catch (error) {
    console.error('Error finding bookings by user ID:', error);
    return [];
  }
};

// Create booking (simulate API call)
export const createBooking = async bookingData => {
  await simulateApiDelay(500); // Longer delay for create operations
  try {
    // In a real API, this would create the booking on the server
    const newBooking = {
      id: `booking-${Date.now()}`,
      ...bookingData,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'pending',
    };

    return {
      success: true,
      data: newBooking,
      message: 'Booking created successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null,
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
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: updatedVendor,
      message: 'Vendor updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Update vendor sections
export const updateVendorSections = async (vendorId, sectionsData) => {
  await simulateApiDelay(300);
  try {
    const vendor = getVendorById(vendorId);
    if (!vendor) {
      throw new Error('Vendor not found');
    }

    const updatedVendor = {
      ...vendor,
      ...sectionsData,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: updatedVendor,
      message: 'Vendor sections updated successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Get vendor statistics
export const getVendorStats = async vendorId => {
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
        confirmedBookings: bookings.filter(b => b.status === 'confirmed')
          .length,
        pendingBookings: bookings.filter(b => b.status === 'pending').length,
        totalRevenue: bookings
          .filter(b => b.status === 'confirmed')
          .reduce((sum, b) => sum + (b.totalPrice || 0), 0),
        rating: vendor.rating,
        reviewCount: vendor.reviewCount,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }
};

// Create a new wedding website
export const createWeddingWebsite = async (
  vendorData,
  templateId = 'default'
) => {
  await simulateApiDelay(500);
  try {
    const templates = getWebsiteTemplates();
    const template = templates[templateId] || templates['default'];
    const sections = getSections();

    const newVendor = {
      id: vendorData.id || `vendor-${Date.now()}`,
      ...vendorData,
      sectionOrder: template.sections || getDefaultSectionOrder(),
      sectionVisibility: getDefaultSectionVisibility(),
      theme: template.theme || {
        primaryColor: '#db2777',
        secondaryColor: '#f472b6',
        backgroundColor: '#fdf2f8',
        textColor: '#1f2937',
      },
      sections: template.sections.reduce((acc, sectionId) => {
        if (sections[sectionId]) {
          acc[sectionId] = {
            ...sections[sectionId],
            enabled: true,
            customContent: {},
          };
        }
        return acc;
      }, {}),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: newVendor,
      message: 'Wedding website created successfully',
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      data: null,
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
  getVendorsObject,
  getSections,
  getWebsiteTemplates,
  getDefaultSectionOrder,
  getDefaultSectionVisibility,

  // Async functions
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

  // Legacy compatibility
  weddingVendors,
  getWeddingVendorById,
  getWeddingFeaturedVendors,
  getWeddingVendorsByLocation,
  searchWeddingVendors,
};

export default weddingAPI;
