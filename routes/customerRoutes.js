// routes/customerRoutes.js

const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Define routes
router.get('/bookings', customerController.listAllCustomersWithBookings);
router.get('/:customerName/booking-count', customerController.listCustomerBookingCount);

module.exports = router;
