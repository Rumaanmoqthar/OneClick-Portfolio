// --- SERVERLESS FUNCTION STARTED --- (This is our debug line)
console.log("--- SERVERLESS FUNCTION STARTED ---");
console.log(`--- Node.js version: ${process.version} ---`);

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// dotenv is removed - Vercel handles this automatically
import cors from 'cors';
import connectDB from './config/db.js';
import resumeRoutes from './routes/resumeRoutes.js';

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// --- Vercel Deployment: Serve Frontend ---
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// The "catchall" handler: for any request that doesn't match one above,
// send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Export the app for Vercel serverless
export default app;