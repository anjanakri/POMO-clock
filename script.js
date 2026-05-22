//GRAB ALL ELEMENTS
const countdown = document.getElementById('countdown');
const statusLabel = document.getElementById('status-label');
const modeBadge = document.getElementById('mode-badge');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const applyBtn = document.getElementById('apply-btn');
const cancelBtn = document.getElementById('cancel-btn');
const focusInput = document.getElementById('focus-input');
const breakInput = document.getElementById('break-input');
const historyList = document.getElementById('history-list');

//TIMER VARIABLES
let focusMins = 25;
let breakMins = 5;
let totalSecs = focusMins * 60;
let secsLeft = totalSecs;
let running = false;
let mode = 'focus';
let interval = null;

//FORMAT TIME
function formatTime(secs) {
  const m = String(Math.floor(secs / 60)).padStart(2, '0');
  const s = String(secs % 60).padStart(2, '0');
  return `${m}:${s}`;
}

//UPDATE DISPLAY
function updateDisplay() {
  countdown.textContent = formatTime(secsLeft);
  modeBadge.textContent = mode === 'focus' ? 'FOCUS' : 'BREAK';
  if (!running && secsLeft === totalSecs) {
    statusLabel.textContent = 'READY';
  } else if (running) {
    statusLabel.textContent = 'RUNNING';
  } else {
    statusLabel.textContent = 'PAUSED';
  }
}

//BEEP SOUND
function beep(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = type === 'focus' ? [523, 659, 784] : [784, 659, 523];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0, ctx.currentTime + i * 0.18);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + i * 0.18 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.18 + 0.28);
      osc.start(ctx.currentTime + i * 0.18);
      osc.stop(ctx.currentTime + i * 0.18 + 0.3);
    });
  } catch (_) {}
}

//SAVE & LOAD HISTORY
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadHistory() {
  try {
    const raw = localStorage.getItem('pomo_history');
    if (!raw) return [];
    const { date, sessions } = JSON.parse(raw);
    if (date !== todayKey()) return [];
    return sessions;
  } catch { return []; }
}

function saveHistory(sessions) {
  localStorage.setItem('pomo_history', JSON.stringify({
    date: todayKey(),
    sessions
  }));
}

function renderHistory() {
  const sessions = loadHistory();
  if (sessions.length === 0) {
    historyList.innerHTML = '<li>No session yet</li>';
    return;
  }
  historyList.innerHTML = sessions.map(s => `
    <li>✓ ${s.mins}:00 focus — ${s.time}</li>
  `).join('');
}

//CYCLE END
function handleCycleEnd() {
  clearInterval(interval);
  running = false;

  if (mode === 'focus') {
    beep('focus');
    const sessions = loadHistory();
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    sessions.unshift({ mins: focusMins, time });
    saveHistory(sessions);
    renderHistory();
    mode = 'break';
    totalSecs = breakMins * 60;
  } else {
    beep('break');
    mode = 'focus';
    totalSecs = focusMins * 60;
  }

  secsLeft = totalSecs;
  updateDisplay();
}

//START
startBtn.addEventListener('click', () => {
  if (running) return;
  running = true;
  statusLabel.textContent = 'RUNNING';
  interval = setInterval(() => {
    secsLeft--;
    updateDisplay();
    if (secsLeft <= 0) handleCycleEnd();
  }, 1000);
});

//PAUSE
pauseBtn.addEventListener('click', () => {
  if (!running) return;
  clearInterval(interval);
  running = false;
  statusLabel.textContent = 'PAUSED';
});

//RESET
resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  running = false;
  mode = 'focus';
  totalSecs = focusMins * 60;
  secsLeft = totalSecs;
  updateDisplay();
});

// SETTINGS OPEN/CLOSE
settingsBtn.addEventListener('click', () => {
  settingsModal.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
  settingsModal.classList.add('hidden');
});

//APPLY SETTINGS
applyBtn.addEventListener('click', () => {
  const f = parseInt(focusInput.value);
  const b = parseInt(breakInput.value);
  if (f > 0 && b > 0) {
    focusMins = f;
    breakMins = b;
    clearInterval(interval);
    running = false;
    mode = 'focus';
    totalSecs = focusMins * 60;
    secsLeft = totalSecs;
    updateDisplay();
  }
  settingsModal.classList.add('hidden');
});

//INIT 
renderHistory();
updateDisplay();