const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  crew: { type: mongoose.Schema.Types.ObjectId, ref: 'CrewProfile', required: true },
  status: { type: String, enum: ['pending', 'viewed', 'accepted', 'rejected', 'withdrawn'], default: 'pending' },
  message: String,
  appliedAt: { type: Date, default: Date.now },
  viewedAt: Date,
  respondedAt: Date,
  ownerNotes: String,
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);