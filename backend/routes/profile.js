const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, toggleSaveResource } = require('../controllers/profileController');
const { protect } = require('../middleware/auth');

router.get('/', protect, getProfile);
router.put('/', protect, updateProfile);
router.post('/save-resource/:resourceId', protect, toggleSaveResource);

module.exports = router;
