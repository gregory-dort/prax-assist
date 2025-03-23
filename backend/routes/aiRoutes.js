const express = require("express");
const {} = require("../controllers/aiController");
const fs = require("fs");
const csv = require("csv-parser");
const { OpenAI } = require("openai");

const router = express.Router();
const openai = new OpenAI({ apikey: process.env.OPENAI_KEY });

// Empty array to store medical data from csv file
let medicalData = [];

// Load data from CSV into memory
fs.createReadStream("./data/Dataset - Sheet1.csv")
    .pipe(csv())
    .on("data", (row) => medicalData.push(row))
    .on("end", () => console.log("CSV file successfully processed"));

// Symptom Analyzation API Endpoint
router.post("/analyze", async (req, res) => {
    const { symptoms } = req.body;
    if (!symptoms) {
        return res.status(400).json({ error: "Symptoms are required."});
    }

    // Filter relevant data from CSV file
    const matchedConditions = medicalData.filter((entry) => {
        return symptoms.toLowerCase().includes(entry.Term.toLowerCase());
    });
    
    if (matchedConditions.length === 0) {
        return res.status(404).json({ error: "No matching conditions found."});
    
    
    }
})

// AI Routes


module.exports = router;