const Ecommerce = require('../models/Ecommerce');
const ecommerceDummyData = require('../../src/DummyData/ecommerce.json');

class EcommerceController {
  // Get all ecommerce stores
  static async getAllStores(req, res) {
    try {
      const { category, featured, limit = 10, offset = 0 } = req.query;

      let query = { status: 'published' };
      if (category) {
        query['categories.name'] = new RegExp(category, 'i');
      }
      if (featured === 'true') {
        query['vendor.featured'] = true;
      }

      const stores = await Ecommerce.find(query)
        .populate('vendor.owner', 'name email')
        .limit(parseInt(limit))
        .skip(parseInt(offset))
        .sort({ createdAt: -1 })
        .select('-__v');

      // If no stores in DB, return dummy data
      if (stores.length === 0) {
        return res.status(200).json({
          status: 'success',
          statusCode: 200,
          message: 'Ecommerce data retrieved successfully',
          timestamp: new Date().toISOString(),
          data: {
            vendor: ecommerceDummyData.vendor,
            categories: ecommerceDummyData.categories || [],
            products: ecommerceDummyData.products || [],
            pageContent: ecommerceDummyData.pageContent || {},
            analytics: ecommerceDummyData.analytics || {},
          },
        });
      }

      const total = await Ecommerce.countDocuments(query);

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Ecommerce stores retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          stores,
          count: stores.length,
          total,
          hasMore: parseInt(offset) + stores.length < total,
        },
      });
    } catch (error) {
      console.error('Get all ecommerce stores error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve ecommerce stores',
      });
    }
  }

  // Get ecommerce store by slug
  static async getStore(req, res) {
    try {
      const { slug } = req.params;

      let store = await Ecommerce.findOne({ 'vendor.slug': slug })
        .populate('vendor.owner', 'name email')
        .select('-__v');

      // If not found in DB, return dummy data for demo
      if (!store) {
        if (ecommerceDummyData.vendor.slug === slug) {
          return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Ecommerce data retrieved successfully',
            timestamp: new Date().toISOString(),
            data: ecommerceDummyData,
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Store not found',
        });
      }

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Ecommerce data retrieved successfully',
        timestamp: new Date().toISOString(),
        data: store,
      });
    } catch (error) {
      console.error('Get ecommerce store error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve store data',
      });
    }
  }

  // Get store products
  static async getStoreProducts(req, res) {
    try {
      const { slug } = req.params;
      const { category, featured, limit = 20, offset = 0 } = req.query;

      let store = await Ecommerce.findOne({ 'vendor.slug': slug });

      if (!store) {
        // Return dummy data for demo
        if (ecommerceDummyData.vendor.slug === slug) {
          let products = ecommerceDummyData.products || [];

          // Apply filters
          if (category) {
            products = products.filter(product =>
              product.category.toLowerCase().includes(category.toLowerCase())
            );
          }
          if (featured === 'true') {
            products = products.filter(product => product.featured);
          }

          // Apply pagination
          const startIndex = parseInt(offset);
          const endIndex = startIndex + parseInt(limit);
          const paginatedProducts = products.slice(startIndex, endIndex);

          return res.status(200).json({
            status: 'success',
            statusCode: 200,
            message: 'Store products retrieved successfully',
            timestamp: new Date().toISOString(),
            data: {
              products: paginatedProducts,
              count: paginatedProducts.length,
              total: products.length,
              hasMore: endIndex < products.length,
            },
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Store not found',
        });
      }

      let products = store.products || [];

      // Apply filters
      if (category) {
        products = products.filter(product =>
          product.category.toLowerCase().includes(category.toLowerCase())
        );
      }
      if (featured === 'true') {
        products = products.filter(product => product.featured);
      }

      // Apply pagination
      const startIndex = parseInt(offset);
      const endIndex = startIndex + parseInt(limit);
      const paginatedProducts = products.slice(startIndex, endIndex);

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Store products retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          products: paginatedProducts,
          count: paginatedProducts.length,
          total: products.length,
          hasMore: endIndex < products.length,
        },
      });
    } catch (error) {
      console.error('Get store products error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve store products',
      });
    }
  }

  // Get product by ID
  static async getProduct(req, res) {
    try {
      const { slug, productId } = req.params;

      let store = await Ecommerce.findOne({ 'vendor.slug': slug });

      if (!store) {
        // Return dummy data for demo
        if (ecommerceDummyData.vendor.slug === slug) {
          const product = ecommerceDummyData.products?.find(
            p => p.id === parseInt(productId)
          );
          if (product) {
            return res.status(200).json({
              status: 'success',
              statusCode: 200,
              message: 'Product retrieved successfully',
              timestamp: new Date().toISOString(),
              data: product,
            });
          }
        }

        return res.status(404).json({
          status: 'error',
          message: 'Store not found',
        });
      }

      const product = store.products?.find(p => p.id === parseInt(productId));
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'Product not found',
        });
      }

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Product retrieved successfully',
        timestamp: new Date().toISOString(),
        data: product,
      });
    } catch (error) {
      console.error('Get product error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve product',
      });
    }
  }

  // Create new ecommerce store
  static async create(req, res) {
    try {
      const storeData = {
        ...req.body,
        'vendor.owner': req.userId,
      };

      // Generate unique slug if not provided
      if (!storeData.vendor?.slug) {
        const slug =
          storeData.vendor?.name
            ?.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '') || 'store';

        if (!storeData.vendor) storeData.vendor = {};
        storeData.vendor.slug = slug;
      }

      // Ensure unique slug
      const existingStore = await Ecommerce.findOne({
        'vendor.slug': storeData.vendor.slug,
      });
      if (existingStore) {
        storeData.vendor.slug = `${storeData.vendor.slug}-${Date.now()}`;
      }

      const store = new Ecommerce(storeData);
      await store.save();

      await store.populate('vendor.owner', 'name email');

      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Ecommerce store created successfully',
        timestamp: new Date().toISOString(),
        data: store,
      });
    } catch (error) {
      console.error('Create ecommerce store error:', error);

      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Store with this slug already exists',
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create ecommerce store',
      });
    }
  }

  // Update ecommerce store
  static async update(req, res) {
    try {
      const { slug } = req.params;
      const updateData = req.body;

      const store = await Ecommerce.findOne({ 'vendor.slug': slug });
      if (!store) {
        return res.status(404).json({
          status: 'error',
          message: 'Store not found',
        });
      }

      // Check ownership
      if (store.vendor.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to update this store',
        });
      }

      // Update store
      Object.assign(store, updateData);
      await store.save();

      await store.populate('vendor.owner', 'name email');

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'Ecommerce store updated successfully',
        timestamp: new Date().toISOString(),
        data: store,
      });
    } catch (error) {
      console.error('Update ecommerce store error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to update ecommerce store',
      });
    }
  }

  // Delete ecommerce store
  static async delete(req, res) {
    try {
      const { slug } = req.params;

      const store = await Ecommerce.findOne({ 'vendor.slug': slug });
      if (!store) {
        return res.status(404).json({
          status: 'error',
          message: 'Store not found',
        });
      }

      // Check ownership
      if (store.vendor.owner.toString() !== req.userId.toString()) {
        return res.status(403).json({
          status: 'error',
          message: 'Not authorized to delete this store',
        });
      }

      await Ecommerce.findByIdAndDelete(store._id);

      res.status(200).json({
        status: 'success',
        message: 'Ecommerce store deleted successfully',
      });
    } catch (error) {
      console.error('Delete ecommerce store error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to delete ecommerce store',
      });
    }
  }

  // Get user's ecommerce stores
  static async getUserStores(req, res) {
    try {
      const stores = await Ecommerce.find({ 'vendor.owner': req.userId })
        .populate('vendor.owner', 'name email')
        .sort({ createdAt: -1 })
        .select('-__v');

      res.status(200).json({
        status: 'success',
        statusCode: 200,
        message: 'User ecommerce stores retrieved successfully',
        timestamp: new Date().toISOString(),
        data: {
          stores,
          count: stores.length,
        },
      });
    } catch (error) {
      console.error('Get user ecommerce stores error:', error);
      res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve user ecommerce stores',
      });
    }
  }

  // Create ecommerce store from start-building
  static async createFromStartBuilding(req, res) {
    try {
      const { websiteName, websiteType, tagline, themeColor } = req.body;

      if (websiteType !== 'ecommerce') {
        return res.status(400).json({
          status: 'error',
          message: 'Invalid website type for ecommerce',
        });
      }

      // Create ecommerce store with user's customizations and dummy data structure
      const storeData = {
        vendor: {
          ...ecommerceDummyData.vendor,
          id: websiteName,
          slug: websiteName,
          name: tagline || ecommerceDummyData.vendor.name,
          owner: req.userId,
          theme: {
            ...ecommerceDummyData.vendor.theme,
            primaryColor:
              themeColor || ecommerceDummyData.vendor.theme.primaryColor,
          },
        },
        pageContent: ecommerceDummyData.pageContent || {},
        categories: ecommerceDummyData.categories || [],
        products: ecommerceDummyData.products || [],
        analytics: ecommerceDummyData.analytics || {},
        settings: ecommerceDummyData.settings || {},
        status: 'published',
      };

      const store = new Ecommerce(storeData);
      await store.save();

      await store.populate('vendor.owner', 'name email');

      res.status(201).json({
        status: 'success',
        statusCode: 201,
        message: 'Ecommerce website created successfully',
        timestamp: new Date().toISOString(),
        data: store,
      });
    } catch (error) {
      console.error('Create ecommerce from start-building error:', error);

      if (error.code === 11000) {
        return res.status(400).json({
          status: 'error',
          message: 'Website name already taken',
        });
      }

      res.status(500).json({
        status: 'error',
        message: 'Failed to create ecommerce website',
      });
    }
  }
}

module.exports = EcommerceController;
