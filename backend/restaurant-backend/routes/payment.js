// routes/payment.js
const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware'); // Payments must be protected

// A logged-in user is required to create a payment session
router.post('/create-checkout-session', protect, createCheckoutSession);

module.exports = router;