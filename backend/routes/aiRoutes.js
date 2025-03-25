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

    const promptData = matchedConditions.map((condition) => {
        return `Condition: ${condition.Term}\nDescription: ${condition.Definition}`;
    }).join("\n\n");

    const prompt = `
    A patient is currently experiencing these symptoms: ${symptoms}.
    Based on the following conditions, suggest possible diagnoses and treatments

    ${promptData}
    
    Provide clear explanantions and recommended actions for the physician.`;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "system", content: prompt }],
            max_tokens: 500,
        });
        res.status(200).json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API error: ", error);
        res.status(500).json({ error: "Error getting AI response"})
    }
});

module.exports = router;