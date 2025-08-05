const express = require('express');
const WebsiteController = require('../controllers/websiteController');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', WebsiteController.getAll);
router.get('/check/:websiteName', WebsiteController.checkAvailability);
router.get('/:websiteName', WebsiteController.getByName);

// Protected routes
router.post('/start-building', authenticate, WebsiteController.createFromStartBuilding);
router.get('/user/websites', authenticate, WebsiteController.getUserWebsites);
router.put('/:websiteName', authenticate, WebsiteController.update);
router.delete('/:websiteName', authenticate, WebsiteController.delete);
router.get('/:websiteName/analytics', authenticate, WebsiteController.getAnalytics);

module.exports = router;
