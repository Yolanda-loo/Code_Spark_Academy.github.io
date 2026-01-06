const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const consoleDiv = document.getElementById('dynamic-code');
const scoreEl = document.getElementById('score');

// Game Settings
const gridSize = 20; // Size of one square
const tileCount = canvas.width / gridSize;
let speed = 7;

let score = 0;
let headX = 10;
let headY = 10;
let velocityX = 0;
let velocityY = 0;

// The Snake Body
let snakeParts = [];
let tailLength = 2;

// The Apple
let appleX = 5;
let appleY = 5;

// Loop Timer
let gameLoop;
let lineCounter = 4; // Start line number for console

// 1. Start the Game
function startGame() {
    velocityX = 0;
    velocityY = 0;
    headX = 10;
    headY = 10;
    tailLength = 2;
    snakeParts = [];
    score = 0;
    scoreEl.innerText = score;
    logCode(`<span class="keyword">while</span> game_is_active:`);
    
    clearInterval(gameLoop);
    gameLoop = setInterval(drawGame, 1000 / speed);
}

// 2. The Main Loop (Runs continuously)
function drawGame() {
    changeSnakePosition();
    
    // Check Game Over
    let result = isGameOver();
    if (result) {
        logCode(`<span class="keyword">break</span> <span class="string"># Ouch! Hit the wall</span>`);
        ctx.fillStyle = "white";
        ctx.font = "50px Fredoka One";
        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        clearInterval(gameLoop);
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
}

// 3. Logic Functions
function isGameOver() {
    let gameOver = false;

    // Walls
    if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
        gameOver = true;
    }
    
    // Self Collision
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            logCode(`<span class="keyword">break</span> <span class="string"># Ouch! Bit my tail</span>`);
        }
    }
    return gameOver;
}

function clearScreen() {
    ctx.fillStyle = '#2E7D32'; // Jungle Green
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = '#AED581'; // Light Green
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
    }

    // New Head Position
    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = '#FFEB3B'; // Yellow Head
    ctx.fillRect(headX * gridSize, headY * gridSize, gridSize - 2, gridSize - 2);
}

function changeSnakePosition() {
    headX = headX + velocityX;
    headY = headY + velocityY;
}

function drawApple() {
    ctx.fillStyle = '#FF5252'; // Red Apple
    ctx.beginPath();
    ctx.arc((appleX * gridSize) + gridSize/2, (appleY * gridSize) + gridSize/2, gridSize/2, 0, 2 * Math.PI);
    ctx.fill();
}

function checkAppleCollision() {
    if (appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        scoreEl.innerText = score;
        
        // Educational Moment: Show code when eating
        logCode(`&nbsp;&nbsp; snake.<span class="func">eat</span>(<span class="string">"apple"</span>) <span class="string"># Score: ${score}</span>`);
    }
}

// 4. Input Handling
document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    // Prevent scrolling with arrows
    if([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }

    // Up
    if (event.keyCode == 38) {
        if (velocityY == 1) return;
        velocityY = -1;
        velocityX = 0;
    }
    // Down
    if (event.keyCode == 40) {
        if (velocityY == -1) return;
        velocityY = 1;
        velocityX = 0;
    }
    // Left
    if (event.keyCode == 37) {
        if (velocityX == 1) return;
        velocityY = 0;
        velocityX = -1;
    }
    // Right
    if (event.keyCode == 39) {
        if (velocityX == -1) return;
        velocityY = 0;
        velocityX = 1;
    }
}

// Helper Class
class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

// Helper for Fake Console
function logCode(html) {
    const div = document.createElement('div');
    div.innerHTML = `<span class="line-num">${lineCounter}</span> ${html}`;
    consoleDiv.appendChild(div);
    consoleDiv.scrollTop = consoleDiv.scrollHeight; // Auto scroll
    lineCounter++;
}

function resetGame() {
    consoleDiv.innerHTML = ''; // Clear logs
    lineCounter = 4;
    startGame();
}

// Init
startGame();