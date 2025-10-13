// routes/booking.js
const express = require('express');
const router = express.Router();
const { checkAvailability, createBooking } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Public route to check for available tables
router.get('/availability', checkAvailability);

// Protected route to create a new booking
router.post('/', protect, createBooking);

module.exports = router;