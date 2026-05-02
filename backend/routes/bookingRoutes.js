const express = require('express');
const { createBooking, getMyBookings, getBookedSeats } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createBooking);
router.get('/my', protect, getMyBookings);
router.get('/booked/:movieId', getBookedSeats);

module.exports = router;

