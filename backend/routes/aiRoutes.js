const express = require("express");
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

        const prompt = `You are a doctor tasked with giving medical advice to a healthcare professional such as a doctor, nurse or physician assistant. Based on this context:
        <context>
        The patient is exhibiting these ${symptoms}. 
        </context>
        Based on the context suggest the possible illnesses and provide a basic treatment plan in clear and concise sentences.`;

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