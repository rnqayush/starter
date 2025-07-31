const Hotel = require('../models/Hotel');
const Business = require('../models/Business');
const asyncHandler = require('../utils/asyncHandler');
const { successResponse, errorResponse } = require('../utils/responseHandler');

// @desc    Search hotels with advanced filters
// @route   GET /api/hotels/search
// @access  Public
const searchHotels = asyncHandler(async (req, res) => {
  const {
    location,
    checkIn,
    checkOut,
    guests,
    minPrice,
    maxPrice,
    starRating,
    amenities,
    category,
    sortBy = 'name',
    sortOrder = 'asc',
    page = 1,
    limit = 10
  } = req.query;

  // Build search query
  let query = { isActive: true };

  // Location search (city, state, or country)
  if (location) {
    const locationRegex = new RegExp(location, 'i');
    const businesses = await Business.find({
      $or: [
        { 'address.city': locationRegex },
        { 'address.state': locationRegex },
        { 'address.country': locationRegex }
      ]
    }).select('_id');
    
    const businessIds = businesses.map(b => b._id);
    query.business = { $in: businessIds };
  }

  // Star rating filter
  if (starRating) {
    query.starRating = { $gte: parseInt(starRating) };
  }

  // Category filter
  if (category) {
    query.category = category;
  }

  // Price range filter (based on room pricing)
  if (minPrice || maxPrice) {
    const priceQuery = {};
    if (minPrice) priceQuery.$gte = parseInt(minPrice);
    if (maxPrice) priceQuery.$lte = parseInt(maxPrice);
    query['rooms.pricing.basePrice'] = priceQuery;
  }

  // Amenities filter
  if (amenities) {
    const amenitiesArray = amenities.split(',');
    query.$or = [
      { 'amenities.general': { $in: amenitiesArray } },
      { 'amenities.business': { $in: amenitiesArray } },
      { 'amenities.wellness': { $in: amenitiesArray } },
      { 'amenities.dining': { $in: amenitiesArray } },
      { 'amenities.connectivity': { $in: amenitiesArray } }
    ];
  }

  // Guest capacity filter
  if (guests) {
    const guestCount = parseInt(guests);
    query['rooms.capacity.adults'] = { $gte: guestCount };
  }

  // Date availability filter (simplified - in production, this would be more complex)
  if (checkIn && checkOut) {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    // Find hotels with available rooms (not blocked for these dates)
    query['rooms.availability.blockedDates'] = {
      $not: {
        $elemMatch: {
          $or: [
            { start: { $lte: checkInDate }, end: { $gte: checkInDate } },
            { start: { $lte: checkOutDate }, end: { $gte: checkOutDate } },
            { start: { $gte: checkInDate }, end: { $lte: checkOutDate } }
          ]
        }
      }
    };
  }

  // Sorting
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Pagination
  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    const hotels = await Hotel.find(query)
      .populate('business', 'name address contact')
      .select('-reviews -__v')
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Hotel.countDocuments(query);
    const totalPages = Math.ceil(total / parseInt(limit));

    // Calculate average price for each hotel
    const hotelsWithAvgPrice = hotels.map(hotel => {
      const hotelObj = hotel.toObject();
      if (hotelObj.rooms && hotelObj.rooms.length > 0) {
        const avgPrice = hotelObj.rooms.reduce((sum, room) => sum + room.pricing.basePrice, 0) / hotelObj.rooms.length;
        hotelObj.averagePrice = Math.round(avgPrice);
      }
      return hotelObj;
    });

    return successResponse(res, {
      hotels: hotelsWithAvgPrice,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalResults: total,
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      },
      filters: {
        location,
        checkIn,
        checkOut,
        guests,
        minPrice,
        maxPrice,
        starRating,
        amenities,
        category
      }
    }, 'Hotels retrieved successfully');

  } catch (error) {
    console.error('Hotel search error:', error);
    return errorResponse(res, 'Error searching hotels', 500);
  }
});

// @desc    Get hotel availability for specific dates
// @route   GET /api/hotels/:id/availability
// @access  Public
const checkHotelAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut, roomType } = req.query;

  if (!checkIn || !checkOut) {
    return errorResponse(res, 'Check-in and check-out dates are required', 400);
  }

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);

  if (checkInDate >= checkOutDate) {
    return errorResponse(res, 'Check-out date must be after check-in date', 400);
  }

  try {
    const hotel = await Hotel.findById(id).populate('business', 'name contact');

    if (!hotel) {
      return errorResponse(res, 'Hotel not found', 404);
    }

    // Check availability for each room type
    const availableRooms = hotel.rooms.filter(room => {
      // Filter by room type if specified
      if (roomType && room.type !== roomType) {
        return false;
      }

      // Check if room is active
      if (!room.isActive) {
        return false;
      }

      // Check if dates are blocked
      const isBlocked = room.availability.blockedDates.some(blockedPeriod => {
        return (
          (blockedPeriod.start <= checkInDate && blockedPeriod.end >= checkInDate) ||
          (blockedPeriod.start <= checkOutDate && blockedPeriod.end >= checkOutDate) ||
          (blockedPeriod.start >= checkInDate && blockedPeriod.end <= checkOutDate)
        );
      });

      return !isBlocked && room.availability.availableRooms > 0;
    });

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    // Calculate pricing for available rooms
    const roomsWithPricing = availableRooms.map(room => ({
      ...room.toObject(),
      totalPrice: room.pricing.basePrice * nights,
      pricePerNight: room.pricing.basePrice,
      nights
    }));

    return successResponse(res, {
      hotel: {
        id: hotel._id,
        name: hotel.name,
        business: hotel.business
      },
      checkIn: checkInDate,
      checkOut: checkOutDate,
      nights,
      availableRooms: roomsWithPricing,
      totalAvailableRooms: roomsWithPricing.length
    }, 'Availability checked successfully');

  } catch (error) {
    console.error('Availability check error:', error);
    return errorResponse(res, 'Error checking availability', 500);
  }
});

// @desc    Get popular hotels (by bookings/ratings)
// @route   GET /api/hotels/popular
// @access  Public
const getPopularHotels = asyncHandler(async (req, res) => {
  const { limit = 6 } = req.query;

  try {
    const popularHotels = await Hotel.find({ isActive: true })
      .populate('business', 'name address')
      .select('name description category starRating images analytics')
      .sort({ 'analytics.totalBookings': -1, 'analytics.averageRating': -1 })
      .limit(parseInt(limit));

    return successResponse(res, {
      hotels: popularHotels
    }, 'Popular hotels retrieved successfully');

  } catch (error) {
    console.error('Popular hotels error:', error);
    return errorResponse(res, 'Error retrieving popular hotels', 500);
  }
});

// @desc    Get hotel recommendations based on location/preferences
// @route   GET /api/hotels/recommendations
// @access  Public
const getHotelRecommendations = asyncHandler(async (req, res) => {
  const { location, category, maxPrice, amenities } = req.query;

  let query = { isActive: true };

  // Location-based recommendations
  if (location) {
    const locationRegex = new RegExp(location, 'i');
    const businesses = await Business.find({
      $or: [
        { 'address.city': locationRegex },
        { 'address.state': locationRegex }
      ]
    }).select('_id');
    
    const businessIds = businesses.map(b => b._id);
    query.business = { $in: businessIds };
  }

  // Category preference
  if (category) {
    query.category = category;
  }

  // Price preference
  if (maxPrice) {
    query['rooms.pricing.basePrice'] = { $lte: parseInt(maxPrice) };
  }

  // Amenities preference
  if (amenities) {
    const amenitiesArray = amenities.split(',');
    query.$or = [
      { 'amenities.general': { $in: amenitiesArray } },
      { 'amenities.wellness': { $in: amenitiesArray } },
      { 'amenities.dining': { $in: amenitiesArray } }
    ];
  }

  try {
    const recommendations = await Hotel.find(query)
      .populate('business', 'name address')
      .select('name description category starRating images analytics')
      .sort({ 'analytics.averageRating': -1, 'analytics.totalBookings': -1 })
      .limit(8);

    return successResponse(res, {
      recommendations
    }, 'Hotel recommendations retrieved successfully');

  } catch (error) {
    console.error('Recommendations error:', error);
    return errorResponse(res, 'Error retrieving recommendations', 500);
  }
});

module.exports = {
  searchHotels,
  checkHotelAvailability,
  getPopularHotels,
  getHotelRecommendations
};

