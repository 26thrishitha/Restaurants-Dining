// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Creates a reference to the User model
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Table', // Creates a reference to the Table model
  },

  bookingDate: {
    type: String, // Storing as YYYY-MM-DD string for easier querying
    required: true,
  },
  bookingTime: {
    type: String, // e.g., "19:00"
    required: true,
  },
  partySize: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Cancelled', 'Completed'],
    default: 'Confirmed',
  },
}, {
  timestamps: true,
});

// IMPORTANT: Prevents creating two bookings for the same table at the same time
bookingSchema.index({ tableId: 1, bookingDate: 1, bookingTime: 1 }, { unique: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;