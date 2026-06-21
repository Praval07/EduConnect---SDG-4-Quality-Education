const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [80, 'Name cannot exceed 80 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  mobile: {
    type: String,
    default: '',
    match: [/^[6-9]\d{9}$/, 'Please enter a valid 10-digit mobile number'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  avatar: { type: String, default: '' },
  college:  { type: String, default: '' },
  course:   { type: String, default: '' },   // e.g. B.Tech, MCA, BCA
  branch:   { type: String, default: '' },   // e.g. CSE, IT
  semester: { type: String, default: '' },
  skills: [{ type: String }],
  stats: {
    resourcesDownloaded: { type: Number, default: 0 },
    videosWatched:       { type: Number, default: 0 },
    aiQueries:           { type: Number, default: 0 },
    savedResources:      { type: Number, default: 0 },
    aiSessions:          { type: Number, default: 0 },
  },
  studyGoals:      [{ type: String }],
  savedResourceIds:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  watchLater:      [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  createdAt: { type: Date, default: Date.now },
});

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
