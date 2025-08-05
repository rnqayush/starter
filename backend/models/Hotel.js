const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  type: { type: String },
  description: { type: String },
  price: { type: Number },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  maxGuests: { type: Number },
  bedType: { type: String },
  roomSize: { type: String },
  image: { type: String },
  images: [{ type: String }],
  amenities: [{ type: String }],
  isAvailable: { type: Boolean, default: true },
  totalRooms: { type: Number },
  availableRooms: { type: Number },
  features: [
    {
      icon: { type: String },
      name: { type: String },
    },
  ],
  policies: [{ type: String }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
});

const hotelSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
    },
    slug: {
      type: String,
      unique: true,
    },
    location: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    website: {
      type: String,
      default: '',
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    starRating: {
      type: Number,
      min: 1,
      max: 5,
    },
    image: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    checkInTime: {
      type: String,
    },
    checkOutTime: {
      type: String,
    },
    policies: [
      {
        type: String,
      },
    ],
    startingPrice: {
      type: Number,
    },
    totalRooms: {
      type: Number,
    },
    availableRooms: {
      type: Number,
    },
    ownerId: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sections: {
      hero: {
        title: { type: String },
        subtitle: { type: String },
        backgroundImage: { type: String },
        ctaText: { type: String },
        quickInfo: [
          {
            icon: { type: String },
            label: { type: String },
            value: { type: String },
          },
        ],
      },
      about: {
        title: { type: String },
        description: { type: String },
        features: [
          {
            icon: { type: String },
            title: { type: String },
            description: { type: String },
          },
        ],
        stats: [
          {
            number: { type: String },
            label: { type: String },
          },
        ],
        images: [{ type: String }],
      },
      amenities: [
        {
          category: { type: String },
          items: [
            {
              icon: { type: String },
              name: { type: String },
              description: { type: String },
            },
          ],
        },
      ],
      dining: [
        {
          id: { type: Number },
          name: { type: String },
          type: { type: String },
          description: { type: String },
          image: { type: String },
          cuisine: { type: String },
          timings: { type: String },
          priceRange: { type: String },
          features: [{ type: String }],
          specialties: [{ type: String }],
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
          location: { type: String },
          stayDate: { type: String },
          verified: { type: Boolean, default: false },
        },
      ],
      contact: {
        address: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
        phone: { type: String },
        email: { type: String },
        website: { type: String },
        socialMedia: {
          facebook: { type: String, default: '' },
          instagram: { type: String, default: '' },
          twitter: { type: String, default: '' },
          linkedin: { type: String, default: '' },
        },
        coordinates: {
          lat: { type: Number },
          lng: { type: Number },
        },
      },
    },
    rooms: [roomSchema],
    coordinates: {
      lat: { type: Number },
      lng: { type: Number },
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
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better performance
hotelSchema.index({ slug: 1 });
hotelSchema.index({ owner: 1 });
hotelSchema.index({ city: 1 });
hotelSchema.index({ 'coordinates.lat': 1, 'coordinates.lng': 1 });

module.exports = mongoose.model('Hotel', hotelSchema);
