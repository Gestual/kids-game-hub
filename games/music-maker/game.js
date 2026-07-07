let isPlaying = false;
let currentStep = 0;
let bpm = 120;
let loopInterval = null;

// Audio context (initialized lazily on first play/click to bypass autoplay restrictions)
let audioCtx = null;
let noiseBuffer = null;

// Matrix grid state (8 rows x 16 columns)
// Rows: 0 = Chime, 1 = Synth H, 2 = Synth M, 3 = Synth L, 4 = Bass, 5 = Cymbal, 6 = Snare, 7 = Kick
let grid = Array(8).fill(null).map(() => Array(16).fill(false));

document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
});

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        buildNoiseBuffer();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

function buildNoiseBuffer() {
    const bufferSize = audioCtx.sampleRate * 0.25; // 0.25 seconds of noise
    noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
}

function buildGrid() {
    const gridEl = document.getElementById('sequencer-grid');
    gridEl.innerHTML = '';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 16; col++) {
            const pad = document.createElement('div');
            pad.className = 'grid-pad';
            pad.dataset.row = row;
            pad.dataset.col = col;
            
            pad.addEventListener('click', () => {
                initAudio();
                grid[row][col] = !grid[row][col];
                pad.classList.toggle('sound-on', grid[row][col]);
                
                // Play preview sound on click
                if (grid[row][col]) {
                    playSound(row);
                }
            });
            gridEl.appendChild(pad);
        }
    }
}

function togglePlay() {
    initAudio();
    const btn = document.getElementById('btn-play');
    
    if (isPlaying) {
        isPlaying = false;
        clearInterval(loopInterval);
        btn.textContent = 'PLAY ▶️';
        btn.classList.add('primary');
        btn.classList.remove('secondary');
        removePlayheadHighlight();
    } else {
        isPlaying = true;
        btn.textContent = 'PAUSE ⏸️';
        btn.classList.remove('primary');
        btn.classList.add('secondary');
        
        // Calculate step duration in ms (16th notes loop: 60000ms / BPM / 4)
        const stepTime = 60000 / bpm / 4;
        loopInterval = setInterval(tick, stepTime);
    }
}

function updateBPM() {
    bpm = parseInt(document.getElementById('bpm-select').value);
    if (isPlaying) {
        // Restart loop interval with new BPM timing
        clearInterval(loopInterval);
        const stepTime = 60000 / bpm / 4;
        loopInterval = setInterval(tick, stepTime);
    }
}

function clearGrid() {
    grid = Array(8).fill(null).map(() => Array(16).fill(false));
    document.querySelectorAll('.grid-pad').forEach(pad => {
        pad.classList.remove('sound-on');
    });
}

function tick() {
    // Highlight playhead column
    removePlayheadHighlight();
    highlightPlayhead(currentStep);

    // Play sounds active in current column step
    for (let row = 0; row < 8; row++) {
        if (grid[row][currentStep]) {
            playSound(row);
        }
    }

    currentStep = (currentStep + 1) % 16;
}

function highlightPlayhead(step) {
    document.querySelectorAll(`.grid-pad[data-col="${step}"]`).forEach(pad => {
        pad.classList.add('active-col');
    });
}

function removePlayheadHighlight() {
    document.querySelectorAll('.grid-pad').forEach(pad => {
        pad.classList.remove('active-col');
    });
}

// Synth Sound Engine
function playSound(row) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    switch (row) {
        case 0: // Chime (Sine High G6)
            playOscillator(1568, 'sine', 0.2, 0.25);
            break;
        case 1: // Synth H (Sine B5)
            playOscillator(987.77, 'sine', 0.15, 0.2);
            break;
        case 2: // Synth M (Sine G5)
            playOscillator(783.99, 'sine', 0.15, 0.2);
            break;
        case 3: // Synth L (Sine D5)
            playOscillator(587.33, 'sine', 0.15, 0.2);
            break;
        case 4: // Bass (Triangle A3)
            playOscillator(220, 'triangle', 0.25, 0.35);
            break;
        case 5: // Cymbal (Noise filtered fast decay)
            playNoise(6000, 0.05);
            break;
        case 6: // Snare (Noise filtered mid decay + pitch tone)
            playNoise(1000, 0.15);
            playOscillator(180, 'triangle', 0.15, 0.12);
            break;
        case 7: // Kick (Sine frequency sweep down)
            playKickSound();
            break;
    }
}

function playOscillator(freq, type, volume, duration) {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Linear volume decay
    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
}

function playNoise(filterFreq, duration) {
    if (!noiseBuffer) return;
    const source = audioCtx.createBufferSource();
    source.buffer = noiseBuffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(filterFreq, audioCtx.currentTime);

    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    source.start();
}

function playKickSound() {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'sine';
    
    // Frequency sweep (150Hz -> 40Hz)
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);

    // Volume decay
    gainNode.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.18);
}

function finishBeat() {
    if (isPlaying) togglePlay(); // stop play loop
    HubAPI.complete(15, 10); // Award 15 XP and 10 coins
    HubAPI.close();
}
