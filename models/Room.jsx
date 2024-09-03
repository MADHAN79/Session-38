const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    seatsAvailable: { type: Number, required: true },
    amenities: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
});

module.exports = mongoose.model('Room', roomSchema);
