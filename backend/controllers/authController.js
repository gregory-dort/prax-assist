const bcrypt = require("bcryptjs");
const User = require("../models/User");

//Account Creation API Function
const createAccount = async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // Checks if username exists
        const existingUser = await User.finsOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.json({ message: 'Account for ${username} created successfully.' });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

//Login API Function
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        //Check if user exists in database
        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        //Validate the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        res.json({ message: "Login Successful", token });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: "Could not log out, please try again" })
        }

        res.clearCookie("connect.sid", { httpOnly: true, secure: true, sameSite: "Lax" });
        return res.status(200).json({ message: "Logged out successfully" });
    });
};

module.exports = { createAccount, login, logout };
