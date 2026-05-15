import { NOTE_NAMES, LESSON_STEPS, SONGS } from './data.js';

const state = {
  mode: localStorage.getItem('atpt.mode') || 'lesson',
  lessonIndex: Number(localStorage.getItem('atpt.lessonIndex') || 0),
  songIndex: Number(localStorage.getItem('atpt.songIndex') || 0),
  visibleStart: Number(localStorage.getItem('atpt.visibleStart') || 48),
  visibleCount: Number(localStorage.getItem('atpt.visibleCount') || 25),
  connected: false,
  midiAccess: null,
  midiInputs: [],
  midiOutputs: [],
  activeNotes: new Set(),
  log: [],
  correct: 0,
  wrong: 0,
  streak: 0,
  score: 0,
  completed: 0,
  currentTarget: null,
  currentLessonStep: 0,
  currentSongStep: 0,
  playSource: 'lesson',
  flash: null,
};

const el = {};

function $(id) { return document.getElementById(id); }
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function save() {
  localStorage.setItem('atpt.mode', state.mode);
  localStorage.setItem('atpt.lessonIndex', String(state.lessonIndex));
  localStorage.setItem('atpt.songIndex', String(state.songIndex));
  localStorage.setItem('atpt.visibleStart', String(state.visibleStart));
  localStorage.setItem('atpt.visibleCount', String(state.visibleCount));
}
function noteName(note) {
  const octave = Math.floor(note / 12) - 1;
  return `${NOTE_NAMES[note % 12]}${octave}`;
}
function isBlack(note) {
  return [1, 3, 6, 8, 10].includes(note % 12);
}
function nowStamp() {
  return new Date().toLocaleTimeString('tr-TR', { hour12: false });
}
function pushLog(line) {
  state.log.unshift(line);
  state.log = state.log.slice(0, 40);
  renderLog();
}
function bytesToHex(data) {
  return [...data].map(byte => byte.toString(16).padStart(2, '0')).join(' ');
}
function portLabel(port) {
  return port?.name || port?.id || 'unknown-port';
}
function scanMidiPorts(access) {
  state.midiInputs = [...access.inputs.values()];
  state.midiOutputs = [...access.outputs.values()];
  state.midiInputs.forEach(input => attachInput(input));
  const inputNames = state.midiInputs.map(portLabel).join(', ') || 'input yok';
  const outputNames = state.midiOutputs.map(portLabel).join(', ') || 'output yok';
  el.deviceState.textContent = state.midiInputs[0]?.name || state.midiOutputs[0]?.name || 'Cihaz yok';
  el.deviceHint.textContent = `Input: ${inputNames} • Output: ${outputNames}`;
  pushLog({ time: nowStamp(), type: 'SYS', noteName: 'ports', raw: `inputs=[${inputNames}] outputs=[${outputNames}]` });
}
function setMode(mode) {
  state.mode = mode;
  document.querySelectorAll('.mode-tab').forEach(btn => btn.classList.toggle('active', btn.dataset.mode === mode));
  document.querySelectorAll('.panel-section').forEach(panel => panel.classList.remove('active'));
  $(`panel-${mode}`).classList.add('active');
  state.playSource = mode === 'songs' ? 'songs' : 'lesson';
  renderTarget();
  renderLesson();
  renderSongs();
  renderKeyboard();
  save();
}
function setRange(delta) {
  state.visibleStart = clamp(state.visibleStart + delta, 21, 108 - state.visibleCount);
  renderKeyboard();
  save();
}
function goToTarget() {
  if (state.currentTarget == null) return;
  const target = state.currentTarget;
  const centered = clamp(target - Math.floor(state.visibleCount / 2), 21, 108 - state.visibleCount);
  state.visibleStart = centered;
  renderKeyboard();
  save();
}
function currentLesson() { return LESSON_STEPS[state.lessonIndex % LESSON_STEPS.length]; }
function currentSong() { return SONGS[state.songIndex % SONGS.length]; }
function nextTargetFromLesson() { return currentLesson().note; }
function nextTargetFromSong() {
  const song = currentSong();
  return song.notes[state.currentSongStep % song.notes.length];
}
function currentTargetNote() {
  return state.playSource === 'songs' ? nextTargetFromSong() : nextTargetFromLesson();
}
function renderStats() {
  const total = state.correct + state.wrong;
  const acc = total ? Math.round((state.correct / total) * 100) : 0;
  el.scoreState.textContent = state.score.toString();
  el.accuracyState.textContent = `${state.correct} / ${state.wrong}`;
  el.correctCount.textContent = String(state.correct);
  el.wrongCount.textContent = String(state.wrong);
  el.accuracyPct.textContent = `${acc}%`;
  el.streakCount.textContent = String(state.streak);
  const progress = Math.max(state.completed, state.playSource === 'songs' ? (state.currentSongStep / currentSong().notes.length) * 100 : (state.lessonIndex / LESSON_STEPS.length) * 100);
  el.progressBar.style.width = `${clamp(progress, 0, 100)}%`;
  el.progressText.textContent = state.playSource === 'songs'
    ? `Parça ${state.songIndex + 1}/50: ${currentSong().title} • ${state.currentSongStep}/${currentSong().notes.length} nota`
    : `Eğitim ${state.lessonIndex + 1}/${LESSON_STEPS.length}: ${currentLesson().title}`;
}
function renderTarget() {
  state.currentTarget = currentTargetNote();
  el.targetNote.textContent = state.currentTarget != null ? noteName(state.currentTarget) : '—';
  el.playState.textContent = state.connected ? 'Hazır ve dinliyor' : 'MIDI bağlantısı bekleniyor';
  el.rangeState.textContent = `${noteName(state.visibleStart)}–${noteName(state.visibleStart + state.visibleCount - 1)}`;
  renderKeyboard();
  renderStats();
}
function renderLesson() {
  el.lessonDescription.textContent = `${currentLesson().title}: ${currentLesson().hint}`;
  el.lessonSteps.innerHTML = LESSON_STEPS.map((step, idx) => `
    <div class="lesson-item ${idx === state.lessonIndex ? 'active' : ''}">
      <div class="title">${idx + 1}. ${step.title}</div>
      <div class="song-meta">Hedef: ${noteName(step.note)} • ${step.hint}</div>
    </div>
  `).join('');
}
function renderSongs() {
  el.songDescription.textContent = `Toplam ${SONGS.length} parça, kolaydan zora sıralı.`;
  el.songList.innerHTML = SONGS.map((song, idx) => `
    <button class="song-item ${idx === state.songIndex ? 'active' : ''}" data-song-index="${idx}">
      <div class="title">${idx + 1}. ${song.title}</div>
      <div class="song-meta">Seviye ${song.difficulty} • ${song.tempo} BPM • ${song.notes.length} nota</div>
      <div class="song-meta">${song.description}</div>
    </button>
  `).join('');
  el.songList.querySelectorAll('[data-song-index]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.songIndex = Number(btn.dataset.songIndex);
      state.currentSongStep = 0;
      state.playSource = 'songs';
      save();
      setMode('songs');
      renderSongs();
      renderTarget();
    });
  });
  renderStats();
}
function renderLog() {
  el.midiLog.innerHTML = state.log.map(item => `
    <div class="midi-entry">
      <div class="meta">${item.time} • ${item.type} • ${item.noteName}</div>
      <div class="raw">${item.raw}</div>
    </div>
  `).join('') || '<div class="muted">Henüz MIDI mesajı yok.</div>';
}
function clearMidiLog() {
  state.log = [];
  renderLog();
}
function renderKeyboard() {
  const start = state.visibleStart;
  const end = start + state.visibleCount - 1;
  const white = [];
  const blacks = [];
  const WHITE_W = 44;
  const BLACK_W = 28;
  let whiteIndex = 0;
  for (let n = start; n <= end; n++) {
    const entry = {
      note: n,
      label: noteName(n),
      black: isBlack(n),
      active: state.activeNotes.has(n),
      target: n === state.currentTarget,
      pressed: state.flash?.correct?.has?.(n),
      wrong: state.flash?.wrong?.has?.(n),
    };
    if (entry.black) {
      const x = whiteIndex * WHITE_W - BLACK_W / 2;
      blacks.push({ ...entry, x });
    } else {
      white.push({ ...entry, x: whiteIndex * WHITE_W });
      whiteIndex += 1;
    }
  }
  const totalWidth = Math.max(whiteIndex * WHITE_W, 1);
  const whiteHtml = white.map(k => `<div class="key white ${k.target ? 'target' : ''} ${k.active ? 'active' : ''} ${k.pressed ? 'correct' : ''} ${k.wrong ? 'wrong' : ''}" style="left:${k.x}px" data-note="${k.note}"><small>${k.label}</small></div>`).join('');
  const blackHtml = blacks.map(k => `<div class="key black ${k.target ? 'target' : ''} ${k.active ? 'active' : ''} ${k.pressed ? 'correct' : ''} ${k.wrong ? 'wrong' : ''}" style="left:${k.x}px" data-note="${k.note}"><small>${k.label}</small></div>`).join('');
  el.keyboard.innerHTML = `<div class="keyboard-stage" style="width:${totalWidth}px">${whiteHtml}${blackHtml}</div>`;
}
function flashResult(note, ok) {
  const correct = ok ? new Set([note]) : new Set();
  const wrong = ok ? new Set() : new Set([note]);
  state.flash = { correct, wrong };
  renderKeyboard();
  setTimeout(() => {
    state.flash = null;
    renderKeyboard();
  }, 220);
}
function advanceLesson() {
  state.lessonIndex = (state.lessonIndex + 1) % LESSON_STEPS.length;
  state.completed = ((state.lessonIndex + 1) / LESSON_STEPS.length) * 100;
  renderLesson();
  renderTarget();
  save();
}
function advanceSong() {
  const song = currentSong();
  state.currentSongStep += 1;
  if (state.currentSongStep >= song.notes.length) {
    state.completed = 100;
    state.score += 50;
    state.songIndex = (state.songIndex + 1) % SONGS.length;
    state.currentSongStep = 0;
    pushLog({ time: nowStamp(), type: 'song', noteName: song.title, raw: `Completed ${song.title}` });
    renderSongs();
  }
  renderTarget();
  save();
}
function correctHit(note) {
  state.correct += 1;
  state.streak += 1;
  state.score += 10 + (state.streak % 5 === 0 ? 2 : 0);
  state.completed = state.playSource === 'songs'
    ? (state.currentSongStep + 1) / currentSong().notes.length * 100
    : (state.lessonIndex + 1) / LESSON_STEPS.length * 100;
  flashResult(note, true);
  if (state.playSource === 'songs') advanceSong(); else advanceLesson();
  renderStats();
}
function wrongHit(note) {
  state.wrong += 1;
  state.streak = 0;
  state.score -= 3;
  flashResult(note, false);
  renderStats();
}
function processNote(note, velocity, on) {
  if (on) state.activeNotes.add(note); else state.activeNotes.delete(note);
  const raw = `${on ? 'noteOn' : 'noteOff'} [${note}] velocity=${velocity}`;
  pushLog({ time: nowStamp(), type: on ? 'ON' : 'OFF', noteName: noteName(note), raw });
  if (on && note === state.currentTarget) correctHit(note);
  else if (on && state.currentTarget !== null && note !== state.currentTarget) wrongHit(note);
  renderKeyboard();
}
function handleMidiMessage(event) {
  const [status, data1, data2] = event.data;
  const cmd = status & 0xf0;
  const channel = (status & 0x0f) + 1;
  const note = data1;
  const velocity = data2 || 0;
  const portName = portLabel(event.currentTarget || event.target || event.port);
  pushLog({ time: nowStamp(), type: 'RAW', noteName: portName, raw: `port:${portName} ${bytesToHex(event.data)}` });
  if (cmd === 0x90 && velocity > 0) {
    processNote(note, velocity, true);
  } else if (cmd === 0x80 || (cmd === 0x90 && velocity === 0)) {
    processNote(note, velocity, false);
  } else {
    pushLog({ time: nowStamp(), type: 'CC', noteName: `ch${channel}`, raw: `${status.toString(16)} ${data1} ${data2}` });
  }
}
async function connectMidi() {
  if (!navigator.requestMIDIAccess) {
    el.connectionState.textContent = 'Desteklenmiyor';
    el.connectionHint.textContent = 'Bu tarayıcı Web MIDI desteklemiyor.';
    return;
  }
  el.connectionState.textContent = 'İzin isteniyor';
  try {
    const access = await navigator.requestMIDIAccess({ sysex: false });
    state.midiAccess = access;
    state.connected = true;
    scanMidiPorts(access);
    access.onstatechange = (e) => {
      const port = e.port;
      pushLog({
        time: nowStamp(),
        type: 'STATE',
        noteName: port.type || 'port',
        raw: `name:${port.name} connection:${port.connection} state:${port.state}`,
      });
      if (port.type === 'input' && port.state === 'connected') attachInput(port);
      scanMidiPorts(access);
    };
    el.connectionState.textContent = 'Bağlandı';
    el.connectionHint.textContent = 'Canlı MIDI girişleri ve output testleri etkin.';
    pushLog({ time: nowStamp(), type: 'SYS', noteName: 'MIDI', raw: 'Access granted via requestMIDIAccess({ sysex:false })' });
    renderTarget();
  } catch (err) {
    state.connected = false;
    el.connectionState.textContent = 'İzin verilmedi';
    el.connectionHint.textContent = 'MIDI erişimi reddedildi; debug modda devam edebilirsiniz.';
    pushLog({ time: nowStamp(), type: 'ERR', noteName: 'MIDI', raw: String(err.message || err) });
  }
}
function attachInput(input) {
  input.onmidimessage = handleMidiMessage;
}
function sendTestNote(on) {
  if (!state.midiAccess) {
    pushLog({ time: nowStamp(), type: 'ERR', noteName: 'output', raw: 'Önce MIDI Bağlan düğmesine dokun.' });
    return;
  }
  const message = on ? [0x90, 60, 0x40] : [0x80, 60, 0x00];
  const outputs = [...state.midiAccess.outputs.values()];
  outputs.forEach(output => output.send(message, window.performance.now()));
  pushLog({ time: nowStamp(), type: 'OUT', noteName: 'C3', raw: `${on ? 'noteOn' : 'noteOff'} ${bytesToHex(message)} -> ${outputs.length || 0} output` });
}
function resetSession() {
  state.correct = 0;
  state.wrong = 0;
  state.streak = 0;
  state.score = 0;
  state.completed = 0;
  state.currentSongStep = 0;
  state.lessonIndex = Number(localStorage.getItem('atpt.lessonIndex') || 0);
  state.songIndex = Number(localStorage.getItem('atpt.songIndex') || 0);
  state.log = [];
  state.activeNotes.clear();
  state.flash = null;
  renderLesson();
  renderSongs();
  renderTarget();
  renderStats();
  renderLog();
  renderKeyboard();
}
function wireUI() {
  el.connectBtn.addEventListener('click', connectMidi);
  el.resetBtn.addEventListener('click', resetSession);
  el.clearLogBtn.addEventListener('click', clearMidiLog);
  el.testNoteOnBtn.addEventListener('click', () => sendTestNote(true));
  el.testNoteOffBtn.addEventListener('click', () => sendTestNote(false));
  el.octaveDown.addEventListener('click', () => setRange(-12));
  el.octaveUp.addEventListener('click', () => setRange(12));
  el.focusTarget.addEventListener('click', goToTarget);
  el.lessonPrev.addEventListener('click', () => { state.lessonIndex = (state.lessonIndex - 1 + LESSON_STEPS.length) % LESSON_STEPS.length; state.currentSongStep = 0; state.playSource = 'lesson'; save(); renderLesson(); renderTarget(); });
  el.lessonNext.addEventListener('click', () => { state.lessonIndex = (state.lessonIndex + 1) % LESSON_STEPS.length; state.currentSongStep = 0; state.playSource = 'lesson'; save(); renderLesson(); renderTarget(); });
  el.songPrev.addEventListener('click', () => { state.songIndex = (state.songIndex - 1 + SONGS.length) % SONGS.length; state.currentSongStep = 0; state.playSource = 'songs'; save(); renderSongs(); renderTarget(); });
  el.songNext.addEventListener('click', () => { state.songIndex = (state.songIndex + 1) % SONGS.length; state.currentSongStep = 0; state.playSource = 'songs'; save(); renderSongs(); renderTarget(); });
  document.querySelectorAll('.mode-tab').forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));
}
function init() {
  el.connectBtn = $('connectBtn');
  el.resetBtn = $('resetBtn');
  el.connectionState = $('connectionState');
  el.connectionHint = $('connectionHint');
  el.deviceState = $('deviceState');
  el.deviceHint = $('deviceHint');
  el.scoreState = $('scoreState');
  el.scoreHint = $('scoreHint');
  el.accuracyState = $('accuracyState');
  el.accuracyHint = $('accuracyHint');
  el.targetNote = $('targetNote');
  el.playState = $('playState');
  el.rangeState = $('rangeState');
  el.keyboard = $('keyboard');
  el.lessonDescription = $('lessonDescription');
  el.lessonSteps = $('lessonSteps');
  el.songDescription = $('songDescription');
  el.songList = $('songList');
  el.midiLog = $('midiLog');
  el.correctCount = $('correctCount');
  el.wrongCount = $('wrongCount');
  el.accuracyPct = $('accuracyPct');
  el.streakCount = $('streakCount');
  el.progressBar = $('progressBar');
  el.progressText = $('progressText');
  el.octaveDown = $('octaveDown');
  el.octaveUp = $('octaveUp');
  el.focusTarget = $('focusTarget');
  el.lessonPrev = $('lessonPrev');
  el.lessonNext = $('lessonNext');
  el.songPrev = $('songPrev');
  el.songNext = $('songNext');
  el.clearLogBtn = $('clearLogBtn');
  el.testNoteOnBtn = $('testNoteOnBtn');
  el.testNoteOffBtn = $('testNoteOffBtn');
  wireUI();
  setMode(state.mode);
  renderLesson();
  renderSongs();
  renderTarget();
  renderStats();
  renderLog();
  renderKeyboard();
  el.connectionState.textContent = navigator.requestMIDIAccess ? 'Hazır' : 'Desteklenmiyor';
  el.connectionHint.textContent = navigator.requestMIDIAccess ? 'MIDI bağlan butonuna dokun.' : 'Bu tarayıcı Web MIDI desteklemiyor; iPad fallback kullan.';
}

init();
