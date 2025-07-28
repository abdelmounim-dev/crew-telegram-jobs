const File = require('../models/File');

exports.createFile = async (req, res) => {
  try {
    const file = new File(req.body);
    await file.save();
    res.status(201).json(file);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFileById = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFile = async (req, res) => {
  try {
    const file = await File.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.status(200).json(file);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteFile = async (req, res) => {
  try {
    const file = await File.findByIdAndDelete(req.params.id);
    if (!file) return res.status(404).json({ message: 'File not found' });
    res.status(200).json({ message: 'File deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};