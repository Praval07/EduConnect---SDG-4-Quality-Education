const express = require('express');
const router = express.Router();
const { chat, getHistory } = require('../controllers/aiController');
const { protect, optionalProtect } = require('../middleware/auth');

router.post('/chat', optionalProtect, chat);
router.get('/history', protect, getHistory);

module.exports = router;
