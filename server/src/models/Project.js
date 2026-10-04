import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  num: { type: String },
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  featured: { type: Boolean, default: false },
  image: { type: String, required: true },
  video: { type: String },
  year: { type: String },
  client: { type: String },
  description: { type: String },
  link: { type: String, default: '#' },
  gallery: { type: Array, default: [] }
}, { timestamps: true, strict: false });

export const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
