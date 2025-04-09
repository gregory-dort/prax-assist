require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User"); // Adjust path if needed
const connectDB = require("./config/db"); // Your existing DB connection

async function createAdmin() {
    try {
        await connectDB();

        const username = "admin"; // Change as desired
        const password = "adminpass"; // Change to a secure password

        // Check if admin already exists
        const existingAdmin = await User.findOne({ username });
        if (existingAdmin) {
            console.log("❌ Admin user already exists.");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new User({
            username,
            password: hashedPassword,
            role: "admin",
        });

        await newAdmin.save();

        console.log("✅ Admin user created successfully!");
        process.exit(0);
    } catch (err) {
        console.error("Error creating admin user:", err);
        process.exit(1);
    }
}

createAdmin();