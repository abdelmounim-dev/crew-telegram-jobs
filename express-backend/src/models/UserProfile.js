const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  userType: { type: String, enum: ['crew', 'owner'], required: true },
  firstName: String,
  lastName: String,
  phone: String,
  profilePhoto: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  location: String,
  isActive: { type: Boolean, default: true },
  telegramId: { type: String, unique: true },
  telegramUsername: String,
}, { timestamps: true });

module.exports = mongoose.model('UserProfile', userProfileSchema);