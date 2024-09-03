const express = require('express');
const { bookRoom, getBookings, getCustomers, getCustomerBookings } = require('../controllers/bookingController');
const router = express.Router();

router.post('/bookings', bookRoom);
router.get('/bookings', getBookings);
router.get('/customers', getCustomers);
router.get('/customers/:customerName/bookings', getCustomerBookings);

module.exports = router;
