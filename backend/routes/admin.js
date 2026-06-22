const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Resource = require('../models/Resource');
const Video = require('../models/Video');
const Contact = require('../models/Contact');
const memoryDb = require('../utils/memoryDb');
const { protect, admin } = require('../middleware/auth');

// Get all dashboard stats
router.get('/stats', protect, admin, async (req, res) => {
  try {
    let totalUsers, totalResources, totalVideos, totalMessages, totalAIQueries;

    if (!memoryDb.isDbConnected()) {
      totalUsers = memoryDb.mockUsers.length;
      totalResources = memoryDb.mockResources.length;
      totalVideos = memoryDb.mockVideos.length;
      totalMessages = memoryDb.mockContacts.length;
      totalAIQueries = memoryDb.mockUsers.reduce((sum, u) => sum + (u.stats?.aiQueries || 0), 0);
    } else {
      totalUsers = await User.countDocuments();
      totalResources = await Resource.countDocuments();
      totalVideos = await Video.countDocuments();
      totalMessages = await Contact.countDocuments();
      
      const userQueries = await User.aggregate([
        { $group: { _id: null, total: { $sum: '$stats.aiQueries' } } }
      ]);
      totalAIQueries = userQueries[0]?.total || 0;
    }

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalResources,
        totalVideos,
        totalMessages,
        totalAIQueries,
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// User routes
router.get('/users', protect, admin, async (req, res) => {
  try {
    if (!memoryDb.isDbConnected()) {
      return res.json({ success: true, users: memoryDb.mockUsers });
    }
    const users = await User.find().select('-password');
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/users/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!memoryDb.isDbConnected()) {
      const idx = memoryDb.mockUsers.findIndex(u => u._id === id);
      if (idx !== -1) memoryDb.mockUsers.splice(idx, 1);
      return res.json({ success: true, message: 'User deleted successfully (Mock Mode)' });
    }
    await User.findByIdAndDelete(id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Resource routes
router.post('/resources', protect, admin, async (req, res) => {
  try {
    const { title, description, category, type, fileUrl, tags } = req.body;
    if (!memoryDb.isDbConnected()) {
      const newRes = {
        _id: 'res_' + Date.now(),
        title, description, category, type, fileUrl, tags: tags || [],
        downloadCount: 0,
        createdAt: new Date()
      };
      memoryDb.mockResources.push(newRes);
      return res.json({ success: true, resource: newRes, message: 'Resource created (Mock Mode)' });
    }
    const resource = await Resource.create({ title, description, category, type, fileUrl, tags });
    res.status(201).json({ success: true, resource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/resources/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!memoryDb.isDbConnected()) {
      const idx = memoryDb.mockResources.findIndex(r => r._id === id);
      if (idx !== -1) {
        memoryDb.mockResources[idx] = { ...memoryDb.mockResources[idx], ...req.body };
        return res.json({ success: true, resource: memoryDb.mockResources[idx], message: 'Resource updated (Mock Mode)' });
      }
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    const resource = await Resource.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, resource });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/resources/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!memoryDb.isDbConnected()) {
      const idx = memoryDb.mockResources.findIndex(r => r._id === id);
      if (idx !== -1) memoryDb.mockResources.splice(idx, 1);
      return res.json({ success: true, message: 'Resource deleted (Mock Mode)' });
    }
    await Resource.findByIdAndDelete(id);
    res.json({ success: true, message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Video routes
router.post('/videos', protect, admin, async (req, res) => {
  try {
    const { title, description, category, youtubeId, duration, instructor, tags } = req.body;
    if (!memoryDb.isDbConnected()) {
      const newVid = {
        _id: 'vid_' + Date.now(),
        title, description, category, youtubeId, duration, instructor, tags: tags || [],
        views: 0,
        createdAt: new Date()
      };
      memoryDb.mockVideos.push(newVid);
      return res.json({ success: true, video: newVid, message: 'Video created (Mock Mode)' });
    }
    const video = await Video.create({ title, description, category, youtubeId, duration, instructor, tags });
    res.status(201).json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/videos/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!memoryDb.isDbConnected()) {
      const idx = memoryDb.mockVideos.findIndex(v => v._id === id);
      if (idx !== -1) {
        memoryDb.mockVideos[idx] = { ...memoryDb.mockVideos[idx], ...req.body };
        return res.json({ success: true, video: memoryDb.mockVideos[idx], message: 'Video updated (Mock Mode)' });
      }
      return res.status(404).json({ success: false, message: 'Video not found' });
    }
    const video = await Video.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ success: true, video });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/videos/:id', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!memoryDb.isDbConnected()) {
      const idx = memoryDb.mockVideos.findIndex(v => v._id === id);
      if (idx !== -1) memoryDb.mockVideos.splice(idx, 1);
      return res.json({ success: true, message: 'Video deleted (Mock Mode)' });
    }
    await Video.findByIdAndDelete(id);
    res.json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Contact routes
router.get('/messages', protect, admin, async (req, res) => {
  try {
    if (!memoryDb.isDbConnected()) {
      return res.json({ success: true, messages: memoryDb.mockContacts });
    }
    const messages = await Contact.find().sort('-createdAt');
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/messages/:id/reply', protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    if (!memoryDb.isDbConnected()) {
      const idx = memoryDb.mockContacts.findIndex(m => m._id === id);
      if (idx !== -1) {
        memoryDb.mockContacts[idx].replied = true;
        return res.json({ success: true, message: memoryDb.mockContacts[idx], msg: 'Message marked as replied (Mock Mode)' });
      }
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    const message = await Contact.findByIdAndUpdate(id, { replied: true }, { new: true });
    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
