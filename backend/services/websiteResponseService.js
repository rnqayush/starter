const Website = require('../models/Website');
const { WeddingVendor } = require('../models/Wedding');
const Hotel = require('../models/Hotel');
const Ecommerce = require('../models/Ecommerce');
const Automobile = require('../models/Automobile');
const Business = require('../models/Business');

// Import default data structures from DummyData
const weddingDummyData = require('../../src/DummyData/wedding.json');
const hotelDummyData = require('../../src/DummyData/hotels.json');
const ecommerceDummyData = require('../../src/DummyData/ecommerce.json');
const automobileDummyData = require('../../src/DummyData/automobiles.json');
const businessDummyData = require('../../src/DummyData/business.json');

class WebsiteResponseService {
  /**
   * Get website data by slug and return in appropriate DummyData format
   * @param {string} slug - Website slug/name
   * @returns {Object} - Formatted response matching DummyData structure
   */
  static async getWebsiteBySlug(slug) {
    try {
      // Find website by slug
      const website = await Website.findOne({ websiteName: slug })
        .populate('owner', 'name email phone')
        .select('-__v');

      if (!website) {
        throw new Error('Website not found');
      }

      // Get module-specific data based on websiteType
      let moduleData = null;
      if (website.publishedData) {
        moduleData = await this.getModuleData(website.websiteType, website.publishedData);
      }

      // Return data in appropriate format based on websiteType
      return this.formatResponse(website, moduleData);
    } catch (error) {
      console.error('WebsiteResponseService.getWebsiteBySlug error:', error);
      throw error;
    }
  }

  /**
   * Get module-specific data from database
   * @param {string} websiteType - Type of website (weddings, hotels, etc.)
   * @param {ObjectId} publishedDataId - ID of the published data
   * @returns {Object} - Module data from database
   */
  static async getModuleData(websiteType, publishedDataId) {
    try {
      let moduleData = null;

      switch (websiteType) {
        case 'weddings':
          moduleData = await WeddingVendor.findById(publishedDataId)
            .populate('owner', 'name email phone')
            .select('-__v');
          break;

        case 'hotels':
          moduleData = await Hotel.findById(publishedDataId)
            .populate('owner', 'name email phone')
            .select('-__v');
          break;

        case 'ecommerce':
          moduleData = await Ecommerce.findById(publishedDataId)
            .populate('owner', 'name email phone')
            .select('-__v');
          break;

        case 'automobiles':
          moduleData = await Automobile.findById(publishedDataId)
            .populate('owner', 'name email phone')
            .select('-__v');
          break;

        case 'professional':
          moduleData = await Business.findById(publishedDataId)
            .populate('owner', 'name email phone')
            .select('-__v');
          break;

        default:
          console.warn(`Unknown website type: ${websiteType}`);
      }

      return moduleData;
    } catch (error) {
      console.error('WebsiteResponseService.getModuleData error:', error);
      return null;
    }
  }

  /**
   * Format response to match DummyData JSON structure
   * @param {Object} website - Website document from database
   * @param {Object} moduleData - Module-specific data from database
   * @returns {Object} - Formatted response matching DummyData structure
   */
  static formatResponse(website, moduleData) {
    const baseResponse = {
      status: 'success',
      statusCode: 200,
      message: `${website.websiteType} website data retrieved successfully`,
      timestamp: new Date().toISOString(),
      websiteType: website.websiteType, // Add websiteType to response for frontend
    };

    // If no module data, return default structure from DummyData
    if (!moduleData) {
      return this.getDefaultResponse(website.websiteType, website);
    }

    // Format response based on websiteType to match DummyData structure
    switch (website.websiteType) {
      case 'weddings':
        return {
          ...baseResponse,
          data: {
            vendors: {
              [website.websiteName]: this.formatWeddingData(moduleData, website)
            }
          }
        };

      case 'hotels':
        return {
          ...baseResponse,
          data: {
            hotel: this.formatHotelData(moduleData, website)
          }
        };

      case 'ecommerce':
        return {
          ...baseResponse,
          ...this.formatEcommerceData(moduleData, website)
        };

      case 'automobiles':
        return {
          ...baseResponse,
          ...this.formatAutomobileData(moduleData, website)
        };

      case 'professional':
        return {
          ...baseResponse,
          data: {
            portfolio: {
              buisness: this.formatBusinessData(moduleData, website)
            }
          }
        };

      default:
        throw new Error(`Unsupported website type: ${website.websiteType}`);
    }
  }

  /**
   * Get default response structure when no module data exists
   * @param {string} websiteType - Type of website
   * @param {Object} website - Website document
   * @returns {Object} - Default response structure
   */
  static getDefaultResponse(websiteType, website) {
    const baseResponse = {
      status: 'success',
      statusCode: 200,
      message: `${websiteType} website data retrieved successfully`,
      timestamp: new Date().toISOString(),
      websiteType: websiteType,
    };

    switch (websiteType) {
      case 'weddings':
        return {
          ...baseResponse,
          data: {
            vendors: {
              [website.websiteName]: {
                ...weddingDummyData.data.vendors['elegant-events'],
                id: website.websiteName,
                slug: website.websiteName,
                name: website.basicInfo.tagline || 'Wedding Services',
              }
            }
          }
        };

      case 'hotels':
        return {
          ...baseResponse,
          data: {
            hotel: {
              ...hotelDummyData.data.hotel,
              slug: website.websiteName,
              name: website.basicInfo.tagline || 'Hotel',
            }
          }
        };

      case 'ecommerce':
        return {
          ...baseResponse,
          vendor: {
            ...ecommerceDummyData.vendor,
            slug: website.websiteName,
            name: website.basicInfo.tagline || 'Store',
          },
          categories: ecommerceDummyData.categories || [],
          products: ecommerceDummyData.products || [],
          pageContent: ecommerceDummyData.pageContent || {},
          analytics: ecommerceDummyData.analytics || {},
        };

      case 'automobiles':
        return {
          ...baseResponse,
          data: {
            vendor: {
              ...automobileDummyData.data.vendor,
              slug: website.websiteName,
              name: website.basicInfo.tagline || 'Auto Dealer',
            },
            allCategories: automobileDummyData.data.allCategories || [],
            allVehicles: automobileDummyData.data.allVehicles || [],
          }
        };

      case 'professional':
        return {
          ...baseResponse,
          data: {
            portfolio: {
              buisness: {
                ...businessDummyData.data.portfolio.buisness,
                slug: website.websiteName,
                name: website.basicInfo.tagline || 'Business',
              }
            }
          }
        };

      default:
        throw new Error(`Unsupported website type: ${websiteType}`);
    }
  }

  // Format methods for each module type
  static formatWeddingData(moduleData, website) {
    return {
      id: website.websiteName,
      slug: website.websiteName,
      name: moduleData.name || website.basicInfo.tagline,
      category: moduleData.category || 'Full Service',
      logo: moduleData.businessInfo?.logo || website.basicInfo.logo,
      image: moduleData.businessInfo?.coverImage,
      tagline: website.basicInfo.tagline || moduleData.businessInfo?.description,
      rating: moduleData.analytics?.averageRating || 4.5,
      reviewCount: moduleData.analytics?.totalReviews || 0,
      address: moduleData.contact?.address?.street || '',
      city: moduleData.city || moduleData.contact?.address?.city || '',
      state: moduleData.state || moduleData.contact?.address?.state || '',
      zipCode: moduleData.contact?.address?.zipCode || '',
      coordinates: moduleData.coordinates || { lat: 37.7749, lng: -122.4194 },
      description: moduleData.businessInfo?.description || website.basicInfo.tagline,
      // Include all other fields from moduleData
      ...moduleData.toObject(),
    };
  }

  static formatHotelData(moduleData, website) {
    return {
      slug: website.websiteName,
      name: moduleData.name || website.basicInfo.tagline,
      // Include all other fields from moduleData
      ...moduleData.toObject(),
    };
  }

  static formatEcommerceData(moduleData, website) {
    return {
      vendor: {
        slug: website.websiteName,
        name: moduleData.name || website.basicInfo.tagline,
        // Include all other fields from moduleData
        ...moduleData.toObject(),
      },
      categories: moduleData.categories || [],
      products: moduleData.products || [],
      pageContent: moduleData.pageContent || {},
      analytics: moduleData.analytics || {},
    };
  }

  static formatAutomobileData(moduleData, website) {
    return {
      data: {
        vendor: {
          slug: website.websiteName,
          name: moduleData.name || website.basicInfo.tagline,
          // Include all other fields from moduleData
          ...moduleData.toObject(),
        },
        allCategories: moduleData.allCategories || [],
        allVehicles: moduleData.allVehicles || [],
      }
    };
  }

  static formatBusinessData(moduleData, website) {
    return {
      slug: website.websiteName,
      name: moduleData.name || website.basicInfo.tagline,
      // Include all other fields from moduleData
      ...moduleData.toObject(),
    };
  }
}

module.exports = WebsiteResponseService;
