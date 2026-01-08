const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware (Parses incoming data)
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// --- SPARKIE'S KNOWLEDGE BASE 🧠 ---
// This dictionary holds all the answers Sparkie knows.
const knowledgeBase = {
    // CODING 💻
    "loop": "A loop is like running in circles! It repeats code over and over until you tell it to stop. 🔄",
    "variable": "A variable is like a labelled box 📦. You can put data inside (like numbers or words) and find it later!",
    "function": "A function is a recipe! 📜 You write the steps once, and then you can cook (run) it whenever you want.",
    "bug": "A bug is a mistake in the code. 🐛 Don't worry, even expert wizards make bugs! We squash them by 'debugging'.",
    "python": "Python is a snake... and a coding language! 🐍 It's famous for being easy to read, like English.",
    "html": "HTML is the skeleton of a website 💀. It tells the browser where the headings, pictures, and buttons go.",
    "css": "CSS is the makeup for websites! 💄 It handles colors, fonts, and making things look pretty.",
    "javascript": "JavaScript is the muscle! 💪 It makes things move, bounce, and calculate. It's what powers ME, Sparkie!",
    
    // SPACE 🚀
    "mars": "Mars is the Red Planet! 🔴 It has a giant volcano called Olympus Mons that is 3 times taller than Everest!",
    "moon": "The Moon is Earth's best friend. 🌑 It has no air, so if you walked there, your footprints would stay forever!",
    "sun": "The Sun is a giant ball of hot gas (plasma). ☀️ It's actually a Star, just really close to us!",
    "black hole": "A Black Hole is a gravity monster! 🕳️ It pulls everything in, even light. Nothing can escape!",
    "gravity": "Gravity is the invisible glue that keeps your feet on the ground and the planets orbiting the Sun. 🌎",
    
    // DINOSAURS 🦖
    "t-rex": "The T-Rex was the King of Dinos! 👑 Its teeth were the size of bananas 🍌 and it had a bite force of 12,000 pounds!",
    "triceratops": "Triceratops had three horns on its face! 🦕 It used them to defend itself from T-Rex.",
    "fossil": "Fossils are dinosaur bones that turned into stone over millions of years. 🦴 It's how we know they existed!",
    "raptor": "Velociraptors were small but super fast! 🏃‍♂️ Unlike movies, they actually had feathers like birds!",
    
    // FUN STUFF 🤖
    "joke": "Why did the programmer quit his job? ... Because he didn't get arrays! 😂",
    "name": "I am Sparkie v2.0! The smartest coding robot in the galaxy. 🤖",
    "hello": "Beep Boop! Hi explorer! Ready to learn? 👋",
    "hi": "Hello friend! Ask me about Space, Dinos, or Code!",
    "bye": "Powering down... Sleep mode activated. 💤 See you soon!"
};

// Helper function to find the best answer
function getSparkieResponse(input) {
    if (!input) return "I can't hear you! Type something.";
    
    const text = input.toLowerCase();
    
    // Check our database for keywords inside the sentence
    for (const key in knowledgeBase) {
        if (text.includes(key)) {
            return knowledgeBase[key];
        }
    }

    // Default answers if Sparkie is confused
    const confusedAnswers = [
        "Does not compute! 🤖 Try asking about 'loops', 'Mars', or 'T-Rex'.",
        "My circuits are fuzzy. Can you ask that simply? I know about Coding, Space, and Dinos!",
        "I'm still learning! Try asking: 'What is HTML?' or 'Tell me a joke!'"
    ];
    return confusedAnswers[Math.floor(Math.random() * confusedAnswers.length)];
}


// --- API ROUTES ---

// 1. AI Tutor Endpoint (UPDATED)
app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;
    const botResponse = getSparkieResponse(userMessage);

    // Simulate thinking delay
    setTimeout(() => {
        res.json({ reply: botResponse });
    }, 600); // 0.6s delay for realism
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