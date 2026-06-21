const express = require('express');
const router = express.Router();
const { getVideos, incrementViews } = require('../controllers/videoController');

router.get('/', getVideos);
router.post('/:id/view', incrementViews);

module.exports = router;
