require("dotenv").config();

// Initializing Dependencies
const express = require("express");
const session = require("express-session")
const cors = require("cors");

// Importing DB Elements & Routes
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

// Calling DB Connection
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: "Lax",
            maxAge: 1000 * 60 * 60,
        },
    })
);

// CORS middleware
app.use(
    cors({
        origin: "http://localhost:5173", // Allows API requests from frontend
        credentials: true,
        methods: "GET, POST, PUT, DELETE", // Allows these methods to pass
        allowedHeaders: "Content-type, Authorization", // Allows these headers to pass
    })
);

app.use("/api", authRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.send("PraxAssist is running...");
});

// User Login Endpoint
app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        if(!username || !password) {
            return res.status(400).json({ error: "username and password are required." });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        req.session.user = { username: user.username };

        res.status(200).json({ message: "Login successful!" });
    } catch (error) {
        console.error("Login error", error);
        res.status(500).json({ error: "Server error. Please try again." });
    }  
});

// User Registration Endpoint
app.post("/api/create-account", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Checks if user exists already
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hashes password beforestoring account
        const hashedPassword = await bcrypt.hash(password, 10);

        // Creates a new user
        const newUser = new User({
            username,
            password: hashedPassword,
        });
        // Saves user to mongodb database
        await newUser.save();

        res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
        console.error("Error creating account:", error);
        res.status(500).json({ error: "Server error. Please try again." });
    }
});

app.post("/api/logout", async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Logout error:", err);
                return res.status(500).json({ error: "Failed to log out" });
            }
            res.clearCookie("connect.sid");
            return res.status(200).json({ mesage: "Logged out successfully" });
        });
    } catch (error) {
        console.error("Error in logout:", error);
        res.status(500).json({ error: "Internal Server error" });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log('Server running on Port:', PORT));