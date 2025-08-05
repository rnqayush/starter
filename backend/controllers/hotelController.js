const Hotel = require('../models/Hotel');
const hotelDummyData = require('../../src/DummyData/hotels.json');

class HotelController {
  // Get all hotels
  static async getAllHotels(req, res) {
    try {
      const { city, limit = 10, offset = 0 } = req.query;
      
      let query = { status: 'published' };
      if (city) {
        query.city = new RegExp(city, 'i');
      }

      const hotels = await Hotel.find(query)
        .populate('owner', 'name email')
        .limit(parseInt(limit))
        .skip(parseInt(offset))
        .sort({ createdAt: -1 })
        .select('-__v');

      // If no hotels in DB, return dummy data
      if (hotels.length === 0) {
        const dummyHotel = hotelDummyData.data?.hotel;
        if (dummyHotel) {
          return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Hotel data retrieved successfully',
            timestamp: new Date().toISOString(),
            data: {
              hotels: [dummyHotel],
              count: 1,
              total: 1
            }
          });
        }
      }

      const total = await Hotel.countDocuments(query);

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Hotels retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          hotels,
          count: hotels.length,
          total,
          hasMore: (parseInt(offset) + hotels.length) < total
        }
      });
    } catch (error) {
      console.error('Get all hotels error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve hotels'
      });
    }
  }

  // Get hotel by ID or slug
  static async getHotel(req, res) {
    try {
      const { identifier } = req.params;
      
      let hotel;
      
      // Try to find by ID first, then by slug
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        hotel = await Hotel.findById(identifier).populate('owner', 'name email');
      } else if (!isNaN(identifier)) {
        hotel = await Hotel.findOne({ id: parseInt(identifier) }).populate('owner', 'name email');
      } else {
        hotel = await Hotel.findOne({ slug: identifier }).populate('owner', 'name email');
      }

      // If not found in DB, return dummy data for demo
      if (!hotel) {
        const dummyHotel = hotelDummyData.data?.hotel;
        if (dummyHotel && (dummyHotel.id.toString() === identifier || dummyHotel.slug === identifier)) {
          return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Hotel data retrieved successfully',
            timestamp: new Date().toISOString(),
            data: dummyHotel
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Hotel not found'
        });
      }

      // Increment view count
      hotel.viewCount = (hotel.viewCount || 0) + 1;
      await hotel.save();

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Hotel data retrieved successfully',
        timestamp: new Date().toISOString(),
        data: hotel
      });
    } catch (error) {
      console.error('Get hotel error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve hotel data'
      });
    }
  }

  // Get hotel rooms
  static async getHotelRooms(req, res) {
    try {
      const { identifier } = req.params;
      
      let hotel;
      
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        hotel = await Hotel.findById(identifier);
      } else if (!isNaN(identifier)) {
        hotel = await Hotel.findOne({ id: parseInt(identifier) });
      } else {
        hotel = await Hotel.findOne({ slug: identifier });
      }

      if (!hotel) {
        // Return dummy data for demo
        const dummyHotel = hotelDummyData.data?.hotel;
        if (dummyHotel && (dummyHotel.id.toString() === identifier || dummyHotel.slug === identifier)) {
          return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Hotel rooms retrieved successfully',
            timestamp: new Date().toISOString(),
            data: {
              rooms: dummyHotel.rooms || [],
              hotelInfo: {
                id: dummyHotel.id,
                name: dummyHotel.name,
                slug: dummyHotel.slug
              }
            }
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Hotel not found'
        });
      }

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Hotel rooms retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          rooms: hotel.rooms || [],
          hotelInfo: {
            id: hotel.id,
            name: hotel.name,
            slug: hotel.slug
          }
        }
      });
    } catch (error) {
      console.error('Get hotel rooms error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve hotel rooms'
      });
    }
  }

  // Create new hotel
  static async create(req, res) {
    try {
      const hotelData = {
        ...req.body,
        owner: req.userId,
        ownerId: req.user._id.toString()
      };

      // Generate unique ID and slug if not provided
      if (!hotelData.id) {
        const lastHotel = await Hotel.findOne().sort({ id: -1 });
        hotelData.id = lastHotel ? lastHotel.id + 1 : 1;
      }

      if (!hotelData.slug) {
        hotelData.slug = hotelData.name.toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }

      // Ensure unique slug
      const existingHotel = await Hotel.findOne({ slug: hotelData.slug });
      if (existingHotel) {
        hotelData.slug = `${hotelData.slug}-${Date.now()}`;
      }

      const hotel = new Hotel(hotelData);
      await hotel.save();
      
      await hotel.populate('owner', 'name email');

      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Hotel created successfully',
        timestamp: new Date().toISOString(),
        data: hotel
      });
    } catch (error) {
      console.error('Create hotel error:', error);
      
      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Hotel with this slug or ID already exists'
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create hotel'
      });
    }
  }

  // Update hotel
  static async update(req, res) {
    try {
      const { identifier } = req.params;
      const updateData = req.body;

      let hotel;
      
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        hotel = await Hotel.findById(identifier);
      } else if (!isNaN(identifier)) {
        hotel = await Hotel.findOne({ id: parseInt(identifier) });
      } else {
        hotel = await Hotel.findOne({ slug: identifier });
      }

      if (!hotel) {
        return res.status(404).json({
          status: 'error',
          message: 'Hotel not found'
        });
      }

      // Check ownership
      if (hotel.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to update this hotel'
        });
      }

      // Update hotel
      Object.assign(hotel, updateData);
      await hotel.save();
      
      await hotel.populate('owner', 'name email');

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Hotel updated successfully',
        timestamp: new Date().toISOString(),
        data: hotel
      });
    } catch (error) {
      console.error('Update hotel error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update hotel'
      });
    }
  }

  // Delete hotel
  static async delete(req, res) {
    try {
      const { identifier } = req.params;

      let hotel;
      
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        hotel = await Hotel.findById(identifier);
      } else if (!isNaN(identifier)) {
        hotel = await Hotel.findOne({ id: parseInt(identifier) });
      } else {
        hotel = await Hotel.findOne({ slug: identifier });
      }

      if (!hotel) {
        return res.status(404).json({
          status: 'error',
          message: 'Hotel not found'
        });
      }

      // Check ownership
      if (hotel.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to delete this hotel'
        });
      }

      await Hotel.findByIdAndDelete(hotel._id);

      res.status(200).json({
        status: 'success',
        message: 'Hotel deleted successfully'
      });
    } catch (error) {
      console.error('Delete hotel error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete hotel'
      });
    }
  }

  // Get user's hotels
  static async getUserHotels(req, res) {
    try {
      const hotels = await Hotel.find({ owner: req.userId })
        .populate('owner', 'name email')
        .sort({ createdAt: -1 })
        .select('-__v');

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'User hotels retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          hotels,
          count: hotels.length
        }
      });
    } catch (error) {
      console.error('Get user hotels error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve user hotels'
      });
    }
  }

  // Create hotel from start-building
  static async createFromStartBuilding(req, res) {
    try {
      const { websiteName, websiteType, tagline, themeColor } = req.body;
      
      if (websiteType !== 'hotels') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid website type for hotel'
        });
      }

      // Get default hotel data structure
      const defaultHotelData = hotelDummyData.data?.hotel;
      
      if (!defaultHotelData) {
        return res.status(500).json({
          status: 'error',
          message: 'Default hotel template not found'
        });
      }

      // Get next available ID
      const lastHotel = await Hotel.findOne().sort({ id: -1 });
      const nextId = lastHotel ? lastHotel.id + 1 : 1;

      // Create hotel with user's customizations
      const hotelData = {
        ...defaultHotelData,
        id: nextId,
        slug: websiteName,
        name: tagline || defaultHotelData.name,
        owner: req.userId,
        ownerId: req.user._id.toString(),
        status: 'published'
      };

      // Update hero section with user's tagline
      if (hotelData.sections && hotelData.sections.hero) {
        hotelData.sections.hero.title = tagline || hotelData.sections.hero.title;
      }

      const hotel = new Hotel(hotelData);
      await hotel.save();
      
      await hotel.populate('owner', 'name email');

      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Hotel website created successfully',
        timestamp: new Date().toISOString(),
        data: hotel
      });
    } catch (error) {
      console.error('Create hotel from start-building error:', error);
      
      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Website name already taken'
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create hotel website'
      });
    }
  }
}

module.exports = HotelController;
