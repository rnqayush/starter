const express = require('express');
const HotelController = require('../controllers/hotelController');
const { authenticate, optionalAuthenticate } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', HotelController.getAllHotels);
router.get('/:identifier', HotelController.getHotel);
router.get('/:identifier/rooms', HotelController.getHotelRooms);

// Protected routes
router.post('/', authenticate, HotelController.create);
router.put('/:identifier', authenticate, HotelController.update);
router.delete('/:identifier', authenticate, HotelController.delete);
router.get('/user/hotels', authenticate, HotelController.getUserHotels);
router.post('/start-building', authenticate, HotelController.createFromStartBuilding);

module.exports = router;
