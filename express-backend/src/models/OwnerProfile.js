const mongoose = require('mongoose');

const ownerProfileSchema = new mongoose.Schema({
  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true, unique: true },
  companyName: String,
  yachtName: String,
  yachtSize: String,
  description: String,
  yachtType: { type: String, enum: ['motor_yacht', 'sailing_yacht', 'super_yacht', 'catamaran', 'other'] },
  operatingRegions: [String],
}, { timestamps: true });

module.exports = mongoose.model('OwnerProfile', ownerProfileSchema);