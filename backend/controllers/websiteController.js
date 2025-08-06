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

      // Handle different website types with their specific data formats to match JSON files exactly
      switch (website.websiteType) {
        case 'hotels':
          try {
            const Hotel = require('../models/Hotel');
            const hotel = await Hotel.findOne({ slug: websiteName })
              .populate('owner', 'name email')
              .select('-__v');
            
            if (hotel) {
              console.log('✅ Found hotel data for website:', websiteName);
              
              // Return response in exact hotels.json format
              return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Hotel data retrieved successfully',
                timestamp: new Date().toISOString(),
                data: {
                  hotel: {
                    id: hotel._id,
                    name: hotel.name,
                    slug: hotel.slug,
                    location: hotel.location,
                    address: hotel.address,
                    city: hotel.city,
                    pincode: hotel.pincode,
                    phone: hotel.phone,
                    email: hotel.email,
                    website: hotel.website,
                    description: hotel.description,
                    rating: hotel.rating,
                    starRating: hotel.starRating,
                    image: hotel.image,
                    images: hotel.images || [],
                    checkInTime: hotel.checkInTime,
                    checkOutTime: hotel.checkOutTime,
                    policies: hotel.policies || [],
                    startingPrice: hotel.startingPrice,
                    totalRooms: hotel.totalRooms,
                    availableRooms: hotel.availableRooms,
                    ownerId: hotel.owner?._id || hotel.ownerId,
                    sections: hotel.sections || {},
                    sectionOrder: hotel.sectionOrder || [],
                    sectionVisibility: hotel.sectionVisibility || {},
                    rooms: hotel.rooms || []
                  },
                  bookings: [],
                  amenitiesList: [
                    { "id": "wifi", "name": "WiFi", "icon": "📶" },
                    { "id": "ac", "name": "Air Conditioning", "icon": "❄️" },
                    { "id": "pool", "name": "Swimming Pool", "icon": "🏊" },
                    { "id": "spa", "name": "Spa", "icon": "🧖" },
                    { "id": "gym", "name": "Fitness Center", "icon": "💪" },
                    { "id": "restaurant", "name": "Restaurant", "icon": "🍽️" },
                    { "id": "parking", "name": "Parking", "icon": "🚗" },
                    { "id": "pet", "name": "Pet Friendly", "icon": "🐕" },
                    { "id": "breakfast", "name": "Breakfast", "icon": "🥐" },
                    { "id": "room-service", "name": "Room Service", "icon": "🛎️" },
                    { "id": "tv", "name": "Television", "icon": "📺" },
                    { "id": "minibar", "name": "Mini Bar", "icon": "🍷" },
                    { "id": "balcony", "name": "Balcony", "icon": "🏔️" },
                    { "id": "garden", "name": "Garden", "icon": "🌿" },
                    { "id": "heater", "name": "Heater", "icon": "🔥" }
                  ]
                },
                meta: {
                  totalRecords: 1,
                  requestId: `req_${Date.now()}`,
                  version: "1.0",
                  responseTime: "120ms"
                }
              });
            }
          } catch (error) {
            console.error('Error fetching hotel data:', error);
          }
          break;

        case 'ecommerce':
          try {
            const Ecommerce = require('../models/Ecommerce');
            const ecommerce = await Ecommerce.findOne({ slug: websiteName })
              .populate('owner', 'name email')
              .select('-__v');
            
            if (ecommerce) {
              console.log('✅ Found ecommerce data for website:', websiteName);
              
              // Return response in exact ecommerce.json format
              return res.status(200).json({
                vendor: {
                  id: ecommerce.slug,
                  slug: ecommerce.slug,
                  name: ecommerce.name,
                  category: 'ecommerce',
                  businessInfo: {
                    logo: ecommerce.logo,
                    description: ecommerce.description,
                    phone: ecommerce.phone,
                    email: ecommerce.email,
                    website: ecommerce.website,
                    address: ecommerce.address || {
                      street: ecommerce.address?.street || '',
                      city: ecommerce.city || '',
                      state: ecommerce.state || '',
                      zipCode: ecommerce.zipCode || '',
                      coordinates: ecommerce.coordinates || { lat: 37.7749, lng: -122.4194 }
                    },
                    hours: ecommerce.hours || {}
                  },
                  ownerInfo: {
                    name: ecommerce.owner?.name || 'Owner',
                    email: ecommerce.owner?.email || ecommerce.email,
                    phone: ecommerce.phone,
                    since: ecommerce.createdAt ? new Date(ecommerce.createdAt).getFullYear().toString() : '2024'
                  },
                  rating: ecommerce.rating || 4.5,
                  reviewCount: ecommerce.reviewCount || 0,
                  theme: ecommerce.theme || {
                    primaryColor: '#1e40af',
                    secondaryColor: '#3b82f6',
                    backgroundColor: '#f8fafc',
                    textColor: '#1f2937'
                  },
                  featured: ecommerce.featured || false,
                  verified: ecommerce.verified || true,
                  lastUpdated: new Date().toISOString()
                },
                pageContent: ecommerce.pageContent || { sections: [] }
              });
            }
          } catch (error) {
            console.error('Error fetching ecommerce data:', error);
          }
          break;

        case 'automobiles':
          try {
            const Automobile = require('../models/Automobile');
            const automobile = await Automobile.findOne({ slug: websiteName })
              .populate('owner', 'name email')
              .select('-__v');
            
            if (automobile) {
              console.log('✅ Found automobile data for website:', websiteName);
              
              // Return response in exact automobiles.json format
              return res.status(200).json({
                success: true,
                timestamp: new Date().toISOString(),
                data: {
                  vendor: {
                    id: automobile.slug,
                    name: automobile.name,
                    slug: automobile.slug,
                    category: 'automobiles',
                    status: 'active',
                    verified: automobile.verified || true,
                    owner: {
                      id: automobile.owner?._id || 'owner_001',
                      name: automobile.owner?.name || 'Owner',
                      email: automobile.owner?.email || automobile.email,
                      phone: automobile.phone,
                      avatar: automobile.owner?.avatar || '',
                      businessLicense: automobile.businessLicense || 'DEALER-LIC-2024-001',
                      joinedDate: automobile.createdAt || new Date().toISOString(),
                      verified: true,
                      permissions: [
                        'manage_inventory',
                        'manage_content',
                        'view_analytics',
                        'manage_orders'
                      ]
                    },
                    businessInfo: {
                      logo: automobile.logo,
                      coverImage: automobile.coverImage,
                      description: automobile.description,
                      establishedYear: automobile.establishedYear || new Date().getFullYear(),
                      licenseNumber: automobile.licenseNumber || 'DEALER-2024-001',
                      taxId: automobile.taxId || 'TAX-ID-001',
                      website: automobile.website,
                      socialMedia: automobile.socialMedia || {},
                      quickLinks: automobile.quickLinks || []
                    },
                    contactInfo: automobile.contactInfo || {},
                    businessHours: automobile.businessHours || {},
                    services: automobile.services || [],
                    vehicles: automobile.vehicles || []
                  }
                }
              });
            }
          } catch (error) {
            console.error('Error fetching automobile data:', error);
          }
          break;

        case 'weddings':
          try {
            const { WeddingVendor } = require('../models/Wedding');
            
            // First try to find by publishedData relationship
            let wedding = null;
            if (website.publishedData) {
              wedding = await WeddingVendor.findById(website.publishedData)
                .populate('owner', 'name email')
                .select('-__v');
            }
            
            // Fallback: try to find by slug if publishedData relationship doesn't exist
            if (!wedding) {
              wedding = await WeddingVendor.findOne({ slug: websiteName })
                .populate('owner', 'name email')
                .select('-__v');
            }
            
            if (wedding) {
              console.log('✅ Found wedding vendor data for website:', websiteName);
              
              // Return response in exact wedding.json format matching the model structure
              return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Wedding vendor data retrieved successfully',
                timestamp: new Date().toISOString(),
                data: {
                  vendors: {
                    [wedding.slug]: {
                      id: wedding.id || wedding.slug,
                      name: wedding.name,
                      category: wedding.category || 'weddings',
                      subcategory: wedding.subcategory,
                      logo: wedding.businessInfo?.logo,
                      image: wedding.businessInfo?.coverImage,
                      heroVideo: wedding.pageContent?.hero?.backgroundImage,
                      tagline: wedding.pageContent?.hero?.subtitle,
                      rating: wedding.rating || 4.5,
                      reviewCount: wedding.reviewCount || 0,
                      address: wedding.contact?.address?.street || wedding.location,
                      city: wedding.city || wedding.contact?.address?.city,
                      state: wedding.state || wedding.contact?.address?.state,
                      zipCode: wedding.contact?.address?.zipCode,
                      coordinates: wedding.coordinates || { lat: 37.7749, lng: -122.4194 },
                      distance: 0,
                      description: wedding.businessInfo?.description,
                      aboutUs: {
                        text: wedding.pageContent?.about?.description || wedding.ownerInfo?.bio,
                        experience: wedding.ownerInfo?.experience,
                        completedWeddings: wedding.totalEvents ? `${wedding.totalEvents}+` : '0+',
                        satisfiedCouples: wedding.reviewCount ? `${wedding.reviewCount}` : '0',
                        experienceVisible: true,
                        weddingsVisible: true,
                        couplesVisible: true,
                        approach: wedding.pageContent?.about?.approach,
                        whyChooseUs: wedding.pageContent?.about?.whyChooseUs || []
                      },
                      services: wedding.services?.map((service, index) => ({
                        id: `service-${index + 1}`,
                        name: service,
                        description: `Professional ${service} services`,
                        icon: '💍',
                        price: 'Contact for pricing'
                      })) || [],
                      specialties: wedding.specialties || wedding.services || [],
                      gallery: {
                        featured: wedding.pageContent?.gallery?.featured || [],
                        categories: wedding.pageContent?.gallery?.categories || []
                      },
                      portfolio: wedding.portfolio?.map(item => ({
                        id: item.id,
                        title: item.title,
                        image: item.image,
                        category: item.category,
                        description: item.description,
                        date: item.date,
                        client: item.client,
                        featured: item.featured
                      })) || [],
                      packages: wedding.packages?.map(pkg => ({
                        id: pkg.id,
                        name: pkg.name,
                        description: pkg.description,
                        price: pkg.price,
                        duration: pkg.duration,
                        includes: pkg.includes,
                        popular: pkg.popular,
                        customizable: pkg.customizable
                      })) || [],
                      testimonials: wedding.testimonials?.map(testimonial => ({
                        id: testimonial.id,
                        name: testimonial.name,
                        text: testimonial.text,
                        rating: testimonial.rating,
                        avatar: testimonial.avatar,
                        location: testimonial.location,
                        weddingDate: testimonial.weddingDate,
                        verified: testimonial.verified
                      })) || [],
                      contact: {
                        phone: wedding.contact?.phone,
                        email: wedding.contact?.email,
                        whatsapp: wedding.contact?.whatsapp,
                        address: wedding.contact?.address,
                        availability: wedding.contact?.availability
                      },
                      availability: wedding.availability || {},
                      socialMedia: wedding.businessInfo?.socialMedia || {},
                      priceRange: wedding.priceRange,
                      serviceAreas: wedding.serviceAreas || [],
                      featured: wedding.featured,
                      verified: wedding.verified,
                      awards: wedding.awards || [],
                      certifications: wedding.certifications || [],
                      insurance: wedding.insurance,
                      bookingPolicy: wedding.bookingPolicy,
                      ownerInfo: {
                        name: wedding.ownerInfo?.name || wedding.owner?.name,
                        email: wedding.ownerInfo?.email || wedding.owner?.email,
                        phone: wedding.ownerInfo?.phone,
                        experience: wedding.ownerInfo?.experience,
                        bio: wedding.ownerInfo?.bio
                      },
                      businessInfo: wedding.businessInfo,
                      pageContent: wedding.pageContent,
                      settings: wedding.settings,
                      analytics: wedding.analytics,
                      status: wedding.status,
                      isActive: wedding.isActive,
                      createdAt: wedding.createdAt,
                      updatedAt: wedding.updatedAt
                    }
                  }
                }
              });
            } else {
              console.log('⚠️ No wedding vendor found for website:', websiteName);
              console.log('Website publishedData:', website.publishedData);
              console.log('Tried slug lookup for:', websiteName);
              
              // Additional debugging: check if any wedding vendors exist
              const allWeddings = await WeddingVendor.find({}).select('slug name id').limit(5);
              console.log('Available wedding vendors:', allWeddings);
            }
          } catch (error) {
            console.error('Error fetching wedding vendor data:', error);
            console.error('Error details:', error.message);
          }
          break;

        case 'professional':
          try {
            const Business = require('../models/Business');
            const business = await Business.findOne({ slug: websiteName })
              .populate('owner', 'name email')
              .select('-__v');
            
            if (business) {
              console.log('✅ Found business data for website:', websiteName);
              
              // Return response in exact business.json format
              return res.status(200).json({
                status: 'success',
                statusCode: 200,
                message: 'Business website data retrieved successfully',
                timestamp: new Date().toISOString(),
                data: {
                  isPersonalPortfolio: false,
                  portfolio: {
                    buisness: {
                      id: business.slug,
                      name: business.name,
                      slug: business.slug,
                      type: 'business',
                      category: business.category || 'Professional Services',
                      primaryColor: business.primaryColor || '#e91e63',
                      secondaryColor: business.secondaryColor || '#f8bbd9',
                      logo: business.logo,
                      image: business.image,
                      tagline: business.tagline,
                      rating: business.rating || 4.5,
                      reviewCount: business.reviewCount || 0,
                      address: business.address,
                      city: business.city,
                      state: business.state,
                      zipCode: business.zipCode,
                      coordinates: business.coordinates || { lat: 37.7749, lng: -122.4194 },
                      description: business.description,
                      features: business.features || [],
                      hero: business.hero || {},
                      about: business.about || {},
                      services: business.services || [],
                      portfolio: business.portfolio || [],
                      testimonials: business.testimonials || [],
                      contact: business.contact || {},
                      team: business.team || []
                    }
                  }
                }
              });
            }
          } catch (error) {
            console.error('Error fetching business data:', error);
          }
          break;

        default:
          console.log('⚠️ Unknown website type:', website.websiteType);
          break;
      }

      // Regular website response for non-hotel websites
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
