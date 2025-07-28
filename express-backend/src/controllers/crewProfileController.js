const CrewProfile = require('../models/CrewProfile');

exports.createCrewProfile = async (req, res) => {
  try {
    const crewProfile = new CrewProfile(req.body);
    await crewProfile.save();
    res.status(201).json(crewProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllCrewProfiles = async (req, res) => {
  try {
    const crewProfiles = await CrewProfile.find();
    res.status(200).json(crewProfiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCrewProfileById = async (req, res) => {
  try {
    const crewProfile = await CrewProfile.findById(req.params.id);
    if (!crewProfile) return res.status(404).json({ message: 'CrewProfile not found' });
    res.status(200).json(crewProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCrewProfile = async (req, res) => {
  try {
    const crewProfile = await CrewProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!crewProfile) return res.status(404).json({ message: 'CrewProfile not found' });
    res.status(200).json(crewProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCrewProfile = async (req, res) => {
  try {
    const crewProfile = await CrewProfile.findByIdAndDelete(req.params.id);
    if (!crewProfile) return res.status(404).json({ message: 'CrewProfile not found' });
    res.status(200).json({ message: 'CrewProfile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};