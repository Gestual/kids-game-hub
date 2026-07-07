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
        restUntil: 0,
        currentBackground: 'forest',
        unlockedBackgrounds: ['forest'],
        unlockedCards: ['warrior'],
        currentAvatar: 'warrior',
        currentAccessories: { hat: 'none', glasses: 'none' },
        unlockedAccessories: {
            hats: ['none'],
            glasses: ['none']
        },
        pendingGameId: null,
        pet: null,
        unlockedBadges: [],
        gamesPlayedCounts: {}
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
                monster_chef: "Magic Cauldron",
                target_sum: "Target Sum",
                coding_adventure: "Coding Adventure",
                music_maker: "Beat Sandbox"
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
                monster_chef: "Chaudron Magique",
                target_sum: "Le Compte Est Bon",
                coding_adventure: "Aventure Code",
                music_maker: "Bac à Sable Beat"
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
            rest_msg: "¡Sesión intensa! Tómate 5 minutes de descanso para la vista.",
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
                monster_chef: "Caldero Mágico",
                target_sum: "Suma Objetivo",
                coding_adventure: "Aventura Código",
                music_maker: "Caja de Ritmos"
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
        { id: 'monster_chef', icon: '👨‍🍳', color: '#e84393' },
        { id: 'target_sum', icon: '🎯', color: '#6c5ce7' },
        { id: 'coding_adventure', icon: '🤖', color: '#00ff88' },
        { id: 'music_maker', icon: '🎵', color: '#ff0055' }
    ],

    init() {
        this.loadState();
        this.checkBedtimeLock();
        this.detectLanguage();
        this.renderHub();
        this.applyBackground();
        this.checkAndResumeRest();
        this.startTimers();
        this.setupEventListeners();
        this.setupMessageListener();
        this.updateUI();
        this.rotateAds();
        this.initPlayTimerUI();
        this.registerServiceWorker();
    },

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./sw.js')
                    .then(reg => console.log('Service Worker registered with scope:', reg.scope))
                    .catch(err => console.log('Service Worker registration failed:', err));
            });
        }
    },

    setupMessageListener() {
        window.addEventListener('message', (event) => {
            if (event.data && event.data.type) {
                switch (event.data.type) {
                    case 'addXP':
                        this.addXP(event.data.amount || 0);
                        break;
                    case 'game_complete':
                        let xp = event.data.xp || 0;
                        let coins = event.data.coins || 0;
                        
                        // Track games played count
                        const gameId = this.state.pendingGameId;
                        if (gameId) {
                            if (!this.state.gamesPlayedCounts) this.state.gamesPlayedCounts = {};
                            this.state.gamesPlayedCounts[gameId] = (this.state.gamesPlayedCounts[gameId] || 0) + 1;
                        }

                        // Apply Focus Mode double multiplier
                        const activeFocus = localStorage.getItem('admin_focus_mode') || 'none';
                        const gameCategory = this.getGameCategory(gameId);
                        
                        let doubled = false;
                        if (activeFocus !== 'none' && activeFocus === gameCategory) {
                            xp *= 2;
                            coins *= 2;
                            doubled = true;
                        }
                        
                        if (xp) this.addXP(xp);
                        if (coins) this.state.coins += coins;
                        
                        this.saveState();
                        this.updateUI('stats');
                        
                        if (doubled) {
                            this.showAlert("🎯 Focus Mode Bonus!", `Double XP & Coins earned for playing a ${gameCategory.toUpperCase()} game!`);
                        }
                        
                        // Check achievements
                        this.checkAchievements();
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

    getGameCategory(gameId) {
        if (!gameId) return 'none';
        const mathGames = ['sudokids', 'hero_calculus', 'target_sum'];
        const languageGames = ['wordsearch', 'where_is_nil', 'monster_chef'];
        const logicGames = ['nonogram', '2048', 'memory', 'crack_the_code', 'coding_adventure'];
        const creativeGames = ['pixel_art', 'little_merchant', 'music_maker'];
        
        if (mathGames.includes(gameId)) return 'math';
        if (languageGames.includes(gameId)) return 'language';
        if (logicGames.includes(gameId)) return 'logic';
        if (creativeGames.includes(gameId)) return 'creative';
        return 'none';
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
            if (!this.state.unlockedBadges) this.state.unlockedBadges = [];
            if (!this.state.gamesPlayedCounts) this.state.gamesPlayedCounts = {};
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
        } else if (this.activeTab === 'pet') {
            const petContainer = document.createElement('div');
            petContainer.style.gridColumn = '1 / -1';
            petContainer.style.display = 'flex';
            petContainer.style.flexDirection = 'column';
            petContainer.style.alignItems = 'center';
            petContainer.style.padding = '20px';
            petContainer.style.background = 'rgba(255, 255, 255, 0.03)';
            petContainer.style.borderRadius = '20px';
            petContainer.style.border = '2px dashed var(--glass-border)';
            petContainer.style.textAlign = 'center';

            if (!this.state.pet) {
                petContainer.innerHTML = `
                    <div style="font-size: 5rem; margin-bottom: 10px; animation: bounce 2s infinite;">🥚</div>
                    <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--accent); margin: 0 0 10px;">Adopt a Magical Pet!</h3>
                    <p style="font-size: 1rem; color: #aaa; max-width: 400px; margin: 0 0 20px;">Purchase a mystery egg using your coins. Feed and play with your pet to help it hatch into a legendary companion!</p>
                    <button onclick="Hub.adoptPet()" style="background: linear-gradient(135deg, var(--accent-secondary), var(--accent)); color: #000; font-family: var(--font-heading); font-size: 1.3rem; border: none; padding: 12px 30px; border-radius: 15px; cursor: pointer; box-shadow: 0 4px 15px rgba(0, 255, 136, 0.3);">Adopt Egg (100 💰)</button>
                `;
            } else {
                const pet = this.state.pet;
                let petEmoji = '🥚';
                let petName = 'Magical Egg';
                let instructions = 'Feed or play with your egg to help it hatch!';
                
                if (pet.stage === 'baby') {
                    petEmoji = '🐥';
                    petName = 'Baby Chick';
                    instructions = 'Keep growing your pet to unlock its teen form!';
                } else if (pet.stage === 'teen') {
                    petEmoji = '🦖';
                    petName = 'Teen Dino';
                    instructions = 'Your pet is growing strong! Reach 100% to evolve to a Legendary Dragon!';
                } else if (pet.stage === 'adult') {
                    petEmoji = '🐉';
                    petName = 'Legendary Dragon';
                    instructions = 'Your pet has reached its final form! Max Level Achieved 🏆';
                }

                const progress = pet.progress || 0;

                petContainer.innerHTML = `
                    <div style="font-size: 6rem; margin-bottom: 15px; animation: float 3s ease-in-out infinite;">${petEmoji}</div>
                    <h3 style="font-family: var(--font-heading); font-size: 2rem; color: var(--accent); margin: 0 0 5px;">${petName}</h3>
                    <div style="font-size: 1.1rem; color: var(--accent-secondary); font-weight: bold; margin-bottom: 15px;">Level ${pet.level || 1} (${pet.stage.toUpperCase()})</div>
                    
                    ${pet.stage !== 'adult' ? `
                        <div style="width: 100%; max-width: 300px; height: 20px; background: rgba(255,255,255,0.05); border: 1px solid var(--glass-border); border-radius: 10px; overflow: hidden; margin-bottom: 10px; position: relative; margin-left: auto; margin-right: auto;">
                            <div style="width: ${progress}%; height: 100%; background: linear-gradient(90deg, var(--accent-tertiary), var(--accent)); transition: width 0.3s ease;"></div>
                            <span style="position: absolute; width: 100%; text-align: center; left: 0; top: 0; font-size: 0.8rem; font-weight: bold; line-height: 20px; color: white;">${progress}%</span>
                        </div>
                        <p style="font-size: 0.9rem; color: #888; margin: 0 0 20px;">${instructions}</p>
                        
                        <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                            <button onclick="Hub.feedPet()" style="background: var(--glass); border: 2px solid var(--accent); color: white; padding: 10px 20px; border-radius: 12px; font-family: 'Luckiest Guy', cursive; font-size: 1rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">🍎 Feed (10 💰)</button>
                            <button onclick="Hub.playWithPet()" style="background: var(--glass); border: 2px solid var(--accent-secondary); color: white; padding: 10px 20px; border-radius: 12px; font-family: 'Luckiest Guy', cursive; font-size: 1rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">⚽ Play (3 ⚡)</button>
                        </div>
                    ` : `
                        <p style="font-size: 1.1rem; color: #00ff88; margin: 10px 0; font-family: 'Luckiest Guy', cursive;">🏆 Max Level Achieved! 🐉</p>
                        <p style="font-size: 0.9rem; color: #888; margin: 0 0 20px;">Your dragon is happy and fully grown!</p>
                    `}
                `;
            }
            display.appendChild(petContainer);
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

    checkAndResumeRest() {
        const enabled = localStorage.getItem('admin_enable_play_timer') !== 'false';
        if (!enabled) {
            this.state.isResting = false;
            this.state.restUntil = 0;
            const limitMinutes = parseInt(localStorage.getItem('admin_play_timer_minutes') || '10');
            this.state.playTimeRemaining = limitMinutes * 60;
            this.state.isPlayTimerPaused = false;
            
            const restScreen = document.getElementById('rest-message');
            if (restScreen) restScreen.classList.add('hidden');
            
            const pauseOverlay = document.getElementById('play-paused-overlay');
            if (pauseOverlay) pauseOverlay.classList.add('hidden');
            
            this.saveState();
            return;
        }

        if (this.state.isResting) {
            const now = Date.now();
            if (this.state.restUntil && now < this.state.restUntil) {
                const remaining = Math.ceil((this.state.restUntil - now) / 1000);
                this.triggerRestSession(remaining);
            } else {
                this.state.isResting = false;
                this.state.restUntil = 0;
                const limitMinutes = parseInt(localStorage.getItem('admin_play_timer_minutes') || '10');
                this.state.playTimeRemaining = limitMinutes * 60;
                this.saveState();
            }
        } else {
            if (this.state.playTimeRemaining === undefined || this.state.playTimeRemaining <= 0) {
                const limitMinutes = parseInt(localStorage.getItem('admin_play_timer_minutes') || '10');
                this.state.playTimeRemaining = limitMinutes * 60;
            }
        }
    },

    startTimers() {
        // Energy recharge timer & Bedtime check
        setInterval(() => {
            this.checkBedtimeLock();
            if (this.state.energy < 5) {
                this.state.energy++;
                this.updateUI('energy');
                this.saveState();
            }
        }, 60000);

        // Second-by-second Play Timer Countdown
        setInterval(() => {
            const enabled = localStorage.getItem('admin_enable_play_timer') !== 'false';
            const control = document.getElementById('play-timer-control');
            
            if (!enabled) {
                if (control) control.style.display = 'none';
                return;
            } else {
                if (control) control.style.display = 'flex';
            }

            if (this.state.isResting) {
                return;
            }

            if (this.state.isPlayTimerPaused) {
                return;
            }

            if (this.state.playTimeRemaining === undefined) {
                const limitMinutes = parseInt(localStorage.getItem('admin_play_timer_minutes') || '10');
                this.state.playTimeRemaining = limitMinutes * 60;
            }

            if (this.state.playTimeRemaining > 0) {
                this.state.playTimeRemaining--;
                this.updatePlayTimerDisplay();
                this.saveState();

                if (this.state.playTimeRemaining <= 0) {
                    this.triggerRestSession();
                }
            }
        }, 1000);
    },

    triggerRestSession(timeLeft = 300) {
        this.state.isResting = true;
        
        const now = Date.now();
        if (!this.state.restUntil || this.state.restUntil <= now) {
            this.state.restUntil = now + (timeLeft * 1000);
        }
        this.saveState();

        const restScreen = document.getElementById('rest-message');
        const timerEl = document.getElementById('break-timer');
        if (restScreen) restScreen.classList.remove('hidden');

        if (this.restInterval) {
            clearInterval(this.restInterval);
        }

        const updateTimerDisplay = () => {
            const mins = Math.floor(timeLeft / 60);
            const secs = timeLeft % 60;
            if (timerEl) {
                timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
        };

        updateTimerDisplay();

        this.restInterval = setInterval(() => {
            const enabled = localStorage.getItem('admin_enable_play_timer') !== 'false';
            if (!enabled) {
                clearInterval(this.restInterval);
                this.state.isResting = false;
                this.state.restUntil = 0;
                const limitMinutes = parseInt(localStorage.getItem('admin_play_timer_minutes') || '10');
                this.state.playTimeRemaining = limitMinutes * 60;
                this.state.isPlayTimerPaused = false;
                if (restScreen) restScreen.classList.add('hidden');
                this.saveState();
                this.updatePlayTimerDisplay();
                return;
            }

            timeLeft--;
            updateTimerDisplay();

            if (timeLeft <= 0) {
                clearInterval(this.restInterval);
                this.state.isResting = false;
                this.state.restUntil = 0;
                const limitMinutes = parseInt(localStorage.getItem('admin_play_timer_minutes') || '10');
                this.state.playTimeRemaining = limitMinutes * 60;
                this.state.isPlayTimerPaused = false;
                if (restScreen) restScreen.classList.add('hidden');
                this.saveState();
                this.updatePlayTimerDisplay();
            }
        }, 1000);
    },

    initPlayTimerUI() {
        const overlay = document.getElementById('play-paused-overlay');
        const pauseBtn = document.getElementById('play-timer-btn');
        if (this.state.isPlayTimerPaused) {
            if (overlay) overlay.classList.remove('hidden');
            if (pauseBtn) pauseBtn.textContent = '▶️';
        } else {
            if (overlay) overlay.classList.add('hidden');
            if (pauseBtn) pauseBtn.textContent = '⏸️';
        }
        this.updatePlayTimerDisplay();
        
        // Listen to storage events from other tabs (like the admin panel)
        window.addEventListener('storage', (e) => {
            if (e.key === 'kids_hub_state' || e.key === 'admin_enable_play_timer' || e.key === 'admin_play_timer_minutes') {
                this.loadState();
                this.checkAndResumeRest();
                this.updatePlayTimerDisplay();
                this.initPlayTimerUI();
            }
        });
    },

    togglePlayTimerPause() {
        this.state.isPlayTimerPaused = !this.state.isPlayTimerPaused;
        const overlay = document.getElementById('play-paused-overlay');
        const pauseBtn = document.getElementById('play-timer-btn');
        
        if (this.state.isPlayTimerPaused) {
            if (overlay) overlay.classList.remove('hidden');
            if (pauseBtn) pauseBtn.textContent = '▶️';
        } else {
            if (overlay) overlay.classList.add('hidden');
            if (pauseBtn) pauseBtn.textContent = '⏸️';
        }
        this.saveState();
    },

    updatePlayTimerDisplay() {
        const display = document.getElementById('play-timer-display');
        if (!display) return;
        
        if (this.state.playTimeRemaining === undefined) {
            const limitMinutes = parseInt(localStorage.getItem('admin_play_timer_minutes') || '10');
            this.state.playTimeRemaining = limitMinutes * 60;
        }
        
        const totalSecs = this.state.playTimeRemaining;
        const mins = Math.floor(totalSecs / 60);
        const secs = totalSecs % 60;
        display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        
        if (totalSecs <= 60) {
            display.style.color = '#ff0055';
        } else {
            display.style.color = '#00f2ff';
        }
    },

    adoptPet() {
        if (this.state.coins < 100) {
            this.showAlert("Not Enough Coins 💰", "You need 100 coins to adopt a pet egg. Keep playing games to earn more!");
            return;
        }
        this.state.coins -= 100;
        this.state.pet = { stage: 'egg', progress: 0, level: 1 };
        this.saveState();
        this.updateUI('stats');
        this.renderPersonalize();
        this.burstConfetti();
        this.showAlert("Adopted! 🐣", "You adopted a Magical Pet Egg! Feed and play with it to hatch it.");
    },

    feedPet() {
        if (!this.state.pet) return;
        if (this.state.coins < 10) {
            this.showAlert("Not Enough Coins 💰", "You need 10 coins to feed your pet.");
            return;
        }
        this.state.coins -= 10;
        this.state.pet.progress = (this.state.pet.progress || 0) + 15;
        this.saveState();
        this.updateUI('stats');

        if (this.state.pet.progress >= 100) {
            this.evolvePet();
        } else {
            this.renderPersonalize();
        }
    },

    playWithPet() {
        if (!this.state.pet) return;
        if (this.state.energy < 3) {
            this.showAlert("Not Enough Energy ⚡", "You need at least 3 energy to play with your pet. Energy recharges every minute!");
            return;
        }
        this.state.energy -= 3;
        this.state.pet.progress = (this.state.pet.progress || 0) + 25;
        this.saveState();
        this.updateUI('energy');

        if (this.state.pet.progress >= 100) {
            this.evolvePet();
        } else {
            this.renderPersonalize();
        }
    },

    evolvePet() {
        const pet = this.state.pet;
        let oldStage = pet.stage;
        let newStage = 'baby';
        let title = 'Hatched! 🐣';
        let msg = 'Your mystery egg hatched into a cute Baby Chick! 🐥';

        if (oldStage === 'egg') {
            newStage = 'baby';
            pet.level = 2;
        } else if (oldStage === 'baby') {
            newStage = 'teen';
            pet.level = 3;
            title = 'Evolved! 🦖';
            msg = 'Your baby chick grew into a strong Teen Dino!';
        } else if (oldStage === 'teen') {
            newStage = 'adult';
            pet.level = 4;
            title = 'Legendary Evolved! 🐉';
            msg = 'Your pet Dino evolved into a majestic, fully grown Legendary Dragon! 🏆';
        }

        pet.stage = newStage;
        pet.progress = 0;
        this.saveState();
        this.renderPersonalize();
        this.burstConfetti();
        this.showAlert(title, msg);
    },

    burstConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = '50vw';
            confetti.style.top = '50vh';
            confetti.style.width = Math.random() * 12 + 6 + 'px';
            confetti.style.height = Math.random() * 12 + 6 + 'px';
            
            const colors = ['#00f2ff', '#00ff88', '#7000ff', '#ff0055', '#ffd93d', '#ff92ad'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 15 + 5;
            let vx = Math.cos(angle) * velocity;
            let vy = Math.sin(angle) * velocity - 5;
            
            document.body.appendChild(confetti);
            
            let posX = window.innerWidth / 2;
            let posY = window.innerHeight / 2;
            let rotation = Math.random() * 360;
            let rotationSpeed = Math.random() * 10 - 5;
            
            const updateConfetti = () => {
                vy += 0.4;
                vx *= 0.98;
                posX += vx;
                posY += vy;
                rotation += rotationSpeed;
                
                confetti.style.left = posX + 'px';
                confetti.style.top = posY + 'px';
                confetti.style.transform = `rotate(${rotation}deg)`;
                
                if (posY < window.innerHeight && posX > 0 && posX < window.innerWidth) {
                    requestAnimationFrame(updateConfetti);
                } else {
                    confetti.remove();
                }
            };
            requestAnimationFrame(updateConfetti);
        }
    },

    checkBedtimeLock() {
        const bedtimeStart = localStorage.getItem('admin_bedtime_start');
        const bedtimeEnd = localStorage.getItem('admin_bedtime_end');
        
        if (!bedtimeStart || !bedtimeEnd) return;
        
        const now = new Date();
        const currentMin = now.getHours() * 60 + now.getMinutes();
        
        const [startH, startM] = bedtimeStart.split(':').map(Number);
        const [endH, endM] = bedtimeEnd.split(':').map(Number);
        
        const startMin = startH * 60 + startM;
        const endMin = endH * 60 + endM;
        
        let isBedtime = false;
        if (startMin < endMin) {
            isBedtime = currentMin >= startMin && currentMin < endMin;
        } else {
            isBedtime = currentMin >= startMin || currentMin < endMin;
        }
        
        const lockOverlay = document.getElementById('bedtime-lock-overlay');
        if (isBedtime) {
            if (!lockOverlay) {
                const overlay = document.createElement('div');
                overlay.id = 'bedtime-lock-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100vw';
                overlay.style.height = '100vh';
                overlay.style.background = '#0b0e14';
                overlay.style.zIndex = '10000';
                overlay.style.display = 'flex';
                overlay.style.flexDirection = 'column';
                overlay.style.justifyContent = 'center';
                overlay.style.alignItems = 'center';
                overlay.style.fontFamily = "'Luckiest Guy', cursive";
                overlay.style.color = '#fff';
                overlay.style.textAlign = 'center';
                
                overlay.innerHTML = `
                    <div style="font-size: 6rem; margin-bottom: 20px; animation: bounce 3s infinite;">💤</div>
                    <h1 style="font-size: 3rem; color: #ff0055; text-shadow: 0 0 15px rgba(255,0,85,0.4); margin: 0 0 10px;">Bedtime Lock Active!</h1>
                    <p style="font-family: 'Fredoka', sans-serif; font-size: 1.2rem; color: #aaa; max-width: 400px; padding: 0 20px; margin: 0;">Time to rest and go to sleep. The hub will unlock at ${bedtimeEnd}. Good night! 🌙</p>
                `;
                document.body.appendChild(overlay);
            }
        } else {
            if (lockOverlay) {
                lockOverlay.remove();
            }
        }
    },

    openAchievements() {
        document.getElementById('achievements-modal').classList.remove('hidden');
        this.renderAchievements();
    },

    closeAchievements() {
        document.getElementById('achievements-modal').classList.add('hidden');
    },

    renderAchievements() {
        const list = document.getElementById('achievements-list');
        list.innerHTML = '';
        
        const badges = [
            {
                id: 'math_genius',
                name: 'Math Genius 🔢',
                desc: 'Play math games (SudoKids, Hero Calculus, or Target Sum) 3 times.',
                current: () => (this.state.gamesPlayedCounts['sudokids'] || 0) + (this.state.gamesPlayedCounts['hero_calculus'] || 0) + (this.state.gamesPlayedCounts['target_sum'] || 0),
                target: 3,
                reward: 'Unlocks legendary Golden Phoenix avatar!'
            },
            {
                id: 'logic_master',
                name: 'Logic Master 🤖',
                desc: 'Complete at least one Coding Adventure mission.',
                current: () => this.state.gamesPlayedCounts['coding_adventure'] || 0,
                target: 1,
                reward: 'Unlocks Undersea City background!'
            },
            {
                id: 'beat_creator',
                name: 'Beat Creator 🎵',
                desc: 'Build and save a beat in the Beat Sandbox.',
                current: () => this.state.gamesPlayedCounts['music_maker'] || 0,
                target: 1,
                reward: 'Unlocks rare Monocle accessory!'
            },
            {
                id: 'pet_parent',
                name: 'Pet Parent 🐣',
                desc: 'Hatch your adopted magical pet egg.',
                current: () => (this.state.pet && this.state.pet.level >= 2) ? 1 : 0,
                target: 1,
                reward: 'Earn 100 bonus Coins!'
            }
        ];

        badges.forEach(b => {
            const isUnlocked = (this.state.unlockedBadges || []).includes(b.id);
            const val = b.current();
            const percent = Math.min(100, Math.floor((val / b.target) * 100));

            const card = document.createElement('div');
            card.style.background = 'rgba(255, 255, 255, 0.03)';
            card.style.border = '2px solid ' + (isUnlocked ? 'var(--accent-secondary)' : 'var(--glass-border)');
            card.style.borderRadius = '15px';
            card.style.padding = '15px';
            card.style.display = 'flex';
            card.style.flexDirection = 'column';
            card.style.gap = '8px';

            card.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-family: var(--font-heading); font-size: 1.2rem; color: ${isUnlocked ? 'var(--accent-secondary)' : 'white'}">${b.name}</span>
                    <span style="font-size: 1.2rem;">${isUnlocked ? '✅' : '🔒'}</span>
                </div>
                <div style="font-size: 0.9rem; color: #aaa; font-family: 'Fredoka', sans-serif;">${b.desc}</div>
                <div style="font-size: 0.8rem; color: var(--accent-secondary); font-weight: bold; font-family: 'Fredoka', sans-serif;">Reward: ${b.reward}</div>
                
                ${!isUnlocked ? `
                    <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px; overflow: hidden; position: relative; margin-top: 4px;">
                        <div style="width: ${percent}%; height: 100%; background: var(--accent);"></div>
                    </div>
                    <span style="font-size: 0.75rem; color: #888; font-family: 'Fredoka', sans-serif;">Progress: ${val}/${b.target}</span>
                ` : `
                    <div style="font-size: 0.8rem; color: #00ff88; font-weight: bold; font-family: 'Fredoka', sans-serif;">UNLOCKED! 🎉</div>
                `}
            `;
            list.appendChild(card);
        });
    },

    checkAchievements() {
        if (!this.state.unlockedBadges) this.state.unlockedBadges = [];
        if (!this.state.gamesPlayedCounts) this.state.gamesPlayedCounts = {};

        const mathPlayed = (this.state.gamesPlayedCounts['sudokids'] || 0) + (this.state.gamesPlayedCounts['hero_calculus'] || 0) + (this.state.gamesPlayedCounts['target_sum'] || 0);
        const logicPlayed = this.state.gamesPlayedCounts['coding_adventure'] || 0;
        const musicPlayed = this.state.gamesPlayedCounts['music_maker'] || 0;
        const petHatched = (this.state.pet && this.state.pet.level >= 2) ? 1 : 0;

        const checkList = [
            { id: 'math_genius', condition: mathPlayed >= 3, name: 'Math Genius 🔢', unlock: () => {
                if (!this.state.unlockedCards.includes('phoenix')) {
                    this.state.unlockedCards.push('phoenix');
                }
            }},
            { id: 'logic_master', condition: logicPlayed >= 1, name: 'Logic Master 🤖', unlock: () => {
                if (!this.state.unlockedBackgrounds.includes('undersea_city')) {
                    this.state.unlockedBackgrounds.push('undersea_city');
                }
            }},
            { id: 'beat_creator', condition: musicPlayed >= 1, name: 'Beat Creator 🎵', unlock: () => {
                if (!this.state.unlockedAccessories.glasses.includes('monocle')) {
                    this.state.unlockedAccessories.glasses.push('monocle');
                }
            }},
            { id: 'pet_parent', condition: petHatched >= 1, name: 'Pet Parent 🐣', unlock: () => {
                this.state.coins += 100;
            }}
        ];

        checkList.forEach(c => {
            if (c.condition && !this.state.unlockedBadges.includes(c.id)) {
                this.state.unlockedBadges.push(c.id);
                c.unlock();
                this.saveState();
                this.burstConfetti();
                this.showAlert("🏆 Achievement Unlocked!", `Congratulations! You unlocked the [${c.name}] badge! Check your rewards!`);
            }
        });
    }
};

window.Hub = Hub;
window.onload = () => Hub.init();
