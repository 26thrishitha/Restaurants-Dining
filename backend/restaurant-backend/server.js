

// server.js

// --- MOVE THIS TO THE TOP ---
const dotenv = require('dotenv');
dotenv.config();
// -------------------------

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import route files
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const paymentRoutes = require('./routes/payment');

// Connect to the database
connectDB(); 

const app = express();
app.use(cors());
app.use(express.json());

// --- USE THE ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
// --------------------

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));