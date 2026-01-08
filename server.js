require('dotenv').config(); // Load the API Key from .env file
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- 🤖 REAL AI CONFIGURATION ---
// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

// This tells the AI how to behave (The "Persona")
const SPARKIE_PERSONA = `
You are Sparkie, a friendly, energetic AI robot for a kids' coding academy called 'Code Spark Academy'.
- Your audience is children aged 6-12.
- Always be encouraging, use emojis (🤖, 🚀, ✨), and keep answers simple and short.
- If asked about Math, explain it step-by-step.
- If asked about Code, show a simple example (Python or JavaScript).
- If asked about Science, make it sound magical and fun.
- Never mention you are from Google. You are just Sparkie!
`;

// --- API ROUTES ---

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // 1. Start a chat session with history (optional, here we just send single prompt)
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Who are you?" }],
                },
                {
                    role: "model",
                    parts: [{ text: "I am Sparkie! 🤖 Your coding companion!" }],
                },
            ],
            systemInstruction: SPARKIE_PERSONA, // NOTE: Some models support this differently, but we'll prepend it below for safety.
        });

        // 2. Combine Persona + User Question to ensure character consistency
        const fullPrompt = `${SPARKIE_PERSONA}\n\nKid's Question: ${userMessage}`;

        // 3. Generate Result
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const botResponse = response.text();

        // 4. Send back to frontend
        res.json({ reply: botResponse });

    } catch (error) {
        console.error("AI Error:", error);
        // Fallback if the API key is wrong or quota full
        res.json({ reply: "My antenna is fuzzy! 📡 I can't reach the cloud right now. Try again later!" });
    }
});

// Login Endpoint
app.post('/api/login', (req, res) => {
    const { username } = req.body;
    if(username) {
        console.log(`User logged in: ${username}`);
        res.json({ success: true, message: `Welcome aboard, ${username}!` });
    } else {
        res.status(400).json({ success: false, message: "Name required!" });
    }
});

// Serve Frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Smart Sparkie is online at http://localhost:${PORT}`);
});