const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  condition: {
    type: String,
    enum: ['new', 'used', 'certified'],
    required: true,
  },
  category: {
    id: { type: String, required: true },
    name: { type: String, required: true },
  },
  description: { type: String, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  pricing: {
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    onSale: { type: Boolean, default: false },
    salePrice: { type: Number },
    currency: { type: String, default: 'USD' },
    negotiable: { type: Boolean, default: false },
  },
  specifications: {
    engine: {
      type: { type: String, required: true },
      displacement: { type: String, required: true },
      power: { type: String, required: true },
      torque: { type: String, required: true },
      fuelType: { type: String, required: true },
    },
    transmission: {
      type: { type: String, required: true },
      gears: { type: Number, required: true },
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
    location: { type: String, required: true },
  },
  mileage: { type: Number },
  vin: { type: String, unique: true, sparse: true },
  bodyType: { type: String, required: true },
  drivetrain: { type: String, required: true },
  color: {
    exterior: { type: String, required: true },
    interior: { type: String, required: true },
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
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  vehicleCount: { type: Number, default: 0 },
  slug: { type: String, required: true },
  featured: { type: Boolean, default: false },
  subcategories: [{ type: String }],
});

const automobileSchema = new mongoose.Schema(
  {
    data: {
      vendor: {
        id: { type: String, unique: true, required: true },
        name: { type: String, required: true },
        slug: { type: String, unique: true, required: true },
        category: { type: String, default: 'automobiles' },
        status: {
          type: String,
          enum: ['active', 'inactive'],
          default: 'active',
        },
        verified: { type: Boolean, default: false },
        owner: {
          id: { type: String, required: true },
          name: { type: String, required: true },
          email: { type: String, required: true },
          phone: { type: String, required: true },
          avatar: { type: String },
          businessLicense: { type: String, required: true },
          joinedDate: { type: String, required: true },
          verified: { type: Boolean, default: false },
          permissions: [{ type: String }],
          mongoUserId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
          },
        },
        businessInfo: {
          logo: { type: String, required: true },
          coverImage: { type: String, required: true },
          description: { type: String, required: true },
          establishedYear: { type: Number, required: true },
          licenseNumber: { type: String, required: true },
          taxId: { type: String, required: true },
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
              id: { type: Number, required: true },
              name: { type: String, required: true },
              url: { type: String, required: true },
              visible: { type: Boolean, default: true },
              order: { type: Number, required: true },
            },
          ],
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
            coordinates: {
              lat: { type: Number, required: true },
              lng: { type: Number, required: true },
            },
          },
          hours: {
            monday: { type: String, required: true },
            tuesday: { type: String, required: true },
            wednesday: { type: String, required: true },
            thursday: { type: String, required: true },
            friday: { type: String, required: true },
            saturday: { type: String, required: true },
            sunday: { type: String, required: true },
          },
        },
        specialties: [{ type: String }],
        certifications: [{ type: String }],
        paymentMethods: [{ type: String }],
        services: [
          {
            id: { type: String, required: true },
            name: { type: String, required: true },
            description: { type: String, required: true },
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
