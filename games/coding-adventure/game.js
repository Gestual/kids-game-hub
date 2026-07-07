let level = 1;
const maxLevels = 3;

// Grid levels configuration
const levels = {
    1: {
        size: 5,
        start: { x: 0, y: 0, dir: 'right' },
        target: { x: 4, y: 2 },
        path: [
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
            { x: 2, y: 1 }, { x: 2, y: 2 },
            { x: 3, y: 2 }, { x: 4, y: 2 }
        ],
        stars: [
            { x: 2, y: 0 }, { x: 2, y: 2 }
        ]
    },
    2: {
        size: 6,
        start: { x: 0, y: 0, dir: 'right' },
        target: { x: 5, y: 4 },
        path: [
            { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 },
            { x: 2, y: 1 }, { x: 2, y: 2 },
            { x: 3, y: 2 }, { x: 4, y: 2 },
            { x: 4, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 4 }
        ],
        stars: [
            { x: 2, y: 0 }, { x: 4, y: 2 }, { x: 4, y: 4 }
        ]
    },
    3: {
        size: 6,
        start: { x: 0, y: 0, dir: 'right' },
        target: { x: 5, y: 5 },
        path: [
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 },
            { x: 1, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 3 },
            { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 4, y: 5 }, { x: 5, y: 5 }
        ],
        stars: [
            { x: 0, y: 2 }, { x: 2, y: 3 }, { x: 3, y: 5 }
        ]
    }
};

let robot = { x: 0, y: 0, dir: 'right' };
let program = []; // List of command strings
let starsCollected = [];
let isRunning = false;
let timeLeft = 60;
let timerInterval = null;
let executionTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    initLevel();
    setupDragAndDropHandlers();
});

function initLevel() {
    const config = levels[level];
    robot = { ...config.start };
    program = [];
    starsCollected = [];
    isRunning = false;
    timeLeft = 60;
    
    document.getElementById('current-level').textContent = level;
    document.getElementById('time-left').textContent = timeLeft;
    
    renderGrid();
    updateTimeline();
    
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!isRunning) {
            timeLeft--;
            document.getElementById('time-left').textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                showToast("TIME'S UP! Try resetting.");
            }
        }
    }, 1000);
}

function renderGrid() {
    const config = levels[level];
    const grid = document.getElementById('play-grid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${config.size}, 60px)`;
    grid.style.gridTemplateRows = `repeat(${config.size}, 60px)`;

    for (let y = 0; y < config.size; y++) {
        for (let x = 0; x < config.size; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            
            // Check if cell is path or obstacle
            const isPath = config.path.some(p => p.x === x && p.y === y);
            if (isPath) {
                cell.classList.add('path');
            } else {
                cell.classList.add('obstacle');
                cell.textContent = '👾'; // Space monster/obstacle
            }

            // Check if star is here (and not collected yet)
            const hasStar = config.stars.some(s => s.x === x && s.y === y);
            const isCollected = starsCollected.some(s => s.x === x && s.y === y);
            if (hasStar && !isCollected) {
                cell.textContent = '⭐';
            }

            // Check if target portal is here
            if (config.target.x === x && config.target.y === y) {
                cell.textContent = '🌀';
                cell.style.background = 'rgba(112, 0, 255, 0.2)';
            }

            // Check if robot is here
            if (robot.x === x && robot.y === y) {
                cell.textContent = '🤖';
                cell.style.fontSize = '2.4rem';
                
                // Add direction arrow overlay
                const dirArrow = document.createElement('div');
                dirArrow.className = 'robot-dir';
                const arrows = { right: '➡️', down: '⬇️', left: '⬅️', up: '⬆️' };
                dirArrow.textContent = arrows[robot.dir];
                cell.appendChild(dirArrow);
            }

            grid.appendChild(cell);
        }
    }
}

// Drag & Drop Timeline Handling
function setupDragAndDropHandlers() {
    const blocks = document.querySelectorAll('.cmd-block');
    const timeline = document.getElementById('timeline');

    blocks.forEach(block => {
        block.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', block.dataset.cmd);
        });

        // Mobile click-to-add fallback
        block.addEventListener('click', () => {
            if (isRunning) return;
            addCommand(block.dataset.cmd);
        });
    });

    timeline.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    timeline.addEventListener('drop', (e) => {
        e.preventDefault();
        if (isRunning) return;
        const cmd = e.dataTransfer.getData('text/plain');
        if (cmd) addCommand(cmd);
    });
}

function addCommand(cmd) {
    program.push(cmd);
    updateTimeline();
}

function removeCommand(index) {
    if (isRunning) return;
    program.splice(index, 1);
    updateTimeline();
}

function updateTimeline() {
    const timeline = document.getElementById('timeline');
    const placeholder = timeline.querySelector('.timeline-placeholder');
    
    // Clear old items
    timeline.querySelectorAll('.timeline-item').forEach(item => item.remove());

    if (program.length === 0) {
        if (placeholder) placeholder.style.display = 'block';
        return;
    }

    if (placeholder) placeholder.style.display = 'none';

    program.forEach((cmd, idx) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        const labels = {
            forward: '➡️ Move Forward',
            left: '↩️ Turn Left',
            right: '↪️ Turn Right',
            loop2: '🔄 Repeat Preceding x2'
        };

        item.innerHTML = `
            <span>${idx + 1}. ${labels[cmd]}</span>
            <button class="btn-remove" onclick="removeCommand(${idx})">✖</button>
        `;
        timeline.appendChild(item);
    });
}

// Expand loops in program execution list
function getExpandedProgram() {
    const expanded = [];
    for (let i = 0; i < program.length; i++) {
        const cmd = program[i];
        if (cmd === 'loop2') {
            const prev = expanded[expanded.length - 1];
            if (prev) {
                expanded.push(prev);
                expanded.push(prev);
            }
        } else {
            expanded.push(cmd);
        }
    }
    return expanded;
}

function runProgram() {
    if (isRunning || program.length === 0) return;
    isRunning = true;
    
    // Reset robot back to level starting values first
    const config = levels[level];
    robot = { ...config.start };
    starsCollected = [];
    renderGrid();

    const expanded = getExpandedProgram();
    let stepIndex = 0;

    function step() {
        if (stepIndex >= expanded.length) {
            checkFinalState();
            return;
        }

        const cmd = expanded[stepIndex];
        executeCommand(cmd);
        renderGrid();
        
        // Highlight active command in DOM
        const items = document.querySelectorAll('.timeline-item');
        items.forEach(it => it.style.borderColor = 'var(--accent)');
        
        // Map expanded index back to original index approximate
        let originalIdx = 0;
        let count = 0;
        for (let i = 0; i < program.length; i++) {
            if (program[i] === 'loop2') {
                count += 2;
            } else {
                count++;
            }
            if (count > stepIndex) {
                originalIdx = i;
                break;
            }
        }
        if (items[originalIdx]) {
            items[originalIdx].style.borderColor = 'var(--accent-secondary)';
        }

        // Validate cell collisions
        if (checkCrash()) {
            showToast("CRASHED! 💥 Ouch, space obstacles!");
            isRunning = false;
            return;
        }

        stepIndex++;
        executionTimeout = setTimeout(step, 600);
    }

    step();
}

function executeCommand(cmd) {
    if (cmd === 'forward') {
        if (robot.dir === 'right') robot.x++;
        else if (robot.dir === 'left') robot.x--;
        else if (robot.dir === 'down') robot.y++;
        else if (robot.dir === 'up') robot.y--;
    } else if (cmd === 'left') {
        const rotations = { right: 'up', up: 'left', left: 'down', down: 'right' };
        robot.dir = rotations[robot.dir];
    } else if (cmd === 'right') {
        const rotations = { right: 'down', down: 'left', left: 'up', up: 'right' };
        robot.dir = rotations[robot.dir];
    }

    // Collect stars on the fly
    const config = levels[level];
    const starHere = config.stars.find(s => s.x === robot.x && s.y === robot.y);
    if (starHere) {
        const alreadyCollected = starsCollected.some(s => s.x === robot.x && s.y === robot.y);
        if (!alreadyCollected) {
            starsCollected.push(starHere);
        }
    }
}

function checkCrash() {
    const config = levels[level];
    
    // Bounds check
    if (robot.x < 0 || robot.x >= config.size || robot.y < 0 || robot.y >= config.size) {
        return true;
    }

    // Obstacle check
    const isPath = config.path.some(p => p.x === robot.x && p.y === robot.y);
    return !isPath;
}

function checkFinalState() {
    isRunning = false;
    const config = levels[level];

    // Reached portal?
    const reachedPortal = robot.x === config.target.x && robot.y === config.target.y;
    // Collected all stars?
    const allStars = starsCollected.length === config.stars.length;

    if (reachedPortal && allStars) {
        clearInterval(timerInterval);
        document.getElementById('success-modal').classList.remove('hidden');
    } else if (reachedPortal && !allStars) {
        showToast("PORTAL LOCKED! 🔒 You must collect all stars first!");
    } else {
        showToast("MISSION FAILED! 🤖 Robot did not reach the portal.");
    }
}

function resetLevel() {
    if (executionTimeout) clearTimeout(executionTimeout);
    initLevel();
}

function nextLevel() {
    document.getElementById('success-modal').classList.add('hidden');
    HubAPI.complete(15, 10); // Award 15 XP and 10 coins

    level++;
    if (level > maxLevels) {
        level = 1;
        HubAPI.close();
    } else {
        initLevel();
    }
}

function showToast(msg) {
    const toast = document.getElementById('failure-toast');
    toast.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}
