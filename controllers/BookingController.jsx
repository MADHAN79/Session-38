const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.bookRoom = async (req, res) => {
    try {
        const { roomId, date, startTime, endTime } = req.body;
        
        // Check if the room is already booked for the same date and time
        const existingBooking = await Booking.findOne({ roomId, date, startTime, endTime });
        if (existingBooking) {
            return res.status(400).json({ error: 'Room is already booked for the given date and time.' });
        }
        
        const booking = new Booking(req.body);
        await booking.save();
        res.status(201).json(booking);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate('roomId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getCustomerBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ customerName: req.params.customerName }).populate('roomId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
