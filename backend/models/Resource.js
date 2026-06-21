const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  category: {
    type: String,
    required: true,
    enum: ['Programming', 'Web Development', 'React', 'Node.js', 'MongoDB', 'Python', 'DSA', 'DBMS', 'OS', 'CN', 'Other'],
  },
  fileUrl: { type: String, default: '' },
  previewUrl: { type: String, default: '' },
  type: { type: String, enum: ['notes', 'slides', 'pdf', 'link', 'other'], default: 'pdf' },
  downloadCount: { type: Number, default: 0 },
  tags: [{ type: String }],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

resourceSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Resource', resourceSchema);
