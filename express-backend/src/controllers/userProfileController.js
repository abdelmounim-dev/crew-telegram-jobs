const UserProfile = require('../models/UserProfile');

exports.createUserProfile = async (req, res) => {
  try {
    const userProfile = new UserProfile(req.body);
    await userProfile.save();
    res.status(201).json(userProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllUserProfiles = async (req, res) => {
  try {
    const userProfiles = await UserProfile.find();
    res.status(200).json(userProfiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserProfileById = async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);
    if (!userProfile) return res.status(404).json({ message: 'UserProfile not found' });
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userProfile) return res.status(404).json({ message: 'UserProfile not found' });
    res.status(200).json(userProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
    if (!userProfile) return res.status(404).json({ message: 'UserProfile not found' });
    res.status(200).json({ message: 'UserProfile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};