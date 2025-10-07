import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Check if there is an active connection
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected successfully in serverless environment.');
  } catch (err) {
    // Log the detailed error for debugging in Vercel
    console.error('MongoDB connection error:', err.message);
    // Re-throw the error to be caught by the serverless runtime
    // This will cause a proper 500 error instead of a crash
    throw new Error('Could not connect to MongoDB.');
  }
};

export default connectDB;