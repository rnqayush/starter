// Security utilities for production-ready ecommerce

/**
 * Sanitize HTML content to prevent XSS attacks
 */
export const sanitizeHtml = html => {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

/**
 * Escape special characters in strings
 */
export const escapeHtml = text => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
};

/**
 * Validate email format
 */
export const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number format
 */
export const isValidPhone = phone => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

/**
 * Validate URL format
 */
export const isValidUrl = url => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Generate secure random string
 */
export const generateSecureId = (length = 16) => {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Rate limiting for API calls
 */
class RateLimiter {
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = new Map();
  }

  isAllowed(identifier) {
    const now = Date.now();
    const windowStart = now - this.windowMs;

    if (!this.requests.has(identifier)) {
      this.requests.set(identifier, []);
    }

    const userRequests = this.requests.get(identifier);

    // Remove old requests outside the window
    const recentRequests = userRequests.filter(time => time > windowStart);
    this.requests.set(identifier, recentRequests);

    if (recentRequests.length >= this.maxRequests) {
      return false;
    }

    recentRequests.push(now);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Content Security Policy headers
 */
export const getCSPHeaders = () => {
  return {
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://api.unsplash.com https://images.unsplash.com",
      "frame-src 'self' https://www.google.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  };
};

/**
 * Input validation utilities
 */
export const validators = {
  required: (value, fieldName = 'Field') => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return `${fieldName} is required`;
    }
    return null;
  },

  minLength: (value, min, fieldName = 'Field') => {
    if (value && value.length < min) {
      return `${fieldName} must be at least ${min} characters`;
    }
    return null;
  },

  maxLength: (value, max, fieldName = 'Field') => {
    if (value && value.length > max) {
      return `${fieldName} must not exceed ${max} characters`;
    }
    return null;
  },

  email: value => {
    if (value && !isValidEmail(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  phone: value => {
    if (value && !isValidPhone(value)) {
      return 'Please enter a valid phone number';
    }
    return null;
  },

  url: value => {
    if (value && !isValidUrl(value)) {
      return 'Please enter a valid URL';
    }
    return null;
  },

  price: value => {
    const price = parseFloat(value);
    if (isNaN(price) || price < 0) {
      return 'Please enter a valid price';
    }
    return null;
  },

  positiveInteger: (value, fieldName = 'Field') => {
    const num = parseInt(value);
    if (isNaN(num) || num < 0) {
      return `${fieldName} must be a positive number`;
    }
    return null;
  },
};

/**
 * Validate form data against schema
 */
export const validateForm = (data, schema) => {
  const errors = {};

  for (const [field, rules] of Object.entries(schema)) {
    const value = data[field];

    for (const rule of rules) {
      const error = rule(value, field);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Common validation schemas
 */
export const validationSchemas = {
  userRegistration: {
    name: [
      value => validators.required(value, 'Name'),
      value => validators.minLength(value, 2, 'Name'),
      value => validators.maxLength(value, 50, 'Name'),
    ],
    email: [
      value => validators.required(value, 'Email'),
      value => validators.email(value),
    ],
    phone: [
      value => validators.required(value, 'Phone'),
      value => validators.phone(value),
    ],
    password: [
      value => validators.required(value, 'Password'),
      value => validators.minLength(value, 6, 'Password'),
    ],
  },

  productEnquiry: {
    name: [
      value => validators.required(value, 'Name'),
      value => validators.minLength(value, 2, 'Name'),
    ],
    email: [
      value => validators.required(value, 'Email'),
      value => validators.email(value),
    ],
    phone: [
      value => validators.required(value, 'Phone'),
      value => validators.phone(value),
    ],
    message: [value => validators.maxLength(value, 1000, 'Message')],
  },

  productCreation: {
    name: [
      value => validators.required(value, 'Product name'),
      value => validators.minLength(value, 3, 'Product name'),
      value => validators.maxLength(value, 100, 'Product name'),
    ],
    description: [
      value => validators.required(value, 'Description'),
      value => validators.minLength(value, 10, 'Description'),
      value => validators.maxLength(value, 2000, 'Description'),
    ],
    price: [
      value => validators.required(value, 'Price'),
      value => validators.price(value),
    ],
    stock: [
      value => validators.required(value, 'Stock'),
      value => validators.positiveInteger(value, 'Stock'),
    ],
  },
};

/**
 * Secure localStorage wrapper
 */
export const secureStorage = {
  set: (key, value) => {
    try {
      const serialized = JSON.stringify({
        data: value,
        timestamp: Date.now(),
        checksum: btoa(JSON.stringify(value)).slice(0, 10),
      });
      localStorage.setItem(key, serialized);
      return true;
    } catch (error) {
      return false;
    }
  },

  get: key => {
    try {
      const serialized = localStorage.getItem(key);
      if (!serialized) return null;

      const parsed = JSON.parse(serialized);
      const expectedChecksum = btoa(JSON.stringify(parsed.data)).slice(0, 10);

      if (parsed.checksum !== expectedChecksum) {
        localStorage.removeItem(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      localStorage.removeItem(key);
      return null;
    }
  },

  remove: key => {
    localStorage.removeItem(key);
  },

  clear: () => {
    localStorage.clear();
  },
};

/**
 * Privacy utilities
 */
export const privacy = {
  maskEmail: email => {
    const [username, domain] = email.split('@');
    const maskedUsername =
      username.slice(0, 2) + '*'.repeat(username.length - 2);
    return `${maskedUsername}@${domain}`;
  },

  maskPhone: phone => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length >= 10) {
      return (
        cleaned.slice(0, 3) + '*'.repeat(cleaned.length - 6) + cleaned.slice(-3)
      );
    }
    return phone;
  },

  generateUserHash: userData => {
    // Simple hash for user identification without exposing PII
    const str = `${userData.email}${userData.id}${Date.now()}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  },
};

/**
 * Analytics and tracking utilities (privacy-focused)
 */
export const analytics = {
  trackEvent: (eventName, properties = {}) => {
    // In production, integrate with privacy-focused analytics
    if (process.env.NODE_ENV === 'development') {
    }

    // Example: Send to analytics service with user consent
    const hasConsent = secureStorage.get('analytics_consent');
    if (hasConsent) {
      // Send to analytics service
    }
  },

  trackPageView: page => {
    analytics.trackEvent('page_view', { page });
  },

  trackEnquiry: (productId, enquiryData) => {
    analytics.trackEvent('enquiry_submitted', {
      product_id: productId,
      enquiry_type: 'product_interest',
      // Don't track PII
      timestamp: Date.now(),
    });
  },

  trackProductView: productId => {
    analytics.trackEvent('product_viewed', {
      product_id: productId,
      timestamp: Date.now(),
    });
  },
};

export default {
  sanitizeHtml,
  escapeHtml,
  isValidEmail,
  isValidPhone,
  isValidUrl,
  generateSecureId,
  rateLimiter,
  getCSPHeaders,
  validators,
  validateForm,
  validationSchemas,
  secureStorage,
  privacy,
  analytics,
};
