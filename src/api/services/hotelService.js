// Hotel service
// Handles all hotel-related API calls

import httpClient from '../client/httpClient';
import { HOTEL_ENDPOINTS, buildUrlWithParams } from '../config/endpoints';
import { FEATURE_FLAGS } from '../config/config';

// Import dummy data for development/mocking
import hotelData from '../../DummyData/hotels.json';

class HotelService {
  constructor() {
    this.mockMode = FEATURE_FLAGS.enableMocking;
  }

  // Helper function to simulate network delay
  _simulateDelay(ms = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Helper function to create API response structure
  _createAPIResponse(data, success = true, message = '') {
    return {
      success,
      data,
      message,
      timestamp: new Date().toISOString(),
    };
  }

  // Get all hotels with optional filtering
  async fetchHotels(filters = {}) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);

        // Since we have a single hotel object, create array for compatibility
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
          hotels = hotels.filter(
            hotel => hotel.startingPrice <= filters.maxPrice
          );
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

        return this._createAPIResponse(hotels);
      }

      const url = buildUrlWithParams(HOTEL_ENDPOINTS.BASE, filters);
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch hotels: ${error.message}`);
    }
  }

  // Get hotel by ID or slug
  async fetchHotelById(identifier) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(400);

        const hotel = hotelData.data.hotel;
        const matches =
          hotel.id === parseInt(identifier) || hotel.slug === identifier;

        if (!matches) {
          return this._createAPIResponse(null, false, 'Hotel not found');
        }

        return this._createAPIResponse(hotel);
      }

      const response = await httpClient.get(HOTEL_ENDPOINTS.HOTEL(identifier));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch hotel: ${error.message}`);
    }
  }

  // Get hotel sections (for dynamic rendering)
  async fetchHotelSections(hotelId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(200);

        const hotel = hotelData.data.hotel;
        if (hotel.id !== parseInt(hotelId)) {
          return this._createAPIResponse(null, false, 'Hotel not found');
        }

        return this._createAPIResponse({
          sections: hotel.sections,
          sectionOrder: hotel.sectionOrder,
          sectionVisibility: hotel.sectionVisibility,
        });
      }

      const response = await httpClient.get(HOTEL_ENDPOINTS.SECTIONS(hotelId));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch hotel sections: ${error.message}`);
    }
  }

  // Get hotels by owner
  async fetchOwnerHotels(ownerId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);

        const hotel = hotelData.data.hotel;
        const ownerHotels = hotel.ownerId === ownerId ? [hotel] : [];

        return this._createAPIResponse(ownerHotels);
      }

      const response = await httpClient.get(HOTEL_ENDPOINTS.BY_OWNER(ownerId));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch owner hotels: ${error.message}`);
    }
  }

  // Get hotel rooms
  async fetchHotelRooms(hotelId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(250);

        const hotel = hotelData.data.hotel;
        if (hotel.id !== parseInt(hotelId)) {
          return this._createAPIResponse(null, false, 'Hotel not found');
        }

        return this._createAPIResponse(hotel.rooms || []);
      }

      const response = await httpClient.get(HOTEL_ENDPOINTS.ROOMS(hotelId));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch hotel rooms: ${error.message}`);
    }
  }

  // Get room by ID
  async fetchRoomById(hotelId, roomId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(200);

        const hotel = hotelData.data.hotel;
        if (hotel.id !== parseInt(hotelId)) {
          return this._createAPIResponse(null, false, 'Hotel not found');
        }

        const room = hotel.rooms?.find(r => r.id === parseInt(roomId));

        if (!room) {
          return this._createAPIResponse(null, false, 'Room not found');
        }

        return this._createAPIResponse(room);
      }

      const response = await httpClient.get(
        HOTEL_ENDPOINTS.ROOM(hotelId, roomId)
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch room: ${error.message}`);
    }
  }

  // Get bookings (all or filtered)
  async fetchBookings(filters = {}) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);

        let bookings = [...hotelData.data.bookings];

        if (filters.userId) {
          bookings = bookings.filter(
            booking => booking.userId === filters.userId
          );
        }

        if (filters.hotelId) {
          bookings = bookings.filter(
            booking => booking.hotelId === parseInt(filters.hotelId)
          );
        }

        if (filters.status) {
          bookings = bookings.filter(
            booking => booking.status === filters.status
          );
        }

        return this._createAPIResponse(bookings);
      }

      const url = buildUrlWithParams(HOTEL_ENDPOINTS.BOOKINGS, filters);
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
  }

  // Create booking
  async createBooking(bookingData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(500);
        const newBooking = {
          id: `booking-${Date.now()}`,
          ...bookingData,
          bookingDate: new Date().toISOString().split('T')[0],
          status: 'pending',
          createdAt: new Date().toISOString(),
        };

        return this._createAPIResponse(
          newBooking,
          true,
          'Booking created successfully'
        );
      }

      const response = await httpClient.post(
        HOTEL_ENDPOINTS.BOOKINGS,
        bookingData
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create booking: ${error.message}`);
    }
  }

  // Update booking
  async updateBooking(bookingId, bookingData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(400);
        const updatedBooking = {
          ...bookingData,
          id: bookingId,
          updatedAt: new Date().toISOString(),
        };

        return this._createAPIResponse(
          updatedBooking,
          true,
          'Booking updated successfully'
        );
      }

      const response = await httpClient.put(
        HOTEL_ENDPOINTS.BOOKING(bookingId),
        bookingData
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update booking: ${error.message}`);
    }
  }

  // Get hotel reviews
  async fetchHotelReviews(hotelId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(200);

        const hotel = hotelData.data.hotel;
        if (hotel.id !== parseInt(hotelId) || !hotel.sections.testimonials) {
          return this._createAPIResponse([]);
        }

        return this._createAPIResponse(
          hotel.sections.testimonials.reviews || []
        );
      }

      const response = await httpClient.get(HOTEL_ENDPOINTS.REVIEWS(hotelId));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch hotel reviews: ${error.message}`);
    }
  }

  // Search hotels
  async searchHotels(searchTerm) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(400);

        const hotel = hotelData.data.hotel;

        if (!searchTerm || searchTerm.trim() === '') {
          return this._createAPIResponse([hotel]);
        }

        const term = searchTerm.toLowerCase();
        const matches =
          hotel.name.toLowerCase().includes(term) ||
          hotel.city.toLowerCase().includes(term) ||
          hotel.location.toLowerCase().includes(term) ||
          hotel.description.toLowerCase().includes(term);

        const hotels = matches ? [hotel] : [];

        return this._createAPIResponse(hotels);
      }

      const url = buildUrlWithParams(HOTEL_ENDPOINTS.SEARCH, { q: searchTerm });
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search hotels: ${error.message}`);
    }
  }

  // Get amenities list
  async fetchAmenitiesList() {
    try {
      if (this.mockMode) {
        await this._simulateDelay(100);
        return this._createAPIResponse(hotelData.data.amenitiesList);
      }

      const response = await httpClient.get(HOTEL_ENDPOINTS.AMENITIES);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch amenities: ${error.message}`);
    }
  }

  // Get hotels by city
  async fetchHotelsByCity(city) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);

        const hotel = hotelData.data.hotel;
        const matches = hotel.city.toLowerCase().includes(city.toLowerCase());
        const hotels = matches ? [hotel] : [];

        return this._createAPIResponse(hotels);
      }

      const response = await httpClient.get(HOTEL_ENDPOINTS.BY_CITY(city));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch hotels by city: ${error.message}`);
    }
  }

  // Get featured hotels
  async fetchFeaturedHotels(limit = 4) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(250);

        const hotel = hotelData.data.hotel;
        const featuredHotels = [hotel].slice(0, limit);

        return this._createAPIResponse(featuredHotels);
      }

      const url = buildUrlWithParams(HOTEL_ENDPOINTS.FEATURED, { limit });
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch featured hotels: ${error.message}`);
    }
  }

  // Update hotel information
  async updateHotel(hotelId, hotelData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(600);
        const updatedHotel = {
          ...hotelData,
          id: parseInt(hotelId),
          updatedAt: new Date().toISOString(),
        };

        return this._createAPIResponse(
          updatedHotel,
          true,
          'Hotel updated successfully'
        );
      }

      const response = await httpClient.put(
        HOTEL_ENDPOINTS.HOTEL(hotelId),
        hotelData
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update hotel: ${error.message}`);
    }
  }

  // Helper functions for backward compatibility
  getHotelByIdOrSlug(identifier) {
    const hotel = hotelData.data.hotel;
    return hotel.id === parseInt(identifier) || hotel.slug === identifier
      ? hotel
      : null;
  }

  getHotelById(id) {
    const hotel = hotelData.data.hotel;
    return hotel.id === parseInt(id) ? hotel : null;
  }

  getHotelBySlug(slug) {
    const hotel = hotelData.data.hotel;
    return hotel.slug === slug ? hotel : null;
  }

  getRoomById(hotelId, roomId) {
    const hotel = this.getHotelById(hotelId);
    return hotel?.rooms?.find(r => r.id === parseInt(roomId));
  }

  // Export static data for components that need immediate access
  getStaticHotelData() {
    return [hotelData.data.hotel]; // Return as array for compatibility
  }

  getStaticBookingsData() {
    return hotelData.data.bookings;
  }

  getStaticAmenitiesData() {
    return hotelData.data.amenitiesList;
  }

  // For owner dashboard - get hotels by owner ID
  getOwnerHotels(ownerId) {
    const hotel = hotelData.data.hotel;
    return hotel.ownerId === ownerId ? [hotel] : [];
  }

  // Toggle mock mode
  setMockMode(enabled) {
    this.mockMode = enabled;
  }
}

// Create and export singleton instance
const hotelService = new HotelService();

export { HotelService };
export default hotelService;
