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
app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api', resumeRoutes);

// Health check for Vercel
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Export the app for Vercel serverless
export default app;

