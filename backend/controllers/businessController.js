const Business = require('../models/Business');

// @desc    Get all businesses
// @route   GET /api/business
// @access  Public
exports.getBusinesses = async (req, res, next) => {
  try {
    // Build query
    let query = Business.find();

    // Filter by category
    if (req.query.category) {
      query = query.where('category').equals(req.query.category);
    }

    // Filter by city
    if (req.query.city) {
      query = query.where('address.city').regex(new RegExp(req.query.city, 'i'));
    }

    // Filter by state
    if (req.query.state) {
      query = query.where('address.state').regex(new RegExp(req.query.state, 'i'));
    }

    // Filter by featured
    if (req.query.featured) {
      query = query.where('isFeatured').equals(req.query.featured === 'true');
    }

    // Filter by active and published
    query = query.where('isActive').equals(true).where('isPublished').equals(true);

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Select fields
    if (req.query.select) {
      const fields = req.query.select.split(',').join(' ');
      query = query.select(fields);
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Business.countDocuments(query.getQuery());

    query = query.skip(startIndex).limit(limit);

    // Populate owner
    query = query.populate({
      path: 'owner',
      select: 'name email avatar'
    });

    // Execute query
    const businesses = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }

    res.status(200).json({
      success: true,
      count: businesses.length,
      pagination,
      data: businesses
    });
  } catch (error) {
    console.error('Get businesses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get single business
// @route   GET /api/business/:id
// @access  Public
exports.getBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id)
      .populate({
        path: 'owner',
        select: 'name email avatar businessProfile'
      });

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Check if business is published (unless owner is requesting)
    if (!business.isPublished && (!req.user || req.user._id.toString() !== business.owner._id.toString())) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Increment view count
    business.analytics.views += 1;
    await business.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Get business error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Create new business
// @route   POST /api/business
// @access  Private
exports.createBusiness = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.owner = req.user.id;

    const business = await Business.create(req.body);

    res.status(201).json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Create business error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Update business
// @route   PUT /api/business/:id
// @access  Private
exports.updateBusiness = async (req, res, next) => {
  try {
    let business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Make sure user is business owner
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this business'
      });
    }

    business = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Update business error:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Delete business
// @route   DELETE /api/business/:id
// @access  Private
exports.deleteBusiness = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: 'Business not found'
      });
    }

    // Make sure user is business owner
    if (business.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this business'
      });
    }

    await business.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete business error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get businesses by owner
// @route   GET /api/business/owner/:userId
// @access  Public
exports.getBusinessesByOwner = async (req, res, next) => {
  try {
    const businesses = await Business.find({ 
      owner: req.params.userId,
      isActive: true,
      isPublished: true
    }).populate({
      path: 'owner',
      select: 'name email avatar'
    });

    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses
    });
  } catch (error) {
    console.error('Get businesses by owner error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Search businesses
// @route   GET /api/business/search
// @access  Public
exports.searchBusinesses = async (req, res, next) => {
  try {
    const { q, category, city, state, rating } = req.query;

    let query = Business.find({
      isActive: true,
      isPublished: true
    });

    // Text search
    if (q) {
      query = query.find({
        $text: { $search: q }
      });
    }

    // Category filter
    if (category) {
      query = query.where('category').equals(category);
    }

    // Location filters
    if (city) {
      query = query.where('address.city').regex(new RegExp(city, 'i'));
    }

    if (state) {
      query = query.where('address.state').regex(new RegExp(state, 'i'));
    }

    // Rating filter
    if (rating) {
      query = query.where('rating').gte(parseFloat(rating));
    }

    // Sort by relevance if text search, otherwise by rating
    if (q) {
      query = query.sort({ score: { $meta: 'textScore' } });
    } else {
      query = query.sort('-rating -reviewCount');
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    query = query.skip(startIndex).limit(limit);

    // Populate owner
    query = query.populate({
      path: 'owner',
      select: 'name email avatar'
    });

    const businesses = await query;

    res.status(200).json({
      success: true,
      count: businesses.length,
      data: businesses
    });
  } catch (error) {
    console.error('Search businesses error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

