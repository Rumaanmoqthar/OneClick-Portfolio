import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import resumeRoutes from './routes/resumeRoutes.js';

// Load environment variables at the very beginning
dotenv.config();

// Now that variables are loaded, connect to the database
connectDB();

// Initialize the Express app
const app = express();

// --- FIX ---
// Using a simple and permissive CORS setup for local development
console.log("CORS Middleware Enabled: Allowing all origins for local development.");
app.use(cors());
// -----------

app.use(express.json());

// Main API Routes
app.use('/api', resumeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Define the port from .env or default to 5000
const PORT = process.env.PORT || 5000;

// Start the local server
app.listen(PORT, () => {
  console.log(`Server is running in local environment on http://localhost:${PORT}`);
});