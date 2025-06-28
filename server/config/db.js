const mongoose = require('mongoose');
require('dotenv').config();

const connectionparams = {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

const connectDB = async () => {
    try {
        // Check if MONGO_URI is defined
        if (!process.env.MONGO_URI) {
            console.error('❌ MONGO_URI environment variable is not defined');
            console.error('📝 Please check your .env file in the server directory');
            console.error('📋 Expected format: MONGO_URI=mongodb://localhost:27017/waveboard');
            throw new Error('MONGO_URI environment variable is not defined');
        }

        console.log('🔄 Attempting to connect to MongoDB...');
        console.log('📍 Connection URI:', process.env.MONGO_URI.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs
        
        await mongoose.connect(process.env.MONGO_URI, connectionparams);
        console.log("✅ MongoDB is connected successfully");
        
    } catch(err) {
        console.error("❌ MongoDB connection failed:", err.message);
        console.error("\n🔧 Troubleshooting steps:");
        console.error("1. Ensure your .env file exists in the server directory");
        console.error("2. Check that MONGO_URI is properly set in your .env file");
        console.error("3. If using local MongoDB, ensure MongoDB server is running");
        console.error("4. If using MongoDB Atlas, check your connection string and network access");
        console.error("5. Verify your database credentials are correct");
        
        // Don't exit in development, just log the error
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
}

module.exports = connectDB;