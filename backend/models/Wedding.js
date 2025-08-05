const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  date: { type: String },
  client: { type: String },
  featured: { type: Boolean, default: false },
});

const packageSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  includes: [{ type: String }],
  popular: { type: Boolean, default: false },
  customizable: { type: Boolean, default: true },
});

const testimonialsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  text: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  avatar: { type: String, required: true },
  location: { type: String, required: true },
  weddingDate: { type: String, required: true },
  verified: { type: Boolean, default: false },
});

const weddingVendorSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    category: { type: String, required: true },
    subcategory: { type: String },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ownerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      experience: { type: String, required: true },
      bio: { type: String, required: true },
    },
    businessInfo: {
      logo: { type: String, required: true },
      coverImage: { type: String, required: true },
      description: { type: String, required: true },
      establishedYear: { type: Number, required: true },
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
      phone: { type: String, required: true },
      email: { type: String, required: true },
      whatsapp: { type: String },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
      },
      availability: {
        monday: { type: String, required: true },
        tuesday: { type: String, required: true },
        wednesday: { type: String, required: true },
        thursday: { type: String, required: true },
        friday: { type: String, required: true },
        saturday: { type: String, required: true },
        sunday: { type: String, required: true },
      },
    },
    services: [{ type: String }],
    specialties: [{ type: String }],
    serviceAreas: [{ type: String }],
    priceRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
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
      cancellationPolicy: { type: String, required: true },
      paymentTerms: { type: String, required: true },
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
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        backgroundImage: { type: String, required: true },
        ctaText: { type: String, required: true },
      },
      about: {
        title: { type: String, required: true },
        description: { type: String, required: true },
        experience: { type: String, required: true },
        approach: { type: String, required: true },
        whyChooseUs: [{ type: String }],
      },
      gallery: {
        featured: [{ type: String }],
        categories: [
          {
            name: { type: String, required: true },
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
    id: { type: String, unique: true, required: true },
    vendorId: { type: String, required: true },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    eventDetails: {
      type: { type: String, required: true },
      date: { type: Date, required: true },
      venue: { type: String, required: true },
      guestCount: { type: Number, required: true },
      duration: { type: String, required: true },
      specialRequests: { type: String },
    },
    packageDetails: {
      packageId: { type: Number },
      packageName: { type: String, required: true },
      customizations: [{ type: String }],
      totalAmount: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
    },
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
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
