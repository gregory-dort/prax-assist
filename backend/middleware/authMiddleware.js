const User = require("../models/User");

const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
        return next();
    }
    return res.status(401).json({ error: "Unauthorized. Please log in." });
};

const isAdmin = async (req, res, next) => {
    if (!req.session || !req.session.userId) {
        res.status(401).json({ error: "Unauthorized." });
    };

    const user = await User.findById(req.session.userId);
    if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    next();
};

module.exports = { isAuthenticated, isAdmin };