const Business = require('../models/Business');
const businessDummyData = require('../../src/DummyData/business.json');

class BusinessController {
  // Get all business templates
  static async getAllTemplates(req, res) {
    try {
      const businesses = await Business.find({ status: 'published' })
        .populate('owner', 'name email')
        .select('-__v');

      // If no businesses in DB, return dummy data
      if (businesses.length === 0) {
        return res.status(200).json({
          status: 'success',
          statusCode: 200,
          message: 'Business templates retrieved successfully',
          timestamp: new Date().toISOString(),
          data: {
            businessTemplates: businessDummyData.data.businessTemplates || [],
            businesses: businessDummyData.data.businesses || {},
          },
        });
      }

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Business templates retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          businessTemplates: businesses,
          count: businesses.length,
        },
      });
    } catch (error) {
      console.error('Get business templates error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve business templates',
      });
    }
  }

  // Get business by slug
  static async getBySlug(req, res) {
    try {
      const { slug } = req.params;

      let business = await Business.findOne({ slug })
        .populate('owner', 'name email')
        .select('-__v');

      // If not found in DB, check dummy data
      if (!business) {
        if (slug === 'salon' || slug === 'business') {
          const portfolioData = businessDummyData.data?.portfolio?.buisness;
          if (portfolioData) {
            return res.status(200).json({
              status: 'success',
              statusCode: 200,
              message: 'Business data retrieved successfully',
              timestamp: new Date().toISOString(),
              data: portfolioData,
            });
          }
        }

        if (slug === 'freelancer' || slug === 'personal') {
          const portfolioData = businessDummyData.data?.portfolio?.personal;
          if (portfolioData) {
            return res.status(200).json({
              status: 'success',
              statusCode: 200,
              message: 'Business data retrieved successfully',
              timestamp: new Date().toISOString(),
              data: portfolioData,
            });
          }
        }

        return res.status(404).json({
          status: 'error',
          message: 'Business not found',
        });
      }

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Business data retrieved successfully',
        timestamp: new Date().toISOString(),
        data: business,
      });
    } catch (error) {
      console.error('Get business by slug error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve business data',
      });
    }
  }

  // Create new business
  static async create(req, res) {
    try {
      const businessData = {
        ...req.body,
        owner: req.userId,
      };

      // Generate unique slug if not provided
      if (!businessData.slug) {
        businessData.slug = businessData.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }

      // Ensure unique slug
      const existingBusiness = await Business.findOne({
        slug: businessData.slug,
      });
      if (existingBusiness) {
        businessData.slug = `${businessData.slug}-${Date.now()}`;
      }

      const business = new Business(businessData);
      await business.save();

      await business.populate('owner', 'name email');

      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Business created successfully',
        timestamp: new Date().toISOString(),
        data: business,
      });
    } catch (error) {
      console.error('Create business error:', error);

      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Business with this slug already exists',
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create business',
      });
    }
  }

  // Update business
  static async update(req, res) {
    try {
      const { slug } = req.params;
      const updateData = req.body;

      const business = await Business.findOne({ slug });
      if (!business) {
        return res.status(404).json({
          status: 'error',
          message: 'Business not found',
        });
      }

      // Check ownership
      if (business.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to update this business',
        });
      }

      // Update business
      Object.assign(business, updateData);
      await business.save();

      await business.populate('owner', 'name email');

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Business updated successfully',
        timestamp: new Date().toISOString(),
        data: business,
      });
    } catch (error) {
      console.error('Update business error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update business',
      });
    }
  }

  // Delete business
  static async delete(req, res) {
    try {
      const { slug } = req.params;

      const business = await Business.findOne({ slug });
      if (!business) {
        return res.status(404).json({
          status: 'error',
          message: 'Business not found',
        });
      }

      // Check ownership
      if (business.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to delete this business',
        });
      }

      await Business.findByIdAndDelete(business._id);

      res.status(200).json({
        status: 'success',
        message: 'Business deleted successfully',
      });
    } catch (error) {
      console.error('Delete business error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete business',
      });
    }
  }

  // Get user's businesses
  static async getUserBusinesses(req, res) {
    try {
      const businesses = await Business.find({ owner: req.userId })
        .populate('owner', 'name email')
        .sort({ createdAt: -1 })
        .select('-__v');

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'User businesses retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          businesses,
          count: businesses.length,
        },
      });
    } catch (error) {
      console.error('Get user businesses error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve user businesses',
      });
    }
  }

  // Create business from start-building
  static async createFromStartBuilding(req, res) {
    try {
      const { websiteName, websiteType, tagline, themeColor } = req.body;

      if (websiteType !== 'professional') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid website type for business',
        });
      }

      // Get default business data structure
      const defaultBusinessData = businessDummyData.data?.portfolio?.buisness;

      if (!defaultBusinessData) {
        return res.status(500).json({
          status: 'error',
          message: 'Default business template not found',
        });
      }

      // Create business with user's customizations
      const businessData = {
        ...defaultBusinessData,
        id: websiteName,
        slug: websiteName,
        name: tagline || defaultBusinessData.name,
        tagline: tagline || defaultBusinessData.tagline,
        primaryColor: themeColor || defaultBusinessData.primaryColor,
        owner: req.userId,
        status: 'published',
      };

      const business = new Business(businessData);
      await business.save();

      await business.populate('owner', 'name email');

      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Business website created successfully',
        timestamp: new Date().toISOString(),
        data: business,
      });
    } catch (error) {
      console.error('Create business from start-building error:', error);

      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Website name already taken',
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create business website',
      });
    }
  }
}

module.exports = BusinessController;
