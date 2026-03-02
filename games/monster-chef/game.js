let level = 1;
const maxLevels = 5;

// The items available in the game
const itemsList = [
    { id: 'apple', label: 'APPLE', emoji: '🍎' },
    { id: 'banana', label: 'BANANA', emoji: '🍌' },
    { id: 'grapes', label: 'GRAPES', emoji: '🍇' },
    { id: 'cheese', label: 'CHEESE', emoji: '🧀' },
    { id: 'chicken', label: 'CHICKEN', emoji: '🍗' },
    { id: 'cake', label: 'CAKE', emoji: '🍰' }
];

let targetItem = null;

document.addEventListener('DOMContentLoaded', () => {
    initGame();
});

function initGame() {
    setupLevel();
}

function setupLevel() {
    document.getElementById('current-level').textContent = level;

    // Pick a random item for the alien to request
    targetItem = itemsList[Math.floor(Math.random() * itemsList.length)];

    // Update speech bubble
    const speechEl = document.getElementById('speech-text');
    speechEl.textContent = `I WANT ${targetItem.label.match(/^[AEIOU]/) ? 'AN' : 'A'} ${targetItem.label}, PLEASE.`;
    document.getElementById('speech-bubble').classList.remove('hidden');

    populateFridgeAndConveyor();
    setupDragAndDrop();
}

function populateFridgeAndConveyor() {
    const fridge = document.getElementById('fridge-grid');
    const conveyor = document.getElementById('conveyor-track');

    fridge.innerHTML = '';
    conveyor.innerHTML = '';

    // Shuffle items
    const shuffled = [...itemsList].sort(() => 0.5 - Math.random());

    // Put 4 in fridge, 2 on conveyor
    for (let i = 0; i < 4; i++) {
        fridge.appendChild(createDraggable(shuffled[i]));
    }

    for (let i = 4; i < 6; i++) {
        conveyor.appendChild(createDraggable(shuffled[i]));
    }

    // Pad conveyor to loop nicely (duplicate items)
    for (let i = 4; i < 6; i++) {
        conveyor.appendChild(createDraggable(shuffled[i]));
    }
}

function createDraggable(itemData) {
    const el = document.createElement('div');
    el.className = 'draggable-item';
    el.textContent = itemData.emoji;
    el.dataset.id = itemData.id;
    el.setAttribute('draggable', true);

    // Touch events for mobile
    ['touchstart', 'touchmove', 'touchend'].forEach(evt => {
        el.addEventListener(evt, handleTouch, { passive: false });
    });

    // Desktop drag events
    el.addEventListener('dragstart', dragStart);
    el.addEventListener('dragend', dragEnd);

    return el;
}

// --- Drag & Drop Desktop ---
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    setTimeout(() => {
        e.target.classList.add('dragging');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

const dropZone = document.getElementById('drop-zone');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropZone.addEventListener('dragenter', (e) => {
    e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain');
    handleItemDropped(id);
});

// --- Touch Mobile Drag & Drop ---
let dragEl = null;
let startX, startY, initialX, initialY;

function handleTouch(e) {
    const touch = e.touches[0] || e.changedTouches[0];

    if (e.type === 'touchstart') {
        dragEl = e.target;
        dragEl.classList.add('dragging');
        const rect = dragEl.getBoundingClientRect();
        startX = touch.clientX;
        startY = touch.clientY;
        initialX = dragEl.style.transform;

        // Disable page scroll
        e.preventDefault();
    } else if (e.type === 'touchmove') {
        e.preventDefault();
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        dragEl.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`;
    } else if (e.type === 'touchend') {
        dragEl.classList.remove('dragging');
        dragEl.style.transform = initialX || ''; // reset position

        // Check if dropped in drop zone
        const dropRect = dropZone.getBoundingClientRect();
        if (touch.clientX >= dropRect.left && touch.clientX <= dropRect.right &&
            touch.clientY >= dropRect.top && touch.clientY <= dropRect.bottom) {
            handleItemDropped(dragEl.dataset.id);
        }
        dragEl = null;
    }
}

function handleItemDropped(itemId) {
    if (itemId === targetItem.id) {
        success();
    } else {
        failure();
    }
}

function success() {
    HubAPI.addXP(10);
    const overlay = document.getElementById('feedback-overlay');
    const text = document.getElementById('feedback-text');
    text.textContent = 'YUMMY!';
    text.style.color = '#2ed573';
    overlay.classList.remove('hidden');

    setTimeout(() => {
        overlay.classList.add('hidden');
        level++;
        if (level > maxLevels) {
            winGame();
        } else {
            setupLevel();
        }
    }, 1500);
}

function failure() {
    const overlay = document.getElementById('feedback-overlay');
    const text = document.getElementById('feedback-text');
    text.textContent = 'YUCK!';
    text.style.color = '#ff4757';
    overlay.classList.remove('hidden');

    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 1000);
}

function winGame() {
    const text = document.getElementById('speech-text');
    text.innerHTML = 'IM FULL! <br> YOU WIN! 🏆';
    document.getElementById('fridge-grid').innerHTML = '';
    document.getElementById('conveyor-track').innerHTML = '';
    setTimeout(() => HubAPI.close(), 3000);
}
