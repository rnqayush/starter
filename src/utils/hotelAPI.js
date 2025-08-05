// Legacy Hotel API file - now uses the new API structure
// This file is maintained for backward compatibility
// Please use src/api/services/hotelService for new code

import { hotelService } from '../api/services';

// Re-export all functions from the new hotel service
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

// Helper functions for backward compatibility
export const getHotelByIdOrSlug = hotelService.getHotelByIdOrSlug.bind(hotelService);
export const getHotelById = hotelService.getHotelById.bind(hotelService);
export const getHotelBySlug = hotelService.getHotelBySlug.bind(hotelService);
export const getRoomById = hotelService.getRoomById.bind(hotelService);

// Export static data methods
export const getStaticHotelData = hotelService.getStaticHotelData.bind(hotelService);
export const getStaticBookingsData = hotelService.getStaticBookingsData.bind(hotelService);
export const getStaticAmenitiesData = hotelService.getStaticAmenitiesData.bind(hotelService);
export const getOwnerHotels = hotelService.getOwnerHotels.bind(hotelService);

// Default export
const hotelAPIBundle = {
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
  getHotelByIdOrSlug,
  getHotelById,
  getHotelBySlug,
  getRoomById,
  getStaticHotelData,
  getStaticBookingsData,
  getStaticAmenitiesData,
  getOwnerHotels,
};

export default hotelAPIBundle;
