# 🚀 Code Spark Academy

**Code Spark Academy** 
is an interactive, web-based platform designed to introduce children (ages 6-12) to the world of coding. 
The highlight of the project is **"Smart Sparkie"**, a friendly AI robot companion that answers questions, tells jokes, and teaches coding concepts in a safe, offline environment.


## ✨ Features

* **🤖 Smart Sparkie Chatbot:** An intelligent, keyword-driven bot that provides instant help with Math, Science, and Coding (Python/JS) without needing an internet connection or expensive API keys.
* **🔐 User Login System:** A simulated login interface that welcomes students by name.
* **🎨 Kid-Friendly UI:** Bright colors, large buttons, and emoji-based interactions designed for young learners.
* **⚡ High Performance:** Runs locally with zero latency since it doesn't rely on external cloud servers.

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
* **Backend:** Node.js, Express.js
* **Dependencies:** `body-parser`, `dotenv`, `express`

## ⚙️ Installation & Setup

Follow these steps to run the project on your own computer:

1.  **Clone the repository** (or download the files):
    ```bash
    git clone [https://github.com/YourUsername/Code_Spark_Academy.git](https://github.com/YourUsername/Code_Spark_Academy.git)
    cd Code_Spark_Academy
    ```

2.  **Install Dependencies:**
    Open your terminal/command prompt in the project folder and run:
    ```bash
    npm install
    ```

3.  **Start the Server:**
    ```bash
    npm start
    ```

4.  **Launch:**
    Open your web browser and go to:
    `http://localhost:3000`

## 🎮 How to Interact with Sparkie

Sparkie uses a "Local Logic Brain" to understand you. Try asking these commands:

* **Greetings:** "Hello", "Who are you?"
* **Coding:** "Show me Python", "How do I write a loop?", "JavaScript help"
* **Fun:** "Tell me a joke", "You are cool"
* **Math/Science:** "Do you know Math?", "Tell me about space"

## 📂 Project Structure

```text
Code_Spark_Academy/
├── public/              # Frontend files
│   ├── index.html       # Main website
│   ├── style.css        # Styling and animations
│   └── script.js        # Client-side logic
├── server.js            # Main backend server (The "Brain")
├── package.json         # Project settings and dependencies
└── README.md            # Documentation

