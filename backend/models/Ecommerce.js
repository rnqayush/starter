const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  images: [{ type: String }],
  pricing: {
    price: { type: Number },
    originalPrice: { type: Number },
    discount: { type: Number, default: 0 },
    onSale: { type: Boolean, default: false },
    salePrice: { type: Number },
    currency: { type: String, default: 'USD' },
  },
  availability: {
    status: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'limited_stock', 'pre_order'],
      default: 'in_stock',
    },
    quantity: { type: Number },
    lowStockThreshold: { type: Number, default: 5 },
  },
  specifications: [
    {
      key: { type: String },
      value: { type: String },
    },
  ],
  features: [{ type: String }],
  tags: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  brand: { type: String },
  model: { type: String },
  sku: { type: String, unique: true },
  weight: { type: Number },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  warranty: { type: String },
  shippingInfo: {
    freeShipping: { type: Boolean, default: false },
    shippingCost: { type: Number, default: 0 },
    estimatedDelivery: { type: String },
  },
});

const categorySchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  description: { type: String },
  image: { type: String },
  productCount: { type: Number, default: 0 },
  slug: { type: String },
  featured: { type: Boolean, default: false },
  subcategories: [{ type: String }],
});

const ecommerceSchema = new mongoose.Schema(
  {
    vendor: {
      id: { type: String, unique: true },
      slug: { type: String, unique: true },
      name: { type: String },
      category: { type: String, default: 'ecommerce' },
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      businessInfo: {
        logo: { type: String },
        description: { type: String },
        phone: { type: String },
        email: { type: String },
        website: { type: String },
        address: {
          street: { type: String },
          city: { type: String },
          state: { type: String },
          zipCode: { type: String },
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
      ownerInfo: {
        name: { type: String },
        email: { type: String },
        phone: { type: String },
        since: { type: String },
      },
      rating: { type: Number, default: 0, min: 0, max: 5 },
      reviewCount: { type: Number, default: 0 },
      theme: {
        primaryColor: { type: String, default: '#1e40af' },
        secondaryColor: { type: String, default: '#3b82f6' },
        backgroundColor: { type: String, default: '#f8fafc' },
        textColor: { type: String, default: '#1f2937' },
      },
      featured: { type: Boolean, default: false },
      verified: { type: Boolean, default: false },
      lastUpdated: { type: Date, default: Date.now },
    },
    pageContent: {
      sections: [
        {
          id: { type: String },
          type: { type: String },
          title: { type: String },
          content: { type: mongoose.Schema.Types.Mixed },
          order: { type: Number },
          visible: { type: Boolean, default: true },
        },
      ],
    },
    categories: [categorySchema],
    products: [productSchema],
    analytics: {
      totalSales: { type: Number, default: 0 },
      totalOrders: { type: Number, default: 0 },
      totalProducts: { type: Number, default: 0 },
      avgOrderValue: { type: Number, default: 0 },
      conversionRate: { type: Number, default: 0 },
      topProducts: [
        {
          productId: { type: Number },
          name: { type: String },
          sales: { type: Number },
        },
      ],
      salesData: [
        {
          date: { type: String },
          sales: { type: Number },
          orders: { type: Number },
        },
      ],
      categoryPerformance: [
        {
          category: { type: String },
          sales: { type: Number },
          orders: { type: Number },
        },
      ],
    },
    settings: {
      currency: { type: String, default: 'USD' },
      paymentMethods: [{ type: String }],
      shippingZones: [
        {
          name: { type: String },
          cost: { type: Number },
          freeShippingThreshold: { type: Number },
        },
      ],
      taxes: {
        enabled: { type: Boolean, default: false },
        rate: { type: Number, default: 0 },
      },
      inventory: {
        trackQuantity: { type: Boolean, default: true },
        allowBackorders: { type: Boolean, default: false },
      },
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
ecommerceSchema.index({ 'vendor.slug': 1 });
ecommerceSchema.index({ 'vendor.owner': 1 });
ecommerceSchema.index({ 'products.category': 1 });
ecommerceSchema.index({ 'products.featured': 1 });

module.exports = mongoose.model('Ecommerce', ecommerceSchema);
