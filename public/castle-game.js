const codeArea = document.getElementById('codeArea');
const castleGround = document.getElementById('castle-ground');
const taskText = document.getElementById('taskText');

// Game State
let currentLevel = 1;

// The "Missions"
const levels = [
    {
        id: 1,
        instruction: "Task 1: Every castle needs a name! Type <code>&lt;h1&gt;My Castle&lt;/h1&gt;</code>",
        check: (code) => code.includes("<h1>") && code.includes("</h1>"),
        successMsg: "Great start! Now let's build."
    },
    {
        id: 2,
        instruction: "Task 2: Build a wall! Type <code>&lt;div class='wall'&gt;&lt;/div&gt;</code>",
        check: (code) => code.includes("class='wall'") || code.includes('class="wall"'),
        successMsg: "A solid wall appeared!"
    },
    {
        id: 3,
        instruction: "Task 3: We need a tall tower. Type <code>&lt;div class='tower'&gt;&lt;/div&gt;</code>",
        check: (code) => code.includes("class='tower'") || code.includes('class="tower"'),
        successMsg: "Look at that height!"
    },
    {
        id: 4,
        instruction: "Task 4: Let's add a roof to the tower. Inside the tower div, add <code>&lt;div class='roof'&gt;&lt;/div&gt;</code>",
        check: (code) => code.includes("class='roof'") || code.includes('class="roof"'),
        successMsg: "Now it's rain-proof!"
    },
    {
        id: 5,
        instruction: "Master Builder! Now create your own design using as many walls and towers as you like!",
        check: (code) => false, // Free play mode
        successMsg: ""
    }
];

// 1. Listen for typing
codeArea.addEventListener('input', function() {
    const userCode = codeArea.value;
    
    // Update the visual Preview
    updateCastle(userCode);
    
    // Check if they passed the level
    checkProgress(userCode);
});

// 2. Render the HTML safely
function updateCastle(html) {
    // In a real app, we would sanitize this. 
    // For a local kid's learning app, innerHTML is fine and lets them see results instantly.
    castleGround.innerHTML = html;
}

// 3. Check Level Progress
function checkProgress(code) {
    const levelObj = levels[currentLevel - 1];
    
    if (levelObj.check(code)) {
        // Level Passed!
        currentLevel++;
        
        // Play Sound or Visual Cue here (Optional)
        taskText.innerHTML = `🎉 ${levelObj.successMsg} <br> <strong>Next:</strong> ${levels[currentLevel - 1].instruction}`;
        taskText.parentElement.style.backgroundColor = "#AED581"; // Turn Green momentarily
        
        setTimeout(() => {
            taskText.parentElement.style.backgroundColor = "#FFEE58"; // Back to Yellow
        }, 1000);
    }
}

function resetCastle() {
    codeArea.value = "";
    castleGround.innerHTML = "";
    currentLevel = 1;
    taskText.innerHTML = levels[0].instruction;
}

// Init
codeArea.value = "\n";