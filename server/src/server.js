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

// Security Headers Middleware
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// Configure CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin === allowed || (allowed.endsWith('*') && origin.startsWith(allowed.slice(0, -1))))) {
      return callback(null, true);
    }
    // In development mode, allow localhost origin variants
    if (process.env.NODE_ENV !== 'production' && origin.includes('localhost')) {
      return callback(null, true);
    }
    callback(new Error('Blocked by CORS policy'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));

// Body parser with size limits
app.use(express.json({ limit: '20kb' }));

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

    // Safe idempotent initialization: seed only if collection is empty
    const count = await Project.countDocuments();
    if (count === 0 && portfolioData.projects && portfolioData.projects.length > 0) {
      await Project.insertMany(portfolioData.projects);
      console.log('✅ Initial portfolio project data seeded to MongoDB.');
    } else {
      console.log(`ℹ️ Project collection already populated (${count} documents). Preserving existing records.`);
    }
  } catch (err) {
    isMongoConnected = false;
    console.warn('⚠️ MongoDB connection not available. Falling back to local data store.', err.message);
  }
}

initDatabase();

// In-memory messages backup when Mongo is offline (capped to prevent memory exhaustion)
const memoryMessages = [];
const MAX_MEMORY_MESSAGES = 100;

// Simple in-memory rate limiter for contact form submissions (5 requests per 15 minutes per IP)
const contactRateLimits = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of contactRateLimits.entries()) {
    if (now - entry.startTime > RATE_LIMIT_WINDOW_MS) {
      contactRateLimits.delete(ip);
    }
  }
}, 5 * 60 * 1000).unref();

// Routes
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: isMongoConnected ? 'connected' : 'in-memory-fallback',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/profile', (_req, res) => {
  res.json(portfolioData.profile);
});

app.get('/api/brands', (_req, res) => {
  res.json(portfolioData.brands);
});

app.get('/api/softwares', (_req, res) => {
  res.json(portfolioData.softwares);
});

app.get('/api/projects', async (req, res) => {
  const { featured } = req.query;
  const isFeaturedFilter = featured === 'true';

  try {
    if (isMongoConnected) {
      const query = featured !== undefined ? { featured: isFeaturedFilter } : {};
      const projects = await Project.find(query).lean();
      return res.json(projects);
    }
  } catch (err) {
    console.error('Error fetching from Mongo, using fallback:', err.message);
  }

  // Fallback
  if (isFeaturedFilter) {
    return res.json(portfolioData.projects.filter(p => p.featured));
  }
  res.json(portfolioData.projects);
});

app.get('/api/projects/:slug', async (req, res) => {
  const rawSlug = req.params.slug;
  // Enforce string type and validate slug format to prevent NoSQL query operator injection
  if (typeof rawSlug !== 'string' || !/^[a-zA-Z0-9_-]{1,100}$/.test(rawSlug)) {
    return res.status(400).json({ error: 'Invalid project identifier' });
  }

  const slug = rawSlug.trim();
  try {
    if (isMongoConnected) {
      const project = await Project.findOne({ slug: String(slug) }).lean();
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
  // Rate limiting check
  const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const rateData = contactRateLimits.get(clientIp);

  if (rateData) {
    if (now - rateData.startTime < RATE_LIMIT_WINDOW_MS) {
      if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
      }
      rateData.count += 1;
    } else {
      contactRateLimits.set(clientIp, { count: 1, startTime: now });
    }
  } else {
    contactRateLimits.set(clientIp, { count: 1, startTime: now });
  }

  const { name, email, message } = req.body || {};

  // Type check and validate fields
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ error: 'Name, email, and message must be strings' });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ error: 'All fields (name, email, message) are required' });
  }

  // Length limits to prevent payload abuse / DoS
  if (trimmedName.length > 100) {
    return res.status(400).json({ error: 'Name must not exceed 100 characters' });
  }
  if (trimmedEmail.length > 150) {
    return res.status(400).json({ error: 'Email must not exceed 150 characters' });
  }
  if (trimmedMessage.length > 3000) {
    return res.status(400).json({ error: 'Message must not exceed 3000 characters' });
  }

  // Basic email pattern validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    return res.status(400).json({ error: 'Invalid email address format' });
  }

  const sanitizedPayload = {
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage
  };

  try {
    if (isMongoConnected) {
      const newMsg = await Message.create(sanitizedPayload);
      return res.status(201).json({ success: true, message: 'Message recorded', data: { id: newMsg._id } });
    }
  } catch (err) {
    console.error('Error saving message to Mongo:', err.message);
  }

  // Fallback in-memory storage (with bounded capacity)
  const fallbackMsg = {
    id: Date.now(),
    name: sanitizedPayload.name,
    email: sanitizedPayload.email,
    message: sanitizedPayload.message,
    createdAt: new Date()
  };

  if (memoryMessages.length >= MAX_MEMORY_MESSAGES) {
    memoryMessages.shift(); // Evict oldest message
  }
  memoryMessages.push(fallbackMsg);

  res.status(201).json({ success: true, message: 'Message received (in-memory)', data: { id: fallbackMsg.id } });
});

// Generic 404 handler for API routes
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Centralized error handler to avoid leaking stack traces in production
app.use((err, _req, res, _next) => {
  if (err.message === 'Blocked by CORS policy') {
    return res.status(403).json({ error: 'CORS forbidden' });
  }
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 THE BALYA Backend running at http://localhost:${PORT}`);
});
