const Video = require('../models/Video');
const memoryDb = require('../utils/memoryDb');

// @desc    Get all videos
// @route   GET /api/videos
// @access  Public
const getVideos = async (req, res) => {
  try {
    const { category, search, trending } = req.query;

    if (!memoryDb.isDbConnected()) {
      let list = [...memoryDb.mockVideos];

      if (category && category !== 'All') {
        list = list.filter(v => v.category === category);
      }

      if (trending === 'true') {
        list = list.filter(v => v.trending === true);
      }

      if (search) {
        const s = search.toLowerCase();
        list = list.filter(v => 
          v.title.toLowerCase().includes(s) || 
          v.description.toLowerCase().includes(s) || 
          v.tags.some(t => t.toLowerCase().includes(s))
        );
      }

      return res.json({ success: true, count: list.length, videos: list });
    }

    let query = {};

    if (category && category !== 'All') {
      query.category = category;
    }

    if (trending === 'true') {
      query.trending = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const videos = await Video.find(query).sort('-createdAt');

    res.json({ success: true, count: videos.length, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Increment video views
// @route   POST /api/videos/:id/view
// @access  Public
const incrementViews = async (req, res) => {
  try {
    if (!memoryDb.isDbConnected()) {
      const video = memoryDb.mockVideos.find(v => v._id === req.params.id);
      if (!video) {
        return res.status(404).json({ success: false, message: 'Video not found' });
      }
      video.views = (video.views || 0) + 1;
      return res.json({ success: true, views: video.views });
    }

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json({ success: true, views: video.views });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getVideos, incrementViews };
