const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'OwnerProfile', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  position: {
    type: String,
    enum: ['captain', 'chef', 'deckhand', 'engineer', 'stewardess', 'first_mate', 'bosun', 'second_engineer', 'other'],
    required: true,
  },
  location: String,
  startDate: Date,
  endDate: Date,
  salaryRange: String,
  status: { type: String, enum: ['active', 'closed', 'draft'], default: 'draft' },
  requirements: String,
  contactEmail: String,
  contactPhone: String,
  contractType: { type: String, enum: ['permanent', 'temporary', 'seasonal', 'day_work'] },
  experienceRequired: Number,
  publishedAt: Date,
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);