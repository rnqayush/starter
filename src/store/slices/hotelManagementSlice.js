import { createSlice } from '@reduxjs/toolkit';
import { hotels } from '../../DummyData';

const initialState = {
  // Live hotel data (what users see on public pages)
  liveHotels: hotels,
  // Draft hotel data (admin changes before going live)
  draftHotels: hotels.map(hotel => ({ ...hotel })),
  editingHotel: null,
  originalHotel: null,
  changes: {},
  hasUnsavedChanges: false,
  activeHotelId: null,
  sectionVisibility: {
    hero: true,
    about: true,
    features: true,
    gallery: true,
    amenities: true,
    contact: true,
    testimonials: true,
  },
  // Track which changes are pending publication
  pendingChanges: {},
  lastSaveTime: null,
  lastPublishTime: null,
};

const hotelManagementSlice = createSlice({
  name: 'hotelManagement',
  initialState,
  reducers: {
    // Action to fetch and store hotel data from API/JSON
    loadHotelData: (state, action) => {
      const hotelData = action.payload;

      // Check if hotel already exists in state
      const existingLiveIndex = state.liveHotels.findIndex(h => h.id === hotelData.id);
      const existingDraftIndex = state.draftHotels.findIndex(h => h.id === hotelData.id);

      if (existingLiveIndex !== -1) {
        // Update existing hotel in live data
        state.liveHotels[existingLiveIndex] = { ...hotelData };
      } else {
        // Add new hotel to live data
        state.liveHotels.push({ ...hotelData });
      }

      if (existingDraftIndex !== -1) {
        // Update existing hotel in draft data
        state.draftHotels[existingDraftIndex] = { ...hotelData };
      } else {
        // Add new hotel to draft data
        state.draftHotels.push({ ...hotelData });
      }
    },

    setEditingHotel: (state, action) => {
      // Get hotel from draft data for editing
      let hotel = state.draftHotels.find(h => h.id === action.payload);

      // If not found in draft, get from live data
      if (!hotel) {
        const liveHotel = state.liveHotels.find(h => h.id === action.payload);
        if (liveHotel) {
          // Copy live hotel to draft for editing
          hotel = { ...liveHotel };
          state.draftHotels.push(hotel);
        }
      }

      state.editingHotel = hotel ? { ...hotel } : null;
      // Keep reference to original live version for comparison
      const originalHotel = state.liveHotels.find(h => h.id === action.payload);
      state.originalHotel = originalHotel ? { ...originalHotel } : null;
      state.activeHotelId = action.payload;
      state.changes = {};
      state.hasUnsavedChanges = false;

      // Initialize section visibility from hotel data
      if (hotel && hotel.sectionVisibility) {
        state.sectionVisibility = { ...hotel.sectionVisibility };
      }
    },

    updateHotelField: (state, action) => {
      const { field, value, section } = action.payload;
      if (state.editingHotel) {
        if (section) {
          // Update nested section field
          if (!state.editingHotel.sections) {
            state.editingHotel.sections = {};
          }
          if (!state.editingHotel.sections[section]) {
            state.editingHotel.sections[section] = {};
          }
          state.editingHotel.sections[section][field] = value;

          // Track changes for nested sections
          const changeKey = `sections.${section}.${field}`;
          state.changes[changeKey] = {
            old: state.originalHotel?.sections?.[section]?.[field],
            new: value,
          };
        } else {
          // Update top-level field
          state.editingHotel[field] = value;
          state.changes[field] = {
            old: state.originalHotel?.[field],
            new: value,
          };
        }
        state.hasUnsavedChanges = true;
        state.lastSaveTime = new Date().toISOString();
      }
    },

    updateHotelImage: (state, action) => {
      const { index, url } = action.payload;
      if (state.editingHotel) {
        if (index === 'main') {
          state.editingHotel.image = url;
          state.changes.image = {
            old: state.originalHotel.image,
            new: url,
          };
        } else {
          const newImages = [...state.editingHotel.images];
          newImages[index] = url;
          state.editingHotel.images = newImages;
          state.changes.images = {
            old: state.originalHotel.images,
            new: newImages,
          };
        }
        state.hasUnsavedChanges = true;
      }
    },

    addHotelImage: (state, action) => {
      if (state.editingHotel) {
        const newImages = [...state.editingHotel.images, action.payload];
        state.editingHotel.images = newImages;
        state.changes.images = {
          old: state.originalHotel.images,
          new: newImages,
        };
        state.hasUnsavedChanges = true;
      }
    },

    removeHotelImage: (state, action) => {
      if (state.editingHotel) {
        const newImages = state.editingHotel.images.filter(
          (_, index) => index !== action.payload
        );
        state.editingHotel.images = newImages;
        state.changes.images = {
          old: state.originalHotel.images,
          new: newImages,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateAmenities: (state, action) => {
      if (state.editingHotel) {
        state.editingHotel.amenities = action.payload;
        state.changes.amenities = {
          old: state.originalHotel.amenities,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updatePolicies: (state, action) => {
      if (state.editingHotel) {
        state.editingHotel.policies = action.payload;
        state.changes.policies = {
          old: state.originalHotel.policies,
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    addRoom: (state, action) => {
      if (state.editingHotel) {
        const newRooms = [...state.editingHotel.rooms, action.payload];
        state.editingHotel.rooms = newRooms;
        state.changes.rooms = {
          old: state.originalHotel.rooms,
          new: newRooms,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateRoom: (state, action) => {
      const { roomId, updates } = action.payload;
      if (state.editingHotel) {
        const roomIndex = state.editingHotel.rooms.findIndex(
          room => room.id === roomId
        );
        if (roomIndex !== -1) {
          state.editingHotel.rooms[roomIndex] = {
            ...state.editingHotel.rooms[roomIndex],
            ...updates,
          };
          state.changes.rooms = {
            old: state.originalHotel.rooms,
            new: state.editingHotel.rooms,
          };
          state.hasUnsavedChanges = true;
        }
      }
    },

    removeRoom: (state, action) => {
      if (state.editingHotel) {
        const newRooms = state.editingHotel.rooms.filter(
          room => room.id !== action.payload
        );
        state.editingHotel.rooms = newRooms;
        state.changes.rooms = {
          old: state.originalHotel.rooms,
          new: newRooms,
        };
        state.hasUnsavedChanges = true;
      }
    },

    saveChanges: state => {
      // Save changes to draft only (for admin preview)
      if (state.editingHotel && state.hasUnsavedChanges) {
        const hotelIndex = state.draftHotels.findIndex(
          h => h.id === state.editingHotel.id
        );
        if (hotelIndex !== -1) {
          state.draftHotels[hotelIndex] = { ...state.editingHotel };
        }

        // Store pending changes for publication
        state.pendingChanges[state.editingHotel.id] = { ...state.changes };
        state.changes = {};
        state.hasUnsavedChanges = false;
        state.lastSaveTime = new Date().toISOString();
      }
    },

    publishChanges: state => {
      // Publish draft changes to live data (what users see)
      if (state.editingHotel) {
        console.log('Publishing changes for hotel:', state.editingHotel.name);
        console.log('Current live hotels count:', state.liveHotels.length);

        const liveHotelIndex = state.liveHotels.findIndex(
          h => h.id === state.editingHotel.id
        );

        console.log('Live hotel index found:', liveHotelIndex);

        if (liveHotelIndex !== -1) {
          // Copy the current editing hotel (with all changes) to live hotels
          state.liveHotels[liveHotelIndex] = { ...state.editingHotel };
          console.log('Updated live hotel:', state.liveHotels[liveHotelIndex].name);

          // Also update the draft hotel to match
          const draftHotelIndex = state.draftHotels.findIndex(
            h => h.id === state.editingHotel.id
          );
          if (draftHotelIndex !== -1) {
            state.draftHotels[draftHotelIndex] = { ...state.editingHotel };
          }

          state.originalHotel = { ...state.editingHotel };

          // Clear pending changes for this hotel
          delete state.pendingChanges[state.editingHotel.id];
          state.lastPublishTime = new Date().toISOString();

          console.log('Published successfully at:', state.lastPublishTime);
        } else {
          console.log('ERROR: Live hotel not found for publishing!');
        }
      }
    },

    discardChanges: state => {
      if (state.originalHotel) {
        state.editingHotel = { ...state.originalHotel };
        state.changes = {};
        state.hasUnsavedChanges = false;
      }
    },

    clearEditingHotel: state => {
      state.editingHotel = null;
      state.originalHotel = null;
      state.changes = {};
      state.hasUnsavedChanges = false;
      state.activeHotelId = null;
    },

    toggleSectionVisibility: (state, action) => {
      const { section } = action.payload;
      state.sectionVisibility[section] = !state.sectionVisibility[section];

      // Also update the editing hotel's sectionVisibility
      if (state.editingHotel) {
        if (!state.editingHotel.sectionVisibility) {
          state.editingHotel.sectionVisibility = { ...state.sectionVisibility };
        }
        state.editingHotel.sectionVisibility[section] =
          state.sectionVisibility[section];
        state.changes.sectionVisibility = {
          old: state.originalHotel?.sectionVisibility || {},
          new: state.editingHotel.sectionVisibility,
        };
      }

      state.hasUnsavedChanges = true;
    },

    updateFeatures: (state, action) => {
      if (state.editingHotel) {
        state.editingHotel.features = action.payload;
        state.changes.features = {
          old: state.originalHotel.features || [],
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    addFeature: (state, action) => {
      if (state.editingHotel) {
        const newFeatures = [
          ...(state.editingHotel.features || []),
          action.payload,
        ];
        state.editingHotel.features = newFeatures;
        state.changes.features = {
          old: state.originalHotel.features || [],
          new: newFeatures,
        };
        state.hasUnsavedChanges = true;
      }
    },

    removeFeature: (state, action) => {
      if (state.editingHotel) {
        const newFeatures = state.editingHotel.features.filter(
          (_, index) => index !== action.payload
        );
        state.editingHotel.features = newFeatures;
        state.changes.features = {
          old: state.originalHotel.features || [],
          new: newFeatures,
        };
        state.hasUnsavedChanges = true;
      }
    },

    updateAmenityCategories: (state, action) => {
      if (state.editingHotel) {
        state.editingHotel.amenityCategories = action.payload;
        state.changes.amenityCategories = {
          old: state.originalHotel.amenityCategories || [],
          new: action.payload,
        };
        state.hasUnsavedChanges = true;
      }
    },

    addAmenityCategory: (state, action) => {
      if (state.editingHotel) {
        const newCategories = [
          ...(state.editingHotel.amenityCategories || []),
          action.payload,
        ];
        state.editingHotel.amenityCategories = newCategories;
        state.changes.amenityCategories = {
          old: state.originalHotel.amenityCategories || [],
          new: newCategories,
        };
        state.hasUnsavedChanges = true;
      }
    },

    addAmenityToCategory: (state, action) => {
      const { categoryIndex, amenity } = action.payload;
      if (state.editingHotel && state.editingHotel.amenityCategories) {
        const newCategories = [...state.editingHotel.amenityCategories];
        newCategories[categoryIndex].items.push(amenity);
        state.editingHotel.amenityCategories = newCategories;
        state.changes.amenityCategories = {
          old: state.originalHotel.amenityCategories || [],
          new: newCategories,
        };
        state.hasUnsavedChanges = true;
      }
    },

    removeAmenityFromCategory: (state, action) => {
      const { categoryIndex, amenityIndex } = action.payload;
      if (state.editingHotel && state.editingHotel.amenityCategories) {
        const newCategories = [...state.editingHotel.amenityCategories];
        newCategories[categoryIndex].items.splice(amenityIndex, 1);
        state.editingHotel.amenityCategories = newCategories;
        state.changes.amenityCategories = {
          old: state.originalHotel.amenityCategories || [],
          new: newCategories,
        };
        state.hasUnsavedChanges = true;
      }
    },
  },
});

export const {
  loadHotelData,
  setEditingHotel,
  updateHotelField,
  updateHotelImage,
  addHotelImage,
  removeHotelImage,
  updateAmenities,
  updatePolicies,
  addRoom,
  updateRoom,
  removeRoom,
  saveChanges,
  publishChanges,
  discardChanges,
  clearEditingHotel,
  toggleSectionVisibility,
  updateFeatures,
  addFeature,
  removeFeature,
  updateAmenityCategories,
  addAmenityCategory,
  addAmenityToCategory,
  removeAmenityFromCategory,
} = hotelManagementSlice.actions;

// Selectors
export const selectHasPendingChanges = (state, hotelId) => {
  return state.hotelManagement.pendingChanges[hotelId] &&
         Object.keys(state.hotelManagement.pendingChanges[hotelId]).length > 0;
};

export const selectDraftHotel = (state, hotelId) => {
  return state.hotelManagement.draftHotels.find(h => h.id === hotelId);
};

export const selectLiveHotel = (state, hotelId) => {
  return state.hotelManagement.liveHotels.find(h => h.id === hotelId);
};

export const selectHotelBySlug = (state, slug) => {
  return state.hotelManagement.liveHotels.find(h => h.slug === slug || h.id === parseInt(slug));
};

export default hotelManagementSlice.reducer;
