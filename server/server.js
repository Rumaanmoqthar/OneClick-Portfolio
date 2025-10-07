import express from 'express';
import dotenv from 'dotenv'; // Re-added for local .env file
import path from 'path'; // Import path module
import { fileURLToPath } from 'url'; // Import fileURLToPath
import cors from 'cors';
import connectDB from './config/db.js';
import resumeRoutes from './routes/resumeRoutes.js';

// Load environment variables from .env file
// Point to the .env file in the root directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to the database
connectDB();

// Initialize the Express app
const app = express();

// Middleware setup - Allow all origins for easy local development
app.use(cors());
app.use(express.json());

// Main API Routes
app.use('/api', resumeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Define the port from environment or default to 5000 for local dev
const PORT = process.env.SERVER_PORT || 5000;

// Start the local server
app.listen(PORT, () => {
  console.log(`Server is running in local environment on http://localhost:${PORT}`);
});