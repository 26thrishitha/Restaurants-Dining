// // // // // controllers/paymentController.js
// // // // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// // // // const Booking = require('../models/Booking'); // We might need this later

// // // // // @desc    Create a stripe checkout session
// // // // // @route   POST /api/payments/create-checkout-session
// // // // exports.createCheckoutSession = async (req, res) => {
// // // //   const { items, bookingId } = req.body;

// // // //   // Ensure there are items to process
// // // //   if (!items || items.length === 0) {
// // // //     return res.status(400).json({ message: 'No order items provided.' });
// // // //   }

// // // //   // Format the items for Stripe's API
// // // //   const line_items = items.map(item => ({
// // // //     price_data: {
// // // //       currency: 'inr', // Using Indian Rupees
// // // //       product_data: {
// // // //         name: item.name,
// // // //       },
// // // //       // Price must be in the smallest currency unit (e.g., paise for INR)
// // // //       unit_amount: Math.round(item.price * 100),
// // // //     },
// // // //     quantity: item.quantity,
// // // //   }));

// // // //   try {
// // // //     const session = await stripe.checkout.sessions.create({
// // // //       payment_method_types: ['card'],
// // // //       line_items,
// // // //       mode: 'payment',
// // // //       // These are the URLs Stripe will redirect to after the transaction
// // // //       success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
// // // //       cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
// // // //       // We pass the bookingId in the metadata to link the payment to the booking later
// // // //       metadata: {
// // // //         bookingId: bookingId
// // // //       }
// // // //     });

// // // //     res.json({ id: session.id });
// // // //   } catch (error) {
// // // //     console.error("Error creating Stripe session:", error);
// // // //     res.status(500).json({ message: 'Failed to create payment session.' });
// // // //   }
// // // // };


// // // // controllers/paymentController.js

// // // // Make sure dotenv is loaded first
// // // require('dotenv').config(); // <-- ADD this at the very top

// // // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// // // const Booking = require('../models/Booking'); // Only if you need booking info

// // // // @desc    Create a stripe checkout session
// // // // @route   POST /api/payments/create-checkout-session
// // // exports.createCheckoutSession = async (req, res) => {
// // //   const { items, bookingId } = req.body;

// // //   // Ensure there are items to process
// // //   if (!items || items.length === 0) {
// // //     return res.status(400).json({ message: 'No order items provided.' });
// // //   }

// // //   // Format the items for Stripe's API
// // //   const line_items = items.map(item => ({
// // //     price_data: {
// // //       currency: 'usd', // Using Indian Rupees
// // //       product_data: {
// // //         name: item.name,
// // //       },
// // //       // Price must be in the smallest currency unit (paise)
// // //       unit_amount: Math.round(item.price * 100),
// // //     },
// // //     quantity: item.quantity,
// // //   }));

// // //   try {
// // //     const session = await stripe.checkout.sessions.create({
// // //       payment_method_types: ['card'],
// // //       line_items,
// // //       mode: 'payment',
// // //       success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
// // //       cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
// // //       metadata: { bookingId },
// // //     });

// // //     res.json({ id: session.id });
// // //   } catch (error) {
// // //     console.error("Error creating Stripe session:", error);
// // //     res.status(500).json({ message: 'Failed to create payment session.' });
// // //   }
// // // };










// // // controllers/paymentController.js

// // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// // // @desc    Create a stripe checkout session
// // // @route   POST /api/payments/create-checkout-session
// // exports.createCheckoutSession = async (req, res) => {
// //   const { items, bookingId } = req.body;

// //   if (!items || items.length === 0) {
// //     return res.status(400).json({ message: 'No order items provided.' });
// //   }

// //   const line_items = items.map(item => ({
// //     price_data: {
// //       currency: 'usd', // Correctly set to US Dollars
// //       product_data: {
// //         name: item.name,
// //       },
// //       // Price must be in the smallest currency unit (cents for USD)
// //       unit_amount: Math.round(item.price * 100),
// //     },
// //     quantity: item.quantity,
// //   }));

// //   try {
// //     const session = await stripe.checkout.sessions.create({
// //       payment_method_types: ['card'],
// //       line_items,
// //       mode: 'payment',
// //       success_url: `${process.env.FRONTEND_URL}/payment-success`,
// //       cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
// //       metadata: { bookingId },
// //     });

// //     res.json({ id: session.id });
// //   } catch (error) {
// //     // This will print the detailed Stripe error in your backend terminal
// //     console.error("Error creating Stripe session:", error); 
// //     res.status(500).json({ message: 'Failed to create payment session.' });
// //   }
// // };
// // controllers/paymentController.js

// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// // @desc    Create a stripe checkout session
// // @route   POST /api/payments/create-checkout-session
// exports.createCheckoutSession = async (req, res) => {
//   const { items, bookingId } = req.body;

//   if (!items || items.length === 0) {
//     return res.status(400).json({ message: 'No order items provided.' });
//   }

//   const line_items = items.map(item => ({
//     price_data: {
//       currency: 'usd', // Correctly set to US Dollars
//       product_data: {
//         name: item.name,
//       },
//       // Price must be in the smallest currency unit (cents for USD)
//       unit_amount: Math.round(item.price * 100),
//     },
//     quantity: item.quantity,
//   }));

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items,
//       mode: 'payment',
//       success_url: `${process.env.FRONTEND_URL}/payment-success`,
//       cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
//       metadata: { bookingId },
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     // This will print the detailed Stripe error in your backend terminal
//     console.error("Error creating Stripe session:", error); 
//     res.status(500).json({ message: 'Failed to create payment session.' });
//   }
// };




// controllers/paymentController.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { items, bookingId } = req.body;

  // --- ADD THIS DEBUGGING BLOCK ---
  console.log('--- Creating Stripe Session ---');
  console.log('Received items:', JSON.stringify(items, null, 2));
  console.log('Received bookingId:', bookingId);
  console.log('Stripe Key Loaded:', process.env.STRIPE_SECRET_KEY ? 'Yes' : 'No');
  console.log('Frontend URL Loaded:', process.env.FRONTEND_URL);
  // ---------------------------------

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'No order items provided.' });
  }

  const line_items = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));
  
  // Log the formatted items to be sent to Stripe
  console.log('Formatted line_items for Stripe:', JSON.stringify(line_items, null, 2));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/payment-success`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
      metadata: { bookingId },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("CRITICAL ERROR creating Stripe session:", error); 
    res.status(500).json({ message: 'Failed to create payment session.' });
  }
};