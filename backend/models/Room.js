const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Please add a room name'],
    trim: true,
    maxlength: [100, 'Room name cannot be more than 100 characters']
  },
  roomNumber: {
    type: String,
    required: [true, 'Please add a room number']
  },
  
  // Hotel Reference
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hotel',
    required: true
  },
  
  // Room Type and Category
  type: {
    type: String,
    required: [true, 'Please specify room type'],
    enum: [
      'standard',
      'deluxe',
      'suite',
      'presidential_suite',
      'family_room',
      'connecting_rooms',
      'accessible_room',
      'penthouse'
    ]
  },
  category: {
    type: String,
    enum: ['economy', 'standard', 'premium', 'luxury'],
    default: 'standard'
  },
  
  // Room Details
  description: {
    type: String,
    required: [true, 'Please add a room description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  
  // Capacity
  capacity: {
    adults: {
      type: Number,
      required: [true, 'Please specify adult capacity'],
      min: 1,
      max: 10
    },
    children: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    infants: {
      type: Number,
      default: 0,
      min: 0,
      max: 3
    }
  },
  
  // Room Specifications
  specifications: {
    size: {
      value: Number,
      unit: {
        type: String,
        enum: ['sqft', 'sqm'],
        default: 'sqft'
      }
    },
    bedType: {
      type: String,
      enum: ['single', 'double', 'queen', 'king', 'twin', 'sofa_bed', 'bunk_bed'],
      required: true
    },
    bedCount: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    bathrooms: {
      type: Number,
      default: 1,
      min: 1,
      max: 3
    },
    floor: Number,
    view: {
      type: String,
      enum: ['city', 'ocean', 'mountain', 'garden', 'pool', 'courtyard', 'street', 'interior']
    },
    balcony: {
      type: Boolean,
      default: false
    },
    smokingAllowed: {
      type: Boolean,
      default: false
    }
  },
  
  // Amenities
  amenities: [{
    name: {
      type: String,
      required: true
    },
    icon: String,
    category: {
      type: String,
      enum: ['comfort', 'technology', 'bathroom', 'entertainment', 'food_beverage', 'other'],
      default: 'other'
    },
    description: String,
    available: {
      type: Boolean,
      default: true
    }
  }],
  
  // Pricing
  pricing: {
    basePrice: {
      type: Number,
      required: [true, 'Please add a base price']
    },
    currency: {
      type: String,
      default: 'USD'
    },
    priceType: {
      type: String,
      enum: ['per_night', 'per_hour', 'per_week', 'per_month'],
      default: 'per_night'
    },
    seasonalPricing: [{
      season: {
        type: String,
        enum: ['peak', 'high', 'regular', 'low'],
        required: true
      },
      startDate: Date,
      endDate: Date,
      price: {
        type: Number,
        required: true
      },
      description: String
    }],
    weekendSurcharge: {
      percentage: Number,
      amount: Number
    },
    holidaySurcharge: {
      percentage: Number,
      amount: Number
    },
    taxes: [{
      name: String,
      type: {
        type: String,
        enum: ['percentage', 'fixed'],
        default: 'percentage'
      },
      value: Number,
      description: String
    }],
    discounts: [{
      name: String,
      type: {
        type: String,
        enum: ['percentage', 'fixed'],
        default: 'percentage'
      },
      value: Number,
      conditions: String,
      validFrom: Date,
      validTo: Date,
      isActive: {
        type: Boolean,
        default: true
      }
    }]
  },
  
  // Images
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String,
    category: {
      type: String,
      enum: ['bedroom', 'bathroom', 'balcony', 'view', 'amenity', 'other'],
      default: 'other'
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  
  // Availability
  availability: {
    status: {
      type: String,
      enum: ['available', 'occupied', 'maintenance', 'out_of_order'],
      default: 'available'
    },
    blockedDates: [{
      startDate: Date,
      endDate: Date,
      reason: String,
      type: {
        type: String,
        enum: ['maintenance', 'renovation', 'private_event', 'other'],
        default: 'maintenance'
      }
    }],
    minimumStay: {
      type: Number,
      default: 1
    },
    maximumStay: {
      type: Number,
      default: 30
    },
    advanceBookingDays: {
      type: Number,
      default: 365
    }
  },
  
  // Booking Rules
  bookingRules: {
    instantBooking: {
      type: Boolean,
      default: false
    },
    requiresApproval: {
      type: Boolean,
      default: false
    },
    cancellationPolicy: {
      type: String,
      enum: ['flexible', 'moderate', 'strict', 'super_strict'],
      default: 'moderate'
    },
    checkInTime: {
      earliest: {
        type: String,
        default: '3:00 PM'
      },
      latest: {
        type: String,
        default: '11:00 PM'
      }
    },
    checkOutTime: {
      type: String,
      default: '12:00 PM'
    },
    specialRequests: {
      allowed: {
        type: Boolean,
        default: true
      },
      maxLength: {
        type: Number,
        default: 500
      }
    }
  },
  
  // Services Included
  includedServices: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    category: {
      type: String,
      enum: ['housekeeping', 'concierge', 'food_beverage', 'transportation', 'wellness', 'other'],
      default: 'other'
    }
  }],
  
  // Additional Services (Chargeable)
  additionalServices: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    price: {
      amount: Number,
      type: {
        type: String,
        enum: ['per_use', 'per_day', 'per_hour', 'per_person'],
        default: 'per_use'
      }
    },
    category: {
      type: String,
      enum: ['food_beverage', 'laundry', 'transportation', 'wellness', 'entertainment', 'other'],
      default: 'other'
    },
    available: {
      type: Boolean,
      default: true
    }
  }],
  
  // Room Status
  housekeeping: {
    status: {
      type: String,
      enum: ['clean', 'dirty', 'out_of_order', 'maintenance'],
      default: 'clean'
    },
    lastCleaned: Date,
    nextScheduledCleaning: Date,
    notes: String
  },
  
  // Maintenance
  maintenance: {
    lastInspection: Date,
    nextScheduledMaintenance: Date,
    issues: [{
      description: String,
      priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
      },
      reportedDate: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['reported', 'in_progress', 'resolved'],
        default: 'reported'
      },
      resolvedDate: Date
    }]
  },
  
  // Analytics
  analytics: {
    totalBookings: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    occupancyRate: {
      type: Number,
      default: 0
    },
    averageDailyRate: {
      type: Number,
      default: 0
    }
  },
  
  // Status
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for total capacity
RoomSchema.virtual('totalCapacity').get(function() {
  return this.capacity.adults + this.capacity.children + this.capacity.infants;
});

// Virtual for current price (considering seasonal pricing)
RoomSchema.virtual('currentPrice').get(function() {
  const today = new Date();
  
  // Check for seasonal pricing
  const seasonalPrice = this.pricing.seasonalPricing.find(season => {
    return season.startDate <= today && season.endDate >= today;
  });
  
  if (seasonalPrice) {
    return seasonalPrice.price;
  }
  
  return this.pricing.basePrice;
});

// Virtual for availability status text
RoomSchema.virtual('availabilityText').get(function() {
  const statusMap = {
    available: 'Available',
    occupied: 'Occupied',
    maintenance: 'Under Maintenance',
    out_of_order: 'Out of Order'
  };
  return statusMap[this.availability.status] || 'Unknown';
});

// Virtual for primary image
RoomSchema.virtual('primaryImage').get(function() {
  const primaryImg = this.images.find(img => img.isPrimary);
  return primaryImg ? primaryImg.url : (this.images[0] ? this.images[0].url : null);
});

// Indexes for better query performance
RoomSchema.index({ hotel: 1 });
RoomSchema.index({ roomNumber: 1, hotel: 1 }, { unique: true });
RoomSchema.index({ type: 1 });
RoomSchema.index({ 'availability.status': 1 });
RoomSchema.index({ 'pricing.basePrice': 1 });
RoomSchema.index({ isActive: 1, isPublished: 1 });
RoomSchema.index({ isFeatured: 1 });
RoomSchema.index({ createdAt: -1 });

// Text index for search functionality
RoomSchema.index({
  name: 'text',
  description: 'text',
  'amenities.name': 'text'
});

module.exports = mongoose.model('Room', RoomSchema);

