// // controllers/bookingController.js
// const Booking = require('../models/Booking');
// const Table = require('../models/Table');

// // @desc    Check table availability
// // @route   GET /api/bookings/availability
// // exports.checkAvailability = async (req, res) => {
// //   const { date, time, partySize } = req.query;

// //   try {
// //     // 1. Find all bookings for the given date and time
// //     const existingBookings = await Booking.find({ bookingDate: date, bookingTime: time });
    
// //     // 2. Extract the table IDs from those bookings
// //     const bookedTableIds = existingBookings.map(booking => booking.tableId);

// //     // 3. Find tables that can accommodate the party size AND are NOT in the booked list
// //     const availableTables = await Table.find({
// //       capacity: { $gte: partySize },       // Check for enough capacity
// //       _id: { $nin: bookedTableIds }      // Exclude tables that are already booked
// //     });
    
// //     res.json(availableTables);
// //   } catch (error) {
// //     console.error(error);
// //     res.status(500).json({ message: 'Server Error' });
// //   }
// // };


// // controllers/bookingController.js

// exports.checkAvailability = async (req, res) => {
//   const { date, time, partySize } = req.query;

//   try {
//     const existingBookings = await Booking.find({ bookingDate: date, bookingTime: time });
//     const bookedTableIds = existingBookings.map(booking => booking.tableId);

//     // --- THIS IS THE FIX ---
//     // Convert the partySize string from the query into an integer
//     const numericPartySize = parseInt(partySize, 10);
//     // ----------------------

//     // Use the converted number in the query
//     const availableTables = await Table.find({
//       capacity: { $gte: numericPartySize }, // Now compares a Number to a Number
//       _id: { $nin: bookedTableIds }
//     });
    
//     res.json(availableTables);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };


// // @desc    Create a new booking
// // @route   POST /api/bookings
// exports.createBooking = async (req, res) => {
//   const { tableId, bookingDate, bookingTime, partySize } = req.body;

//   try {
//     const booking = new Booking({
//       // req.user is attached by our 'protect' middleware
//       userId: req.user._id, 
//       tableId,
//       bookingDate,
//       bookingTime,
//       partySize
//     });

//     const newBooking = await booking.save();
//     res.status(201).json(newBooking);
//   } catch (error) {
//     // This error will trigger if the unique index is violated (double booking)
//     if (error.code === 11000) {
//       return res.status(400).json({ message: 'This table is already booked for the selected time.' });
//     }
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };















// controllers/bookingController.js
const Booking = require('../models/Booking');
const Table = require('../models/Table');

// @desc    Check table availability
// @route   GET /api/bookings/availability
// exports.checkAvailability = async (req, res) => {
//   const { date, time, partySize } = req.query;

//   try {
//     const existingBookings = await Booking.find({ bookingDate: date, bookingTime: time });
//     const bookedTableIds = existingBookings.map(booking => booking.tableId);

//     // Convert the partySize string from the query into an integer
//     const numericPartySize = parseInt(partySize, 10);

//     // Use the converted number in the query
//     const availableTables = await Table.find({
//       capacity: { $gte: numericPartySize }, // Correctly compares a Number to a Number
//       _id: { $nin: bookedTableIds }
//     });
    
//     res.json(availableTables);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };



// controllers/bookingController.js

exports.checkAvailability = async (req, res) => {
  const { date, time, partySize } = req.query;

  // --- DETAILED DEBUG BLOCK ---
  console.log('---------------------------------');
  console.log('--- NEW AVAILABILITY CHECK ---');
  console.log(`[RAW QUERY PARAMS] Date: "${date}", Time: "${time}", Party Size: "${partySize}"`);
  // -------------------------

  try {
    const existingBookings = await Booking.find({ bookingDate: date, bookingTime: time });
    const bookedTableIds = existingBookings.map(booking => booking.tableId);
    
    console.log('[STEP 1] Found Booked Table IDs:', bookedTableIds);

    // Check if partySize is valid before parsing
    if (!partySize || isNaN(parseInt(partySize, 10))) {
        console.error('[ERROR] Invalid or missing partySize. Cannot query tables.');
        return res.status(400).json({ message: 'Invalid party size provided.' });
    }
    const numericPartySize = parseInt(partySize, 10);
    
    const query = {
      capacity: { $gte: numericPartySize },
      _id: { $nin: bookedTableIds }
    };

    console.log('[STEP 2] Executing Table.find() with query:', JSON.stringify(query, null, 2));
    
    const availableTables = await Table.find(query);
    
    console.log(`[STEP 3] Query finished. Found ${availableTables.length} available tables.`);
    console.log('---------------------------------\n');

    res.json(availableTables);
  } catch (error) {
    // This will print the detailed error that is causing the 500 status
    console.error("[CRITICAL ERROR] The 'checkAvailability' function crashed:", error); 
    res.status(500).json({ message: 'Server Error' });
  }
};


// @desc    Create a new booking
// @route   POST /api/bookings
exports.createBooking = async (req, res) => {
  const { tableId, bookingDate, bookingTime, partySize } = req.body;

  try {
    const booking = new Booking({
      userId: req.user._id, 
      tableId,
      bookingDate,
      bookingTime,
      // Ensure partySize is stored as a number, even if the client sends a string
      partySize: parseInt(partySize, 10) 
    });

    const newBooking = await booking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'This table is already booked for the selected time.' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};