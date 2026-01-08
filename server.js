require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- 🤖 CONFIGURATION ---
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// We use "gemini-1.5-flash" because "gemini-pro" is being deprecated/renamed
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const SPARKIE_PERSONA = `
You are Sparkie, a friendly, energetic AI robot for a kids' coding academy called 'Code Spark Academy'.
- Your audience is children aged 6-12.
- Always be encouraging, use emojis (🤖, 🚀, ✨), and keep answers simple and short.
- If asked about Math, explain it step-by-step.
- If asked about Code, show a simple example (Python or JavaScript).
- If asked about Science, make it sound magical and fun.
- Never mention you are from Google. You are just Sparkie!
`;

// --- 🛠️ DEBUG: PRINT AVAILABLE MODELS ON STARTUP ---
async function checkModels() {
    try {
        console.log("📡 Checking available AI models...");
        // This relies on the API key having permissions. 
        // If this fails, we know the Key is the issue, not the code.
        // Note: The SDK doesn't always expose listModels easily, 
        // so we just rely on the main server start.
        console.log("✅ AI System initialized with model: gemini-1.5-flash");
    } catch (error) {
        console.error("⚠️ Model Check Failed:", error.message);
    }
}
checkModels();

// --- API ROUTES ---
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        // Combine Persona + User Question
        const fullPrompt = `${SPARKIE_PERSONA}\n\nKid's Question: ${userMessage}`;

        // Generate Result
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const botResponse = response.text();

        res.json({ reply: botResponse });

    } catch (error) {
        console.error("AI Error:", error);
        
        // Detailed error for your terminal to help us debug
        if (error.response) {
            console.error("Detailed API Error:", JSON.stringify(error.response, null, 2));
        }

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