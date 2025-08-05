const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema({
  websiteName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[a-z0-9-]+$/
  },
  websiteType: {
    type: String,
    required: true,
    enum: ['weddings', 'hotels', 'ecommerce', 'automobiles', 'professional']
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ownerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  basicInfo: {
    tagline: { type: String, default: '' },
    themeColor: { type: String, default: '#10b981' },
    logo: { type: String, default: null },
    fullPageImage: { type: String, default: null }
  },
  publishedData: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'websiteType',
    default: null
  },
  domain: {
    subdomain: { type: String, required: true },
    customDomain: { type: String, default: null },
    ssl: { type: Boolean, default: true }
  },
  settings: {
    seo: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      keywords: [{ type: String }]
    },
    analytics: {
      googleAnalytics: { type: String, default: '' },
      facebookPixel: { type: String, default: '' }
    },
    social: {
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' }
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
  },
  publishedAt: {
    type: Date,
    default: null
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  viewCount: {
    type: Number,
    default: 0
  },
  performance: {
    loadTime: { type: Number, default: 0 },
    seoScore: { type: Number, default: 0 },
    mobileScore: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

// Indexes for better performance
websiteSchema.index({ websiteName: 1 });
websiteSchema.index({ owner: 1 });
websiteSchema.index({ websiteType: 1 });
websiteSchema.index({ status: 1 });
websiteSchema.index({ 'domain.subdomain': 1 });

// Pre-save middleware to update lastModified
websiteSchema.pre('save', function(next) {
  this.lastModified = new Date();
  next();
});

// Method to get full URL
websiteSchema.methods.getFullUrl = function() {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
  return `${baseUrl}/${this.websiteName}`;
};

// Method to increment view count
websiteSchema.methods.incrementViews = function() {
  this.viewCount += 1;
  return this.save();
};

module.exports = mongoose.model('Website', websiteSchema);
