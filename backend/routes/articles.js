const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

const articlesPath = path.join(__dirname, "../data/articles.json");


// Placeholder articles simulating MedlinePlus structure
router.get("/articles", (req, res) => {
    try {
const data = fs.readFileSync(articlesPath); 
        const articles = JSON.parse(data);
        res.json(articles);
    } catch (err) {
        console.error("Error reading articles.json:", err);
        res.status(500).json({ error: "Failed to load articles" });
    }
});

module.exports = router;