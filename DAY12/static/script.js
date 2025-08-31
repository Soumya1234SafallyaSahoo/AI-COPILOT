// ===== Config =====
const ENDPOINT = "http://localhost:8000/respond";

// ===== DOM =====
const recordBtn = document.getElementById("recordBtn");
const btnLabel = document.getElementById("btnLabel");
const statusEl = document.getElementById("status");
const dot = document.getElementById("stateDot");
const timerEl = document.getElementById("timer");
const logEl = document.getElementById("log");
const player = document.getElementById("player");
const togglePlayerBtn = document.getElementById("togglePlayer");

// ===== State =====
let mediaStream = null;
let mediaRecorder = null;
let chunks = [];
let state = "idle"; // idle | recording | processing | playing | error
let startedAt = null;
let timerHandle = null;

// ===== Helpers =====
function setState(next) {
  state = next;
  recordBtn.classList.toggle("recording", state === "recording");
  recordBtn.setAttribute("aria-pressed", String(state === "recording"));

  if (state === "idle") {
    btnLabel.textContent = "Start";
    dot.className = "light idle";
    setStatus("Idle — click to start");
    stopTimer(true);
  }
  if (state === "recording") {
    btnLabel.textContent = "Stop";
    dot.className = "light rec";
    setStatus("Recording… click to stop");
    startTimer();
  }
  if (state === "processing") {
    btnLabel.textContent = "Processing";
    dot.className = "light proc";
    setStatus("Processing… please wait");
    stopTimer(false);
  }
  if (state === "playing") {
    btnLabel.textContent = "Stop";
    dot.className = "light play";
    setStatus("Playing reply… click to stop");
    stopTimer(false);
  }
  if (state === "error") {
    btnLabel.textContent = "Start";
    dot.className = "light err";
  }
}
function setStatus(t) { statusEl.textContent = t; }
function log(html) { const d = document.createElement("div"); d.innerHTML = html; logEl.prepend(d); }

function startTimer() {
  startedAt = Date.now();
  if (timerHandle) clearInterval(timerHandle);
  timerHandle = setInterval(() => {
    const s = Math.floor((Date.now() - startedAt) / 1000);
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const r = String(s % 60).padStart(2, "0");
    timerEl.textContent = `${m}:${r}`;
  }, 250);
}
function stopTimer(reset) {
  if (timerHandle) clearInterval(timerHandle);
  if (reset) timerEl.textContent = "00:00";
}

async function ensureMic() {
  if (mediaStream) return mediaStream;
  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return mediaStream;
  } catch (err) {
    setState("error");
    setStatus("Mic permission denied");
    log(`<b>Error:</b> ${err.message}`);
    throw err;
  }
}

function pickMime() {
  const cands = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus",
    "audio/mp4",
  ];
  for (const t of cands) {
    if (window.MediaRecorder && MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(t)) {
      return t;
    }
  }
  return ""; // Let the browser choose a default
}

// ===== Core actions =====
async function startRecording() {
  await ensureMic();
  const mime = pickMime();

  chunks = [];
  mediaRecorder = new MediaRecorder(mediaStream, mime ? { mimeType: mime } : undefined);

  mediaRecorder.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  mediaRecorder.onstop = onRecordingStop;

  mediaRecorder.start();
  setState("recording");
  log(`<b>Recording:</b> ${mediaRecorder.mimeType || "default"}`);
}

async function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
}

async function onRecordingStop() {
  try {
    setState("processing");
    const blob = new Blob(chunks, { type: mediaRecorder.mimeType || "audio/webm" });
    const fd = new FormData();
    fd.append("audio", blob, "input.webm");

    const resp = await fetch(ENDPOINT, { method: "POST", body: fd });
    if (!resp.ok) {
      const text = await resp.text().catch(() => "");
      throw new Error(`Server ${resp.status}: ${text || resp.statusText}`);
    }

    // Expect raw audio back (as main.py sends)
    const audioBlob = await resp.blob();
    const audioSrc = URL.createObjectURL(audioBlob);
    await playAudio(audioSrc);
  } catch (err) {
    setState("error");
    setStatus("Error — see log");
    log(`<b>Error:</b> ${err.message}`);
  }
}

async function playAudio(src) {
  player.src = src;
  setState("playing");
  try {
    await player.play();
    log(`<b>Audio:</b> playing…`);
  } catch (err) {
    // Some browsers block autoplay—show the player to allow manual play
    player.classList.remove("hidden");
    log(`<b>Autoplay blocked:</b> ${err.message}`);
    setStatus("Autoplay blocked — click Play");
  }
  player.onended = () => setState("idle");
}

// ===== Events =====
recordBtn.addEventListener("click", async () => {
  if (state === "idle") return startRecording();
  if (state === "recording") return stopRecording();
  if (state === "playing") {
    player.pause(); player.currentTime = 0;
    setState("idle");
  }
});

togglePlayerBtn?.addEventListener("click", () => {
  player.classList.toggle("hidden");
  togglePlayerBtn.textContent = player.classList.contains("hidden") ? "Show Player" : "Hide Player";
});

// Keyboard shortcuts: Space toggles, Esc stops
window.addEventListener("keydown", (e) => {
  if (e.code === "Space" && !e.repeat) { e.preventDefault(); recordBtn.click(); }
  if (e.code === "Escape") {
    if (state === "recording") stopRecording();
    if (state === "playing") { player.pause(); setState("idle"); }
  }
});

// Initial tip
log(`<b>Tip:</b> Click <i>Start</i> (mic pulses while recording). Click again to send. Reply autoplays.`);
