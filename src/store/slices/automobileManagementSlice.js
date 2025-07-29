import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching automobile data
export const fetchAutomobileData = createAsyncThunk(
  'automobile/fetchAutomobileData',
  async ({ vendorSlug, forceRefresh = false }, { rejectWithValue, getState }) => {
    try {
      const state = getState();

      // If data is already persisted and we're not forcing refresh, return current data
      if (state.automobileManagement.isDataPersisted && !forceRefresh &&
          state.automobileManagement.vendor?.slug === vendorSlug) {
        return {
          data: {
            vendor: state.automobileManagement.vendor,
            allCategories: state.automobileManagement.categories,
            allVehicles: state.automobileManagement.vehicles,
            promotions: state.automobileManagement.promotions,
            customerReviews: state.automobileManagement.customerReviews,
            financing: state.automobileManagement.financing,
            pageSections: state.automobileManagement.pageContent.sections,
          },
          meta: state.automobileManagement.meta || {}
        };
      }

      // TODO: Replace with actual API call using automobileAPI.getVendorBySlug(vendorSlug)
      // For now, use local JSON data
      const response = await import('../../DummyData/automobiles.json');

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      return response.default;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for saving complete dealer data to API
export const saveCompleteData = createAsyncThunk(
  'automobile/saveCompleteData',
  async ({ vendorSlug, data }, { rejectWithValue }) => {
    try {
      // TODO: Implement API call
      // const response = await automobileAPI.syncCompleteData(vendorSlug, data);

      // For now, simulate successful save
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Data saved to API:', data);

      return { success: true, message: 'Data saved successfully' };
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
        submittedAt: new Date().toISOString(),
      };

      return enquiry;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const defaultPageSections = [
  {
    id: 'hero',
    name: 'Hero Section',
    description: 'Main banner with dealer branding and call-to-action',
    type: 'default',
    visible: true,
    order: 1,
    content: {
      title: '',
      subtitle: '',
      backgroundImage: '',
      primaryButtonText: 'Browse Vehicles',
      secondaryButtonText: 'View Categories',
    },
  },
  {
    id: 'categories',
    name: 'Browse by Category',
    description: 'Display vehicle categories for easy browsing',
    type: 'default',
    visible: true,
    order: 2,
    content: {
      title: 'Browse by Category',
      subtitle:
        'Explore our diverse range of vehicles across different categories',
      visibleCategories: [],
    },
  },
  {
    id: 'featured',
    name: 'Featured Vehicles',
    description: 'Showcase handpicked vehicles from your inventory',
    type: 'default',
    visible: true,
    order: 3,
    content: {
      title: 'Featured Vehicles',
      subtitle: 'Handpicked vehicles that customers love the most',
      vehicleIds: [],
    },
  },
  {
    id: 'special-offers',
    name: 'Special Offers',
    description: 'Highlight vehicles with special pricing or promotions',
    type: 'default',
    visible: true,
    order: 4,
    content: {
      title: '🔥 Special Offers',
      subtitle: "Limited time deals you don't want to miss",
      vehicleIds: [],
    },
  },
  {
    id: 'footer',
    name: 'Footer',
    description: 'Contact information and dealership details',
    type: 'default',
    visible: true,
    order: 5,
    content: {},
  },
];

const initialState = {
  // Data state - single source of truth
  vendor: null,
  categories: [],
  vehicles: [],
  selectedVehicle: null,
  promotions: [],
  customerReviews: [],
  financing: null,

  // Page content management
  pageContent: {
    sections: [...defaultPageSections],
    lastPublished: null,
  },

  // Admin editing state
  tempChanges: {},
  hasUnsavedChanges: false,

  // Data persistence tracking
  isDataPersisted: false, // Track if current data has been saved
  lastSaveTimestamp: null,

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
    sortOrder: 'desc',
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
    itemsPerPage: 12,
  },

  // Meta data
  meta: {
    availableFilters: {
      categories: [],
      makes: [],
      years: [],
      conditions: [],
      priceRange: { min: 0, max: 500000 },
    },
  },
};

const automobileManagementSlice = createSlice({
  name: 'automobileManagement',
  initialState,
  reducers: {
    // Admin editing actions
    setTempChange: (state, action) => {
      const { path, value } = action.payload;
      state.tempChanges[path] = value;
      state.hasUnsavedChanges = true;
    },

    updatePageSectionContent: (state, action) => {
      const { sectionId, content } = action.payload;
      const sectionIndex = state.pageContent.sections.findIndex(
        s => s.id === sectionId
      );
      if (sectionIndex !== -1) {
        // Ensure content object exists (for backward compatibility)
        if (!state.pageContent.sections[sectionIndex].content) {
          state.pageContent.sections[sectionIndex].content = {};
        }

        // Apply changes directly to main state for real-time updates
        Object.entries(content).forEach(([key, value]) => {
          if (key === 'content') {
            // Handle nested content updates
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
              state.pageContent.sections[sectionIndex].content[nestedKey] = nestedValue;
            });
          } else {
            // Handle direct property updates (title, subtitle, etc.)
            state.pageContent.sections[sectionIndex][key] = value;
            // Also update content for backward compatibility
            if (!state.pageContent.sections[sectionIndex].content[key]) {
              state.pageContent.sections[sectionIndex].content[key] = value;
            }
          }
        });

        // Store in temp changes for tracking
        Object.entries(content).forEach(([key, value]) => {
          if (key === 'content') {
            Object.entries(value).forEach(([nestedKey, nestedValue]) => {
              const path = `pageContent.sections.${sectionIndex}.content.${nestedKey}`;
              state.tempChanges[path] = nestedValue;
            });
          } else {
            const path = `pageContent.sections.${sectionIndex}.${key}`;
            state.tempChanges[path] = value;
          }
        });
        state.hasUnsavedChanges = true;
      }
    },

    applyTempChanges: state => {
      // Apply all temp changes to the main state
      Object.entries(state.tempChanges).forEach(([path, value]) => {
        const pathArray = path.split('.');
        let target = state;

        // Navigate to the nested object
        for (let i = 0; i < pathArray.length - 1; i++) {
          const key = pathArray[i];
          if (key === 'sections' && Array.isArray(target.sections)) {
            // Handle array index
            const nextKey = pathArray[i + 1];
            if (!isNaN(nextKey)) {
              target = target.sections[parseInt(nextKey)];
              i++; // Skip the index
              continue;
            }
          }
          if (!target[key]) {
            target[key] = {};
          }
          target = target[key];
        }

        // Set the final value
        const finalKey = pathArray[pathArray.length - 1];
        target[finalKey] = value;
      });

      // Clear temp changes
      state.tempChanges = {};
      state.hasUnsavedChanges = false;
    },

    saveAndPublishChanges: state => {
      // Changes are already applied to main state in real-time
      // This action just clears the tracking and publishes
      state.tempChanges = {};
      state.hasUnsavedChanges = false;
      state.pageContent.lastPublished = new Date().toISOString();
      console.log('Changes published to main state');
    },

    discardTempChanges: state => {
      state.tempChanges = {};
      state.hasUnsavedChanges = false;
    },

    // Filter actions
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: state => {
      state.filters = {
        category: null,
        priceRange: { min: 0, max: 500000 },
        make: null,
        year: null,
        condition: null,
        sortBy: 'featured',
        sortOrder: 'desc',
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
    clearSelectedVehicle: state => {
      state.selectedVehicle = null;
    },
    addToRecentlyViewed: (state, action) => {
      const vehicleId = action.payload;
      // Remove if already exists
      state.recentlyViewed = state.recentlyViewed.filter(
        id => id !== vehicleId
      );
      // Add to beginning
      state.recentlyViewed.unshift(vehicleId);
      // Keep only last 10
      state.recentlyViewed = state.recentlyViewed.slice(0, 10);
    },

    // Error handling
    clearError: state => {
      state.error = null;
    },

    // Smart section update with embedded data sync
    updateSectionContent: (state, action) => {
      const { sectionId, content } = action.payload;
      const sectionIndex = state.pageContent.sections.findIndex(
        s => s.id === sectionId
      );

      if (sectionIndex !== -1) {
        const section = state.pageContent.sections[sectionIndex];

        // Ensure content object exists
        if (!section.content) {
          section.content = {};
        }

        // Update both root level and content properties for dual compatibility
        Object.entries(content).forEach(([key, value]) => {
          // Update root level property
          section[key] = value;
          // Also update in content object for backward compatibility
          section.content[key] = value;
        });

        // Track changes for sidebar
        Object.keys(content).forEach(key => {
          const path = `sections.${sectionId}.${key}`;
          state.tempChanges[path] = content[key];
        });

        // Mark as having unsaved changes
        state.hasUnsavedChanges = true;

        // Smart sync with global data based on section type
        if (sectionId === 'categories' && content.categories) {
          // Sync embedded categories with global categories
          content.categories.forEach(category => {
            const existingIndex = state.categories.findIndex(
              c => c.id === category.id
            );
            if (existingIndex !== -1) {
              // Update existing category
              state.categories[existingIndex] = category;
            } else {
              // Add new category
              state.categories.push(category);
            }
          });
        }

        if (
          (sectionId === 'featured' || sectionId === 'special-offers') &&
          content.vehicles
        ) {
          // Sync embedded vehicles with global vehicles
          content.vehicles.forEach(vehicle => {
            const existingIndex = state.vehicles.findIndex(
              v => v.id === vehicle.id
            );
            if (existingIndex !== -1) {
              // Update existing vehicle
              state.vehicles[existingIndex] = vehicle;
            } else {
              // Add new vehicle
              state.vehicles.push(vehicle);
            }
          });
        }

        state.hasUnsavedChanges = true;
      }
    },

    // Add new category to both global and section data
    addCategory: (state, action) => {
      const newCategory = action.payload;

      // Add to global categories
      state.categories.push(newCategory);

      // Add to categories section if it exists
      const categoriesSection = state.pageContent.sections.find(
        s => s.id === 'categories'
      );
      if (categoriesSection && categoriesSection.categories) {
        categoriesSection.categories.push(newCategory);
      }

      state.hasUnsavedChanges = true;
    },

    // Update category in both global and section data
    updateCategory: (state, action) => {
      const { categoryId, updates } = action.payload;

      // Update in global categories
      const globalIndex = state.categories.findIndex(c => c.id === categoryId);
      if (globalIndex !== -1) {
        Object.assign(state.categories[globalIndex], updates);
      }

      // Update in categories section if it exists
      const categoriesSection = state.pageContent.sections.find(
        s => s.id === 'categories'
      );
      if (categoriesSection && categoriesSection.categories) {
        const sectionIndex = categoriesSection.categories.findIndex(
          c => c.id === categoryId
        );
        if (sectionIndex !== -1) {
          Object.assign(categoriesSection.categories[sectionIndex], updates);
        }
      }

      state.hasUnsavedChanges = true;
    },

    // Remove category from both global and section data
    removeCategory: (state, action) => {
      const categoryId = action.payload;

      // Remove from global categories
      state.categories = state.categories.filter(c => c.id !== categoryId);

      // Remove from categories section if it exists
      const categoriesSection = state.pageContent.sections.find(
        s => s.id === 'categories'
      );
      if (categoriesSection && categoriesSection.categories) {
        categoriesSection.categories = categoriesSection.categories.filter(
          c => c.id !== categoryId
        );
      }

      state.hasUnsavedChanges = true;
    },

    // Add new vehicle to both global and relevant sections
    addVehicle: (state, action) => {
      const newVehicle = action.payload;

      // Add to global vehicles
      state.vehicles.push(newVehicle);

      // If it's featured, add to featured section
      if (newVehicle.featured) {
        const featuredSection = state.pageContent.sections.find(
          s => s.id === 'featured'
        );
        if (featuredSection && featuredSection.vehicles) {
          featuredSection.vehicles.push(newVehicle);
        }
      }

      // If it's on sale, add to special offers section
      if (newVehicle.pricing?.onSale) {
        const offersSection = state.pageContent.sections.find(
          s => s.id === 'special-offers'
        );
        if (offersSection && offersSection.vehicles) {
          offersSection.vehicles.push(newVehicle);
        }
      }

      state.hasUnsavedChanges = true;
    },

    // Update vehicle in both global and section data
    updateVehicle: (state, action) => {
      const { vehicleId, updates } = action.payload;

      // Update in global vehicles
      const globalIndex = state.vehicles.findIndex(v => v.id === vehicleId);
      if (globalIndex !== -1) {
        Object.assign(state.vehicles[globalIndex], updates);
      }

      // Update in all sections that contain this vehicle
      state.pageContent.sections.forEach(section => {
        if (section.vehicles) {
          const sectionIndex = section.vehicles.findIndex(
            v => v.id === vehicleId
          );
          if (sectionIndex !== -1) {
            Object.assign(section.vehicles[sectionIndex], updates);
          }
        }
      });

      state.hasUnsavedChanges = true;
    },

    // Remove vehicle from both global and section data
    removeVehicle: (state, action) => {
      const vehicleId = action.payload;

      // Remove from global vehicles
      state.vehicles = state.vehicles.filter(v => v.id !== vehicleId);

      // Remove from all sections that contain this vehicle
      state.pageContent.sections.forEach(section => {
        if (section.vehicles) {
          section.vehicles = section.vehicles.filter(v => v.id !== vehicleId);
        }
      });

      state.hasUnsavedChanges = true;
    },

    // Update page sections array
    updatePageSections: (state, action) => {
      state.pageContent.sections = action.payload;
      state.hasUnsavedChanges = true;
    },

    // Publish all changes to API-ready format
    publishPageContent: (state, action) => {
      state.pageContent.sections = action.payload || state.pageContent.sections;
      state.pageContent.lastPublished = new Date().toISOString();
      state.hasUnsavedChanges = false;
    },
    addCustomSection: (state, action) => {
      state.pageContent.sections.push(action.payload);
    },
    removeCustomSection: (state, action) => {
      state.pageContent.sections = state.pageContent.sections.filter(
        section => section.id !== action.payload
      );
    },
    updateSectionVisibility: (state, action) => {
      const { sectionId, visible } = action.payload;
      const section = state.pageContent.sections.find(s => s.id === sectionId);
      if (section) {
        section.visible = visible;
      }
    },
    reorderSections: (state, action) => {
      state.pageContent.sections = action.payload;
    },

    // Reset state
    resetAutomobileState: state => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder
      // Fetch automobile data
      .addCase(fetchAutomobileData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAutomobileData.fulfilled, (state, action) => {
        state.loading = false;
        const { data, meta } = action.payload;

        // Update main state with fetched data
        state.vendor = data.vendor;
        state.categories = data.allCategories || data.categories || [];
        state.vehicles = data.allVehicles || data.vehicles || [];
        state.promotions = data.promotions || [];
        state.customerReviews = data.customerReviews || [];
        state.financing = data.financing;

        // Use pageSections from API if available, otherwise initialize with vendor data
        if (data.pageSections && Array.isArray(data.pageSections)) {
          state.pageContent.sections = data.pageSections;
        } else {
          // Fallback: Initialize page content with vendor data
          const vehicleData = data.allVehicles || data.vehicles || [];
          const categoryData = data.allCategories || data.categories || [];

          state.pageContent.sections = state.pageContent.sections.map(
            section => {
              const sectionContent = { ...section.content };

              // Initialize content based on vendor data
              if (section.id === 'hero') {
                sectionContent.title =
                  sectionContent.title || `Welcome to ${data.vendor.name}`;
                sectionContent.subtitle =
                  sectionContent.subtitle ||
                  data.vendor.businessInfo?.description ||
                  '';
                sectionContent.backgroundImage =
                  sectionContent.backgroundImage ||
                  data.vendor.businessInfo?.coverImage ||
                  '';
              } else if (section.id === 'categories') {
                sectionContent.visibleCategories =
                  sectionContent.visibleCategories.length > 0
                    ? sectionContent.visibleCategories
                    : categoryData.map(cat => cat.id);
              } else if (section.id === 'featured') {
                sectionContent.subtitle =
                  sectionContent.subtitle ||
                  `Handpicked vehicles from ${data.vendor.name} that customers love the most`;
                sectionContent.vehicleIds =
                  sectionContent.vehicleIds.length > 0
                    ? sectionContent.vehicleIds
                    : vehicleData
                        .filter(v => v.featured)
                        .slice(0, 4)
                        .map(v => v.id);
              } else if (section.id === 'special-offers') {
                sectionContent.subtitle =
                  sectionContent.subtitle ||
                  `Limited time deals from ${data.vendor.name} you don't want to miss`;
                sectionContent.vehicleIds =
                  sectionContent.vehicleIds.length > 0
                    ? sectionContent.vehicleIds
                    : vehicleData
                        .filter(v => v.pricing?.onSale)
                        .slice(0, 4)
                        .map(v => v.id);
              }

              return { ...section, content: sectionContent };
            }
          );
        }

        // Legacy support: Update page content with data from API if available
        if (data.pageContent && !data.pageSections) {
          state.pageContent.sections = state.pageContent.sections.map(
            section => ({
              ...section,
              content: {
                ...section.content,
                ...data.pageContent[section.id],
              },
            })
          );
        }

        // Update pagination if meta exists
        if (meta && meta.pagination) {
          state.pagination = {
            ...state.pagination,
            ...meta.pagination,
          };
        }

        // Update meta filters if meta exists
        if (meta && meta.filters) {
          state.meta.availableFilters = {
            categories: meta.filters.availableCategories || [],
            makes: meta.filters.availableMakes || [],
            years: meta.filters.availableYears || [],
            conditions: meta.filters.availableConditions || [],
            priceRange: meta.filters.priceRange || { min: 0, max: 500000 },
          };
        }
      })
      .addCase(fetchAutomobileData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch automobile data';
      })

      // Fetch vehicle details
      .addCase(fetchVehicleDetails.pending, state => {
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
      .addCase(submitEnquiry.pending, state => {
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
      })

      // Save complete data to API
      .addCase(saveCompleteData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveCompleteData.fulfilled, (state, action) => {
        state.loading = false;
        state.hasUnsavedChanges = false;
        state.tempChanges = {};
        state.pageContent.lastPublished = new Date().toISOString();
        state.isDataPersisted = true;
        state.lastSaveTimestamp = new Date().toISOString();
      })
      .addCase(saveCompleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to save data to API';
      });
  },
});

// Export actions
export const {
  setTempChange,
  updatePageSectionContent,
  applyTempChanges,
  saveAndPublishChanges,
  discardTempChanges,
  setFilters,
  clearFilters,
  setSearchQuery,
  setCurrentPage,
  setItemsPerPage,
  setSelectedVehicle,
  clearSelectedVehicle,
  addToRecentlyViewed,
  clearError,
  resetAutomobileState,
  // New smart update actions
  updateSectionContent,
  addCategory,
  updateCategory,
  removeCategory,
  addVehicle,
  updateVehicle,
  removeVehicle,
  updatePageSections,
  publishPageContent,
  addCustomSection,
  removeCustomSection,
  updateSectionVisibility,
  reorderSections,
} = automobileManagementSlice.actions;

// Selectors
export const selectAutomobileData = state => state.automobileManagement;
export const selectVendor = state => state.automobileManagement.vendor;
export const selectCategories = state => state.automobileManagement.categories;
export const selectVehicles = state => state.automobileManagement.vehicles;
export const selectSelectedVehicle = state =>
  state.automobileManagement.selectedVehicle;
export const selectPageSections = state =>
  state.automobileManagement.pageContent.sections;
export const selectPromotions = state => state.automobileManagement.promotions;
export const selectCustomerReviews = state =>
  state.automobileManagement.customerReviews;
export const selectFinancing = state => state.automobileManagement.financing;
export const selectLoading = state => state.automobileManagement.loading;
export const selectVehicleLoading = state =>
  state.automobileManagement.vehicleLoading;
export const selectError = state => state.automobileManagement.error;
export const selectFilters = state => state.automobileManagement.filters;
export const selectSearchQuery = state =>
  state.automobileManagement.searchQuery;
export const selectWishlist = state => state.automobileManagement.wishlist;
export const selectEnquiries = state => state.automobileManagement.enquiries;
export const selectRecentlyViewed = state =>
  state.automobileManagement.recentlyViewed;
export const selectPagination = state => state.automobileManagement.pagination;
export const selectAvailableFilters = state =>
  state.automobileManagement.meta.availableFilters;
export const selectPageContent = state =>
  state.automobileManagement.pageContent;
export const selectHasUnsavedChanges = state =>
  state.automobileManagement.hasUnsavedChanges;
export const selectTempChanges = state =>
  state.automobileManagement.tempChanges;

// Helper selector to get current section content
export const selectSectionContent = sectionId => state => {
  const section = state.automobileManagement.pageContent.sections.find(
    s => s.id === sectionId
  );
  return section ? section.content : {};
};

// Complex selectors
export const selectFilteredVehicles = state => {
  const { vehicles, filters, searchQuery } = state.automobileManagement;
  let filtered = [...vehicles];

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      vehicle =>
        vehicle.name.toLowerCase().includes(query) ||
        vehicle.make.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query) ||
        vehicle.description.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (filters.category) {
    filtered = filtered.filter(
      vehicle => vehicle.category.slug === filters.category
    );
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
    filtered = filtered.filter(
      vehicle => vehicle.condition === filters.condition
    );
  }

  // Apply price range filter
  if (filters.priceRange) {
    filtered = filtered.filter(
      vehicle =>
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

export const selectFeaturedVehicles = state => {
  return state.automobileManagement.vehicles.filter(
    vehicle => vehicle.featured
  );
};

export const selectOnSaleVehicles = state => {
  return state.automobileManagement.vehicles.filter(
    vehicle => vehicle.pricing.onSale
  );
};

export const selectWishlistVehicles = state => {
  const { vehicles, wishlist } = state.automobileManagement;
  return vehicles.filter(vehicle => wishlist.includes(vehicle.id));
};

export const selectRecentlyViewedVehicles = state => {
  const { vehicles, recentlyViewed } = state.automobileManagement;
  return recentlyViewed
    .map(id => vehicles.find(vehicle => vehicle.id === id))
    .filter(Boolean);
};

export const selectVehiclesByCategory = categorySlug => state => {
  return state.automobileManagement.vehicles.filter(
    vehicle => vehicle.category.slug === categorySlug
  );
};

export const selectVehicleById = vehicleId => state => {
  return state.automobileManagement.vehicles.find(
    vehicle => vehicle.id === parseInt(vehicleId)
  );
};

export const selectIsInWishlist = vehicleId => state => {
  return state.automobileManagement.wishlist.includes(parseInt(vehicleId));
};

// API-ready data selectors for sending to backend
export const selectApiReadyData = state => {
  const {
    vendor,
    pageContent,
    categories,
    vehicles,
    promotions,
    customerReviews,
    financing,
  } = state.automobileManagement;

  return {
    success: true,
    timestamp: new Date().toISOString(),
    data: {
      vendor,
      pageSections: pageContent.sections,
      allCategories: categories,
      allVehicles: vehicles,
      promotions: promotions || [],
      customerReviews: customerReviews || [],
      financing: financing || {},
      dashboard: {
        analytics: {},
        inventory: {
          totalVehicles: vehicles.length,
          totalValue: vehicles.reduce(
            (sum, v) => sum + (v.pricing?.price || 0),
            0
          ),
          lastUpdated: new Date().toISOString(),
        },
      },
    },
    meta: {
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: vehicles.length,
        itemsPerPage: 50,
      },
      filters: {
        availableCategories: categories.map(c => c.slug),
        availableMakes: [...new Set(vehicles.map(v => v.make))],
        availableYears: [...new Set(vehicles.map(v => v.year))],
        availableConditions: [...new Set(vehicles.map(v => v.condition))],
        priceRange: {
          min: Math.min(...vehicles.map(v => v.pricing?.price || 0)),
          max: Math.max(...vehicles.map(v => v.pricing?.price || 0)),
        },
      },
      lastUpdated: new Date().toISOString(),
      dataVersion: '2.1.0',
    },
  };
};

// Selector for getting section by ID with embedded data
export const selectSectionById = sectionId => state => {
  return state.automobileManagement.pageContent.sections.find(
    s => s.id === sectionId
  );
};

// Selector for checking if data needs sync between sections and global arrays
export const selectNeedsSyncCheck = state => {
  const sections = state.automobileManagement.pageContent.sections;
  const globalCategories = state.automobileManagement.categories;
  const globalVehicles = state.automobileManagement.vehicles;

  // Check if categories section has different data than global
  const categoriesSection = sections.find(s => s.id === 'categories');
  const categoriesNeedSync =
    categoriesSection?.categories &&
    categoriesSection.categories.length !== globalCategories.length;

  // Check if vehicle sections have different data than global
  const featuredSection = sections.find(s => s.id === 'featured');
  const offersSection = sections.find(s => s.id === 'special-offers');

  const vehiclesNeedSync =
    (featuredSection?.vehicles || offersSection?.vehicles) &&
    !sections.every(section => {
      if (!section.vehicles) return true;
      return section.vehicles.every(v =>
        globalVehicles.find(gv => gv.id === v.id)
      );
    });

  return {
    categoriesNeedSync,
    vehiclesNeedSync,
    needsSync: categoriesNeedSync || vehiclesNeedSync,
  };
};

export default automobileManagementSlice.reducer;
