const { WeddingVendor, WeddingBooking } = require('../models/Wedding');

class WeddingController {
  // Get all wedding vendors
  static async getAllVendors(req, res) {
    try {
      const {
        category,
        location,
        featured,
        limit = 10,
        offset = 0,
      } = req.query;

      let query = { status: 'published' };
      if (category) {
        query.category = new RegExp(category, 'i');
      }
      if (location) {
        query.$or = [
          { city: new RegExp(location, 'i') },
          { state: new RegExp(location, 'i') },
          { location: new RegExp(location, 'i') },
        ];
      }
      if (featured === 'true') {
        query.featured = true;
      }

      const vendors = await WeddingVendor.find(query)
        .populate('owner', 'name email')
        .limit(parseInt(limit))
        .skip(parseInt(offset))
        .sort({ createdAt: -1 })
        .select('-__v');

      // If no vendors in DB, return dummy data
      if (vendors.length === 0) {
        return res.status(200).json({
          status: 'success',
          statusCode: 200,
          message: 'Wedding vendors retrieved successfully',
          timestamp: new Date().toISOString(),
          data: {
            vendors: this.getDummyVendors(),
            count: this.getDummyVendors().length,
            total: this.getDummyVendors().length,
          },
        });
      }

      const total = await WeddingVendor.countDocuments(query);

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Wedding vendors retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          vendors,
          count: vendors.length,
          total,
          hasMore: parseInt(offset) + vendors.length < total,
        },
      });
    } catch (error) {
      console.error('Get all wedding vendors error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve wedding vendors',
      });
    }
  }

  // Get wedding vendor by ID or slug
  static async getVendor(req, res) {
    try {
      const { identifier } = req.params;

      let vendor;

      // Try to find by MongoDB ObjectId first, then by custom ID, then by slug
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        vendor = await WeddingVendor.findById(identifier).populate(
          'owner',
          'name email'
        );
      } else {
        vendor = await WeddingVendor.findOne({
          $or: [{ id: identifier }, { slug: identifier }],
        }).populate('owner', 'name email');
      }

      // If not found in DB, return dummy data for demo
      if (!vendor) {
        const dummyVendor = this.getDummyVendorById(identifier);
        if (dummyVendor) {
          return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Wedding vendor retrieved successfully',
            timestamp: new Date().toISOString(),
            data: dummyVendor,
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Wedding vendor not found',
        });
      }

      // Increment view count
      vendor.analytics.totalViews = (vendor.analytics.totalViews || 0) + 1;
      await vendor.save();

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Wedding vendor retrieved successfully',
        timestamp: new Date().toISOString(),
        data: vendor,
      });
    } catch (error) {
      console.error('Get wedding vendor error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve wedding vendor',
      });
    }
  }

  // Get vendor portfolio
  static async getVendorPortfolio(req, res) {
    try {
      const { identifier } = req.params;

      let vendor;

      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        vendor = await WeddingVendor.findById(identifier);
      } else {
        vendor = await WeddingVendor.findOne({
          $or: [{ id: identifier }, { slug: identifier }],
        });
      }

      if (!vendor) {
        const dummyVendor = this.getDummyVendorById(identifier);
        if (dummyVendor) {
          return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Vendor portfolio retrieved successfully',
            timestamp: new Date().toISOString(),
            data: {
              portfolio: dummyVendor.portfolio || [],
              gallery: dummyVendor.pageContent?.gallery || {},
            },
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Wedding vendor not found',
        });
      }

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Vendor portfolio retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          portfolio: vendor.portfolio || [],
          gallery: vendor.pageContent?.gallery || {},
        },
      });
    } catch (error) {
      console.error('Get vendor portfolio error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve vendor portfolio',
      });
    }
  }

  // Create new wedding vendor
  static async create(req, res) {
    try {
      const vendorData = {
        ...req.body,
        owner: req.userId,
      };

      // Generate unique ID and slug if not provided
      if (!vendorData.id) {
        vendorData.id = `vendor_${Date.now()}`;
      }

      if (!vendorData.slug) {
        vendorData.slug = vendorData.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
      }

      // Ensure unique slug
      const existingVendor = await WeddingVendor.findOne({
        slug: vendorData.slug,
      });
      if (existingVendor) {
        vendorData.slug = `${vendorData.slug}-${Date.now()}`;
      }

      const vendor = new WeddingVendor(vendorData);
      await vendor.save();

      await vendor.populate('owner', 'name email');

      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Wedding vendor created successfully',
        timestamp: new Date().toISOString(),
        data: vendor,
      });
    } catch (error) {
      console.error('Create wedding vendor error:', error);

      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Wedding vendor with this slug or ID already exists',
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create wedding vendor',
      });
    }
  }

  // Update wedding vendor
  static async update(req, res) {
    try {
      const { identifier } = req.params;
      const updateData = req.body;

      let vendor;

      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        vendor = await WeddingVendor.findById(identifier);
      } else {
        vendor = await WeddingVendor.findOne({
          $or: [{ id: identifier }, { slug: identifier }],
        });
      }

      if (!vendor) {
        return res.status(404).json({
          status: 'error',
          message: 'Wedding vendor not found',
        });
      }

      // Check ownership
      if (vendor.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to update this vendor',
        });
      }

      // Update vendor
      Object.assign(vendor, updateData);
      await vendor.save();

      await vendor.populate('owner', 'name email');

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Wedding vendor updated successfully',
        timestamp: new Date().toISOString(),
        data: vendor,
      });
    } catch (error) {
      console.error('Update wedding vendor error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update wedding vendor',
      });
    }
  }

  // Delete wedding vendor
  static async delete(req, res) {
    try {
      const { identifier } = req.params;

      let vendor;

      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        vendor = await WeddingVendor.findById(identifier);
      } else {
        vendor = await WeddingVendor.findOne({
          $or: [{ id: identifier }, { slug: identifier }],
        });
      }

      if (!vendor) {
        return res.status(404).json({
          status: 'error',
          message: 'Wedding vendor not found',
        });
      }

      // Check ownership
      if (vendor.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to delete this vendor',
        });
      }

      await WeddingVendor.findByIdAndDelete(vendor._id);

      res.status(200).json({
        status: 'success',
        message: 'Wedding vendor deleted successfully',
      });
    } catch (error) {
      console.error('Delete wedding vendor error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete wedding vendor',
      });
    }
  }

  // Get user's wedding vendors
  static async getUserVendors(req, res) {
    try {
      const vendors = await WeddingVendor.find({ owner: req.userId })
        .populate('owner', 'name email')
        .sort({ createdAt: -1 })
        .select('-__v');

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'User wedding vendors retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          vendors,
          count: vendors.length,
        },
      });
    } catch (error) {
      console.error('Get user wedding vendors error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve user wedding vendors',
      });
    }
  }

  // Create wedding vendor from start-building
  static async createFromStartBuilding(req, res) {
    try {
      const { websiteName, websiteType, tagline, themeColor } = req.body;

      if (websiteType !== 'weddings') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid website type for wedding',
        });
      }

      // Create wedding vendor with user's customizations and default data
      const vendorData = {
        id: websiteName,
        slug: websiteName,
        name: tagline || 'Wedding Services',
        category: 'Full Service',
        location: 'City, State',
        city: 'City',
        state: 'State',
        coordinates: { lat: 37.7749, lng: -122.4194 },
        owner: req.userId,
        ownerInfo: {
          name: req.user.name,
          email: req.user.email,
          phone: req.user.phone || '+1 (555) 123-4567',
          experience: '5+ years',
          bio: 'Passionate about creating unforgettable wedding experiences.',
        },
        businessInfo: {
          logo: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&q=80',
          coverImage:
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
          description:
            tagline || 'Creating magical moments for your special day.',
          establishedYear: new Date().getFullYear() - 5,
          website: '',
          socialMedia: {},
        },
        contact: {
          phone: req.user.phone || '+1 (555) 123-4567',
          email: req.user.email,
          whatsapp: '',
          address: {
            street: '123 Wedding Street',
            city: 'City',
            state: 'State',
            zipCode: '12345',
            country: 'USA',
          },
          availability: {
            monday: '9:00 AM - 6:00 PM',
            tuesday: '9:00 AM - 6:00 PM',
            wednesday: '9:00 AM - 6:00 PM',
            thursday: '9:00 AM - 6:00 PM',
            friday: '9:00 AM - 6:00 PM',
            saturday: '9:00 AM - 8:00 PM',
            sunday: '10:00 AM - 4:00 PM',
          },
        },
        services: [
          'Wedding Planning',
          'Event Coordination',
          'Vendor Management',
        ],
        specialties: [
          'Outdoor Weddings',
          'Destination Weddings',
          'Traditional Ceremonies',
        ],
        serviceAreas: ['Local Area', 'Surrounding Cities'],
        priceRange: {
          min: 1000,
          max: 10000,
          currency: 'USD',
        },
        packages: [
          {
            id: 1,
            name: 'Basic Package',
            description: 'Essential wedding planning services',
            price: 2500,
            duration: '3 months',
            includes: [
              'Initial consultation',
              'Timeline creation',
              'Vendor recommendations',
            ],
            popular: false,
            customizable: true,
          },
          {
            id: 2,
            name: 'Premium Package',
            description: 'Comprehensive wedding planning',
            price: 5000,
            duration: '6 months',
            includes: [
              'Everything in Basic',
              'Day-of coordination',
              'Setup assistance',
            ],
            popular: true,
            customizable: true,
          },
        ],
        portfolio: [],
        testimonials: [],
        pageContent: {
          hero: {
            title: tagline || 'Your Dream Wedding Awaits',
            subtitle:
              'Professional wedding planning services to make your special day perfect.',
            backgroundImage:
              'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
            ctaText: 'Get Quote',
          },
          about: {
            title: 'About Us',
            description:
              'We are passionate about creating unforgettable wedding experiences.',
            experience: '5+ years',
            approach: 'Personal and professional approach to every wedding.',
            whyChooseUs: [
              'Experienced team',
              'Attention to detail',
              'Stress-free planning',
            ],
          },
          gallery: {
            featured: [],
            categories: [],
          },
        },
        bookingPolicy: {
          advanceBookingDays: 90,
          cancellationPolicy: 'Cancellations must be made 30 days in advance.',
          paymentTerms: '50% deposit required to secure booking.',
          depositRequired: 50,
        },
        analytics: {
          totalViews: 0,
          totalInquiries: 0,
          conversionRate: 0,
          popularPackages: [],
          peakSeasons: [],
        },
        status: 'published',
      };

      const vendor = new WeddingVendor(vendorData);
      await vendor.save();

      await vendor.populate('owner', 'name email');

      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Wedding website created successfully',
        timestamp: new Date().toISOString(),
        data: vendor,
      });
    } catch (error) {
      console.error('Create wedding from start-building error:', error);

      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Website name already taken',
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create wedding website',
      });
    }
  }

  // Helper methods for dummy data
  static getDummyVendors() {
    return [
      {
        id: 'elegant-events',
        name: 'Elegant Events',
        slug: 'elegant-events',
        category: 'Wedding Planner',
        location: 'San Francisco, CA',
        city: 'San Francisco',
        state: 'CA',
        rating: 4.9,
        reviewCount: 127,
        featured: true,
        verified: true,
        priceRange: { min: 3000, max: 15000, currency: 'USD' },
        businessInfo: {
          logo: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=200&q=80',
          coverImage:
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1200&q=80',
          description:
            'Creating unforgettable wedding experiences with attention to every detail.',
        },
        totalEvents: 150,
      },
    ];
  }

  static getDummyVendorById(identifier) {
    const vendors = this.getDummyVendors();
    return vendors.find(v => v.id === identifier || v.slug === identifier);
  }
}

module.exports = WeddingController;
