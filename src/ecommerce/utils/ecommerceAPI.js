// Ecommerce API utilities - following the automobile module pattern
// In a real application, these would make actual HTTP requests to your backend

import ecommerceData from '../data/ecommerce.json';

// Base configuration
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';
const ECOMMERCE_ENDPOINT = `${API_BASE_URL}/stores`;

// Simulate network delay for realistic UX
const simulateNetworkDelay = (ms = 500) =>
  new Promise(resolve => setTimeout(resolve, ms));

// Helper function to simulate API responses
const createApiResponse = (data, success = true, message = '') => ({
  success,
  data,
  message,
  timestamp: new Date().toISOString(),
});

export const ecommerceAPI = {
  // Vendor/Store operations
  async getVendorData(vendorSlug) {
    await simulateNetworkDelay();

    try {
      // In a real app: const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}`);
      // For demo, return static data
      return createApiResponse(ecommerceData);
    } catch (error) {
      throw new Error(`Failed to fetch store data: ${error.message}`);
    }
  },

  async updateVendorInfo(vendorSlug, vendorData) {
    await simulateNetworkDelay(800);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(vendorData)
      // });

      return createApiResponse(
        vendorData,
        true,
        'Store information updated successfully'
      );
    } catch (error) {
      throw new Error(`Failed to update store info: ${error.message}`);
    }
  },

  async deleteVendor(vendorSlug) {
    await simulateNetworkDelay(600);

    try {
      // In a real app: await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}`, { method: 'DELETE' });
      return createApiResponse(null, true, 'Store deleted successfully');
    } catch (error) {
      throw new Error(`Failed to delete store: ${error.message}`);
    }
  },

  // Page section management
  async updatePageSections(vendorSlug, sections) {
    await simulateNetworkDelay(700);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/sections`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ sections })
      // });

      return createApiResponse(
        sections,
        true,
        'Page sections updated successfully'
      );
    } catch (error) {
      throw new Error(`Failed to update page sections: ${error.message}`);
    }
  },

  async updateSection(vendorSlug, sectionId, sectionData) {
    await simulateNetworkDelay(400);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/sections/${sectionId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(sectionData)
      // });

      return createApiResponse(
        sectionData,
        true,
        'Section updated successfully'
      );
    } catch (error) {
      throw new Error(`Failed to update section: ${error.message}`);
    }
  },

  // Product management
  async getProducts(vendorSlug, filters = {}) {
    await simulateNetworkDelay(300);

    try {
      // In a real app:
      // const queryParams = new URLSearchParams(filters);
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/products?${queryParams}`);

      let products = ecommerceData.products || [];

      // Apply filters (in real app, this would be done on the backend)
      if (filters.category && filters.category !== 'all') {
        products = products.filter(
          product => product.category === filters.category
        );
      }

      if (filters.availability && filters.availability !== 'all') {
        products = products.filter(
          product => product.availability?.status === filters.availability
        );
      }

      if (filters.featured === 'true') {
        products = products.filter(product => product.featured);
      }

      if (filters.onSale === 'true') {
        products = products.filter(product => product.pricing?.onSale);
      }

      return createApiResponse(products);
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  async getProduct(vendorSlug, productId) {
    await simulateNetworkDelay(200);

    try {
      // In a real app: const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/products/${productId}`);
      const product = ecommerceData.products?.find(
        p => p.id === parseInt(productId)
      );

      if (!product) {
        throw new Error('Product not found');
      }

      return createApiResponse(product);
    } catch (error) {
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  },

  async createProduct(vendorSlug, productData) {
    await simulateNetworkDelay(800);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/products`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(productData)
      // });

      const newProduct = {
        ...productData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return createApiResponse(
        newProduct,
        true,
        'Product created successfully'
      );
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },

  async updateProduct(vendorSlug, productId, productData) {
    await simulateNetworkDelay(600);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/products/${productId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(productData)
      // });

      const updatedProduct = {
        ...productData,
        id: parseInt(productId),
        updatedAt: new Date().toISOString(),
      };

      return createApiResponse(
        updatedProduct,
        true,
        'Product updated successfully'
      );
    } catch (error) {
      throw new Error(`Failed to update product: ${error.message}`);
    }
  },

  async deleteProduct(vendorSlug, productId) {
    await simulateNetworkDelay(400);

    try {
      // In a real app: await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/products/${productId}`, { method: 'DELETE' });
      return createApiResponse(null, true, 'Product deleted successfully');
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  },

  async bulkUpdateProducts(vendorSlug, updates) {
    await simulateNetworkDelay(1000);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/products/bulk`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ updates })
      // });

      return createApiResponse(updates, true, 'Products updated successfully');
    } catch (error) {
      throw new Error(`Failed to bulk update products: ${error.message}`);
    }
  },

  // Category management
  async getCategories(vendorSlug) {
    await simulateNetworkDelay(200);

    try {
      // In a real app: const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/categories`);
      return createApiResponse(ecommerceData.categories || []);
    } catch (error) {
      throw new Error(`Failed to fetch categories: ${error.message}`);
    }
  },

  async createCategory(vendorSlug, categoryData) {
    await simulateNetworkDelay(500);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/categories`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(categoryData)
      // });

      const newCategory = {
        ...categoryData,
        id: Date.now(),
        count: 0,
      };

      return createApiResponse(
        newCategory,
        true,
        'Category created successfully'
      );
    } catch (error) {
      throw new Error(`Failed to create category: ${error.message}`);
    }
  },

  async updateCategory(vendorSlug, categoryId, categoryData) {
    await simulateNetworkDelay(400);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/categories/${categoryId}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(categoryData)
      // });

      return createApiResponse(
        categoryData,
        true,
        'Category updated successfully'
      );
    } catch (error) {
      throw new Error(`Failed to update category: ${error.message}`);
    }
  },

  async deleteCategory(vendorSlug, categoryId) {
    await simulateNetworkDelay(300);

    try {
      // In a real app: await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/categories/${categoryId}`, { method: 'DELETE' });
      return createApiResponse(null, true, 'Category deleted successfully');
    } catch (error) {
      throw new Error(`Failed to delete category: ${error.message}`);
    }
  },

  // Order management
  async getOrders(vendorSlug, filters = {}) {
    await simulateNetworkDelay(400);

    try {
      // In a real app:
      // const queryParams = new URLSearchParams(filters);
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/orders?${queryParams}`);

      return createApiResponse(ecommerceData.orders || []);
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  },

  async updateOrderStatus(vendorSlug, orderId, status) {
    await simulateNetworkDelay(300);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/orders/${orderId}/status`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status })
      // });

      return createApiResponse(
        { orderId, status },
        true,
        'Order status updated successfully'
      );
    } catch (error) {
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  },

  // Enquiry management
  async getEnquiries(vendorSlug) {
    await simulateNetworkDelay(300);

    try {
      // In a real app: const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/enquiries`);
      return createApiResponse(ecommerceData.enquiries || []);
    } catch (error) {
      throw new Error(`Failed to fetch enquiries: ${error.message}`);
    }
  },

  async respondToEnquiry(vendorSlug, enquiryId, response) {
    await simulateNetworkDelay(400);

    try {
      // In a real app:
      // const apiResponse = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/enquiries/${enquiryId}/respond`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ response })
      // });

      return createApiResponse(
        { enquiryId, response },
        true,
        'Response sent successfully'
      );
    } catch (error) {
      throw new Error(`Failed to respond to enquiry: ${error.message}`);
    }
  },

  // Analytics
  async getAnalytics(vendorSlug, period = '30d') {
    await simulateNetworkDelay(600);

    try {
      // In a real app: const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/analytics?period=${period}`);
      return createApiResponse(ecommerceData.analytics || {});
    } catch (error) {
      throw new Error(`Failed to fetch analytics: ${error.message}`);
    }
  },

  // Wishlist operations
  async addToWishlist(vendorSlug, productId) {
    await simulateNetworkDelay(200);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/wishlist`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ productId })
      // });

      return createApiResponse({ productId }, true, 'Added to wishlist');
    } catch (error) {
      throw new Error(`Failed to add to wishlist: ${error.message}`);
    }
  },

  async removeFromWishlist(vendorSlug, productId) {
    await simulateNetworkDelay(200);

    try {
      // In a real app: await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/wishlist/${productId}`, { method: 'DELETE' });
      return createApiResponse({ productId }, true, 'Removed from wishlist');
    } catch (error) {
      throw new Error(`Failed to remove from wishlist: ${error.message}`);
    }
  },

  // Complete data synchronization (for admin saves)
  async syncCompleteData(vendorSlug, completeData) {
    await simulateNetworkDelay(1200);

    try {
      // In a real app:
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/sync`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(completeData)
      // });

      return createApiResponse(
        {
          ...completeData,
          lastSaved: new Date().toISOString(),
          lastPublished: new Date().toISOString(),
        },
        true,
        'All data synchronized successfully'
      );
    } catch (error) {
      throw new Error(`Failed to sync data: ${error.message}`);
    }
  },

  // Search and filtering
  async searchProducts(vendorSlug, query, filters = {}) {
    await simulateNetworkDelay(300);

    try {
      // In a real app:
      // const searchParams = new URLSearchParams({ query, ...filters });
      // const response = await fetch(`${ECOMMERCE_ENDPOINT}/${vendorSlug}/products/search?${searchParams}`);

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

      return createApiResponse(products);
    } catch (error) {
      throw new Error(`Failed to search products: ${error.message}`);
    }
  },
};

// Utility functions for working with ecommerce data
export const ecommerceUtils = {
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

// Export default
export default {
  ecommerceAPI,
  ecommerceUtils,
};
