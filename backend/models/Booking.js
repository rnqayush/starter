const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  // Basic Information
  bookingNumber: {
    type: String,
    unique: true,
    required: true
  },
  
  // References
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  business: {
    type: mongoose.Schema.ObjectId,
    ref: 'Business'
  },
  
  // Booking Type and Resource
  bookingType: {
    type: String,
    required: [true, 'Please specify booking type'],
    enum: ['hotel', 'room', 'service', 'appointment', 'event', 'vehicle_test_drive', 'consultation', 'other']
  },
  
  // Resource References (polymorphic)
  resource: {
    resourceType: {
      type: String,
      required: true,
      enum: ['Hotel', 'Room', 'Business', 'Vehicle', 'Service']
    },
    resourceId: {
      type: mongoose.Schema.ObjectId,
      required: true,
      refPath: 'resource.resourceType'
    }
  },
  
  // Date and Time Information
  dateTime: {
    startDate: {
      type: Date,
      required: [true, 'Please add start date']
    },
    endDate: {
      type: Date,
      required: [true, 'Please add end date']
    },
    startTime: String, // for appointments/services
    endTime: String,   // for appointments/services
    duration: Number,  // in minutes
    timezone: {
      type: String,
      default: 'America/New_York'
    },
    allDay: {
      type: Boolean,
      default: false
    }
  },
  
  // Guest/Participant Information
  guests: {
    adults: {
      type: Number,
      required: true,
      min: 1,
      max: 20
    },
    children: {
      type: Number,
      default: 0,
      min: 0,
      max: 10
    },
    infants: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    }
  },
  
  // Guest Details
  guestDetails: [{
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: String,
    phone: String,
    age: Number,
    specialRequests: String,
    dietaryRestrictions: [String],
    accessibility: [String]
  }],
  
  // Contact Information
  contactInfo: {
    primaryContact: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      phone: {
        type: String,
        required: true,
        match: [/^\+?[\d\s\-\(\)]+$/, 'Please add a valid phone number']
      }
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String
    }
  },
  
  // Pricing and Payment
  pricing: {
    basePrice: {
      type: Number,
      required: true,
      min: 0
    },
    taxes: [{
      name: String,
      type: {
        type: String,
        enum: ['percentage', 'fixed'],
        default: 'percentage'
      },
      value: Number,
      amount: Number
    }],
    fees: [{
      name: String,
      description: String,
      amount: Number,
      type: {
        type: String,
        enum: ['cleaning', 'service', 'booking', 'cancellation', 'other'],
        default: 'other'
      }
    }],
    discounts: [{
      name: String,
      type: {
        type: String,
        enum: ['percentage', 'fixed', 'coupon'],
        default: 'percentage'
      },
      value: Number,
      amount: Number,
      code: String
    }],
    subtotal: Number,
    totalTaxes: Number,
    totalFees: Number,
    totalDiscounts: Number,
    totalAmount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    paidAmount: {
      type: Number,
      default: 0
    },
    remainingAmount: {
      type: Number,
      default: 0
    }
  },
  
  // Payment Information
  payment: {
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash', 'check', 'other'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'partially_refunded'],
      default: 'pending'
    },
    transactionId: String,
    paymentIntentId: String, // for Stripe
    receiptUrl: String,
    paidAt: Date,
    refundedAt: Date,
    refundAmount: Number,
    refundReason: String
  },
  
  // Booking Status
  status: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'checked_in',
      'in_progress',
      'completed',
      'cancelled',
      'no_show',
      'refunded'
    ],
    default: 'pending'
  },
  
  // Special Requests and Notes
  specialRequests: {
    type: String,
    maxlength: [1000, 'Special requests cannot be more than 1000 characters']
  },
  internalNotes: {
    type: String,
    maxlength: [2000, 'Internal notes cannot be more than 2000 characters']
  },
  
  // Services and Add-ons
  services: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    price: Number,
    quantity: {
      type: Number,
      default: 1
    },
    date: Date,
    time: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending'
    }
  }],
  
  // Check-in/Check-out (for hotels)
  checkIn: {
    expectedTime: String,
    actualTime: Date,
    staff: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    notes: String,
    keyCards: Number,
    parkingSpot: String
  },
  checkOut: {
    expectedTime: String,
    actualTime: Date,
    staff: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    notes: String,
    damages: [{
      description: String,
      cost: Number,
      images: [String]
    }],
    finalBill: Number
  },
  
  // Cancellation Information
  cancellation: {
    cancelledAt: Date,
    cancelledBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    reason: String,
    policy: {
      type: String,
      enum: ['flexible', 'moderate', 'strict', 'super_strict'],
      default: 'moderate'
    },
    refundAmount: Number,
    refundPercentage: Number,
    cancellationFee: Number
  },
  
  // Communication History
  communications: [{
    type: {
      type: String,
      enum: ['email', 'sms', 'phone', 'in_person', 'system'],
      required: true
    },
    direction: {
      type: String,
      enum: ['inbound', 'outbound'],
      required: true
    },
    subject: String,
    message: String,
    sentBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    sentAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['sent', 'delivered', 'read', 'failed'],
      default: 'sent'
    }
  }],
  
  // Reminders and Notifications
  reminders: [{
    type: {
      type: String,
      enum: ['confirmation', 'check_in', 'check_out', 'payment', 'review', 'custom'],
      required: true
    },
    scheduledFor: Date,
    sent: {
      type: Boolean,
      default: false
    },
    sentAt: Date,
    method: {
      type: String,
      enum: ['email', 'sms', 'push'],
      default: 'email'
    },
    message: String
  }],
  
  // Source and Attribution
  source: {
    channel: {
      type: String,
      enum: ['website', 'phone', 'email', 'walk_in', 'referral', 'social_media', 'third_party', 'other'],
      default: 'website'
    },
    referrer: String,
    campaign: String,
    medium: String,
    utmSource: String,
    utmMedium: String,
    utmCampaign: String
  },
  
  // Review and Feedback
  review: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    reviewedAt: Date,
    response: String,
    respondedAt: Date,
    published: {
      type: Boolean,
      default: false
    }
  },
  
  // Metadata
  metadata: {
    ipAddress: String,
    userAgent: String,
    deviceType: String,
    browserInfo: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate booking number
BookingSchema.pre('save', function(next) {
  if (!this.bookingNumber) {
    const prefix = this.bookingType.toUpperCase().substring(0, 3);
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.bookingNumber = `${prefix}-${timestamp}-${random}`;
  }
  next();
});

// Calculate remaining amount
BookingSchema.pre('save', function(next) {
  this.pricing.remainingAmount = this.pricing.totalAmount - this.pricing.paidAmount;
  next();
});

// Virtual for total guests
BookingSchema.virtual('totalGuests').get(function() {
  return this.guests.adults + this.guests.children + this.guests.infants;
});

// Virtual for booking duration in days
BookingSchema.virtual('durationDays').get(function() {
  if (this.dateTime.startDate && this.dateTime.endDate) {
    const diffTime = Math.abs(this.dateTime.endDate - this.dateTime.startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return 0;
});

// Virtual for booking duration in hours
BookingSchema.virtual('durationHours').get(function() {
  if (this.dateTime.duration) {
    return Math.round(this.dateTime.duration / 60);
  }
  if (this.dateTime.startDate && this.dateTime.endDate) {
    const diffTime = Math.abs(this.dateTime.endDate - this.dateTime.startDate);
    return Math.round(diffTime / (1000 * 60 * 60));
  }
  return 0;
});

// Virtual for payment status
BookingSchema.virtual('paymentComplete').get(function() {
  return this.pricing.paidAmount >= this.pricing.totalAmount;
});

// Virtual for booking status text
BookingSchema.virtual('statusText').get(function() {
  const statusMap = {
    pending: 'Pending Confirmation',
    confirmed: 'Confirmed',
    checked_in: 'Checked In',
    in_progress: 'In Progress',
    completed: 'Completed',
    cancelled: 'Cancelled',
    no_show: 'No Show',
    refunded: 'Refunded'
  };
  return statusMap[this.status] || 'Unknown';
});

// Virtual for days until booking
BookingSchema.virtual('daysUntilBooking').get(function() {
  if (this.dateTime.startDate) {
    const today = new Date();
    const diffTime = this.dateTime.startDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Indexes for better query performance
BookingSchema.index({ bookingNumber: 1 });
BookingSchema.index({ customer: 1 });
BookingSchema.index({ business: 1 });
BookingSchema.index({ 'resource.resourceType': 1, 'resource.resourceId': 1 });
BookingSchema.index({ bookingType: 1 });
BookingSchema.index({ status: 1 });
BookingSchema.index({ 'payment.status': 1 });
BookingSchema.index({ 'dateTime.startDate': 1 });
BookingSchema.index({ 'dateTime.endDate': 1 });
BookingSchema.index({ createdAt: -1 });

// Compound indexes
BookingSchema.index({ customer: 1, status: 1 });
BookingSchema.index({ business: 1, status: 1 });
BookingSchema.index({ 'dateTime.startDate': 1, status: 1 });
BookingSchema.index({ bookingType: 1, status: 1 });

// Text index for search functionality
BookingSchema.index({
  bookingNumber: 'text',
  'contactInfo.primaryContact.name': 'text',
  'contactInfo.primaryContact.email': 'text',
  specialRequests: 'text'
});

module.exports = mongoose.model('Booking', BookingSchema);

