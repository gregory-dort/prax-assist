require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_URI;
        if (!uri) {
            throw new Error('MongoDB URI is not defined!');
        }

        console.log('Connecting to MongoDB...');
        await mongoose.connect(uri);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
