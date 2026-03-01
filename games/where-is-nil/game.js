const urlParams = new URLSearchParams(window.location.search);
let lang = urlParams.get('lang');
if (!lang && window.parent && window.parent.Hub) {
    lang = window.parent.Hub.state.lang;
}
lang = lang || 'en';

const translations = {
    en: {
        loading: "Loading...",
        arrived_in: "Arrived in",
        where_did: "Where did Nil go?",
        airport: "🛫 Airport",
        museum: "🏛️ Museum",
        cafe: "☕ Cafe",
        flight_comp: "FLIGHT COMPUTER",
        search: "Search country...",
        cancel: "Cancel",
        got_it: "Got it!",
        win_title: "YOU CAUGHT HER! 🏆",
        win_msg: "Amazing detective work! You tracked Nil around the world and successfully learned your geography!",
        wrong_title: "DEAD END ❌",
        wrong_msg: "Nil was never here! You lost her trail. Let's return to the last known location.",
        clue_airport: "A pilot said she bought a ticket to a country in {continent}.",
        clue_museum: "She asked for a map to find the {monument}.",
        clue_cafe: "A barista heard her talking about {capital}.",
        clue_fact: "Someone overheard her saying: '{fact}'",
        no_clue: "Nobody here saw anything useful...",
        nil_leaving: "You saw a plane leaving! Nil just escaped to another country!"
    },
    fr: {
        loading: "Chargement...",
        arrived_in: "Arrivé en",
        where_did: "Où est allée Nil ?",
        airport: "🛫 Aéroport",
        museum: "🏛️ Musée",
        cafe: "☕ Café",
        flight_comp: "ORDINATEUR DE VOL",
        search: "Rechercher un pays...",
        cancel: "Annuler",
        got_it: "Compris !",
        win_title: "TU L'AS ATTRAPÉE ! 🏆",
        win_msg: "Travail de détective incroyable ! Tu as traqué Nil à travers le monde !",
        wrong_title: "IMPASSE ❌",
        wrong_msg: "Nil n'est jamais venue ici ! Tu as perdu sa trace. Retour à la dernière position.",
        clue_airport: "Un pilote a dit qu'elle partait pour le continent : {continent}.",
        clue_museum: "Elle a demandé une carte pour trouver : {monument}.",
        clue_cafe: "Un serveur l'a entendue parler de la ville de : {capital}.",
        clue_fact: "Quelqu'un l'a entendue dire : '{fact}'",
        no_clue: "Personne ici n'a rien vu d'utile...",
        nil_leaving: "Tu as vu un avion partir ! Nil vient de s'échapper vers un autre pays !"
    },
    es: {
        loading: "Cargando...",
        arrived_in: "Llegó a",
        where_did: "¿A dónde fue Nil?",
        airport: "🛫 Aeropuerto",
        museum: "🏛️ Museo",
        cafe: "☕ Cafetería",
        flight_comp: "COMPUTADORA DE VUELO",
        search: "Buscar país...",
        cancel: "Cancelar",
        got_it: "¡Entendido!",
        win_title: "¡LA ATRAPASTE! 🏆",
        win_msg: "¡Increíble trabajo de detective! ¡Rastreaste a Nil por todo el mundo!",
        wrong_title: "CALLEJÓN SIN SALIDA ❌",
        wrong_msg: "¡Nil nunca estuvo aquí! Perdiste su rastro. Volvamos a la última ubicación.",
        clue_airport: "Un piloto dijo que compró un boleto a un país en {continent}.",
        clue_museum: "Pidió un mapa para encontrar: {monument}.",
        clue_cafe: "Un camarero la escuchó hablar sobre: {capital}.",
        clue_fact: "Alguien la escuchó decir: '{fact}'",
        no_clue: "Nadie aquí vio nada útil...",
        nil_leaving: "¡Viste salir un avión! ¡Nil acaba de escapar a otro país!"
    }
};

const t = translations[lang] || translations.en;

const HubAPI = {
    addXP(amount) {
        if (window.parent && window.parent.Hub) {
            window.parent.postMessage({ type: 'addXP', amount: amount }, '*');
        }
    },
    close() {
        if (window.parent && window.parent.Hub) {
            window.parent.postMessage({ type: 'closeGame' }, '*');
        } else {
            console.log("Close game requested");
        }
    }
};

const Game = {
    countries: [],
    route: [],
    currentStep: 0,
    maxSteps: 5,
    currentCountry: null,
    nextCountry: null,
    cluesFound: {},
    worldMapInstance: null,
    flightMapInstance: null,

    init() {
        if (window.NIL_COUNTRIES && window.NIL_COUNTRIES.length > 0) {
            this.countries = window.NIL_COUNTRIES;
            this.setupUI();
            this.startRound();
        } else {
            document.getElementById('feedback-title').textContent = "ERROR";
            document.getElementById('feedback-msg').textContent = "Database failed to load.";
            document.getElementById('feedback-modal').classList.remove('hidden');
        }
    },

    setupUI() {
        // Translation bindings
        document.getElementById('fc-title').textContent = t.flight_comp;
        document.querySelector('.cancel-btn').textContent = t.cancel;
        document.querySelector('.ok-btn').textContent = t.got_it;
        document.getElementById('country-search').placeholder = t.search;

        document.getElementById('btn-open-computer').textContent = t.flight_comp + " ✈️";
        const clueBtns = document.querySelectorAll('.clue-btn');
        clueBtns[0].textContent = t.airport;
        clueBtns[1].textContent = t.museum;
        clueBtns[2].textContent = t.cafe;
        document.querySelector('#investigate-panel h3').textContent = t.where_did;

        document.getElementById('btn-open-computer').onclick = () => this.openFlightComputer();
        document.getElementById('btn-open-map').onclick = () => this.openWorldMap();
        document.getElementById('btn-feedback-ok').onclick = () => this.handleFeedbackOk();
    },

    startRound() {
        this.route = [];
        this.currentStep = 0;

        // Pick 5 unique random countries
        let shuffled = [...this.countries].sort(() => 0.5 - Math.random());
        this.route = shuffled.slice(0, this.maxSteps);

        this.arriveInCountry();
    },

    arriveInCountry() {
        this.currentCountry = this.route[this.currentStep];
        this.nextCountry = this.route[this.currentStep + 1]; // Null if it's the 5th (win)

        this.cluesFound = {};

        // Reset UI
        document.getElementById('country-name-display').textContent = this.currentCountry.name[lang];
        document.getElementById('inv-fact').textContent = this.currentCountry.fact[lang];
        document.getElementById('current-location').textContent = this.currentCountry.name[lang];
        document.getElementById('tracks-count').textContent = `${this.currentStep}/${this.maxSteps}`;
        document.getElementById('clues-container').innerHTML = '';

        const btns = document.querySelectorAll('.clue-btn');
        btns.forEach(b => b.removeAttribute('disabled'));

        this.loadDestinationImage();

        // If it's the last step, win immediately
        if (this.currentStep === this.maxSteps - 1) {
            this.triggerWin();
        }
    },

    investigate(locationType) {
        if (!this.nextCountry) return; // Should not happen

        let clue = "";

        const continentNames = {
            'Africa': { en: 'Africa', fr: 'Afrique', es: 'África' },
            'Asia': { en: 'Asia', fr: 'Asie', es: 'Asia' },
            'Europe': { en: 'Europe', fr: 'Europe', es: 'Europa' },
            'North America': { en: 'North America', fr: 'Amérique du Nord', es: 'América del Norte' },
            'South America': { en: 'South America', fr: 'Amérique du Sud', es: 'América del Sur' },
            'Oceania': { en: 'Oceania', fr: 'Océanie', es: 'Oceanía' },
            'Antarctica': { en: 'Antarctica', fr: 'Antarctique', es: 'Antártida' }
        };

        if (locationType === 'airport') {
            const translatedContinent = continentNames[this.nextCountry.continent] ? continentNames[this.nextCountry.continent][lang] : this.nextCountry.continent;
            clue = t.clue_airport.replace('{continent}', translatedContinent);
            // Also append a fact to airport to give more info
            clue += " " + t.clue_fact.replace('{fact}', this.nextCountry.fact[lang]);
        } else if (locationType === 'museum') {
            clue = t.clue_museum.replace('{monument}', this.nextCountry.monument[lang]);
        } else if (locationType === 'cafe') {
            clue = t.clue_cafe.replace('{capital}', this.nextCountry.capital[lang]);
        }

        // Disable button
        const btns = document.querySelectorAll('.clue-btn');
        if (locationType === 'airport') btns[0].setAttribute('disabled', 'true');
        if (locationType === 'museum') btns[1].setAttribute('disabled', 'true');
        if (locationType === 'cafe') btns[2].setAttribute('disabled', 'true');

        const clueEl = document.createElement('div');
        clueEl.className = 'clue-text';
        clueEl.textContent = clue;
        document.getElementById('clues-container').appendChild(clueEl);
    },

    loadDestinationImage() {
        const imgContainer = document.getElementById('dest-image-container');
        const imgEl = document.getElementById('dest-image');
        imgContainer.classList.remove('hidden');
        imgEl.style.display = 'none';

        let spinner = document.getElementById('img-spinner');
        if (!spinner) {
            spinner = document.createElement('div');
            spinner.id = 'img-spinner';
            spinner.className = 'loading-spinner';
            spinner.textContent = '🌍';
            imgContainer.appendChild(spinner);
        }
        spinner.style.display = 'block';

        // Apply a realistic country-specific AI generated image as background
        const prompt = `Famous iconic landmark monument in ${this.currentCountry.name.en}, photorealistic highly detailed tourism photography`;
        const bgUrl = `https://pollinations.ai/p/${encodeURIComponent(prompt)}?width=600&height=400&nologo=true`;
        const fallbackUrl = `https://picsum.photos/seed/${encodeURIComponent(this.currentCountry.name.en)}/600/400`;

        imgContainer.style.background = `linear-gradient(to bottom, #56CCF2, #2F80ED)`; // default while loading

        const bgImg = new Image();
        let imageLoaded = false;

        bgImg.onload = () => {
            imageLoaded = true;
            imgContainer.style.background = `url("${bgUrl}") center/cover no-repeat, linear-gradient(to bottom, #56CCF2, #2F80ED)`;
        };
        bgImg.onerror = () => {
            if (!imageLoaded) {
                imageLoaded = true;
                console.warn("AI Image failed to load, falling back to abstract photo.");
                imgContainer.style.background = `url("${fallbackUrl}") center/cover no-repeat, linear-gradient(to bottom, #56CCF2, #2F80ED)`;
            }
        };

        // Timeout to fallback if Pollinations is too slow
        setTimeout(() => {
            if (!imageLoaded) {
                console.warn("AI Image load timed out, falling back to abstract photo.");
                bgImg.src = ""; // Cancel load
                imgContainer.style.background = `url("${fallbackUrl}") center/cover no-repeat, linear-gradient(to bottom, #56CCF2, #2F80ED)`;
            }
        }, 8000);

        bgImg.src = bgUrl;

        // Use FlagCDN for a reliable, instantly-loaded image of the country's flag
        const flagUrl = `https://flagcdn.com/w320/${this.currentCountry.id.toLowerCase()}.png`;

        imgEl.src = flagUrl;
        imgEl.onload = () => {
            imgEl.style.display = 'block';
            spinner.style.display = 'none';
        };
        imgEl.onerror = () => {
            spinner.style.display = 'none';
            // Fallback to emoji if network fails
            imgEl.outerHTML = `<div style="font-size: 5rem; text-align:center; width:100%;">${this.getFlagEmoji(this.currentCountry.id)}</div>`;
        };
    },

    getFlagEmoji(countryCode) {
        const codePoints = countryCode
            .toUpperCase()
            .split('')
            .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
    },

    openWorldMap() {
        document.getElementById('world-map-modal').classList.remove('hidden');
        if (!this.worldMapInstance) {
            this.worldMapInstance = L.map('world-leaflet-map').setView([20, 0], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.worldMapInstance);
            this.renderMapPins();
        }
        setTimeout(() => this.worldMapInstance.invalidateSize(), 100);
    },

    renderMapPins() {
        this.countries.forEach(c => {
            if (!c.latlng) return;

            const markerHtml = `<div class="custom-leaflet-icon">📍</div>`;
            const customIcon = L.divIcon({
                className: '',
                html: markerHtml,
                iconSize: [30, 30],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30]
            });

            const marker = L.marker([c.latlng[0], c.latlng[1]], { icon: customIcon }).addTo(this.worldMapInstance);

            const popupContent = `<strong>${c.name[lang]}</strong><br><span style="color:#ffdd00; font-size: 1em; text-shadow: 1px 1px 2px black;">★ ${c.capital[lang]}</span><br><br><button onclick="Game.flyFromMap('${c.id}')" style="background:var(--accent); color:black; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;" class="clue-btn">FLY HERE ✈️</button>`;

            marker.bindPopup(popupContent);
        });
    },

    flyFromMap(countryId) {
        document.getElementById('world-map-modal').classList.add('hidden');
        const c = this.countries.find(x => x.id === countryId);
        if (c) this.flyTo(c);
    },

    openFlightComputer() {
        document.getElementById('flight-modal').classList.remove('hidden');
        document.getElementById('country-search').value = '';
        this.filterCountries();
    },

    filterCountries() {
        const query = document.getElementById('country-search').value.toLowerCase();
        const list = document.getElementById('country-list');
        list.innerHTML = '';

        const sorted = [...this.countries].sort((a, b) => a.name[lang].localeCompare(b.name[lang]));

        sorted.forEach(c => {
            if (c.name[lang].toLowerCase().includes(query)) {
                const div = document.createElement('div');
                div.className = 'country-option';
                div.textContent = c.name[lang];
                div.onclick = () => this.flyTo(c);
                list.appendChild(div);
            }
        });
    },

    flyTo(selectedCountry) {
        document.getElementById('flight-modal').classList.add('hidden');
        if (!document.getElementById('world-map-modal').classList.contains('hidden')) {
            document.getElementById('world-map-modal').classList.add('hidden');
        }

        const overlay = document.getElementById('flight-animation-overlay');
        overlay.classList.remove('hidden');

        if (!this.flightMapInstance) {
            this.flightMapInstance = L.map('flight-leaflet-map', {
                zoomControl: false,
                dragging: false,
                scrollWheelZoom: false,
                doubleClickZoom: false
            }).setView([20, 0], 2);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; OpenStreetMap contributors'
            }).addTo(this.flightMapInstance);
        }

        setTimeout(() => {
            this.flightMapInstance.invalidateSize();

            const sLatLng = this.currentCountry.latlng || [0, 0];
            const eLatLng = selectedCountry.latlng || [0, 0];

            // Clear previous layers (we just keep the tile layer)
            this.flightMapInstance.eachLayer(layer => {
                if (layer instanceof L.Polyline || layer instanceof L.Marker) {
                    this.flightMapInstance.removeLayer(layer);
                }
            });

            // Draw flight path
            const flightPath = L.polyline([[sLatLng[0], sLatLng[1]], [eLatLng[0], eLatLng[1]]], {
                color: '#00F2FF',
                weight: 4,
                dashArray: '10, 10'
            }).addTo(this.flightMapInstance);

            const planeHtml = `<div style="font-size: 2.5rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));">✈️</div>`;
            const planeIcon = L.divIcon({
                className: '',
                html: planeHtml,
                iconSize: [40, 40],
                iconAnchor: [20, 20]
            });

            // Mark Start and End conceptually
            L.marker([sLatLng[0], sLatLng[1]], { icon: planeIcon }).addTo(this.flightMapInstance);

            const destHtml = `<div style="font-size: 1.5rem; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));">🎯</div>`;
            const destIcon = L.divIcon({
                className: '',
                html: destHtml,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            L.marker([eLatLng[0], eLatLng[1]], { icon: destIcon }).addTo(this.flightMapInstance);

            // Animate map view to encompass the trip
            this.flightMapInstance.fitBounds(flightPath.getBounds(), { padding: [50, 50], animate: true, duration: 2 });

            setTimeout(() => {
                overlay.classList.add('hidden');
                this.handleArrival(selectedCountry);
            }, 3000);

        }, 100);
    },

    handleArrival(selectedCountry) {
        if (selectedCountry.id === this.nextCountry.id) {
            // Success
            this.currentStep++;
            this.showFeedback("SUCCESS!", t.nil_leaving);
            this.lastFeedbackType = "success";
        } else {
            // Failure
            this.showFeedback(t.wrong_title, t.wrong_msg);
            this.lastFeedbackType = "wrong";
        }
    },

    showFeedback(title, msg) {
        document.getElementById('feedback-title').textContent = title;
        document.getElementById('feedback-msg').textContent = msg;
        document.getElementById('feedback-modal').classList.remove('hidden');
    },

    handleFeedbackOk() {
        document.getElementById('feedback-modal').classList.add('hidden');
        if (this.lastFeedbackType === "success") {
            this.arriveInCountry();
        } else if (this.lastFeedbackType === "win") {
            HubAPI.close();
        }
    },

    triggerWin() {
        this.lastFeedbackType = "win";
        HubAPI.addXP(250); // Big reward

        // Replace current investigation panel with win message visually
        document.getElementById('inv-title').textContent = t.win_title;
        document.getElementById('inv-fact').textContent = t.win_msg;
        document.getElementById('clue-display').classList.add('hidden');
        document.querySelector('.clue-buttons').style.display = 'none';
        document.querySelector('#investigate-panel h3').style.display = 'none';

        setTimeout(() => {
            this.showFeedback(t.win_title, t.win_msg);
        }, 1000);
    }
};

window.onload = () => {
    Game.init();
};
