let isPlaying = false;
let currentStep = 0;
let currentPage = 0;
let bpm = 120;
let timerID = null;

// Audio context (initialized lazily to bypass autoplay restrictions)
let audioCtx = null;
let noiseBuffer = null;

// 64-step grid sequencer (8 rows x 64 columns)
let grid = Array(8).fill(null).map(() => Array(64).fill(false));

// Row instruments state
let rowInstruments = ['chime', 'sine', 'sine', 'sine', 'triangle', 'cymbal', 'snare', 'kick'];

// Chord Progression state (1 chord per measure/page)
let chords = ['C', 'Am', 'F', 'G'];

// Arpeggiator pattern state ('off', 'up', 'down', 'bounce')
let arpPattern = 'off';

// Scheduling lookahead variables
let nextNoteTime = 0.0;
let scheduleAheadTime = 0.1;
let lookahead = 25.0; // run scheduling function every 25ms
let notesInQueue = [];
let lastDrawingStep = -1;

const chordNotes = {
    'C':  [130.81, 261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50], // C3, C4, E4, G4, C5, E5, G5, C6
    'G':  [98.00,  196.00, 246.94, 293.66, 392.00, 493.88, 587.33, 783.99],  // G2, G3, B3, D4, G4, B4, D5, G5
    'Am': [110.00, 220.00, 261.63, 329.63, 440.00, 523.25, 659.25, 880.00],  // A2, A3, C4, E4, A4, C5, E5, A5
    'F':  [87.31,  174.61, 220.00, 261.63, 349.23, 440.00, 523.25, 698.46],  // F2, F3, A3, C4, F4, A4, C5, F5
    'Dm': [73.42,  146.83, 174.61, 220.00, 293.66, 349.23, 440.00, 587.33],  // D2, D3, F3, A3, D4, F4, A4, D5
    'Em': [82.41,  164.81, 196.00, 246.94, 329.63, 392.00, 493.88, 659.25],  // E2, E3, G3, B3, E4, G4, B4, E5
    'Bb': [116.54, 233.08, 293.66, 349.23, 466.16, 587.33, 698.46, 932.33]   // Bb2, Bb3, D4, F4, Bb4, D5, F5, Bb5
};

document.addEventListener('DOMContentLoaded', () => {
    buildGrid();
    updateChords();
    updateArp();
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
    const bufferSize = audioCtx.sampleRate * 0.25;
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
            const actualCol = col + currentPage * 16;
            const pad = document.createElement('div');
            pad.className = 'grid-pad';
            pad.dataset.row = row;
            pad.dataset.col = col;
            
            if (grid[row][actualCol]) {
                pad.classList.add('sound-on');
            }
            
            pad.addEventListener('click', () => {
                initAudio();
                grid[row][actualCol] = !grid[row][actualCol];
                pad.classList.toggle('sound-on', grid[row][actualCol]);
                
                // Play preview sound on click
                if (grid[row][actualCol]) {
                    const type = rowInstruments[row];
                    playInstrumentSound(row, type, audioCtx.currentTime);
                }
            });
            gridEl.appendChild(pad);
        }
    }
}

function setPage(pageNum) {
    currentPage = pageNum;
    document.querySelectorAll('.page-btn').forEach((btn, idx) => {
        btn.classList.toggle('active', idx === pageNum);
    });
    buildGrid();
}

function updateChords() {
    for (let i = 0; i < 4; i++) {
        chords[i] = document.getElementById(`chord-select-${i}`).value;
    }
}

function updateArp() {
    arpPattern = document.getElementById('arp-select').value;
}

function changeRowInstrument(row) {
    const val = document.getElementById(`instrument-row-${row}`).value;
    rowInstruments[row] = val;
    initAudio();
    playInstrumentSound(row, val, audioCtx.currentTime);
}

function togglePlay() {
    initAudio();
    const btn = document.getElementById('btn-play');
    
    if (isPlaying) {
        isPlaying = false;
        clearTimeout(timerID);
        btn.textContent = 'PLAY ▶️';
        btn.classList.add('primary');
        btn.classList.remove('secondary');
        removePlayheadHighlight();
        notesInQueue = [];
    } else {
        isPlaying = true;
        btn.textContent = 'PAUSE ⏸️';
        btn.classList.remove('primary');
        btn.classList.add('secondary');
        
        currentStep = 0;
        nextNoteTime = audioCtx.currentTime;
        scheduler();
        requestAnimationFrame(drawPlayhead);
    }
}

function updateBPM() {
    bpm = parseInt(document.getElementById('bpm-select').value);
}

function clearGrid() {
    grid = Array(8).fill(null).map(() => Array(64).fill(false));
    document.querySelectorAll('.grid-pad').forEach(pad => {
        pad.classList.remove('sound-on');
    });
}

// Gapless Lookahead Scheduler Loop
function scheduler() {
    if (!isPlaying) return;
    
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
        scheduleNote(currentStep, nextNoteTime);
        advanceNote();
    }
    timerID = setTimeout(scheduler, lookahead);
}

function scheduleNote(step, time) {
    notesInQueue.push({ step: step, time: time });
    
    for (let row = 0; row < 8; row++) {
        if (grid[row][step]) {
            const type = rowInstruments[row];
            playInstrumentSound(row, type, time);
        }
    }
}

function advanceNote() {
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime += 0.25 * secondsPerBeat; // 16th note step
    currentStep = (currentStep + 1) % 64;
}

function drawPlayhead() {
    if (!isPlaying) return;
    
    let currentDrawingStep = currentStep;
    const now = audioCtx.currentTime;
    
    while (notesInQueue.length && notesInQueue[0].time < now) {
        currentDrawingStep = notesInQueue[0].step;
        notesInQueue.shift();
    }
    
    if (lastDrawingStep !== currentDrawingStep) {
        lastDrawingStep = currentDrawingStep;
        
        // Auto-follow page switching
        const stepPage = Math.floor(currentDrawingStep / 16);
        if (stepPage !== currentPage) {
            setPage(stepPage);
        }
        
        // Highlight active column
        const colOnPage = currentDrawingStep % 16;
        removePlayheadHighlight();
        highlightPlayhead(colOnPage);
    }
    
    requestAnimationFrame(drawPlayhead);
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

// Pitch frequencies for instruments based on current active chord
function playInstrumentSound(row, type, time) {
    if (!audioCtx) return;
    
    const activeMeasure = Math.floor(currentStep / 16);
    const chordName = chords[activeMeasure] || 'C';
    const notes = chordNotes[chordName] || chordNotes['C'];
    
    let freq = 440;
    if (row === 0) freq = notes[7];      // Chime
    else if (row === 1) freq = notes[6]; // Synth H
    else if (row === 2) freq = notes[5]; // Synth M
    else if (row === 3) freq = notes[4]; // Synth L
    else if (row === 4) freq = notes[1]; // Bass
    
    const isMelodic = ['chime', 'sine', 'square', 'saw', 'triangle', 'laser', 'warp'].includes(type);
    
    if (isMelodic && arpPattern !== 'off') {
        playArpeggiatedSound(freq, type, time);
    } else {
        triggerSound(type, freq, time);
    }
}

function playArpeggiatedSound(baseFreq, type, time) {
    const activeMeasure = Math.floor(currentStep / 16);
    const isMinor = ['Am', 'Dm', 'Em'].includes(chords[activeMeasure]);
    const semitones = isMinor ? [0, 3, 7, 12] : [0, 4, 7, 12];
    
    let noteFrequencies = semitones.map(semi => baseFreq * Math.pow(2, semi / 12));
    
    if (arpPattern === 'down') {
        noteFrequencies.reverse();
    } else if (arpPattern === 'bounce') {
        noteFrequencies = [noteFrequencies[0], noteFrequencies[2], noteFrequencies[3], noteFrequencies[1]];
    }
    
    // Play 4 fast notes sequentially
    const noteDuration = 0.05; 
    noteFrequencies.forEach((freq, index) => {
        triggerSound(type, freq, time + index * noteDuration);
    });
}

function triggerSound(type, freq, time) {
    if (!audioCtx) return;
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    switch (type) {
        case 'chime':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);
            gainNode.gain.setValueAtTime(0.2, time);
            gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(time);
            osc.stop(time + 0.35);
            break;
            
        case 'sine':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);
            gainNode.gain.setValueAtTime(0.15, time);
            gainNode.gain.linearRampToValueAtTime(0.001, time + 0.2);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(time);
            osc.stop(time + 0.22);
            break;
            
        case 'square':
            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, time);
            gainNode.gain.setValueAtTime(0.06, time);
            gainNode.gain.linearRampToValueAtTime(0.001, time + 0.18);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(time);
            osc.stop(time + 0.2);
            break;
            
        case 'saw':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, time);
            gainNode.gain.setValueAtTime(0.05, time);
            gainNode.gain.linearRampToValueAtTime(0.001, time + 0.22);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(time);
            osc.stop(time + 0.25);
            break;
            
        case 'triangle':
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);
            gainNode.gain.setValueAtTime(0.25, time);
            gainNode.gain.linearRampToValueAtTime(0.001, time + 0.3);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(time);
            osc.stop(time + 0.32);
            break;
            
        case 'kick':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(150, time);
            osc.frequency.exponentialRampToValueAtTime(40, time + 0.15);
            gainNode.gain.setValueAtTime(0.5, time);
            gainNode.gain.linearRampToValueAtTime(0.001, time + 0.18);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(time);
            osc.stop(time + 0.18);
            break;
            
        case 'snare':
            if (noiseBuffer) {
                const noiseNode = audioCtx.createBufferSource();
                noiseNode.buffer = noiseBuffer;
                const noiseFilter = audioCtx.createBiquadFilter();
                noiseFilter.type = 'bandpass';
                noiseFilter.frequency.setValueAtTime(1000, time);
                const noiseGain = audioCtx.createGain();
                noiseGain.gain.setValueAtTime(0.25, time);
                noiseGain.gain.linearRampToValueAtTime(0.001, time + 0.15);
                
                noiseNode.connect(noiseFilter);
                noiseFilter.connect(noiseGain);
                noiseGain.connect(audioCtx.destination);
                noiseNode.start(time);
                noiseNode.stop(time + 0.15);
            }
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(180, time);
            gainNode.gain.setValueAtTime(0.15, time);
            gainNode.gain.linearRampToValueAtTime(0.001, time + 0.12);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(time);
            osc.stop(time + 0.12);
            break;
            
        case 'hihat':
            if (noiseBuffer) {
                const noiseNode = audioCtx.createBufferSource();
                noiseNode.buffer = noiseBuffer;
                const noiseFilter = audioCtx.createBiquadFilter();
                noiseFilter.type = 'highpass';
                noiseFilter.frequency.setValueAtTime(7000, time);
                const noiseGain = audioCtx.createGain();
                noiseGain.gain.setValueAtTime(0.15, time);
                noiseGain.gain.linearRampToValueAtTime(0.001, time + 0.04);
                
                noiseNode.connect(noiseFilter);
                noiseFilter.connect(noiseGain);
                noiseGain.connect(audioCtx.destination);
                noiseNode.start(time);
                noiseNode.stop(time + 0.04);
            }
            break;
            
        case 'cymbal':
            if (noiseBuffer) {
                const noiseNode = audioCtx.createBufferSource();
                noiseNode.buffer = noiseBuffer;
                const noiseFilter = audioCtx.createBiquadFilter();
                noiseFilter.type = 'bandpass';
                noiseFilter.frequency.setValueAtTime(5000, time);
                const noiseGain = audioCtx.createGain();
                noiseGain.gain.setValueAtTime(0.2, time);
                noiseGain.gain.linearRampToValueAtTime(0.001, time + 0.4);
                
                noiseNode.connect(noiseFilter);
                noiseFilter.connect(noiseGain);
                noiseGain.connect(audioCtx.destination);
                noiseNode.start(time);
                noiseNode.stop(time + 0.4);
            }
            break;
            
        case 'cowbell':
            const osc2 = audioCtx.createOscillator();
            osc.type = 'square';
            osc.frequency.setValueAtTime(540, time);
            osc2.type = 'square';
            osc2.frequency.setValueAtTime(800, time);
            
            const filter = audioCtx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(800, time);
            
            gainNode.gain.setValueAtTime(0.1, time);
            gainNode.gain.linearRampToValueAtTime(0.001, time + 0.15);
            
            osc.connect(filter);
            osc2.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            osc.start(time);
            osc2.start(time);
            osc.stop(time + 0.15);
            osc2.stop(time + 0.15);
            break;
            
        case 'laser':
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, time);
            osc.frequency.linearRampToValueAtTime(80, time + 0.2);
            gainNode.gain.setValueAtTime(0.06, time);
            gainNode.gain.linearRampToValueAtTime(0.001, time + 0.2);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(time);
            osc.stop(time + 0.2);
            break;
            
        case 'warp':
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq / 2, time);
            osc.frequency.exponentialRampToValueAtTime(freq * 2, time + 0.25);
            gainNode.gain.setValueAtTime(0.15, time);
            gainNode.gain.linearRampToValueAtTime(0.001, time + 0.25);
            osc.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            osc.start(time);
            osc.stop(time + 0.25);
            break;
    }
}

function finishBeat() {
    if (isPlaying) togglePlay();
    HubAPI.complete(15, 10);
    HubAPI.close();
}
