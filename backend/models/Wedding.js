const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  image: { type: String },
  category: { type: String },
  description: { type: String },
  date: { type: String },
  client: { type: String },
  featured: { type: Boolean, default: false },
});

const packageSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  duration: { type: String },
  includes: [{ type: String }],
  popular: { type: Boolean, default: false },
  customizable: { type: Boolean, default: true },
});

const testimonialsSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  text: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  avatar: { type: String },
  location: { type: String },
  weddingDate: { type: String },
  verified: { type: Boolean, default: false },
});

const weddingVendorSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String },
    slug: { type: String, unique: true },
    category: { type: String },
    subcategory: { type: String },
    location: { type: String },
    city: { type: String },
    state: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    ownerInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      experience: { type: String },
      bio: { type: String },
    },
    businessInfo: {
      logo: { type: String },
      coverImage: { type: String },
      description: { type: String },
      establishedYear: { type: Number },
      website: { type: String },
      socialMedia: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        youtube: { type: String },
        pinterest: { type: String },
      },
    },
    contact: {
      phone: { type: String },
      email: { type: String },
      whatsapp: { type: String },
      address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zipCode: { type: String },
        country: { type: String },
      },
      availability: {
        monday: { type: String },
        tuesday: { type: String },
        wednesday: { type: String },
        thursday: { type: String },
        friday: { type: String },
        saturday: { type: String },
        sunday: { type: String },
      },
    },
    services: [{ type: String }],
    specialties: [{ type: String }],
    serviceAreas: [{ type: String }],
    priceRange: {
      min: { type: Number },
      max: { type: Number },
      currency: { type: String, default: 'USD' },
    },
    packages: [packageSchema],
    portfolio: [portfolioItemSchema],
    testimonials: [testimonialsSchema],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    totalEvents: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    awards: [{ type: String }],
    certifications: [{ type: String }],
    insurance: { type: Boolean, default: false },
    bookingPolicy: {
      advanceBookingDays: { type: Number, default: 30 },
      cancellationPolicy: { type: String },
      paymentTerms: { type: String },
      depositRequired: { type: Number, default: 0 },
    },
    availability: {
      weekends: { type: Boolean, default: true },
      weekdays: { type: Boolean, default: true },
      holidays: { type: Boolean, default: true },
      blackoutDates: [{ type: Date }],
      seasonalRates: { type: Boolean, default: false },
    },
    pageContent: {
      hero: {
        title: { type: String },
        subtitle: { type: String },
        backgroundImage: { type: String },
        ctaText: { type: String },
      },
      about: {
        title: { type: String },
        description: { type: String },
        experience: { type: String },
        approach: { type: String },
        whyChooseUs: [{ type: String }],
      },
      gallery: {
        featured: [{ type: String }],
        categories: [
          {
            name: { type: String },
            images: [{ type: String }],
          },
        ],
      },
    },
    settings: {
      autoApproveReviews: { type: Boolean, default: false },
      showPricing: { type: Boolean, default: true },
      allowOnlineBooking: { type: Boolean, default: true },
      requireDeposit: { type: Boolean, default: false },
      emailNotifications: { type: Boolean, default: true },
    },
    analytics: {
      totalViews: { type: Number, default: 0 },
      totalInquiries: { type: Number, default: 0 },
      conversionRate: { type: Number, default: 0 },
      popularPackages: [{ type: String }],
      peakSeasons: [{ type: String }],
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'suspended'],
      default: 'draft',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const weddingBookingSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    vendorId: { type: String },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    eventDetails: {
      type: { type: String },
      date: { type: Date },
      venue: { type: String },
      guestCount: { type: Number },
      duration: { type: String },
      specialRequests: { type: String },
    },
    packageDetails: {
      packageId: { type: Number },
      packageName: { type: String },
      customizations: [{ type: String }],
      totalAmount: { type: Number },
      currency: { type: String, default: 'USD' },
    },
    contactInfo: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
      alternatePhone: { type: String },
      preferredContact: {
        type: String,
        enum: ['email', 'phone', 'whatsapp'],
        default: 'email',
      },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled', 'completed'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'deposit_paid', 'fully_paid', 'refunded'],
      default: 'pending',
    },
    notes: { type: String },
    bookingDate: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
weddingVendorSchema.index({ slug: 1 });
weddingVendorSchema.index({ owner: 1 });
weddingVendorSchema.index({ category: 1 });
weddingVendorSchema.index({ city: 1 });
weddingVendorSchema.index({ featured: 1 });
weddingVendorSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

weddingBookingSchema.index({ vendorId: 1 });
weddingBookingSchema.index({ clientId: 1 });
weddingBookingSchema.index({ 'eventDetails.date': 1 });
weddingBookingSchema.index({ status: 1 });

const WeddingVendor = mongoose.model('WeddingVendor', weddingVendorSchema);
const WeddingBooking = mongoose.model('WeddingBooking', weddingBookingSchema);

module.exports = {
  WeddingVendor,
  WeddingBooking,
};
