import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching automobile data
export const fetchAutomobileData = createAsyncThunk(
  'automobile/fetchAutomobileData',
  async (vendorSlug, { rejectWithValue }) => {
    try {
      // Simulate API call - in real app, this would be an actual API call
      const response = await import('../../DummyData/automobiles.json');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      return response.default;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for fetching vehicle details
export const fetchVehicleDetails = createAsyncThunk(
  'automobile/fetchVehicleDetails',
  async ({ vehicleId, vendorSlug }, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const { vehicles } = state.automobileManagement;
      
      // Find vehicle in existing data or fetch from API
      let vehicle = vehicles.find(v => v.id === parseInt(vehicleId));
      
      if (!vehicle) {
        // Simulate API call for specific vehicle
        const response = await import('../../DummyData/automobiles.json');
        const data = response.default;
        vehicle = data.data.vehicles.find(v => v.id === parseInt(vehicleId));
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

// Async thunk for adding vehicle to wishlist
export const addToWishlist = createAsyncThunk(
  'automobile/addToWishlist',
  async (vehicleId, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return vehicleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for removing from wishlist
export const removeFromWishlist = createAsyncThunk(
  'automobile/removeFromWishlist',
  async (vehicleId, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return vehicleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for submitting enquiry
export const submitEnquiry = createAsyncThunk(
  'automobile/submitEnquiry',
  async (enquiryData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const enquiry = {
        id: `enquiry_${Date.now()}`,
        ...enquiryData,
        status: 'pending',
        submittedAt: new Date().toISOString()
      };
      
      return enquiry;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  // Data state
  vendor: null,
  categories: [],
  vehicles: [],
  selectedVehicle: null,
  promotions: [],
  customerReviews: [],
  financing: null,
  
  // UI state
  loading: false,
  vehicleLoading: false,
  error: null,
  
  // Filters and search
  filters: {
    category: null,
    priceRange: { min: 0, max: 500000 },
    make: null,
    year: null,
    condition: null,
    sortBy: 'featured',
    sortOrder: 'desc'
  },
  searchQuery: '',
  
  // User interactions
  wishlist: [],
  enquiries: [],
  recentlyViewed: [],
  
  // Pagination
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 12
  },
  
  // Meta data
  meta: {
    availableFilters: {
      categories: [],
      makes: [],
      years: [],
      conditions: [],
      priceRange: { min: 0, max: 500000 }
    }
  }
};

const automobileManagementSlice = createSlice({
  name: 'automobileManagement',
  initialState,
  reducers: {
    // Filter actions
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        priceRange: { min: 0, max: 500000 },
        make: null,
        year: null,
        condition: null,
        sortBy: 'featured',
        sortOrder: 'desc'
      };
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    
    // Pagination actions
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset to first page
    },
    
    // Vehicle actions
    setSelectedVehicle: (state, action) => {
      state.selectedVehicle = action.payload;
    },
    clearSelectedVehicle: (state) => {
      state.selectedVehicle = null;
    },
    addToRecentlyViewed: (state, action) => {
      const vehicleId = action.payload;
      // Remove if already exists
      state.recentlyViewed = state.recentlyViewed.filter(id => id !== vehicleId);
      // Add to beginning
      state.recentlyViewed.unshift(vehicleId);
      // Keep only last 10
      state.recentlyViewed = state.recentlyViewed.slice(0, 10);
    },
    
    // Error handling
    clearError: (state) => {
      state.error = null;
    },
    
    // Reset state
    resetAutomobileState: (state) => {
      return initialState;
    }
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
        const { data, meta } = action.payload;
        
        state.vendor = data.vendor;
        state.categories = data.categories;
        state.vehicles = data.vehicles;
        state.promotions = data.promotions;
        state.customerReviews = data.customerReviews;
        state.financing = data.financing;
        
        // Update pagination
        state.pagination = {
          ...state.pagination,
          ...meta.pagination
        };
        
        // Update meta filters
        state.meta.availableFilters = {
          categories: meta.filters.availableCategories,
          makes: meta.filters.availableMakes,
          years: meta.filters.availableYears,
          conditions: meta.filters.availableConditions,
          priceRange: meta.filters.priceRange
        };
      })
      .addCase(fetchAutomobileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch automobile data';
      })
      
      // Fetch vehicle details
      .addCase(fetchVehicleDetails.pending, (state) => {
        state.vehicleLoading = true;
        state.error = null;
      })
      .addCase(fetchVehicleDetails.fulfilled, (state, action) => {
        state.vehicleLoading = false;
        state.selectedVehicle = action.payload;
      })
      .addCase(fetchVehicleDetails.rejected, (state, action) => {
        state.vehicleLoading = false;
        state.error = action.payload || 'Failed to fetch vehicle details';
      })
      
      // Add to wishlist
      .addCase(addToWishlist.fulfilled, (state, action) => {
        const vehicleId = action.payload;
        if (!state.wishlist.includes(vehicleId)) {
          state.wishlist.push(vehicleId);
        }
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.error = action.payload || 'Failed to add to wishlist';
      })
      
      // Remove from wishlist
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        const vehicleId = action.payload;
        state.wishlist = state.wishlist.filter(id => id !== vehicleId);
      })
      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.error = action.payload || 'Failed to remove from wishlist';
      })
      
      // Submit enquiry
      .addCase(submitEnquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitEnquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.enquiries.unshift(action.payload);
      })
      .addCase(submitEnquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to submit enquiry';
      });
  }
});

// Export actions
export const {
  setFilters,
  clearFilters,
  setSearchQuery,
  setCurrentPage,
  setItemsPerPage,
  setSelectedVehicle,
  clearSelectedVehicle,
  addToRecentlyViewed,
  clearError,
  resetAutomobileState
} = automobileManagementSlice.actions;

// Selectors
export const selectAutomobileData = (state) => state.automobileManagement;
export const selectVendor = (state) => state.automobileManagement.vendor;
export const selectCategories = (state) => state.automobileManagement.categories;
export const selectVehicles = (state) => state.automobileManagement.vehicles;
export const selectSelectedVehicle = (state) => state.automobileManagement.selectedVehicle;
export const selectPromotions = (state) => state.automobileManagement.promotions;
export const selectCustomerReviews = (state) => state.automobileManagement.customerReviews;
export const selectFinancing = (state) => state.automobileManagement.financing;
export const selectLoading = (state) => state.automobileManagement.loading;
export const selectVehicleLoading = (state) => state.automobileManagement.vehicleLoading;
export const selectError = (state) => state.automobileManagement.error;
export const selectFilters = (state) => state.automobileManagement.filters;
export const selectSearchQuery = (state) => state.automobileManagement.searchQuery;
export const selectWishlist = (state) => state.automobileManagement.wishlist;
export const selectEnquiries = (state) => state.automobileManagement.enquiries;
export const selectRecentlyViewed = (state) => state.automobileManagement.recentlyViewed;
export const selectPagination = (state) => state.automobileManagement.pagination;
export const selectAvailableFilters = (state) => state.automobileManagement.meta.availableFilters;

// Complex selectors
export const selectFilteredVehicles = (state) => {
  const { vehicles, filters, searchQuery } = state.automobileManagement;
  let filtered = [...vehicles];
  
  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(vehicle => 
      vehicle.name.toLowerCase().includes(query) ||
      vehicle.make.toLowerCase().includes(query) ||
      vehicle.model.toLowerCase().includes(query) ||
      vehicle.description.toLowerCase().includes(query)
    );
  }
  
  // Apply category filter
  if (filters.category) {
    filtered = filtered.filter(vehicle => vehicle.category.slug === filters.category);
  }
  
  // Apply make filter
  if (filters.make) {
    filtered = filtered.filter(vehicle => vehicle.make === filters.make);
  }
  
  // Apply year filter
  if (filters.year) {
    filtered = filtered.filter(vehicle => vehicle.year === filters.year);
  }
  
  // Apply condition filter
  if (filters.condition) {
    filtered = filtered.filter(vehicle => vehicle.condition === filters.condition);
  }
  
  // Apply price range filter
  if (filters.priceRange) {
    filtered = filtered.filter(vehicle => 
      vehicle.pricing.price >= filters.priceRange.min && 
      vehicle.pricing.price <= filters.priceRange.max
    );
  }
  
  // Apply sorting
  filtered.sort((a, b) => {
    let aValue, bValue;
    
    switch (filters.sortBy) {
      case 'price':
        aValue = a.pricing.price;
        bValue = b.pricing.price;
        break;
      case 'year':
        aValue = a.year;
        bValue = b.year;
        break;
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'rating':
        aValue = a.reviews.rating;
        bValue = b.reviews.rating;
        break;
      case 'featured':
      default:
        aValue = a.featured ? 1 : 0;
        bValue = b.featured ? 1 : 0;
        if (aValue === bValue) {
          aValue = a.pricing.price;
          bValue = b.pricing.price;
        }
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

export const selectFeaturedVehicles = (state) => {
  return state.automobileManagement.vehicles.filter(vehicle => vehicle.featured);
};

export const selectOnSaleVehicles = (state) => {
  return state.automobileManagement.vehicles.filter(vehicle => vehicle.pricing.onSale);
};

export const selectWishlistVehicles = (state) => {
  const { vehicles, wishlist } = state.automobileManagement;
  return vehicles.filter(vehicle => wishlist.includes(vehicle.id));
};

export const selectRecentlyViewedVehicles = (state) => {
  const { vehicles, recentlyViewed } = state.automobileManagement;
  return recentlyViewed.map(id => vehicles.find(vehicle => vehicle.id === id)).filter(Boolean);
};

export const selectVehiclesByCategory = (categorySlug) => (state) => {
  return state.automobileManagement.vehicles.filter(vehicle => vehicle.category.slug === categorySlug);
};

export const selectVehicleById = (vehicleId) => (state) => {
  return state.automobileManagement.vehicles.find(vehicle => vehicle.id === parseInt(vehicleId));
};

export const selectIsInWishlist = (vehicleId) => (state) => {
  return state.automobileManagement.wishlist.includes(parseInt(vehicleId));
};

export default automobileManagementSlice.reducer;
