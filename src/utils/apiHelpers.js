/**
 * API Helper utilities for data transformation and error handling
 */

/**
 * Transform hardcoded data structure to match API response format
 * @param {Array} items - Array of items
 * @param {Object} pagination - Pagination info
 * @returns {Object} - API-like response structure
 */
export const createApiResponse = (items = [], pagination = {}) => {
  return {
    success: true,
    data: {
      items,
      pagination: {
        page: pagination.page || 1,
        limit: pagination.limit || 10,
        total: pagination.total || items.length,
        totalPages: pagination.totalPages || Math.ceil((pagination.total || items.length) / (pagination.limit || 10)),
        hasNext: pagination.hasNext || false,
        hasPrev: pagination.hasPrev || false,
      },
    },
  };
};

/**
 * Extract error message from various error formats
 * @param {*} error - Error object
 * @returns {string} - Formatted error message
 */
export const getErrorMessage = (error) => {
  if (typeof error === 'string') return error;
  if (error?.data?.message) return error.data.message;
  if (error?.message) return error.message;
  if (error?.error) return error.error;
  if (error?.status) {
    switch (error.status) {
      case 400: return 'Bad request. Please check your input.';
      case 401: return 'You are not authorized to access this resource.';
      case 403: return 'Access denied. You do not have permission.';
      case 404: return 'The requested resource was not found.';
      case 500: return 'Internal server error. Please try again later.';
      default: return `Request failed with status ${error.status}`;
    }
  }
  return 'An unexpected error occurred.';
};

/**
 * Check if error is a network error
 * @param {*} error - Error object
 * @returns {boolean}
 */
export const isNetworkError = (error) => {
  return error?.name === 'NetworkError' || 
         error?.code === 'NETWORK_ERROR' ||
         error?.message?.includes('fetch') ||
         error?.message?.includes('network') ||
         !error?.status;
};

/**
 * Transform hardcoded hotel data to API format
 * @param {Object} hotel - Hotel object from hardcoded data
 * @returns {Object} - API-formatted hotel object
 */
export const transformHotelData = (hotel) => {
  return {
    _id: hotel.id?.toString(),
    id: hotel.id,
    name: hotel.name,
    slug: hotel.slug,
    description: hotel.description,
    location: hotel.location,
    address: hotel.address,
    city: hotel.city,
    pincode: hotel.pincode,
    rating: hotel.rating,
    starRating: hotel.starRating,
    image: hotel.image,
    images: hotel.images || [],
    amenities: hotel.amenities || [],
    checkInTime: hotel.checkInTime,
    checkOutTime: hotel.checkOutTime,
    policies: hotel.policies || [],
    startingPrice: hotel.startingPrice,
    rooms: hotel.rooms?.map(transformRoomData) || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Transform hardcoded room data to API format
 * @param {Object} room - Room object from hardcoded data
 * @returns {Object} - API-formatted room object
 */
export const transformRoomData = (room) => {
  return {
    _id: room.id?.toString(),
    id: room.id,
    name: room.name,
    type: room.type,
    price: room.price,
    maxGuests: room.maxGuests,
    bedType: room.bedType,
    description: room.description,
    images: room.images || [],
    amenities: room.amenities || [],
    available: room.available !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Transform hardcoded product data to API format
 * @param {Object} product - Product object from hardcoded data
 * @returns {Object} - API-formatted product object
 */
export const transformProductData = (product) => {
  return {
    _id: product.id?.toString(),
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    originalPrice: product.originalPrice,
    discount: product.discount,
    category: product.category,
    brand: product.brand,
    rating: product.rating,
    reviewCount: product.reviewCount || 0,
    image: product.image,
    images: product.images || [],
    inStock: product.inStock !== false,
    stock: product.stock || 0,
    features: product.features || [],
    specifications: product.specifications || {},
    vendor: product.vendor,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Transform hardcoded vehicle data to API format
 * @param {Object} vehicle - Vehicle object from hardcoded data
 * @returns {Object} - API-formatted vehicle object
 */
export const transformVehicleData = (vehicle) => {
  return {
    _id: vehicle.id?.toString(),
    id: vehicle.id,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    price: vehicle.price,
    mileage: vehicle.mileage,
    condition: vehicle.condition,
    fuelType: vehicle.fuelType,
    transmission: vehicle.transmission,
    bodyType: vehicle.bodyType,
    color: vehicle.color,
    description: vehicle.description,
    image: vehicle.image,
    images: vehicle.images || [],
    features: vehicle.features || [],
    dealer: vehicle.dealer,
    location: vehicle.location,
    available: vehicle.available !== false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Transform hardcoded vendor data to API format
 * @param {Object} vendor - Vendor object from hardcoded data
 * @returns {Object} - API-formatted vendor object
 */
export const transformVendorData = (vendor) => {
  return {
    _id: vendor.id?.toString(),
    id: vendor.id,
    name: vendor.name,
    slug: vendor.slug,
    businessName: vendor.businessName || vendor.name,
    description: vendor.description,
    category: vendor.category,
    location: vendor.location,
    address: vendor.address,
    phone: vendor.phone,
    email: vendor.email,
    website: vendor.website,
    image: vendor.image,
    images: vendor.images || [],
    rating: vendor.rating,
    reviewCount: vendor.reviewCount || 0,
    verified: vendor.verified !== false,
    featured: vendor.featured || false,
    services: vendor.services || [],
    portfolio: vendor.portfolio || [],
    socialMedia: vendor.socialMedia || {},
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
};

/**
 * Filter and search items based on parameters
 * @param {Array} items - Array of items to filter
 * @param {Object} params - Filter parameters
 * @returns {Array} - Filtered items
 */
export const filterItems = (items, params) => {
  let filtered = [...items];

  // Search filter
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filtered = filtered.filter(item => 
      item.name?.toLowerCase().includes(searchTerm) ||
      item.description?.toLowerCase().includes(searchTerm) ||
      item.category?.toLowerCase().includes(searchTerm) ||
      item.location?.toLowerCase().includes(searchTerm)
    );
  }

  // Category filter
  if (params.category) {
    filtered = filtered.filter(item => 
      item.category?.toLowerCase() === params.category.toLowerCase()
    );
  }

  // Price range filter
  if (params.priceMin) {
    filtered = filtered.filter(item => item.price >= params.priceMin);
  }
  if (params.priceMax) {
    filtered = filtered.filter(item => item.price <= params.priceMax);
  }

  // Rating filter
  if (params.rating) {
    filtered = filtered.filter(item => item.rating >= params.rating);
  }

  // Location filter
  if (params.location) {
    filtered = filtered.filter(item => 
      item.location?.toLowerCase().includes(params.location.toLowerCase()) ||
      item.city?.toLowerCase().includes(params.location.toLowerCase())
    );
  }

  // Sort items
  if (params.sortBy) {
    filtered.sort((a, b) => {
      const aVal = a[params.sortBy];
      const bVal = b[params.sortBy];
      
      if (params.sortOrder === 'desc') {
        return bVal > aVal ? 1 : -1;
      }
      return aVal > bVal ? 1 : -1;
    });
  }

  return filtered;
};

/**
 * Paginate items
 * @param {Array} items - Array of items to paginate
 * @param {number} page - Current page
 * @param {number} limit - Items per page
 * @returns {Object} - Paginated result
 */
export const paginateItems = (items, page = 1, limit = 10) => {
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

/**
 * Create a mock API response with filtering and pagination
 * @param {Array} data - Source data array
 * @param {Object} params - Query parameters
 * @returns {Object} - Mock API response
 */
export const createMockApiResponse = (data, params = {}) => {
  const filtered = filterItems(data, params);
  const paginated = paginateItems(filtered, params.page, params.limit);
  
  return createApiResponse(paginated.items, paginated.pagination);
};
