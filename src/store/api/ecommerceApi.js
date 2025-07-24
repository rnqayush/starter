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
} = ecommerceApi;
