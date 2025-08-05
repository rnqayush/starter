const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  images: [{ type: String }],
  pricing: {
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: Number, default: 0 },
    onSale: { type: Boolean, default: false },
    salePrice: { type: Number },
    currency: { type: String, default: 'USD' }
  },
  availability: {
    status: { 
      type: String, 
      enum: ['in_stock', 'out_of_stock', 'limited_stock', 'pre_order'],
      default: 'in_stock'
    },
    quantity: { type: Number, required: true },
    lowStockThreshold: { type: Number, default: 5 }
  },
  specifications: [{
    key: { type: String, required: true },
    value: { type: String, required: true }
  }],
  features: [{ type: String }],
  tags: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  reviewCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  brand: { type: String, required: true },
  model: { type: String },
  sku: { type: String, unique: true, required: true },
  weight: { type: Number },
  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number }
  },
  warranty: { type: String },
  shippingInfo: {
    freeShipping: { type: Boolean, default: false },
    shippingCost: { type: Number, default: 0 },
    estimatedDelivery: { type: String }
  }
});

const categorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  productCount: { type: Number, default: 0 },
  slug: { type: String, required: true },
  featured: { type: Boolean, default: false },
  subcategories: [{ type: String }]
});

const ecommerceSchema = new mongoose.Schema({
  vendor: {
    id: { type: String, unique: true, required: true },
    slug: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    category: { type: String, default: 'ecommerce' },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    businessInfo: {
      logo: { type: String, required: true },
      description: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      website: { type: String },
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        coordinates: {
          lat: { type: Number, required: true },
          lng: { type: Number, required: true }
        }
      },
      hours: {
        monday: { type: String, required: true },
        tuesday: { type: String, required: true },
        wednesday: { type: String, required: true },
        thursday: { type: String, required: true },
        friday: { type: String, required: true },
        saturday: { type: String, required: true },
        sunday: { type: String, required: true }
      }
    },
    ownerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      since: { type: String, required: true }
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    theme: {
      primaryColor: { type: String, default: '#1e40af' },
      secondaryColor: { type: String, default: '#3b82f6' },
      backgroundColor: { type: String, default: '#f8fafc' },
      textColor: { type: String, default: '#1f2937' }
    },
    featured: { type: Boolean, default: false },
    verified: { type: Boolean, default: false },
    lastUpdated: { type: Date, default: Date.now }
  },
  pageContent: {
    sections: [{
      id: { type: String, required: true },
      type: { type: String, required: true },
      title: { type: String, required: true },
      content: { type: mongoose.Schema.Types.Mixed },
      order: { type: Number, required: true },
      visible: { type: Boolean, default: true }
    }]
  },
  categories: [categorySchema],
  products: [productSchema],
  analytics: {
    totalSales: { type: Number, default: 0 },
    totalOrders: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    avgOrderValue: { type: Number, default: 0 },
    conversionRate: { type: Number, default: 0 },
    topProducts: [{
      productId: { type: Number, required: true },
      name: { type: String, required: true },
      sales: { type: Number, required: true }
    }],
    salesData: [{
      date: { type: String, required: true },
      sales: { type: Number, required: true },
      orders: { type: Number, required: true }
    }],
    categoryPerformance: [{
      category: { type: String, required: true },
      sales: { type: Number, required: true },
      orders: { type: Number, required: true }
    }]
  },
  settings: {
    currency: { type: String, default: 'USD' },
    paymentMethods: [{ type: String }],
    shippingZones: [{
      name: { type: String, required: true },
      cost: { type: Number, required: true },
      freeShippingThreshold: { type: Number }
    }],
    taxes: {
      enabled: { type: Boolean, default: false },
      rate: { type: Number, default: 0 }
    },
    inventory: {
      trackQuantity: { type: Boolean, default: true },
      allowBackorders: { type: Boolean, default: false }
    }
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'suspended'],
    default: 'draft'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better performance
ecommerceSchema.index({ 'vendor.slug': 1 });
ecommerceSchema.index({ 'vendor.owner': 1 });
ecommerceSchema.index({ 'products.category': 1 });
ecommerceSchema.index({ 'products.featured': 1 });

module.exports = mongoose.model('Ecommerce', ecommerceSchema);
