require("dotenv").config();

// Initializing Dependencies
const express = require("express");
const session = require("express-session")
const cors = require("cors");

// Importing DB Elements & Controller / Admin Routes
const authRoutes = require("./routes/authRoutes");
const aiRoutes = require("./routes/aiRoutes");
const connectDB = require("./config/db");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const adminRoutes = require("./routes/adminRoutes");
const articleRoutes = require("./routes/articles");


// Calling DB Connection
connectDB();
const app = express();

// CORS middleware
app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-type", "Authorization"] 
    })
);

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
        },
    })
);

app.use("/api", authRoutes);
app.use("/api/ai", aiRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api", articleRoutes);

app.use("/api", authRoutes);

console.log("Route logging code running");
console.log("Registered routes:");
app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(r.route.path, r.route.methods);
  }
});

// Fetches the current user
app.get("/api/current-user", (req, res) => {
    if (req.session.user) {
      res.json({ user: req.session.user });
    } else {
      res.status(401).json({ user: null });
    }
  });


// In server.js, before or after your other routes:
app.post("/api/test-login", (req, res) => {
  console.log("Test login route hit");
  res.send("Test login successful");
});

app.post("/api/login", async (req, res) => {
  console.log("LOGIN API FUNCTION CALLED");
  try {
      console.log("Login route hit");
      const { username, password } = req.body;
      console.log("Username:", username, "Password:", password);

      if (!username || !password) {
          console.log("Missing username or password");
          return res.status(400).json({ error: "Username and password are required" });
      }

      const user = await User.findOne({ username });
      console.log("User found:", user);

      if (!user) {
          console.log("Invalid credentials - user not found");
          return res.status(401).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);

      if (!isMatch) {
          console.log("Invalid credentials - password mismatch");
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
});

app.post("/api/create-account", async (req, res) => {
  try {
      const { username, password } = req.body;

      if(!username || !password) {
          return res.status(400).json({ error: "Username and password are required" });
      }

      // Checks if username exists
      const existingUser = await User.findOne({ username }); //Fixed finsOne to findOne
      if (existingUser) {
          return res.status(409).json({ error: "Username already exists" });
      }

      //const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ username, password }); // change back to password: hashedPassword after debugging
      await newUser.save();

      res.json({ message: `Account for ${username} created successfully.` }); //Fixed string literal
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log('Server running on Port:', PORT));