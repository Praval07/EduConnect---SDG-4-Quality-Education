const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Web Development', 'React', 'Node.js', 'MongoDB', 'Python', 'DSA', 'DBMS', 'OS', 'CN', 'Other'],
  },
  youtubeId: { type: String, required: true },
  thumbnail: { type: String, default: '' },
  duration: { type: String, default: '' },
  instructor: { type: String, default: 'EduConnect' },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  trending: { type: Boolean, default: false },
  tags: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Video', videoSchema);
