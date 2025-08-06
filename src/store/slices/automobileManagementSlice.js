import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
export const fetchAutomobileData = createAsyncThunk(
  'automobile/fetchData',
  async ({ vendorSlug, forceRefresh = false }, { getState, rejectWithValue }) => {
    try {
      const state = getState().automobileManagement;

      // Return cached data if available and not forcing refresh
      if (state.vendor?.slug === vendorSlug && !forceRefresh) {
        return state;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await import('../../DummyData/automobiles.json');
      return response.default;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchVehicleDetails = createAsyncThunk(
  'automobile/fetchVehicleDetails',
  async ({ vehicleId }, { getState, rejectWithValue }) => {
    try {
      const state = getState().automobileManagement;
      
      // Find vehicle in existing data
      let vehicle = state.vehicles.find(v => v.id === parseInt(vehicleId));
      
      if (!vehicle) {
        // Fetch from API if not found
        const response = await import('../../DummyData/automobiles.json');
        const data = response.default;
        const vehicleData = data.data.allVehicles || data.data.vehicles || [];
        vehicle = vehicleData.find(v => v.id === parseInt(vehicleId));
      }

      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      return vehicle;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveVehicleData = createAsyncThunk(
  'automobile/saveData',
  async (data, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Data saved to API:', data);
      return { success: true, message: 'Data saved successfully' };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  'automobile/addToWishlist',
  async (vehicleId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return vehicleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlist = createAsyncThunk(
  'automobile/removeFromWishlist',
  async (vehicleId, { rejectWithValue }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      return vehicleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Initial state
const initialState = {
  // Core data
  vendor: null,
  categories: [],
  vehicles: [],
  selectedVehicle: null,
  promotions: [],
  customerReviews: [],
  financing: null,

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
  enquiries: [],

  // Filters and pagination
  filters: createFilterState({
    category: null,
    priceRange: { min: 0, max: 500000 },
    make: null,
    year: null,
    condition: null,
  }),
  pagination: createPaginationState(),

  // Loading and error states
  loading: false,
  vehicleLoading: false,
  saving: false,
  error: null,
  success: false,
};

const automobileManagementSlice = createSlice({
  name: 'automobileManagement',
  initialState,
  reducers: {
    // Use standard reducers from utilities
    ...createEntityReducers(),
    ...createEditingReducers(),
    ...createFilterReducers(),
    ...createPaginationReducers(),

    // Vehicle management
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
    },

    addVehicle: (state, action) => {
      const newVehicle = {
        ...action.payload,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.vehicles.push(newVehicle);
    },

    updateVehicle: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.vehicles.findIndex(v => v.id === id);
      if (index !== -1) {
        state.vehicles[index] = {
          ...state.vehicles[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    deleteVehicle: (state, action) => {
      const id = action.payload;
      state.vehicles = state.vehicles.filter(v => v.id !== id);
    },

    // Category management
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    addCategory: (state, action) => {
      const newCategory = {
        ...action.payload,
        id: Date.now(),
      };
      state.categories.push(newCategory);
    },

    updateCategory: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.categories.findIndex(c => c.id === id);
      if (index !== -1) {
        state.categories[index] = { ...state.categories[index], ...updates };
      }
    },

    deleteCategory: (state, action) => {
      const id = action.payload;
      state.categories = state.categories.filter(c => c.id !== id);
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

    reorderSections: (state, action) => {
      state.pageContent.sections = action.payload;
      state.hasChanges = true;
    },

    publishChanges: (state) => {
      state.pageContent.lastPublished = new Date().toISOString();
      state.hasChanges = false;
    },

    // Wishlist management
    toggleWishlist: (state, action) => {
      const vehicleId = action.payload;
      const index = state.wishlist.indexOf(vehicleId);
      
      if (index === -1) {
        state.wishlist.push(vehicleId);
      } else {
        state.wishlist.splice(index, 1);
      }
    },

    // Recently viewed
    addToRecentlyViewed: (state, action) => {
      const vehicleId = action.payload;
      
      // Remove if already exists
      state.recentlyViewed = state.recentlyViewed.filter(id => id !== vehicleId);
      
      // Add to beginning
      state.recentlyViewed.unshift(vehicleId);
      
      // Keep only last 10
      state.recentlyViewed = state.recentlyViewed.slice(0, 10);
    },

    // Enquiries
    addEnquiry: (state, action) => {
      const enquiry = {
        id: `enquiry_${Date.now()}`,
        ...action.payload,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      };
      state.enquiries.unshift(enquiry);
    },

    // Reset state
    resetState: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // Fetch automobile data
      .addCase(fetchAutomobileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAutomobileData.fulfilled, (state, action) => {
        state.loading = false;
        const data = action.payload.data || action.payload;
        
        state.vendor = data.vendor;
        state.categories = data.allCategories || data.categories || [];
        state.vehicles = data.allVehicles || data.vehicles || [];
        state.promotions = data.promotions || [];
        state.customerReviews = data.customerReviews || [];
        state.financing = data.financing;
        state.pageContent.sections = data.pageSections || [];
        
        state.error = null;
        state.success = true;
      })
      .addCase(fetchAutomobileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Fetch vehicle details
      .addCase(fetchVehicleDetails.pending, (state) => {
        state.vehicleLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicleDetails.fulfilled, (state, action) => {
        state.vehicleLoading = false;
        state.selectedVehicle = action.payload;
        state.error = null;
      })
      .addCase(fetchVehicleDetails.rejected, (state, action) => {
        state.vehicleLoading = false;
        state.error = action.payload;
      })

      // Save data
      .addCase(saveVehicleData.pending, (state) => {
        state.saving = true;
        state.error = null;
      })
      .addCase(saveVehicleData.fulfilled, (state) => {
        state.saving = false;
        state.hasChanges = false;
        state.success = true;
        state.pageContent.lastSaved = new Date().toISOString();
      })
      .addCase(saveVehicleData.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })

      // Wishlist operations
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const vehicleId = action.payload;
        if (!state.wishlist.includes(vehicleId)) {
          state.wishlist.push(vehicleId);
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        const vehicleId = action.payload;
        state.wishlist = state.wishlist.filter(id => id !== vehicleId);
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
  startEditing,
  updateField,
  saveChanges,
  discardChanges,
  clearEditing,
  setSearchQuery,
  setSortBy,
  setSortOrder,
  setFilters,
  clearFilters,
  setPage,
  setItemsPerPage,
  
  // Vehicle actions
  setVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  
  // Category actions
  setCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  
  // Page content actions
  updatePageSection,
  reorderSections,
  publishChanges,
  
  // User interaction actions
  toggleWishlist,
  addToRecentlyViewed,
  addEnquiry,
  
  // Utility actions
  resetState,

  // Legacy action aliases for backward compatibility
  updateSectionContent: updatePageSection,
  updatePageSections: reorderSections,
  publishPageContent: publishChanges,
  addCustomSection: addPageSection,
  removeCustomSection: removePageSection,
  updateSectionVisibility: toggleSectionVisibility,
  discardTempChanges: discardChanges,
  saveAndPublishChanges: publishChanges,
  saveCompleteData: saveVehicleData,
} = automobileManagementSlice.actions;

// Add missing actions that were in the old slice
export const addPageSection = (sectionData) => (dispatch) => {
  dispatch(updatePageSection({ sectionId: sectionData.id, updates: sectionData }));
};

export const removePageSection = (sectionId) => (dispatch) => {
  dispatch(updatePageSection({ sectionId, updates: { visible: false } }));
};

export const toggleSectionVisibility = (sectionId, visible) => (dispatch) => {
  dispatch(updatePageSection({ sectionId, updates: { visible } }));
};

// Selectors
export const selectAutomobileData = (state) => state.automobileManagement;
export const selectVendor = (state) => state.automobileManagement.vendor;
export const selectCategories = (state) => state.automobileManagement.categories;
export const selectVehicles = (state) => state.automobileManagement.vehicles;
export const selectSelectedVehicle = (state) => state.automobileManagement.selectedVehicle;
export const selectPageSections = (state) => state.automobileManagement.pageContent.sections;
export const selectLoading = (state) => state.automobileManagement.loading;
export const selectError = (state) => state.automobileManagement.error;
export const selectFilters = (state) => state.automobileManagement.filters;
export const selectWishlist = (state) => state.automobileManagement.wishlist;
export const selectRecentlyViewed = (state) => state.automobileManagement.recentlyViewed;
export const selectEnquiries = (state) => state.automobileManagement.enquiries;

// Complex selectors
export const selectFeaturedVehicles = (state) =>
  state.automobileManagement.vehicles.filter(vehicle => vehicle.featured);

export const selectOnSaleVehicles = (state) =>
  state.automobileManagement.vehicles.filter(vehicle => vehicle.pricing?.onSale);

export const selectVehiclesByCategory = (categorySlug) => (state) =>
  state.automobileManagement.vehicles.filter(vehicle => vehicle.category?.slug === categorySlug);

export const selectVehicleById = (vehicleId) => (state) =>
  state.automobileManagement.vehicles.find(vehicle => vehicle.id === parseInt(vehicleId));

export const selectIsInWishlist = (vehicleId) => (state) =>
  state.automobileManagement.wishlist.includes(parseInt(vehicleId));

export const selectFilteredVehicles = (state) => {
  const { vehicles, filters } = state.automobileManagement;
  let filtered = [...vehicles];

  // Apply filters
  if (filters.category) {
    filtered = filtered.filter(vehicle => vehicle.category?.slug === filters.category);
  }

  if (filters.make) {
    filtered = filtered.filter(vehicle => vehicle.make === filters.make);
  }

  if (filters.year) {
    filtered = filtered.filter(vehicle => vehicle.year === filters.year);
  }

  if (filters.condition) {
    filtered = filtered.filter(vehicle => vehicle.condition === filters.condition);
  }

  if (filters.priceRange) {
    filtered = filtered.filter(vehicle => {
      const price = vehicle.pricing?.price || 0;
      return price >= filters.priceRange.min && price <= filters.priceRange.max;
    });
  }

  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(vehicle =>
      vehicle.name?.toLowerCase().includes(query) ||
      vehicle.make?.toLowerCase().includes(query) ||
      vehicle.model?.toLowerCase().includes(query) ||
      vehicle.description?.toLowerCase().includes(query)
    );
  }

  // Apply sorting
  filtered.sort((a, b) => {
    let aValue, bValue;

    switch (filters.sortBy) {
      case 'price':
        aValue = a.pricing?.price || 0;
        bValue = b.pricing?.price || 0;
        break;
      case 'year':
        aValue = a.year;
        bValue = b.year;
        break;
      case 'name':
        aValue = a.name?.toLowerCase() || '';
        bValue = b.name?.toLowerCase() || '';
        break;
      case 'rating':
        aValue = a.reviews?.rating || 0;
        bValue = b.reviews?.rating || 0;
        break;
      default:
        aValue = a.featured ? 1 : 0;
        bValue = b.featured ? 1 : 0;
        break;
    }

    if (filters.sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return filtered;
};

export default automobileManagementSlice.reducer;
