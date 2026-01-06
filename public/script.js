/* --- UPDATED AI Chat Logic (Server-Side) --- */
function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const chatBody = document.getElementById('chatBody');
    const userText = inputField.value.trim();

    if (userText === "") return;

    // 1. Display User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-msg';
    userDiv.innerText = userText;
    chatBody.appendChild(userDiv);
    inputField.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. Add Loading Indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message bot-msg';
    loadingDiv.innerText = "Thinking... 🤔";
    loadingDiv.id = "loading-msg";
    chatBody.appendChild(loadingDiv);

    try {
        // 3. Send data to our new Backend
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();

        // 4. Update UI with Server Response
        document.getElementById('loading-msg').remove(); // Remove loading
        
        const botDiv = document.createElement('div');
        botDiv.className = 'message bot-msg';
        botDiv.innerText = data.reply; // Data from server.js
        chatBody.appendChild(botDiv);

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading-msg').innerText = "Ouch! My circuits are jammed. Try again.";
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}