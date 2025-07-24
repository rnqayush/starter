import { apiSlice } from './apiSlice';
import { API_ENDPOINTS } from '../../constants/api';

export const ecommerceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products with pagination and filters
    getProducts: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        // Add pagination
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        
        // Add filters
        if (params.category) searchParams.append('category', params.category);
        if (params.priceMin) searchParams.append('priceMin', params.priceMin);
        if (params.priceMax) searchParams.append('priceMax', params.priceMax);
        if (params.brand) searchParams.append('brand', params.brand);
        if (params.rating) searchParams.append('rating', params.rating);
        if (params.inStock) searchParams.append('inStock', params.inStock);
        if (params.onSale) searchParams.append('onSale', params.onSale);
        
        // Add sorting
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        // Add search
        if (params.search) searchParams.append('search', params.search);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.ECOMMERCE.LIST}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.products
          ? [
              ...result.data.products.map(({ _id }) => ({ type: 'Ecommerce', id: _id })),
              { type: 'Ecommerce', id: 'LIST' },
            ]
          : [{ type: 'Ecommerce', id: 'LIST' }],
    }),
    
    // Get product by ID
    getProductById: builder.query({
      query: (id) => API_ENDPOINTS.ECOMMERCE.BY_ID(id),
      providesTags: (result, error, id) => [{ type: 'Ecommerce', id }],
    }),
    
    // Create new product (vendor only)
    createProduct: builder.mutation({
      query: (productData) => ({
        url: API_ENDPOINTS.ECOMMERCE.CREATE,
        method: 'POST',
        body: productData,
      }),
      invalidatesTags: [{ type: 'Ecommerce', id: 'LIST' }, 'Stats'],
    }),
    
    // Update product (vendor only)
    updateProduct: builder.mutation({
      query: ({ id, ...productData }) => ({
        url: API_ENDPOINTS.ECOMMERCE.UPDATE(id),
        method: 'PUT',
        body: productData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ecommerce', id },
        { type: 'Ecommerce', id: 'LIST' },
      ],
    }),
    
    // Delete product (vendor only)
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: API_ENDPOINTS.ECOMMERCE.DELETE(id),
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Ecommerce', id },
        { type: 'Ecommerce', id: 'LIST' },
        'Stats',
      ],
    }),
    
    // Get vendor's products
    getVendorProducts: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.status) searchParams.append('status', params.status);
        if (params.category) searchParams.append('category', params.category);
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        
        const queryString = searchParams.toString();
        return `${API_ENDPOINTS.ECOMMERCE.VENDOR_PRODUCTS}${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: (result) =>
        result?.data?.products
          ? [
              ...result.data.products.map(({ _id }) => ({ type: 'Ecommerce', id: _id })),
              { type: 'Ecommerce', id: 'VENDOR_LIST' },
            ]
          : [{ type: 'Ecommerce', id: 'VENDOR_LIST' }],
    }),
    
    // Get product categories
    getProductCategories: builder.query({
      query: () => '/ecommerce/categories',
      providesTags: ['Ecommerce'],
    }),
    
    // Get featured products
    getFeaturedProducts: builder.query({
      query: (limit = 8) => `/ecommerce/featured?limit=${limit}`,
      providesTags: ['Ecommerce'],
    }),
    
    // Get products on sale
    getSaleProducts: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        
        const queryString = searchParams.toString();
        return `/ecommerce/sale${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Ecommerce'],
    }),

    // Inventory Management
    updateProductStock: builder.mutation({
      query: ({ id, stock }) => ({
        url: `/ecommerce/${id}/stock`,
        method: 'PUT',
        body: { stock },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ecommerce', id },
        { type: 'Ecommerce', id: 'LIST' },
      ],
    }),

    bulkUpdateStock: builder.mutation({
      query: (stockUpdates) => ({
        url: '/ecommerce/bulk-stock-update',
        method: 'PUT',
        body: { updates: stockUpdates },
      }),
      invalidatesTags: ['Ecommerce'],
    }),

    // Product Variants Management
    addProductVariant: builder.mutation({
      query: ({ id, variantData }) => ({
        url: `/ecommerce/${id}/variants`,
        method: 'POST',
        body: variantData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ecommerce', id },
        { type: 'Ecommerce', id: 'LIST' },
      ],
    }),

    updateProductVariant: builder.mutation({
      query: ({ id, variantId, variantData }) => ({
        url: `/ecommerce/${id}/variants/${variantId}`,
        method: 'PUT',
        body: variantData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ecommerce', id },
        { type: 'Ecommerce', id: 'LIST' },
      ],
    }),

    deleteProductVariant: builder.mutation({
      query: ({ id, variantId }) => ({
        url: `/ecommerce/${id}/variants/${variantId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ecommerce', id },
        { type: 'Ecommerce', id: 'LIST' },
      ],
    }),

    // Reviews and Ratings
    addProductReview: builder.mutation({
      query: ({ id, reviewData }) => ({
        url: `/ecommerce/${id}/reviews`,
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Ecommerce', id },
        { type: 'Ecommerce', id: 'LIST' },
      ],
    }),

    getProductReviews: builder.query({
      query: ({ id, page = 1, limit = 10 }) => 
        `/ecommerce/${id}/reviews?page=${page}&limit=${limit}`,
      providesTags: (result, error, { id }) => [
        { type: 'Ecommerce', id: `${id}-reviews` },
      ],
    }),

    // Wishlist Management
    addToWishlist: builder.mutation({
      query: (productId) => ({
        url: '/ecommerce/wishlist',
        method: 'POST',
        body: { productId },
      }),
      invalidatesTags: ['Ecommerce'],
    }),

    removeFromWishlist: builder.mutation({
      query: (productId) => ({
        url: `/ecommerce/wishlist/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Ecommerce'],
    }),

    getWishlist: builder.query({
      query: () => '/ecommerce/wishlist',
      providesTags: ['Ecommerce'],
    }),

    // Cart Management
    addToCart: builder.mutation({
      query: ({ productId, quantity, variantId }) => ({
        url: '/ecommerce/cart',
        method: 'POST',
        body: { productId, quantity, variantId },
      }),
      invalidatesTags: ['Ecommerce'],
    }),

    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/ecommerce/cart/${itemId}`,
        method: 'PUT',
        body: { quantity },
      }),
      invalidatesTags: ['Ecommerce'],
    }),

    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `/ecommerce/cart/${itemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Ecommerce'],
    }),

    getCart: builder.query({
      query: () => '/ecommerce/cart',
      providesTags: ['Ecommerce'],
    }),

    clearCart: builder.mutation({
      query: () => ({
        url: '/ecommerce/cart/clear',
        method: 'DELETE',
      }),
      invalidatesTags: ['Ecommerce'],
    }),

    // Orders Management
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/ecommerce/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Ecommerce'],
    }),

    getOrders: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.status) searchParams.append('status', params.status);
        
        const queryString = searchParams.toString();
        return `/ecommerce/orders${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Ecommerce'],
    }),

    getOrderById: builder.query({
      query: (orderId) => `/ecommerce/orders/${orderId}`,
      providesTags: (result, error, orderId) => [
        { type: 'Ecommerce', id: orderId },
      ],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/ecommerce/orders/${orderId}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: 'Ecommerce', id: orderId },
        'Ecommerce',
      ],
    }),

    // Coupons Management
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: '/ecommerce/coupons',
        method: 'POST',
        body: couponData,
      }),
      invalidatesTags: ['Ecommerce'],
    }),

    getCoupons: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append('page', params.page);
        if (params.limit) searchParams.append('limit', params.limit);
        if (params.active) searchParams.append('active', params.active);
        
        const queryString = searchParams.toString();
        return `/ecommerce/coupons${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Ecommerce'],
    }),

    validateCoupon: builder.mutation({
      query: ({ code, cartTotal }) => ({
        url: '/ecommerce/coupons/validate',
        method: 'POST',
        body: { code, cartTotal },
      }),
    }),

    // Analytics and Reports
    getProductAnalytics: builder.query({
      query: ({ productId, period = '30d' }) => 
        `/ecommerce/analytics/product/${productId}?period=${period}`,
      providesTags: (result, error, { productId }) => [
        { type: 'Ecommerce', id: `${productId}-analytics` },
      ],
    }),

    getSalesReport: builder.query({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();
        if (params.startDate) searchParams.append('startDate', params.startDate);
        if (params.endDate) searchParams.append('endDate', params.endDate);
        if (params.groupBy) searchParams.append('groupBy', params.groupBy);
        
        const queryString = searchParams.toString();
        return `/ecommerce/analytics/sales${queryString ? `?${queryString}` : ''}`;
      },
      providesTags: ['Ecommerce'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetVendorProductsQuery,
  useGetProductCategoriesQuery,
  useGetFeaturedProductsQuery,
  useGetSaleProductsQuery,
  useUpdateProductStockMutation,
  useBulkUpdateStockMutation,
  useAddProductVariantMutation,
  useUpdateProductVariantMutation,
  useDeleteProductVariantMutation,
  useAddProductReviewMutation,
  useGetProductReviewsQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
  useGetWishlistQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useGetCartQuery,
  useClearCartMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useCreateCouponMutation,
  useGetCouponsQuery,
  useValidateCouponMutation,
  useGetProductAnalyticsQuery,
  useGetSalesReportQuery,
} = ecommerceApi;
