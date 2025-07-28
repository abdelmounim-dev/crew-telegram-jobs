const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  provider: String,
  password: { type: String, required: true },
  resetPasswordToken: String,
  confirmationToken: String,
  confirmed: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);