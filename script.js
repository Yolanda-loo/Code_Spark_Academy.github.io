/* --- Mobile Menu Toggle --- */
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if(hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

/* --- Quiz Modal Logic (Teaser) --- */
const modal = document.getElementById('quizModal');
const closeBtn = document.querySelector('.close-modal');

// Show modal after 5 seconds on homepage
if (modal) {
    setTimeout(() => {
        modal.classList.add('active');
    }, 5000);

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // Close if clicked outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.classList.remove('active');
        }
    });
}

/* --- Mock AI Chat Logic --- */
function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

function sendMessage() {
    const inputField = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    const userText = inputField.value.trim();

    if (userText === "") return;

    // 1. Add User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-msg';
    userDiv.innerText = userText;
    chatBody.appendChild(userDiv);
    inputField.value = '';
    
    // Auto-scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. Simulate AI Typing Delay
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-msg';
        botDiv.innerText = generateResponse(userText);
        chatBody.appendChild(botDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// Simple Rule-Based AI Response
function generateResponse(text) {
    text = text.toLowerCase();
    
    if (text.includes('loop')) return "A loop is like doing a dance move over and over! In code, we use 'for' or 'while' loops to repeat things without writing extra code. 🔄";
    if (text.includes('variable')) return "Think of a variable like a box with a label on it. You can store toys (data) inside and find them later by looking at the label! 📦";
    if (text.includes('hello') || text.includes('hi')) return "Beep boop! Hello explorer! Ready to code? 🤖";
    if (text.includes('python')) return "Python is a snake... and a coding language! It's great for beginners because it reads like English. 🐍";
    
    return "That sounds super interesting! I'm still learning, but let's try a coding puzzle instead? Ask me about 'loops' or 'variables'!";
}

/* --- User Personalization (Check LocalStorage) --- */
const storedName = localStorage.getItem('explorerName');
if (storedName) {
    // If user is logged in, you might change the CTA
    const ctaButtons = document.querySelectorAll('.btn-cta');
    ctaButtons.forEach(btn => {
        btn.innerText = `Continue Mission, ${storedName}!`;
        btn.parentElement.setAttribute('href', 'courses.html');
    });
}