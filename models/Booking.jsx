const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
});

bookingSchema.index({ date: 1, roomId: 1, startTime: 1, endTime: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);
