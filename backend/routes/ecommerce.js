const express = require('express');
const EcommerceController = require('../controllers/ecommerceController');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', EcommerceController.getAllStores);
router.get('/:slug', EcommerceController.getStore);
router.get('/:slug/products', EcommerceController.getStoreProducts);
router.get('/:slug/products/:productId', EcommerceController.getProduct);

// Protected routes
router.post('/', authenticate, EcommerceController.create);
router.put('/:slug', authenticate, EcommerceController.update);
router.delete('/:slug', authenticate, EcommerceController.delete);
router.get('/user/stores', authenticate, EcommerceController.getUserStores);
router.post('/start-building', authenticate, EcommerceController.createFromStartBuilding);

module.exports = router;
