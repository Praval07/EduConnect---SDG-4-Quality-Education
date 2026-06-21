const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false,
  },
  avatar: {
    type: String,
    default: '',
  },
  college: { type: String, default: '' },
  branch: { type: String, default: '' },
  semester: { type: String, default: '' },
  skills: [{ type: String }],
  stats: {
    resourcesDownloaded: { type: Number, default: 0 },
    videosWatched: { type: Number, default: 0 },
    aiQueries: { type: Number, default: 0 },
    savedResources: { type: Number, default: 0 },
    aiSessions: { type: Number, default: 0 },
  },
  studyGoals: [{ type: String }],
  savedResourceIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }],
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

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
