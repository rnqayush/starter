// Hotel API utility - simulates real API calls using JSON data
import hotelData from '../DummyData/hotels.json';

// Simulate network delay for realistic API behavior
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate API response structure
const createApiResponse = (data, success = true, message = '') => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString(),
});

// Get all hotels with optional filtering
export const fetchHotels = async (filters = {}) => {
  await delay(300);

  // Since we now have a single hotel object, create array for compatibility
  let hotels = [hotelData.data.hotel];

  // Apply filters
  if (filters.city) {
    hotels = hotels.filter(hotel =>
      hotel.city.toLowerCase().includes(filters.city.toLowerCase())
    );
  }

  if (filters.minRating) {
    hotels = hotels.filter(hotel => hotel.rating >= filters.minRating);
  }

  if (filters.maxPrice) {
    hotels = hotels.filter(hotel => hotel.startingPrice <= filters.maxPrice);
  }

  if (filters.amenities && filters.amenities.length > 0) {
    hotels = hotels.filter(hotel =>
      filters.amenities.some(amenity =>
        hotel.sections.amenities.categories.some(category =>
          category.items.some(item =>
            item.toLowerCase().includes(amenity.toLowerCase())
          )
        )
      )
    );
  }

  return createApiResponse(hotels);
};

// Get hotel by ID or slug
export const fetchHotelById = async identifier => {
  await delay(400);

  // With single hotel object, check if it matches
  const hotel = hotelData.data.hotel;
  const matches =
    hotel.id === parseInt(identifier) || hotel.slug === identifier;

  if (!matches) {
    return createApiResponse(null, false, 'Hotel not found');
  }

  return createApiResponse(hotel);
};

// Get hotel sections (for dynamic rendering)
export const fetchHotelSections = async hotelId => {
  await delay(200);

  const hotel = hotelData.data.hotel;
  if (hotel.id !== parseInt(hotelId)) {
    return createApiResponse(null, false, 'Hotel not found');
  }

  return createApiResponse({
    sections: hotel.sections,
    sectionOrder: hotel.sectionOrder,
    sectionVisibility: hotel.sectionVisibility,
  });
};

// Get hotels by owner
export const fetchOwnerHotels = async ownerId => {
  await delay(300);

  // With single hotel object, check if owner matches
  const hotel = hotelData.data.hotel;
  const ownerHotels = hotel.ownerId === ownerId ? [hotel] : [];

  return createApiResponse(ownerHotels);
};

// Get hotel rooms
export const fetchHotelRooms = async hotelId => {
  await delay(250);

  const hotel = hotelData.data.hotel;
  if (hotel.id !== parseInt(hotelId)) {
    return createApiResponse(null, false, 'Hotel not found');
  }

  return createApiResponse(hotel.rooms || []);
};

// Get room by ID
export const fetchRoomById = async (hotelId, roomId) => {
  await delay(200);

  const hotel = hotelData.data.hotel;
  if (hotel.id !== parseInt(hotelId)) {
    return createApiResponse(null, false, 'Hotel not found');
  }

  const room = hotel.rooms?.find(r => r.id === parseInt(roomId));

  if (!room) {
    return createApiResponse(null, false, 'Room not found');
  }

  return createApiResponse(room);
};

// Get bookings (all or filtered)
export const fetchBookings = async (filters = {}) => {
  await delay(300);

  let bookings = [...hotelData.data.bookings];

  if (filters.userId) {
    bookings = bookings.filter(booking => booking.userId === filters.userId);
  }

  if (filters.hotelId) {
    bookings = bookings.filter(
      booking => booking.hotelId === parseInt(filters.hotelId)
    );
  }

  if (filters.status) {
    bookings = bookings.filter(booking => booking.status === filters.status);
  }

  return createApiResponse(bookings);
};

// Get hotel reviews
export const fetchHotelReviews = async hotelId => {
  await delay(200);

  const hotel = hotelData.data.hotel;
  if (hotel.id !== parseInt(hotelId) || !hotel.sections.testimonials) {
    return createApiResponse([]);
  }

  return createApiResponse(hotel.sections.testimonials.reviews || []);
};

// Search hotels
export const searchHotels = async searchTerm => {
  await delay(400);

  const hotel = hotelData.data.hotel;

  if (!searchTerm || searchTerm.trim() === '') {
    return createApiResponse([hotel]);
  }

  const term = searchTerm.toLowerCase();
  const matches =
    hotel.name.toLowerCase().includes(term) ||
    hotel.city.toLowerCase().includes(term) ||
    hotel.location.toLowerCase().includes(term) ||
    hotel.description.toLowerCase().includes(term);

  const hotels = matches ? [hotel] : [];

  return createApiResponse(hotels);
};

// Get amenities list
export const fetchAmenitiesList = async () => {
  await delay(100);

  return createApiResponse(hotelData.data.amenitiesList);
};

// Get hotels by city
export const fetchHotelsByCity = async city => {
  await delay(300);

  const hotel = hotelData.data.hotel;
  const matches = hotel.city.toLowerCase().includes(city.toLowerCase());
  const hotels = matches ? [hotel] : [];

  return createApiResponse(hotels);
};

// Get featured hotels (can be based on rating, or custom logic)
export const fetchFeaturedHotels = async (limit = 4) => {
  await delay(250);

  // With single hotel, return it if it qualifies as featured
  const hotel = hotelData.data.hotel;
  const featuredHotels = [hotel].slice(0, limit);

  return createApiResponse(featuredHotels);
};

// Helper functions for backward compatibility
export const getHotelByIdOrSlug = identifier => {
  const hotel = hotelData.data.hotel;
  return hotel.id === parseInt(identifier) || hotel.slug === identifier
    ? hotel
    : null;
};

export const getHotelById = id => {
  const hotel = hotelData.data.hotel;
  return hotel.id === parseInt(id) ? hotel : null;
};

export const getHotelBySlug = slug => {
  const hotel = hotelData.data.hotel;
  return hotel.slug === slug ? hotel : null;
};

export const getRoomById = (hotelId, roomId) => {
  const hotel = getHotelById(hotelId);
  return hotel?.rooms?.find(r => r.id === parseInt(roomId));
};

// Export the data for components that need immediate access
export const getStaticHotelData = () => [hotelData.data.hotel]; // Return as array for compatibility
export const getStaticBookingsData = () => hotelData.data.bookings;
export const getStaticAmenitiesData = () => hotelData.data.amenitiesList;

// For owner dashboard - get hotels by owner ID
export const getOwnerHotels = ownerId => {
  const hotel = hotelData.data.hotel;
  return hotel.ownerId === ownerId ? [hotel] : [];
};

// Default export
export default {
  fetchHotels,
  fetchHotelById,
  fetchHotelSections,
  fetchOwnerHotels,
  fetchHotelRooms,
  fetchRoomById,
  fetchBookings,
  fetchHotelReviews,
  searchHotels,
  fetchAmenitiesList,
  fetchHotelsByCity,
  fetchFeaturedHotels,
  // Sync methods for immediate access
  getHotelByIdOrSlug,
  getHotelById,
  getHotelBySlug,
  getRoomById,
  getStaticHotelData,
  getStaticBookingsData,
  getStaticAmenitiesData,
  getOwnerHotels,
};
