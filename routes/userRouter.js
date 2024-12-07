const express = require('express');
const { authenticateUser } = require('../middlewares/authMiddleware');
const authController = require('../controllers/authController');
const trainController = require('../controllers/trainController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

router.get('/trains/availability', authenticateUser, trainController.getTrainAvailability);

router.post('/book', authenticateUser, bookingController.bookSeat);
router.get('/bookings', authenticateUser, bookingController.getBookingDetails);

module.exports = router;