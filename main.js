const Hub = {
    state: {
        xp: 0,
        level: 1,
        coins: 100,
        stars: 0,
        energy: 5,
        lang: 'en',
        lastPlayTime: Date.now(),
        continuousPlayMinutes: 0,
        isResting: false,
        currentBackground: 'forest',
        unlockedBackgrounds: ['forest'],
        unlockedCards: ['warrior'],
        currentAvatar: 'warrior',
        currentAccessories: { hat: 'none', glasses: 'none' },
        unlockedAccessories: {
            hats: ['none'],
            glasses: ['none']
        },
        pendingGameId: null
    },

    backgrounds: [
        { id: 'forest', name: 'Magic Forest', src: 'assets/images/bg-forest.png', unlockLevel: 1 },
        { id: 'space', name: 'Deep Space', src: 'assets/images/bg-space.png', unlockLevel: 3 },
        { id: 'ocean', name: 'Blue Ocean', src: 'assets/images/bg-ocean.png', unlockLevel: 5 },
        { id: 'castle', name: 'Royal Castle', src: 'assets/images/bg-castle.png', unlockLevel: 8 },
        { id: 'candy_land', name: 'Candy Land', src: 'assets/images/backgrounds/candy_land.png', unlockLevel: 10 },
        { id: 'dino_jungle', name: 'Dino Jungle', src: 'assets/images/backgrounds/dino_jungle.png', unlockLevel: 12 },
        { id: 'undersea_city', name: 'Undersea City', src: 'assets/images/backgrounds/undersea_city.png', unlockLevel: 15 },
        { id: 'winter_wonderland', name: 'Winter Wonderland', src: 'assets/images/backgrounds/winter_wonderland.png', unlockLevel: 18 },
        { id: 'eiffel', name: 'Paris Tower', src: 'assets/images/backgrounds/eiffel.png', unlockLevel: 20 },
        { id: 'pyramids', name: 'Pyramids', src: 'assets/images/backgrounds/pyramids.png', unlockLevel: 22 },
        { id: 'taj', name: 'Taj Mahal', src: 'assets/images/backgrounds/taj_mahal.png', unlockLevel: 25 },
        { id: 'statue', name: 'Liberty', src: 'assets/images/backgrounds/statue_of_liberty.png', unlockLevel: 28 },
        { id: 'wall', name: 'Great Wall', src: 'assets/images/backgrounds/great_wall.png', unlockLevel: 30 }
    ],

    cards: [
        { id: 'warrior', name: 'Stone Warrior', icon: '🗿', rarity: 'common', unlockLevel: 1 },
        { id: 'alien', name: 'Friendly Alien', src: 'assets/images/avatars/alien.png', rarity: 'common', unlockLevel: 2 },
        { id: 'robot', name: 'Tiny Bot', src: 'assets/images/avatars/robot.png', rarity: 'rare', unlockLevel: 4 },
        { id: 'princess', name: 'Fairy Princess', src: 'assets/images/avatars/princess.png', rarity: 'epic', unlockLevel: 6 },
        { id: 'ninja_cat', name: 'Ninja Cat', src: 'assets/images/avatars/ninja_cat.png', rarity: 'legendary', unlockLevel: 10 },
        { id: 'dragon', name: 'Fire Dragon', icon: '🐉', rarity: 'rare', unlockLevel: 3 },
        { id: 'unicorn', name: 'Magic Unicorn', icon: '🦄', rarity: 'epic', unlockLevel: 5 },
        { id: 'phoenix', name: 'Golden Phoenix', icon: '🔥', rarity: 'legendary', unlockLevel: 8 }
    ],

    accessories: {
        hats: [
            { id: 'none', name: 'No Hat', icon: '❌', unlockLevel: 1 },
            { id: 'wizard', name: 'Wizard Hat', icon: '🧙', unlockLevel: 3 },
            { id: 'cowboy', name: 'Cowboy Hat', icon: '🤠', unlockLevel: 5 },
            { id: 'cap', name: 'Cool Cap', icon: '🧢', unlockLevel: 7 },
            { id: 'crown', name: 'Royal Crown', icon: '👑', unlockLevel: 10 },
            { id: 'tophat', name: 'Top Hat', icon: '🎩', unlockLevel: 15 }
        ],
        glasses: [
            { id: 'none', name: 'No Glasses', icon: '❌', unlockLevel: 1 },
            { id: 'shades', name: 'Cool Shades', icon: '🕶️', unlockLevel: 4 },
            { id: 'nerd', name: 'Nerd Specs', icon: '🤓', unlockLevel: 6 },
            { id: 'monocle', name: 'Monocle', icon: '🧐', unlockLevel: 12 },
            { id: 'mask', name: 'Hero Mask', icon: '🎭', unlockLevel: 20 }
        ]
    },

    activeTab: 'backgrounds',

    translations: {
        en: {
            title: "Kids Game Hub",
            play: "Play",
            lvl: "LVL",
            energy: "Energy",
            games_title: "Games",
            collections_title: "My Collections",
            tab_bg: "Backgrounds",
            tab_cards: "Avatars",
            tab_acc: "Accessories",
            select_difficulty: "Select Difficulty",
            rest_title: "Time to Rest! 🧘",
            rest_msg: "You've played a lot. Take a 5-minute break to rest your eyes.",
            games: {
                sudokids: "SudoKids",
                wordsearch: "Word Search",
                hero_calculus: "Hero Calculus",
                nonogram: "Nonogram",
                2048: "2048 Challenge",
                memory: "Memory Match",
                crack_the_code: "Crack the Code",
                pixel_art: "Pixel Art Color",
                little_merchant: "Little Merchant",
                where_is_nil: "Where is Nil?",
                monster_chef: "Magic Cauldron"
            },
            admin: "Parent Panel 🔒",
            personalize_title: "Personalize"
        },
        fr: {
            title: "Gamer Hub",
            play: "Jouer",
            lvl: "NIV",
            energy: "Énergie",
            games_title: "Jeux",
            collections_title: "Collection",
            tab_bg: "Décors",
            tab_cards: "Avatars",
            tab_acc: "Accessoires",
            rest_title: "Pause Gaming ! 🧘",
            rest_msg: "Session intense ! Fais une pause de 5 minutes pour tes yeux.",
            games: {
                sudokids: "SudoKids",
                wordsearch: "Mots Mêlés",
                hero_calculus: "Calcul Héros",
                nonogram: "Nonogramme",
                2048: "Défi 2048",
                memory: "Mémory Pro",
                crack_the_code: "Crack the Code",
                pixel_art: "Pixel Art",
                little_merchant: "La Marchande",
                where_is_nil: "Où est Nil ?",
                monster_chef: "Chaudron Magique"
            },
            admin: "Espace Parents 🔒",
            select_difficulty: "Choisir la difficulté",
            personalize_title: "Personnaliser"
        },
        es: {
            title: "Gamer Hub",
            play: "Jugar",
            lvl: "NIV",
            energy: "Energía",
            games_title: "Juegos",
            collections_title: "Colección",
            tab_bg: "Fondos",
            tab_cards: "Avatars",
            tab_acc: "Accesorios",
            rest_title: "¡Pausa Gaming! 🧘",
            rest_msg: "¡Sesión intensa! Tómate 5 minutos de descanso para la vista.",
            games: {
                sudokids: "SudoKids",
                wordsearch: "Sopa de Letras",
                hero_calculus: "Cálculo Héroe",
                nonogram: "Nonograma",
                2048: "Reto 2048",
                memory: "Emparejar Pro",
                crack_the_code: "Descifrar el Código",
                pixel_art: "Pixel Art",
                little_merchant: "La Tiendita",
                where_is_nil: "¿Dónde está Nil?",
                monster_chef: "Caldero Mágico"
            },
            admin: "Panel de Padres 🔒",
            select_difficulty: "Elegir Dificultad",
            personalize_title: "Personalizar"
        }
    },

    games: [
        { id: 'sudokids', icon: '🔢', color: '#4D96FF' },
        { id: 'wordsearch', icon: '🔍', color: '#FF92AD' },
        { id: 'hero_calculus', icon: '⚔️', color: '#6BCB77' },
        { id: 'nonogram', icon: '🧩', color: '#FFD93D' },
        { id: '2048', icon: '🔟', color: '#FF6B6B' },
        { id: 'memory', icon: '🧠', color: '#4D96FF' },
        { id: 'crack_the_code', icon: '🔐', color: '#6BCB77' },
        { id: 'pixel_art', icon: '🎨', color: '#FFD93D' },
        { id: 'little_merchant', icon: '🛒', color: '#FF9800' },
        { id: 'where_is_nil', icon: '🌍', color: '#00F2FF' },
        { id: 'monster_chef', icon: '👨‍🍳', color: '#e84393' }
    ],

    init() {
        this.loadState();
        this.detectLanguage();
        this.renderHub();
        this.applyBackground();
        this.startTimers();
        this.setupEventListeners();
        this.setupMessageListener();
        this.updateUI();
        this.rotateAds();
    },

    setupMessageListener() {
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type) {
                switch (event.data.type) {
                    case 'addXP':
                        this.addXP(event.data.amount || 0);
                        break;
                    case 'game_complete':
                        if (event.data.xp) this.addXP(event.data.xp);
                        if (event.data.coins) {
                            this.state.coins += event.data.coins;
                        }
                        this.saveState();
                        this.updateUI('stats');
                        break;
                    case 'closeGame':
                        this.closeGame();
                        this.checkUnlocks();
                        break;
                    case 'gameReady':
                        // Cross-origin fix: Game tells us it's ready
                        break;
                }
            }
        });
    },

    ads: [
        { text: "🌟 Play and Learn every day!", bg: "#FF92AD" },
        { text: "🚀 Discover new worlds in Space!", bg: "#4D96FF" },
        { text: "🍎 Healthy snacks give you more energy!", bg: "#6BCB77" },
        { text: "🎨 Color your imagination!", bg: "#FFD93D" }
    ],

    rotateAds() {
        const banner = document.getElementById('ad-banner');
        if (!banner) return;
        let i = 0;
        setInterval(() => {
            const ad = this.ads[i];
            banner.textContent = ad.text;
            banner.style.backgroundColor = ad.bg;
            i = (i + 1) % this.ads.length;
        }, 10000); // Rotate every 10s
    },

    loadState() {
        const saved = localStorage.getItem('kids_hub_state');
        if (saved) {
            this.state = { ...this.state, ...JSON.parse(saved) };

            // Migration for old 'default' background ID
            if (this.state.currentBackground === 'default') {
                this.state.currentBackground = 'forest';
            }
            if (this.state.unlockedBackgrounds.includes('default')) {
                this.state.unlockedBackgrounds = this.state.unlockedBackgrounds.filter(id => id !== 'default');
                if (!this.state.unlockedBackgrounds.includes('forest')) {
                    this.state.unlockedBackgrounds.push('forest');
                }
            }
        }
    },

    saveState() {
        localStorage.setItem('kids_hub_state', JSON.stringify(this.state));
    },

    detectLanguage() {
        const browserLang = navigator.language.split('-')[0];
        if (this.translations[browserLang]) {
            this.state.lang = browserLang;
        }
        document.getElementById('lang-select').value = this.state.lang;
    },

    setupEventListeners() {
        document.getElementById('lang-select').addEventListener('change', (e) => {
            this.state.lang = e.target.value;
            this.renderHub();
            this.saveState();
            this.updateUI('all');
        });

        document.getElementById('close-game').addEventListener('click', () => {
            this.closeGame();
            this.checkUnlocks();
        });

        // Event delegation for game launched
        document.getElementById('game-grid').addEventListener('click', (e) => {
            const card = e.target.closest('.game-card');
            if (card) {
                const gameId = card.dataset.gameId;
                this.launchGame(gameId);
            }
        });

        document.querySelectorAll('.tab-btn, .personalize-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tabs = btn.parentElement.querySelectorAll('.tab-btn, .personalize-tab-btn');
                tabs.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.activeTab = btn.dataset.tab;
                this.renderPersonalize();
            });
        });
    },

    renderHub() {
        const grid = document.getElementById('game-grid');
        const t = this.translations[this.state.lang] || this.translations.en;
        grid.innerHTML = '';

        this.games.forEach(game => {
            const card = document.createElement('div');
            card.className = 'game-card';
            card.dataset.gameId = game.id;
            card.style.borderTop = `4px solid ${game.color}`;
            card.innerHTML = `
                <div class="game-icon">${game.icon}</div>
                <div class="game-title">${t.games[game.id] || game.id}</div>
                <div class="game-status">${t.play}</div>
            `;
            grid.appendChild(card);
        });
    },

    launchGame(gameId) {
        const t = this.translations[this.state.lang] || this.translations.en;
        if (this.state.energy <= 0) {
            this.showAlert(t.energy || "Energy", "No energy left! Wait for it to recharge.");
            return;
        }
        if (this.state.isResting) {
            this.showAlert(t.rest_title || "Rest Mode", t.rest_msg || "Rest time! Please wait.");
            return;
        }

        this.state.pendingGameId = gameId;

        // Sync modal language with hub language
        const modalSelect = document.getElementById('modal-lang-select');
        if (modalSelect) modalSelect.value = this.state.lang;

        document.getElementById('difficulty-modal').classList.remove('hidden');
    },

    startGameWithDifficulty(diff) {
        const gameId = this.state.pendingGameId;
        const container = document.getElementById('game-container');
        const iframe = document.getElementById('game-iframe');

        // Construct path to game
        const modalSelect = document.getElementById('modal-lang-select');
        const runLang = modalSelect ? modalSelect.value : this.state.lang;
        const gamePath = `games/${gameId.replace(/_/g, '-')}/index.html?diff=${diff}&lang=${runLang}`;

        // Also update hub's global language if they changed it in the modal
        if (runLang !== this.state.lang) {
            this.state.lang = runLang;
            this.renderHub();
            this.updateUI('all');
        }
        iframe.src = gamePath;
        container.classList.remove('hidden');

        this.closeDifficultyModal();

        this.state.energy--;
        this.updateUI('energy');
        this.saveState();
    },

    closeDifficultyModal() {
        document.getElementById('difficulty-modal').classList.add('hidden');
        this.state.pendingGameId = null;
    },

    openAdmin() {
        const password = prompt("Enter Parent Password:");
        if (password === 'admin') {
            window.location.href = 'admin/index.html';
        } else if (password !== null) {
            this.showAlert("Access Denied", "Wrong password!");
        }
    },

    showAlert(title, msg) {
        document.getElementById('alert-title').innerHTML = title;
        document.getElementById('alert-msg').innerHTML = msg;
        document.getElementById('alert-modal').classList.remove('hidden');
    },

    closeGame() {
        const container = document.getElementById('game-container');
        const iframe = document.getElementById('game-iframe');
        container.classList.add('hidden');
        iframe.src = '';
        this.updateUI('stats'); // Ensure UI reflects any XP gains
    },

    openPersonalize() {
        document.getElementById('personalize-modal').classList.remove('hidden');
        this.renderPersonalize();
        this.updatePersonalizePreview();
    },

    closePersonalize() {
        document.getElementById('personalize-modal').classList.add('hidden');
    },

    switchPersonalizeTab(tab) {
        this.activeTab = tab;
        const btns = document.querySelectorAll('.personalize-tab-btn');
        btns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        this.renderPersonalize();
    },

    renderPersonalize() {
        const display = document.getElementById('personalize-display');
        display.innerHTML = '';

        if (this.activeTab === 'backgrounds') {
            this.backgrounds.forEach(bg => {
                const isUnlocked = this.state.unlockedBackgrounds.includes(bg.id);
                const isActive = this.state.currentBackground === bg.id;
                const item = document.createElement('div');
                item.className = `collectible-item ${isUnlocked ? '' : 'locked'} ${isActive ? 'active' : ''}`;
                item.innerHTML = `
                    <img src="${bg.src}" alt="${bg.name}">
                    ${isUnlocked ? '' : `<div class="lock-overlay">🔒<div style="font-size:0.6rem">LVL ${bg.unlockLevel}</div></div>`}
                    <div class="collectible-name">${bg.name}</div>
                `;
                if (isUnlocked) item.onclick = () => this.selectBackground(bg.id);
                display.appendChild(item);
            });
        } else if (this.activeTab === 'cards') {
            this.cards.forEach(card => {
                const isUnlocked = this.state.unlockedCards.includes(card.id);
                const isActive = this.state.currentAvatar === card.id;
                const item = document.createElement('div');
                item.className = `collectible-item ${isUnlocked ? '' : 'locked'} rarity-${card.rarity} ${isActive ? 'active' : ''}`;

                let content = '';
                if (card.icon) {
                    content = `<div class="card-icon" style="font-size: 2.5rem">${card.icon}</div>`;
                } else {
                    content = `<img src="${card.src}" alt="${card.name}" style="width: 80%; height: 80%; object-fit: contain;">`;
                }

                item.innerHTML = `
                    ${content}
                    ${isUnlocked ? '' : `<div class="lock-overlay">🔒<div style="font-size:0.6rem">LVL ${card.unlockLevel}</div></div>`}
                    <div class="collectible-name">${card.name}</div>
                `;
                if (isUnlocked) item.onclick = () => this.selectAvatar(card.id);
                display.appendChild(item);
            });
        } else if (this.activeTab === 'accessories') {
            ['hats', 'glasses'].forEach(type => {
                const header = document.createElement('div');
                header.className = 'collectibles-header';
                header.textContent = type.charAt(0).toUpperCase() + type.slice(1);
                header.style.gridColumn = '1 / -1';
                header.style.color = 'var(--accent)';
                header.style.marginTop = '10px';
                display.appendChild(header);

                this.accessories[type].forEach(acc => {
                    const isUnlocked = this.state.unlockedAccessories[type].includes(acc.id);
                    const isActive = this.state.currentAccessories[type === 'hats' ? 'hat' : 'glasses'] === acc.id;
                    const item = document.createElement('div');
                    item.className = `collectible-item ${isUnlocked ? '' : 'locked'} ${isActive ? 'active' : ''}`;
                    item.innerHTML = `
                        <div class="card-icon" style="font-size: 2.5rem">${acc.icon}</div>
                        ${isUnlocked ? '' : `<div class="lock-overlay">🔒<div style="font-size:0.6rem">LVL ${acc.unlockLevel}</div></div>`}
                        <div class="collectible-name">${acc.name}</div>
                    `;
                    if (isUnlocked) item.onclick = () => this.selectAccessory(type, acc.id);
                    display.appendChild(item);
                });
            });
        }
    },

    updatePersonalizePreview() {
        const preview = document.getElementById('personalize-preview');
        this.renderAvatarWithAccessories(preview, this.state.currentAvatar, this.state.currentAccessories);
    },

    renderAvatarWithAccessories(container, avatarId, accessoryState) {
        if (!container) return;
        container.innerHTML = '';
        const avatar = this.cards.find(c => c.id === avatarId) || this.cards[0];

        const avatarLayout = document.createElement('div');
        avatarLayout.className = 'avatar-layout';

        if (avatar.icon) {
            const base = document.createElement('div');
            base.className = 'avatar-base emoji';
            base.textContent = avatar.icon;
            avatarLayout.appendChild(base);
        } else {
            const base = document.createElement('img');
            base.className = 'avatar-base';
            base.src = avatar.src;
            avatarLayout.appendChild(base);
        }

        if (accessoryState.hat && accessoryState.hat !== 'none') {
            const hat = this.accessories.hats.find(h => h.id === accessoryState.hat);
            if (hat) {
                const hatEl = document.createElement('div');
                hatEl.className = 'accessory hat';
                hatEl.textContent = hat.icon;
                avatarLayout.appendChild(hatEl);
            }
        }

        if (accessoryState.glasses && accessoryState.glasses !== 'none') {
            const glasses = this.accessories.glasses.find(g => g.id === accessoryState.glasses);
            if (glasses) {
                const glassesEl = document.createElement('div');
                glassesEl.className = 'accessory glasses';
                glassesEl.textContent = glasses.icon;
                avatarLayout.appendChild(glassesEl);
            }
        }

        container.appendChild(avatarLayout);
    },

    selectBackground(bgId) {
        this.state.currentBackground = bgId;
        this.applyBackground();
        this.saveState();
        this.renderPersonalize();
    },

    selectAvatar(cardId) {
        this.state.currentAvatar = cardId;
        this.saveState();
        this.updateUI('header');
        this.renderPersonalize();
        this.updatePersonalizePreview();
    },

    selectAccessory(type, accId) {
        if (type === 'hats') this.state.currentAccessories.hat = accId;
        else this.state.currentAccessories.glasses = accId;

        this.saveState();
        this.updateUI('header');
        this.renderPersonalize();
        this.updatePersonalizePreview();
    },

    applyBackground() {
        const bgLayer = document.getElementById('bg-layer');
        if (!bgLayer) return;
        const bg = this.backgrounds.find(b => b.id === this.state.currentBackground) || this.backgrounds[0];
        bgLayer.style.backgroundImage = `url('${bg.src}')`;
    },

    checkUnlocks() {
        let changed = false;
        this.backgrounds.forEach(bg => {
            if (this.state.level >= bg.unlockLevel && !this.state.unlockedBackgrounds.includes(bg.id)) {
                this.state.unlockedBackgrounds.push(bg.id);
                changed = true;
            }
        });
        this.cards.forEach(card => {
            if (this.state.level >= card.unlockLevel && !this.state.unlockedCards.includes(card.id)) {
                this.state.unlockedCards.push(card.id);
                changed = true;
            }
        });
        Object.keys(this.accessories).forEach(type => {
            this.accessories[type].forEach(acc => {
                if (this.state.level >= acc.unlockLevel && !this.state.unlockedAccessories[type].includes(acc.id)) {
                    this.state.unlockedAccessories[type].push(acc.id);
                    changed = true;
                }
            });
        });
        if (changed) this.saveState();
    },

    addXP(amount) {
        this.state.xp += amount;
        const xpToNext = this.state.level * 500;
        if (this.state.xp >= xpToNext) {
            this.state.xp -= xpToNext;
            this.state.level++;
            this.showLevelUp();
        }
        this.updateUI('stats');
    },

    showLevelUp() {
        const toast = document.createElement('div');
        toast.className = 'level-up-toast';
        toast.innerHTML = `
            <h1>LEVEL UP! 🌟</h1>
            <p>You reached Level ${this.state.level}!</p>
            <button onclick="this.parentElement.remove()" style="margin-top:20px; padding:10px 20px; border-radius:15px; border:none; background:white; color:var(--accent-tertiary); font-weight:bold; cursor:pointer;">AWESOME!</button>
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
    },

    updateUI(component = 'all') {
        const t = this.translations[this.state.lang] || this.translations.en;
        if (component === 'all' || component === 'header') {
            const avatarDisplay = document.getElementById('user-avatar-display');
            this.renderAvatarWithAccessories(avatarDisplay, this.state.currentAvatar, this.state.currentAccessories);
            const langSelect = document.getElementById('lang-select');
            if (langSelect) langSelect.value = this.state.lang;
        }
        if (component === 'all' || component === 'stats') {
            const lvlEl = document.getElementById('player-level');
            const coinsEl = document.getElementById('coin-count');
            const xpFill = document.getElementById('xp-fill');
            if (lvlEl) lvlEl.textContent = `${t.lvl} ${this.state.level}`;
            if (coinsEl) coinsEl.textContent = `${this.state.coins} 💰`;
            if (xpFill) {
                const xpToNext = this.state.level * 500;
                xpFill.style.width = `${(this.state.xp / xpToNext) * 100}%`;
            }
        }
        if (component === 'all' || component === 'energy') {
            const energyBtn = document.getElementById('energy-count');
            if (energyBtn) energyBtn.textContent = this.state.energy;
        }
        if (component === 'all' || component === 'modals') {
            const adminLink = document.getElementById('admin-link');
            if (adminLink) adminLink.textContent = t.admin;
            const diffTitle = document.querySelector('#difficulty-modal h2');
            if (diffTitle) diffTitle.textContent = t.select_difficulty;
            const gamesTitle = document.querySelector('[data-i18n="games_title"]');
            if (gamesTitle) gamesTitle.textContent = t.games_title;
        }
    },

    startTimers() {
        setInterval(() => {
            if (this.state.energy < 5) {
                this.state.energy++;
                this.updateUI('energy');
                this.saveState();
            }
        }, 60000);

        setInterval(() => {
            if (!this.state.isResting) {
                if (localStorage.getItem('admin_disable_timer') !== 'true') {
                    this.state.continuousPlayMinutes++;
                    if (this.state.continuousPlayMinutes >= 20) {
                        this.triggerRestSession();
                    }
                } else {
                    this.state.continuousPlayMinutes = 0; // Keep it zeroed if disabled
                }
            }
        }, 60000);
    },

    triggerRestSession() {
        this.state.isResting = true;
        const restScreen = document.getElementById('rest-message');
        const timerEl = document.getElementById('break-timer');
        restScreen.classList.remove('hidden');
        let timeLeft = 300;
        const interval = setInterval(() => {
            timeLeft--;
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            if (timeLeft <= 0) {
                clearInterval(interval);
                this.state.isResting = false;
                this.state.continuousPlayMinutes = 0;
                restScreen.classList.add('hidden');
                this.saveState();
            }
        }, 1000);
    }
};

window.Hub = Hub;
window.onload = () => Hub.init();
