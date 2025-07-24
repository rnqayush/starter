import { apiRequest, handleApiResponse, handleApiError } from './apiClient';
import { API_ENDPOINTS } from '../constants/api';

class EcommerceService {
  // Get all products with pagination and filters
  async getProducts(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.LIST, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get product by ID
  async getProductById(id) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.BY_ID(id));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Create new product (vendor only)
  async createProduct(productData) {
    try {
      const response = await apiRequest.post(API_ENDPOINTS.ECOMMERCE.CREATE, productData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Update product (vendor only)
  async updateProduct(id, productData) {
    try {
      const response = await apiRequest.put(API_ENDPOINTS.ECOMMERCE.UPDATE(id), productData);
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Delete product (vendor only)
  async deleteProduct(id) {
    try {
      const response = await apiRequest.delete(API_ENDPOINTS.ECOMMERCE.DELETE(id));
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get vendor's products
  async getVendorProducts(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.VENDOR_PRODUCTS, { params });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Search products
  async searchProducts(searchParams) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.LIST, { 
        params: { ...searchParams, search: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get products by category
  async getProductsByCategory(category, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.LIST, { 
        params: { ...params, category } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get products by price range
  async getProductsByPriceRange(minPrice, maxPrice, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.LIST, { 
        params: { ...params, minPrice, maxPrice } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get products by brand
  async getProductsByBrand(brand, params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.LIST, { 
        params: { ...params, brand } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get featured products
  async getFeaturedProducts(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.LIST, { 
        params: { ...params, featured: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get products on sale
  async getProductsOnSale(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.LIST, { 
        params: { ...params, onSale: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }

  // Get new arrivals
  async getNewArrivals(params = {}) {
    try {
      const response = await apiRequest.get(API_ENDPOINTS.ECOMMERCE.LIST, { 
        params: { ...params, newArrivals: true } 
      });
      return handleApiResponse(response);
    } catch (error) {
      return handleApiError(error);
    }
  }
}

// Create and export singleton instance
const ecommerceService = new EcommerceService();
export default ecommerceService;

