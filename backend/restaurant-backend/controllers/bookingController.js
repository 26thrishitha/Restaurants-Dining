// controllers/bookingController.js
const Booking = require('../models/Booking');
const Table = require('../models/Table');

// @desc    Check table availability
// @route   GET /api/bookings/availability
exports.checkAvailability = async (req, res) => {
  const { date, time, partySize } = req.query;

  try {
    // 1. Find all bookings for the given date and time
    const existingBookings = await Booking.find({ bookingDate: date, bookingTime: time });
    
    // 2. Extract the table IDs from those bookings
    const bookedTableIds = existingBookings.map(booking => booking.tableId);

    // 3. Find tables that can accommodate the party size AND are NOT in the booked list
    const availableTables = await Table.find({
      capacity: { $gte: partySize },       // Check for enough capacity
      _id: { $nin: bookedTableIds }      // Exclude tables that are already booked
    });
    
    res.json(availableTables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  const { tableId, bookingDate, bookingTime, partySize } = req.body;

  try {
    const booking = new Booking({
      // req.user is attached by our 'protect' middleware
      userId: req.user._id, 
      tableId,
      bookingDate,
      bookingTime,
      partySize
    });

    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    // This error will trigger if the unique index is violated (double booking)
    if (error.code === 11000) {
      return res.status(400).json({ message: 'This table is already booked for the selected time.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};