// E-commerce service
// Handles all e-commerce/store-related API calls

import httpClient from '../client/httpClient';
import { ECOMMERCE_ENDPOINTS, buildUrlWithParams } from '../config/endpoints';
import { FEATURE_FLAGS } from '../config/config';

// Import dummy data for development/mocking
import ecommerceData from '../../DummyData/ecommerce.json';

class EcommerceService {
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

  // Vendor/Store operations
  async getVendorData(vendorSlug) {
    try {
      if (this.mockMode) {
        await this._simulateDelay();
        return this._createAPIResponse(ecommerceData);
      }

      const response = await httpClient.get(ECOMMERCE_ENDPOINTS.STORE(vendorSlug));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch store data: ${error.message}`);
    }
  }

  async updateVendorInfo(vendorSlug, vendorData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(800);
        return this._createAPIResponse(
          vendorData,
          true,
          'Store information updated successfully'
        );
      }

      const response = await httpClient.put(ECOMMERCE_ENDPOINTS.STORE(vendorSlug), vendorData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update store info: ${error.message}`);
    }
  }

  async deleteVendor(vendorSlug) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(600);
        return this._createAPIResponse(null, true, 'Store deleted successfully');
      }

      const response = await httpClient.delete(ECOMMERCE_ENDPOINTS.STORE(vendorSlug));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete store: ${error.message}`);
    }
  }

  // Page section management
  async updatePageSections(vendorSlug, sections) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(700);
        return this._createAPIResponse(
          sections,
          true,
          'Page sections updated successfully'
        );
      }

      const response = await httpClient.put(ECOMMERCE_ENDPOINTS.SECTIONS(vendorSlug), { sections });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update page sections: ${error.message}`);
    }
  }

  async updateSection(vendorSlug, sectionId, sectionData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(400);
        return this._createAPIResponse(
          sectionData,
          true,
          'Section updated successfully'
        );
      }

      const response = await httpClient.put(ECOMMERCE_ENDPOINTS.SECTION(vendorSlug, sectionId), sectionData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update section: ${error.message}`);
    }
  }

  // Product management
  async getProducts(vendorSlug, filters = {}) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);

        let products = ecommerceData.products || [];

        // Apply filters
        if (filters.category && filters.category !== 'all') {
          products = products.filter(product => product.category === filters.category);
        }

        if (filters.availability && filters.availability !== 'all') {
          products = products.filter(product => product.availability?.status === filters.availability);
        }

        if (filters.featured === 'true') {
          products = products.filter(product => product.featured);
        }

        if (filters.onSale === 'true') {
          products = products.filter(product => product.pricing?.onSale);
        }

        return this._createAPIResponse(products);
      }

      const url = buildUrlWithParams(ECOMMERCE_ENDPOINTS.PRODUCTS(vendorSlug), filters);
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  }

  async getProduct(vendorSlug, productId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(200);
        const product = ecommerceData.products?.find(p => p.id === parseInt(productId));

        if (!product) {
          throw new Error('Product not found');
        }

        return this._createAPIResponse(product);
      }

      const response = await httpClient.get(ECOMMERCE_ENDPOINTS.PRODUCT(vendorSlug, productId));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  }

  async createProduct(vendorSlug, productData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(800);
        const newProduct = {
          ...productData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        return this._createAPIResponse(
          newProduct,
          true,
          'Product created successfully'
        );
      }

      const response = await httpClient.post(ECOMMERCE_ENDPOINTS.PRODUCTS(vendorSlug), productData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  }

  async updateProduct(vendorSlug, productId, productData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(600);
        const updatedProduct = {
          ...productData,
          id: parseInt(productId),
          updatedAt: new Date().toISOString(),
        };

        return this._createAPIResponse(
          updatedProduct,
          true,
          'Product updated successfully'
        );
      }

      const response = await httpClient.put(ECOMMERCE_ENDPOINTS.PRODUCT(vendorSlug, productId), productData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  }

  async deleteProduct(vendorSlug, productId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(400);
        return this._createAPIResponse(null, true, 'Product deleted successfully');
      }

      const response = await httpClient.delete(ECOMMERCE_ENDPOINTS.PRODUCT(vendorSlug, productId));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }

  async bulkUpdateProducts(vendorSlug, updates) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(1000);
        return this._createAPIResponse(updates, true, 'Products updated successfully');
      }

      const response = await httpClient.put(ECOMMERCE_ENDPOINTS.BULK_PRODUCTS(vendorSlug), { updates });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to bulk update products: ${error.message}`);
    }
  }

  // Category management
  async getCategories(vendorSlug) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(200);
        return this._createAPIResponse(ecommerceData.categories || []);
      }

      const response = await httpClient.get(ECOMMERCE_ENDPOINTS.CATEGORIES(vendorSlug));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  }

  async createCategory(vendorSlug, categoryData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(500);
        const newCategory = {
          ...categoryData,
          id: Date.now(),
          count: 0,
        };

        return this._createAPIResponse(
          newCategory,
          true,
          'Category created successfully'
        );
      }

      const response = await httpClient.post(ECOMMERCE_ENDPOINTS.CATEGORIES(vendorSlug), categoryData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }

  async updateCategory(vendorSlug, categoryId, categoryData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(400);
        return this._createAPIResponse(
          categoryData,
          true,
          'Category updated successfully'
        );
      }

      const response = await httpClient.put(ECOMMERCE_ENDPOINTS.CATEGORY(vendorSlug, categoryId), categoryData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  }

  async deleteCategory(vendorSlug, categoryId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);
        return this._createAPIResponse(null, true, 'Category deleted successfully');
      }

      const response = await httpClient.delete(ECOMMERCE_ENDPOINTS.CATEGORY(vendorSlug, categoryId));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  }

  // Order management
  async getOrders(vendorSlug, filters = {}) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(400);
        return this._createAPIResponse(ecommerceData.orders || []);
      }

      const url = buildUrlWithParams(ECOMMERCE_ENDPOINTS.ORDERS(vendorSlug), filters);
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  async updateOrderStatus(vendorSlug, orderId, status) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);
        return this._createAPIResponse(
          { orderId, status },
          true,
          'Order status updated successfully'
        );
      }

      const response = await httpClient.put(ECOMMERCE_ENDPOINTS.ORDER_STATUS(vendorSlug, orderId), { status });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  }

  // Enquiry management
  async getEnquiries(vendorSlug) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);
        return this._createAPIResponse(ecommerceData.enquiries || []);
      }

      const response = await httpClient.get(ECOMMERCE_ENDPOINTS.ENQUIRIES(vendorSlug));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch enquiries: ${error.message}`);
    }
  }

  async respondToEnquiry(vendorSlug, enquiryId, response) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(400);
        return this._createAPIResponse(
          { enquiryId, response },
          true,
          'Response sent successfully'
        );
      }

      const apiResponse = await httpClient.post(ECOMMERCE_ENDPOINTS.ENQUIRY_RESPOND(vendorSlug, enquiryId), { response });
      return apiResponse.data;
    } catch (error) {
      throw new Error(`Failed to respond to enquiry: ${error.message}`);
    }
  }

  // Analytics
  async getAnalytics(vendorSlug, period = '30d') {
    try {
      if (this.mockMode) {
        await this._simulateDelay(600);
        return this._createAPIResponse(ecommerceData.analytics || {});
      }

      const response = await httpClient.get(buildUrlWithParams(ECOMMERCE_ENDPOINTS.ANALYTICS(vendorSlug), { period }));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch analytics: ${error.message}`);
    }
  }

  // Wishlist operations
  async addToWishlist(vendorSlug, productId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(200);
        return this._createAPIResponse({ productId }, true, 'Added to wishlist');
      }

      const response = await httpClient.post(ECOMMERCE_ENDPOINTS.WISHLIST(vendorSlug), { productId });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add to wishlist: ${error.message}`);
    }
  }

  async removeFromWishlist(vendorSlug, productId) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(200);
        return this._createAPIResponse({ productId }, true, 'Removed from wishlist');
      }

      const response = await httpClient.delete(ECOMMERCE_ENDPOINTS.WISHLIST_ITEM(vendorSlug, productId));
      return response.data;
    } catch (error) {
      throw new Error(`Failed to remove from wishlist: ${error.message}`);
    }
  }

  // Search and filtering
  async searchProducts(vendorSlug, query, filters = {}) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(300);

        let products = ecommerceData.products || [];

        // Simple search implementation
        if (query) {
          const searchTerm = query.toLowerCase();
          products = products.filter(
            product =>
              product.name.toLowerCase().includes(searchTerm) ||
              product.description.toLowerCase().includes(searchTerm) ||
              product.specifications?.features?.some(feature =>
                feature.toLowerCase().includes(searchTerm)
              )
          );
        }

        return this._createAPIResponse(products);
      }

      const searchParams = { query, ...filters };
      const url = buildUrlWithParams(ECOMMERCE_ENDPOINTS.SEARCH_PRODUCTS(vendorSlug), searchParams);
      const response = await httpClient.get(url);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search products: ${error.message}`);
    }
  }

  // Complete data synchronization (for admin saves)
  async syncCompleteData(vendorSlug, completeData) {
    try {
      if (this.mockMode) {
        await this._simulateDelay(1200);
        return this._createAPIResponse(
          {
            ...completeData,
            lastSaved: new Date().toISOString(),
            lastPublished: new Date().toISOString(),
          },
          true,
          'All data synchronized successfully'
        );
      }

      const response = await httpClient.post(ECOMMERCE_ENDPOINTS.SYNC(vendorSlug), completeData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to sync data: ${error.message}`);
    }
  }

  // Toggle mock mode
  setMockMode(enabled) {
    this.mockMode = enabled;
  }
}

// Utility functions for working with ecommerce data
const ecommerceUtils = {
  // Product utilities
  formatPrice: (price, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  },

  calculateDiscount: (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  },

  getAvailabilityStatus: product => {
    if (!product?.availability) return 'unknown';

    const { status, quantity } = product.availability;

    if (status === 'out_of_stock' || quantity === 0) {
      return 'out_of_stock';
    } else if (status === 'limited_stock' || quantity <= 5) {
      return 'limited_stock';
    } else if (status === 'pre_order') {
      return 'pre_order';
    } else {
      return 'in_stock';
    }
  },

  getAvailabilityLabel: status => {
    const labels = {
      in_stock: 'In Stock',
      out_of_stock: 'Out of Stock',
      limited_stock: 'Limited Stock',
      pre_order: 'Pre Order',
      unknown: 'Unknown',
    };
    return labels[status] || 'Unknown';
  },

  getAvailabilityColor: status => {
    const colors = {
      in_stock: '#10b981',
      out_of_stock: '#ef4444',
      limited_stock: '#f59e0b',
      pre_order: '#3b82f6',
      unknown: '#6b7280',
    };
    return colors[status] || '#6b7280';
  },

  // Category utilities
  getCategoryProductCount: (categorySlug, products) => {
    return products.filter(product => product.category === categorySlug).length;
  },

  // Analytics utilities
  calculateGrowthPercentage: (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  },

  formatGrowthPercentage: percentage => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(1)}%`;
  },

  // Validation utilities
  validateProductData: productData => {
    const errors = [];

    if (!productData.name?.trim()) {
      errors.push('Product name is required');
    }

    if (!productData.description?.trim()) {
      errors.push('Product description is required');
    }

    if (!productData.pricing?.price || productData.pricing.price <= 0) {
      errors.push('Valid product price is required');
    }

    if (!productData.categoryId) {
      errors.push('Product category is required');
    }

    return errors;
  },

  validateCategoryData: categoryData => {
    const errors = [];

    if (!categoryData.name?.trim()) {
      errors.push('Category name is required');
    }

    if (!categoryData.slug?.trim()) {
      errors.push('Category slug is required');
    }

    if (!categoryData.description?.trim()) {
      errors.push('Category description is required');
    }

    return errors;
  },
};

// Create and export singleton instance
const ecommerceService = new EcommerceService();

export { EcommerceService, ecommerceUtils };
export default ecommerceService;
