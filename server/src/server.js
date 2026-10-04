import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { portfolioData } from './data/portfolioData.js';
import { Project } from './models/Project.js';
import { Message } from './models/Message.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/thebalya';

app.use(cors());
app.use(express.json());

let isMongoConnected = false;

// Connect to MongoDB gracefully
async function initDatabase() {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 2000
    });
    isMongoConnected = true;
    console.log('⚡ Connected to MongoDB successfully.');

    // Always drop and reseed to keep DB in sync with portfolioData.js source of truth
    await Project.deleteMany({});
    await Project.insertMany(portfolioData.projects);
    console.log('✅ Project data reseeded to MongoDB.');
  } catch (err) {
    isMongoConnected = false;
    console.warn('⚠️ MongoDB connection not available. Falling back to local data store.', err.message);
  }
}

initDatabase();

// In-memory messages backup when Mongo is offline
const memoryMessages = [];

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: isMongoConnected ? 'connected' : 'in-memory-fallback',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/profile', (req, res) => {
  res.json(portfolioData.profile);
});

app.get('/api/brands', (req, res) => {
  res.json(portfolioData.brands);
});

app.get('/api/softwares', (req, res) => {
  res.json(portfolioData.softwares);
});

app.get('/api/projects', async (req, res) => {
  const { featured } = req.query;
  try {
    if (isMongoConnected) {
      const query = featured ? { featured: featured === 'true' } : {};
      const projects = await Project.find(query);
      return res.json(projects);
    }
  } catch (err) {
    console.error('Error fetching from Mongo, using fallback:', err.message);
  }

  // Fallback
  if (featured === 'true') {
    return res.json(portfolioData.projects.filter(p => p.featured));
  }
  res.json(portfolioData.projects);
});

app.get('/api/projects/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    if (isMongoConnected) {
      const project = await Project.findOne({ slug });
      if (project) return res.json(project);
    }
  } catch (err) {
    console.error('Error fetching project by slug from Mongo:', err.message);
  }

  const project = portfolioData.projects.find(p => p.slug === slug);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.json(project);
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required' });
  }

  try {
    if (isMongoConnected) {
      const newMsg = await Message.create({ name, email, message });
      return res.status(201).json({ success: true, message: 'Message recorded', data: newMsg });
    }
  } catch (err) {
    console.error('Error saving message to Mongo:', err.message);
  }

  const fallbackMsg = { id: Date.now(), name, email, message, createdAt: new Date() };
  memoryMessages.push(fallbackMsg);
  res.status(201).json({ success: true, message: 'Message received (in-memory)', data: fallbackMsg });
});

app.listen(PORT, () => {
  console.log(`🚀 THE BALYA Backend running at http://localhost:${PORT}`);
});
