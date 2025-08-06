import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ecommerceData from '../../DummyData/ecommerce.json';
import {
  createEntityState,
  createEditingState,
  createFilterState,
  createPaginationState,
  createEntityReducers,
  createEditingReducers,
  createFilterReducers,
  createPaginationReducers,
} from '../utils/sliceUtils';

// Async thunks
export const fetchEcommerceData = createAsyncThunk(
  'ecommerce/fetchData',
  async ({ vendorSlug, forceRefresh = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState().ecommerceManagement;

      // Return cached data if available and not forcing refresh
      if (state.vendor?.slug === vendorSlug && !forceRefresh) {
        return state;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return ecommerceData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch ecommerce data');
    }
  }
);

export const saveEcommerceData = createAsyncThunk(
  'ecommerce/saveData',
  async (dataToSave, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        ...dataToSave,
        lastSaved: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to save ecommerce data');
    }
  }
);

export const publishChanges = createAsyncThunk(
  'ecommerce/publishChanges',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        lastPublished: new Date().toISOString(),
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to publish changes');
    }
  }
);

// Wishlist operations
export const addToWishlist = createAsyncThunk(
  'ecommerce/addToWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      return productId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'ecommerce/removeFromWishlist',
  async (productId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      return productId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to remove from wishlist');
    }
  }
);

// Initial state
const initialState = {
  // Core data
  vendor: null,
  categories: [],
  products: [],
  selectedProduct: null,

  // Page content management
  pageContent: {
    sections: [],
    lastSaved: null,
    lastPublished: null,
  },

  // Editing state
  ...createEditingState(),

  // User interactions
  wishlist: [],
  recentlyViewed: [],

  // Filters and pagination
  filters: createFilterState({
    category: null,
    priceRange: [0, 1000],
    availability: 'all',
  }),
  pagination: createPaginationState(),

  // Loading states
  loading: false,
  saving: false,
  publishing: false,
  error: null,
  success: false,

  // Analytics and orders
  analytics: null,
  orders: [],
  enquiries: [],
};

const ecommerceManagementSlice = createSlice({
  name: 'ecommerceManagement',
  initialState,
  reducers: {
    // Standard reducers
    ...createEntityReducers(),
    ...createEditingReducers(),
    ...createFilterReducers(),
    ...createPaginationReducers(),

    // Core data management
    setVendor: (state, action) => {
      state.vendor = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },

    selectProduct: (state, action) => {
      const id = action.payload;
      state.selectedProduct = state.products.find(p => p.id === id) || null;
    },

    // Product management
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.products.push(newProduct);
      state.hasChanges = true;
    },

    updateProduct: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.products.findIndex(p => p.id === id);

      if (index !== -1) {
        state.products[index] = {
          ...state.products[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        state.hasChanges = true;
      }
    },

    deleteProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter(p => p.id !== id);
      state.hasChanges = true;
    },

    // Category management
    addCategory: (state, action) => {
      const newCategory = {
        ...action.payload,
        id: Date.now(),
      };
      state.categories.push(newCategory);
      state.hasChanges = true;
    },

    updateCategory: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.categories.findIndex(c => c.id === id);

      if (index !== -1) {
        state.categories[index] = { ...state.categories[index], ...updates };
        state.hasChanges = true;
      }
    },

    deleteCategory: (state, action) => {
      const id = action.payload;
      state.categories = state.categories.filter(c => c.id !== id);
      state.hasChanges = true;
    },

    // Vendor management
    updateVendorInfo: (state, action) => {
      if (state.vendor) {
        state.vendor = { ...state.vendor, ...action.payload };
        state.hasChanges = true;
      }
    },

    // Page content management
    updatePageSection: (state, action) => {
      const { sectionId, updates } = action.payload;
      const sectionIndex = state.pageContent.sections.findIndex(s => s.id === sectionId);

      if (sectionIndex !== -1) {
        state.pageContent.sections[sectionIndex] = {
          ...state.pageContent.sections[sectionIndex],
          ...updates,
        };
        state.hasChanges = true;
      }
    },

    updateSectionContent: (state, action) => {
      const { sectionId, contentUpdates } = action.payload;
      const sectionIndex = state.pageContent.sections.findIndex(s => s.id === sectionId);

      if (sectionIndex !== -1) {
        if (!state.pageContent.sections[sectionIndex].content) {
          state.pageContent.sections[sectionIndex].content = {};
        }
        
        Object.assign(state.pageContent.sections[sectionIndex].content, contentUpdates);
        Object.assign(state.pageContent.sections[sectionIndex], contentUpdates);
        
        state.hasChanges = true;
      }
    },

    toggleSectionVisibility: (state, action) => {
      const { sectionId, visible } = action.payload;
      const sectionIndex = state.pageContent.sections.findIndex(s => s.id === sectionId);

      if (sectionIndex !== -1) {
        state.pageContent.sections[sectionIndex].visible = visible;
        state.hasChanges = true;
      }
    },

    reorderSections: (state, action) => {
      state.pageContent.sections = action.payload;
      state.hasChanges = true;
    },

    addCustomSection: (state, action) => {
      const newSection = action.payload;

      // Insert before footer or at the end
      const footerIndex = state.pageContent.sections.findIndex(s => s.id === 'footer');
      
      if (footerIndex !== -1) {
        state.pageContent.sections.splice(footerIndex, 0, newSection);
        // Update orders
        state.pageContent.sections.forEach((section, index) => {
          section.order = index + 1;
        });
      } else {
        state.pageContent.sections.push(newSection);
      }

      state.hasChanges = true;
    },

    removeCustomSection: (state, action) => {
      const sectionId = action.payload;
      state.pageContent.sections = state.pageContent.sections.filter(s => s.id !== sectionId);
      
      // Update orders
      state.pageContent.sections.forEach((section, index) => {
        section.order = index + 1;
      });
      
      state.hasChanges = true;
    },

    // Recently viewed
    addToRecentlyViewed: (state, action) => {
      const productId = action.payload;
      
      // Remove if already exists
      state.recentlyViewed = state.recentlyViewed.filter(id => id !== productId);
      
      // Add to beginning
      state.recentlyViewed.unshift(productId);
      
      // Keep only last 10
      state.recentlyViewed = state.recentlyViewed.slice(0, 10);
    },

    // Wishlist management
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      const index = state.wishlist.indexOf(productId);
      
      if (index === -1) {
        state.wishlist.push(productId);
      } else {
        state.wishlist.splice(index, 1);
      }
    },

    // Orders and enquiries
    addOrder: (state, action) => {
      const order = {
        id: `order_${Date.now()}`,
        ...action.payload,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      state.orders.unshift(order);
    },

    addEnquiry: (state, action) => {
      const enquiry = {
        id: `enquiry_${Date.now()}`,
        ...action.payload,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };
      state.enquiries.unshift(enquiry);
    },

    // Reset changes
    discardChanges: (state) => {
      state.hasChanges = false;
    },

    // Reset state
    resetState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // Fetch ecommerce data
      .addCase(fetchEcommerceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEcommerceData.fulfilled, (state, action) => {
        const data = action.payload;
        state.loading = false;
        state.vendor = data.vendor;
        state.categories = data.categories || [];
        state.products = data.products || [];
        state.pageContent = data.pageContent || { sections: [] };
        state.analytics = data.analytics;
        state.orders = data.orders || [];
        state.enquiries = data.enquiries || [];
        state.wishlist = data.wishlist || [];
        state.recentlyViewed = data.recentlyViewed || [];
        state.filters = { ...state.filters, ...data.filters };
        state.pagination = { ...state.pagination, ...data.pagination };
        state.hasChanges = data.hasChanges || false;
        state.error = null;
        state.success = true;
      })
      .addCase(fetchEcommerceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Save ecommerce data
      .addCase(saveEcommerceData.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(saveEcommerceData.fulfilled, (state, action) => {
        state.saving = false;
        state.hasChanges = false;
        state.success = true;
        if (action.payload.lastSaved) {
          state.pageContent.lastSaved = action.payload.lastSaved;
        }
      })
      .addCase(saveEcommerceData.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // Publish changes
      .addCase(publishChanges.pending, (state) => {
        state.publishing = true;
        state.error = null;
      })
      .addCase(publishChanges.fulfilled, (state, action) => {
        state.publishing = false;
        state.pageContent.lastPublished = action.payload.lastPublished;
        state.success = true;
      })
      .addCase(publishChanges.rejected, (state, action) => {
        state.publishing = false;
        state.error = action.payload;
      })

      // Wishlist operations
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const productId = action.payload;
        if (!state.wishlist.includes(productId)) {
          state.wishlist.push(productId);
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        const productId = action.payload;
        state.wishlist = state.wishlist.filter(id => id !== productId);
      });
  },
});

// Export actions
export const {
  // Standard actions
  setLoading,
  setError,
  clearError,
  setSuccess,
  setSearchQuery,
  setSortBy,
  setFilters,
  clearFilters,
  setPage,
  setItemsPerPage,

  // Core data actions
  setVendor,
  setCategories,
  setProducts,
  selectProduct,

  // Product actions
  addProduct,
  updateProduct,
  deleteProduct,

  // Category actions
  addCategory,
  updateCategory,
  deleteCategory,

  // Vendor actions
  updateVendorInfo,

  // Page content actions
  updatePageSection,
  updateSectionContent,
  toggleSectionVisibility,
  reorderSections,
  addCustomSection,
  removeCustomSection,

  // User interaction actions
  addToRecentlyViewed,
  toggleWishlist,
  addOrder,
  addEnquiry,

  // Utility actions
  discardChanges,
  resetState,
} = ecommerceManagementSlice.actions;

// Legacy action aliases for backward compatibility
export const updateSectionVisibility = toggleSectionVisibility;
export const updatePageSections = reorderSections;
export const publishPageContent = publishChanges;

// Selectors
export const selectVendor = (state) => state.ecommerceManagement.vendor;
export const selectCategories = (state) => state.ecommerceManagement.categories;
export const selectProducts = (state) => state.ecommerceManagement.products;
export const selectSelectedProduct = (state) => state.ecommerceManagement.selectedProduct;
export const selectPageSections = (state) => state.ecommerceManagement.pageContent.sections;
export const selectLoading = (state) => state.ecommerceManagement.loading;
export const selectSaving = (state) => state.ecommerceManagement.saving;
export const selectPublishing = (state) => state.ecommerceManagement.publishing;
export const selectError = (state) => state.ecommerceManagement.error;
export const selectHasChanges = (state) => state.ecommerceManagement.hasChanges;
export const selectWishlist = (state) => state.ecommerceManagement.wishlist;
export const selectRecentlyViewed = (state) => state.ecommerceManagement.recentlyViewed;
export const selectFilters = (state) => state.ecommerceManagement.filters;
export const selectPagination = (state) => state.ecommerceManagement.pagination;
export const selectAnalytics = (state) => state.ecommerceManagement.analytics;
export const selectOrders = (state) => state.ecommerceManagement.orders;
export const selectEnquiries = (state) => state.ecommerceManagement.enquiries;

// Legacy selectors for backward compatibility
export const selectHasUnsavedChanges = selectHasChanges;
export const selectIsDataPersisted = (state) => !state.ecommerceManagement.hasChanges;
export const selectSectionById = (sectionId) => (state) =>
  state.ecommerceManagement.pageContent.sections.find(s => s.id === sectionId);

// Complex selectors
export const selectFeaturedProducts = (state) =>
  state.ecommerceManagement.products.filter(product => product.featured);

export const selectOnSaleProducts = (state) =>
  state.ecommerceManagement.products.filter(product => product.pricing?.onSale);

export const selectProductsByCategory = (categorySlug) => (state) =>
  state.ecommerceManagement.products.filter(product => product.category === categorySlug);

export const selectProductById = (productId) => (state) =>
  state.ecommerceManagement.products.find(product => product.id === productId);

export const selectIsInWishlist = (productId) => (state) =>
  state.ecommerceManagement.wishlist.includes(productId);

export const selectFilteredProducts = (state) => {
  const { products, filters } = state.ecommerceManagement;
  let filtered = [...products];

  // Apply category filter
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }

  // Apply price filter
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(product => {
      const price = product.pricing?.price || 0;
      return price >= min && price <= max;
    });
  }

  // Apply availability filter
  if (filters.availability && filters.availability !== 'all') {
    filtered = filtered.filter(product => product.availability?.status === filters.availability);
  }

  // Apply search
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(product =>
      product.name?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply sorting
  switch (filters.sortBy) {
    case 'price_low':
      filtered.sort((a, b) => (a.pricing?.price || 0) - (b.pricing?.price || 0));
      break;
    case 'price_high':
      filtered.sort((a, b) => (b.pricing?.price || 0) - (a.pricing?.price || 0));
      break;
    case 'rating':
      filtered.sort((a, b) => (b.reviews?.rating || 0) - (a.reviews?.rating || 0));
      break;
    case 'newest':
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
      break;
  }

  return filtered;
};

export default ecommerceManagementSlice.reducer;
