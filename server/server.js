// --- ADD THESE LINES AT THE VERY TOP OF THE FILE ---
console.log("--- SERVERLESS FUNCTION STARTED ---");
console.log(`--- Node.js version: ${process.version} ---`);
// ----------------------------------------------------

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import resumeRoutes from './routes/resumeRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Middleware setup
const allowedOrigins = (process.env.FRONTEND_ORIGIN || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: allowedOrigins.length ? allowedOrigins : false,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  credentials: true,
}));
app.use(express.json());

// Main API Routes
app.use('/api', resumeRoutes);

// Health check for Vercel
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export the app for Vercel serverless
export default app;