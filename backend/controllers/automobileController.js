const Automobile = require('../models/Automobile');
const automobileDummyData = require('../../src/DummyData/automobiles.json');

class AutomobileController {
  // Get all automobile dealerships
  static async getAllDealerships(req, res) {
    try {
      const { location, featured, limit = 10, offset = 0 } = req.query;

      let query = { status: 'published' };
      if (location) {
        query.$or = [
          { 'data.vendor.contact.address.city': new RegExp(location, 'i') },
          { 'data.vendor.contact.address.state': new RegExp(location, 'i') },
        ];
      }
      if (featured === 'true') {
        query['data.vendor.settings.featured'] = true;
      }

      const dealerships = await Automobile.find(query)
        .populate('data.vendor.owner.mongoUserId', 'name email')
        .limit(parseInt(limit))
        .skip(parseInt(offset))
        .sort({ createdAt: -1 })
        .select('-__v');

      // If no dealerships in DB, return dummy data
      if (dealerships.length === 0) {
        return res.status(200).json({
          success: true,
          timestamp: new Date().toISOString(),
          data: automobileDummyData.data,
        });
      }

      const total = await Automobile.countDocuments(query);

      res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        data: {
          dealerships: dealerships.map(d => d.data),
          count: dealerships.length,
          total,
          hasMore: parseInt(offset) + dealerships.length < total,
        },
      });
    } catch (error) {
      console.error('Get all automobile dealerships error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve automobile dealerships',
      });
    }
  }

  // Get automobile dealership by slug
  static async getDealership(req, res) {
    try {
      const { slug } = req.params;

      let dealership = await Automobile.findOne({ 'data.vendor.slug': slug })
        .populate('data.vendor.owner.mongoUserId', 'name email')
        .select('-__v');

      // If not found in DB, return dummy data for demo
      if (!dealership) {
        if (automobileDummyData.data.vendor.slug === slug) {
          return res.status(200).json(automobileDummyData);
        }

        return res.status(404).json({
          status: 'error',
          message: 'Dealership not found',
        });
      }

      res.status(200).json({
        success: dealership.success,
        timestamp: dealership.timestamp,
        data: dealership.data,
      });
    } catch (error) {
      console.error('Get automobile dealership error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve dealership data',
      });
    }
  }

  // Get dealership vehicles
  static async getDealershipVehicles(req, res) {
    try {
      const { slug } = req.params;
      const {
        category,
        make,
        condition,
        featured,
        limit = 20,
        offset = 0,
      } = req.query;

      let dealership = await Automobile.findOne({ 'data.vendor.slug': slug });

      if (!dealership) {
        // Return dummy data for demo
        if (automobileDummyData.data.vendor.slug === slug) {
          let vehicles = automobileDummyData.data.allVehicles || [];

          // Apply filters
          if (category) {
            vehicles = vehicles.filter(
              vehicle =>
                vehicle.category.id === category ||
                vehicle.category.name
                  .toLowerCase()
                  .includes(category.toLowerCase())
            );
          }
          if (make) {
            vehicles = vehicles.filter(vehicle =>
              vehicle.make.toLowerCase().includes(make.toLowerCase())
            );
          }
          if (condition) {
            vehicles = vehicles.filter(
              vehicle => vehicle.condition === condition
            );
          }
          if (featured === 'true') {
            vehicles = vehicles.filter(vehicle => vehicle.featured);
          }

          // Apply pagination
          const startIndex = parseInt(offset);
          const endIndex = startIndex + parseInt(limit);
          const paginatedVehicles = vehicles.slice(startIndex, endIndex);

          return res.status(200).json({
            success: true,
            timestamp: new Date().toISOString(),
            data: {
              vehicles: paginatedVehicles,
              categories: automobileDummyData.data.allCategories || [],
              count: paginatedVehicles.length,
              total: vehicles.length,
              hasMore: endIndex < vehicles.length,
            },
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Dealership not found',
        });
      }

      let vehicles = dealership.data.allVehicles || [];

      // Apply filters
      if (category) {
        vehicles = vehicles.filter(
          vehicle =>
            vehicle.category.id === category ||
            vehicle.category.name.toLowerCase().includes(category.toLowerCase())
        );
      }
      if (make) {
        vehicles = vehicles.filter(vehicle =>
          vehicle.make.toLowerCase().includes(make.toLowerCase())
        );
      }
      if (condition) {
        vehicles = vehicles.filter(vehicle => vehicle.condition === condition);
      }
      if (featured === 'true') {
        vehicles = vehicles.filter(vehicle => vehicle.featured);
      }

      // Apply pagination
      const startIndex = parseInt(offset);
      const endIndex = startIndex + parseInt(limit);
      const paginatedVehicles = vehicles.slice(startIndex, endIndex);

      res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        data: {
          vehicles: paginatedVehicles,
          categories: dealership.data.allCategories || [],
          count: paginatedVehicles.length,
          total: vehicles.length,
          hasMore: endIndex < vehicles.length,
        },
      });
    } catch (error) {
      console.error('Get dealership vehicles error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve dealership vehicles',
      });
    }
  }

  // Get vehicle by ID
  static async getVehicle(req, res) {
    try {
      const { slug, vehicleId } = req.params;

      let dealership = await Automobile.findOne({ 'data.vendor.slug': slug });

      if (!dealership) {
        // Return dummy data for demo
        if (automobileDummyData.data.vendor.slug === slug) {
          const vehicle = automobileDummyData.data.allVehicles?.find(
            v => v.id === vehicleId
          );
          if (vehicle) {
            return res.status(200).json({
              success: true,
              timestamp: new Date().toISOString(),
              data: vehicle,
            });
          }
        }

        return res.status(404).json({
          status: 'error',
          message: 'Dealership not found',
        });
      }

      const vehicle = dealership.data.allVehicles?.find(
        v => v.id === vehicleId
      );
      if (!vehicle) {
        return res.status(404).json({
          status: 'error',
          message: 'Vehicle not found',
        });
      }

      res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        data: vehicle,
      });
    } catch (error) {
      console.error('Get vehicle error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve vehicle',
      });
    }
  }

  // Get vehicle categories
  static async getCategories(req, res) {
    try {
      const { slug } = req.params;

      let dealership = await Automobile.findOne({ 'data.vendor.slug': slug });

      if (!dealership) {
        // Return dummy data for demo
        if (automobileDummyData.data.vendor.slug === slug) {
          return res.status(200).json({
            success: true,
            timestamp: new Date().toISOString(),
            data: automobileDummyData.data.allCategories || [],
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Dealership not found',
        });
      }

      res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        data: dealership.data.allCategories || [],
      });
    } catch (error) {
      console.error('Get categories error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve categories',
      });
    }
  }

  // Create new automobile dealership
  static async create(req, res) {
    try {
      const dealershipData = {
        ...req.body,
        'data.vendor.owner.mongoUserId': req.userId,
      };

      // Generate unique slug if not provided
      if (!dealershipData.data?.vendor?.slug) {
        const slug =
          dealershipData.data?.vendor?.name
            ?.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || 'dealership';

        if (!dealershipData.data) dealershipData.data = {};
        if (!dealershipData.data.vendor) dealershipData.data.vendor = {};
        dealershipData.data.vendor.slug = slug;
      }

      // Ensure unique slug
      const existingDealership = await Automobile.findOne({
        'data.vendor.slug': dealershipData.data.vendor.slug,
      });
      if (existingDealership) {
        dealershipData.data.vendor.slug = `${dealershipData.data.vendor.slug}-${Date.now()}`;
      }

      const dealership = new Automobile(dealershipData);
      await dealership.save();

      await dealership.populate('data.vendor.owner.mongoUserId', 'name email');

      res.status(201).json({
        success: true,
        timestamp: new Date().toISOString(),
        data: dealership.data,
      });
    } catch (error) {
      console.error('Create automobile dealership error:', error);

      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Dealership with this slug already exists',
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create automobile dealership',
      });
    }
  }

  // Update automobile dealership
  static async update(req, res) {
    try {
      const { slug } = req.params;
      const updateData = req.body;

      const dealership = await Automobile.findOne({ 'data.vendor.slug': slug });
      if (!dealership) {
        return res.status(404).json({
          status: 'error',
          message: 'Dealership not found',
        });
      }

      // Check ownership
      if (
        dealership.data.vendor.owner.mongoUserId.toString() !==
        req.userId.toString()
      ) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to update this dealership',
        });
      }

      // Update dealership
      Object.assign(dealership, updateData);
      await dealership.save();

      await dealership.populate('data.vendor.owner.mongoUserId', 'name email');

      res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        data: dealership.data,
      });
    } catch (error) {
      console.error('Update automobile dealership error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update automobile dealership',
      });
    }
  }

  // Delete automobile dealership
  static async delete(req, res) {
    try {
      const { slug } = req.params;

      const dealership = await Automobile.findOne({ 'data.vendor.slug': slug });
      if (!dealership) {
        return res.status(404).json({
          status: 'error',
          message: 'Dealership not found',
        });
      }

      // Check ownership
      if (
        dealership.data.vendor.owner.mongoUserId.toString() !==
        req.userId.toString()
      ) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to delete this dealership',
        });
      }

      await Automobile.findByIdAndDelete(dealership._id);

      res.status(200).json({
        status: 'success',
        message: 'Automobile dealership deleted successfully',
      });
    } catch (error) {
      console.error('Delete automobile dealership error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete automobile dealership',
      });
    }
  }

  // Get user's automobile dealerships
  static async getUserDealerships(req, res) {
    try {
      const dealerships = await Automobile.find({
        'data.vendor.owner.mongoUserId': req.userId,
      })
        .populate('data.vendor.owner.mongoUserId', 'name email')
        .sort({ createdAt: -1 })
        .select('-__v');

      res.status(200).json({
        success: true,
        timestamp: new Date().toISOString(),
        data: {
          dealerships: dealerships.map(d => d.data),
          count: dealerships.length,
        },
      });
    } catch (error) {
      console.error('Get user automobile dealerships error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve user automobile dealerships',
      });
    }
  }

  // Create automobile dealership from start-building
  static async createFromStartBuilding(req, res) {
    try {
      const { websiteName, websiteType, tagline, themeColor } = req.body;

      if (websiteType !== 'automobiles') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid website type for automobile',
        });
      }

      // Create dealership with user's customizations and dummy data structure
      const dealershipData = {
        data: {
          vendor: {
            ...automobileDummyData.data.vendor,
            id: websiteName,
            slug: websiteName,
            name: tagline || automobileDummyData.data.vendor.name,
            owner: {
              ...automobileDummyData.data.vendor.owner,
              mongoUserId: req.userId,
            },
            businessInfo: {
              ...automobileDummyData.data.vendor.businessInfo,
              description:
                tagline ||
                automobileDummyData.data.vendor.businessInfo.description,
            },
          },
          allCategories: automobileDummyData.data.allCategories || [],
          allVehicles: automobileDummyData.data.allVehicles || [],
        },
        success: true,
        timestamp: new Date().toISOString(),
        status: 'published',
      };

      const dealership = new Automobile(dealershipData);
      await dealership.save();

      await dealership.populate('data.vendor.owner.mongoUserId', 'name email');

      res.status(201).json({
        success: true,
        timestamp: new Date().toISOString(),
        message: 'Automobile website created successfully',
        data: dealership.data,
      });
    } catch (error) {
      console.error('Create automobile from start-building error:', error);

      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Website name already taken',
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create automobile website',
      });
    }
  }
}

module.exports = AutomobileController;
