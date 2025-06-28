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
            throw new Error('MONGO_URI environment variable is not defined. Please check your .env file.');
        }

        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI, connectionparams);
        console.log("MongoDB is connected successfully");
    }
    catch(err) {
        console.error("MongoDB connection failed:", err.message);
        console.error("Please ensure:");
        console.error("1. Your .env file exists in the server directory");
        console.error("2. MONGO_URI is properly set in your .env file");
        console.error("3. Your MongoDB server is running (if using local MongoDB)");
        console.error("4. Your connection string is correct");
        process.exit(1); // Exit the process if DB connection fails
    }
}

module.exports = connectDB;