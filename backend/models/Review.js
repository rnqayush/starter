const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  // Basic Information
  title: {
    type: String,
    maxlength: [200, 'Review title cannot be more than 200 characters']
  },
  comment: {
    type: String,
    required: [true, 'Please add a review comment'],
    maxlength: [2000, 'Review comment cannot be more than 2000 characters']
  },
  
  // Rating
  rating: {
    overall: {
      type: Number,
      required: [true, 'Please add an overall rating'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    // Detailed ratings for different aspects
    aspects: {
      service: {
        type: Number,
        min: 1,
        max: 5
      },
      quality: {
        type: Number,
        min: 1,
        max: 5
      },
      value: {
        type: Number,
        min: 1,
        max: 5
      },
      cleanliness: {
        type: Number,
        min: 1,
        max: 5
      },
      location: {
        type: Number,
        min: 1,
        max: 5
      },
      communication: {
        type: Number,
        min: 1,
        max: 5
      },
      amenities: {
        type: Number,
        min: 1,
        max: 5
      },
      staff: {
        type: Number,
        min: 1,
        max: 5
      }
    }
  },
  
  // References
  reviewer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  
  // What is being reviewed (polymorphic)
  reviewTarget: {
    targetType: {
      type: String,
      required: true,
      enum: ['Business', 'Hotel', 'Room', 'Product', 'Vehicle', 'Service']
    },
    targetId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: 'reviewTarget.targetType'
    }
  },
  
  // Business reference for easier querying
  business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business'
  },
  
  // Related booking (if applicable)
  booking: {
    type: mongoose.Schema.ObjectId,
    ref: 'Booking'
  },
  
  // Reviewer Information (for display purposes)
  reviewerInfo: {
    name: {
      type: String,
      required: true
    },
    avatar: String,
    location: String,
    isVerified: {
      type: Boolean,
      default: false
    },
    reviewCount: {
      type: Number,
      default: 0
    },
    memberSince: Date
  },
  
  // Review Details
  visitDate: Date,
  stayDuration: String, // e.g., "3 nights", "2 hours"
  tripType: {
    type: String,
    enum: ['business', 'leisure', 'family', 'couple', 'solo', 'group', 'other']
  },
  
  // Media
  media: {
    images: [{
      url: String,
      caption: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],
    videos: [{
      url: String,
      thumbnail: String,
      caption: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  
  // Pros and Cons
  pros: [String],
  cons: [String],
  
  // Recommendations
  wouldRecommend: {
    type: Boolean,
    default: true
  },
  recommendedFor: [{
    type: String,
    enum: ['families', 'couples', 'business_travelers', 'solo_travelers', 'groups', 'budget_conscious', 'luxury_seekers']
  }],
  
  // Review Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'flagged', 'hidden'],
    default: 'pending'
  },
  
  // Moderation
  moderation: {
    moderatedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    moderatedAt: Date,
    moderationReason: String,
    flaggedReasons: [{
      type: String,
      enum: ['inappropriate', 'spam', 'fake', 'offensive', 'irrelevant', 'other']
    }],
    flaggedBy: [{
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      reason: String,
      flaggedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  
  // Business Response
  response: {
    comment: String,
    respondedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    respondedAt: Date,
    isPublic: {
      type: Boolean,
      default: true
    }
  },
  
  // Helpfulness
  helpfulness: {
    helpful: {
      type: Number,
      default: 0
    },
    notHelpful: {
      type: Number,
      default: 0
    },
    votes: [{
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      },
      vote: {
        type: String,
        enum: ['helpful', 'not_helpful']
      },
      votedAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  
  // Verification
  verification: {
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationMethod: {
      type: String,
      enum: ['booking', 'receipt', 'email', 'phone', 'manual']
    },
    verifiedAt: Date,
    verifiedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  },
  
  // Source and Attribution
  source: {
    platform: {
      type: String,
      enum: ['website', 'mobile_app', 'email', 'third_party', 'import'],
      default: 'website'
    },
    imported: {
      type: Boolean,
      default: false
    },
    originalPlatform: String,
    originalUrl: String,
    importedAt: Date
  },
  
  // Language and Translation
  language: {
    type: String,
    default: 'en'
  },
  translations: [{
    language: String,
    title: String,
    comment: String,
    translatedAt: Date,
    translationService: String
  }],
  
  // Analytics
  analytics: {
    views: {
      type: Number,
      default: 0
    },
    shares: {
      type: Number,
      default: 0
    },
    clicks: {
      type: Number,
      default: 0
    }
  },
  
  // Featured Status
  featured: {
    type: Boolean,
    default: false
  },
  featuredUntil: Date,
  
  // Tags
  tags: [String],
  
  // Sentiment Analysis (if implemented)
  sentiment: {
    score: Number, // -1 to 1
    magnitude: Number,
    label: {
      type: String,
      enum: ['positive', 'negative', 'neutral', 'mixed']
    },
    confidence: Number
  },
  
  // Review Metrics
  metrics: {
    readTime: Number, // estimated read time in seconds
    wordCount: Number,
    characterCount: Number,
    hasImages: {
      type: Boolean,
      default: false
    },
    hasVideos: {
      type: Boolean,
      default: false
    }
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Calculate metrics before saving
ReviewSchema.pre('save', function(next) {
  if (this.isModified('comment')) {
    this.metrics.wordCount = this.comment.split(/\s+/).length;
    this.metrics.characterCount = this.comment.length;
    this.metrics.readTime = Math.ceil(this.metrics.wordCount / 200) * 60; // 200 words per minute
  }
  
  this.metrics.hasImages = this.media.images && this.media.images.length > 0;
  this.metrics.hasVideos = this.media.videos && this.media.videos.length > 0;
  
  next();
});

// Virtual for helpfulness ratio
ReviewSchema.virtual('helpfulnessRatio').get(function() {
  const total = this.helpfulness.helpful + this.helpfulness.notHelpful;
  if (total === 0) return 0;
  return Math.round((this.helpfulness.helpful / total) * 100);
});

// Virtual for review age
ReviewSchema.virtual('reviewAge').get(function() {
  const now = new Date();
  const diffTime = Math.abs(now - this.createdAt);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) return '1 day ago';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.ceil(diffDays / 30)} months ago`;
  return `${Math.ceil(diffDays / 365)} years ago`;
});

// Virtual for average aspect rating
ReviewSchema.virtual('averageAspectRating').get(function() {
  const aspects = this.rating.aspects;
  const ratings = Object.values(aspects).filter(rating => rating && rating > 0);
  
  if (ratings.length === 0) return this.rating.overall;
  
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return Math.round((sum / ratings.length) * 10) / 10;
});

// Virtual for star display
ReviewSchema.virtual('starDisplay').get(function() {
  const rating = this.rating.overall;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return {
    full: fullStars,
    half: hasHalfStar ? 1 : 0,
    empty: emptyStars,
    rating: rating
  };
});

// Virtual for review summary
ReviewSchema.virtual('summary').get(function() {
  if (this.comment.length <= 150) return this.comment;
  return this.comment.substring(0, 147) + '...';
});

// Indexes for better query performance
ReviewSchema.index({ reviewer: 1 });
ReviewSchema.index({ 'reviewTarget.targetType': 1, 'reviewTarget.targetId': 1 });
ReviewSchema.index({ business: 1 });
ReviewSchema.index({ booking: 1 });
ReviewSchema.index({ 'rating.overall': -1 });
ReviewSchema.index({ status: 1 });
ReviewSchema.index({ featured: 1 });
ReviewSchema.index({ createdAt: -1 });
ReviewSchema.index({ visitDate: -1 });

// Compound indexes
ReviewSchema.index({ business: 1, status: 1, 'rating.overall': -1 });
ReviewSchema.index({ 'reviewTarget.targetType': 1, 'reviewTarget.targetId': 1, status: 1 });
ReviewSchema.index({ reviewer: 1, createdAt: -1 });
ReviewSchema.index({ featured: 1, status: 1, createdAt: -1 });

// Text index for search functionality
ReviewSchema.index({
  title: 'text',
  comment: 'text',
  'reviewerInfo.name': 'text',
  tags: 'text'
});

module.exports = mongoose.model('Review', ReviewSchema);

