const Website = require('../models/Website');
const BusinessController = require('./businessController');
const HotelController = require('./hotelController');
const EcommerceController = require('./ecommerceController');
const AutomobileController = require('./automobileController');
const WeddingController = require('./weddingController');

class WebsiteController {
  // Create website from start-building form
  static async createFromStartBuilding(req, res) {
    try {
      const {
        websiteName,
        websiteType,
        tagline,
        themeColor,
        logo,
        fullPageImage,
      } = req.body;

      // Validate required fields
      if (!websiteName || !websiteType) {
        return res.status(400).json({
          status: 'error',
          message: 'Website name and type are required',
        });
      }

      // Validate website type
      const validTypes = [
        'weddings',
        'hotels',
        'ecommerce',
        'automobiles',
        'professional',
      ];
      if (!validTypes.includes(websiteType)) {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid website type',
        });
      }

      // Check if website name is already taken
      const existingWebsite = await Website.findOne({ websiteName });
      if (existingWebsite) {
        return res.status(400).json({
          status: 'error',
          message: 'Website name already taken',
        });
      }

      // Create the specific module entry based on website type
      let moduleData = null;
      let moduleResponse = null;

      try {
        // Create a mock response object that captures the data
        let capturedData = null;
        let capturedStatus = null;
        
        const mockRes = {
          status: (code) => {
            capturedStatus = code;
            return {
              json: (data) => {
                capturedData = data;
                return { status: code, data };
              }
            };
          }
        };

        switch (websiteType) {
          case 'professional':
            await BusinessController.createFromStartBuilding(
              {
                ...req,
                body: { websiteName, websiteType, tagline, themeColor },
              },
              mockRes
            );
            break;

          case 'hotels':
            await HotelController.createFromStartBuilding(
              {
                ...req,
                body: { websiteName, websiteType, tagline, themeColor },
              },
              mockRes
            );
            break;

          case 'ecommerce':
            await EcommerceController.createFromStartBuilding(
              {
                ...req,
                body: { websiteName, websiteType, tagline, themeColor },
              },
              mockRes
            );
            break;

          case 'automobiles':
            await AutomobileController.createFromStartBuilding(
              {
                ...req,
                body: { websiteName, websiteType, tagline, themeColor },
              },
              mockRes
            );
            break;

          case 'weddings':
            await WeddingController.createFromStartBuilding(
              {
                ...req,
                body: { websiteName, websiteType, tagline, themeColor },
              },
              mockRes
            );
            break;

          default:
            throw new Error('Unsupported website type');
        }

        if (capturedStatus !== 201) {
          throw new Error('Failed to create module data');
        }

        moduleData = capturedData ? capturedData.data : null;
      } catch (moduleError) {
        console.error('Module creation error:', moduleError);
        // Continue with website creation even if module creation fails
      }

      // Create website entry
      const websiteData = {
        websiteName,
        websiteType,
        owner: req.userId,
        ownerInfo: {
          name: req.user.name,
          email: req.user.email,
        },
        basicInfo: {
          tagline: tagline || '',
          themeColor: themeColor || '#10b981',
          logo: logo || null,
          fullPageImage: fullPageImage || null,
        },
        publishedData: moduleData ? moduleData._id || moduleData.id : null,
        domain: {
          subdomain: websiteName,
          customDomain: null,
          ssl: true,
        },
        settings: {
          seo: {
            title: tagline || `${websiteName} - ${websiteType}`,
            description: `Professional ${websiteType} website - ${tagline || 'Built with our platform'}`,
            keywords: [websiteType, 'business', 'website'],
          },
          analytics: {
            googleAnalytics: '',
            facebookPixel: '',
          },
          social: {
            facebook: '',
            instagram: '',
            twitter: '',
            linkedin: '',
          },
        },
        status: 'published',
        publishedAt: new Date(),
      };

      const website = new Website(websiteData);
      await website.save();

      await website.populate('owner', 'name email');

      res.status(201).json({
        status: 'success',
        message: 'Website created successfully',
        data: {
          website,
          url: website.getFullUrl(),
          moduleData: moduleData || null,
        },
      });
    } catch (error) {
      console.error('Create website from start-building error:', error);

      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Website name already taken',
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create website',
      });
    }
  }

  // Get website by name
  static async getByName(req, res) {
    try {
      const { websiteName } = req.params;

      const website = await Website.findOne({ websiteName })
        .populate('owner', 'name email')
        .select('-__v');

      if (!website) {
        return res.status(404).json({
          status: 'error',
          message: 'Website not found',
        });
      }

      // Increment view count
      await website.incrementViews();

      // Prepare response data
      let responseData = {
        website,
        url: website.getFullUrl(),
      };

      // If it's a hotel website, also fetch the hotel data
      if (website.websiteType === 'hotels') {
        try {
          const Hotel = require('../models/Hotel');
          const hotel = await Hotel.findOne({ slug: websiteName })
            .populate('owner', 'name email')
            .select('-__v');
          
          if (hotel) {
            responseData.hotel = hotel;
            console.log('✅ Found hotel data for website:', websiteName);
          } else {
            console.log('⚠️ No hotel data found for website:', websiteName);
          }
        } catch (hotelError) {
          console.error('Error fetching hotel data:', hotelError);
          // Continue without hotel data - frontend will handle fallback
        }
      }

      res.status(200).json({
        status: 'success',
        message: 'Website retrieved successfully',
        data: responseData,
      });
    } catch (error) {
      console.error('Get website by name error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve website',
      });
    }
  }

  // Get all websites
  static async getAll(req, res) {
    try {
      const { websiteType, status, limit = 10, offset = 0 } = req.query;

      let query = {};
      if (websiteType) {
        query.websiteType = websiteType;
      }
      if (status) {
        query.status = status;
      }

      const websites = await Website.find(query)
        .populate('owner', 'name email')
        .limit(parseInt(limit))
        .skip(parseInt(offset))
        .sort({ createdAt: -1 })
        .select('-__v');

      const total = await Website.countDocuments(query);

      res.status(200).json({
        status: 'success',
        message: 'Websites retrieved successfully',
        data: {
          websites,
          count: websites.length,
          total,
          hasMore: parseInt(offset) + websites.length < total,
        },
      });
    } catch (error) {
      console.error('Get all websites error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve websites',
      });
    }
  }

  // Get user's websites
  static async getUserWebsites(req, res) {
    try {
      const websites = await Website.find({ owner: req.userId })
        .populate('owner', 'name email')
        .sort({ createdAt: -1 })
        .select('-__v');

      res.status(200).json({
        status: 'success',
        message: 'User websites retrieved successfully',
        data: {
          websites: websites.map(website => ({
            ...website.toJSON(),
            url: website.getFullUrl(),
          })),
          count: websites.length,
        },
      });
    } catch (error) {
      console.error('Get user websites error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve user websites',
      });
    }
  }

  // Update website
  static async update(req, res) {
    try {
      const { websiteName } = req.params;
      const updateData = req.body;

      const website = await Website.findOne({ websiteName });
      if (!website) {
        return res.status(404).json({
          status: 'error',
          message: 'Website not found',
        });
      }

      // Check ownership
      if (website.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to update this website',
        });
      }

      // Update website
      Object.assign(website, updateData);
      website.lastModified = new Date();
      await website.save();

      await website.populate('owner', 'name email');

      res.status(200).json({
        status: 'success',
        message: 'Website updated successfully',
        data: {
          website,
          url: website.getFullUrl(),
        },
      });
    } catch (error) {
      console.error('Update website error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update website',
      });
    }
  }

  // Delete website
  static async delete(req, res) {
    try {
      const { websiteName } = req.params;

      const website = await Website.findOne({ websiteName });
      if (!website) {
        return res.status(404).json({
          status: 'error',
          message: 'Website not found',
        });
      }

      // Check ownership
      if (website.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to delete this website',
        });
      }

      await Website.findByIdAndDelete(website._id);

      res.status(200).json({
        status: 'success',
        message: 'Website deleted successfully',
      });
    } catch (error) {
      console.error('Delete website error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete website',
      });
    }
  }

  // Check website name availability
  static async checkAvailability(req, res) {
    try {
      const { websiteName } = req.params;

      // Validate website name format
      if (!/^[a-z0-9-]+$/.test(websiteName)) {
        return res.status(400).json({
          status: 'error',
          message:
            'Website name can only contain lowercase letters, numbers, and hyphens',
        });
      }

      const existingWebsite = await Website.findOne({ websiteName });
      const isAvailable = !existingWebsite;

      res.status(200).json({
        status: 'success',
        data: {
          websiteName,
          available: isAvailable,
          message: isAvailable
            ? 'Website name is available'
            : 'Website name is already taken',
        },
      });
    } catch (error) {
      console.error('Check website availability error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to check website availability',
      });
    }
  }

  // Get website analytics
  static async getAnalytics(req, res) {
    try {
      const { websiteName } = req.params;

      const website = await Website.findOne({ websiteName });
      if (!website) {
        return res.status(404).json({
          status: 'error',
          message: 'Website not found',
        });
      }

      // Check ownership
      if (website.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to view analytics for this website',
        });
      }

      res.status(200).json({
        status: 'success',
        message: 'Website analytics retrieved successfully',
        data: {
          websiteName: website.websiteName,
          viewCount: website.viewCount,
          status: website.status,
          publishedAt: website.publishedAt,
          lastModified: website.lastModified,
          performance: website.performance,
          createdAt: website.createdAt,
          updatedAt: website.updatedAt,
        },
      });
    } catch (error) {
      console.error('Get website analytics error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve website analytics',
      });
    }
  }
}

module.exports = WebsiteController;
