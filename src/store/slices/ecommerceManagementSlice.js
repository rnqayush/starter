import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ecommerceData from '../../DummyData/ecommerce.json';
import { ecommerceAPI } from '../../utils/ecommerceAPI';

// Async thunks for API operations
export const fetchEcommerceData = createAsyncThunk(
  'ecommerceManagement/fetchData',
  async ({ vendorSlug, forceRefresh = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState().ecommerceManagement;
      
      // If we already have data for this vendor and not forcing refresh, return current data
      if (state.vendor?.slug === vendorSlug && !forceRefresh) {
        return state;
      }

      // For demo purposes, simulate API call with static data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, this would fetch from API
      // const response = await ecommerceAPI.getVendorData(vendorSlug);
      
      return ecommerceData;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch ecommerce data');
    }
  }
);

export const saveEcommerceData = createAsyncThunk(
  'ecommerceManagement/saveData',
  async (dataToSave, { getState, rejectWithValue }) => {
    try {
      const state = getState().ecommerceManagement;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would save to API
      // const response = await ecommerceAPI.saveVendorData(state.vendor.slug, dataToSave);
      
      return {
        ...dataToSave,
        lastSaved: new Date().toISOString(),
        isDataPersisted: true
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to save ecommerce data');
    }
  }
);

export const publishChanges = createAsyncThunk(
  'ecommerceManagement/publishChanges',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState().ecommerceManagement;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, this would publish to API
      // const response = await ecommerceAPI.publishChanges(state.vendor.slug);
      
      return {
        lastPublished: new Date().toISOString(),
        isDataPersisted: true
      };
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to publish changes');
    }
  }
);

// Wishlist operations
export const addToWishlist = createAsyncThunk(
  'ecommerceManagement/addToWishlist',
  async (productId, { getState, rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      return productId;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to add to wishlist');
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'ecommerceManagement/removeFromWishlist',
  async (productId, { getState, rejectWithValue }) => {
    try {
      // Simulate API call
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
  
  // Page content management
  pageContent: {
    sections: [],
    lastSaved: null,
    lastPublished: null
  },
  
  // Temporary changes tracking
  tempChanges: {},
  hasUnsavedChanges: false,
  isDataPersisted: true,
  
  // User interactions
  wishlist: [],
  recentlyViewed: [],
  
  // UI state
  filters: {
    category: null,
    priceRange: [0, 1000],
    availability: 'all',
    sortBy: 'featured'
  },
  pagination: {
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
    totalPages: 0
  },
  
  // API state
  loading: false,
  error: null,
  saving: false,
  publishing: false,
  
  // Analytics
  analytics: null,
  orders: [],
  enquiries: []
};

const ecommerceManagementSlice = createSlice({
  name: 'ecommerceManagement',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Section management
    updateSection: (state, action) => {
      const { sectionId, updates } = action.payload;
      const sectionIndex = state.pageContent.sections.findIndex(s => s.id === sectionId);
      
      if (sectionIndex !== -1) {
        // Update the section
        Object.assign(state.pageContent.sections[sectionIndex], updates);
        
        // Track changes
        if (!state.tempChanges.sections) {
          state.tempChanges.sections = {};
        }
        state.tempChanges.sections[sectionId] = updates;
        state.hasUnsavedChanges = true;
        state.isDataPersisted = false;
      }
    },

    updateSectionContent: (state, action) => {
      const { sectionId, contentUpdates } = action.payload;
      const sectionIndex = state.pageContent.sections.findIndex(s => s.id === sectionId);
      
      if (sectionIndex !== -1) {
        // Update the section content
        if (!state.pageContent.sections[sectionIndex].content) {
          state.pageContent.sections[sectionIndex].content = {};
        }
        Object.assign(state.pageContent.sections[sectionIndex].content, contentUpdates);
        
        // Also update root level properties for backward compatibility
        Object.assign(state.pageContent.sections[sectionIndex], contentUpdates);
        
        // Track changes
        if (!state.tempChanges.sections) {
          state.tempChanges.sections = {};
        }
        if (!state.tempChanges.sections[sectionId]) {
          state.tempChanges.sections[sectionId] = {};
        }
        Object.assign(state.tempChanges.sections[sectionId], contentUpdates);
        
        state.hasUnsavedChanges = true;
        state.isDataPersisted = false;
      }
    },

    toggleSectionVisibility: (state, action) => {
      const { sectionId, visible } = action.payload;
      const sectionIndex = state.pageContent.sections.findIndex(s => s.id === sectionId);
      
      if (sectionIndex !== -1) {
        state.pageContent.sections[sectionIndex].visible = visible;
        state.hasUnsavedChanges = true;
        state.isDataPersisted = false;
      }
    },

    reorderSections: (state, action) => {
      state.pageContent.sections = action.payload;
      state.hasUnsavedChanges = true;
      state.isDataPersisted = false;

      // Track the change
      state.tempChanges['sections.order'] = 'Section order changed';
    },

    // Product management
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(), // In real app, this would be handled by backend
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      state.products.push(newProduct);
      state.hasUnsavedChanges = true;
      state.isDataPersisted = false;
    },

    updateProduct: (state, action) => {
      const { productId, updates } = action.payload;
      const productIndex = state.products.findIndex(p => p.id === productId);
      
      if (productIndex !== -1) {
        state.products[productIndex] = {
          ...state.products[productIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        };
        state.hasUnsavedChanges = true;
        state.isDataPersisted = false;
      }
    },

    deleteProduct: (state, action) => {
      const productId = action.payload;
      state.products = state.products.filter(p => p.id !== productId);
      state.hasUnsavedChanges = true;
      state.isDataPersisted = false;
    },

    // Category management
    addCategory: (state, action) => {
      const newCategory = {
        ...action.payload,
        id: Date.now()
      };
      state.categories.push(newCategory);
      state.hasUnsavedChanges = true;
      state.isDataPersisted = false;
    },

    updateCategory: (state, action) => {
      const { categoryId, updates } = action.payload;
      const categoryIndex = state.categories.findIndex(c => c.id === categoryId);
      
      if (categoryIndex !== -1) {
        Object.assign(state.categories[categoryIndex], updates);
        state.hasUnsavedChanges = true;
        state.isDataPersisted = false;
      }
    },

    deleteCategory: (state, action) => {
      const categoryId = action.payload;
      state.categories = state.categories.filter(c => c.id !== categoryId);
      state.hasUnsavedChanges = true;
      state.isDataPersisted = false;
    },

    // Vendor management
    updateVendorInfo: (state, action) => {
      if (state.vendor) {
        Object.assign(state.vendor, action.payload);
        state.hasUnsavedChanges = true;
        state.isDataPersisted = false;
      }
    },

    // Filters and pagination
    setFilters: (state, action) => {
      Object.assign(state.filters, action.payload);
    },

    setPagination: (state, action) => {
      Object.assign(state.pagination, action.payload);
    },

    // Recently viewed
    addToRecentlyViewed: (state, action) => {
      const productId = action.payload;
      state.recentlyViewed = state.recentlyViewed.filter(id => id !== productId);
      state.recentlyViewed.unshift(productId);
      state.recentlyViewed = state.recentlyViewed.slice(0, 10); // Keep only last 10
    },

    // Section management
    updatePageSections: (state, action) => {
      state.pageContent.sections = action.payload;
      state.hasUnsavedChanges = true;
      state.isDataPersisted = false;
    },

    publishPageContent: (state, action) => {
      state.pageContent.sections = action.payload || state.pageContent.sections;
      state.pageContent.lastPublished = new Date().toISOString();
      state.hasUnsavedChanges = false;
      state.isDataPersisted = true;
    },

    updateSectionVisibility: (state, action) => {
      const { sectionId, visible } = action.payload;
      const section = state.pageContent.sections.find(s => s.id === sectionId);
      if (section) {
        section.visible = visible;
        state.hasUnsavedChanges = true;
        state.isDataPersisted = false;

        // Track the change
        const path = `sections.${sectionId}.visible`;
        state.tempChanges[path] = visible ? 'Section shown' : 'Section hidden';
      }
    },

    addCustomSection: (state, action) => {
      const newSection = action.payload;

      // Insert the section before footer or at the end
      const footerIndex = state.pageContent.sections.findIndex(
        s => s.id === 'footer'
      );
      if (footerIndex !== -1) {
        state.pageContent.sections.splice(footerIndex, 0, newSection);

        // Update orders to maintain proper sequence
        state.pageContent.sections.forEach((section, index) => {
          section.order = index + 1;
        });
      } else {
        state.pageContent.sections.push(newSection);
      }

      state.hasUnsavedChanges = true;
      state.isDataPersisted = false;

      // Track the change
      const path = `sections.${newSection.id}`;
      state.tempChanges[path] = 'Added custom section';
    },

    removeCustomSection: (state, action) => {
      const sectionId = action.payload;

      state.pageContent.sections = state.pageContent.sections.filter(
        section => section.id !== sectionId
      );

      // Update orders to maintain proper sequence
      state.pageContent.sections.forEach((section, index) => {
        section.order = index + 1;
      });

      state.hasUnsavedChanges = true;
      state.isDataPersisted = false;

      // Track the change
      const path = `sections.${sectionId}`;
      state.tempChanges[path] = 'Removed custom section';
    },

    // Reset changes
    discardChanges: (state) => {
      // This would need to restore from a backup or refetch data
      state.tempChanges = {};
      state.hasUnsavedChanges = false;
      state.isDataPersisted = true;
    }
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
        state.hasUnsavedChanges = data.hasUnsavedChanges || false;
        state.isDataPersisted = data.isDataPersisted !== false;
        state.tempChanges = data.tempChanges || {};
      })
      .addCase(fetchEcommerceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Save ecommerce data
      .addCase(saveEcommerceData.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(saveEcommerceData.fulfilled, (state, action) => {
        state.saving = false;
        state.hasUnsavedChanges = false;
        state.isDataPersisted = true;
        state.tempChanges = {};
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
  }
});

// Export actions
export const {
  clearError,
  updateSection,
  updateSectionContent,
  toggleSectionVisibility,
  reorderSections,
  updatePageSections,
  publishPageContent,
  updateSectionVisibility,
  addCustomSection,
  removeCustomSection,
  addProduct,
  updateProduct,
  deleteProduct,
  addCategory,
  updateCategory,
  deleteCategory,
  updateVendorInfo,
  setFilters,
  setPagination,
  addToRecentlyViewed,
  discardChanges
} = ecommerceManagementSlice.actions;

// Selectors
export const selectVendor = (state) => state.ecommerceManagement.vendor;
export const selectCategories = (state) => state.ecommerceManagement.categories;
export const selectProducts = (state) => state.ecommerceManagement.products;
export const selectPageSections = (state) => state.ecommerceManagement.pageContent.sections;
export const selectLoading = (state) => state.ecommerceManagement.loading;
export const selectError = (state) => state.ecommerceManagement.error;
export const selectSaving = (state) => state.ecommerceManagement.saving;
export const selectPublishing = (state) => state.ecommerceManagement.publishing;
export const selectHasUnsavedChanges = (state) => state.ecommerceManagement.hasUnsavedChanges;
export const selectIsDataPersisted = (state) => state.ecommerceManagement.isDataPersisted;
export const selectWishlist = (state) => state.ecommerceManagement.wishlist;
export const selectRecentlyViewed = (state) => state.ecommerceManagement.recentlyViewed;
export const selectFilters = (state) => state.ecommerceManagement.filters;
export const selectPagination = (state) => state.ecommerceManagement.pagination;
export const selectAnalytics = (state) => state.ecommerceManagement.analytics;
export const selectOrders = (state) => state.ecommerceManagement.orders;
export const selectEnquiries = (state) => state.ecommerceManagement.enquiries;

// Complex selectors
export const selectFeaturedProducts = (state) => 
  state.ecommerceManagement.products.filter(product => product.featured);

export const selectOnSaleProducts = (state) => 
  state.ecommerceManagement.products.filter(product => product.pricing?.onSale);

export const selectProductsByCategory = (categorySlug) => (state) =>
  state.ecommerceManagement.products.filter(product => product.category === categorySlug);

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
    filtered = filtered.filter(product => 
      product.availability?.status === filters.availability
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

export const selectSectionById = (sectionId) => (state) =>
  state.ecommerceManagement.pageContent.sections.find(section => section.id === sectionId);

export const selectSectionContent = (sectionId) => (state) => {
  const section = state.ecommerceManagement.pageContent.sections.find(s => s.id === sectionId);
  return section?.content || {};
};

// Export reducer
export default ecommerceManagementSlice.reducer;
