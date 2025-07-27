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
  
  let hotels = [...hotelData.hotels];
  
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
export const fetchHotelById = async (identifier) => {
  await delay(400);
  
  const hotel = hotelData.hotels.find(h => 
    h.id === parseInt(identifier) || h.slug === identifier
  );
  
  if (!hotel) {
    return createApiResponse(null, false, 'Hotel not found');
  }
  
  return createApiResponse(hotel);
};

// Get hotel sections (for dynamic rendering)
export const fetchHotelSections = async (hotelId) => {
  await delay(200);
  
  const hotel = hotelData.hotels.find(h => h.id === parseInt(hotelId));
  
  if (!hotel) {
    return createApiResponse(null, false, 'Hotel not found');
  }
  
  return createApiResponse({
    sections: hotel.sections,
    sectionOrder: hotel.sectionOrder,
    sectionVisibility: hotel.sectionVisibility,
  });
};

// Get hotels by owner
export const fetchOwnerHotels = async (ownerId) => {
  await delay(300);
  
  const ownerHotels = hotelData.hotels.filter(hotel => hotel.ownerId === ownerId);
  
  return createApiResponse(ownerHotels);
};

// Get hotel rooms
export const fetchHotelRooms = async (hotelId) => {
  await delay(250);
  
  const hotel = hotelData.hotels.find(h => h.id === parseInt(hotelId));
  
  if (!hotel) {
    return createApiResponse(null, false, 'Hotel not found');
  }
  
  return createApiResponse(hotel.rooms || []);
};

// Get room by ID
export const fetchRoomById = async (hotelId, roomId) => {
  await delay(200);
  
  const hotel = hotelData.hotels.find(h => h.id === parseInt(hotelId));
  
  if (!hotel) {
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
  
  let bookings = [...hotelData.bookings];
  
  if (filters.userId) {
    bookings = bookings.filter(booking => booking.userId === filters.userId);
  }
  
  if (filters.hotelId) {
    bookings = bookings.filter(booking => booking.hotelId === parseInt(filters.hotelId));
  }
  
  if (filters.status) {
    bookings = bookings.filter(booking => booking.status === filters.status);
  }
  
  return createApiResponse(bookings);
};

// Get hotel reviews
export const fetchHotelReviews = async (hotelId) => {
  await delay(200);
  
  const hotel = hotelData.hotels.find(h => h.id === parseInt(hotelId));
  
  if (!hotel || !hotel.sections.testimonials) {
    return createApiResponse([]);
  }
  
  return createApiResponse(hotel.sections.testimonials.reviews || []);
};

// Search hotels
export const searchHotels = async (searchTerm) => {
  await delay(400);
  
  if (!searchTerm || searchTerm.trim() === '') {
    return createApiResponse(hotelData.hotels);
  }
  
  const term = searchTerm.toLowerCase();
  const hotels = hotelData.hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(term) ||
    hotel.city.toLowerCase().includes(term) ||
    hotel.location.toLowerCase().includes(term) ||
    hotel.description.toLowerCase().includes(term)
  );
  
  return createApiResponse(hotels);
};

// Get amenities list
export const fetchAmenitiesList = async () => {
  await delay(100);
  
  return createApiResponse(hotelData.amenitiesList);
};

// Get hotels by city
export const fetchHotelsByCity = async (city) => {
  await delay(300);
  
  const hotels = hotelData.hotels.filter(hotel =>
    hotel.city.toLowerCase().includes(city.toLowerCase())
  );
  
  return createApiResponse(hotels);
};

// Get featured hotels (can be based on rating, or custom logic)
export const fetchFeaturedHotels = async (limit = 4) => {
  await delay(250);
  
  const featuredHotels = hotelData.hotels
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
  
  return createApiResponse(featuredHotels);
};

// Helper functions for backward compatibility
export const getHotelByIdOrSlug = (identifier) => {
  return hotelData.hotels.find(h => 
    h.id === parseInt(identifier) || h.slug === identifier
  );
};

export const getHotelById = (id) => {
  return hotelData.hotels.find(h => h.id === parseInt(id));
};

export const getHotelBySlug = (slug) => {
  return hotelData.hotels.find(h => h.slug === slug);
};

export const getRoomById = (hotelId, roomId) => {
  const hotel = getHotelById(hotelId);
  return hotel?.rooms?.find(r => r.id === parseInt(roomId));
};

// Export the data for components that need immediate access
export const getStaticHotelData = () => hotelData.hotels;
export const getStaticBookingsData = () => hotelData.bookings;
export const getStaticAmenitiesData = () => hotelData.amenitiesList;

// For owner dashboard - get hotels by owner ID
export const getOwnerHotels = (ownerId) => {
  return hotelData.hotels.filter(hotel => hotel.ownerId === ownerId);
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
