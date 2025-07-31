const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema({
  // Basic Information
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [200, 'Product name cannot be more than 200 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot be more than 500 characters']
  },
  
  // Business/Vendor Reference
  vendor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business'
  },
  
  // Category Information
  category: {
    primary: {
      type: String,
      required: [true, 'Please add a primary category'],
      enum: [
        'electronics',
        'fashion',
        'home-garden',
        'sports',
        'books',
        'toys',
        'automotive',
        'health-beauty',
        'jewelry',
        'food-beverage',
        'other'
      ]
    },
    secondary: String,
    tags: [String]
  },
  
  // Pricing Information
  pricing: {
    price: {
      type: Number,
      required: [true, 'Please add a product price'],
      min: [0, 'Price cannot be negative']
    },
    originalPrice: Number,
    currency: {
      type: String,
      default: 'USD'
    },
    onSale: {
      type: Boolean,
      default: false
    },
    salePrice: Number,
    saleStartDate: Date,
    saleEndDate: Date,
    discountPercentage: Number,
    priceHistory: [{
      price: Number,
      date: {
        type: Date,
        default: Date.now
      },
      reason: String
    }],
    bulkPricing: [{
      minQuantity: Number,
      maxQuantity: Number,
      price: Number,
      discountPercentage: Number
    }]
  },
  
  // Media
  media: {
    mainImage: {
      type: String,
      default: 'default-product.jpg'
    },
    images: [{
      url: String,
      caption: String,
      altText: String,
      isPrimary: {
        type: Boolean,
        default: false
      }
    }],
    videos: [{
      url: String,
      title: String,
      description: String,
      thumbnail: String
    }]
  },
  
  // Product Specifications
  specifications: {
    brand: String,
    model: String,
    sku: {
      type: String,
      unique: true,
      sparse: true
    },
    barcode: String,
    features: [String],
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: {
        type: String,
        enum: ['cm', 'inch', 'm', 'ft'],
        default: 'cm'
      }
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ['g', 'kg', 'lb', 'oz'],
        default: 'kg'
      }
    },
    color: String,
    size: String,
    material: String,
    warranty: {
      duration: Number,
      unit: {
        type: String,
        enum: ['days', 'months', 'years'],
        default: 'months'
      },
      description: String
    },
    customAttributes: [{
      name: String,
      value: String,
      type: {
        type: String,
        enum: ['text', 'number', 'boolean', 'date'],
        default: 'text'
      }
    }]
  },
  
  // Inventory Management
  inventory: {
    quantity: {
      type: Number,
      required: [true, 'Please add product quantity'],
      min: [0, 'Quantity cannot be negative']
    },
    lowStockThreshold: {
      type: Number,
      default: 5
    },
    trackQuantity: {
      type: Boolean,
      default: true
    },
    allowBackorders: {
      type: Boolean,
      default: false
    },
    stockStatus: {
      type: String,
      enum: ['in_stock', 'low_stock', 'out_of_stock', 'discontinued'],
      default: 'in_stock'
    }
  },
  
  // Availability
  availability: {
    status: {
      type: String,
      enum: ['available', 'unavailable', 'pre_order', 'discontinued'],
      default: 'available'
    },
    availableFrom: Date,
    availableUntil: Date,
    preOrderDate: Date,
    estimatedDelivery: {
      min: Number,
      max: Number,
      unit: {
        type: String,
        enum: ['hours', 'days', 'weeks'],
        default: 'days'
      }
    }
  },
  
  // Shipping Information
  shipping: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    shippingClass: {
      type: String,
      enum: ['standard', 'heavy', 'fragile', 'hazardous', 'digital'],
      default: 'standard'
    },
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingCost: Number,
    handlingTime: {
      min: Number,
      max: Number,
      unit: {
        type: String,
        enum: ['hours', 'days'],
        default: 'days'
      }
    }
  },
  
  // Reviews and Ratings
  reviews: {
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
      default: 5
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    averageRating: {
      type: Number,
      default: 0
    },
    ratingDistribution: {
      five: { type: Number, default: 0 },
      four: { type: Number, default: 0 },
      three: { type: Number, default: 0 },
      two: { type: Number, default: 0 },
      one: { type: Number, default: 0 }
    }
  },
  
  // Product Variants
  variants: [{
    name: String,
    type: {
      type: String,
      enum: ['color', 'size', 'style', 'material', 'other'],
      default: 'other'
    },
    options: [{
      name: String,
      value: String,
      price: Number,
      sku: String,
      quantity: Number,
      image: String
    }]
  }],
  
  // Related Products
  relatedProducts: [{
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product'
    },
    relationType: {
      type: String,
      enum: ['similar', 'complementary', 'alternative', 'bundle'],
      default: 'similar'
    }
  }],
  
  // SEO
  seo: {
    title: String,
    description: String,
    keywords: [String],
    ogImage: String,
    canonicalUrl: String
  },
  
  // Product Status
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  condition: {
    type: String,
    enum: ['new', 'used', 'refurbished', 'damaged'],
    default: 'new'
  },
  
  // Flags
  featured: {
    type: Boolean,
    default: false
  },
  trending: {
    type: Boolean,
    default: false
  },
  bestseller: {
    type: Boolean,
    default: false
  },
  newArrival: {
    type: Boolean,
    default: false
  },
  
  // Analytics
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    purchases: {
      type: Number,
      default: 0
    },
    addToCart: {
      type: Number,
      default: 0
    },
    wishlist: {
      type: Number,
      default: 0
    },
    conversionRate: {
      type: Number,
      default: 0
    }
  },
  
  // Timestamps
  publishedAt: Date,
  lastViewedAt: Date,
  lastPurchasedAt: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create product slug from the name
ProductSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Update stock status based on quantity
ProductSchema.pre('save', function(next) {
  if (this.inventory.trackQuantity) {
    if (this.inventory.quantity === 0) {
      this.inventory.stockStatus = 'out_of_stock';
    } else if (this.inventory.quantity <= this.inventory.lowStockThreshold) {
      this.inventory.stockStatus = 'low_stock';
    } else {
      this.inventory.stockStatus = 'in_stock';
    }
  }
  next();
});

// Calculate discount percentage
ProductSchema.pre('save', function(next) {
  if (this.pricing.originalPrice && this.pricing.price) {
    this.pricing.discountPercentage = Math.round(
      ((this.pricing.originalPrice - this.pricing.price) / this.pricing.originalPrice) * 100
    );
  }
  next();
});

// Virtual for current price (considering sale)
ProductSchema.virtual('currentPrice').get(function() {
  if (this.pricing.onSale && this.pricing.salePrice) {
    const now = new Date();
    const saleStart = this.pricing.saleStartDate;
    const saleEnd = this.pricing.saleEndDate;
    
    if ((!saleStart || saleStart <= now) && (!saleEnd || saleEnd >= now)) {
      return this.pricing.salePrice;
    }
  }
  return this.pricing.price;
});

// Virtual for availability status
ProductSchema.virtual('isAvailable').get(function() {
  return this.availability.status === 'available' && 
         this.inventory.stockStatus !== 'out_of_stock' &&
         this.status === 'published';
});

// Virtual for primary image
ProductSchema.virtual('primaryImage').get(function() {
  const primaryImg = this.media.images.find(img => img.isPrimary);
  return primaryImg ? primaryImg.url : this.media.mainImage;
});

// Virtual for savings amount
ProductSchema.virtual('savingsAmount').get(function() {
  if (this.pricing.originalPrice && this.pricing.price) {
    return this.pricing.originalPrice - this.pricing.price;
  }
  return 0;
});

// Indexes for better query performance
ProductSchema.index({ slug: 1 });
ProductSchema.index({ vendor: 1 });
ProductSchema.index({ business: 1 });
ProductSchema.index({ 'category.primary': 1 });
ProductSchema.index({ 'pricing.price': 1 });
ProductSchema.index({ 'reviews.rating': -1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ trending: 1 });
ProductSchema.index({ bestseller: 1 });
ProductSchema.index({ newArrival: 1 });
ProductSchema.index({ 'inventory.stockStatus': 1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ publishedAt: -1 });

// Compound indexes
ProductSchema.index({ 'category.primary': 1, 'pricing.price': 1 });
ProductSchema.index({ vendor: 1, status: 1 });
ProductSchema.index({ featured: 1, status: 1 });

// Text index for search functionality
ProductSchema.index({
  name: 'text',
  description: 'text',
  shortDescription: 'text',
  'specifications.brand': 'text',
  'specifications.model': 'text',
  'category.tags': 'text'
});

module.exports = mongoose.model('Product', ProductSchema);

