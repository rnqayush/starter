const express = require('express');
const BusinessController = require('../controllers/businessController');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', BusinessController.getAllTemplates);
router.get('/:slug', BusinessController.getBySlug);

// Protected routes
router.post('/', authenticate, BusinessController.create);
router.put('/:slug', authenticate, BusinessController.update);
router.delete('/:slug', authenticate, BusinessController.delete);
router.get(
  '/user/businesses',
  authenticate,
  BusinessController.getUserBusinesses
);
router.post(
  '/start-building',
  authenticate,
  BusinessController.createFromStartBuilding
);

module.exports = router;
