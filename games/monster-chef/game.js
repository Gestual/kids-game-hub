let level = 1;
const maxLevels = 10;
let currentLanguage = 'en'; // default, will be overridden by Hub

// The expanded items dictionary
const itemsList = [
    // Fruits & Veggies
    { id: 'apple', label: { en: 'apple', fr: 'pomme', es: 'manzana' }, plural: { en: 'apples', fr: 'pommes', es: 'manzanas' }, emoji: '🍎', category: 'food' },
    { id: 'banana', label: { en: 'banana', fr: 'banane', es: 'plátano' }, plural: { en: 'bananas', fr: 'bananes', es: 'plátanos' }, emoji: '🍌', category: 'food' },
    { id: 'grapes', label: { en: 'grapes', fr: 'raisin', es: 'uvas' }, plural: { en: 'grapes', fr: 'raisins', es: 'uvas' }, emoji: '🍇', category: 'food' },
    { id: 'carrot', label: { en: 'carrot', fr: 'carotte', es: 'zanahoria' }, plural: { en: 'carrots', fr: 'carottes', es: 'zanahorias' }, emoji: '🥕', category: 'food' },
    { id: 'broccoli', label: { en: 'broccoli', fr: 'brocoli', es: 'brócoli' }, plural: { en: 'broccoli', fr: 'brocolis', es: 'brócolis' }, emoji: '🥦', category: 'food' },
    { id: 'strawberry', label: { en: 'strawberry', fr: 'fraise', es: 'fresa' }, plural: { en: 'strawberries', fr: 'fraises', es: 'fresas' }, emoji: '🍓', category: 'food' },
    // Magical/Other
    { id: 'egg', label: { en: 'egg', fr: 'œuf', es: 'huevo' }, plural: { en: 'eggs', fr: 'œufs', es: 'huevos' }, emoji: '🥚', category: 'magic' },
    { id: 'mushroom', label: { en: 'mushroom', fr: 'champignon', es: 'champiñón' }, plural: { en: 'mushrooms', fr: 'champignons', es: 'champiñones' }, emoji: '🍄', category: 'magic' },
    { id: 'crystal', label: { en: 'crystal', fr: 'cristal', es: 'cristal' }, plural: { en: 'crystals', fr: 'cristaux', es: 'cristales' }, emoji: '💎', category: 'magic' },
    { id: 'potion', label: { en: 'potion', fr: 'potion', es: 'poción' }, plural: { en: 'potions', fr: 'potions', es: 'pociones' }, emoji: '🧪', category: 'magic' },
    // Utensils (with specific action verbs)
    { id: 'spoon', label: { en: 'spoon', fr: 'cuillère', es: 'cuchara' }, plural: { en: 'spoons', fr: 'cuillères', es: 'cucharas' }, emoji: '🥄', category: 'utensil', verb: { en: 'MIX', fr: 'MÉLANGE', es: 'MEZCLA' } },
    { id: 'whisk', label: { en: 'whisk', fr: 'fouet', es: 'batidor' }, plural: { en: 'whisks', fr: 'fouets', es: 'batidores' }, emoji: '🥣', category: 'utensil', verb: { en: 'WHIP', fr: 'FOUETTE', es: 'BATE' } },
    { id: 'wand', label: { en: 'wand', fr: 'baguette', es: 'varita' }, plural: { en: 'wands', fr: 'baguettes', es: 'varitas' }, emoji: '🪄', category: 'utensil', verb: { en: 'CRUSH', fr: 'ÉCRASE', es: 'APLASTA' } }
];

let currentRecipe = []; // Array of { item: itemObject, count: number }
let cauldronContents = {}; // Map of id -> count

// Speech synthesis helper
function speak(text, langCode) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel(); // Interrupt previous speech
    const msg = new SpeechSynthesisUtterance(text);

    // Map internal lang codes to BCP 47
    const langMap = { 'en': 'en-US', 'fr': 'fr-FR', 'es': 'es-ES' };
    msg.lang = langMap[langCode] || 'en-US';
    msg.rate = 0.9; // Slightly slower for kids
    window.speechSynthesis.speak(msg);
}

// Hub Integration
window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'languageChanged') {
        currentLanguage = event.data.language;
        // Optionally re-translate current UI state here
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Attempt to grab language from URL params immediately (Hub convention)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('lang')) {
        currentLanguage = urlParams.get('lang');
    }

    // Slight delay to ensure fonts/layout load before generating first speech
    setTimeout(initGame, 500);
});

function initGame() {
    setupLevel();
}

function setupLevel() {
    document.getElementById('current-level').textContent = level;
    cauldronContents = {}; // clear cauldron

    generateRecipe();
    updateRecipeUI();
    populatePantry();
    setupDragAndDrop();

    // Speak the request
    const speechEl = document.getElementById('speech-text');
    speak(speechEl.textContent, currentLanguage);
}

function generateRecipe() {
    currentRecipe = [];
    let numIngredients = 1;
    let maxQuantityPerItem = 1;
    let requireUtensil = false;

    // Difficulty scaling
    if (level === 2) { maxQuantityPerItem = 3; }
    if (level === 3) { numIngredients = 2; maxQuantityPerItem = 2; }
    if (level >= 4) { numIngredients = 2; maxQuantityPerItem = 3; requireUtensil = true; }
    if (level >= 6) { numIngredients = 3; maxQuantityPerItem = 4; requireUtensil = true; }

    const availableFoods = itemsList.filter(i => i.category !== 'utensil');
    const shuffledFoods = [...availableFoods].sort(() => 0.5 - Math.random());

    for (let i = 0; i < numIngredients; i++) {
        const count = Math.floor(Math.random() * maxQuantityPerItem) + 1;
        currentRecipe.push({ item: shuffledFoods[i], requiredCount: count });
    }

    if (requireUtensil) {
        const utensils = itemsList.filter(i => i.category === 'utensil');
        const randomUtensil = utensils[Math.floor(Math.random() * utensils.length)];
        currentRecipe.push({ item: randomUtensil, requiredCount: 1 });
    }

    buildSentence();
}

function buildSentence() {
    const foodItems = currentRecipe.filter(req => req.item.category !== 'utensil');
    const utensilItem = currentRecipe.find(req => req.item.category === 'utensil');

    const foodParts = foodItems.map(req => {
        const name = req.requiredCount > 1 ? req.item.plural[currentLanguage] : req.item.label[currentLanguage];
        return `${req.requiredCount} ${name.toUpperCase()}`;
    });

    let sentence = "";

    // Assemble the base request for ingredients
    if (currentLanguage === 'en') {
        if (foodParts.length === 1) sentence = `ADD ${foodParts[0]}`;
        else if (foodParts.length === 2) sentence = `ADD ${foodParts[0]} AND ${foodParts[1]}`;
        else sentence = `ADD ${foodParts[0]}, ${foodParts[1]}, AND ${foodParts[2]}`;
    } else if (currentLanguage === 'fr') {
        if (foodParts.length === 1) sentence = `AJOUTE ${foodParts[0]}`;
        else if (foodParts.length === 2) sentence = `AJOUTE ${foodParts[0]} ET ${foodParts[1]}`;
        else sentence = `AJOUTE ${foodParts[0]}, ${foodParts[1]} ET ${foodParts[2]}`;
    } else if (currentLanguage === 'es') {
        if (foodParts.length === 1) sentence = `AÑADE ${foodParts[0]}`;
        else if (foodParts.length === 2) sentence = `AÑADE ${foodParts[0]} Y ${foodParts[1]}`;
        else sentence = `AÑADE ${foodParts[0]}, ${foodParts[1]} Y ${foodParts[2]}`;
    }

    // Append the action verb if a utensil is required
    if (utensilItem) {
        const verb = utensilItem.item.verb[currentLanguage];
        const toolName = utensilItem.item.label[currentLanguage].toUpperCase();

        if (currentLanguage === 'en') {
            sentence += ` AND ${verb} WITH A ${toolName}.`;
        } else if (currentLanguage === 'fr') {
            // French grammar depends slightly on tool gender, but we'll use a neutral construct or UN/UNE based on tool
            const article = (toolName === 'CUILLÈRE' || toolName === 'BAGUETTE') ? 'UNE' : 'UN';
            sentence += ` ET ${verb} AVEC ${article} ${toolName}.`;
        } else if (currentLanguage === 'es') {
            const article = (toolName === 'CUCHARA' || toolName === 'VARITA') ? 'UNA' : 'UN';
            sentence += ` Y ${verb} CON ${article} ${toolName}.`;
        }
    } else {
        sentence += "."; // Just close the sentence if no tool
    }

    const speechEl = document.getElementById('speech-text');
    speechEl.textContent = sentence;
    document.getElementById('speech-bubble').classList.remove('hidden');
}

function updateRecipeUI() {
    const tracker = document.getElementById('recipe-tracker');
    tracker.innerHTML = '';
    tracker.classList.remove('hidden');

    currentRecipe.forEach(req => {
        const currentCount = cauldronContents[req.item.id] || 0;
        const el = document.createElement('div');
        el.className = `recipe-goal ${currentCount >= req.requiredCount ? 'checked' : ''}`;
        el.innerHTML = `${req.item.emoji} ${currentCount}/${req.requiredCount}`;
        tracker.appendChild(el);
    });
}

function populatePantry() {
    const pantry = document.getElementById('pantry-grid');
    pantry.innerHTML = '';

    // We must include all items necessary for the recipe
    let requiredItemsSet = new Set(currentRecipe.map(r => r.item.id));

    // Add some random distractors to fill a 3x3 grid (9 items total)
    let availableList = [...itemsList];
    let slotsToFill = 9 - requiredItemsSet.size;

    let itemsToDisplay = currentRecipe.map(r => r.item);

    for (let i = 0; i < availableList.length; i++) {
        if (slotsToFill <= 0) break;
        if (!requiredItemsSet.has(availableList[i].id)) {
            itemsToDisplay.push(availableList[i]);
            slotsToFill--;
        }
    }

    // Shuffle the display
    itemsToDisplay.sort(() => 0.5 - Math.random());

    itemsToDisplay.forEach(itemData => {
        pantry.appendChild(createDraggable(itemData));
    });
}

function createDraggable(itemData) {
    const el = document.createElement('div');
    el.className = 'draggable-item';
    el.textContent = itemData.emoji;
    el.dataset.id = itemData.id;
    el.setAttribute('draggable', true);

    // Prevent default touch actions like scoll while grabbing
    el.style.touchAction = 'none';

    // Tap to speak
    el.addEventListener('pointerdown', () => {
        speak(itemData.label[currentLanguage], currentLanguage);
    });

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
        if (!dragEl) return;
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
    // Check if this item is part of the recipe
    const recipeRequirement = currentRecipe.find(r => r.item.id === itemId);

    const currentCount = cauldronContents[itemId] || 0;

    if (recipeRequirement && currentCount < recipeRequirement.requiredCount) {
        // Correct item dropped!
        cauldronContents[itemId] = currentCount + 1;
        updateRecipeUI();
        speak("Pop!", currentLanguage); // Little feedback sound

        checkWinCondition();
    } else {
        // Redundant or wrong item
        failure();
    }
}

function checkWinCondition() {
    let allMet = true;
    currentRecipe.forEach(req => {
        if ((cauldronContents[req.item.id] || 0) < req.requiredCount) {
            allMet = false;
        }
    });

    if (allMet) {
        success();
    }
}

function success() {
    HubAPI.addXP(15); // more xp for complex recipes
    const overlay = document.getElementById('feedback-overlay');
    const text = document.getElementById('feedback-text');

    text.textContent = 'YUMMY!';
    if (currentLanguage === 'fr') text.textContent = 'MIAM !';
    if (currentLanguage === 'es') text.textContent = '¡QUÉ RICO!';

    text.style.color = '#2ed573';
    overlay.classList.remove('hidden');
    speak(text.textContent, currentLanguage);

    setTimeout(() => {
        overlay.classList.add('hidden');
        level++;
        if (level > maxLevels) {
            winGame();
        } else {
            setupLevel();
        }
    }, 2000);
}

function failure() {
    const overlay = document.getElementById('feedback-overlay');
    const text = document.getElementById('feedback-text');

    text.textContent = 'OOPS!';
    text.style.color = '#ff4757';
    overlay.classList.remove('hidden');

    setTimeout(() => {
        overlay.classList.add('hidden');
    }, 1000);
}

function winGame() {
    const text = document.getElementById('speech-text');
    let winMsg = 'IM FULL! <br> YOU WIN! 🏆';
    if (currentLanguage === 'fr') winMsg = "JE N'AI PLUS FAIM ! <br> GAGNÉ ! 🏆";
    if (currentLanguage === 'es') winMsg = "¡ESTOY LLENO! <br> ¡GANASTE! 🏆";

    text.innerHTML = winMsg;
    speak("You win!", currentLanguage);

    document.getElementById('pantry-grid').innerHTML = '';
    setTimeout(() => HubAPI.close(), 4000);
}
