// ===== Settings model =====
const settings = {
  stimuli: {
    colors: true,
    arrows: true,
    numbers: false,
    letters: false,
    combinedMode: {
      enabled: false,
      coloredArrowsOnly: false,
      backgroundCue: false,
      goColor: '#00aa00',
      noGoColor: '#ff8800'
    }
  },
  display: {
    mode: 'fixed',
    durationMs: 1000,
    randomMinMs: 500,
    randomMaxMs: 1500,
    interStimulusDelayMs: 500
  },
  session: {
    workDurationSec: 30,
    restDurationSec: 15,
    repetitions: 3,
    autoRestart: true
  }
};

const COLOR_LIST = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black', 'gray'];

const ARROW_LIST = [
  { id: 'up', char: '↑' },
  { id: 'down', char: '↓' },
  { id: 'left', char: '←' },
  { id: 'right', char: '→' },
  { id: 'up-right', char: '↗' },
  { id: 'down-right', char: '↘' },
  { id: 'up-left', char: '↖' },
  { id: 'down-left', char: '↙' }
];

const NUMBER_LIST = Array.from({ length: 12 }, (_, i) => String(i + 1));
const LETTER_LIST = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

// ===== Session state =====
let sessionState = {
  phase: 'idle',
  repIndex: 0,
  workEndTime: null,
  restEndTime: null,
  stimulusTimer: null,
  gapTimer: null
};

// ===== DOM references =====
const screens = {
  stimuli: document.getElementById('screen-stimuli'),
  timing: document.getElementById('screen-timing'),
  session: document.getElementById('screen-session')
};

const tabButtons = document.querySelectorAll('.tab-button');

const stimulusBox = document.getElementById('stimulus-box');
const stimulusContent = document.getElementById('stimulus-content');

const statusEl = document.getElementById('session-status');
const startBtn = document.getElementById('btn-start');
const stopBtn = document.getElementById('btn-stop');

// Stimuli controls
const checkColors = document.getElementById('check-colors');
const checkArrows = document.getElementById('check-arrows');
const checkNumbers = document.getElementById('check-numbers');
const checkLetters = document.getElementById('check-letters');

const checkCombinedEnabled = document.getElementById('check-combined-enabled');
const combinedOptions = document.getElementById('combined-options');
const checkColoredArrowsOnly = document.getElementById('check-colored-arrows-only');
const checkBackgroundCue = document.getElementById('check-background-cue');
const inputGoColor = document.getElementById('input-go-color');
const inputNoGoColor = document.getElementById('input-nogo-color');

// Timing controls
const fixedDurationInput = document.getElementById('input-fixed-duration');
const randomMinInput = document.getElementById('input-random-min');
const randomMaxInput = document.getElementById('input-random-max');
const delayInput = document.getElementById('input-delay');

// Session controls
const workInput = document.getElementById('input-work-sec');
const restInput = document.getElementById('input-rest-sec');
const autoRestartCheck = document.getElementById('check-auto-restart');
const repetitionsInput = document.getElementById('input-repetitions');

// ===== Navigation between screens =====
tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.screen;
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    Object.entries(screens).forEach(([name, el]) => {
      el.classList.toggle('active', name === target);
    });
  });
});

// ===== Settings binding =====
function updateSettingsFromUI() {
  // Stimuli
  settings.stimuli.colors = checkColors.checked;
  settings.stimuli.arrows = checkArrows.checked;
  settings.stimuli.numbers = checkNumbers.checked;
  settings.stimuli.letters = checkLetters.checked;

  settings.stimuli.combinedMode.enabled = checkCombinedEnabled.checked;
  settings.stimuli.combinedMode.coloredArrowsOnly = checkColoredArrowsOnly.checked;
  settings.stimuli.combinedMode.backgroundCue = checkBackgroundCue.checked;
  settings.stimuli.combinedMode.goColor = inputGoColor.value;
  settings.stimuli.combinedMode.noGoColor = inputNoGoColor.value;

  // Display
  const mode = document.querySelector('input[name="display-mode"]:checked').value;
  settings.display.mode = mode;
  settings.display.durationMs = parseInt(fixedDurationInput.value, 10) || 1000;
  settings.display.randomMinMs = parseInt(randomMinInput.value, 10) || 500;
  settings.display.randomMaxMs = parseInt(randomMaxInput.value, 10) || 1500;
  settings.display.interStimulusDelayMs = parseInt(delayInput.value, 10) || 0;

  // Session
  settings.session.workDurationSec = parseInt(workInput.value, 10) || 10;
  settings.session.restDurationSec = parseInt(restInput.value, 10) || 0;
  settings.session.autoRestart = autoRestartCheck.checked;
  settings.session.repetitions = parseInt(repetitionsInput.value, 10) || 1;
}

// Mettre à jour dès qu'un champ change
document.addEventListener('change', event => {
  if (event.target.closest('main')) {
    updateSettingsFromUI();
    combinedOptions.classList.toggle('hidden', !checkCombinedEnabled.checked);
  }
});

// ===== Stimulus generation =====
function randFrom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getDisplayDuration() {
  if (settings.display.mode === 'fixed') {
    return settings.display.durationMs;
  }
  const min = Math.min(settings.display.randomMinMs, settings.display.randomMaxMs);
  const max = Math.max(settings.display.randomMinMs, settings.display.randomMaxMs);
  return min + Math.floor(Math.random() * (max - min + 1));
}

function getGoNoGoBackground() {
  if (!settings.stimuli.combinedMode.backgroundCue) return null;
  const isGo = Math.random() < 0.5;
  return isGo ? settings.stimuli.combinedMode.goColor : settings.stimuli.combinedMode.noGoColor;
}

function getRandomStimulus() {
  // Combined mode active ?
  if (settings.stimuli.combinedMode.enabled) {
    // Only arrows, with optional color
    const arrow = randFrom(ARROW_LIST);
    const color = settings.stimuli.combinedMode.coloredArrowsOnly
      ? randFrom(COLOR_LIST)
      : '#ffffff';

    const bg = getGoNoGoBackground();
    return {
      text: arrow.char,
      textColor: color,
      backgroundColor: bg || '#000000'
    };
  }

  // Mode standard : mélange selon cases cochées
  const pool = [];
  if (settings.stimuli.colors) pool.push('color');
  if (settings.stimuli.arrows) pool.push('arrow');
  if (settings.stimuli.numbers) pool.push('number');
  if (settings.stimuli.letters) pool.push('letter');

  if (pool.length === 0) {
    return {
      text: '?',
      textColor: '#ffffff',
      backgroundColor: '#000000'
    };
  }

  const type = randFrom(pool);

  if (type === 'color') {
    const color = randFrom(COLOR_LIST);
    return {
      text: color.toUpperCase(),
      textColor: color,
      backgroundColor: '#000000'
    };
  }

  if (type === 'arrow') {
    const arrow = randFrom(ARROW_LIST);
    return {
      text: arrow.char,
      textColor: '#ffffff',
      backgroundColor: '#000000'
    };
  }

  if (type === 'number') {
    const n = randFrom(NUMBER_LIST);
    return {
      text: n,
      textColor: '#ffffff',
      backgroundColor: '#000000'
    };
  }

  if (type === 'letter') {
    const l = randFrom(LETTER_LIST);
    return {
      text: l,
      textColor: '#ffffff',
      backgroundColor: '#000000'
    };
  }
}

function showStimulus() {
  const stim = getRandomStimulus();
  stimulusContent.textContent = stim.text;
  stimulusContent.style.color = stim.textColor;
  stimulusBox.style.backgroundColor = stim.backgroundColor;
}

function clearStimulus() {
  stimulusContent.textContent = '';
  stimulusBox.style.backgroundColor = '#000000';
}

// ===== Session control =====
function setStatus(text) {
  statusEl.textContent = `Status: ${text}`;
}

function stopAllTimers() {
  clearTimeout(sessionState.stimulusTimer);
  clearTimeout(sessionState.gapTimer);
  sessionState.stimulusTimer = null;
  sessionState.gapTimer = null;
}

function scheduleNextStimulus() {
  if (sessionState.phase !== 'work') return;

  const now = Date.now();
  if (now >= sessionState.workEndTime) {
    // Fin de la phase work
    startRestPhase();
    return;
  }

  const displayDuration = getDisplayDuration();
  showStimulus();

  // fin de l'affichage
  sessionState.stimulusTimer = setTimeout(() => {
    clearStimulus();

    // délai entre deux stimuli
    sessionState.gapTimer = setTimeout(() => {
      scheduleNextStimulus();
    }, settings.display.interStimulusDelayMs);

  }, displayDuration);
}

function startWorkPhase() {
  sessionState.phase = 'work';
  const now = Date.now();
  sessionState.workEndTime = now + settings.session.workDurationSec * 1000;
  setStatus(`work (rep ${sessionState.repIndex + 1}/${settings.session.repetitions})`);
  scheduleNextStimulus();
}

function startRestPhase() {
  stopAllTimers();
  clearStimulus();

  if (settings.session.restDurationSec <= 0) {
    // Pas de repos : enchaîne
    endRepetition();
    return;
  }

  sessionState.phase = 'rest';
  const now = Date.now();
  sessionState.restEndTime = now + settings.session.restDurationSec * 1000;
  setStatus(`rest (rep ${sessionState.repIndex + 1}/${settings.session.repetitions})`);

  // Juste un timeout pour la fin du repos
  const restMs = settings.session.restDurationSec * 1000;
  sessionState.stimulusTimer = setTimeout(() => {
    endRepetition();
  }, restMs);
}

function endRepetition() {
  sessionState.repIndex++;

  if (!settings.session.autoRestart || sessionState.repIndex >= settings.session.repetitions) {
    // Fin de la session
    stopSession();
    return;
  }

  // Relancer une nouvelle répétition
  startWorkPhase();
}

function startSession() {
  updateSettingsFromUI();
  if (sessionState.phase !== 'idle') return;

  sessionState.repIndex = 0;
  stopAllTimers();
  sessionState.phase = 'work';
  startBtn.disabled = true;
  stopBtn.disabled = false;

  startWorkPhase();
}

function stopSession() {
  stopAllTimers();
  clearStimulus();
  sessionState.phase = 'idle';
  sessionState.repIndex = 0;
  setStatus('idle');
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

// Buttons
startBtn.addEventListener('click', startSession);
stopBtn.addEventListener('click', stopSession);

// Init
updateSettingsFromUI();

// ===== Service worker registration =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(err => {
      console.warn('SW registration failed', err);
    });
  });
}
