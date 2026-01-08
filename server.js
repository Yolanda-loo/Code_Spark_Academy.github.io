require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Groq = require("groq-sdk"); 

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- 🤖 GROQ CONFIGURATION ---
// This line looks for GROQ_API_KEY in your .env file
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SPARKIE_PERSONA = `
You are Sparkie, a friendly, energetic AI robot for a kids' coding academy called 'Code Spark Academy'.
- Your audience is children aged 6-12.
- Always be encouraging, use emojis (🤖, 🚀, ✨), and keep answers simple and short.
- If asked about Math, explain it step-by-step.
- If asked about Code, show a simple example (Python or JavaScript).
- If asked about Science, make it sound magical and fun.
`;

// --- API ROUTES ---
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: SPARKIE_PERSONA },
                { role: "user", content: userMessage }
            ],
            model: "llama3-8b-8192", 
        });

        const botResponse = completion.choices[0]?.message?.content || "I'm speechless! 😶";
        res.json({ reply: botResponse });

    } catch (error) {
        console.error("AI Error:", error);
        res.json({ reply: "My circuits are jammed! ⚡ Try again in a second!" });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🚀 Smart Sparkie is online (powered by Groq) at http://localhost:${PORT}`);
});