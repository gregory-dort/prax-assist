const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { isAuthenticated, isAdmin } = require("../middleware/authMiddleware");

// Route to fetch all users
router.get("/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
        const users = await User.find({}, "username role");
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users." });
    }
});

// Route which allows admin account to assign roles
router.post("/assign-role", isAdmin, async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { username },
            { role },
            { new: true }
        );
        if (!user) return res.status(404).json({ error: "User not found" });
    
        res.json({ message: `${username} is now a ${role}` });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

// Route to send a notification to a single user or all users
router.post("/notify", isAdmin, async (req, res) => {
    const { message, targetUser } = req.body;

    try {
        const query = targetUser === "all" ? {} : { username: targetUser };
        await User.updaeMany(query, { $push: { notifications: message } });

        res.json({ message: "Notification sent" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
