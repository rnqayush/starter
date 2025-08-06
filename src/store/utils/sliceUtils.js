/**
 * Reusable utilities for Redux slices to maintain consistency and reduce complexity
 */
import { createAsyncThunk } from '@reduxjs/toolkit';

// Standard initial states for common patterns
export const createLoadingState = () => ({
  loading: false,
  error: null,
  success: false,
});

export const createEntityState = () => ({
  items: [],
  selectedItem: null,
  ...createLoadingState(),
});

export const createEditingState = () => ({
  editing: null,
  original: null,
  hasChanges: false,
  changes: {},
});

export const createFilterState = (customFilters = {}) => ({
  searchQuery: '',
  sortBy: 'updated',
  sortOrder: 'desc',
  ...customFilters,
});

export const createPaginationState = () => ({
  currentPage: 1,
  itemsPerPage: 12,
  totalItems: 0,
  totalPages: 0,
});

// Standard reducers for common operations
export const createLoadingReducers = () => ({
  setLoading: (state, action) => {
    state.loading = action.payload;
    if (action.payload) {
      state.error = null;
    }
  },
  
  setError: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  },
  
  clearError: (state) => {
    state.error = null;
  },
  
  setSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload;
    state.error = null;
  },
});

export const createEntityReducers = () => ({
  ...createLoadingReducers(),
  
  setItems: (state, action) => {
    state.items = action.payload;
    state.loading = false;
    state.error = null;
  },
  
  addItem: (state, action) => {
    const newItem = {
      ...action.payload,
      id: action.payload.id || Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    state.items.push(newItem);
  },
  
  updateItem: (state, action) => {
    const { id, updates } = action.payload;
    const index = state.items.findIndex(item => item.id === id);
    if (index !== -1) {
      state.items[index] = {
        ...state.items[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
    }
  },
  
  removeItem: (state, action) => {
    const id = action.payload;
    state.items = state.items.filter(item => item.id !== id);
  },
  
  selectItem: (state, action) => {
    const id = action.payload;
    state.selectedItem = state.items.find(item => item.id === id) || null;
  },
  
  clearSelection: (state) => {
    state.selectedItem = null;
  },
});

export const createEditingReducers = () => ({
  startEditing: (state, action) => {
    const item = action.payload;
    state.editing = { ...item };
    state.original = { ...item };
    state.hasChanges = false;
    state.changes = {};
  },
  
  updateField: (state, action) => {
    const { field, value } = action.payload;
    if (state.editing) {
      state.editing[field] = value;
      state.changes[field] = {
        old: state.original?.[field],
        new: value,
      };
      state.hasChanges = true;
    }
  },
  
  updateNestedField: (state, action) => {
    const { path, value } = action.payload;
    if (state.editing) {
      const pathArray = path.split('.');
      let target = state.editing;
      
      // Navigate to parent object
      for (let i = 0; i < pathArray.length - 1; i++) {
        if (!target[pathArray[i]]) {
          target[pathArray[i]] = {};
        }
        target = target[pathArray[i]];
      }
      
      // Set value
      const finalKey = pathArray[pathArray.length - 1];
      target[finalKey] = value;
      
      state.changes[path] = {
        old: getNestedValue(state.original, path),
        new: value,
      };
      state.hasChanges = true;
    }
  },
  
  saveChanges: (state) => {
    if (state.editing && state.hasChanges) {
      state.original = { ...state.editing };
      state.changes = {};
      state.hasChanges = false;
    }
  },
  
  discardChanges: (state) => {
    if (state.original) {
      state.editing = { ...state.original };
      state.changes = {};
      state.hasChanges = false;
    }
  },
  
  clearEditing: (state) => {
    state.editing = null;
    state.original = null;
    state.changes = {};
    state.hasChanges = false;
  },
});

export const createFilterReducers = () => ({
  setSearchQuery: (state, action) => {
    state.searchQuery = action.payload;
  },
  
  setSortBy: (state, action) => {
    state.sortBy = action.payload;
  },
  
  setSortOrder: (state, action) => {
    state.sortOrder = action.payload;
  },
  
  setFilters: (state, action) => {
    Object.assign(state, action.payload);
  },
  
  clearFilters: (state) => {
    state.searchQuery = '';
    state.sortBy = 'updated';
    state.sortOrder = 'desc';
  },
});

export const createPaginationReducers = () => ({
  setPage: (state, action) => {
    state.currentPage = action.payload;
  },
  
  setItemsPerPage: (state, action) => {
    state.itemsPerPage = action.payload;
    state.currentPage = 1; // Reset to first page
  },
  
  setPagination: (state, action) => {
    Object.assign(state, action.payload);
  },
});

// Helper functions
const getNestedValue = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Async thunk builder for common operations
export const createAsyncThunks = (name, api) => {
  const fetchItems = createAsyncThunk(
    `${name}/fetchItems`,
    async (params = {}, { rejectWithValue }) => {
      try {
        const response = await api.getAll(params);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const fetchItem = createAsyncThunk(
    `${name}/fetchItem`,
    async (id, { rejectWithValue }) => {
      try {
        const response = await api.getById(id);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const createItem = createAsyncThunk(
    `${name}/createItem`,
    async (data, { rejectWithValue }) => {
      try {
        const response = await api.create(data);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const updateItem = createAsyncThunk(
    `${name}/updateItem`,
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await api.update(id, data);
        return response;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const deleteItem = createAsyncThunk(
    `${name}/deleteItem`,
    async (id, { rejectWithValue }) => {
      try {
        await api.delete(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  return {
    fetchItems,
    fetchItem,
    createItem,
    updateItem,
    deleteItem,
  };
};

// Standard extra reducers for async thunks
export const createAsyncExtraReducers = (thunks) => (builder) => {
  // Fetch items
  if (thunks.fetchItems) {
    builder
      .addCase(thunks.fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunks.fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(thunks.fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }

  // Fetch single item
  if (thunks.fetchItem) {
    builder
      .addCase(thunks.fetchItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunks.fetchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
        state.error = null;
      })
      .addCase(thunks.fetchItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }

  // Create item
  if (thunks.createItem) {
    builder
      .addCase(thunks.createItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunks.createItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(thunks.createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }

  // Update item
  if (thunks.updateItem) {
    builder
      .addCase(thunks.updateItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunks.updateItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(thunks.updateItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }

  // Delete item
  if (thunks.deleteItem) {
    builder
      .addCase(thunks.deleteItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(thunks.deleteItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(item => item.id !== action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(thunks.deleteItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
};

// Common selectors
export const createEntitySelectors = (selectSlice) => ({
  selectItems: (state) => selectSlice(state).items,
  selectSelectedItem: (state) => selectSlice(state).selectedItem,
  selectLoading: (state) => selectSlice(state).loading,
  selectError: (state) => selectSlice(state).error,
  selectSuccess: (state) => selectSlice(state).success,
  selectItemById: (id) => (state) => 
    selectSlice(state).items.find(item => item.id === id),
});

export const createEditingSelectors = (selectSlice) => ({
  selectEditing: (state) => selectSlice(state).editing,
  selectOriginal: (state) => selectSlice(state).original,
  selectHasChanges: (state) => selectSlice(state).hasChanges,
  selectChanges: (state) => selectSlice(state).changes,
});

export const createFilterSelectors = (selectSlice) => ({
  selectSearchQuery: (state) => selectSlice(state).searchQuery,
  selectSortBy: (state) => selectSlice(state).sortBy,
  selectSortOrder: (state) => selectSlice(state).sortOrder,
});
