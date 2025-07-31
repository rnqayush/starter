const express = require('express');
const {
  getBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  getBusinessesByOwner,
  searchBusinesses
} = require('../controllers/businessController');

const { protect, authorize, optionalAuth, canCreateBusiness } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getBusinesses);
router.get('/search', searchBusinesses);
router.get('/owner/:userId', getBusinessesByOwner);
router.get('/:id', optionalAuth, getBusiness);

// Protected routes
router.post('/', protect, canCreateBusiness, createBusiness);
router.put('/:id', protect, updateBusiness);
router.delete('/:id', protect, deleteBusiness);

module.exports = router;

