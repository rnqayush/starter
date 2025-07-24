import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Loading states
  isLoading: false,
  loadingMessage: '',
  
  // Modal states
  modals: {
    login: false,
    register: false,
    vendorRegister: false,
    profile: false,
    createListing: false,
  },
  
  // Sidebar/Navigation
  sidebarOpen: false,
  mobileMenuOpen: false,
  
  // Search and filters
  searchQuery: '',
  activeFilters: {},
  sortBy: 'createdAt',
  sortOrder: 'desc',
  
  // Pagination
  currentPage: 1,
  itemsPerPage: 10,
  
  // Notifications
  notifications: [],
  
  // Theme
  theme: 'light',
  
  // Error handling
  globalError: null,
  
  // Form states
  forms: {
    login: { isSubmitting: false, errors: {} },
    register: { isSubmitting: false, errors: {} },
    vendorRegister: { isSubmitting: false, errors: {} },
    profile: { isSubmitting: false, errors: {} },
    createListing: { isSubmitting: false, errors: {} },
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },
    
    // Modal management
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false;
      });
    },
    
    // Navigation
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload;
    },
    
    // Search and filters
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // Reset to first page on search
    },
    setActiveFilters: (state, action) => {
      state.activeFilters = action.payload;
      state.currentPage = 1; // Reset to first page on filter change
    },
    updateFilter: (state, action) => {
      const { key, value } = action.payload;
      if (value === null || value === undefined || value === '') {
        delete state.activeFilters[key];
      } else {
        state.activeFilters[key] = value;
      }
      state.currentPage = 1; // Reset to first page on filter change
    },
    clearFilters: (state) => {
      state.activeFilters = {};
      state.searchQuery = '';
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1; // Reset to first page on sort change
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
      state.currentPage = 1; // Reset to first page on sort change
    },
    
    // Pagination
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.itemsPerPage = action.payload;
      state.currentPage = 1; // Reset to first page on items per page change
    },
    
    // Notifications
    addNotification: (state, action) => {
      const notification = {
        id: Date.now() + Math.random(),
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      state.notifications.unshift(notification);
      
      // Keep only last 10 notifications
      if (state.notifications.length > 10) {
        state.notifications = state.notifications.slice(0, 10);
      }
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    
    // Theme
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', state.theme);
    },
    
    // Error handling
    setGlobalError: (state, action) => {
      state.globalError = action.payload;
    },
    clearGlobalError: (state) => {
      state.globalError = null;
    },
    
    // Form states
    setFormSubmitting: (state, action) => {
      const { form, isSubmitting } = action.payload;
      if (state.forms[form]) {
        state.forms[form].isSubmitting = isSubmitting;
      }
    },
    setFormErrors: (state, action) => {
      const { form, errors } = action.payload;
      if (state.forms[form]) {
        state.forms[form].errors = errors;
      }
    },
    clearFormErrors: (state, action) => {
      const form = action.payload;
      if (state.forms[form]) {
        state.forms[form].errors = {};
      }
    },
    resetForm: (state, action) => {
      const form = action.payload;
      if (state.forms[form]) {
        state.forms[form] = { isSubmitting: false, errors: {} };
      }
    },
  },
});

export const {
  // Loading
  setLoading,
  
  // Modals
  openModal,
  closeModal,
  closeAllModals,
  
  // Navigation
  toggleSidebar,
  setSidebarOpen,
  toggleMobileMenu,
  setMobileMenuOpen,
  
  // Search and filters
  setSearchQuery,
  setActiveFilters,
  updateFilter,
  clearFilters,
  setSortBy,
  setSortOrder,
  
  // Pagination
  setCurrentPage,
  setItemsPerPage,
  
  // Notifications
  addNotification,
  removeNotification,
  clearNotifications,
  
  // Theme
  setTheme,
  toggleTheme,
  
  // Error handling
  setGlobalError,
  clearGlobalError,
  
  // Forms
  setFormSubmitting,
  setFormErrors,
  clearFormErrors,
  resetForm,
} = uiSlice.actions;

// Selectors
export const selectUI = (state) => state.ui;
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectLoadingMessage = (state) => state.ui.loadingMessage;
export const selectModals = (state) => state.ui.modals;
export const selectSidebarOpen = (state) => state.ui.sidebarOpen;
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectSearchQuery = (state) => state.ui.searchQuery;
export const selectActiveFilters = (state) => state.ui.activeFilters;
export const selectSortBy = (state) => state.ui.sortBy;
export const selectSortOrder = (state) => state.ui.sortOrder;
export const selectCurrentPage = (state) => state.ui.currentPage;
export const selectItemsPerPage = (state) => state.ui.itemsPerPage;
export const selectNotifications = (state) => state.ui.notifications;
export const selectTheme = (state) => state.ui.theme;
export const selectGlobalError = (state) => state.ui.globalError;
export const selectFormState = (form) => (state) => state.ui.forms[form];

export default uiSlice.reducer;
