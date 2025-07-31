const mongoose = require('mongoose');
const slugify = require('slugify');

const BusinessSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Please add a business name'],
    trim: true,
    maxlength: [100, 'Business name cannot be more than 100 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  type: {
    type: String,
    required: [true, 'Please specify business type'],
    enum: ['business', 'personal', 'portfolio']
  },
  category: {
    type: String,
    required: [true, 'Please add a business category'],
    enum: [
      'Beauty & Wellness',
      'Healthcare',
      'Professional Services',
      'Retail',
      'Food & Beverage',
      'Technology',
      'Education',
      'Entertainment',
      'Real Estate',
      'Automotive',
      'Other'
    ]
  },
  
  // Owner Information
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Visual Branding
  primaryColor: {
    type: String,
    default: '#3b82f6'
  },
  secondaryColor: {
    type: String,
    default: '#93c5fd'
  },
  logo: {
    type: String,
    default: 'default-business-logo.jpg'
  },
  image: {
    type: String,
    default: 'default-business-image.jpg'
  },
  
  // Business Details
  tagline: {
    type: String,
    maxlength: [200, 'Tagline cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a business description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  
  // Location Information
  address: {
    street: String,
    city: {
      type: String,
      required: [true, 'Please add a city']
    },
    state: {
      type: String,
      required: [true, 'Please add a state']
    },
    zipCode: String,
    country: {
      type: String,
      default: 'United States'
    }
  },
  coordinates: {
    lat: {
      type: Number,
      required: [true, 'Please add latitude coordinates']
    },
    lng: {
      type: Number,
      required: [true, 'Please add longitude coordinates']
    }
  },
  
  // Contact Information
  contact: {
    phone: {
      type: String,
      match: [/^\+?[\d\s\-\(\)]+$/, 'Please add a valid phone number']
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    website: String
  },
  
  // Business Hours
  hours: {
    monday: { open: String, close: String, closed: { type: Boolean, default: false } },
    tuesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    wednesday: { open: String, close: String, closed: { type: Boolean, default: false } },
    thursday: { open: String, close: String, closed: { type: Boolean, default: false } },
    friday: { open: String, close: String, closed: { type: Boolean, default: false } },
    saturday: { open: String, close: String, closed: { type: Boolean, default: false } },
    sunday: { open: String, close: String, closed: { type: Boolean, default: false } }
  },
  
  // Features and Services
  features: [{
    type: String,
    enum: [
      'Online Booking',
      'Service Gallery',
      'Staff Profiles',
      'Client Reviews',
      'Online Payments',
      'Appointment Scheduling',
      'Portfolio Showcase',
      'Contact Forms',
      'Social Media Integration',
      'Blog/News',
      'E-commerce',
      'Multi-language Support'
    ]
  }],
  
  services: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    price: {
      amount: Number,
      currency: {
        type: String,
        default: 'USD'
      },
      type: {
        type: String,
        enum: ['fixed', 'starting_from', 'hourly', 'custom'],
        default: 'fixed'
      }
    },
    duration: String, // e.g., "1 hour", "30 minutes"
    category: String,
    image: String,
    featured: {
      type: Boolean,
      default: false
    }
  }],
  
  // Hero Section
  hero: {
    title: {
      type: String,
      required: [true, 'Please add a hero title']
    },
    subtitle: String,
    backgroundImage: String,
    ctaText: {
      type: String,
      default: 'Get Started'
    },
    ctaLink: String
  },
  
  // About Section
  about: {
    title: {
      type: String,
      default: 'About Us'
    },
    description: String,
    extendedDescription: String,
    experience: String,
    completedServices: String,
    satisfiedClients: String,
    averageRating: String,
    stats: [{
      number: String,
      label: String
    }],
    images: [String],
    achievements: [String],
    certifications: [String]
  },
  
  // Team Members
  team: [{
    name: {
      type: String,
      required: true
    },
    position: String,
    bio: String,
    image: String,
    specialties: [String],
    experience: String,
    contact: {
      email: String,
      phone: String
    },
    socialMedia: {
      facebook: String,
      instagram: String,
      twitter: String,
      linkedin: String
    }
  }],
  
  // Gallery
  gallery: [{
    image: {
      type: String,
      required: true
    },
    title: String,
    description: String,
    category: String,
    featured: {
      type: Boolean,
      default: false
    }
  }],
  
  // Testimonials/Reviews
  testimonials: [{
    name: {
      type: String,
      required: true
    },
    review: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    image: String,
    position: String,
    company: String,
    date: {
      type: Date,
      default: Date.now
    },
    featured: {
      type: Boolean,
      default: false
    }
  }],
  
  // Social Media
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    youtube: String,
    tiktok: String
  },
  
  // SEO and Analytics
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String],
    ogImage: String
  },
  
  // Business Metrics
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating must can not be more than 5'],
    default: 5
  },
  reviewCount: {
    type: Number,
    default: 0
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
  
  // Website Settings
  settings: {
    theme: {
      type: String,
      enum: ['modern', 'classic', 'minimal', 'creative'],
      default: 'modern'
    },
    layout: {
      type: String,
      enum: ['single-page', 'multi-page'],
      default: 'single-page'
    },
    showContactInfo: {
      type: Boolean,
      default: true
    },
    showSocialMedia: {
      type: Boolean,
      default: true
    },
    showTestimonials: {
      type: Boolean,
      default: true
    },
    showGallery: {
      type: Boolean,
      default: true
    },
    showTeam: {
      type: Boolean,
      default: true
    },
    allowBookings: {
      type: Boolean,
      default: false
    },
    allowReviews: {
      type: Boolean,
      default: true
    }
  },
  
  // Analytics
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    uniqueVisitors: {
      type: Number,
      default: 0
    },
    inquiries: {
      type: Number,
      default: 0
    },
    bookings: {
      type: Number,
      default: 0
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create business slug from the name
BusinessSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Virtual for full address
BusinessSchema.virtual('fullAddress').get(function() {
  if (!this.address) return '';
  const { street, city, state, zipCode, country } = this.address;
  return [street, city, state, zipCode, country].filter(Boolean).join(', ');
});

// Virtual for average rating calculation
BusinessSchema.virtual('averageRating').get(function() {
  if (this.testimonials && this.testimonials.length > 0) {
    const sum = this.testimonials.reduce((acc, testimonial) => acc + testimonial.rating, 0);
    return Math.round((sum / this.testimonials.length) * 10) / 10;
  }
  return this.rating;
});

// Indexes for better query performance
BusinessSchema.index({ slug: 1 });
BusinessSchema.index({ owner: 1 });
BusinessSchema.index({ category: 1 });
BusinessSchema.index({ 'address.city': 1, 'address.state': 1 });
BusinessSchema.index({ isActive: 1, isPublished: 1 });
BusinessSchema.index({ isFeatured: 1 });
BusinessSchema.index({ rating: -1 });
BusinessSchema.index({ createdAt: -1 });

// Text index for search functionality
BusinessSchema.index({
  name: 'text',
  description: 'text',
  tagline: 'text',
  'services.name': 'text',
  'services.description': 'text'
});

module.exports = mongoose.model('Business', BusinessSchema);

