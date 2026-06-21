const User = require('../models/User');
const memoryDb = require('../utils/memoryDb');

// @desc    Get profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    if (!memoryDb.isDbConnected()) {
      const user = memoryDb.mockUsers.find(u => u._id === req.user._id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      // populate savedResourceIds
      const userCopy = JSON.parse(JSON.stringify(user));
      userCopy.savedResourceIds = (user.savedResourceIds || []).map(id => {
        const found = memoryDb.mockResources.find(r => r._id === id);
        return found ? { _id: found._id, title: found.title, category: found.category } : null;
      }).filter(Boolean);

      return res.json({ success: true, user: userCopy });
    }

    const user = await User.findById(req.user._id).populate('savedResourceIds', 'title category');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update profile
// @route   PUT /api/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const allowedFields = ['name', 'college', 'branch', 'semester', 'skills', 'avatar', 'studyGoals'];
    const updates = {};

    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (!memoryDb.isDbConnected()) {
      const user = memoryDb.mockUsers.find(u => u._id === req.user._id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      
      Object.assign(user, updates);
      return res.json({ success: true, message: 'Profile updated successfully', user });
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });

    res.json({ success: true, message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Save / unsave resource
// @route   POST /api/profile/save-resource/:resourceId
// @access  Private
const toggleSaveResource = async (req, res) => {
  try {
    const resourceId = req.params.resourceId;

    if (!memoryDb.isDbConnected()) {
      const user = memoryDb.mockUsers.find(u => u._id === req.user._id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      
      if (!user.savedResourceIds) user.savedResourceIds = [];
      if (!user.stats) user.stats = { savedResources: 0 };
      
      const isSaved = user.savedResourceIds.includes(resourceId);

      if (isSaved) {
        user.savedResourceIds = user.savedResourceIds.filter(id => id.toString() !== resourceId);
        user.stats.savedResources = Math.max(0, (user.stats.savedResources || 0) - 1);
      } else {
        user.savedResourceIds.push(resourceId);
        user.stats.savedResources = (user.stats.savedResources || 0) + 1;
      }

      return res.json({ success: true, saved: !isSaved, savedCount: user.stats.savedResources });
    }

    const user = await User.findById(req.user._id);
    const isSaved = user.savedResourceIds.includes(resourceId);

    if (isSaved) {
      user.savedResourceIds = user.savedResourceIds.filter(id => id.toString() !== resourceId);
      user.stats.savedResources = Math.max(0, user.stats.savedResources - 1);
    } else {
      user.savedResourceIds.push(resourceId);
      user.stats.savedResources += 1;
    }

    await user.save();
    res.json({ success: true, saved: !isSaved, savedCount: user.stats.savedResources });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getProfile, updateProfile, toggleSaveResource };
