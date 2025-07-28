const OwnerProfile = require('../models/OwnerProfile');

exports.createOwnerProfile = async (req, res) => {
  try {
    const ownerProfile = new OwnerProfile(req.body);
    await ownerProfile.save();
    res.status(201).json(ownerProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllOwnerProfiles = async (req, res) => {
  try {
    const ownerProfiles = await OwnerProfile.find();
    res.status(200).json(ownerProfiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOwnerProfileById = async (req, res) => {
  try {
    const ownerProfile = await OwnerProfile.findById(req.params.id);
    if (!ownerProfile) return res.status(404).json({ message: 'OwnerProfile not found' });
    res.status(200).json(ownerProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateOwnerProfile = async (req, res) => {
  try {
    const ownerProfile = await OwnerProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ownerProfile) return res.status(404).json({ message: 'OwnerProfile not found' });
    res.status(200).json(ownerProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteOwnerProfile = async (req, res) => {
  try {
    const ownerProfile = await OwnerProfile.findByIdAndDelete(req.params.id);
    if (!ownerProfile) return res.status(404).json({ message: 'OwnerProfile not found' });
    res.status(200).json({ message: 'OwnerProfile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};