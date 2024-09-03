const express = require('express');
const connectDB = require('./config/db');
const roomRoutes = require('./routes/roomRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const customerRoutes = require('./routes/customerRoutes');

require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/customers', customerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
