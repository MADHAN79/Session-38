const express = require('express');
const { createRoom, getRooms } = require('../controllers/roomController');
const router = express.Router();

router.post('/rooms', createRoom);
router.get('/rooms', getRooms);

module.exports = router;
