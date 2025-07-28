const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  alternativeText: String,
  caption: String,
  width: Number,
  height: Number,
  formats: Object,
  hash: { type: String, required: true },
  ext: String,
  mime: String,
  size: Number,
  url: { type: String, required: true },
  previewUrl: String,
  provider: String,
  provider_metadata: Object,
  folder_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
  folderPath: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);