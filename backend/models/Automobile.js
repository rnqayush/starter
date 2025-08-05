const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  make: { type: String },
  model: { type: String },
  year: { type: Number },
  condition: {
    type: String,
    enum: ['new', 'used', 'certified'],
  },
  category: {
    id: { type: String },
    name: { type: String },
  },
  description: { type: String },
  image: { type: String },
  images: [{ type: String }],
  pricing: {
    price: { type: Number },
    originalPrice: { type: Number },
    onSale: { type: Boolean, default: false },
    salePrice: { type: Number },
    currency: { type: String, default: 'USD' },
    negotiable: { type: Boolean, default: false },
  },
  specifications: {
    engine: {
      type: { type: String },
      displacement: { type: String },
      power: { type: String },
      torque: { type: String },
      fuelType: { type: String },
    },
    transmission: {
      type: { type: String },
      gears: { type: Number },
    },
    performance: {
      topSpeed: { type: String },
      acceleration: { type: String },
      fuelEconomy: {
        city: { type: String },
        highway: { type: String },
        combined: { type: String },
      },
    },
    dimensions: {
      length: { type: String },
      width: { type: String },
      height: { type: String },
      wheelbase: { type: String },
      weight: { type: String },
    },
    features: {
      exterior: [{ type: String }],
      interior: [{ type: String }],
      safety: [{ type: String }],
      technology: [{ type: String }],
    },
  },
  availability: {
    status: {
      type: String,
      enum: ['in_stock', 'limited_stock', 'out_of_stock', 'pre_order', 'sold'],
      default: 'in_stock',
    },
    quantity: { type: Number, default: 1 },
    location: { type: String },
  },
  mileage: { type: Number },
  vin: { type: String, unique: true, sparse: true },
  bodyType: { type: String },
  drivetrain: { type: String },
  color: {
    exterior: { type: String },
    interior: { type: String },
  },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  history: {
    accidents: { type: Number, default: 0 },
    owners: { type: Number, default: 1 },
    serviceHistory: [{ type: String }],
    warranties: [{ type: String }],
  },
});

const categorySchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  description: { type: String },
  image: { type: String },
  vehicleCount: { type: Number, default: 0 },
  slug: { type: String },
  featured: { type: Boolean, default: false },
  subcategories: [{ type: String }],
});

const automobileSchema = new mongoose.Schema(
  {
    data: {
      vendor: {
        id: { type: String, unique: true },
        name: { type: String },
        slug: { type: String, unique: true },
        category: { type: String, default: 'automobiles' },
        status: {
          type: String,
          enum: ['active', 'inactive'],
          default: 'active',
        },
        verified: { type: Boolean, default: false },
        owner: {
          id: { type: String },
          name: { type: String },
          email: { type: String },
          phone: { type: String },
          avatar: { type: String },
          businessLicense: { type: String },
          joinedDate: { type: String },
          verified: { type: Boolean, default: false },
          permissions: [{ type: String }],
          mongoUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
        },
        businessInfo: {
          logo: { type: String },
          coverImage: { type: String },
          description: { type: String },
          establishedYear: { type: Number },
          licenseNumber: { type: String },
          taxId: { type: String },
          website: { type: String },
          socialMedia: {
            facebook: { type: String },
            instagram: { type: String },
            twitter: { type: String },
            youtube: { type: String },
            linkedin: { type: String },
          },
          quickLinks: [
            {
              id: { type: Number },
              name: { type: String },
              url: { type: String },
              visible: { type: Boolean, default: true },
              order: { type: Number },
            },
          ],
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
            coordinates: {
              lat: { type: Number },
              lng: { type: Number },
            },
          },
          hours: {
            monday: { type: String },
            tuesday: { type: String },
            wednesday: { type: String },
            thursday: { type: String },
            friday: { type: String },
            saturday: { type: String },
            sunday: { type: String },
          },
        },
        specialties: [{ type: String }],
        certifications: [{ type: String }],
        paymentMethods: [{ type: String }],
        services: [
          {
            id: { type: String },
            name: { type: String },
            description: { type: String },
            available: { type: Boolean, default: true },
          },
        ],
        settings: {
          featured: { type: Boolean, default: false },
          autoApproveReviews: { type: Boolean, default: false },
          showPricing: { type: Boolean, default: true },
          allowNegotiation: { type: Boolean, default: true },
          requireAppointment: { type: Boolean, default: false },
        },
        analytics: {
          totalViews: { type: Number, default: 0 },
          totalLeads: { type: Number, default: 0 },
          conversionRate: { type: Number, default: 0 },
          averageRating: { type: Number, default: 0 },
          totalReviews: { type: Number, default: 0 },
        },
      },
      allCategories: [categorySchema],
      allVehicles: [vehicleSchema],
    },
    success: { type: Boolean, default: true },
    timestamp: { type: Date, default: Date.now },
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
automobileSchema.index({ 'data.vendor.slug': 1 });
automobileSchema.index({ 'data.vendor.owner.mongoUserId': 1 });
automobileSchema.index({ 'data.allVehicles.category.id': 1 });
automobileSchema.index({ 'data.allVehicles.make': 1 });
automobileSchema.index({ 'data.allVehicles.featured': 1 });

module.exports = mongoose.model('Automobile', automobileSchema);
