// controllers/customerController.js

const Booking = require('../models/Booking');
const Room = require('../models/Room');

exports.listAllCustomersWithBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('room');
    
    const customers = bookings.reduce((acc, booking) => {
      const customer = acc.find(c => c.customerName === booking.customerName);
      if (customer) {
        customer.bookings.push({
          roomName: booking.room.name,
          date: booking.date,
          startTime: booking.startTime,
          endTime: booking.endTime
        });
      } else {
        acc.push({
          customerName: booking.customerName,
          bookings: [{
            roomName: booking.room.name,
            date: booking.date,
            startTime: booking.startTime,
            endTime: booking.endTime
          }]
        });
      }
      return acc;
    }, []);
    
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.listCustomerBookingCount = async (req, res) => {
  const { customerName } = req.params;
  
  try {
    const bookings = await Booking.find({ customerName }).populate('room');
    
    const bookingDetails = bookings.map(booking => ({
      roomName: booking.room.name,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      bookingId: booking._id,
      bookingDate: booking.createdAt,
      bookingStatus: booking.status // Assuming you have a status field
    }));
    
    res.status(200).json({
      customerName,
      bookings: bookingDetails,
      totalBookings: bookings.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
