const express = require("express");
const {} = require("../controllers/aiController");
const fs = require("fs");
const csv = require("csv-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();
const genAI = new GoogleGenerativeAI( process.env.GEMINI_API_KEY );

// Symptom Analyzation API Endpoint
router.post("/analyze", async (req, res) => {
    try {
        const { symptoms } = req.body;
        if (!symptoms) {
            return res.status(400).json({ error: 'Symptoms input is required.' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

        const prompt = `The user is describing the following symptoms: "${symptoms}". Based on these, suggest the possible illness and a basic treatment plan in clear, short sentences.`;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        res.json({ response: text });
    } catch (error) {
        console.error("Gemini error: ", error);
        res.status(500).json({ error: "Failed to get response from Gemini API." });
    }
});

module.exports = router;