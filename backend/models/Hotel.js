const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  maxGuests: { type: Number, required: true },
  bedType: { type: String, required: true },
  roomSize: { type: String, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  amenities: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  totalRooms: { type: Number, required: true },
  availableRooms: { type: Number, required: true },
  features: [{
    icon: { type: String, required: true },
    name: { type: String, required: true }
  }],
  policies: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 }
});

const hotelSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  pincode: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  website: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  starRating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  checkInTime: {
    type: String,
    required: true
  },
  checkOutTime: {
    type: String,
    required: true
  },
  policies: [{
    type: String
  }],
  startingPrice: {
    type: Number,
    required: true
  },
  totalRooms: {
    type: Number,
    required: true
  },
  availableRooms: {
    type: Number,
    required: true
  },
  ownerId: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  sections: {
    hero: {
      title: { type: String, required: true },
      subtitle: { type: String, required: true },
      backgroundImage: { type: String, required: true },
      ctaText: { type: String, required: true },
      quickInfo: [{
        icon: { type: String, required: true },
        label: { type: String, required: true },
        value: { type: String, required: true }
      }]
    },
    about: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      features: [{
        icon: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true }
      }],
      stats: [{
        number: { type: String, required: true },
        label: { type: String, required: true }
      }],
      images: [{ type: String }]
    },
    amenities: [{
      category: { type: String, required: true },
      items: [{
        icon: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String }
      }]
    }],
    dining: [{
      id: { type: Number, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
      description: { type: String, required: true },
      image: { type: String, required: true },
      cuisine: { type: String, required: true },
      timings: { type: String, required: true },
      priceRange: { type: String, required: true },
      features: [{ type: String }],
      specialties: [{ type: String }]
    }],
    gallery: [{
      id: { type: Number, required: true },
      title: { type: String, required: true },
      image: { type: String, required: true },
      category: { type: String, required: true }
    }],
    testimonials: [{
      id: { type: Number, required: true },
      name: { type: String, required: true },
      text: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      avatar: { type: String, required: true },
      location: { type: String, required: true },
      stayDate: { type: String, required: true },
      verified: { type: Boolean, default: false }
    }],
    contact: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      website: { type: String },
      socialMedia: {
        facebook: { type: String, default: '' },
        instagram: { type: String, default: '' },
        twitter: { type: String, default: '' },
        linkedin: { type: String, default: '' }
      },
      coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
      }
    }
  },
  rooms: [roomSchema],
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'suspended'],
    default: 'draft'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for better performance
hotelSchema.index({ slug: 1 });
hotelSchema.index({ owner: 1 });
hotelSchema.index({ city: 1 });
hotelSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

module.exports = mongoose.model('Hotel', hotelSchema);
