// Game State
const urlParams = new URLSearchParams(window.location.search);
const currentLang = urlParams.get('lang') || 'en';

const state = {
    xp: 0,
    coins: 0,
    basketItems: [],
    currentTotal: 0,
    customerPaid: 0,
    changeTrayItems: [],
    currentChangeTotal: 0,
    isBrokenMode: false,
    gameDifficulty: urlParams.get('diff') || 'easy',
    customer: {
        face: '😊',
        accessories: []
    }
};

const t = {
    en: {
        total: "Total: ",
        paid: "Paid: ",
        change: "Change: ",
        error: "⚠️ REGISTER ERROR",
        ring_up: "Ring Up!",
        hand_to_customer: "Hand to Customer",
        clear_tray: "Clear Tray",
        customer_basket: "Customer's Basket",
        change_tray_label: "Change Tray",
        bubble_single: "I'd like {0}, please!",
        bubble_multiple: "I'd like {0}, please!",
        bubble_paid: "Here is {0}€.",
        more_items: "Wait! I still need more items!",
        finish_rings: "Finish ringing up the items first!",
        confused: "The customer looks confused... Check your change again!",
        success: "Fantastic Shopkeeper!",
        next: "Next Customer ➔",
        title: "🛒 Little Merchant",
        and: " and ",
        items: {
            apple: "an apple", bread: "some bread", milk: "some milk", cheese: "some cheese",
            cupcake: "a cupcake", teddy_bear: "a teddy bear", toy_car: "a toy car"
        }
    },
    fr: {
        total: "Total : ",
        paid: "Payé : ",
        change: "Rendu : ",
        error: "⚠️ ERREUR CAISSE",
        ring_up: "Encaisser !",
        hand_to_customer: "Rendre la monnaie",
        clear_tray: "Vider",
        customer_basket: "Panier du Client",
        change_tray_label: "Rendu Monnaie",
        bubble_single: "Je voudrais {0}, s'il vous plaît !",
        bubble_multiple: "Je voudrais {0}, s'il vous plaît !",
        bubble_paid: "Voici {0}€.",
        more_items: "Attendez ! Il me manque des articles !",
        finish_rings: "Terminez d'encaisser les articles d'abord !",
        confused: "Le client a l'air confus... Vérifiez votre monnaie !",
        success: "Super Marchand(e) !",
        next: "Client Suivant ➔",
        title: "🛒 La Marchande",
        and: " et ",
        items: {
            apple: "une pomme", bread: "du pain", milk: "du lait", cheese: "du fromage",
            cupcake: "un cupcake", teddy_bear: "un ours en peluche", toy_car: "une petite voiture"
        }
    },
    es: {
        total: "Total: ",
        paid: "Pagado: ",
        change: "Cambio: ",
        error: "⚠️ ERROR DE CAJA",
        ring_up: "¡Cobrar!",
        hand_to_customer: "Dar el cambio",
        clear_tray: "Limpiar",
        customer_basket: "Cesta del Cliente",
        change_tray_label: "Bandeja de Cambio",
        bubble_single: "¡Querría {0}, por favor!",
        bubble_multiple: "¡Querría {0}, por favor!",
        bubble_paid: "Aquí tiene {0}€.",
        more_items: "¡Espere! ¡Aún necesito más artículos!",
        finish_rings: "¡Termine de cobrar los artículos primero!",
        confused: "El cliente parece confundido... ¡Revise el cambio!",
        success: "¡Fantástico tendero/a!",
        next: "Siguiente Cliente ➔",
        title: "🛒 La Tiendita",
        and: " y ",
        items: {
            apple: "una manzana", bread: "algo de pan", milk: "algo de leche", cheese: "algo de queso",
            cupcake: "una magdalena", teddy_bear: "un oso de peluche", toy_car: "un coche de juguete"
        }
    }
};

const langText = t[currentLang] || t['en'];


const customerOptions = {
    faces: ['😊', '😄', '🙂', '😋', '😎', '🤩', '😇', '🤠'],
    accessories: [
        { type: 'hat', icon: '🎩' },
        { type: 'hat', icon: '🧢' },
        { type: 'hat', icon: '👒' },
        { type: 'hat', icon: '🎓' },
        { type: 'glasses', icon: '👓' },
        { type: 'glasses', icon: '🕶️' },
        { type: 'special', icon: '🥸' }, // Includes moustache + glasses
        { type: 'special', icon: '🎅' }  // Beard
    ]
};

// Item Database
const items = {
    apple: { name: 'Apple', price: 2.50, icon: 'assets/items/apple.png' },
    bread: { name: 'Bread', price: 1.80, icon: 'assets/items/bread.png' },
    milk: { name: 'Milk', price: 3.20, icon: 'assets/items/milk.png' },
    cheese: { name: 'Cheese', price: 4.50, icon: 'assets/items/cheese.png' },
    cupcake: { name: 'Cupcake', price: 2.20, icon: 'assets/items/cupcake.png' },
    teddy_bear: { name: 'Teddy Bear', price: 12.00, icon: 'assets/items/teddy_bear.png' },
    toy_car: { name: 'Toy Car', price: 15.00, icon: 'assets/items/toy_car.png' }
};

// Initialization
window.onload = () => {
    // Get HP/XP from Hub if available (via postMessage or localStorage)
    const savedState = JSON.parse(localStorage.getItem('hub_state') || '{}');
    state.xp = savedState.xp || 0;
    state.coins = savedState.coins || 0;
    updateStats();
    translateStaticUI();
    nextCustomer();
};

function translateStaticUI() {
    document.querySelector('h1').innerText = langText.title;
    document.querySelector('.area-label').innerText = langText.customer_basket;
    document.querySelectorAll('.area-label')[1].innerText = langText.change_tray_label;
    document.getElementById('broken-screen').innerText = langText.error;
    document.querySelector('.action-btn').innerText = langText.ring_up;
    document.querySelector('.action-btn.success').innerText = langText.hand_to_customer;
    document.querySelector('.clear-btn').innerText = langText.clear_tray;
    document.querySelector('.next-btn').innerText = langText.next;
}


function updateStats() {
    document.getElementById('xp-count').innerText = state.xp;
    document.getElementById('coins-count').innerText = state.coins;
}

// Customer Logic
function nextCustomer() {
    state.basketItems = [];
    state.changeTrayItems = [];
    state.currentTotal = 0;
    state.currentChangeTotal = 0;
    state.isBrokenMode = Math.random() < 0.3; // 30% chance of broken register

    document.getElementById('basket-items').innerHTML = '';
    document.getElementById('change-items').innerHTML = '';
    document.getElementById('feedback').classList.add('hidden');

    // Reset Register
    document.getElementById('register-total').innerText = langText.total + '0.00€';
    document.getElementById('register-paid').innerText = langText.paid + '0.00€';
    document.getElementById('register-change').innerText = langText.change + '0.00€';

    if (state.isBrokenMode) {
        document.getElementById('broken-screen').classList.remove('hidden');
        document.getElementById('register-total').classList.add('hidden');
        document.getElementById('register-paid').classList.add('hidden');
        document.getElementById('register-change').classList.add('hidden');
    } else {
        document.getElementById('broken-screen').classList.add('hidden');
        document.getElementById('register-total').classList.remove('hidden');
        document.getElementById('register-paid').classList.remove('hidden');
        document.getElementById('register-change').classList.remove('hidden');
    }

    // Generate Request
    const itemCount = Math.floor(Math.random() * 3) + 1;
    const requestedItems = Object.keys(items).sort(() => 0.5 - Math.random()).slice(0, itemCount);
    const itemNames = requestedItems.map(id => langText.items[id] || items[id].name);

    let bubbleText = "";
    if (itemNames.length === 1) {
        bubbleText = langText.bubble_single.replace('{0}', itemNames[0]);
    } else {
        const lastItem = itemNames.pop();
        const andConjunction = langText.and || ' & ';
        const joinedItems = itemNames.join(', ') + andConjunction + lastItem;
        bubbleText = langText.bubble_multiple.replace('{0}', joinedItems);
    }

    document.getElementById('customer-bubble').innerText = bubbleText;
    state.requestedIdList = requestedItems;

    updateCustomerUI();
}

function updateCustomerUI() {
    const faceEl = document.querySelector('.character-base');
    const accEl = document.getElementById('customer-accessories');

    // Randomize
    state.customer.face = customerOptions.faces[Math.floor(Math.random() * customerOptions.faces.length)];
    state.customer.accessories = [];

    // 60% chance for hat, 60% for glasses
    if (Math.random() < 0.6) {
        const hats = customerOptions.accessories.filter(a => a.type === 'hat');
        state.customer.accessories.push(hats[Math.floor(Math.random() * hats.length)].icon);
    }
    if (Math.random() < 0.6) {
        const glasses = customerOptions.accessories.filter(a => a.type === 'glasses' || a.type === 'special');
        state.customer.accessories.push(glasses[Math.floor(Math.random() * glasses.length)].icon);
    }

    faceEl.innerText = state.customer.face;
    accEl.innerHTML = '';
    state.customer.accessories.forEach(acc => {
        const div = document.createElement('div');
        div.className = 'customer-acc';
        div.innerText = acc;
        accEl.appendChild(div);
    });
}

// Drag & Drop Items
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("item-id", ev.target.closest('.item').dataset.id);
}

function drop(ev) {
    ev.preventDefault();
    const itemId = ev.dataTransfer.getData("item-id");
    if (!itemId || !items[itemId]) return;

    addItemToBasket(itemId);
}

function addItemToBasket(itemId) {
    const item = items[itemId];
    state.basketItems.push(itemId);
    state.currentTotal += item.price;

    // UI Update
    const img = document.createElement('img');
    img.src = item.icon;
    img.className = 'basket-item';
    document.getElementById('basket-items').appendChild(img);

    if (!state.isBrokenMode) {
        document.getElementById('register-total').innerText = `${langText.total}${state.currentTotal.toFixed(2)}€`;
    }
}

// Sale Completion
function completeSale() {
    if (state.basketItems.length === 0) return;

    // Verify all requested items are in basket
    const allPresent = state.requestedIdList.every(id => state.basketItems.includes(id));
    if (!allPresent) {
        alert(langText.more_items);
        return;
    }

    // Customer Pays
    const paymentOptions = [5, 10, 20, 50];
    state.customerPaid = paymentOptions.find(p => p >= state.currentTotal) || 100;

    document.getElementById('customer-bubble').innerText = langText.bubble_paid.replace('{0}', state.customerPaid.toFixed(2));

    if (!state.isBrokenMode) {
        document.getElementById('register-paid').innerText = `${langText.paid}${state.customerPaid.toFixed(2)}€`;
        const change = state.customerPaid - state.currentTotal;
        document.getElementById('register-change').innerText = `${langText.change}${change.toFixed(2)}€`;
    }
}

// Drag & Drop Money
function dragMoney(ev) {
    ev.dataTransfer.setData("money-value", ev.target.dataset.value);
}

function dropMoney(ev) {
    ev.preventDefault();
    const value = parseFloat(ev.dataTransfer.getData("money-value"));
    if (isNaN(value)) return;

    addMoneyToTray(value);
}

function addMoneyToTray(value) {
    state.changeTrayItems.push(value);
    state.currentChangeTotal += value;

    const div = document.createElement('div');
    div.className = value >= 5 ? 'money bill mini' : 'money coin mini';
    div.innerText = value >= 1 ? `${value}€` : `${(value * 100)}¢`;
    div.style.width = value >= 5 ? '40px' : '25px';
    div.style.height = value >= 5 ? '20px' : '25px';
    div.style.fontSize = '10px';

    document.getElementById('change-items').appendChild(div);
}

function clearTray() {
    state.changeTrayItems = [];
    state.currentChangeTotal = 0;
    document.getElementById('change-items').innerHTML = '';
}

// Change Verification
function checkChange() {
    if (state.customerPaid === 0) {
        alert(langText.finish_rings);
        return;
    }

    const correctChange = state.customerPaid - state.currentTotal;
    const diff = Math.abs(state.currentChangeTotal - correctChange);

    if (diff < 0.01) {
        showFeedback(true);
    } else {
        alert(langText.confused);
    }
}

function showFeedback(success) {
    const feedback = document.getElementById('feedback');
    const msg = document.getElementById('feedback-msg');
    const xpLabel = document.getElementById('xp-earned');

    if (success) {
        msg.innerText = langText.success;
        const xp = state.isBrokenMode ? 20 : 10;
        xpLabel.innerText = `+${xp} XP`;
        state.xp += xp;
        state.coins += Math.floor(state.currentTotal);

        // Notify Hub
        window.parent.postMessage({ type: 'game_complete', xp: xp, coins: Math.floor(state.currentTotal) }, '*');
    }

    updateStats();
    feedback.classList.remove('hidden');
}

function goBack() {
    window.location.href = '../../index.html';
}
