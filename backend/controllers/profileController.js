const User = require('../models/User');

// @desc    Get profile
// @route   GET /api/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
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
    const user = await User.findById(req.user._id);
    const resourceId = req.params.resourceId;
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
