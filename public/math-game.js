// Game State
let distanceToSafety = 0; // Starts at 0, need 5000 to win
const GOAL_DISTANCE = 5000;
let currentAnswer = 0;
let engineStreak = 0;

// DOM Elements
const questionEl = document.getElementById('question');
const inputEl = document.getElementById('answerInput');
const feedbackEl = document.getElementById('feedback');
const distDisplay = document.getElementById('distDisplay');
const bar = document.getElementById('distanceBar');
const ship = document.getElementById('playerShip');

function initGame() {
    distanceToSafety = 1000; // Starting Distance from Black Hole
    generateQuestion();
    updateUI();
}

function generateQuestion() {
    // Generate two random numbers between 1 and 20
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    
    // Randomly choose Addition or Subtraction
    const isAddition = Math.random() > 0.5;

    if (isAddition) {
        currentAnswer = num1 + num2;
        questionEl.innerText = `${num1} + ${num2}`;
    } else {
        // Ensure outcome isn't negative for kids
        if(num1 > num2) {
            currentAnswer = num1 - num2;
            questionEl.innerText = `${num1} - ${num2}`;
        } else {
            currentAnswer = num2 - num1;
            questionEl.innerText = `${num2} - ${num1}`;
        }
    }
}

function checkEnter(event) {
    if (event.key === 'Enter') submitAnswer();
}

function submitAnswer() {
    const userVal = parseInt(inputEl.value);
    
    if (isNaN(userVal)) return; // Ignore empty

    if (userVal === currentAnswer) {
        // Correct!
        handleCorrect();
    } else {
        // Wrong!
        handleWrong();
    }
    
    inputEl.value = '';
    inputEl.focus();
}

function handleCorrect() {
    feedbackEl.innerText = "Coordinates Locked! Engines Firing! 🔥";
    feedbackEl.style.color = "#76FF03"; // Green
    
    // Move Ship Away
    distanceToSafety += 1000;
    engineStreak += 10;
    
    // Check Win
    if (distanceToSafety >= GOAL_DISTANCE) {
        victory();
    } else {
        generateQuestion();
        updateUI();
    }
}

function handleWrong() {
    feedbackEl.innerText = "Calculation Error! Gravity pulling us in! ⚠️";
    feedbackEl.style.color = "#FF5252"; // Red
    
    // Move Ship Closer to Black Hole
    distanceToSafety -= 500;
    engineStreak = 0;
    
    // Check Loss
    if (distanceToSafety <= 0) {
        gameOver();
    } else {
        generateQuestion();
        updateUI();
    }
}

function updateUI() {
    // Update Text
    distDisplay.innerText = distanceToSafety;
    document.getElementById('streakDisplay').innerText = engineStreak;

    // Update Progress Bar
    const percent = (distanceToSafety / GOAL_DISTANCE) * 100;
    bar.style.width = percent + "%";

    // Move Ship Visual (CSS Right Property)
    // 0km = 50px (Right), 5000km = 800px (Right)
    const maxRight = 80; // percent
    const minRight = 5;  // percent
    
    // Calculate ship position percentage
    let shipPos = (distanceToSafety / GOAL_DISTANCE) * (maxRight - minRight) + minRight;
    ship.style.right = shipPos + "%";
}

function victory() {
    questionEl.innerText = "HYPERDRIVE ACTIVE!";
    feedbackEl.innerText = "You escaped the event horizon!";
    ship.style.transition = "all 1s";
    ship.style.right = "150%"; // Fly off screen
    
    setTimeout(() => {
        alert("Mission Accomplished! Returning to base.");
        window.location.href = 'courses.html';
    }, 2000);
}

function gameOver() {
    questionEl.innerText = "CRITICAL FAILURE";
    ship.style.transition = "all 2s";
    ship.style.right = "100%"; // Sucked into black hole
    ship.style.opacity = "0";
    
    setTimeout(() => {
        alert("Ship lost to the singularity. Try again!");
        initGame();
        ship.style.opacity = "1";
    }, 2500);
}

// Start
initGame();