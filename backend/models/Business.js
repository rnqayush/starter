const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    type: {
      type: String,
    },
    category: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    primaryColor: {
      type: String,
      default: '#e91e63',
    },
    secondaryColor: {
      type: String,
      default: '#f8bbd9',
    },
    logo: {
      type: String,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    tagline: {
      type: String,
      default: '',
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
    },
    description: {
      type: String,
    },
    features: [
      {
        type: String,
      },
    ],
    hero: {
      title: { type: String },
      subtitle: { type: String },
      backgroundImage: { type: String },
      ctaText: { type: String },
    },
    about: {
      title: { type: String },
      description: { type: String },
      extendedDescription: { type: String },
      experience: { type: String },
      completedServices: { type: String },
      satisfiedClients: { type: String },
      averageRating: { type: String },
      stats: [
        {
          number: { type: String },
          label: { type: String },
        },
      ],
      ownerImage: { type: String },
      ownerName: { type: String },
      ownerTitle: { type: String },
      ownerBio: { type: String },
    },
    services: [
      {
        id: { type: Number },
        name: { type: String },
        description: { type: String },
        price: { type: Number },
        duration: { type: String },
        image: { type: String },
        popular: { type: Boolean, default: false },
      },
    ],
    gallery: [
      {
        id: { type: Number },
        title: { type: String },
        image: { type: String },
        category: { type: String },
      },
    ],
    testimonials: [
      {
        id: { type: Number },
        name: { type: String },
        text: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        avatar: { type: String },
        service: { type: String },
        date: { type: String },
      },
    ],
    team: [
      {
        id: { type: Number },
        name: { type: String },
        role: { type: String },
        bio: { type: String },
        image: { type: String },
        experience: { type: String },
        specialties: [{ type: String }],
        availability: { type: String },
      },
    ],
    contact: {
      phone: { type: String },
      email: { type: String },
      hours: {
        monday: { type: String },
        tuesday: { type: String },
        wednesday: { type: String },
        thursday: { type: String },
        friday: { type: String },
        saturday: { type: String },
        sunday: { type: String },
      },
      socialMedia: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' },
      },
    },
    bookingSystem: {
      enabled: { type: Boolean, default: true },
      advanceBookingDays: { type: Number, default: 30 },
      timeSlots: [
        {
          time: { type: String },
          available: { type: Boolean, default: true },
        },
      ],
      blackoutDates: [{ type: Date }],
    },
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
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

// Indexes for better performance
businessSchema.index({ slug: 1 });
businessSchema.index({ owner: 1 });
businessSchema.index({ category: 1 });
businessSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

module.exports = mongoose.model('Business', businessSchema);
