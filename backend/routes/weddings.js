const express = require('express');
const WeddingController = require('../controllers/weddingController');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/vendors', WeddingController.getAllVendors);
router.get('/vendors/:identifier', WeddingController.getVendor);
router.get('/vendors/:identifier/portfolio', WeddingController.getVendorPortfolio);

// Protected routes
router.post('/vendors', authenticate, WeddingController.create);
router.put('/vendors/:identifier', authenticate, WeddingController.update);
router.delete('/vendors/:identifier', authenticate, WeddingController.delete);
router.get('/user/vendors', authenticate, WeddingController.getUserVendors);
router.post('/start-building', authenticate, WeddingController.createFromStartBuilding);

module.exports = router;
