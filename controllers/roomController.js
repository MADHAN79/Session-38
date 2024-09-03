const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  try {
    const { name, seatsAvailable, amenities, pricePerHour } = req.body;
    const room = new Room({ name, seatsAvailable, amenities, pricePerHour });
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
