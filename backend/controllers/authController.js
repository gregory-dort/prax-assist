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

         //const hashedPassword = await bcrypt.hash(password, 10);

         const newUser = new User({ username, password }); // change back to password: hashedPassword after debugging
         await newUser.save();

         res.json({ message: 'Account for ${username} created successfully.' });
     } catch (error) {
         res.status(500).json({ error: "Server error" });
     }
 };

// //Login API Function
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            console.log("Missing username or password");
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await User.findOne({ username });
        console.log("User found:", user);

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        req.session.userId = user._id;
        req.session.user = { username: user.username, role: user.role };
        console.log("Session created:", req.session);

        res.json({ message: "Login Successful" });
        console.log("Login successful response sent");

    } catch (error) {
        console.error("Login error:", error);
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
