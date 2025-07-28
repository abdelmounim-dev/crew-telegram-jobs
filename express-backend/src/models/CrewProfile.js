const mongoose = require('mongoose');

const crewProfileSchema = new mongoose.Schema({
  userProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true, unique: true },
  position: {
    type: String,
    enum: ['captain', 'chef', 'deckhand', 'engineer', 'stewardess', 'first_mate', 'bosun', 'second_engineer', 'other'],
    required: true,
  },
  experienceYears: Number,
  bio: String,
  cv: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  availabilityStatus: { type: String, enum: ['available', 'busy', 'not_available'] },
  certifications: String,
  languages: [String],
  portfolioImages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'File' }],
}, { timestamps: true });

module.exports = mongoose.model('CrewProfile', crewProfileSchema);