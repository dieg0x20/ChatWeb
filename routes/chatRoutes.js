const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');


router.get('/message', chatController.readMessage);

module.exports = router;

