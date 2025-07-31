const mongoose = require('mongoose');
const slugify = require('slugify');

const VehicleSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Please add a vehicle name'],
    trim: true,
    maxlength: [200, 'Vehicle name cannot be more than 200 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  
  // Dealer/Vendor Reference
  dealer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business'
  },
  
  // Vehicle Identification
  vin: {
    type: String,
    unique: true,
    sparse: true,
    match: [/^[A-HJ-NPR-Z0-9]{17}$/, 'Please provide a valid VIN number']
  },
  stockNumber: {
    type: String,
    required: [true, 'Please add a stock number'],
    unique: true
  },
  sku: String,
  
  // Vehicle Details
  make: {
    type: String,
    required: [true, 'Please add vehicle make'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Please add vehicle model'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please add vehicle year'],
    min: [1900, 'Year must be after 1900'],
    max: [new Date().getFullYear() + 2, 'Year cannot be more than 2 years in the future']
  },
  trim: String,
  
  // Category
  category: {
    primary: {
      type: String,
      required: [true, 'Please add a primary category'],
      enum: [
        'luxury-cars',
        'sports-cars',
        'electric-vehicles',
        'suv',
        'sedan',
        'coupe',
        'convertible',
        'hatchback',
        'wagon',
        'truck',
        'van',
        'motorcycle',
        'other'
      ]
    },
    secondary: String,
    bodyStyle: {
      type: String,
      enum: [
        'sedan',
        'coupe',
        'convertible',
        'hatchback',
        'wagon',
        'suv',
        'crossover',
        'pickup',
        'van',
        'minivan',
        'roadster',
        'other'
      ]
    }
  },
  
  // Condition and Mileage
  condition: {
    type: String,
    required: [true, 'Please specify vehicle condition'],
    enum: ['new', 'used', 'certified_pre_owned', 'salvage', 'rebuilt']
  },
  mileage: {
    type: Number,
    required: [true, 'Please add vehicle mileage'],
    min: [0, 'Mileage cannot be negative']
  },
  
  // Pricing Information
  pricing: {
    price: {
      type: Number,
      required: [true, 'Please add vehicle price'],
      min: [0, 'Price cannot be negative']
    },
    originalPrice: Number,
    msrp: Number,
    savings: {
      type: Number,
      default: 0
    },
    currency: {
      type: String,
      default: 'USD'
    },
    onSale: {
      type: Boolean,
      default: false
    },
    saleEndDate: Date,
    priceHistory: [{
      price: Number,
      date: {
        type: Date,
        default: Date.now
      },
      reason: String
    }],
    financing: {
      available: {
        type: Boolean,
        default: true
      },
      downPayment: Number,
      monthlyPayment: Number,
      term: Number, // in months
      apr: Number
    },
    lease: {
      available: {
        type: Boolean,
        default: false
      },
      monthlyPayment: Number,
      downPayment: Number,
      term: Number, // in months
      annualMileage: Number
    }
  },
  
  // Media
  media: {
    mainImage: {
      type: String,
      default: 'default-vehicle.jpg'
    },
    images: [{
      url: String,
      alt: String,
      type: {
        type: String,
        enum: ['exterior', 'interior', 'engine', 'lifestyle', 'other'],
        default: 'other'
      },
      primary: {
        type: Boolean,
        default: false
      }
    }],
    videos: [{
      url: String,
      title: String,
      description: String,
      thumbnail: String,
      type: {
        type: String,
        enum: ['walkthrough', 'test_drive', 'review', 'commercial'],
        default: 'walkthrough'
      }
    }]
  },
  
  // Description and Features
  description: {
    type: String,
    required: [true, 'Please add a vehicle description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  keyFeatures: [String],
  
  // Technical Specifications
  specifications: {
    engine: {
      type: {
        type: String,
        enum: [
          'gasoline',
          'diesel',
          'hybrid',
          'electric',
          'plug_in_hybrid',
          'hydrogen',
          'other'
        ]
      },
      displacement: String,
      cylinders: Number,
      horsepower: Number,
      torque: String,
      fuelType: String,
      batteryCapacity: String // for electric vehicles
    },
    performance: {
      acceleration: String, // e.g., "0-60 mph in 5.2 seconds"
      topSpeed: String,
      transmission: {
        type: String,
        enum: [
          'manual',
          'automatic',
          'cvt',
          'dual_clutch',
          'single_speed',
          'other'
        ]
      },
      drivetrain: {
        type: String,
        enum: ['fwd', 'rwd', 'awd', '4wd'],
        required: true
      }
    },
    efficiency: {
      mpgCity: Number,
      mpgHighway: Number,
      mpgCombined: Number,
      range: String, // for electric vehicles
      efficiency: String, // MPGe for electric
      chargingSpeed: String, // for electric vehicles
      fuelCapacity: String
    },
    dimensions: {
      length: String,
      width: String,
      height: String,
      wheelbase: String,
      curbWeight: String,
      seatingCapacity: {
        type: Number,
        min: 1,
        max: 15
      },
      cargoCapacity: String,
      towingCapacity: String
    }
  },
  
  // Features and Options
  features: {
    exterior: [String],
    interior: [String],
    safety: [String],
    technology: [String],
    comfort: [String],
    performance: [String]
  },
  
  // Options and Packages
  options: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    price: Number,
    category: {
      type: String,
      enum: ['exterior', 'interior', 'technology', 'performance', 'safety', 'other'],
      default: 'other'
    },
    included: {
      type: Boolean,
      default: false
    }
  }],
  
  // Availability
  availability: {
    status: {
      type: String,
      enum: ['available', 'sold', 'pending', 'reserved', 'unavailable'],
      default: 'available'
    },
    quantity: {
      type: Number,
      default: 1,
      min: 0
    },
    location: String,
    estimatedDelivery: String,
    reservationRequired: {
      type: Boolean,
      default: false
    }
  },
  
  // Reviews and Ratings
  reviews: {
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
      default: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    breakdown: {
      five: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      one: { type: Number, default: 0 }
    }
  },
  
  // Warranty Information
  warranty: {
    basic: {
      years: Number,
      miles: Number
    },
    powertrain: {
      years: Number,
      miles: Number
    },
    battery: { // for electric/hybrid vehicles
      years: Number,
      miles: Number
    },
    corrosion: {
      years: Number,
      miles: String // can be "unlimited"
    },
    roadside: {
      years: Number,
      miles: String // can be "unlimited"
    }
  },
  
  // History (for used vehicles)
  history: {
    previousOwners: Number,
    accidents: [{
      date: Date,
      description: String,
      severity: {
        type: String,
        enum: ['minor', 'moderate', 'severe']
      },
      repaired: {
        type: Boolean,
        default: false
      }
    }],
    serviceRecords: [{
      date: Date,
      mileage: Number,
      description: String,
      cost: Number,
      serviceProvider: String
    }],
    inspections: [{
      date: Date,
      type: {
        type: String,
        enum: ['safety', 'emissions', 'pre_purchase', 'other']
      },
      result: {
        type: String,
        enum: ['passed', 'failed', 'conditional']
      },
      notes: String
    }]
  },
  
  // Tags and Classification
  tags: [String],
  
  // Status Flags
  featured: {
    type: Boolean,
    default: false
  },
  certified: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  
  // SEO
  seo: {
    title: String,
    description: String,
    keywords: [String],
    ogImage: String
  },
  
  // Analytics
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    inquiries: {
      type: Number,
      default: 0
    },
    testDrives: {
      type: Number,
      default: 0
    },
    favorites: {
      type: Number,
      default: 0
    }
  },
  
  // Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived', 'sold'],
    default: 'draft'
  },
  
  // Timestamps
  publishedAt: Date,
  soldAt: Date,
  lastViewedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create vehicle slug from make, model, year
VehicleSchema.pre('save', function(next) {
  if (this.isModified('name') || this.isModified('make') || this.isModified('model') || this.isModified('year')) {
    const slugText = this.name || `${this.year} ${this.make} ${this.model}`;
    this.slug = slugify(slugText, { lower: true });
  }
  next();
});

// Calculate savings
VehicleSchema.pre('save', function(next) {
  if (this.pricing.originalPrice && this.pricing.price) {
    this.pricing.savings = this.pricing.originalPrice - this.pricing.price;
  } else if (this.pricing.msrp && this.pricing.price) {
    this.pricing.savings = this.pricing.msrp - this.pricing.price;
  }
  next();
});

// Virtual for vehicle full name
VehicleSchema.virtual('fullName').get(function() {
  return `${this.year} ${this.make} ${this.model}${this.trim ? ' ' + this.trim : ''}`;
});

// Virtual for current price (considering sale)
VehicleSchema.virtual('currentPrice').get(function() {
  if (this.pricing.onSale && this.pricing.saleEndDate && this.pricing.saleEndDate > new Date()) {
    return this.pricing.price;
  }
  return this.pricing.price;
});

// Virtual for availability status text
VehicleSchema.virtual('availabilityText').get(function() {
  const statusMap = {
    available: 'Available',
    sold: 'Sold',
    pending: 'Sale Pending',
    reserved: 'Reserved',
    unavailable: 'Unavailable'
  };
  return statusMap[this.availability.status] || 'Unknown';
});

// Virtual for primary image
VehicleSchema.virtual('primaryImage').get(function() {
  const primaryImg = this.media.images.find(img => img.primary);
  return primaryImg ? primaryImg.url : this.media.mainImage;
});

// Virtual for fuel economy combined
VehicleSchema.virtual('fuelEconomyCombined').get(function() {
  if (this.specifications.efficiency.mpgCombined) {
    return this.specifications.efficiency.mpgCombined;
  }
  if (this.specifications.efficiency.mpgCity && this.specifications.efficiency.mpgHighway) {
    return Math.round((this.specifications.efficiency.mpgCity + this.specifications.efficiency.mpgHighway) / 2);
  }
  return null;
});

// Virtual for age in years
VehicleSchema.virtual('age').get(function() {
  return new Date().getFullYear() - this.year;
});

// Indexes for better query performance
VehicleSchema.index({ slug: 1 });
VehicleSchema.index({ dealer: 1 });
VehicleSchema.index({ business: 1 });
VehicleSchema.index({ vin: 1 });
VehicleSchema.index({ stockNumber: 1 });
VehicleSchema.index({ make: 1, model: 1, year: 1 });
VehicleSchema.index({ 'category.primary': 1 });
VehicleSchema.index({ condition: 1 });
VehicleSchema.index({ 'pricing.price': 1 });
VehicleSchema.index({ 'availability.status': 1 });
VehicleSchema.index({ featured: 1 });
VehicleSchema.index({ certified: 1 });
VehicleSchema.index({ status: 1 });
VehicleSchema.index({ createdAt: -1 });
VehicleSchema.index({ publishedAt: -1 });

// Compound indexes
VehicleSchema.index({ make: 1, 'pricing.price': 1 });
VehicleSchema.index({ 'category.primary': 1, condition: 1 });
VehicleSchema.index({ dealer: 1, status: 1 });
VehicleSchema.index({ featured: 1, status: 1 });

// Text index for search functionality
VehicleSchema.index({
  name: 'text',
  make: 'text',
  model: 'text',
  description: 'text',
  keyFeatures: 'text',
  tags: 'text'
});

module.exports = mongoose.model('Vehicle', VehicleSchema);

