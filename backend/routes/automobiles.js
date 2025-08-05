const express = require('express');
const AutomobileController = require('../controllers/automobileController');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', AutomobileController.getAllDealerships);
router.get('/:slug', AutomobileController.getDealership);
router.get('/:slug/vehicles', AutomobileController.getDealershipVehicles);
router.get('/:slug/vehicles/:vehicleId', AutomobileController.getVehicle);
router.get('/:slug/categories', AutomobileController.getCategories);

// Protected routes
router.post('/', authenticate, AutomobileController.create);
router.put('/:slug', authenticate, AutomobileController.update);
router.delete('/:slug', authenticate, AutomobileController.delete);
router.get(
  '/user/dealerships',
  authenticate,
  AutomobileController.getUserDealerships
);
router.post(
  '/start-building',
  authenticate,
  AutomobileController.createFromStartBuilding
);

module.exports = router;
