const mongoose = require('mongoose');
const slugify = require('slugify');

const HotelSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Please add a hotel name'],
    trim: true,
    maxlength: [100, 'Hotel name cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  
  // Owner Information
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Location Information
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Please add a street address']
    },
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: String,
    country: {
      type: String,
      default: 'United States'
    },
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  
  // Contact Information
  contact: {
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
      match: [/^\+?[\d\s\-\(\)]+$/, 'Please add a valid phone number']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    website: String,
    fax: String
  },
  
  // Hotel Details
  description: {
    type: String,
    required: [true, 'Please add a hotel description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  
  // Ratings and Reviews
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5'],
    default: 4.5
  },
  starRating: {
    type: Number,
    min: [1, 'Star rating must be at least 1'],
    max: [5, 'Star rating cannot be more than 5'],
    required: [true, 'Please add a star rating']
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  
  // Images
  image: {
    type: String,
    default: 'default-hotel.jpg'
  },
  images: [{
    url: String,
    caption: String,
    category: {
      type: String,
      enum: ['exterior', 'interior', 'room', 'amenity', 'dining', 'other'],
      default: 'other'
    }
  }],
  
  // Check-in/Check-out
  checkInTime: {
    type: String,
    default: '3:00 PM'
  },
  checkOutTime: {
    type: String,
    default: '12:00 PM'
  },
  
  // Policies
  policies: [{
    type: String
  }],
  
  // Pricing
  startingPrice: {
    type: Number,
    required: [true, 'Please add a starting price']
  },
  currency: {
    type: String,
    default: 'USD'
  },
  
  // Room Information
  totalRooms: {
    type: Number,
    required: [true, 'Please add total number of rooms']
  },
  availableRooms: {
    type: Number,
    default: function() {
      return this.totalRooms;
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
      enum: ['general', 'business', 'wellness', 'dining', 'entertainment', 'connectivity'],
      default: 'general'
    },
    description: String,
    available: {
      type: Boolean,
      default: true
    },
    chargeable: {
      type: Boolean,
      default: false
    },
    price: Number
  }],
  
  // Services
  services: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    category: {
      type: String,
      enum: ['concierge', 'transportation', 'dining', 'wellness', 'business', 'entertainment'],
      default: 'concierge'
    },
    available: {
      type: Boolean,
      default: true
    },
    hours: {
      start: String,
      end: String,
      allDay: {
        type: Boolean,
        default: false
      }
    },
    chargeable: {
      type: Boolean,
      default: false
    },
    price: Number
  }],
  
  // Dining Options
  dining: [{
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['restaurant', 'bar', 'cafe', 'room_service', 'buffet'],
      required: true
    },
    cuisine: String,
    description: String,
    hours: {
      breakfast: { start: String, end: String },
      lunch: { start: String, end: String },
      dinner: { start: String, end: String }
    },
    priceRange: {
      min: Number,
      max: Number
    },
    image: String,
    featured: {
      type: Boolean,
      default: false
    }
  }],
  
  // Hero Section for Website
  hero: {
    title: String,
    subtitle: String,
    backgroundImage: String,
    ctaText: {
      type: String,
      default: 'Book Your Room'
    },
    quickInfo: [{
      icon: String,
      label: String,
      value: String
    }]
  },
  
  // About Section
  about: {
    title: {
      type: String,
      default: 'About Our Hotel'
    },
    description: String,
    highlights: [String],
    history: String,
    awards: [String]
  },
  
  // Location Details
  locationDetails: {
    nearbyAttractions: [{
      name: String,
      distance: String,
      description: String,
      category: {
        type: String,
        enum: ['tourist', 'business', 'shopping', 'dining', 'entertainment', 'transport']
      }
    }],
    transportation: {
      airport: {
        name: String,
        distance: String,
        travelTime: String
      },
      trainStation: {
        name: String,
        distance: String,
        travelTime: String
      },
      busStation: {
        name: String,
        distance: String,
        travelTime: String
      }
    }
  },
  
  // Special Offers
  offers: [{
    title: {
      type: String,
      required: true
    },
    description: String,
    discountType: {
      type: String,
      enum: ['percentage', 'fixed', 'free_nights', 'upgrade'],
      required: true
    },
    discountValue: Number,
    validFrom: Date,
    validTo: Date,
    conditions: [String],
    isActive: {
      type: Boolean,
      default: true
    }
  }],
  
  // Business Information
  businessInfo: {
    established: Date,
    ownership: {
      type: String,
      enum: ['independent', 'chain', 'franchise'],
      default: 'independent'
    },
    chainName: String,
    managementCompany: String,
    licenses: [String]
  },
  
  // Status and Settings
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  
  // Booking Settings
  bookingSettings: {
    instantBooking: {
      type: Boolean,
      default: false
    },
    advanceBookingDays: {
      type: Number,
      default: 365
    },
    minimumStay: {
      type: Number,
      default: 1
    },
    maximumStay: {
      type: Number,
      default: 30
    },
    cancellationPolicy: {
      type: String,
      enum: ['flexible', 'moderate', 'strict'],
      default: 'moderate'
    },
    paymentMethods: [{
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash']
    }]
  },
  
  // Analytics
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    bookings: {
      type: Number,
      default: 0
    },
    revenue: {
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
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create hotel slug from the name
HotelSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Virtual for full address
HotelSchema.virtual('fullAddress').get(function() {
  if (!this.address) return '';
  const { street, city, state, pincode, country } = this.address;
  return [street, city, state, pincode, country].filter(Boolean).join(', ');
});

// Virtual for occupancy percentage
HotelSchema.virtual('occupancyPercentage').get(function() {
  if (this.totalRooms === 0) return 0;
  const occupiedRooms = this.totalRooms - this.availableRooms;
  return Math.round((occupiedRooms / this.totalRooms) * 100);
});

// Virtual for availability status
HotelSchema.virtual('availabilityStatus').get(function() {
  const percentage = this.occupancyPercentage;
  if (percentage >= 95) return 'fully_booked';
  if (percentage >= 80) return 'limited_availability';
  if (percentage >= 50) return 'good_availability';
  return 'high_availability';
});

// Indexes for better query performance
HotelSchema.index({ slug: 1 });
HotelSchema.index({ owner: 1 });
HotelSchema.index({ 'address.city': 1, 'address.state': 1 });
HotelSchema.index({ isActive: 1, isPublished: 1 });
HotelSchema.index({ isFeatured: 1 });
HotelSchema.index({ rating: -1 });
HotelSchema.index({ startingPrice: 1 });
HotelSchema.index({ starRating: -1 });
HotelSchema.index({ createdAt: -1 });

// Geospatial index for location-based queries
HotelSchema.index({ 'address.coordinates': '2dsphere' });

// Text index for search functionality
HotelSchema.index({
  name: 'text',
  description: 'text',
  location: 'text',
  'amenities.name': 'text',
  'services.name': 'text'
});

module.exports = mongoose.model('Hotel', HotelSchema);

