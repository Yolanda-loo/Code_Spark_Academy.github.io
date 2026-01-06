const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware (Parses incoming data)
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- API ROUTES ---

// 1. AI Tutor Endpoint (Moved logic from frontend to backend)
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let botResponse = "";

    // Simple Rule-Based Logic (simulating an AI)
    if (userMessage.includes('loop')) {
        botResponse = "A loop is like doing a dance move over and over! 🔄 Try a 'for' loop!";
    } else if (userMessage.includes('variable')) {
        botResponse = "A variable is a box with a label. You store data inside! 📦";
    } else if (userMessage.includes('python')) {
        botResponse = "Python is a snake... and a coding language! 🐍 It's very readable.";
    } else if (userMessage.includes('hello')) {
        botResponse = "Beep boop! Hello explorer! Ready to code? 🤖";
    } else {
        botResponse = "That sounds super interesting! I'm still learning. Ask me about 'loops' or 'variables'!";
    }

    // Simulate thinking delay
    setTimeout(() => {
        res.json({ reply: botResponse });
    }, 500); // 0.5s delay
});

// 2. Login Endpoint (Mock Database)
app.post('/api/login', (req, res) => {
    const { username } = req.body;
    if(username) {
        // In a real app, you would check a database here
        console.log(`User logged in: ${username}`);
        res.json({ success: true, message: `Welcome aboard, ${username}!` });
    } else {
        res.status(400).json({ success: false, message: "Name required!" });
    }
});

// --- SERVE FRONTEND ---
// Any request not handled by API goes to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Code Spark launching on http://localhost:${PORT}`);
});