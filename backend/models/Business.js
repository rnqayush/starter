const mongoose = require('mongoose');

const businessSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
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
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
    description: {
      type: String,
      required: true,
    },
    features: [
      {
        type: String,
      },
    ],
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      backgroundImage: { type: String, required: true },
      ctaText: { type: String, required: true },
    },
    about: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      extendedDescription: { type: String, required: true },
      experience: { type: String, required: true },
      completedServices: { type: String, required: true },
      satisfiedClients: { type: String, required: true },
      averageRating: { type: String, required: true },
      stats: [
        {
          number: { type: String, required: true },
          label: { type: String, required: true },
        },
      ],
      ownerImage: { type: String, required: true },
      ownerName: { type: String, required: true },
      ownerTitle: { type: String, required: true },
      ownerBio: { type: String, required: true },
    },
    services: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        duration: { type: String, required: true },
        image: { type: String, required: true },
        popular: { type: Boolean, default: false },
      },
    ],
    gallery: [
      {
        id: { type: Number, required: true },
        title: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
      },
    ],
    testimonials: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        text: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        avatar: { type: String, required: true },
        service: { type: String, required: true },
        date: { type: String, required: true },
      },
    ],
    team: [
      {
        id: { type: Number, required: true },
        name: { type: String, required: true },
        role: { type: String, required: true },
        bio: { type: String, required: true },
        image: { type: String, required: true },
        experience: { type: String, required: true },
        specialties: [{ type: String }],
        availability: { type: String, required: true },
      },
    ],
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      hours: {
        monday: { type: String, required: true },
        tuesday: { type: String, required: true },
        wednesday: { type: String, required: true },
        thursday: { type: String, required: true },
        friday: { type: String, required: true },
        saturday: { type: String, required: true },
        sunday: { type: String, required: true },
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
          time: { type: String, required: true },
          available: { type: Boolean, default: true },
        },
      ],
      blackoutDates: [{ type: Date }],
    },
    seo: {
      title: { type: String, required: true },
      description: { type: String, required: true },
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
