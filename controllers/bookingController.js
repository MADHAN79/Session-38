const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.bookRoom = async (req, res) => {
  try {
    const { customerName, date, startTime, endTime, roomId } = req.body;

    const existingBooking = await Booking.findOne({
      room: roomId,
      date,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ error: 'Room is already booked for the selected time slot.' });
    }

    const booking = new Booking({ customerName, date, startTime, endTime, room: roomId });
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('room');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomers = async (req, res) => {
  try {
    const customers = await Booking.find().select('customerName').distinct('customerName');
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCustomerBookings = async (req, res) => {
  try {
    const { customerName } = req.params;
    const bookings = await Booking.find({ customerName }).populate('room');
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
