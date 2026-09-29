const IN_CLAUDE = typeof BUILD !== "undefined" && BUILD === "artifact";
const REPO = "https://github.com/codefromtokyo/forareason";
const LOGO = `<svg class="logo" viewBox="0 0 64 64" width="28" height="28" aria-hidden="true"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2E6BD6"/><stop offset="1" stop-color="#163A86"/></linearGradient></defs><path d="M32 3C18.7 3 8 13.4 8 26.3c0 9.9 6.6 18.4 16.3 22.6L32 61l7.7-12.1C49.4 44.7 56 36.2 56 26.3 56 13.4 45.3 3 32 3z" fill="url(#lg)"/><circle cx="32" cy="26" r="15" fill="#fff"/><path d="M24.5 26.5l5.2 5.2L40 21.3" fill="none" stroke="#2E6BD6" stroke-width="5.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="49" cy="12" r="6.5" fill="#E4577A" stroke="#fff" stroke-width="2.5"/></svg>`;
const COURSES = { "en-nl":{ from:"en", to:"nl", flag:"🇳🇱", group:"lang" }, "en-fr":{ from:"en", to:"fr", flag:"🇫🇷", group:"lang" }, "en-ja":{ from:"en", to:"ja", flag:"🇯🇵", group:"lang" }, "road-jp":{ from:"en", to:"road-jp", flag:"🇯🇵", group:"road" }, "road-nl":{ from:"en", to:"road-nl", flag:"🇳🇱", group:"road" }, "visa-jp":{ from:"en", to:"visa-jp", flag:"🇯🇵", group:"visa" }, "visa-nl":{ from:"en", to:"visa-nl", flag:"🇳🇱", group:"visa" }, "visa-fr":{ from:"en", to:"visa-fr", flag:"🇫🇷", group:"visa" }, "nomad-jp":{ from:"en", to:"nomad-jp", flag:"🇯🇵", group:"nomad" }, "nomad-nl":{ from:"en", to:"nomad-nl", flag:"🇳🇱", group:"nomad" }, "nomad-fr":{ from:"en", to:"nomad-fr", flag:"🇫🇷", group:"nomad" }, "travel-jp":{ from:"en", to:"travel-jp", flag:"🇯🇵", group:"travel" }, "travel-nl":{ from:"en", to:"travel-nl", flag:"🇳🇱", group:"travel" }, "travel-fr":{ from:"en", to:"travel-fr", flag:"🇫🇷", group:"travel" } };
const READY = 70, KEY = "nt2-trainer-v1", DAY = 86400000, INTERVALS = [0, 1, 3, 7, 14, 30];
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const prepQ = q => { if (q.a != null) return { q:q.q, why:q.why, options:q.o.slice(), answer:q.a }; const idx = shuffle(q.o.map((_, i) => i)); return { q:q.q, why:q.why, options:idx.map(i => q.o[i]), answer:idx.indexOf(0) }; };
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC").replace(/[.,!?;:"'()€。、？！「」『』・（）]/g, " ").replace(/\s+/g, " ").trim();
const words = s => (String(s).trim().match(/\S+/g) || []).length;
const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const romN = s => String(s).toLowerCase().replace(/ā/g, "aa").replace(/ī/g, "ii").replace(/ū/g, "uu").replace(/ē/g, "ee").replace(/ō/g, "ou").replace(/[^a-z]/g, "").replace(/ou/g, "o").replace(/oo/g, "o").replace(/uu/g, "u").replace(/nn/g, "n");
const nospace = s => norm(s).replace(/ /g, "");

/* ---------- state ---------- */
const blankCourse = pack => ({ level:pack.levels[0], vocab:{}, due:{}, drills:{}, order:{}, exams:{}, generated:{}, extra:{}, cnt:{}, done:{}, tracks:{}, certs:{} });
let P = { course:"en-nl", C:{}, rate:0.9, engine:"auto", day:{}, streak:{ n:0, last:"" }, mode:"practice", reason:"exam", name:"", user:null, roadReason:"rules", visaFocus:"work", badges:{}, passport:"in", onboarded:false, last:null, guides:{}, doc:{ name:"", nationality:"", passport:"", home:"", base:"", start:"", end:"", purpose:"Tourism", days:7, sponsor:"", relation:"", sponsorPassport:"", sponsorId:"", host:"", hostAddr:"", pace:"balanced", interests:[], combineSchengen:false, roadCountry:"nl", schCountries:["nl","fr"], payCountry:"nl", grossPay:"", ruling:false } , checklist:{} };
try { const raw = localStorage.getItem(KEY); if (raw) { const o = JSON.parse(raw);
  if (!o.C) { const nl = blankCourse(PACKS.nl); ["vocab","due","drills","order","exams","generated","extra"].forEach(k => { if (o[k]) nl[k] = o[k]; }); if (o.level) nl.level = o.level;
    Object.keys(nl.vocab).forEach(k => { if (nl.due[k] == null) nl.due[k] = Date.now(); });
    P = Object.assign(P, { rate:o.rate || 0.9, engine:o.engine || "auto", day:o.day || {}, streak:o.streak || P.streak, mode:o.mode || "practice", installHide:o.installHide, C:{ "en-nl":nl } }); }
  else P = Object.assign(P, o); } } catch (e) {}
const qp = new URLSearchParams(location.search);
const PUBLIC_UID = qp.get("u");
const PUBLIC_HANDLE = qp.get("h") || (location.pathname.match(/^\/u\/([a-z0-9_-]+)/i) || [])[1] || null;
if (COURSES[qp.get("course")]) P.course = qp.get("course");
const COUNTRIES = [
  { code:"jp", name:"Japan", flag:"🇯🇵", travel:"travel-jp", language:"en-ja", road:"road-jp", visa:"visa-jp", nomad:"nomad-jp" },
  { code:"nl", name:"Netherlands", flag:"🇳🇱", travel:"travel-nl", language:"en-nl", road:"road-nl", visa:"visa-nl", nomad:"nomad-nl" },
  { code:"fr", name:"France", flag:"🇫🇷", travel:"travel-fr", language:"en-fr", road:null, visa:"visa-fr", nomad:"nomad-fr" }
];
const TOPIC_KEYS = ["travel", "language", "road", "visa", "nomad"];
const countryOf = id => COUNTRIES.find(c => c.travel === id || c.language === id || c.road === id || c.visa === id || c.nomad === id) || COUNTRIES[0];
const topicOf = id => { const c = countryOf(id); return c.travel === id ? "travel" : c.language === id ? "language" : c.road === id ? "road" : c.visa === id ? "visa" : "nomad"; };
const topicsFor = c => TOPIC_KEYS.filter(k => c[k]);
const resolveCourse = (code, topic) => { const c = COUNTRIES.find(x => x.code === code) || COUNTRIES[0]; return c[topic] || c[topicsFor(c)[0]]; };
const cur = () => COURSES[P.course];
const pack = () => PACKS[cur().to];
const C = () => { const p = pack(); if (!P.C[P.course]) P.C[P.course] = blankCourse(p); const c = P.C[P.course]; if (!p.levels.includes(c.level)) c.level = p.levels[0]; c.tracks = c.tracks || {}; c.certs = c.certs || {}; return c; };
if (qp.get("reason")) P.reason = qp.get("reason");
if (qp.get("level") && pack().levels.includes(qp.get("level"))) C().level = qp.get("level");
const LV = () => C().level;
const D = L => pack().data[L || LV()];
let _cloudTimer = null;
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) {}
  if (typeof Cloud !== "undefined" && Cloud.live && Cloud.mode === "supabase" && Cloud.user) { clearTimeout(_cloudTimer); const course = P.course, data = P.C[course]; _cloudTimer = setTimeout(() => Cloud.saveProgress(course, data).catch(() => {}), 1500); } };
const S = { view:"home", act:null, cur:null, mic:null, sound:{}, trans:{}, busy:{} };
function anyProgress() { const d = P.day || {}; if ((d.words||0)+(d.drills||0)+(d.sentences||0)+(d.listen||0)+(d.speak||0) > 0) return true; for (const id in P.C) { const c = P.C[id]; if (c && (Object.keys(c.vocab||{}).length || Object.keys(c.exams||{}).length || Object.keys(c.done||{}).length || Object.keys(c.certs||{}).length)) return true; } return false; }
const LA = () => `lang="${pack().kind === "road" ? "en" : cur().to}"`;
const isRoad = () => pack().kind === "road";
const isVisa = () => pack().kind === "visa" || pack().kind === "nomad";
const isNomad = () => pack().kind === "nomad";
const isTravel = () => pack().kind === "travel";
const isGuideCourse = () => isRoad() || isVisa() || isTravel();
const passOf = s => (s && s.pass) || READY;
let ai = null;

/* ---------- daily goals ---------- */
const GOALS = [["words",15,"words"],["drills",10,"g0"],["sentences",3,"order"],["listen",10,"listen"],["speak",5,"speak"]];
const dstr = x => new Date(x).toISOString().slice(0, 10);
function today() { const d = dstr(Date.now()); if (P.day.date !== d) P.day = { date:d, words:0, drills:0, sentences:0, listen:0, speak:0 }; return P.day; }
function bump(k, L) { today()[k]++; if (L) { const c = C(), key = L + ":" + k; c.cnt[key] = (c.cnt[key] || 0) + 1; }
  const d = P.day.date; if (P.streak.last !== d) { P.streak.n = P.streak.last === dstr(Date.now() - DAY) ? P.streak.n + 1 : 1; P.streak.last = d; } save(); }

/* ---------- vocab ---------- */
function vocabList(L) {
  const ja = pack().split === "char";
  return D(L).vocab.map((v, i) => ja ? { t:v[0], r:v[1], rom:v[2], m:v[3], key:L + ":" + i } : { t:v[0], m:v[1], key:L + ":" + i })
    .concat((C().extra[L] || []).map((v, i) => ({ t:v.t, r:v.r, rom:v.rom, m:v.m, ex:v.ex, exM:v.exM, key:L + ":x" + i })));
}
function srsGrade(key, ok) { const c = C(), b = ok ? Math.min(5, (c.vocab[key] || 0) + 1) : 0; c.vocab[key] = b; c.due[key] = Date.now() + INTERVALS[b] * DAY; save(); }
function dueQueue(L, all) { const c = C(), now = Date.now(), list = vocabList(L);
  if (all) return shuffle(list.map(v => v.key));
  const seen = list.filter(v => c.due[v.key] != null && c.due[v.key] <= now).sort((a, b) => c.due[a.key] - c.due[b.key]);
  return seen.map(v => v.key).concat(shuffle(list.filter(v => c.due[v.key] == null)).slice(0, 8).map(v => v.key)); }
const vocabByKey = (L, k) => vocabList(L).find(v => v.key === k);
const showWord = v => v.r && v.r !== v.t ? `${v.t}（${v.r}）` : v.t;

/* ---------- syllabus steps ---------- */
function stepsFor(L) {
  const p = pack(), first = L === p.levels[0], s = [];
  if (first) { if (p.kana) s.push({ id:"kana", title:t("steps.kana"), why:t("stepWhy.kana") }); s.push({ id:"sounds", title:t("steps.sounds"), why:t("stepWhy.sounds") }); }
  s.push({ id:"words", title:t("steps.words"), why:t("stepWhy.words") });
  s.push({ id:"g0", title:D(L).grammar[0].title, why:t("stepWhy.grammar") });
  s.push({ id:"order", title:t("steps.order"), why:t("stepWhy.order") });
  if (D(L).grammar[1]) s.push({ id:"g1", title:D(L).grammar[1].title, why:t("stepWhy.grammar") });
  s.push({ id:"listen", title:t("steps.listen"), why:t("stepWhy.listen") });
  s.push({ id:"speak", title:t("steps.speak"), why:t("stepWhy.speak") });
  s.push({ id:"mock", title:t("steps.mock"), why:t("stepWhy.mock", READY) });
  return s.map(x => ({ ...x, done:stepDone(L, x.id) }));
}
function stepDone(L, id) {
  const c = C(), d = D(L), cn = k => c.cnt[L + ":" + k] || 0;
  if (c.done[L + ":" + id]) return true;
  if (id === "kana") return (c.cnt["kana"] || 0) >= 40;
  if (id === "sounds") return (c.cnt["sound"] || 0) >= 8;
  if (id === "words") { const vl = vocabList(L); return vl.filter(v => (c.vocab[v.key] || 0) >= 2).length / vl.length >= 0.7; }
  if (id[0] === "g") { const gi = +id[1], g = d.grammar[gi]; return g.drills.filter((_, i) => c.drills[L + ":" + gi + ":" + i]).length / g.drills.length >= 0.8; }
  if (id === "order") return d.order.filter((_, i) => c.order[L + ":" + i]).length / d.order.length >= 0.75;
  if (id === "listen") return cn("listen") >= 15;
  if (id === "speak") return cn("speak") >= 10;
  if (id === "mock") return pack().sections.every(s => (c.exams[L + ":" + s.k] || 0) >= READY);
  return false;
}
function grade() {
  const p = pack(); let reached = null;
  for (const L of p.levels) { if (stepDone(L, "mock")) reached = L; else break; }
  const L = LV(), st = stepsFor(L), d = st.filter(x => x.done).length;
  return { reached, L, st, d, n:st.length, next:st.find(x => !x.done) };
}

/* ---------- text to speech ---------- */
const hasTTS = () => "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
function allVoices() { try { return (hasTTS() && speechSynthesis.getVoices()) || []; } catch (e) { return []; } }
function bestVoice(lang) { const v = allVoices(), two = lang.slice(0, 2).toLowerCase();
  return v.find(x => x.lang && x.lang.toLowerCase() === lang.toLowerCase())
      || v.find(x => x.lang && x.lang.replace("_", "-").toLowerCase().startsWith(two)) || null; }
function pickVoice() {} // kept for callers; voice is resolved at speak time now
let ttsUnlocked = false, voiceWarned = false, keepAlive = null;
function unlockTTS() { if (ttsUnlocked || !hasTTS()) return; ttsUnlocked = true;
  try { const u = new SpeechSynthesisUtterance(" "); u.volume = 0; speechSynthesis.speak(u); } catch (e) {} }
if (hasTTS()) { try { speechSynthesis.getVoices(); speechSynthesis.onvoiceschanged = () => {}; } catch (e) {}
  ["pointerdown", "keydown", "touchstart"].forEach(ev => window.addEventListener(ev, unlockTTS, { once:true, passive:true })); }
function speak(text, onend, slow) {
  if (!hasTTS()) { toast(t("nounceAudioNA")); return; }
  const lang = pack().speech;
  const run = () => {
    try {
      unlockTTS();
      try { speechSynthesis.resume(); } catch (e) {}
      if (speechSynthesis.speaking || speechSynthesis.pending) speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(String(text));
      u.lang = lang; const bv = bestVoice(lang); if (bv) u.voice = bv;
      u.rate = slow ? Math.max(0.5, P.rate - 0.3) : P.rate;
      u.onend = () => { clearInterval(keepAlive); if (onend) onend(); };
      u.onerror = ev => { clearInterval(keepAlive); if (ev && ev.error && ev.error !== "canceled" && ev.error !== "interrupted") toast(t("audioFail")); };
      if (allVoices().length && !bv && !voiceWarned) { voiceWarned = true; toast(t("noVoiceShort", pack().name)); }
      // start on the next tick so a preceding cancel() doesn't swallow it (Chrome bug)
      setTimeout(() => { try { speechSynthesis.speak(u);
        clearInterval(keepAlive); keepAlive = setInterval(() => { if (speechSynthesis.speaking) { try { speechSynthesis.resume(); } catch (e) {} } else clearInterval(keepAlive); }, 4000);
      } catch (e) { toast(t("audioFail")); } }, 0);
    } catch (e) { toast(t("audioFail")); }
  };
  if (allVoices().length === 0) { // voices not loaded yet: wait briefly then speak anyway
    let tries = 0; const iv = setInterval(() => { if (allVoices().length || ++tries > 12) { clearInterval(iv); run(); } }, 90);
  } else run();
}
const sayBtns = (x, slow = true) => `<button class="btn ghost small" data-say="${esc(x)}">${t("play")}</button>${slow ? `<button class="btn ghost small" data-slow="${esc(x)}">${t("slow")}</button>` : ""}`;

/* ---------- speech to text ---------- */
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const IS_IOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
const STANDALONE = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
const WHISPER_OK = !IN_CLAUDE && !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder && window.OfflineAudioContext);
const WH = { status:"idle", files:{}, pct:0 };
let browserBroken = false, asrPromise = null;
let micBlocked = false;
function sttMode() {
  if (micBlocked) return null;
  if (P.engine === "browser") return SR ? "browser" : null;
  if (P.engine === "whisper") return WHISPER_OK ? "whisper" : null;
  if (SR && !browserBroken && !(IS_IOS && STANDALONE)) return "browser";
  return WHISPER_OK ? "whisper" : (SR ? "browser" : null);
}
function loadWhisper() {
  if (asrPromise) return asrPromise;
  WH.status = "loading"; WH.files = {}; WH.pct = 0; renderSoft();
  const progress = p => { if (p.status === "progress" && p.file) { WH.files[p.file] = [p.loaded || 0, p.total || 0];
    let l = 0, x = 0; for (const k in WH.files) { l += WH.files[k][0]; x += WH.files[k][1]; } WH.pct = x ? Math.round(l / x * 100) : 0;
    const el = $("#whbar"); if (el) el.style.width = WH.pct + "%"; const tx = $("#whpct"); if (tx) tx.textContent = WH.pct + "%"; } };
  asrPromise = (async () => {
    const T = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2");
    const make = device => T.pipeline("automatic-speech-recognition", "onnx-community/whisper-base", { device, dtype: device === "webgpu" ? { encoder_model:"fp32", decoder_model_merged:"q4" } : "q8", progress_callback:progress });
    let asr; try { asr = await make(navigator.gpu ? "webgpu" : "wasm"); } catch (e) { if (!navigator.gpu) throw e; asr = await make("wasm"); }
    WH.status = "ready"; renderSoft(); return asr;
  })().catch(e => { asrPromise = null; WH.status = "error"; renderSoft(); throw e; });
  return asrPromise;
}
async function toMono16k(blob) {
  const AC = window.AudioContext || window.webkitAudioContext, ac = new AC();
  const decoded = await ac.decodeAudioData(await blob.arrayBuffer()); if (ac.close) ac.close();
  const off = new OfflineAudioContext(1, Math.max(1, Math.ceil(decoded.duration * 16000)), 16000);
  const src = off.createBufferSource(); src.buffer = decoded; src.connect(off.destination); src.start();
  return (await off.startRendering()).getChannelData(0);
}
function listenBrowser(onPartial) {
  // iOS Safari is unreliable with continuous mode: use single-utterance there (it ends after a pause).
  const rec = new SR(); rec.lang = pack().speech; rec.continuous = !IS_IOS; rec.interimResults = true; rec.maxAlternatives = 1;
  let text = "", err = null, started = false, ended = false, resolve, reject;
  const done = new Promise((a, b) => { resolve = a; reject = b; });
  const finish = () => { if (ended) return; ended = true; clearTimeout(watch);
    if (err && !text && err !== "no-speech" && err !== "aborted") reject({ code:err }); else resolve(text.trim()); };
  rec.onstart = () => { started = true; };
  rec.onaudiostart = () => { started = true; };
  rec.onresult = ev => { let fin = "", tmp = ""; for (let i = 0; i < ev.results.length; i++) { const r = ev.results[i]; if (r.isFinal) fin += r[0].transcript + " "; else tmp += r[0].transcript; }
    text = (fin + tmp).trim(); onPartial(text); };
  rec.onerror = ev => { err = ev.error || "unknown"; };
  rec.onend = finish;
  // Some embedded browsers never start and never fire an error. Treat that as blocked.
  const watch = setTimeout(() => { if (!started && !ended) { err = "no-start"; try { rec.abort(); } catch (e) {} finish(); } }, 4000);
  rec.start();
  return { stop:() => { try { rec.stop(); } catch (e) { finish(); } }, done };
}
async function listenWhisper(onPartial) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
  const mr = new MediaRecorder(stream), chunks = [], lang = pack().whisper; loadWhisper().catch(() => {});
  mr.ondataavailable = e => { if (e.data && e.data.size) chunks.push(e.data); };
  const done = new Promise((resolve, reject) => { mr.onstop = async () => { stream.getTracks().forEach(x => x.stop());
    try { onPartial("..."); const audio = await toMono16k(new Blob(chunks, { type:mr.mimeType || "audio/webm" }));
      const asr = await loadWhisper(); const out = await asr(audio, { language:lang, task:"transcribe", chunk_length_s:30 }); resolve(String(out.text || "").trim()); }
    catch (e) { reject({ code:"whisper" }); } }; });
  mr.start(); onPartial(t("listening")); return { stop:() => { if (mr.state !== "inactive") mr.stop(); }, done };
}
function micBtn(ctx, label) {
  if (!sttMode()) return "";
  const on = S.mic && S.mic.ctx === ctx;
  return `<button class="btn ghost small mic ${on ? "rec" : ""}" data-mic="${esc(ctx)}">${on ? t("stop") : (label || t("speakBtn"))}</button>${on ? `<span id="miclive" class="meta live">${esc(S.mic.partial || t("listening"))}</span>` : ""}`;
}
async function startMic(ctx) {
  const mode = sttMode(); if (!mode) { toast(t("micNA")); return; }
  if (window.speechSynthesis && (speechSynthesis.speaking || speechSynthesis.pending)) speechSynthesis.cancel();
  const onP = x => { if (S.mic) S.mic.partial = x; const el = $("#miclive"); if (el) el.textContent = x; };
  let h; try { h = mode === "browser" ? listenBrowser(onP) : await listenWhisper(onP); }
  catch (e) { if (e && e.name === "NotAllowedError") { if (IN_CLAUDE) micBlocked = true; toast(IN_CLAUDE ? t("micEmbedded") : t("micDenied")); renderSoft(); } else toast(t("micFail")); return; }
  S.mic = { ctx, h, partial:"" }; renderSoft();
  h.done.then(text => { S.mic = null; if (ctx === "test") { S.micTest = text ? t("micTestOk", text) : t("nothingHeard"); } else onSpeech(ctx, text); renderSoft(); }).catch(e => { S.mic = null;
    const code = e && e.code;
    if (IN_CLAUDE && ["not-allowed","service-not-allowed","audio-capture","no-start"].includes(code)) { micBlocked = true; toast(t("micEmbedded")); }
    else if (mode === "browser" && WHISPER_OK && ["network","service-not-allowed","language-not-supported","audio-capture","no-start"].includes(code)) { browserBroken = true; toast(t("switchedWhisper")); }
    else if (code === "service-not-allowed" && IS_IOS) toast(t("micIOSDictation"));
    else if (code === "not-allowed") toast(IS_IOS ? t("micIOSDenied") : t("micDenied"));
    else if (code === "no-start") { browserBroken = true; toast(t("micNoStart")); }
    else toast(t("micFail"));
    if (ctx === "test") S.micTest = t("micTestFail", code || "?");
    renderSoft(); });
}
function lev(a, b) { const m = a.length, n = b.length; if (!m) return n; if (!n) return m; let p = Array.from({ length:n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) { const c = [i]; for (let j = 1; j <= n; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); p = c; } return p[n]; }
const sim = (a, b) => { a = pack().split === "char" ? nospace(a) : norm(a); b = pack().split === "char" ? nospace(b) : norm(b); return 1 - lev(a, b) / Math.max(1, a.length, b.length); };
function compare(target, heard, alts = []) {
  const chars = pack().split === "char";
  const one = tg => { let diff;
    if (chars) { const hs = nospace(heard); diff = [...nospace(tg)].map(w => ({ w, ok:hs.includes(w) })); }
    else { const hw = norm(heard).split(" ").filter(Boolean); diff = String(tg).replace(/[.,!?;:"()]/g, " ").split(/\s+/).filter(Boolean).map(w => ({ w, ok:hw.some(h => sim(h, w) >= 0.75) })); }
    return { heard, diff, score:Math.round(Math.max(sim(tg, heard), diff.filter(d => d.ok).length / Math.max(1, diff.length)) * 100) }; };
  return [target, ...alts].filter(Boolean).map(one).sort((a, b) => b.score - a.score)[0];
}
const diffHTML = r => r ? `<p class="meta">${esc(t("heard", r.heard || "…", r.score))} · ${r.score >= 75 ? pick(t("right")) : pick(t("wrong"))}</p><div class="diff" ${LA()}>${r.diff.map(d => `<span class="${d.ok ? "ok" : "miss"}">${esc(d.w)}</span>`).join("")}</div>` : "";
function onSpeech(ctx, text) {
  if (!text) { toast(t("nothingHeard")); return; }
  const c = S.cur, L = LV();
  if (ctx === "vocab" && c) { const v = vocabByKey(L, c.q[c.pos]); const art = pack().articles, bare = x => art ? x.replace(new RegExp(art.source, "i"), "") : x;
    const r = compare(bare(v.t), bare(text), [v.r]); c.said = r; if (r.score >= 75) { bump("speak", L); if (!c.graded) { srsGrade(v.key, true); bump("words"); c.graded = true; } } return; }
  if (ctx === "order" && c) { c.said = compare(orderText(D(L).order[c.i][1]), text); if (c.said.score >= 75) bump("speak", L); return; }
  if (ctx === "gram" && c) { c.said = compare(drillSentence(c.items[c.pos]), text); if (c.said.score >= 75) bump("speak", L); return; }
  if (ctx === "unitline" && c) { const [id, ui] = c.key.split(":"); const x = phrase(trackUnits(id)[+ui].p[c.i]); c.said = compare(x.t, text, [x.r]); if (c.said.score >= 75) bump("speak"); return; }
  if (ctx === "shadowline" && c) { c.said = compare(c.line, text); if (c.said.score >= 75) { bump("speak", L); c.ok = (c.ok || 0) + 1; } return; }
  if (ctx.startsWith("snd:")) { const [, i, j] = ctx.split(":"); const r = compare(pack().sounds[+i].ex[+j], text); S.sound[i + ":" + j] = r; if (r.score >= 75) { const cc = C(); cc.cnt.sound = (cc.cnt.sound || 0) + 1; bump("speak"); } return; }
  if (ctx.startsWith("ra:") && c) { const [, ti, pi] = ctx.split(":"); c.ra[ti + ":" + pi] = compare(c.texts[+ti].text.split(/\n\n+/)[+pi], text); bump("speak"); return; }
  if (ctx.startsWith("shadow") && c) { const x = ctx === "shadow-ex" ? c.example : ctx === "shadow-imp" ? c.feedback.improved_version : c.items[+ctx.slice(6)].script;
    c.shadow = c.shadow || {}; c.shadow[ctx] = compare(x, text); bump("speak"); return; }
  if ((ctx === "speak" || ctx === "dictate") && c) { c.text = (c.text ? c.text.trim() + " " : "") + text; if (ctx === "speak") bump("speak"); }
}
function toast(msg) { const x = $("#toast"); x.textContent = msg; x.hidden = false; clearTimeout(x._t); x._t = setTimeout(() => x.hidden = true, 3500); }
function reportURL(what, detail, id) {
  const q = new URLSearchParams({ template:"content-error.yml", title:`[${id || P.course + "/" + LV()}] ${what}`, item_id:id || "", course:P.course, level:LV(), item:detail || "" });
  return `${REPO}/issues/new?${q}`;
}
const itemId = (...p) => [cur().to, LV(), ...p].join("/");
function gapURL(section) { const q = new URLSearchParams({ template:"content-error.yml", title:`[${itemId("gap", section)}] Exam gap`, item_id:itemId("gap", section), course:P.course, level:LV(), item:`Mock ${section} felt below the real exam. What the course did not cover:` }); return `${REPO}/issues/new?${q}&labels=content,gap`; }
const reportLink = (what, detail, id) => `<a class="report" href="${reportURL(what, detail, id)}" target="_blank" rel="noopener">${t("report")}</a>`;

/* ---------- AI ---------- */
async function aiJSON(prompt) { if (!ai) throw { code:"unavailable" }; return ai.json(prompt); }
function errMsg(e) { const c = e && e.code;
  if (c === "google_off") return t("errs.google_off");
  if (c === "redirect_off") return t("errs.redirect_off");
  if (c === "not_granted" && IN_CLAUDE) return t("errs.not_granted_claude");
  return t("errs." + (["not_granted","not_configured","offline","rate_limited","unavailable"].includes(c) ? c : "other")); }

/* ---------- timer ---------- */
let timerInt = null;
function startTimer(min) { clearInterval(timerInt); const end = Date.now() + min * 60000;
  const tick = () => { const el = $("#timer"); if (!el) { clearInterval(timerInt); return; } const ms = end - Date.now(), neg = ms < 0, s = Math.abs(Math.round(ms / 1000));
    el.textContent = (neg ? "+" : "") + Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); el.classList.toggle("over", neg); };
  tick(); timerInt = setInterval(tick, 1000); }

/* ---------- badges (auto on completion) ---------- */
function computeEarned() {
  const saved = P.course, out = {};
  for (const id in COURSES) {
    if (!P.C[id]) continue;
    P.course = id; const p = pack();
    try {
      if (p.kind === "road") { const rp = roadProgress(); if (rp.ready) out["road:" + id] = { label:`Road-ready · ${p.road.country}`, emoji:"🚦" };
        const sec = p.sections[0]; if (sec && (P.C[id].exams && P.C[id].exams["road:theory"] || 0) >= sec.pass) out["roadtheory:" + id] = { label:`Theory passed · ${p.road.country}`, emoji:"🪪" }; }
      else if (p.kind === "visa") { if (visaProgress().ready) out["visa:" + id] = { label:`Visa basics · ${p.visa.country}`, emoji:"🛂" }; }
      else { for (const L of p.levels) if (stepDone(L, "mock")) out["lang:" + id + ":" + L] = { label:`${L} ${p.test} ready`, emoji:"🎓" };
        const certs = (P.C[id].certs) || {}; for (const k in certs) { const m = trackMeta(k); if (m) out["track:" + id + ":" + k] = { label:`${m.cert} · ${p.name}`, emoji:"🏅" }; } }
    } catch (e) {}
  }
  P.course = saved; return out;
}
function checkBadges() {
  const earned = computeEarned(); P.badges = P.badges || {}; const fresh = [];
  for (const bid in earned) if (!P.badges[bid]) { P.badges[bid] = { label:earned[bid].label, emoji:earned[bid].emoji, ts:Date.now() }; fresh.push(earned[bid]); }
  if (fresh.length) { save(); if (typeof toast === "function") toast(t("badgeEarned", fresh[0].label)); if (Auth.cloud && Auth.cloud() && Cloud.saveProfile) Cloud.saveProfile(Object.assign({}, Auth.current(), { badges:P.badges })).catch(() => {}); }
  return P.badges;
}

/* ---------- render ---------- */
function tabsFor() {
  if (isTravel()) return [["home", t("tabGuide")], ["places", t("tabPlaces")], ["docs", t("navTools")]];
  if (isVisa()) return [["home", t("tabOverview")]];
  if (isRoad()) return pack().road.hasWritten ? [["home", t("tabGuide")], ["exam", t("navMock")]] : [["home", t("tabGuide")]];
  return [["home", t("navSyllabus")], ["exam", t("navMock")]];
}
function tabActive(v) {
  if (v === "home") return ["home", "learn", "unit"].includes(S.view);
  if (v === "exam") return ["exam", "run"].includes(S.view);
  if (v === "docs") return ["docs", "visacheck"].includes(S.view);
  return S.view === v;
}
const ICON = {
  home:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></svg>',
  tools:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  chat:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12Z"/></svg>',
  user:'<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>'
};
function bnActive(v) {
  if (v === "dashboard") return S.view === "dashboard";
  if (v === "docs") return ["docs", "visacheck"].includes(S.view);
  if (v === "community") return S.view === "community";
  return ["profile", "signin"].includes(S.view);
}
function bottomNav() {
  const you = Auth.current() ? "profile" : "signin";
  const items = [["dashboard", ICON.home, t("navHome")], ["docs", ICON.tools, t("navTools")], ["community", ICON.chat, t("navCommunity")], [you, ICON.user, Auth.current() ? t("navYou") : t("signIn")]];
  return `<nav class="bottomnav">${items.map(([v, ic, l]) => `<button data-go="${v}" aria-current="${bnActive(v) ? "page" : "false"}">${ic}<span>${esc(l)}</span></button>`).join("")}</nav>`;
}
const COURSE_VIEWS = ["home", "learn", "unit", "exam", "run", "places"];
const TOOL_VIEWS = ["docs", "visacheck"];
function header() {
  const onCourse = COURSE_VIEWS.includes(S.view), onTool = TOOL_VIEWS.includes(S.view);
  const bar1 = `<div class="bar1"><a class="brand" href="./" data-go="dashboard">${LOGO}<span>${t("appName")}</span></a>
    <span class="hright"><nav class="topmenu"><button data-go="dashboard" aria-current="${S.view === "dashboard" ? "page" : "false"}">${t("navHome")}</button><button data-go="docs" aria-current="${["docs","visacheck"].includes(S.view) ? "page" : "false"}">${t("navTools")}</button><button data-go="community" aria-current="${S.view === "community" ? "page" : "false"}">${t("navCommunity")}</button><button data-go="about" aria-current="${S.view === "about" ? "page" : "false"}">${t("about")}</button></nav>
    ${Auth.current() ? `<button class="avatar" data-go="profile" aria-label="${t("profile")}">${esc(initials(Auth.current().name))}</button>` : `<button class="btn ghost small" data-go="signin">${t("signIn")}</button>`}</span></div>`;
  const filters = (onCourse || onTool) ? `<div class="filters"><label class="csel"><span class="sr">${t("countryLabel")}</span><select data-country>${COUNTRIES.map(c => `<option value="${c.code}" ${c.code === countryOf(P.course).code ? "selected" : ""}>${c.flag} ${esc(c.name)}</option>`).join("")}</select></label>
    <label class="csel"><span class="sr">${t("topicLabel")}</span><select data-topic>${topicsFor(countryOf(P.course)).map(k => `<option value="${k}" ${k === topicOf(P.course) ? "selected" : ""}>${esc(t("topic." + k))}</option>`).join("")}</select></label></div>` : "";
  const tabs = onCourse ? `<div class="bar2"><nav class="tabs">${tabsFor().map(([v, l]) => `<button data-go="${v}" aria-current="${tabActive(v) ? "page" : "false"}">${esc(l)}</button>`).join("")}</nav></div>` : "";
  return bar1 + filters + tabs + bottomNav();
}
function render(top) {
  try { document.body.dataset.topic = (COURSE_VIEWS.includes(S.view) || TOOL_VIEWS.includes(S.view)) ? topicOf(P.course) : ""; } catch (e) {}
  $("#top").innerHTML = S.view === "welcome" ? `<div class="bar1"><a class="brand" href="./" data-go="skipwelcome">${LOGO}<span>${t("appName")}</span></a></div>` : header();
  const m = $("#main");
  if (S.view === "home") m.innerHTML = viewHome();
  else if (S.view === "learn") m.innerHTML = viewLearn();
  else if (S.view === "exam") m.innerHTML = viewExam();
  else if (S.view === "run") m.innerHTML = viewRun();
  else if (S.view === "about") m.innerHTML = viewAbout();
  else if (S.view === "community") m.innerHTML = viewCommunity();
  else if (S.view === "pubprofile") m.innerHTML = viewPublicProfile();
  else if (S.view === "welcome") m.innerHTML = viewWelcome();
  else if (S.view === "dashboard") m.innerHTML = viewDashboard();
  else if (S.view === "places") m.innerHTML = viewPlaces();
  else if (S.view === "place") m.innerHTML = viewPlace();
  else if (S.view === "docs") m.innerHTML = viewDocs();
  else if (S.view === "visacheck") m.innerHTML = viewVisaCheck();
  else if (S.view === "unit") m.innerHTML = viewUnit();
  else if (S.view === "signin") m.innerHTML = viewSignIn();
  else if (S.view === "profile") m.innerHTML = Auth.current() ? viewProfile() : viewSignIn();
  $("#foot").innerHTML = `<p><strong>${t("footerOpen")}</strong></p><p>${t("footerGen")} <a href="${REPO}/issues/new?title=${encodeURIComponent("[" + P.course + " " + LV() + "] ")}&labels=content" target="_blank" rel="noopener">${t("footerReport")}</a>.</p><p>${t("footerNotAff")} · <a href="${langPrefix()}/about/" data-go="about">${t("about")}</a> · <a href="#" data-go="community">${t("navCommunity")}</a> · <a href="/sitemap/">${t("sitemap")}</a> · <a href="${REPO}" target="_blank" rel="noopener">GitHub</a></p>`;
  if ((isGuideCourse() || isTravel()) && S.view !== "about") { document.title = `${pack().name} · ${t("appName")}`; } else document.title = S.view === "about" ? `${t("about")} · ${t("appName")}` : `${t("appName")} · ${pack().name} ${LV()}`;
  if (top) window.scrollTo(0, 0);
  try { checkBadges(); } catch (e) {}
}
const renderSoft = () => { const y = window.scrollY; render(false); window.scrollTo(0, y); };
function stopAll() { if (S.mic) S.mic.h.stop(); S.mic = null; if (window.speechSynthesis) speechSynthesis.cancel(); clearInterval(timerInt); }
function go(view, act) { stopAll(); if (view === "docs") S.tool = null; S.view = view; S.act = act || null; S.cur = null; if (["learn","exam","unit","run"].includes(view)) { P.last = { course:P.course, view, act:act || null, reason:P.reason, ts:Date.now() }; save(); } render(true); }

function reasonBar() {
  const opts = TRACKS_META.map(m => [m.id, m.title]).concat([["exam", t("examPathShort", pack().test)]]);
  return `<p class="meta">${t("whyLearning")}</p><div class="chipbar" role="group" aria-label="${t("whyLearning")}">${opts.map(([id, x]) => `<button data-reason="${id}" aria-pressed="${P.reason === id}">${esc(x)}</button>`).join("")}</div>`;
}
function viewHome() {
  return resumeBanner() + homeBody();
}
function homeBody() {
  if (isTravel()) return viewTravelHome() + `<details class="panel quiet"><summary>${t("settings")}</summary>${settingsHTML()}</details>`;
  if (isVisa()) return viewVisaHome() + `<details class="panel quiet"><summary>${t("settings")}</summary>${settingsHTML()}</details>`;
  if (isRoad()) return viewRoadHome() + `<details class="panel quiet"><summary>${t("settings")}</summary>${settingsHTML()}</details>`;
  if (P.reason !== "exam" && TRACKS_META.some(m => m.id === P.reason)) return reasonBar() + viewTrackHome(P.reason) + todayAndSettings();
  return reasonBar() + viewExamHome();
}
function todayAndSettings() {
  const d = today();
  return `<section class="panel today"><h2>${t("todayTitle")}</h2><p class="meta">${t("todayHint")}</p>
    ${GOALS.map(([k, goal, step]) => `<button class="trow ${d[k] >= goal ? "done" : ""}" data-step="${step}"><span>${t("goals." + k)}</span><span class="meta">${d[k]} / ${goal}</span><span class="bar"><i style="width:${Math.min(d[k], goal) / goal * 100}%"></i></span></button>`).join("")}</section>
  <details class="panel quiet"><summary>${t("settings")}</summary>${settingsHTML()}</details>`;
}
/* ---------- reason tracks ---------- */
const trackMeta = id => TRACKS_META.find(m => m.id === id);
const trackUnits = id => TRACKS[cur().to][id];
const phrase = x => pack().split === "char" ? { t:x[0], r:x[1], rom:x[2], m:x[3] } : { t:x[0], m:x[1] };
const unitDone = (id, ui) => !!C().tracks[id + ":" + ui];
function viewTrackHome(id) {
  const m = trackMeta(id), units = trackUnits(id), done = units.filter((_, i) => unitDone(id, i)).length, next = units.findIndex((_, i) => !unitDone(id, i)), pc = Math.round(done / units.length * 100);
  return `<section class="grade"><div class="gtop"><div><p class="meta">${t("yourReason")} · ${esc(pack().name)}</p><h1>${esc(m.title)}</h1><p>${esc(m.sub)} · ${t("unitsDone", done, units.length)}</p></div>
      <div class="ring" style="--p:${pc}"><span>${pc}%</span></div></div>
    <div class="row">${next >= 0 ? `<button class="btn big" data-unit="${id}:${next}">${esc(t("continueStep", units[next].title))}</button>` : `<p class="next">${t("trackDone", m.cert)}</p>`}</div>
    <p class="meta">${t("trackNote")}</p></section>
  ${next < 0 ? certHTML(id) : ""}
  <section class="panel"><h2>${esc(m.title)}</h2><ol class="steps">${units.map((u, i) => `<li class="${unitDone(id, i) ? "done" : ""} ${i === next ? "now" : ""}"><button data-unit="${id}:${i}"><span class="st">${esc(u.title)}</span><span class="sw">${esc(u.tip)}</span><span class="ss">${unitDone(id, i) ? "✓ " + t("stepDone") : t("minutes", 15)}</span></button></li>`).join("")}</ol></section>`;
}
function certHTML(id) {
  const m = trackMeta(id), when = C().certs[id] ? new Date(C().certs[id]).toLocaleDateString() : "";
  return `<section class="panel cert"><p class="meta">${t("appName")} · ${t("certTitle")}</p>
    <h2>${esc(t("certLine", P.name, m.cert, pack().name))}</h2>
    <p>${esc(id === "trip" ? t("certTrip") : t("certReason"))}</p><p class="meta">${esc(when)}</p>
    <div class="row"><input id="cname" class="field" style="max-width:220px" aria-label="${t("yourName")}" placeholder="${t("yourName")}" value="${esc(P.name || "")}"><button class="btn ghost small" data-savename>${t("saveName")}</button><button class="btn small" data-share="${id}">${t("share")}</button></div></section>`;
}
function viewUnit() {
  const [id, uiS] = (S.act || "").split(":"), ui = +uiS, u = trackUnits(id)[ui], m = trackMeta(id);
  let c = S.cur && S.cur.kind === "unit" && S.cur.key === S.act ? S.cur : (S.cur = { kind:"unit", key:S.act, stage:"learn", i:0 });
  const head = `<p><button class="link" data-go="home">← ${esc(m.title)}</button></p><h1 class="pageh">${esc(u.title)}</h1><p class="meta">${esc(u.tip)}</p>`;
  if (c.stage === "learn") {
    const x = phrase(u.p[c.i]);
    return head + `<p class="meta">${t("phraseN", c.i + 1, u.p.length)}</p><div class="card flash"><div class="nl" ${LA()}>${esc(x.t)}</div>${x.r && x.r !== x.t ? `<div class="en" ${LA()}>${esc(x.r)}</div>` : ""}${x.rom ? `<div class="en">${esc(x.rom)}</div>` : ""}<div class="en big">${esc(x.m)}</div></div>
      <div class="row">${sayBtns(x.t)}${micBtn("unitline", t("sayIt"))}</div>${diffHTML(c.said)}
      <div class="row">${c.i > 0 ? `<button class="btn ghost" data-uprev>${t("prev")}</button>` : ""}<button class="btn" data-unext>${c.i < u.p.length - 1 ? t("next") : t("quizTime")}</button></div>
      <p class="meta">${reportLink("Phrase", x.t + " = " + x.m, itemId("track", id, ui, c.i))}</p>`;
  }
  if (c.stage === "quiz") {
    const q = c.quiz[c.qi];
    if (!q) { const pass = c.right >= Math.ceil(c.quiz.length * 0.8), units = trackUnits(id), nextUi = ui + 1 < units.length ? ui + 1 : -1, complete = units.every((_, i) => unitDone(id, i));
      return head + `<section class="panel result ${pass ? "pass" : "fail"}"><h2>${c.right} / ${c.quiz.length}</h2><p>${pass ? pick(t("right")) + " " + t("unitPassed") : t("unitRetry")}</p>
        <div class="row">${pass && nextUi >= 0 ? `<button class="btn" data-unit="${id}:${nextUi}">${esc(t("continueStep", units[nextUi].title))}</button>` : ""}${!pass ? `<button class="btn" data-unit="${id}:${ui}">${t("tryAgain")}</button>` : ""}<button class="btn ghost" data-go="home">${esc(m.title)}</button></div></section>${complete ? certHTML(id) : ""}`; }
    const answered = c.picked != null;
    return head + `<p class="meta">${t("quizN", c.qi + 1, c.quiz.length)}</p><section class="panel">
      ${q.type === "listen" ? `<h2 class="q">${t("qListen")}</h2><div class="row">${sayBtns(q.say)}</div>` : `<h2 class="q">${t("qSay", q.prompt)}</h2>`}
      <div class="opts">${q.options.map((o, i) => `<button class="opt ${answered ? (i === q.answer ? "right" : i === c.picked ? "wrong" : "") : ""}" ${q.type === "meaning" ? LA() : ""} data-upick="${i}" ${answered ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
      ${answered ? `<p class="fb ${c.picked === q.answer ? "ok" : "bad"}">${c.picked === q.answer ? pick(t("right")) : pick(t("wrong"))}</p><div class="row"><button class="btn" data-uqnext>${t("next")}</button></div>` : ""}</section>`;
  }
  return head;
}
function buildQuiz(id, ui) {
  const all = trackUnits(id).flatMap(u => u.p.map(phrase)), mine = trackUnits(id)[ui].p.map(phrase);
  return shuffle(mine).map((x, k) => {
    const others = shuffle(all.filter(y => y.t !== x.t)).slice(0, 3);
    if (k % 2 === 0) { const opts = shuffle([x, ...others]); return { type:"listen", say:x.t, options:opts.map(o => o.m), answer:opts.indexOf(x) }; }
    const opts = shuffle([x, ...others]); return { type:"meaning", prompt:x.m, options:opts.map(o => o.t), answer:opts.indexOf(x) };
  });
}
function resumeBanner() {
  const L = P.last; if (!L || L.course !== P.course) return "";
  const label = L.view === "exam" || L.view === "run" ? t("navMock") : L.act ? L.act : t("navSyllabus");
  return `<button class="resume" data-resume><span>↩︎ ${t("resume")}</span><b>${esc(String(label))}</b></button>`;
}
function viewExamHome() {
  const g = grade(), d = today(), p = pack();
  const reachedTxt = g.reached ? t("gradeReached", g.reached) : t("gradeNone");
  const cont = g.next ? `<button class="btn big" data-step="${g.next.id}">${esc(t("continueStep", g.next.title))}</button>` : (() => { const i = p.levels.indexOf(g.L); return i < p.levels.length - 1 ? `<button class="btn big" data-level="${p.levels[i + 1]}">${esc(t("levelDone", g.L))} ${p.levels[i + 1]}</button>` : `<p class="next">${t("allDone")}</p>`; })();
  return `<section class="grade"><div class="gtop"><div><p class="meta">${t("gradeTitle")} · ${esc(p.name)} · ${esc(p.test)}</p><h1>${esc(reachedTxt)}</h1>
      <p>${esc(t("gradeWorking", g.L, g.d, g.n))}${P.streak.n > 1 && P.streak.last === d.date ? " · " + t("streak", P.streak.n) : ""}</p></div>
      <div class="ring" style="--p:${Math.round(g.d / g.n * 100)}"><span>${Math.round(g.d / g.n * 100)}%</span></div></div>
    <div class="lvtrack">${p.levels.map(L => `<button class="lt ${stepDone(L, "mock") ? "ok" : ""} ${L === g.L ? "cur" : ""}" data-level="${L}">${L}</button>`).join("")}</div>
    <div class="row">${cont}</div><p class="meta">${esc(p.data[g.L].cert)}</p></section>
  <section class="panel"><h2>${esc(t("path", g.L))}</h2><ol class="steps">${g.st.map(s => `<li class="${s.done ? "done" : ""} ${g.next && g.next.id === s.id ? "now" : ""}"><button data-step="${s.id}"><span class="st">${esc(s.title)}</span><span class="sw">${esc(s.why)}</span><span class="ss">${s.done ? "✓ " + t("stepDone") : t("stepTodo")}</span></button></li>`).join("")}</ol></section>
  ${todayAndSettings()}`;
}
function settingsHTML() {
  const mode = sttMode(), p = pack();
  const aiLine = ai ? t("aiOn") : "";
  const whs = { ready:t("whReady"), loading:t("whLoading") + ` <span id="whpct">${WH.pct}%</span>`, error:t("whError"), idle:t("whIdle") }[WH.status];
  return `<label class="rate">${t("audioSpeed")} <input type="range" min="0.6" max="1.2" step="0.1" value="${P.rate}" data-rate> <span>${P.rate}x</span></label>
    ${(() => { const bv = bestVoice(p.speech); return bv ? `<p class="meta">${esc(t("voice", bv.name))}</p>` : `<p class="warn">${esc(t("noVoice", p.name))}</p>`; })()}
    <div class="row"><label class="meta" for="eng">${t("speechInput")}</label><select id="eng" class="field" style="max-width:260px" data-engine>
      <option value="auto" ${P.engine === "auto" ? "selected" : ""}>${t("engAuto")}</option>${SR ? `<option value="browser" ${P.engine === "browser" ? "selected" : ""}>${t("engBrowser")}</option>` : ""}${WHISPER_OK ? `<option value="whisper" ${P.engine === "whisper" ? "selected" : ""}>${t("engWhisper")}</option>` : ""}</select></div>
    <p class="meta">${mode ? t("speechNow", mode === "browser" ? "browser" : "Whisper") : (micBlocked && IN_CLAUDE ? t("micEmbedded") : t("speechNone"))}</p>
    ${mode ? `<div class="row">${micBtn("test", t("micTest"))}</div>` : ""}${S.micTest ? `<p class="meta">${esc(S.micTest)}</p>` : ""}
    ${WHISPER_OK ? `<p class="meta">${t("whisperLine", whs)}</p>${WH.status === "loading" ? `<div class="dl"><i id="whbar" style="width:${WH.pct}%"></i></div>` : WH.status !== "ready" ? `<div class="row"><button class="btn ghost small" data-whisper>${t("whDownload")}</button></div>` : ""}` : ""}
    <p class="meta">${aiLine}</p>
    <div class="row"><label class="meta" for="uilang">${t("interfaceLang")}</label><select id="uilang" class="field" style="max-width:200px" data-uilang>${(typeof UI_LANGS !== "undefined" ? UI_LANGS : [["en","English"]]).map(l => `<option value="${l[0]}" ${l[0] === UI_LANG ? "selected" : ""}>${l[1]}</option>`).join("")}</select></div>
    <div class="row">${!IN_CLAUDE && !STANDALONE ? `<button class="btn ghost small" data-installshow>${t("installApp")}</button>` : ""}<button class="btn ghost small" data-export>${t("exportP")}</button><button class="btn ghost small" data-import>${t("importP")}</button><input id="impfile" type="file" accept="application/json" hidden></div>`;
}

/* ---------- auth (static for now) ----------
   Swap LocalAuth for Supabase later:
     const { data } = await supabase.auth.signInWithOAuth({ provider: "google" });
     user = (await supabase.auth.getUser()).data.user; then load/save profile + progress rows (see supabase/schema.sql). */
const Auth = {
  cloud() { if (typeof IN_CLAUDE !== "undefined" && IN_CLAUDE) return false; return typeof Cloud !== "undefined" && Cloud.live && Cloud.mode === "supabase"; },
  current() { if (this.cloud()) return Cloud.user ? (P.user || { id:Cloud.user.id, name:"", from:"", bio:"", reasons:[], langs:[], places:[] }) : null; return P.user || null; },
  async signInWithGoogle() {
    if (this.cloud()) { try { await Cloud.signInGoogle(); return "redirect"; } catch (e) { toast(errMsg(e)); return null; } }
    if (!P.user) P.user = { id:"local-" + Math.random().toString(36).slice(2, 10), provider:"local-preview", name:P.name || "", from:"", bio:"", reasons:P.reason && P.reason !== "exam" ? [P.reason] : [], langs:[], places:[], is_public:true, badges:P.badges || {}, created:Date.now() };
    save(); return P.user;
  },
  async signOut() { if (this.cloud()) await Cloud.signOut(); P.user = null; save(); }
};
const initials = n => (String(n || "").trim().split(/\s+/).map(x => x[0]).join("").slice(0, 2) || "🙂").toUpperCase();
const REASONS = () => TRACKS_META.map(m => [m.id, m.title]).concat([["exam", t("reasonExam")], ["work", t("reasonWork")], ["family", t("reasonFamily")]]);
const LANG_OPTS = [["ja","Japanese","JLPT",["N5","N4","N3","N2","N1"]],["nl","Dutch","Staatsexamen NT2",["A1","A2","B1","B2","C1"]],["fr","French","DELF / DALF",["A1","A2","B1","B2","C1","C2"]],["zh","Mandarin","HSK",["1","2","3","4","5","6"]],["de","German","Goethe",["A1","A2","B1","B2","C1","C2"]],["other","Other","",[]]];
const GOOGLE_G = `<svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>`;
function viewSignIn() {
  const inPreview = IN_CLAUDE;
  const status = inPreview ? t("signInPreview") : (!CFG.SUPABASE_URL ? t("signInNoServer") : (Auth.cloud() ? t("signInConnected") : (AI_STATE ? "" : "")));
  const conn = inPreview ? `<p class="warn">${t("signInPreview")}</p>` : (CFG.SUPABASE_URL && !Auth.cloud() ? `<p class="warn">${t("signInConnecting")}${(typeof Cloud !== "undefined" && Cloud.lastError) ? " (" + esc(Cloud.lastError) + ")" : ""}</p>` : (Auth.cloud() ? `<p class="meta ok-text">✓ ${t("signInConnected")}</p>` : ""));
  const local = !Auth.cloud();
  return `<section class="panel signin"><div class="sihead">${LOGO}<h1>${t("signInTitle")}</h1></div><p class="lede">${t("signInBody")}</p>${conn}
    ${local ? `<button class="btn big" data-google>${t("continueLocal")}</button>` : `<button class="gbtn" data-google>${GOOGLE_G}<span>${t("continueGoogle")}</span></button>`}
    ${Auth.cloud() ? `<div class="ordiv"><span>${t("orEmail")}</span></div>
      <div class="row"><input id="signin-email" class="field" type="email" inputmode="email" autocomplete="email" placeholder="${t("emailPlaceholder")}" style="flex:1;min-width:0"><button class="btn" data-emailmagic>${t("sendLink")}</button></div>
      <p class="meta" id="magic-note">${t("emailNote")}</p>` : ""}
    <p class="meta">${Auth.cloud() ? t("signInNoteLive") : t("signInNote")}</p>
    <ul class="notes"><li>${t("siPoint1")}</li><li>${t("siPoint2")}</li><li>${t("siPoint3")}</li></ul></section>`;
}
function coursePct(id) {
  if (!P.C[id]) return 0; const saved = P.course; P.course = id; let pct = 0;
  try { const p = pack();
    if (p.kind === "road") pct = roadProgress().pct;
    else if (p.kind === "visa" || p.kind === "nomad") pct = visaProgress().pct;
    else if (p.kind === "travel") { const st = (P.C[id] && P.C[id].travel) || { read:{} }; const n = (p.travel.essentials || []).length || 1; pct = Math.round(Object.keys(st.read).filter(k => st.read[k]).length / n * 100); }
    else { const levels = p.levels; let done = 0; levels.forEach(L => { if (stepDone(L, "mock")) done++; }); pct = Math.round(done / levels.length * 100);
      if (!pct) { const L = LV(), st = stepsFor(L); pct = Math.round(st.filter(x => x.done).length / st.length * 100); } }
  } catch (e) {} P.course = saved; return pct || 0;
}
function courseStarted(id) { const c = P.C[id]; if (!c) return false; return !!(Object.keys(c.vocab || {}).length || Object.keys(c.exams || {}).length || Object.keys(c.done || {}).length || Object.keys(c.certs || {}).length || Object.keys(c.read || {}).length || (c.travel && Object.keys(c.travel.read || {}).length) || (c.visa && (Object.keys(c.visa.read || {}).length || Object.keys(c.visa.jread || {}).length || Object.keys(c.visa.right || {}).length)) || (c.nomad) || Object.keys(c.checklist || {}).length); }
function taskList() {
  const out = [];
  for (const id in COURSES) { if (!courseStarted(id)) continue; const c = countryOf(id), topic = topicOf(id);
    out.push({ kind:"course", id, flag:c.flag, country:c.name, topic:t("topic." + topic), tkey:topic, pct:coursePct(id) }); }
  // visa checklists (stored per travel course)
  ["jp","nl","fr"].forEach(code => { const cl = (P.C["travel-" + code] && P.C["travel-" + code].checklist) || null; if (!cl) return;
    const ticks = Object.keys(cl).filter(k => k.startsWith(code + ":") && cl[k]).length; if (!ticks) return;
    const total = (typeof SCHENGEN !== "undefined" && (code === "nl" || code === "fr")) ? SCHENGEN.visa.docs.length : ((typeof VISA_CHECK !== "undefined" && VISA_CHECK[code] && VISA_CHECK[code].visa) ? VISA_CHECK[code].visa.docs.length : 12);
    const cc = COUNTRIES.find(x => x.code === code) || {};
    out.push({ kind:"visacheck", code, flag:cc.flag, country:cc.name, topic:t("vcTitle"), tkey:"visa", pct:Math.round(ticks / total * 100) }); });
  return out;
}
function overallPct(tasks) { if (!tasks.length) return 0; return Math.round(tasks.reduce((a, b) => a + b.pct, 0) / tasks.length); }

/* ---------- dashboard (home) ---------- */
function viewDashboard() {
  const tasks = taskList(), pc = overallPct(tasks), badges = Object.keys(P.badges || {}).length;
  const q = (S.jQuery || "").toLowerCase();
  const countries = COUNTRIES.filter(c => !q || c.name.toLowerCase().includes(q));
  const selC = S.jCountry ? COUNTRIES.find(c => c.code === S.jCountry) : null;
  const name = (Auth.current() && Auth.current().name) || P.name || "";
  const signedIn = !!Auth.current();
  return `<section class="hero dash-hero"><p class="eyebrow">${t("appName")}</p><h1>${name ? t("hiName", esc(name)) : t("dashTitle")}</h1>
      <div class="dashstats"><div><b>${pc}%</b><span>${t("dashOverall")}</span></div><div><b>${tasks.length}</b><span>${t("dashJourneys")}</span></div><div><b>${badges}</b><span>${t("badgesTitle")}</span></div><div><b>${P.streak.n || 0}</b><span>${t("dashStreak")}</span></div></div></section>
    ${!signedIn ? `<section class="panel signinbanner"><div><strong>${t("signBannerTitle")}</strong><p class="meta">${t("signBannerBody")}</p></div><button class="btn" data-go="signin">${t("signIn")}</button></section>` : ""}
    <section class="panel"><h2>${t("dashYours")}</h2>
      ${tasks.length ? `<ul class="tasklist">${tasks.map(x => `<li class="tp-${esc(x.tkey || "language")}"><button data-task="${x.kind}:${x.kind === "course" ? x.id : x.code}"><span class="tf">${x.flag}</span><span class="tinfo"><strong>${esc(x.country)}</strong><span class="meta">${esc(x.topic)}</span></span><span class="tpct"><span class="bar"><i style="width:${x.pct}%"></i></span>${x.pct}%</span></button></li>`).join("")}</ul>` : `<p class="meta">${t("dashEmpty")}</p>`}</section>
    <section class="panel start"><h2>${t("dashStart")}</h2>
      <input class="field" data-journeysearch placeholder="${t("dashSearch")}" value="${esc(S.jQuery || "")}">
      <div class="pickgrid" style="margin-top:10px">${countries.map(c => `<button class="pick ${c.code === S.jCountry ? "sel" : ""}" data-jcountry="${c.code}"><span class="pf">${c.flag}</span><span>${esc(c.name)}</span></button>`).join("") || `<p class="meta">${t("dashNoMatch")}</p>`}</div>
      ${selC ? `<p class="meta" style="margin-top:10px">${t("dashWhy")}</p><div class="chipbar wrapchips">${topicsFor(selC).map(k => `<button data-jtopic="${k}" aria-pressed="${S.jTopic === k}">${esc(t("topic." + k))}</button>`).join("")}</div>
        <div class="row"><button class="btn big" data-jstart="${selC.code}:${S.jTopic || topicsFor(selC)[0]}">${t("dashGo")}</button></div>` : ""}</section>`;
}
function courseSummary(id) {
  const c = P.C[id]; if (!c) return null;
  if (PACKS[COURSES[id].to].kind === "road") { const saved = P.course; P.course = id; const rp = roadProgress(); P.course = saved; return { name:PACKS[COURSES[id].to].name, road:true, pct:rp.pct, certs:rp.ready ? [t("roadReady")] : [] }; }
  const saved = P.course; P.course = id; const g = grade(), certs = Object.keys(C().certs || {}).map(k => trackMeta(k) && trackMeta(k).cert).filter(Boolean); P.course = saved;
  return { name:PACKS[COURSES[id].to].name, reached:g.reached, working:g.L, done:g.d, n:g.n, certs };
}
function viewProfile() {
  const u = Auth.current(), ed = S.editProfile;
  if (ed) return profileEdit(u);
  const summaries = Object.keys(COURSES).map(courseSummary).filter(Boolean);
  const statusLabel = s => t("placeStatus." + s) || s;
  return `<section class="grade"><div class="gtop"><div class="pid"><span class="avatar big">${esc(initials(u.name))}</span><div><h1>${esc(u.name || t("noName"))}</h1>
      <p>${esc(u.from || "")}</p></div></div></div>${u.bio ? `<p>${esc(u.bio)}</p>` : ""}
      <p class="meta">${t("selfDeclared")}</p></section>
    <section class="panel"><h2>${t("myReasons")}</h2>${u.reasons.length ? `<div class="chipbar static">${u.reasons.map(r => `<span class="tag">${esc((REASONS().find(x => x[0] === r) || [0, r])[1])}</span>`).join("")}</div>` : `<p class="meta">${t("noneYet")}</p>`}</section>
    <section class="panel"><h2>${t("myLanguages")}</h2>${u.langs.length ? `<ul class="plist">${u.langs.map(l => `<li><strong>${esc(l.name)}</strong> ${l.level ? `<span class="tag">${esc(l.test ? l.test + " " : "")}${esc(l.level)}</span> <span class="sd">${t("selfDeclaredShort")}</span>` : ""}${l.goal ? ` · ${t("goal")}: ${esc(l.goal)}` : ""}${l.note ? `<br><span class="meta">${esc(l.note)}</span>` : ""}</li>`).join("")}</ul>` : `<p class="meta">${t("noneYet")}</p>`}</section>
    <section class="panel"><h2>${t("myMap")}</h2>${u.places.length ? `<ul class="stamps">${u.places.map(p => `<li class="stamp"><span class="when">${esc(statusLabel(p.status))}</span><h3>${esc(p.city ? p.city + ", " + p.country : p.country)}</h3><p>${p.reason ? esc(p.reason) + ". " : ""}${p.language ? esc(t("aboutPage").learning(p.language)) : ""}</p></li>`).join("")}</ul>` : `<p class="meta">${t("noneYet")}</p>`}</section>
    <section class="panel"><h2>${t("badgesTitle")}</h2>${Object.keys(P.badges || {}).length ? `<div class="badges">${Object.values(P.badges).sort((a, b) => b.ts - a.ts).map(x => `<span class="mbadge"><b>${x.emoji || "🏅"}</b> ${esc(x.label)}</span>`).join("")}</div>` : `<p class="meta">${t("noBadges")}</p>`}</section>
    <section class="panel"><h2>${t("myProgress")}</h2>${summaries.length ? `<ul class="plist">${summaries.map(x => `<li><strong>${esc(x.name)}</strong>: ${x.road ? esc(t("roadPct", x.pct)) : (x.reached ? esc(t("gradeReached", x.reached)) : esc(t("gradeNone"))) + " · " + esc(t("gradeWorking", x.working, x.done, x.n))}${x.certs.length ? `<br>${x.certs.map(c => `<span class="tag">✓ ${esc(c)}</span>`).join(" ")}` : ""}</li>`).join("")}</ul>` : `<p class="meta">${t("noneYet")}</p>`}
      <p class="meta">${t("streak", P.streak.n || 0)}</p><p class="meta">${t("progressNote")}</p></section>
    <div class="row"><button class="btn" data-editprofile>${t("editProfile")}</button><button class="btn ghost" data-shareprofile="${esc(u.id)}">${t("shareProfile")}</button><button class="btn ghost" data-export>${t("exportP")}</button><button class="btn ghost" data-signout>${t("signOut")}</button></div>
    <p class="meta">${u.is_public === false ? t("profilePrivate") : t("publicSoon")}</p>`;
}
function profileEdit(u) {
  const langRow = (l, i) => `<div class="prow" data-lrow="${i}"><select class="field" data-f="lang" aria-label="${t("language")}">${LANG_OPTS.map(o => `<option value="${o[0]}" ${l.code === o[0] ? "selected" : ""}>${o[1]}</option>`).join("")}</select>
      <input class="field" data-f="level" aria-label="${t("declaredLevel")}" placeholder="${t("declaredLevel")} (e.g. N2)" value="${esc(l.level || "")}"><input class="field" data-f="goal" aria-label="${t("goal")}" placeholder="${t("goal")}" value="${esc(l.goal || "")}">
      <input class="field" data-f="note" aria-label="${t("note")}" placeholder="${t("note")}" value="${esc(l.note || "")}"><button class="link" data-dellang="${i}">${t("remove")}</button></div>`;
  const placeRow = (p, i) => `<div class="prow" data-prow="${i}"><input class="field" data-f="country" aria-label="${t("country")}" placeholder="${t("country")}" value="${esc(p.country || "")}"><input class="field" data-f="city" aria-label="${t("city")}" placeholder="${t("city")}" value="${esc(p.city || "")}">
      <select class="field" data-f="status" aria-label="${t("status")}">${["living","visited","planned","origin"].map(x => `<option value="${x}" ${p.status === x ? "selected" : ""}>${t("placeStatus." + x)}</option>`).join("")}</select>
      <input class="field" data-f="reason" aria-label="${t("reasonThere")}" placeholder="${t("reasonThere")}" value="${esc(p.reason || "")}"><input class="field" data-f="language" aria-label="${t("language")}" placeholder="${t("language")}" value="${esc(p.language || "")}"><button class="link" data-delplace="${i}">${t("remove")}</button></div>`;
  return `<h1 class="pageh">${t("editProfile")}</h1><p class="meta">${t("selfDeclared")}</p>
    <section class="panel"><label class="lbl">${t("displayName")}<input id="pf-name" class="field" value="${esc(u.name)}"></label>
      <label class="lbl">${t("handle")}<span class="pfx">${(CFG.SITE || "").replace(/^https?:\/\//, "") || "forareason.app"}/u/</span><input id="pf-handle" class="field" autocapitalize="off" spellcheck="false" placeholder="${t("handlePh")}" value="${esc(u.handle || "")}"></label>
      <label class="lbl">${t("from")}<input id="pf-from" class="field" placeholder="${t("fromPh")}" value="${esc(u.from)}"></label>
      <label class="lbl">${t("bio")}<textarea id="pf-bio" class="field" rows="3" placeholder="${t("bioPh")}">${esc(u.bio)}</textarea></label></section>
    <section class="panel"><h2>${t("myReasons")}</h2><div class="chipbar">${REASONS().map(([id, x]) => `<button data-togreason="${id}" aria-pressed="${u.reasons.includes(id)}">${esc(x)}</button>`).join("")}</div></section>
    <section class="panel"><h2>${t("myLanguages")}</h2><p class="meta">${t("langHint")}</p>${u.langs.map(langRow).join("")}<button class="btn ghost small" data-addlang>${t("addLanguage")}</button></section>
    <section class="panel"><h2>${t("myMap")}</h2><p class="meta">${t("mapHint")}</p>${u.places.map(placeRow).join("")}<button class="btn ghost small" data-addplace>${t("addPlace")}</button></section>
    <label class="lbl check"><input type="checkbox" id="pf-public" ${u.is_public !== false ? "checked" : ""}> ${t("makePublic")}</label>
    <label class="lbl check"><input type="checkbox" id="pf-email" ${u.email_opt_in ? "checked" : ""}> ${t("emailOptIn")}</label>
    <label class="lbl check"><input type="checkbox" id="pf-honest" ${u.honest ? "checked" : ""}> ${t("honestPledge")}</label>
    <label class="lbl check"><input type="checkbox" id="pf-terms" ${u.terms_at ? "checked disabled" : ""}> ${t("acceptTerms")}</label>
    <div class="row"><button class="btn" data-saveprofile>${t("saveProfile")}</button><button class="btn ghost" data-canceledit>${t("cancel")}</button></div>`;
}
function readProfileForm(u) {
  u.name = ($("#pf-name").value || "").trim().slice(0, 60); u.from = ($("#pf-from").value || "").trim().slice(0, 80); u.bio = ($("#pf-bio").value || "").trim().slice(0, 400);
  u.honest = !!($("#pf-honest") && $("#pf-honest").checked); u.is_public = !($("#pf-public") && !$("#pf-public").checked);
  u.handle = (($("#pf-handle") || {}).value || "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 30);
  u.email_opt_in = !!($("#pf-email") && $("#pf-email").checked);
  if ($("#pf-terms") && $("#pf-terms").checked && !u.terms_at) { u.terms = true; u.terms_at = new Date().toISOString(); }
  u.locale = UI_LANG;
  u.langs = [...document.querySelectorAll("[data-lrow]")].map(r => { const g = f => r.querySelector(`[data-f="${f}"]`).value.trim(); const o = LANG_OPTS.find(x => x[0] === g("lang")) || LANG_OPTS[5];
    return { code:o[0], name:o[1], test:o[2], level:g("level").slice(0, 20), goal:g("goal").slice(0, 20), note:g("note").slice(0, 120) }; });
  u.places = [...document.querySelectorAll("[data-prow]")].map(r => { const g = f => r.querySelector(`[data-f="${f}"]`).value.trim();
    return { country:g("country").slice(0, 60), city:g("city").slice(0, 60), status:g("status"), reason:g("reason").slice(0, 80), language:g("language").slice(0, 40) }; }).filter(p => p.country);
  P.name = u.name;
}

/* ---------- readiness badge ---------- */
function readiness(L) {
  const p = pack();
  if (p.kind === "road" || p.kind === "visa") return null;
  const st = stepsFor(L), taught = st.filter(x => x.id !== "mock"), doneTaught = taught.filter(x => x.done).length;
  const mocks = p.sections.map(s => C().exams[L + ":" + s.k] || 0), avg = mocks.reduce((a, b) => a + b, 0) / mocks.length;
  const allPass = p.sections.every(s => (C().exams[L + ":" + s.k] || 0) >= READY);
  const coverage = doneTaught / taught.length;
  const weak = p.sections.filter(s => (C().exams[L + ":" + s.k] || 0) < READY);
  let level, label;
  if (allPass) { level = "ready"; label = t("readyFor", L); }
  else if (coverage >= 0.8 && avg >= READY - 15 && mocks.some(m => m > 0)) { level = "close"; label = t("almostReady", L, weak.map(s => s.en).join(", ")); }
  else if (mocks.some(m => m > 0)) { level = "building"; label = t("buildingUp", L); }
  else { level = "start"; label = t("notMeasured", L); }
  return { level, label, weak };
}
function readinessBadge(L) {
  const r = readiness(L); if (!r) return "";
  return `<div class="badgebar ${r.level}"><span class="badge">${r.level === "ready" ? "🏅" : r.level === "close" ? "📈" : "🎯"}</span><p>${esc(r.label)}</p></div>`;
}

/* ---------- visa ---------- */
function visaState() { const c = C(); const k = isNomad() ? "nomad" : "visa"; c[k] = c[k] || { read:{}, jread:{}, right:{}, done:false }; return c[k]; }
function visaProgress() {
  const v = pack().visa, st = visaState();
  const types = v.types.every((_, i) => st.read[i]), journey = v.journey.every((_, i) => st.jread[i]), quiz = v.quiz.filter((_, i) => st.right[i]).length / v.quiz.length >= 0.8;
  const nm = isNomad(); const steps = [["types", nm ? t("nomadTypes") : t("visaTypes"), t("visaTypesWhy"), types], ["journey", nm ? t("nomadJourney") : t("visaJourney"), nm ? t("nomadJourneyWhy") : t("visaJourneyWhy"), journey], ["check", t("visaCheck"), nm ? t("nomadCheckWhy") : t("visaCheckWhy"), quiz]];
  const done = steps.filter(x => x[3]).length;
  return { steps, done, pct:Math.round(done / steps.length * 100), ready:types && journey && quiz };
}
function viewVisaHome() {
  const p = pack(), v = p.visa, vp = visaProgress(), next = vp.steps.find(x => !x[3]);
  return `<section class="grade"><div class="gtop"><div><p class="meta">${(isNomad() ? t("groupNomad") : t("groupVisa"))} · ${esc(v.country)}</p><h1>${esc(p.name)}</h1><p>${esc(v.intro)}</p></div>
      <div class="ring" style="--p:${vp.pct}"><span>${vp.pct}%</span></div></div>
    <div class="row">${next ? `<button class="btn big" data-step="${next[0]}">${esc(t("continueStep", next[1]))}</button>` : `<p class="next">${t("visaAllDone")}</p>`}</div>
    <p class="warn">${t("visaDisclaimer")}</p></section>
  ${vp.ready ? `<section class="panel cert"><p class="meta">${t("appName")} · ${t("certTitle")}</p><h2>${esc(t("certLine", P.name, isNomad() ? t("nomadReady") : t("visaReady"), v.country))}</h2><p>${t("visaCertNote")}</p></section>` : ""}
  <section class="panel"><h2>${t("visaPathTitle")}</h2><ol class="steps">${vp.steps.map(x => `<li class="${x[3] ? "done" : ""} ${next && next[0] === x[0] ? "now" : ""}"><button data-step="${x[0]}"><span class="st">${esc(x[1])}</span><span class="sw">${esc(x[2])}</span><span class="ss">${x[3] ? "✓ " + t("stepDone") : t("stepTodo")}</span></button></li>`).join("")}</ol></section>
  ${isNomad() && v.cities ? `<section class="panel"><h2>🌆 ${t("nomadBases")}</h2><ul class="baselist">${v.cities.map(c => `<li><strong>${esc(c[0])}</strong> <span class="cost">${esc(c[2])}</span><br><span class="meta">${esc(c[1])} · <em>${t("roughCost")}</em></span></li>`).join("")}</ul></section>` : ""}
  ${isNomad() && v.jobs ? `<section class="panel"><h2>💼 ${t("nomadJobs")}</h2><p class="meta">${t("nomadJobsBody")}</p><ul class="joblist">${v.jobs.map(j => `<li><a href="${j[1]}" target="_blank" rel="noopener">${esc(j[0])}</a> — <span class="meta">${esc(j[2])}</span></li>`).join("")}</ul></section>` : ""}
  ${isNomad() ? nomadWorldHTML() : ""}
  ${isNomad() ? `<section class="panel joincta"><h2>🤝 ${t("nomadCrew")}</h2><p>${t("nomadCrewBody")}</p><div class="row"><button class="btn" data-go="community">${t("navCommunity")}</button></div></section>` : ""}
  <section class="panel quiet"><p class="meta">${t("visaOfficial")} ${v.authority.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join(" · ")}</p></section>`;
}
function viewVisaAct() {
  const v = pack().visa, st = visaState(), vp = visaProgress(), step = vp.steps.find(x => x[0] === S.act) || vp.steps[0];
  const head = `<p><button class="link" data-go="home">← ${esc(pack().name)}</button></p><h1 class="pageh">${esc(step[1])}</h1><p class="meta">${esc(step[2])}${step[3] ? " · ✓ " + t("stepDone") : ""}</p>`;
  if (S.act === "types") return head + v.types.map((x, i) => `<details class="sound" ${i === 0 || S.openSound === i ? "open" : ""} data-snd="${i}"><summary>${st.read[i] ? "✓ " : ""}${esc(x.title)}</summary><p>${esc(x.body)} ${reportLink("Visa type", x.title, itemId("visatype", i))}</p><div class="row"><button class="btn ${st.read[i] ? "ghost" : ""} small" data-visaread="${i}">${st.read[i] ? t("markUndone") : t("gotIt")}</button></div></details>`).join("") + `<p class="warn">${t("visaDisclaimer")}</p>`;
  if (S.act === "journey") { const focus = v.focus || []; const cur = P.visaFocus;
    return head + (focus.length ? `<p class="meta">${t("visaWhere")}</p><div class="chipbar">${focus.map(([id, lb]) => `<button data-visafocus="${id}" aria-pressed="${cur === id}">${esc(lb)}</button>`).join("")}</div>` : "") +
      `<ol class="steps">${v.journey.map((x, i) => `<li class="${st.jread[i] ? "done" : ""} ${x.stage === cur ? "now" : ""}"><button data-visajread="${i}"><span class="st">${esc(x.title)}</span><span class="sw">${esc(x.body)}</span><span class="ss">${st.jread[i] ? "✓" : ""}</span></button></li>`).join("")}</ol>
      <p class="meta">${v.authority.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join(" · ")}</p><p class="warn">${t("visaDisclaimer")}</p>`; }
  let c = S.cur && S.cur.kind === "visaq" ? S.cur : (S.cur = { kind:"visaq", order:shuffle(v.quiz.map((_, i) => i)), pos:0 });
  const idx = c.order[c.pos % c.order.length]; if (c.qi !== idx) { const q = v.quiz[idx]; c.q = { q:q[0], o:[t("answerTrue"), t("answerFalse")], answer:q[1] ? 0 : 1, why:q[2] }; c.qi = idx; c.picked = null; }
  const q = c.q, answered = c.picked != null, right = v.quiz.filter((_, i) => st.right[i]).length;
  return head + `<p class="meta">${t("roadRight", right, v.quiz.length)}</p><section class="panel"><h2 class="q">${esc(q.q)}</h2>
    <div class="opts">${q.o.map((o, i) => `<button class="opt ${answered ? (i === q.answer ? "right" : i === c.picked ? "wrong" : "") : ""}" data-vpick="${i}" ${answered ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
    ${answered ? `<p class="fb ${c.picked === q.answer ? "ok" : "bad"}">${c.picked === q.answer ? pick(t("right")) : pick(t("wrong"))} ${esc(q.why)}</p><div class="row"><button class="btn" data-vnextq>${t("next")}</button></div>` : ""}
    <p class="meta">${reportLink("Visa question", q.q, itemId("visaquiz", idx))}</p></section>`;
}

/* ---------- travel ---------- */
function travelState() { const c = C(); c.travel = c.travel || { read:{} }; return c.travel; }
function viewTravelHome() {
  const p = pack(), tv = p.travel, st = travelState(), langCourse = countryOf(P.course).language;
  const done = tv.essentials.filter((_, i) => st.read[i]).length, pc = Math.round(done / tv.essentials.length * 100);
  const next = tv.essentials.findIndex((_, i) => !st.read[i]);
  return `<section class="hero community-hero"><p class="eyebrow">${t("groupTravel")} · ${esc(tv.country)}</p><h1>${esc(p.name)}</h1><p class="lede">${esc(tv.intro)}</p>
    <div class="row"><button class="btn big" data-step="e0">${done ? t("continueStep", tv.essentials[next < 0 ? 0 : next].title) : t("startTravel")}</button></div></section>
  <section class="panel"><h2>🧳 ${t("travelEssentials")}</h2><div class="ring inline" style="--p:${pc}"><span>${pc}%</span></div>
    <ol class="steps">${tv.essentials.map((x, i) => `<li class="${st.read[i] ? "done" : ""}"><button data-step="e${i}"><span class="st">${esc(x.title)}</span><span class="ss">${st.read[i] ? "✓" : ""}</span></button></li>`).join("")}</ol></section>
  ${tv.transit ? `<section class="panel transit"><h2>🚇 ${t("gettingAround")}</h2>
    <h3>${t("trSetup")}</h3><ul class="notes">${tv.transit.setup.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <h3>${t("trTap")}</h3><ul class="notes">${tv.transit.tap.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <h3>${t("trPasses")}</h3><ul class="notes">${tv.transit.passes.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <h3>${t("trModes")}</h3><dl class="modes-dl">${tv.transit.modes.map(m => `<dt>${esc(m[0])}</dt><dd>${esc(m[1])}</dd>`).join("")}</dl>
    <h3>💡 ${t("trHacks")}</h3><ul class="notes hacks">${tv.transit.hacks.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <p class="meta">${reportLink("Transport", "Getting around", itemId("transit", 0))}</p></section>` : ""}
  <section class="panel"><h2>🗓️ ${t("whenBudget")}</h2>${tv.whenBudget.map(w => `<p><strong>${esc(w[0])}:</strong> ${esc(w[1])}</p>`).join("")}</section>
  <section class="panel"><h2>⭐ ${t("topExp")}</h2><ul class="sharelist">${tv.top.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>
  ${tv.food ? `<section class="panel"><h2>🍜 ${t("travFood")}</h2><ul class="sharelist">${tv.food.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
  ${tv.stay ? `<section class="panel"><h2>🛏️ ${t("travStay")}</h2><ul class="sharelist">${tv.stay.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
  ${tv.dayTrips ? `<section class="panel"><h2>🚆 ${t("travDay")}</h2><ul class="sharelist">${tv.dayTrips.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
  ${tv.apps ? `<section class="panel"><h2>📱 ${t("travApps")}</h2><ul class="sharelist">${tv.apps.map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>` : ""}
  <section class="panel feature"><div class="ficon">🛂</div><div><h2>${t("vcTitle")}</h2><p>${t("vcHomeBody")}</p><div class="row"><button class="btn" data-openvc>${t("vcOpen")}</button></div></div></section>
  <section class="panel feature"><div class="ficon">📄</div><div><h2>${t("docsTitle")}</h2><p>${t("docsHomeBody")}</p><div class="row"><button class="btn" data-opendocs>${t("openDocs")}</button></div></div></section>
  <section class="panel joincta"><h2>🗣️ ${t("travelPhrases")}</h2><p>${t("travelPhrasesBody")}</p><div class="row"><button class="btn" data-travelphrases="${esc(langCourse || "")}">${t("openPhrases")}</button><button class="btn ghost" data-go="community">${t("navCommunity")}</button></div></section>
  <section class="panel quiet"><p class="meta">${tv.authority.map(([l, u]) => u ? `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>` : esc(l)).join(" · ")}</p></section>`;
}
function viewTravelAct() {
  const tv = pack().travel, st = travelState(), i = +(S.act || "e0").slice(1), x = tv.essentials[i] || tv.essentials[0];
  return `<p><button class="link" data-go="home">← ${esc(pack().name)}</button></p><h1 class="pageh">${esc(x.title)}</h1>
    <section class="panel"><p>${esc(x.body)} ${reportLink("Travel tip", x.title, itemId("travel", i))}</p>
    <div class="row"><button class="btn ${st.read[i] ? "ghost" : ""}" data-travelread="${i}">${st.read[i] ? t("markUndone") : t("gotIt")}</button>
    ${i < tv.essentials.length - 1 ? `<button class="btn ghost" data-step="e${i + 1}">${t("next")}</button>` : `<button class="btn ghost" data-go="home">${t("back")}</button>`}</div></section>`;
}

/* ---------- places (travel) ---------- */
const CAT_L = { history:"History", art:"Art & museums", landmark:"Landmark", nature:"Nature & parks", food:"Food & markets", view:"Views", family:"Family" };
function placeCode() { return countryOf(P.course).travel ? countryOf(P.course).code : null; }
function viewPlaces() {
  const tv = curTravel();
  if (!tv) return `<section class="panel"><h1>${t("tabPlaces")}</h1><p class="meta">${t("placesNone")}</p></section>`;
  const code = countryOf(P.course).code;
  const cities = []; (tv.spots || []).forEach(s => { if (!cities.includes(s.city)) cities.push(s.city); });
  const CAT_EMOJI = { history:"🏛️", art:"🖼️", landmark:"📸", nature:"🌿", food:"🍜", view:"🔭", family:"🦌" };
  const card = (s, i) => `<button class="placecard" data-place="${code}:${i}"><span class="pcimg cat-${esc(s.cat || "landmark")}"><em>${CAT_EMOJI[s.cat] || "📍"}</em></span><span class="pcbody"><strong>${esc(s.name)}</strong>${s.cat ? `<span class="tag">${esc(CAT_L[s.cat] || s.cat)}</span>` : ""}${s.why ? `<span class="meta">${esc(s.why)}</span>` : ""}</span></button>`;
  const sections = cities.map(cty => { const items = (tv.spots || []).map((s, i) => [s, i]).filter(([s]) => s.city === cty);
    return `<section class="panel"><h2>${esc(cty)}</h2><div class="placegrid">${items.map(([s, i]) => card(s, i)).join("")}</div></section>`; }).join("");
  return `<section class="hero community-hero"><p class="eyebrow">${t("groupTravel")} · ${esc(tv.country)}</p><h1>${t("placesTitle")}</h1><p class="lede">${t("placesTapOpen")}</p></section>
    ${sections}
    <section class="panel quiet"><p class="meta">${t("placesTip")}</p><div class="row"><button class="btn ghost" data-go="docs">${t("navTools")}</button></div></section>`;
}
function viewPlace() {
  const [code, idx] = (S.place || "").split(":"); const tv = PACKS["travel-" + code] ? PACKS["travel-" + code].travel : null; const sp = tv && tv.spots[+idx];
  const back = `<p><button class="link" data-go="places">← ${t("tabPlaces")}</button></p>`;
  if (!sp) return back + `<section class="panel"><p class="meta">${t("placeGone")}</p></section>`;
  const base = (P.doc && P.doc.base) || tv.hub || tv.country;
  const key = code + ":" + idx;
  const g0 = (typeof GUIDES !== "undefined") ? GUIDES[sp.name] : null;
  const gx = (typeof GUIDE_EXTRA !== "undefined") ? GUIDE_EXTRA[sp.name] : null;
  const g = g0 ? Object.assign({}, g0, gx || {}) : null;
  const guideHTML = g ? `<section class="panel guide"><h2>📖 ${t("selfGuide")}</h2>
      ${g.about ? `<p class="lede">${esc(g.about)}</p>` : ""}
      <div class="gfacts">
        ${g.howLong ? `<div><b>⏱️ ${t("guideHowLong")}</b><span>${esc(g.howLong)}</span></div>` : ""}
        ${g.bestTime ? `<div><b>🗓️ ${t("guideWhen")}</b><span>${esc(g.bestTime)}</span></div>` : ""}
      </div>
      ${g.seeDo && g.seeDo.length ? `<h3>${t("guideSee")}</h3><ul class="notes">${g.seeDo.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      ${g.eat ? `<h3>🍽️ ${t("guideEat")}</h3><p>${esc(g.eat)}</p>` : ""}
      ${g.tip ? `<h3>💡 ${t("guideTip")}</h3><p>${esc(g.tip)}</p>` : ""}
      <p class="meta">${t("guideAI")} ${reportLink("Place guide", sp.name, "guide/" + key)}</p></section>` : "";
  return back + `<section class="hero community-hero"><p class="eyebrow">${esc(sp.city || tv.country)} · ${esc(CAT_L[sp.cat] || sp.cat || "")}</p><h1>${esc(sp.name)}</h1>${sp.why ? `<p class="lede">${esc(sp.why)}</p>` : ""}</section>
    <section class="panel"><p><strong>🚉 ${t("guideGetThere")}:</strong> ${esc(sp.station || "—")}</p>
      <div class="row"><a class="btn" href="${mapsDir(base, sp.name + ", " + (sp.city || tv.country))}" target="_blank" rel="noopener">🚆 ${t("directions")}</a></div>
      <p class="meta">${t("placeFrom", esc(base))}</p></section>
    ${guideHTML}
    <section class="panel quiet"><div class="row"><button class="btn ghost" data-go="docs">${t("placeToItin")}</button></div></section>`;
}

/* ---------- global nomad reference ---------- */
function nomadWorldHTML() {
  if (typeof NOMAD_WORLD === "undefined") return "";
  const W = NOMAD_WORLD, pk = P.passport in W.passports ? P.passport : "other", pp = W.passports[pk];
  const chips = Object.entries(W.passports).map(([k, v]) => `<button data-passport="${k}" aria-pressed="${k === pk}">${esc(v.label)}</button>`).join("");
  return `<section class="panel"><h2>🌍 ${t("nomadWorld")}</h2><p class="meta">${t("nomadWorldBody", W.updated)}</p>
    <p class="meta">${t("forYourPassport")}</p><div class="chipbar">${chips}</div>
    <ul class="notes">${pp.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>
    <div class="tablewrap"><table class="dnv"><thead><tr><th>${t("dnCountry")}</th><th>${t("dnVisa")}</th><th>${t("dnIncome")}</th><th>${t("dnStay")}</th></tr></thead>
      <tbody>${W.visas.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`).join("")}</tbody></table></div>
    <p class="meta">${t("nomadWorldNote")} ${W.sources.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join(" · ")}</p></section>`;
}

/* ---------- roads ---------- */
function roadState() { const c = C(); c.road = c.road || { read:{}, right:{}, path:false }; return c.road; }
function roadProgress() {
  const r = pack().road, st = roadState(), sec = pack().sections[0];
  const guide = r.guide.every((_, i) => st.read[i]), practice = r.quiz.filter((_, i) => st.right[i]).length / r.quiz.length >= 0.8, mock = (C().exams["road:theory"] || 0) >= (sec ? sec.pass : 100);
  const parts = [guide, practice].concat(r.hasWritten ? [mock] : []);
  const done = parts.filter(Boolean).length;
  return { done, pct:Math.round(done / parts.length * 100), ready:guide && practice };
}
const ROAD_REASONS = () => { const w = pack().road.hasWritten; return [
  ["rules", t("rrRules"), t("rrRulesSub")],
  ["travel", t("rrTravel"), t("rrTravelSub")],
  ["licence", t("rrLicence"), w ? t("rrLicenceSub") : t("rrLicenceNoExam")],
  ["convert", t("rrConvert"), t("rrConvertSub")]
]; };
function roadReasonBar() {
  return `<p class="meta">${t("rrWhy")}</p><div class="chipbar">${ROAD_REASONS().map(([id, ti]) => `<button data-roadreason="${id}" aria-pressed="${P.roadReason === id}">${esc(ti)}</button>`).join("")}</div>`;
}
function reasonPanel(steps, ready, cert) {
  const r = pack().road, next = steps.find(x => !x[3]);
  return `${ready ? `<section class="panel cert"><p class="meta">${t("appName")} · ${t("certTitle")}</p><h2>${esc(t("certLine", P.name, cert, r.country))}</h2><p>${t("certTrip")}</p></section>` : ""}
    <section class="panel"><ol class="steps">${steps.map(x => `<li class="${x[3] ? "done" : ""} ${next && next[0] === x[0] ? "now" : ""}"><button data-step="${x[0]}"><span class="st">${esc(x[1])}</span><span class="sw">${esc(x[2])}</span><span class="ss">${x[3] ? "✓ " + t("stepDone") : t("stepTodo")}</span></button></li>`).join("")}</ol></section>`;
}
function viewRoadHome() {
  const p = pack(), r = p.road, reason = P.roadReason, meta = ROAD_REASONS().find(x => x[0] === reason) || ROAD_REASONS()[0];
  const st = roadState(), sec = p.sections[0], mockScore = C().exams["road:theory"] || 0;
  const guideDone = r.guide.every((_, i) => st.read[i]), practiceDone = r.quiz.filter((_, i) => st.right[i]).length / r.quiz.length >= 0.8;
  let body = "";
  if (reason === "rules") {
    const steps = [["guide", t("roadGuide"), t("roadGuideWhy"), guideDone], ["practice", t("roadPractice"), t("roadPracticeWhy"), practiceDone]];
    if (r.hasWritten) steps.push(["mock", t("roadMock"), t("roadMockWhy", sec.pass), mockScore >= sec.pass]);
    body = reasonPanel(steps, guideDone && practiceDone, t("roadReady"));
  } else if (reason === "travel") {
    body = `<section class="panel"><h2>${t("rrTravel")}</h2><ul class="notes">${r.visit.map((x, i) => `<li>${esc(x)} ${reportLink("Driving visitor", x, itemId("visit", i))}</li>`).join("")}</ul>
      <div class="row"><button class="btn" data-step="practice">${t("roadPractice")}</button></div><p class="meta">${t("roadDisclaimer")}</p></section>`;
  } else {
    const j = r.journeys[reason] || [];
    body = `<section class="panel"><h2>${esc(meta[1])}</h2><ol class="steps">${j.map(x => `<li><div class="pathstep"><span class="st">${esc(x.title)}</span><span class="sw">${esc(x.body)}</span></div></li>`).join("")}</ol>
      ${r.hasWritten ? `<div class="badgebar ${mockScore >= sec.pass ? "ready" : "start"}"><span class="badge">${mockScore >= sec.pass ? "🏅" : "🎯"}</span><p>${mockScore >= sec.pass ? t("roadMockPassed", mockScore) : t("roadMockPrompt")}</p></div><div class="row"><button class="btn" data-step="mock">${t("roadMock")}</button><button class="btn ghost" data-step="practice">${t("roadPractice")}</button></div>` : `<p class="meta">${t("roadNoExam")}</p>`}
      <p class="meta">${r.official.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join(" · ")}</p></section>`;
  }
  return `<section class="grade"><div class="gtop"><div><p class="meta">${t("groupRoad")} · ${esc(r.country)}</p><h1>${esc(p.name)}</h1><p>${esc(t("roadBadge", r.side))}</p></div></div></section>
    ${roadReasonBar()}${body}
    <section class="panel quiet"><p class="meta">${t("roadDisclaimer")} ${r.official.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join(" · ")}</p></section>`;
}
function viewRoadAct() {
  const r = pack().road, st = roadState();
  const META = { guide:[t("roadGuide"), t("roadGuideWhy")], practice:[t("roadPractice"), t("roadPracticeWhy")] };
  const step = META[S.act] || [pack().name, ""];
  const head = `<p><button class="link" data-go="home">← ${esc(pack().name)}</button></p><h1 class="pageh">${esc(step[0])}</h1><p class="meta">${esc(step[1])}</p>`;
  if (S.act === "guide") return head + r.guide.map((g, i) => `<details class="sound" ${i === 0 || S.openSound === i ? "open" : ""} data-snd="${i}"><summary>${st.read[i] ? "✓ " : ""}${esc(g.title)}</summary><ul class="notes">${g.points.map((x, j) => `<li>${esc(x)} ${reportLink("Road guide", x, itemId("guide", i, j))}</li>`).join("")}</ul>
      <div class="row"><button class="btn ${st.read[i] ? "ghost" : ""} small" data-roadread="${i}">${st.read[i] ? t("markUndone") : t("gotIt")}</button></div></details>`).join("") + `<p class="meta">${t("roadDisclaimer")}</p>`;
  if (S.act === "path") return head + `<ol class="steps">${r.path.map(x => `<li><div class="pathstep"><span class="st">${esc(x.title)}</span><span class="sw">${esc(x.body)}</span></div></li>`).join("")}</ol>
      <p class="meta">${r.official.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join(" · ")}</p><div class="row"><button class="btn" data-roadpath>${st.path ? t("markUndone") : t("gotIt")}</button><button class="btn ghost" data-go="exam">${t("roadMock")}</button></div>`;
  let c = S.cur && S.cur.kind === "roadq" ? S.cur : (S.cur = { kind:"roadq", order:shuffle(r.quiz.map((_, i) => i)), pos:0 });
  const idx = c.order[c.pos % c.order.length], q = prepQ(roadQ(r, r.quiz[idx])); c.q = c.q && c.qi === idx ? c.q : q; c.qi = idx; const qq = c.q, answered = c.picked != null;
  const right = r.quiz.filter((_, i) => st.right[i]).length;
  return head + `<p class="meta">${t("roadRight", right, r.quiz.length)}</p><section class="panel"><h2 class="q">${esc(qq.q)}</h2>
    <div class="opts">${qq.options.map((o, i) => `<button class="opt ${answered ? (i === qq.answer ? "right" : i === c.picked ? "wrong" : "") : ""}" data-rpick="${i}" ${answered ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
    ${answered ? `<p class="fb ${c.picked === qq.answer ? "ok" : "bad"}">${c.picked === qq.answer ? pick(t("right")) : pick(t("wrong"))} ${esc(qq.why || "")}</p><div class="row"><button class="btn" data-rnext>${t("next")}</button></div>` : ""}
    <p class="meta">${reportLink("Road question", qq.q + " / " + qq.options[qq.answer], itemId("quiz", idx))}</p></section>`;
}

/* ---------- public profile ---------- */
function publicProfileHTML(u, own) {
  const statusLabel = s => t("placeStatus." + s) || s;
  return `<section class="grade"><div class="gtop"><div class="pid"><span class="avatar big">${esc(initials(u.name))}</span><div><h1>${esc(u.name || t("noName"))}</h1><p>${esc(u.from || "")}</p></div></div></div>${u.bio ? `<p>${esc(u.bio)}</p>` : ""}<p class="meta">${t("selfDeclared")}</p></section>
    ${Object.keys(u.badges || {}).length ? `<section class="panel"><h2>${t("badgesTitle")}</h2><div class="badges">${Object.values(u.badges).sort((a, b) => (b.ts || 0) - (a.ts || 0)).map(x => `<span class="mbadge"><b>${x.emoji || "🏅"}</b> ${esc(x.label)}</span>`).join("")}</div></section>` : ""}
    ${(u.reasons || []).length ? `<section class="panel"><h2>${t("myReasons")}</h2><div class="chipbar static">${u.reasons.map(r => `<span class="tag">${esc((REASONS().find(x => x[0] === r) || [0, r])[1])}</span>`).join("")}</div></section>` : ""}
    ${(u.langs || []).length ? `<section class="panel"><h2>${t("myLanguages")}</h2><ul class="plist">${u.langs.map(l => `<li><strong>${esc(l.name)}</strong> ${l.level ? `<span class="tag">${esc(l.test ? l.test + " " : "")}${esc(l.level)}</span> <span class="sd">${t("selfDeclaredShort")}</span>` : ""}${l.note ? `<br><span class="meta">${esc(l.note)}</span>` : ""}</li>`).join("")}</ul></section>` : ""}
    ${(u.places || []).length ? `<section class="panel"><h2>${t("myMap")}</h2><ol class="tl">${u.places.map(p => `<li><span class="tl-dot"></span><div><span class="when">${esc(statusLabel(p.status))}</span><strong>${esc(p.city ? p.city + ", " + p.country : p.country)}</strong><span class="meta">${p.reason ? esc(p.reason) + ". " : ""}${p.language ? esc(t("aboutPage").learning ? t("aboutPage").learning(p.language) : "Language: " + p.language) : ""}</span></div></li>`).join("")}</ol></section>` : ""}
    <div class="row"><button class="btn ghost" data-shareprofile="${esc(u.id)}">${t("shareProfile")}</button>${own ? `<button class="btn" data-go="profile">${t("editProfile")}</button>` : `<button class="btn" data-go="home">${t("aboutPage") && "Start learning"}</button>`}</div>`;
}
function viewPublicProfile() {
  const u = S.pub;
  if (S.pub === undefined) { S.pub = null; loadPublicProfileInto(PUBLIC_UID, PUBLIC_HANDLE); return `<section class="panel"><p class="thinking">${t("loading")}</p></section>`; }
  if (!u) return `<section class="panel"><h1>${t("profileNotFound")}</h1><p>${t("profileNotFoundBody")}</p><div class="row"><button class="btn" data-go="home">${t("aboutPage") && "Start learning"}</button></div></section>`;
  const own = Auth.current() && Auth.current().id === u.id;
  return publicProfileHTML(u, own);
}
async function loadPublicProfileInto(id, handle) {
  try { if (typeof Cloud !== "undefined" && Cloud.live) { let uid = id; if (!uid && handle && Cloud.resolveHandle) uid = await Cloud.resolveHandle(handle); S.pub = uid ? await Cloud.loadPublicProfile(uid) : null; } else S.pub = null; }
  catch (e) { S.pub = null; }
  if (S.pub === undefined) S.pub = null; renderSoft();
}

/* ---------- community ---------- */
const CFG = (typeof window !== "undefined" && window.FR_CONFIG) || {};
function reportScamHref() {
  const contact = CFG.REPORT_CONTACT, msg = t("reportMsg");
  if (!contact) return REPO + "/issues/new?labels=safety&title=" + encodeURIComponent("[safety] Scam report");
  if (contact.startsWith("mailto:")) return contact + "?subject=" + encodeURIComponent("Scam report") + "&body=" + encodeURIComponent(msg);
  if (contact.startsWith("https://")) return contact + (contact.includes("?") ? "&" : "?") + "text=" + encodeURIComponent(msg);
  return contact;
}
function viewCommunity() {
  const wa = CFG.WHATSAPP_COMMUNITY, waw = CFG.WHATSAPP_WOMEN;
  const join = wa ? `<a class="btn big wa" href="${wa}" target="_blank" rel="noopener">${t("joinWhatsApp")}</a>` : `<span class="soon">${t("communitySoon")}</span>`;
  const women = waw ? `<a class="btn ghost" href="${waw}" target="_blank" rel="noopener">${t("joinWomen")}</a>` : "";
  return `<section class="hero community-hero"><p class="eyebrow">${t("appName")} · ${t("communityHeader")}</p><h1>${t("communityTitle")}</h1><p class="lede">${t("communityIntro")}</p>
    <div class="row">${join}${women}</div><p class="meta">${t("communityWhere")}</p></section>
  <section class="panel feature welcome"><div class="ficon">🌈</div><div><h2>${t("welcomeTitle")}</h2><p>${t("welcomeBody")}</p></div></section>
  <section class="panel"><h2>🤝 ${t("shareTitle")}</h2><ul class="sharelist">${t("shareItems").map(x => `<li>${esc(x)}</li>`).join("")}</ul></section>
  <section class="panel feature"><div class="ficon">🏠</div><div><h2>${t("housesTitle")}</h2><p>${t("housesBody")}</p></div></section>
  <section class="panel safe"><div class="ficon">🛟</div><div><h2>${t("safetyTitle")}</h2><ol class="safelist">${t("safetyRules").map(x => `<li>${esc(x)}</li>`).join("")}</ol></div></section>
  <section class="panel report"><h2>${t("reportScam")}</h2><p>${t("reportBody")}</p><div class="row"><a class="btn warn-btn" href="${reportScamHref()}" target="_blank" rel="noopener">${t("reportScam")}</a></div><p class="meta">${t("reportNote")}</p></section>
  <section class="panel feature"><div class="ficon">💛</div><div><h2>${t("womenTitle")}</h2><p>${t("womenBody")}</p></div></section>
  <section class="panel quiet"><p class="meta">${t("communityCode")} <a href="${langPrefix()}/about/" data-go="about">${t("about")}</a> · <a href="${REPO}/discussions" target="_blank" rel="noopener">GitHub</a></p></section>`;
}

/* ---------- welcome / onboarding ---------- */
const GOALS_ONB = () => [
  ["travel", "✈️", t("onbTravel"), t("onbTravelSub")],
  ["language", "🗣️", t("onbLang"), t("onbLangSub")],
  ["visa", "🛂", t("onbVisa"), t("onbVisaSub")],
  ["nomad", "💻", t("onbNomad"), t("onbNomadSub")],
  ["road", "🚗", t("onbRoad"), t("onbRoadSub")]
];
function viewWelcome() {
  const oc = S.onbCountry || COUNTRIES[0].code, og = S.onbGoal || "travel";
  const country = COUNTRIES.find(c => c.code === oc) || COUNTRIES[0];
  const goals = GOALS_ONB().filter(g => country[g[0]]);
  const goalOk = goals.some(g => g[0] === og) ? og : goals[0][0];
  return `<section class="hero welcome-hero"><p class="eyebrow">${t("appName")}</p><h1>${t("onbTitle")}</h1><p class="lede">${t("onbLede")}</p></section>
  <section class="panel"><h2>${t("onbWhere")}</h2><div class="pickgrid">${COUNTRIES.map(c => `<button class="pick ${c.code === oc ? "sel" : ""}" data-onbcountry="${c.code}"><span class="pf">${c.flag}</span><span>${esc(c.name)}</span></button>`).join("")}</div></section>
  <section class="panel"><h2>${t("onbWhy")}</h2><div class="pickgrid goals">${goals.map(g => `<button class="pick ${g[0] === goalOk ? "sel" : ""}" data-onbgoal="${g[0]}"><span class="pf">${g[1]}</span><span class="gt">${esc(g[2])}</span><span class="gs">${esc(g[3])}</span></button>`).join("")}</div></section>
  <div class="row onbcta"><button class="btn big" data-onbstart="${oc}:${goalOk}">${t("onbStart")}</button><button class="link" data-skipwelcome>${t("onbSkip")}</button></div>`;
}

/* ---------- visa checklist ---------- */
function vcData() {
  const code = countryOf(P.course).code, base = (typeof VISA_CHECK !== "undefined" && VISA_CHECK[code]) || null; if (!base) return null;
  if (base.schengen && typeof SCHENGEN !== "undefined") return Object.assign({}, base, { exempt:SCHENGEN.exempt, visa:SCHENGEN.visa });
  return base;
}
function needsVisa(vc) {
  // eu = free/exempt; us/gb = exempt (visa-free); in/other = required (unless we know otherwise)
  const p = P.passport;
  if (p === "eu") return false;
  if (p === "us" || p === "gb") return false;
  return true; // in, other
}
function viewVisaCheck() {
  const vc = vcData();
  if (!vc) return `<p><button class="link" data-go="home">← ${t("back")}</button></p><section class="panel"><h1>${t("vcTitle")}</h1><p class="meta">${t("vcPickCountry")}</p></section>`;
  const req = needsVisa(vc), pass = P.passport;
  const passChips = [["in","Indian"],["us","US"],["eu","EU / EEA"],["gb","UK"],["other","Other"]].map(([k, lb]) => `<button data-passport="${k}" aria-pressed="${k === pass}">${lb}</button>`).join("");
  let body;
  if (!req) {
    body = `<div class="badgebar ready"><span class="badge">✅</span><p>${t("vcNoVisa", vc.country)}</p></div>
      <section class="panel"><p>${esc(vc.exempt.note)}</p><p class="meta">${t("vcExemptList")}: ${esc(vc.exempt.list)}.</p>
      <ul class="notes"><li>${t("vcPassportValid")}</li><li>${t("vcReturnTicket")}</li><li>${t("vcFunds")}</li></ul></section>`;
  } else {
    const v = vc.visa, cl = C().checklist || (C().checklist = {}), key = i => countryOf(P.course).code + ":" + i;
    const done = v.docs.filter((_, i) => cl[key(i)]).length, pc = Math.round(done / v.docs.length * 100);
    body = `<div class="badgebar ${done === v.docs.length ? "ready" : "start"}"><span class="badge">🛂</span><p>${t("vcYesVisa", vc.country)}</p></div>
      <section class="panel"><p><strong>${esc(v.type)}</strong></p><p class="meta">${t("vcWhere")}: ${esc(v.where)} · ${esc(v.timeline)}</p></section>
      <section class="panel"><h2>${t("vcJourney")}</h2><ol class="steps journey">${[t("vcStep1"), t("vcStep2"), t("vcStep3", esc(v.where)), t("vcStep4"), t("vcStep5", esc(v.timeline)), t("vcStep6")].map((x, i) => `<li><div class="pathstep"><span class="st">${x}</span></div></li>`).join("")}</ol></section>
      <section class="panel"><h2>${t("vcDocs")}</h2><div class="ring inline" style="--p:${pc}"><span>${pc}%</span></div>
        <ul class="checklist">${v.docs.map((doc, i) => `<li><label class="ckitem"><input type="checkbox" data-ck="${i}" ${cl[key(i)] ? "checked" : ""}> <span>${esc(doc)}</span></label></li>`).join("")}</ul>
        <p class="meta">${t("vcDocsHelp")}</p></section>
      <section class="panel joincta"><h2>${t("vcGenerate")}</h2><p>${t("vcGenerateBody")}</p><div class="row"><button class="btn" data-opendocs>${t("openDocs")}</button></div></section>`;
  }
  return `<p><button class="link" data-go="home">← ${t("back")}</button></p><h1 class="pageh">${t("vcTitle")} · ${esc(vc.country)}</h1>
    <p class="meta">${t("vcYourPassport")}</p><div class="chipbar">${passChips}</div>
    ${body}
    <section class="panel quiet"><p class="warn">${t("vcDisclaimer")}</p><p class="meta">${vc.official.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join(" · ")}</p></section>`;
}

/* ---------- documents ---------- */
function localIdLabel() { const c = countryOf(P.course).code; return c === "jp" ? t("idJp") : c === "nl" ? t("idNl") : c === "fr" ? t("idFr") : t("idOther"); }
function curTravel() { const c = countryOf(P.course); return (c && c.travel && PACKS[c.travel]) ? PACKS[c.travel].travel : null; }
function docField(k, label, ph, type) {
  return `<label class="lbl">${esc(label)}<input class="field" data-doc="${k}" type="${type || "text"}" placeholder="${esc(ph || "")}" value="${esc((P.doc && P.doc[k]) || "")}"></label>`;
}
function detailsPanel(tv, country) {
  return `<section class="panel"><h2>${t("docYou")}</h2>
    ${docField("name", t("dfName"), "Full name as in passport")}
    ${docField("nationality", t("dfNat"), "e.g. Indian")}
    ${docField("passport", t("dfPass"), "Passport number")}
    ${docField("home", t("dfHome"), "City, country you live in")}
    ${docField("base", t("dfBase"), country)}
    <div class="prow2">${docField("start", t("dfStart"), "", "date")}${docField("end", t("dfEnd"), "", "date")}</div>
    ${docField("purpose", t("dfPurpose"), "Tourism / visiting family / conference")}</section>`;
}
const TOOLS = () => [
  ["visa", "🛂", t("vcTitle"), t("toolVisaSub")],
  ["itinerary", "🗺️", t("docItinerary"), t("toolItinSub")],
  ["schengen", "🇪🇺", t("schTitle"), t("toolSchSub")],
  ["roadtrip", "🚐", t("rtTitle"), t("toolRtSub")],
  ["cost", "💶", t("costTitle"), t("toolCostSub")],
  ["cover", "✉️", t("docCover"), t("toolCoverSub")],
  ["sponsor", "🤝", t("docSponsor"), t("toolSponsorSub")],
  ["invite", "🏠", t("docInvite"), t("toolInviteSub")]
];
function toolsHub() {
  return `<h1 class="pageh">${t("toolsTitle")}</h1><p class="lede">${t("toolsIntro")}</p>
    <div class="toolgrid">${TOOLS().map(([id, ic, name, sub]) => `<button class="toolcard" data-tool="${id}"><span class="ti">${ic}</span><strong>${esc(name)}</strong><span class="ts">${esc(sub)}</span></button>`).join("")}</div>
    <p class="meta warn">${t("docsDisclaimer")}</p>`;
}
function viewDocs() {
  if (!S.tool) return toolsHub();
  const tv = curTravel(), country = tv ? tv.country : (countryOf(P.course) || {}).name || "", d = P.doc || {};
  const back = `<p><button class="link" data-toolsback>← ${t("navTools")}</button></p>`;
  const tool = S.tool;
  if (tool === "visa") { S.view = "visacheck"; return viewVisaCheck(); }
  if (tool === "itinerary") return back + `<h1 class="pageh">🗺️ ${t("docItinerary")}</h1><p class="meta">${t("docItinBody")}</p>
    ${detailsPanel(tv, country)}
    <section class="panel"><label class="lbl">${t("dfDays")}: <b id="daysval">${d.days || 7}</b> <input type="range" min="2" max="21" value="${d.days || 7}" data-doc="days" data-live="daysval"></label>
      <p class="meta">${t("itPace")}</p><div class="chipbar">${[["relaxed",t("paceRelaxed")],["balanced",t("paceBalanced")],["packed",t("pacePacked")]].map(([k,l])=>`<button data-pace="${k}" aria-pressed="${(d.pace||"balanced")===k}">${l}</button>`).join("")}</div>
      <p class="meta">${t("itInterests")}</p><div class="chipbar wrapchips">${[["history","History"],["art","Art & museums"],["landmark","Landmarks"],["nature","Nature & parks"],["food","Food & markets"],["view","Views"],["family","Family"]].map(([k,l])=>`<button data-interest="${k}" aria-pressed="${(d.interests||[]).includes(k)}">${l}</button>`).join("")}</div>
      ${tv && (countryOf(P.course).code==="nl"||countryOf(P.course).code==="fr") ? `<label class="lbl check"><input type="checkbox" data-doc-bool="combineSchengen" ${d.combineSchengen?"checked":""}> ${t("itCombine")}</label>` : ""}
      <div class="row"><button class="btn ghost" data-previewitin ${!tv ? "disabled" : ""}>${t("previewItin")}</button><button class="btn" data-makedoc="itinerary" ${!tv ? "disabled" : ""}>${t("downloadPdf")}</button></div>
      ${S.itinPreview && S.previewKind==="itin" && tv ? itinPreviewHTML(tv) : ""}</section>`;
  if (tool === "schengen") return back + `<h1 class="pageh">🇪🇺 ${t("schTitle")}</h1><p class="meta">${t("schBody")}</p>
    ${detailsPanel(tv, country)}
    <section class="panel"><div class="chipbar wrapchips">${[["nl","Netherlands"],["fr","France"]].map(([k,l])=>`<button data-sch="${k}" aria-pressed="${(d.schCountries||["nl","fr"]).includes(k)}">${l}</button>`).join("")}</div>
      <p class="meta">${t("schMore")}</p><label class="lbl">${t("dfDays")}: <b id="daysval">${d.days || 8}</b> <input type="range" min="3" max="21" value="${d.days || 8}" data-doc="days" data-live="daysval"></label>
      <div class="row"><button class="btn ghost" data-preview="sch">${t("previewItin")}</button><button class="btn" data-makedoc="schengen">${t("downloadPdf")}</button></div>
      ${S.previewKind==="sch" ? schengenPreviewHTML() : ""}</section>`;
  if (tool === "roadtrip") return back + `<h1 class="pageh">🚐 ${t("rtTitle")}</h1><p class="meta">${t("rtBody")}</p>
    ${detailsPanel(tv, country)}
    <section class="panel"><p class="meta">${t("rtCountry")}</p><div class="chipbar">${[["jp","🇯🇵 Japan"],["nl","🇳🇱 Netherlands"],["fr","🇫🇷 France"]].map(([k,l])=>`<button data-rtcountry="${k}" aria-pressed="${(d.roadCountry||"nl")===k}">${l}</button>`).join("")}</div>
      <label class="lbl">${t("dfDays")}: <b id="daysval">${d.days || 5}</b> <input type="range" min="2" max="14" value="${d.days || 5}" data-doc="days" data-live="daysval"></label>
      <div class="row"><button class="btn ghost" data-preview="rt">${t("previewItin")}</button><button class="btn" data-makedoc="roadtrip">${t("downloadPdf")}</button></div>
      ${S.previewKind==="rt" ? roadTripPreviewHTML() : ""}</section>`;
  if (tool === "cost") return back + `<h1 class="pageh">💶 ${t("costTitle")}</h1><p class="meta">${t("costBody")}</p><section class="panel">${costCalcHTML()}</section>`;
  if (tool === "cover") return back + `<h1 class="pageh">✉️ ${t("docCover")}</h1><p class="meta">${t("docCoverBody")}</p>${detailsPanel(tv, country)}<section class="panel"><div class="row"><button class="btn" data-makedoc="cover">${t("downloadPdf")}</button></div><p class="meta">${t("docsFieldsNote")}</p></section>`;
  if (tool === "sponsor") return back + `<h1 class="pageh">🤝 ${t("docSponsor")}</h1><p class="meta">${t("docSponsorBody")}</p>${detailsPanel(tv, country)}<section class="panel"><p class="meta">${t("sponsorWho")}</p>${docField("sponsor", t("dfSponsor"), "Sponsor's full name")}${docField("relation", t("dfRelation"), "e.g. parent, friend, employer")}${docField("sponsorPassport", t("dfSponsorPass"), "Sponsor's passport number")}${docField("sponsorId", localIdLabel(), t("dfLocalIdPh"))}<div class="row"><button class="btn" data-makedoc="sponsor">${t("downloadPdf")}</button></div></section>`;
  if (tool === "invite") return back + `<h1 class="pageh">🏠 ${t("docInvite")}</h1><p class="meta">${t("docInviteBody")}</p>${detailsPanel(tv, country)}<section class="panel">${docField("host", t("dfHost"), "Host's full name")}${docField("hostAddr", t("dfHostAddr"), "Host's address")}<div class="row"><button class="btn" data-makedoc="invite">${t("downloadPdf")}</button></div></section>`;
  return toolsHub();
}
function schTravels() { const codes = (P.doc.schCountries||["nl","fr"]).filter(c=>c==="nl"||c==="fr"); return codes.map(c=>PACKS["travel-"+c].travel); }
function schengenPreviewHTML() {
  const tvs = schTravels(); if (!tvs.length) return `<p class="meta">${t("schPick")}</p>`;
  const d=P.doc||{}, base=d.base||tvs[0].hub||tvs[0].country;
  const plan = planItinerary(tvs[0], { days: Math.max(3, Math.min(21, +d.days||8)), base, startDate:d.start, pace:d.pace, interests:d.interests, extraTv: tvs[1]||null });
  return itinRender(plan, base, plan.overcommit);
}
function roadTripPreviewHTML() {
  const code=P.doc.roadCountry||"nl"; const tv=PACKS["travel-"+code].travel;
  const d=P.doc||{}, base=d.base||tv.hub||tv.country;
  const plan = planRoadTrip(tv, { days: Math.max(2, Math.min(14, +d.days||5)), base, startDate:d.start });
  return `<div class="itin"><p class="meta">${t("rtFrom", esc(base), esc(tv.country))}</p>${plan.days.map(day=>`<div class="iday"><h3>${esc(day.title)}</h3><p class="drive">🚗 <a href="${day.leg.dir}" target="_blank" rel="noopener">${esc(day.leg.from)} → ${esc(day.leg.to)}</a> · ${t("driveDir")}</p><p class="meta">${esc(day.note)}</p>${day.stops.length?`<ul class="stops">${day.stops.map(st=>`<li><strong>${esc(st.name)}</strong>${st.label?` <span class="tag">${esc(st.label)}</span>`:""}${st.why?`<br><span class="meta">${esc(st.why)}</span>`:""}</li>`).join("")}</ul>`:""}</div>`).join("")}</div>`;
}
function itinRender(plan, base, over) {
  return `<div class="itin">${over?`<div class="badgebar start"><span class="badge">🌿</span><p>${t("itOver")}</p></div>`:""}<p class="meta">${t("itinFrom", esc(base))}</p>${plan.days.map(day => `<div class="iday"><h3>${esc(day.title)}</h3><p class="meta">${esc(day.note)}</p>${day.stops.length ? `<ul class="stops">${day.stops.map(s => `<li><strong>${esc(s.name)}</strong>${s.label ? ` <span class="tag">${esc(s.label)}</span>` : ""}${s.why ? `<br><span class="meta">${esc(s.why)}</span>` : ""}${s.station ? `<br><span class="meta">${t("near")}: ${esc(s.station)}</span>` : ""}${s.dir ? `<br><a class="dirlink" href="${s.dir}" target="_blank" rel="noopener">🚆 ${t("directions")}</a>` : ""}</li>`).join("")}</ul>` : ""}</div>`).join("")}</div>`;
}
function fmtMoney(sym, n) { return sym + Math.round(n).toLocaleString(); }
function costCalcHTML() {
  if (typeof COST === "undefined") return "";
  const d = P.doc || {}, code = COST[countryOf(P.course).code] ? countryOf(P.course).code : "nl", c = COST[code];
  const gross = +d.grossPay || 0;
  let res = "";
  if (gross > 0) { const r = netPay(code, gross, d.ruling); const mo = Math.round(r.net / 12);
    res = `<div class="payres"><div class="paynet"><b>${fmtMoney(c.sym, r.net)}</b><span>${t("payNetYear")}</span></div><div class="paynet"><b>${fmtMoney(c.sym, mo)}</b><span>${t("payNetMonth")}</span></div><div class="paynet"><b>${r.rate}%</b><span>${t("payEffRate")}</span></div></div>
      <ul class="paybreak">${r.rows.map(row => `<li><span>${esc(row[0])}</span><b>${row[1] < 0 ? "" : "-"}${fmtMoney(c.sym, Math.abs(row[1]))}</b></li>`).join("")}<li class="tot"><span>${t("payTakeHome")}</span><b>${fmtMoney(c.sym, r.net)}</b></li></ul>
      <p class="meta">${t("payRentCtx", fmtMoney(c.sym, c.rent.centre[0]), fmtMoney(c.sym, c.rent.centre[1]), fmtMoney(c.sym, mo))}</p>`;
  }
  return `<p class="meta">${t("costFor", esc(c.name.replace("the ", "")))}</p>
    ${code === "nl" ? `<label class="lbl check"><input type="checkbox" data-doc-bool="ruling" ${d.ruling ? "checked" : ""}> ${t("payRuling")}</label>` : ""}
    <label class="lbl">${t("payGross", c.cur)}<input class="field" data-doc="grossPay" inputmode="numeric" placeholder="${t("payGrossPh")}" value="${esc(d.grossPay || "")}"></label>
    ${res}
    <div class="costfacts"><div><b>${t("costRentC")}</b><span>${fmtMoney(c.sym, c.rent.centre[0])}-${fmtMoney(c.sym, c.rent.centre[1])} ${t("perMonth")}</span></div>
      <div><b>${t("costRentO")}</b><span>${fmtMoney(c.sym, c.rent.outside[0])}-${fmtMoney(c.sym, c.rent.outside[1])} ${t("perMonth")}</span></div>
      <div><b>${t("costEssentials")}</b><span>${fmtMoney(c.sym, c.essentials[0])}-${fmtMoney(c.sym, c.essentials[1])} ${t("perMonth")}</span></div>
      <div><b>${t("costTransit")}</b><span>${fmtMoney(c.sym, c.transport[0])}-${fmtMoney(c.sym, c.transport[1])} ${t("perMonth")}</span></div></div>
    <p><strong>${t("costWhat")}:</strong> ${esc(c.whatYouGet)}</p>
    <p class="meta">${esc(c.taxNote)}</p>
    <p class="warn">${t("costDisclaimer")}</p>
    <p class="meta">${c.sources.map(([l, u]) => `<a href="${u}" target="_blank" rel="noopener">${esc(l)}</a>`).join(" · ")}</p>`;
}
function itinOpts() {
  const d = P.doc || {}; const extra = (d.combineSchengen && (countryOf(P.course).code === "nl" || countryOf(P.course).code === "fr")) ? PACKS[countryOf(P.course).code === "nl" ? "travel-fr" : "travel-nl"].travel : null;
  return { pace: d.pace, interests: d.interests, extraTv: extra };
}
function itinPreviewHTML(tv) {
  const d = P.doc || {}, base = d.base || tv.hub || tv.country;
  const plan = planItinerary(tv, Object.assign({ days: Math.max(2, Math.min(21, +d.days || 7)), base, startDate: d.start }, itinOpts()));
  return itinRender(plan, base, plan.overcommit);
}
function docSpec(kind) {
  const d = P.doc || {}, tv = curTravel(), country = tv ? tv.country : (countryOf(P.course) || {}).name || "the country";
  const dates = (d.start || "____") + " to " + (d.end || "____");
  const fields = [{ label: t("dfName"), value: d.name }, { label: t("dfBase") + " (" + country + ")", value: d.base }, { label: t("dfStart") + " / " + t("dfEnd"), value: dates }];
  if (kind === "itinerary") {
    return { filename: "itinerary-" + (country.replace(/\W+/g, "-").toLowerCase()) + ".pdf", title: t("docItinerary") + " — " + country,
      subtitle: t("docItinSub", d.days || 7, country), fields, blocks: buildItinerary(tv, Math.max(2, Math.min(21, +d.days || 7)), d.base, d.name, d.start, itinOpts()) };
  }
  if (kind === "schengen") {
    const tvs = schTravels(); const t0 = tvs[0] || tv; const base = d.base || t0.hub || t0.country;
    const names = tvs.map(x=>x.country).join(" + ");
    return { filename:"schengen-itinerary.pdf", title:"Schengen itinerary — " + names, subtitle:t("schSub", names), fields, blocks: buildItinerary(t0, Math.max(3, Math.min(21, +d.days||8)), base, d.name, d.start, { pace:d.pace, interests:d.interests, extraTv: tvs[1]||null }) };
  }
  if (kind === "roadtrip") {
    const code=d.roadCountry||"nl"; const rtv=PACKS["travel-"+code].travel; const base=d.base||rtv.hub||rtv.country;
    return { filename:"road-trip-"+code+".pdf", title:"Road trip — " + rtv.country, subtitle:t("rtSub", rtv.country), fields, blocks: buildRoadTrip(rtv, base, Math.max(2, Math.min(14, +d.days||5)), d.start) };
  }
  if (kind === "cover") {
    const body = `${t("today2")}: ${new Date().toLocaleDateString()}

To the Visa Officer,

Subject: ${d.purpose || "Tourism"} visa application for ${country}

Dear Sir or Madam,

I, ${d.name || "____"}, a ${d.nationality || "____"} national holding passport number ${d.passport || "____"}, am applying for a visa to visit ${country} from ${dates}. During my stay I will be based in ${d.base || "____"}.

The purpose of my trip is ${(d.purpose || "tourism").toLowerCase()}. I have attached my day-by-day itinerary, proof of accommodation and sufficient funds, travel and health insurance, and confirmed return travel. I am employed/settled in ${d.home || "____"} and I fully intend to return there at the end of my visit.

Thank you for considering my application. I am happy to provide any further documents you may need.

Yours faithfully,
${d.name || "____"}`;
    return { filename: "cover-letter-" + country.replace(/\W+/g, "-").toLowerCase() + ".pdf", title: t("docCover"), subtitle: country, fields, blocks: [{ text: body }] };
  }
  if (kind === "sponsor") {
    const body = `${t("today2")}: ${new Date().toLocaleDateString()}

To the Visa Officer,

Subject: Letter of sponsorship for ${d.name || "____"}

Dear Sir or Madam,

I, ${d.sponsor || "____"}, holder of passport number ${d.sponsorPassport || "____"} and ${localIdLabel()} ${d.sponsorId || "____"}, hereby confirm that I am sponsoring ${d.name || "____"} (my ${d.relation || "____"}) for their trip to ${country} from ${dates}. I take full financial responsibility for their travel, accommodation and living expenses during the visit, and confirm they will return to ${d.home || "their home country"} afterwards.

I have attached proof of my funds and my relationship to the applicant. Please contact me if you require anything further.

Yours faithfully,
${d.sponsor || "____"}`;
    return { filename: "sponsorship-letter.pdf", title: t("docSponsor"), subtitle: country, fields: fields.concat([{ label: t("dfSponsor"), value: d.sponsor }, { label: t("dfSponsorPass"), value: d.sponsorPassport }, { label: localIdLabel(), value: d.sponsorId }]), blocks: [{ text: body }] };
  }
  // invite
  const body = `${t("today2")}: ${new Date().toLocaleDateString()}

To the Visa Officer,

Subject: Letter of invitation for ${d.name || "____"}

Dear Sir or Madam,

I, ${d.host || "____"}, residing at ${d.hostAddr || "____"}, would like to invite ${d.name || "____"} (${d.nationality || "____"} national, passport ${d.passport || "____"}) to visit me in ${country} from ${dates}. They will stay with me at the address above.

I confirm I will support their stay and that they will return to ${d.home || "their home country"} at the end of the visit. Please contact me for any further information.

Yours faithfully,
${d.host || "____"}`;
  return { filename: "invitation-letter.pdf", title: t("docInvite"), subtitle: country, fields: fields.concat([{ label: t("dfHost"), value: d.host }]), blocks: [{ text: body }] };
}
async function makeDoc(kind) {
  try { document.querySelectorAll("[data-makedoc]").forEach(b => b.disabled = true);
    toast(t("docBuilding")); await makePDF(docSpec(kind)); toast(t("docDone"));
  } catch (e) { toast(t("docFail")); }
  document.querySelectorAll("[data-makedoc]").forEach(b => b.disabled = false);
  if (!curTravel()) document.querySelectorAll("[data-makedoc=itinerary]").forEach(b => b.disabled = true);
}

/* ---------- about ---------- */
function viewAbout() {
  const a = Object.assign({}, STR.en.aboutPage, tget(UI_LANG, "aboutPage") || {}), cities = typeof CITIES !== "undefined" ? CITIES : [];
  const statusLabel = c => c.status;
  const paras = (a.paras || (a.intro ? [a.mission || ""] : [])).map(p => `<p>${esc(p)}</p>`);
  const withPull = a.pull ? paras.slice(0, 1).concat([`<blockquote class="pull">${esc(a.pull)}</blockquote>`]).concat(paras.slice(1)) : paras;
  return `<section class="hero about-hero"><p class="eyebrow">${esc(a.eyebrow || t("appName"))}</p><h1>${esc(a.title)}</h1><p class="lede">${esc(a.intro)}</p></section>
  ${a.facts ? `<div class="facts">${a.facts.map(f => `<div class="fact"><b>${esc(f[0])}</b><span>${esc(f[1])}</span></div>`).join("")}</div>` : ""}
  <section class="editorial">${withPull.join("")}</section>
  ${a.values ? `<section class="panel values"><h2>${esc(a.valuesTitle || "")}</h2><div class="valgrid">${a.values.map(v => `<span class="val">${esc(v)}</span>`).join("")}</div></section>` : ""}
  <section class="panel"><h2>${esc(a.whoTitle)}</h2><div class="who">${a.who.map(([h, x]) => `<div><strong>${esc(h)}</strong>${esc(x)}</div>`).join("")}</div></section>
  <section class="panel"><h2>${esc(a.mapTitle)}</h2><p class="meta">${esc(a.mapIntro)}</p>
    <ol class="tl">${cities.map(c => `<li><span class="tl-dot"></span><div><span class="when">${esc(statusLabel(c))}</span><strong>${esc(c.city ? c.city + ", " + c.country : c.country)}</strong><span class="meta">${esc(a.learning(c.language))} ${esc(c.note || "")}</span></div></li>`).join("")}</ol></section>
  <section class="panel joincta"><h2>${esc(a.joinTitle)}</h2>${a.communityLine ? `<p>${esc(a.communityLine)}</p>` : ""}<p>${esc(a.join)}</p>
    <div class="row"><button class="btn" data-go="community">${t("navCommunity")}</button><a class="btn ghost" href="${REPO}/discussions" target="_blank" rel="noopener">GitHub</a><button class="btn ghost" data-go="home">${t("aboutPage") && "Start learning"}</button></div></section>`;
}

/* ---------- learn activities ---------- */
function viewLearn() {
  if (isTravel()) return viewTravelAct();
  if (isVisa()) return viewVisaAct();
  if (isRoad()) return viewRoadAct();
  const L = LV(), st = stepsFor(L).find(x => x.id === S.act) || { id:S.act, title:"", why:"" };
  let body = "";
  if (S.act === "words") body = actWords(L);
  else if (S.act === "sounds") body = actSounds();
  else if (S.act === "kana") body = actKana();
  else if (S.act === "g0" || S.act === "g1") body = actGrammar(L, +S.act[1]);
  else if (S.act === "order") body = actOrder(L);
  else if (S.act === "listen") body = actListen(L);
  else if (S.act === "speak") body = actSpeak(L);
  const manual = C().done[L + ":" + S.act];
  return `<p><button class="link" data-go="home">← ${t("back")}</button></p><h1 class="pageh">${esc(st.title)}</h1><p class="meta">${esc(st.why)}${st.done ? " · ✓ " + t("stepDone") : ""}</p>${body}
    <p class="row"><button class="link" data-markdone>${manual ? t("markUndone") : t("markDone")}</button></p>`;
}
function actWords(L) {
  const p = pack();
  let c = S.cur && S.cur.kind === "vocab" ? S.cur : (S.cur = { kind:"vocab", q:dueQueue(L), pos:0, mode:"recognise" });
  const list = vocabList(L), known = list.filter(v => (C().vocab[v.key] || 0) >= 2).length;
  const modes = `<div class="modes">${["recognise","produce","say"].map(k => `<button data-vmode="${k}" aria-pressed="${c.mode === k}">${t("vmodes." + k)}</button>`).join("")}</div><p class="meta">${t("known", known, list.length)}</p>`;
  const more = ai ? `<div class="row"><button class="btn ghost" data-morewords ${S.busy.words ? "disabled" : ""}>${S.busy.words ? t("addingWords") : t("addWords")}</button></div>` : "";
  if (c.pos >= c.q.length) return modes + `<section class="panel"><p>${t("noneDue")}</p><div class="row"><button class="btn" data-vall>${t("practiseAll", list.length)}</button></div>${more}</section>`;
  const v = vocabByKey(L, c.q[c.pos]), box = C().vocab[v.key] || 0, shown = c.flipped || c.fb || c.said;
  const ex = v.ex ? `<p class="ex" ${LA()}>${esc(v.ex)}</p>${shown ? `<p class="meta">${esc(v.exM || "")}</p>` : ""}<div class="row">${sayBtns(v.ex)}</div>` : "";
  const romLine = v.rom && shown ? `<div class="en">${esc(v.rom)}</div>` : "";
  let card;
  if (c.mode === "recognise") card = `<div class="card flash" data-flip><div class="nl" ${LA()}>${esc(v.t)}</div>${c.flipped ? `${v.r && v.r !== v.t ? `<div class="en" ${LA()}>${esc(v.r)}</div>` : ""}${romLine}<div class="en">${esc(v.m)}</div>` : `<div class="hint">${t("tapReveal")}</div>`}</div>
      <div class="row">${sayBtns(v.r || v.t)}${micBtn("vocab", t("sayIt"))}</div>${diffHTML(c.said)}${ex}
      ${c.flipped ? `<div class="row"><button class="btn ghost" data-vgrade="0">${t("stillLearning")}</button><button class="btn" data-vgrade="1">${t("knowIt")}</button></div>` : ""}`;
  else if (c.mode === "produce") card = `<div class="card flash"><div class="en big">${esc(v.m)}</div>
      <input id="vin" class="field" autocomplete="off" autocapitalize="off" spellcheck="false" ${LA()} placeholder="${esc(p.wordHint)}" value="${esc(c.typed || "")}" ${c.fb ? "disabled" : ""}>
      ${c.fb ? `<div class="fb ${c.fb.ok ? "ok" : "bad"}">${esc(c.fb.msg)}</div>${romLine}` : ""}</div>
      <div class="row">${c.fb ? `${sayBtns(v.r || v.t)}<button class="btn" data-vnext>${t("next")}</button>` : `<button class="btn" data-vcheck>${t("check")}</button><button class="btn ghost" data-vskip>${t("showAnswer")}</button>`}</div>${c.fb ? ex : ""}`;
  else card = `<div class="card flash"><div class="en big">${esc(v.m)}</div>${c.said ? `<div class="nl" ${LA()}>${esc(showWord(v))}</div>${romLine}` : `<div class="hint">${esc(p.name)}?</div>`}</div>
      <div class="row">${sttMode() ? micBtn("vocab") : `<span class="meta">${t("micNA")}</span>`}${c.said || !sttMode() ? sayBtns(v.r || v.t) : ""}</div>${c.selfReveal ? "" : diffHTML(c.said)}
      <div class="row">${!c.said && !sttMode() ? `<button class="btn" data-vreveal>${t("reveal")}</button>` : ""}${c.said ? `<button class="btn" data-vnext>${t("next")}</button>` : `<button class="link" data-vnext>${t("skip")}</button>`}</div>${c.said ? ex : ""}`;
  return modes + card + `<p class="meta">${t("wordN", c.pos + 1, c.q.length, box)} · ${reportLink("Word", showWord(v) + " = " + v.m, itemId("vocab", v.key.split(":")[1]))}</p>` + more;
}
function actSounds() {
  const p = pack();
  return `<p class="lede">${t("soundsIntro")}</p>` + p.sounds.map((s, i) => `<details class="sound" ${S.openSound === i ? "open" : ""} data-snd="${i}"><summary>${esc(s.s)}</summary><p>${esc(s.tip)}</p>
    ${s.ex.map((w, j) => { const r = S.sound[i + ":" + j]; return `<div class="exrow"><span class="w" ${LA()}>${esc(w)}</span>${sayBtns(w)}${micBtn("snd:" + i + ":" + j, t("sayIt"))}${r ? `<span class="meta">${r.score >= 75 ? pick(t("right")) : pick(t("wrong"))} (${r.score}%)</span>` : ""}</div>`; }).join("")}</details>`).join("") + `<p class="meta">${t("roughCheck")}</p>`;
}
function actKana() {
  let c = S.cur && S.cur.kind === "kana" ? S.cur : (S.cur = { kind:"kana", set:"h", mode:"chart", n:0, r:0 });
  const conv = ch => c.set === "k" ? toKata(ch) : ch;
  const tabs = `<div class="modes">${[["h",t("hira")],["k",t("kata")]].map(([k, x]) => `<button data-kset="${k}" aria-pressed="${c.set === k}">${x}</button>`).join("")}</div>
    <div class="modes">${[["chart",t("kanaChart")],["quiz",t("kanaQuiz")]].map(([k, x]) => `<button data-kmode="${k}" aria-pressed="${c.mode === k}">${x}</button>`).join("")}</div>`;
  if (c.mode === "chart") return tabs + `<div class="kgrid">${KANA_H.map((ch, i) => `<button class="kcell" data-say="${conv(ch)}" lang="ja"><b>${conv(ch)}</b><small>${KANA_R[i]}</small></button>`).join("")}</div>`;
  if (c.idx == null) c.idx = rnd(0, KANA_H.length - 1);
  const ch = conv(KANA_H[c.idx]);
  return tabs + `<section class="panel"><div class="card flash"><div class="nl kbig" lang="ja">${ch}</div></div><p class="meta">${t("kanaQ")} · ${t("kanaScore", c.r, c.n)}</p>
    <input id="kin" class="field" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="ka" value="${esc(c.typed || "")}" ${c.fb ? "disabled" : ""}>
    ${c.fb ? `<p class="fb ${c.fb.ok ? "ok" : "bad"}">${c.fb.ok ? pick(t("right")) : pick(t("wrong"))} ${ch} = ${KANA_R[c.idx]}</p>` : ""}
    <div class="row">${sayBtns(ch, false)}${c.fb ? `<button class="btn" data-knext>${t("next")}</button>` : `<button class="btn" data-kcheck>${t("check")}</button>`}</div></section>`;
}
const drillSentence = q => /^Choose:/.test(q.q) ? q.options[q.answer] : q.q.replace("___", q.options[q.answer]).replace(/\s*\([^)]*\)/g, "").replace(/' /g, "'").trim();
function actGrammar(L, gi) {
  const g = D(L).grammar[gi];
  let c = S.cur && S.cur.kind === "drill" && S.cur.gi === gi ? S.cur : null;
  const notes = `<section class="panel"><ul class="notes">${g.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul></section>`;
  if (!c) { const done = g.drills.filter((_, i) => C().drills[L + ":" + gi + ":" + i]).length;
    return notes + `<div class="row"><button class="btn" data-drill="${gi}">${t("practise", done, g.drills.length)}</button></div>`; }
  const q = c.items[c.pos];
  if (!q) return notes + `<section class="panel"><h2>${esc(t("topicDone", g.title))}</h2><p class="score">${t("scoreOf", c.right, c.items.length)}</p><div class="row"><button class="btn" data-drill="${gi}">${t("tryAgain")}</button><button class="btn ghost" data-go="home">${t("back")}</button></div></section>`;
  const answered = c.picked != null, sent = answered ? drillSentence(q) : "";
  return notes + `<section class="panel"><p class="meta">${c.pos + 1} / ${c.items.length}</p><h2 class="q" ${LA()}>${esc(q.q)}</h2>
    <div class="opts">${q.options.map((o, i) => `<button class="opt ${answered ? (i === q.answer ? "right" : i === c.picked ? "wrong" : "") : ""}" ${LA()} data-dpick="${i}" ${answered ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>
    ${answered ? `<p class="fb ${c.picked === q.answer ? "ok" : "bad"}">${c.picked === q.answer ? pick(t("right")) : pick(t("wrong"))} ${esc(q.why || "")}</p>
      <p class="ex" ${LA()}>${esc(sent)}</p><div class="row">${sayBtns(sent)}${micBtn("gram", t("sayIt"))}</div>${diffHTML(c.said)}
      <div class="row"><button class="btn" data-dnext>${t("next")}</button></div>` : ""}<p class="meta">${reportLink("Grammar drill", q.q + " / " + q.options[q.answer], itemId("grammar", gi, q.idx))}</p></section>`;
}
const orderText = x => Array.isArray(x) ? x.join("") : x;
const orderChunks = x => Array.isArray(x) ? x.slice() : x.replace(/[.,!?]/g, "").trim().split(/\s+/).filter(Boolean);
function newOrder(L, i) { const orig = orderChunks(D(L).order[i][1]); let pool = shuffle(orig), n = 0; while (pool.join("|") === orig.join("|") && n++ < 10) pool = shuffle(orig);
  return { kind:"order", i, pool, picked:[], result:null }; }
function actOrder(L) {
  const list = D(L).order, joiner = pack().split === "char" ? "" : " ";
  let c = S.cur && S.cur.kind === "order" ? S.cur : null;
  if (!c) { const i = list.findIndex((_, k) => !C().order[L + ":" + k]); c = S.cur = newOrder(L, i < 0 ? 0 : i); }
  const [m, tg] = list[c.i], full = orderText(tg), solved = c.result === "ok" || c.result === "shown";
  return `<section class="panel"><p class="meta">${c.i + 1} / ${list.length}${pack().split === "char" ? " · " + t("jaOrderHint") : ""}</p><h2 class="q">${esc(m)}</h2>
    <div class="build ${c.result || ""}" ${LA()}>${c.picked.length ? c.picked.map((w, k) => `<button class="chip" data-unpick="${k}" ${solved ? "disabled" : ""}>${esc(w)}</button>`).join("") : `<span class="hint" lang="en">${t("buildHint")}</span>`}</div>
    <div class="pool" ${LA()}>${c.pool.map((w, k) => `<button class="chip" data-opick="${k}">${esc(w)}</button>`).join("")}</div>
    ${c.result === "ok" ? `<p class="fb ok">${pick(t("right"))} <span ${LA()}>${esc(full)}</span></p>` : c.result === "bad" ? `<p class="fb bad">${t("notYet")}</p>` : ""}
    ${solved ? `<p class="meta">${t("sayWhole")}</p><div class="row">${sayBtns(full)}${micBtn("order", t("sayIt"))}</div>${diffHTML(c.said)}<div class="row"><button class="btn" data-onext>${t("next")}</button></div>`
      : `<div class="row"><button class="btn" data-ocheck ${c.pool.length ? "disabled" : ""}>${t("check")}</button><button class="btn ghost" data-oreset>${t("reset")}</button><button class="link" data-oshow>${t("showAnswer")}</button></div>`}
    <p class="meta">${reportLink("Sentence", m + " = " + full, itemId("order", c.i))}</p></section>`;
}
function linePool(L) {
  const out = D(L).order.map(x => orderText(x[1]));
  D(L).grammar.forEach(g => g.drills.forEach(q => out.push(drillSentence({ q:q.q, options:q.o, answer:0 }))));
  (C().extra[L] || []).forEach(v => v.ex && out.push(v.ex));
  const minLen = s => pack().split === "char" ? nospace(s).length >= 6 : words(s) >= 3;
  return [...new Set(out.filter(minLen))];
}
function newListen(L, mode) {
  const p = pack();
  if (mode === "numbers") { const r = ({ A1:[0,100], A2:[0,1000], B1:[100,10000], B2:[1000,1000000], N5:[0,100], N4:[0,1000], N3:[100,10000], N2:[1000,100000], N1:[1000,1000000] })[L] || [0,100]; const n = rnd(r[0], r[1]); return { mode, say:String(n), answer:String(n), show:String(n) }; }
  if (mode === "times") { const h = rnd(1, 12), m = pick([0,5,10,15,20,25,30,35,40,45,50,55]); const say = p.time(h, m); return { mode, say, show:`${say} = ${h}:${String(m).padStart(2, "0")}`, h, m }; }
  const pool = linePool(L), s = pick(pool);
  return { mode, say:s, answer:s, show:s, options:shuffle([s, ...shuffle(pool.filter(x => x !== s)).slice(0, 2)]) };
}
function actListen(L) {
  const p = pack();
  let c = S.cur && S.cur.kind === "listen" ? S.cur : (S.cur = { kind:"listen", mode:"numbers", item:newListen(L, "numbers"), n:0, right:0 });
  const it = c.item, choose = c.mode === "sentences" && p.dictation === "choose";
  const hint = c.mode === "numbers" ? t("lNumbers") : c.mode === "times" ? t("lTimes") + " " + p.timeHint : choose ? t("lChoose") : t("lType");
  const input = choose ? `<div class="opts" style="margin-top:12px">${it.options.map((o, i) => `<button class="opt ${c.fb ? (o === it.answer ? "right" : i === c.pickedOpt ? "wrong" : "") : ""}" ${LA()} data-lpick="${i}" ${c.fb ? "disabled" : ""}>${esc(o)}</button>`).join("")}</div>`
    : `<input id="lin" class="field" style="margin-top:12px" autocomplete="off" autocapitalize="off" spellcheck="false" ${LA()} inputmode="${c.mode === "sentences" ? "text" : "decimal"}" placeholder="${c.mode === "times" ? "7:30" : c.mode === "numbers" ? "42" : "…"}" value="${esc(c.typed || "")}" ${c.fb ? "disabled" : ""}>`;
  return `<div class="modes">${["numbers","times","sentences"].map(k => `<button data-lmode="${k}" aria-pressed="${c.mode === k}">${t("lmodes." + k)}</button>`).join("")}</div><p class="meta">${esc(hint)}</p>
    <section class="panel"><div class="row"><button class="btn" data-lplay>${t("play")}</button><button class="btn ghost" data-lslow>${t("slow")}</button><span class="meta">${t("kanaScore", c.right, c.n)}</span></div>${input}
    ${c.fb ? `<p class="fb ${c.fb.ok ? "ok" : "bad"}">${c.fb.ok ? pick(t("right")) : pick(t("wrong"))} <span ${LA()}>${esc(it.show)}</span></p>${c.fb.diff ? `<div class="diff" ${LA()}>${c.fb.diff.map(d => `<span class="${d.ok ? "ok" : "miss"}">${esc(d.w)}</span>`).join("")}</div>` : ""}` : ""}
    <div class="row">${c.fb ? `<button class="btn" data-lnext>${t("next")}</button>` : choose ? "" : `<button class="btn" data-lcheck>${t("check")}</button><button class="link" data-lshow>${t("showAnswer")}</button>`}</div></section>`;
}
function actSpeak(L) {
  let c = S.cur && S.cur.kind === "speak" ? S.cur : (S.cur = { kind:"speak", line:pick(linePool(L)), ok:0 });
  return `<p class="meta">${t("speakIntro")}</p><section class="panel"><p class="prompt" ${LA()}>${esc(c.line)}</p>
    <div class="row">${sayBtns(c.line)}${sttMode() ? micBtn("shadowline", t("repeatIt")) : `<span class="meta">${t("micNA")}</span>`}</div>${diffHTML(c.said)}
    <div class="row"><button class="btn" data-snext>${t("next")}</button>${!sttMode() ? `<button class="btn ghost" data-sself>${t("stepDone")}</button>` : ""}</div></section>`;
}

/* ---------- mock ---------- */
function viewExam() {
  const L = LV(), p = pack(), d = D(L).exam;
  const lvlPick = p.levels.length > 1 ? `<p class="meta">${t("chooseLevel")}</p><div class="chipbar">${p.levels.map(x => `<button data-level="${x}" aria-pressed="${x === L}">${x}</button>`).join("")}</div>` : "";
  return `<h1 class="pageh">${esc(t("mockTitle", L))}</h1>${lvlPick}<p class="meta">${esc(D(L).cert)}</p>
    <div class="modes"><button data-emode="practice" aria-pressed="${P.mode === "practice"}">${t("practiceMode")}</button><button data-emode="exam" aria-pressed="${P.mode === "exam"}">${t("examMode")}</button></div>
    <p class="meta">${P.mode === "practice" ? t("practiceNote") : t("examNote", isRoad() ? passOf(p.sections[0]) : READY)}</p>
    ${readinessBadge(L)}
    <div class="sections">${p.sections.map(s => { const best = C().exams[L + ":" + s.k];
      return `<button class="sect" data-run="${s.k}"><span class="nm" ${LA()}>${esc(s.nl)}</span><span class="en">${esc(s.en)} · ${d.minutes[s.k]} min</span><span class="best ${best >= passOf(s) ? "pass" : best != null ? "fail" : ""}">${best != null ? t("bestExam", best) : t("notTaken")}</span></button>`; }).join("")}</div>
    ${!ai && p.sections.some(s => s.type === "write") ? `<p class="meta">${t("aiOff")}</p>` : ""}
    <p class="meta"><a href="${p.official.url}" target="_blank" rel="noopener">${esc(p.official.label)}</a></p>`;
}
function startRun(k, opts = {}) {
  const L = LV(), d = D(L).exam, practice = P.mode === "practice", sec = pack().sections.find(s => s.k === k);
  const c = { kind:"run", k, type:sec.type, practice, submitted:false, answers:{}, revealed:{}, ra:{}, show:{} };
  if (sec.type === "mc") { const gen = C().generated[L] || []; let blocks = opts.gen != null ? [gen[opts.gen]] : d[k];
    if (sec.sample) blocks = [{ title:blocks[0].title, qs:shuffle(blocks[0].qs).slice(0, sec.sample) }];
    c.texts = blocks.map(b => ({ title:b.title, text:b.text || "", qs:b.qs.map(prepQ) })); }
  if (sec.type === "listen") c.items = d.listening.map(it => ({ script:it.script, plays:0, qs:it.qs.map(prepQ) }));
  if (sec.type === "write" || sec.type === "speak") { c.task = opts.task || 0; c.text = ""; }
  stopAll(); S.view = "run"; S.cur = c; render(true); if (!practice) startTimer(d.minutes[k]);
}
function viewRun() {
  const c = S.cur, sec = pack().sections.find(s => s.k === c.k);
  const head = `<div class="runhead"><button class="link" data-go="exam">${t("leave")}</button><span>${LV()} · <span ${LA()}>${esc(sec.nl)}</span> · ${c.practice ? t("practiceMode") : t("examMode")}</span>${c.practice ? "<span></span>" : `<span id="timer" class="timer">--:--</span>`}</div>`;
  if (c.type === "mc" || c.type === "listen") return head + runMC(c);
  return head + (c.type === "write" ? runWriting(c) : runSpeaking(c));
}
function transBlock(key) {
  if (!ai) return ""; const x = S.trans[key];
  return x ? `<p class="trans">${esc(x)}</p>` : `<button class="btn ghost small" data-trans="${esc(key)}" ${S.busy[key] ? "disabled" : ""}>${S.busy[key] ? t("translating") : t("english")}</button>`;
}
function mcBlock(qs, prefix, c) {
  return qs.map((q, qi) => { const id = prefix + qi, a = c.answers[id], show = c.submitted || (c.practice && c.revealed[id]);
    return `<fieldset class="mcq"><legend ${LA()}>${esc(q.q)}</legend>${q.options.map((o, oi) => { const cls = show ? (oi === q.answer ? "right" : oi === a ? "wrong" : "") : (a === oi ? "chosen" : "");
      return `<button class="opt ${cls}" ${LA()} data-ans="${id}:${oi}" ${show ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}
      ${show && q.why ? `<p class="fb">${esc(q.why)}</p>` : ""}${show ? `<p class="meta">${reportLink("Mock question", q.q + " / " + q.options[q.answer], itemId("exam", c.k, id))}</p>` : ""}</fieldset>`; }).join("");
}
function runMC(c) {
  let body = "", total = 0;
  if (c.type === "mc") c.texts.forEach((x, ti) => { total += x.qs.length; const paras = x.text ? x.text.split(/\n\n+/) : [];
    body += `<article class="text"><h2 ${LA()}>${esc(x.title)}</h2>${paras.map((p, pi) => `<p ${LA()}>${esc(p).replace(/\n/g, "<br>")}</p>${c.practice ? `<div class="ptools">${sayBtns(p)}${micBtn("ra:" + ti + ":" + pi, t("readAloud"))}</div>${diffHTML(c.ra[ti + ":" + pi])}` : ""}`).join("")}
      ${c.practice && x.text ? `<div class="row">${transBlock("r" + ti)}</div>` : ""}</article>${mcBlock(x.qs, "t" + ti + "q", c)}`; });
  else c.items.forEach((it, ii) => { total += it.qs.length; const limit = !c.practice && !c.submitted && it.plays >= 2;
    body += `<section class="panel"><h2>${ii + 1}</h2><div class="row"><button class="btn" data-play="${ii}" ${limit ? "disabled" : ""}>${it.plays ? t("playAgain") : t("play")}</button>${c.practice ? `<button class="btn ghost" data-slow="${esc(it.script)}">${t("slow")}</button><button class="btn ghost" data-showscript="${ii}">${c.show[ii] ? t("hideText") : t("showText")}</button>` : `<span class="meta">${c.submitted ? "" : t("playsLeft", 2 - it.plays)}</span>`}</div>
      ${c.submitted || c.show[ii] ? `<p class="script" ${LA()}>${esc(it.script)}</p>${c.practice ? `<div class="row">${micBtn("shadow" + ii, t("repeatIt"))}${transBlock("l" + ii)}</div>${diffHTML((c.shadow || {})["shadow" + ii])}` : ""}` : ""}</section>${mcBlock(it.qs, "i" + ii + "q", c)}`; });
  const answered = Object.keys(c.answers).length;
  const foot = !c.submitted ? `<div class="sticky"><span>${t("answered", answered, total)}</span><button class="btn" data-submit>${t("submit")}</button></div>`
    : `<section class="panel result ${c.score >= passOf(pack().sections.find(s => s.k === c.k)) ? "pass" : "fail"}"><h2>${c.score}%</h2><p>${t("scoreOf", c.right, total)}. ${c.practice ? t("resPractice") : c.score >= passOf(pack().sections.find(s => s.k === c.k)) ? t("resReady") : t("gapBody")}</p>
      <div class="row"><button class="btn" data-run="${c.k}">${t("retake")}</button>${(!c.practice && c.score < passOf(pack().sections.find(s => s.k === c.k))) ? `<a class="btn ghost" href="${gapURL(c.k)}" target="_blank" rel="noopener">${t("gapReport")}</a>` : ""}<button class="btn ghost" data-go="exam">${t("allSections")}</button></div></section>`;
  let gen = "";
  if (c.k === "reading" && c.submitted) { const g = C().generated[LV()] || [];
    gen = `<section class="panel"><h2>${t("moreReading")}</h2><p>${ai ? t("moreReadingOn") : t("moreReadingOff")}</p>${g.length ? `<div class="row wrap">${g.map((x, i) => `<button class="btn ghost small" data-rgen="${i}" ${LA()}>${esc(x.title)}</button>`).join("")}</div>` : ""}
      ${ai ? `<div class="row"><button class="btn" data-newtext ${S.busy.text ? "disabled" : ""}>${S.busy.text ? t("writingText") : t("newText")}</button></div>` : ""}</section>`; }
  return body + foot + gen;
}
const taskOf = c => c.type === "write" ? D().exam.writing[c.task] : { prompt:D().exam.speaking[c.task] };
function exampleBlock(c) {
  if (!c.practice || !ai) return "";
  if (c.example) return `<section class="panel"><h2>${t("exampleAnswer")}</h2><p class="script" ${LA()}>${esc(c.example)}</p><div class="row">${sayBtns(c.example)}${micBtn("shadow-ex", t("repeatIt"))}</div>${diffHTML((c.shadow || {})["shadow-ex"])}</section>`;
  return `<div class="row"><button class="btn ghost" data-example ${S.busy.example ? "disabled" : ""}>${S.busy.example ? t("writingExample") : t("showExample")}</button></div>`;
}
const checks = () => `<ul class="notes">${(t("selfChecks." + cur().to) || []).map(x => `<li>${esc(x)}</li>`).join("")}</ul>`;
function runWriting(c) {
  const tasks = D().exam.writing, x = tasks[c.task], n = words(c.text);
  return `${tasks.length > 1 ? `<div class="modes">${tasks.map((_, i) => `<button data-wtask="${i}" aria-pressed="${i === c.task}">${i + 1}</button>`).join("")}</div>` : ""}
    <section class="panel"><p class="prompt" ${LA()}>${esc(x.prompt)}</p><div class="row">${sayBtns(x.prompt, false)}${c.practice ? transBlock("w" + c.task) : ""}</div><p class="meta">${t("writeN", x.words[0], x.words[1])}</p>
    <textarea id="wtext" class="field area" ${LA()} spellcheck="false" ${c.feedback ? "readonly" : ""}>${esc(c.text)}</textarea>
    <p class="meta" id="wc">${t("nWords", n)} ${n < x.words[0] ? t("tooShort") : n > x.words[1] ? t("tooLong") : ""}</p>
    ${c.feedback ? "" : `<div class="row">${ai ? `<button class="btn" data-grade>${t("submitMark")}</button>` : ""}${c.practice ? micBtn("dictate", t("dictate")) : ""}<button class="btn ghost" data-selfcheck>${t("selfCheck")}</button></div>`}
    ${c.showCheck ? checks() : ""}</section>${exampleBlock(c)}<div id="fbout">${c.feedback ? feedbackHTML(c) : ""}</div>`;
}
function runSpeaking(c) {
  const tasks = D().exam.speaking, x = tasks[c.task];
  return `<div class="modes">${tasks.map((_, i) => `<button data-stask="${i}" aria-pressed="${i === c.task}">${i + 1}</button>`).join("")}</div>
    <section class="panel"><p class="prompt" ${LA()}>${esc(x)}</p><div class="row">${sayBtns(x, false)}${c.practice ? transBlock("s" + c.task) : ""}</div>
    <p class="meta">${sttMode() ? t("speakTaskNote") : t("micNA")}</p>${!c.feedback ? `<div class="row">${micBtn("speak", t("record"))}</div>` : ""}
    <textarea id="stext" class="field area" ${LA()} spellcheck="false" ${c.feedback ? "readonly" : ""}>${esc(c.text)}</textarea>
    ${c.feedback ? "" : `<div class="row">${ai ? `<button class="btn" data-grade>${t("getFeedback")}</button>` : ""}<button class="btn ghost" data-selfcheck>${t("selfCheck")}</button></div>`}
    ${c.showCheck ? checks() : ""}</section>${exampleBlock(c)}<div id="fbout">${c.feedback ? feedbackHTML(c) : ""}</div>`;
}
function feedbackHTML(c) {
  const f = c.feedback;
  return `<section class="panel result ${f.score >= READY ? "pass" : "fail"}"><h2>${f.score}%</h2><p><strong>${esc(t("estLevel", f.estimated_level))}</strong> ${esc(f.summary)}</p>${c.practice ? `<p class="meta">${t("resPractice")}</p>` : ""}</section>
    ${f.corrections.length ? `<section class="panel"><h2>${t("corrections")}</h2><ul class="corr">${f.corrections.map(x => `<li><s ${LA()}>${esc(x.original)}</s><b ${LA()}>${esc(x.corrected)}</b><span>${esc(x.why)}</span></li>`).join("")}</ul></section>` : ""}
    ${f.improved_version ? `<section class="panel"><h2>${t("improved")}</h2><p class="script" ${LA()}>${esc(f.improved_version)}</p><div class="row">${sayBtns(f.improved_version)}${micBtn("shadow-imp", t("repeatIt"))}</div>${diffHTML((c.shadow || {})["shadow-imp"])}</section>` : ""}
    <div class="row"><button class="btn" data-run="${c.k}">${t("tryAnother")}</button><button class="btn ghost" data-go="exam">${t("allSections")}</button></div>`;
}
async function gradeAnswer() {
  const c = S.cur, L = LV(), p = pack(), task = taskOf(c), kind = c.type === "write" ? "writing" : "speaking";
  if (words(c.text) < 5) { toast(t("needAnswer")); return; }
  const out = $("#fbout"); out.innerHTML = `<section class="panel"><p class="thinking">${t("marking", kind)}</p></section>`;
  document.querySelectorAll("[data-grade]").forEach(b => b.disabled = true);
  const prompt = `You are an examiner for ${p.name} as a second language (${p.certOf(L)}).
Task given to the candidate (${kind}): ${task.prompt}
${task.words ? `Required length: ${task.words[0]}-${task.words[1]} words. Candidate wrote ${words(c.text)} words.` : ""}
${kind === "speaking" ? "The answer is a speech-to-text transcript: ignore punctuation and capitalisation, do not penalise likely recognition errors. Judge content, grammar, vocabulary and coherence." : ""}
Candidate answer:
"""${c.text}"""
Mark it strictly against ${L}: task completion, vocabulary range, grammar (especially word order and verb forms), coherence${kind === "writing" ? ", spelling" : ""}. ${READY} or above means this would very likely pass at ${L}. Write explanations in English.
Reply with only JSON: {"score": integer 0-100, "estimated_level": "level code", "summary": "two plain sentences in English", "corrections": [{"original": "exact phrase from the answer", "corrected": "corrected ${p.name}", "why": "short English reason"}] (at most 8), "improved_version": "the answer rewritten correctly at ${L} level, keeping the candidate's ideas"}`;
  try { const f = await aiJSON(prompt);
    c.feedback = { score:Math.max(0, Math.min(100, parseInt(f.score) || 0)), estimated_level:f.estimated_level || "?", summary:f.summary || "", corrections:Array.isArray(f.corrections) ? f.corrections.slice(0, 8) : [], improved_version:f.improved_version || "" };
    if (!c.practice) { const key = L + ":" + c.k; C().exams[key] = Math.max(C().exams[key] || 0, c.feedback.score); save(); }
    renderSoft();
  } catch (e) { out.innerHTML = `<section class="panel"><p class="fb bad">${errMsg(e)}</p></section>`; document.querySelectorAll("[data-grade]").forEach(b => b.disabled = false); }
}
async function example() {
  const c = S.cur, L = LV(), p = pack(), task = taskOf(c); S.busy.example = true; renderSoft();
  try { const r = await aiJSON(`Write a model answer in ${p.name} at exactly ${p.certOf(L)} level for this ${c.type === "write" ? "writing" : "speaking"} task: ${task.prompt} ${task.words ? `Length ${task.words[0]}-${task.words[1]} words.` : "About 45-90 seconds when spoken."} Use simple, correct language a learner at ${L} can copy. Reply with only JSON: {"answer": "..."}`); c.example = r.answer || ""; }
  catch (e) { toast(errMsg(e)); }
  S.busy.example = false; renderSoft();
}
async function translate(key, text) {
  S.busy[key] = true; renderSoft();
  try { const r = await aiJSON(`Translate this ${pack().name} text into plain, natural English. Reply with only JSON: {"translation": "..."}\n\n${text}`); S.trans[key] = r.translation || ""; } catch (e) { toast(errMsg(e)); }
  S.busy[key] = false; renderSoft();
}
async function newText() {
  const L = LV(), p = pack(); S.busy.text = true; renderSoft();
  try { const r = await aiJSON(p.textPrompt(L, pick(p.topics[L])) + `\nReply with only JSON: {"title": "title in ${p.name}", "text": "the text, paragraphs separated by a blank line", "questions": [{"q": "...", "options": ["...","...","..."], "answer": 0, "why": "short English explanation"}]}`);
    const qs = (r.questions || []).filter(q => Array.isArray(q.options) && q.options.length >= 2).map(q => { const a = q.answer | 0; return { q:q.q, o:[q.options[a], ...q.options.filter((_, i) => i !== a)], why:q.why }; });
    if (!r.text || !qs.length) throw {};
    C().generated[L] = [...(C().generated[L] || []), { title:r.title || "…", text:r.text, qs }].slice(-10); save();
    S.busy.text = false; startRun("reading", { gen:C().generated[L].length - 1 });
  } catch (e) { S.busy.text = false; toast(errMsg(e)); renderSoft(); }
}
async function moreWords() {
  const L = LV(), p = pack(); S.busy.words = true; renderSoft();
  try { const r = await aiJSON(p.wordsPrompt(L, pick(p.topics[L]), vocabList(L).map(v => v.t).join(", ")));
    const add = (r.words || []).filter(w => w && w.t && w.en).map(w => ({ t:String(w.t).trim(), r:w.r || "", rom:w.rom || "", m:String(w.en).trim(), ex:w.ex || "", exM:w.ex_en || "" }));
    if (!add.length) throw {};
    C().extra[L] = [...(C().extra[L] || []), ...add]; save(); S.cur = null; toast(t("wordsAdded", add.length));
  } catch (e) { toast(errMsg(e)); }
  S.busy.words = false; renderSoft();
}

/* ---------- events ---------- */
function openStep(id) { if (id === "mock") { go("exam"); return; } go("learn", id); }
document.addEventListener("click", e => {
  const b = e.target.closest("button, [data-flip], a[data-go]"); if (!b) return;
  const ds = b.dataset, c = S.cur, L = LV();
  if (b.tagName === "A") e.preventDefault();
  if (ds.resume != null) { const L = P.last; if (L) { if (L.view === "exam" || L.view === "run") go("exam"); else if (L.act) go(L.view, L.act); else go(L.view); } return; }
  if (ds.go) { go(ds.go); return; }
  if (ds.step) { openStep(ds.step); return; }
  if (ds.onbcountry != null) { S.onbCountry = ds.onbcountry; renderSoft(); return; }
  if (ds.onbgoal != null) { S.onbGoal = ds.onbgoal; renderSoft(); return; }
  if (ds.onbstart != null || ds.skipwelcome != null) {
    if (ds.onbstart != null) { const [cc, goal] = ds.onbstart.split(":"); P.course = resolveCourse(cc, goal); if (goal === "language") P.reason = "trip"; }
    P.onboarded = true; save(); go("dashboard"); return; }
  if (ds.reason) { P.reason = ds.reason; save(); render(true); return; }
  if (ds.visafocus != null) { P.visaFocus = ds.visafocus; save(); renderSoft(); return; }
  if (ds.visaread != null) { const st = visaState(); st.read[+ds.visaread] = !st.read[+ds.visaread]; save(); renderSoft(); return; }
  if (ds.visajread != null) { const st = visaState(); st.jread[+ds.visajread] = !st.jread[+ds.visajread]; save(); renderSoft(); return; }
  if (ds.vpick != null) { c.picked = +ds.vpick; if (c.picked === c.q.answer) { visaState().right[c.qi] = true; save(); } renderSoft(); return; }
  if (ds.vnextq != null) { c.pos++; c.qi = -1; renderSoft(); return; }
  if (ds.task != null) { const [kind, key] = ds.task.split(":"); if (kind === "course") { P.course = key; save(); go("home"); } else { P.course = "travel-" + key; save(); go("visacheck"); } return; }
  if (ds.jcountry != null) { S.jCountry = ds.jcountry; S.jTopic = null; renderSoft(); return; }
  if (ds.jtopic != null) { S.jTopic = ds.jtopic; renderSoft(); return; }
  if (ds.jstart != null) { const [cc, topic] = ds.jstart.split(":"); P.course = resolveCourse(cc, topic); save(); pickVoice(); go("home"); history.replaceState(null, "", "?course=" + P.course); return; }
  if (ds.tool != null) { if (ds.tool === "visa") { S.view = "visacheck"; render(true); } else { S.tool = ds.tool; S.itinPreview = false; S.previewKind = ""; render(true); } return; }
  if (ds.toolsback != null) { S.tool = null; render(true); return; }
  if (ds.openvc != null) { S.view = "visacheck"; render(true); return; }
  if (ds.place != null) { S.place = ds.place; S.view = "place"; render(true); return; }
  if (ds.opendocs != null) { S.view = "docs"; S.itinPreview = false; render(true); return; }
  if (ds.previewitin != null) { S.itinPreview = true; S.previewKind = "itin"; renderSoft(); return; }
  if (ds.preview != null) { S.previewKind = ds.preview; renderSoft(); return; }
  if (ds.sch != null) { P.doc.schCountries = P.doc.schCountries || ["nl","fr"]; P.doc.schCountries = P.doc.schCountries.includes(ds.sch) ? P.doc.schCountries.filter(x=>x!==ds.sch) : [...P.doc.schCountries, ds.sch]; save(); renderSoft(); return; }
  if (ds.rtcountry != null) { P.doc.roadCountry = ds.rtcountry; save(); renderSoft(); return; }
  if (ds.paycountry != null) { P.doc.payCountry = ds.paycountry; save(); renderSoft(); return; }
  if (ds.pace != null) { P.doc = P.doc || {}; P.doc.pace = ds.pace; save(); renderSoft(); return; }
  if (ds.interest != null) { P.doc = P.doc || {}; P.doc.interests = P.doc.interests || []; const k = ds.interest; P.doc.interests = P.doc.interests.includes(k) ? P.doc.interests.filter(x => x !== k) : [...P.doc.interests, k]; save(); renderSoft(); return; }
  if (ds.makedoc != null) { makeDoc(ds.makedoc); return; }
  if (ds.travelread != null) { const st = travelState(); const i = +ds.travelread; st.read[i] = !st.read[i]; save(); renderSoft(); return; }
  if (ds.travelphrases != null) { if (ds.travelphrases) { P.course = ds.travelphrases; P.reason = "trip"; save(); go("home"); } return; }
  if (ds.passport != null) { P.passport = ds.passport; save(); renderSoft(); return; }
  if (ds.roadreason != null) { P.roadReason = ds.roadreason; save(); render(true); return; }
  if (ds.roadread != null) { const st = roadState(), i = +ds.roadread; st.read[i] = !st.read[i]; save(); renderSoft(); return; }
  if (ds.roadpath != null) { const st = roadState(); st.path = !st.path; save(); renderSoft(); return; }
  if (ds.rpick != null) { c.picked = +ds.rpick; if (c.picked === c.q.answer) { roadState().right[c.qi] = true; bump("drills"); save(); } renderSoft(); return; }
  if (ds.rnext != null) { c.pos++; c.picked = null; c.q = null; renderSoft(); return; }
  if (ds.google != null) { (async () => { const fresh = !Auth.current();
    try { const r = await Auth.signInWithGoogle(); if (r === "redirect") return; S.editProfile = fresh; go("profile"); toast(t("signedIn")); }
    catch (e) { toast(errMsg(e)); } })(); return; }
  if (ds.emailmagic != null) { (async () => { const el = $("#signin-email"); const email = (el && el.value || "").trim();
    if (!/.+@.+\..+/.test(email)) { toast(t("emailInvalid")); return; }
    const note = $("#magic-note"); if (note) note.textContent = t("emailSending");
    try { await Cloud.signInEmail(email); if (note) note.textContent = t("emailSent", email); toast(t("emailSent", email)); }
    catch (e) { if (note) note.textContent = errMsg(e); toast(errMsg(e)); } })(); return; }
  if (ds.signout != null) { (async () => { await Auth.signOut(); S.editProfile = false; go("home"); toast(t("signedOut")); })(); return; }
  if (ds.editprofile != null) { S.editProfile = true; render(true); return; }
  if (ds.canceledit != null) { S.editProfile = false; render(true); return; }
  if (ds.saveprofile != null) { const u = Auth.current(); readProfileForm(u); save();
    if (Auth.cloud()) { Cloud.saveProfile(u).then(() => {}).catch(e => toast(e && e.code === "handle_taken" ? t("handleTaken") : t("cloudSaveFail"))); }
    S.editProfile = false; render(true); toast(t("profileSaved")); return; }
  if (ds.togreason) { const u = Auth.current(); readProfileForm(u); u.reasons = u.reasons.includes(ds.togreason) ? u.reasons.filter(x => x !== ds.togreason) : [...u.reasons, ds.togreason]; renderSoft(); return; }
  if (ds.addlang != null) { const u = Auth.current(); readProfileForm(u); u.langs.push({ code:cur().to, name:pack().name, test:pack().test, level:"", goal:"", note:"" }); renderSoft(); return; }
  if (ds.dellang != null) { const u = Auth.current(); readProfileForm(u); u.langs.splice(+ds.dellang, 1); renderSoft(); return; }
  if (ds.addplace != null) { const u = Auth.current(); readProfileForm(u); u.places.push({ country:"", city:"", status:"visited", reason:"", language:"" }); renderSoft(); return; }
  if (ds.delplace != null) { const u = Auth.current(); readProfileForm(u); u.places.splice(+ds.delplace, 1); renderSoft(); return; }
  if (ds.unit) { go("unit", ds.unit); return; }
  if (ds.unext != null) { const [id, ui] = c.key.split(":"), u = trackUnits(id)[+ui]; bump("words"); c.said = null;
    if (c.i < u.p.length - 1) c.i++; else { c.stage = "quiz"; c.quiz = buildQuiz(id, +ui); c.qi = 0; c.right = 0; c.picked = null; if (c.quiz[0].type === "listen") speak(c.quiz[0].say); } renderSoft(); return; }
  if (ds.uprev != null) { c.i = Math.max(0, c.i - 1); c.said = null; renderSoft(); return; }
  if (ds.upick != null) { c.picked = +ds.upick; const q = c.quiz[c.qi]; if (c.picked === q.answer) c.right++; if (q.type === "meaning") speak(q.options[q.answer]); renderSoft(); return; }
  if (ds.uqnext != null) { c.qi++; c.picked = null; const [id, ui] = c.key.split(":");
    if (c.qi >= c.quiz.length && c.right >= Math.ceil(c.quiz.length * 0.8)) { C().tracks[id + ":" + ui] = true; if (trackUnits(id).every((_, i) => unitDone(id, i)) && !C().certs[id]) C().certs[id] = Date.now(); save(); }
    else if (c.quiz[c.qi] && c.quiz[c.qi].type === "listen") speak(c.quiz[c.qi].say);
    renderSoft(); return; }
  if (ds.savename != null) { P.name = ($("#cname").value || "").trim().slice(0, 40); save(); renderSoft(); return; }
  if (ds.shareprofile != null) { const u = Auth.current(); const base = CFG.SITE || location.origin; const url = (u && u.handle) ? base + "/u/" + u.handle : base + "/?u=" + ds.shareprofile; if (navigator.share) navigator.share({ title:"For a Reason", url }).catch(() => {}); else if (navigator.clipboard) navigator.clipboard.writeText(url).then(() => toast(t("copied")), () => toast(url)); else toast(url); return; }
  if (ds.share) { const m = trackMeta(ds.share), text = `${t("certLine", P.name, m.cert, pack().name)} · For a Reason`;
    if (navigator.share) navigator.share({ title:"For a Reason", text, url:IN_CLAUDE ? REPO : location.origin + "/" }).catch(() => {}); else if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => toast(t("copied")), () => toast(text)); else toast(text); return; }
  if (ds.level) { C().level = ds.level; save(); stopAll(); S.cur = null; if (S.view === "run") S.view = "exam"; if (S.view === "learn") S.view = "home"; render(true); return; }
  if (ds.markdone != null) { const k = L + ":" + S.act; C().done[k] = !C().done[k]; save(); renderSoft(); return; }
  if (ds.say != null) { speak(ds.say); return; }
  if (ds.slow != null) { speak(ds.slow, null, true); return; }
  if (ds.mic != null) { if (S.mic) { const same = S.mic.ctx === ds.mic; S.mic.h.stop(); if (same) return; } startMic(ds.mic); return; }
  if (ds.whisper != null) { loadWhisper().then(() => toast(t("whDone"))).catch(() => toast(t("whFail"))); return; }
  if (ds.export != null) { const blob = new Blob([JSON.stringify({ app:"forareason", version:4, exported:new Date().toISOString(), progress:{ ...P } }, null, 2)], { type:"application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "forareason-progress-" + dstr(Date.now()) + ".json"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); return; }
  if (ds.import != null) { $("#impfile").click(); return; }
  // words
  if (ds.flip != null && c && !c.flipped) { c.flipped = true; const v = vocabByKey(L, c.q[c.pos]); speak(v.r || v.t); renderSoft(); return; }
  if (ds.vmode) { c.mode = ds.vmode; c.flipped = false; c.fb = null; c.said = null; c.typed = ""; renderSoft(); return; }
  if (ds.vall != null) { S.cur = { kind:"vocab", q:dueQueue(L, true), pos:0, mode:c.mode }; renderSoft(); return; }
  if (ds.vgrade) { srsGrade(c.q[c.pos], ds.vgrade === "1"); bump("words"); c.pos++; c.flipped = false; c.said = null; renderSoft(); return; }
  if (ds.vreveal != null) { c.said = { heard:"", score:0, diff:[] }; c.selfReveal = true; renderSoft(); return; }
  if (ds.vcheck != null || ds.vskip != null) {
    const v = vocabByKey(L, c.q[c.pos]), typed = ($("#vin") || {}).value || ""; c.typed = typed; let ok = false, msg = t("answer") + showWord(v);
    if (ds.vcheck != null) {
      if (pack().split === "char") { ok = !!typed.trim() && (nospace(typed) === nospace(v.t) || (v.r && nospace(typed) === nospace(v.r)) || (v.rom && romN(typed) === romN(v.rom))); if (ok) msg = pick(t("right")) + " " + showWord(v); }
      else { const art = pack().articles, a = norm(typed), x = norm(v.t), bare = art ? norm(v.t.replace(new RegExp(art.source, "i"), "")) : x;
        if (a === x) { ok = true; msg = pick(t("right")) + " " + v.t; } else if (a === bare && bare !== x) msg = t("articleMissing") + v.t; else if (sim(a, x) >= 0.85) { ok = true; msg = t("almost") + v.t; } }
    }
    c.fb = { ok, msg }; srsGrade(v.key, ok); bump("words"); speak(v.r || v.t); renderSoft(); return;
  }
  if (ds.vnext != null) { if (c.mode === "say" && !c.graded && c.said && !c.selfReveal && c.said.score < 75) srsGrade(c.q[c.pos], false); c.pos++; c.fb = null; c.said = null; c.typed = ""; c.graded = false; c.selfReveal = false; renderSoft(); setTimeout(() => $("#vin") && $("#vin").focus(), 0); return; }
  if (ds.morewords != null) { moreWords(); return; }
  // kana
  if (ds.kset) { c.set = ds.kset; c.idx = null; c.fb = null; c.typed = ""; renderSoft(); return; }
  if (ds.kmode) { c.mode = ds.kmode; c.idx = null; c.fb = null; c.typed = ""; renderSoft(); return; }
  if (ds.kcheck != null) { const typed = romN(($("#kin") || {}).value || ""), r = KANA_R[c.idx], ok = [r, ...(KANA_ALT[r] || [])].some(x => romN(x) === typed);
    c.n++; if (ok) { c.r++; const cc = C(); cc.cnt.kana = (cc.cnt.kana || 0) + 1; save(); } c.fb = { ok }; speak(c.set === "k" ? toKata(KANA_H[c.idx]) : KANA_H[c.idx]); renderSoft(); return; }
  if (ds.knext != null) { c.idx = rnd(0, KANA_H.length - 1); c.fb = null; c.typed = ""; renderSoft(); setTimeout(() => $("#kin") && $("#kin").focus(), 0); return; }
  // grammar
  if (ds.drill != null) { const gi = +ds.drill; S.cur = { kind:"drill", gi, items:D(L).grammar[gi].drills.map((q, i) => ({ ...prepQ(q), idx:i })), pos:0, picked:null, right:0 }; renderSoft(); return; }
  if (ds.dpick != null) { c.picked = +ds.dpick; const q = c.items[c.pos], ok = c.picked === q.answer, k = L + ":" + c.gi + ":" + q.idx; if (ok) c.right++; C().drills[k] = ok || !!C().drills[k]; bump("drills"); speak(drillSentence(q)); renderSoft(); return; }
  if (ds.dnext != null) { c.pos++; c.picked = null; c.said = null; renderSoft(); return; }
  // order
  if (ds.opick != null) { c.picked.push(c.pool.splice(+ds.opick, 1)[0]); c.result = null; renderSoft(); return; }
  if (ds.unpick != null) { c.pool.push(c.picked.splice(+ds.unpick, 1)[0]); c.result = null; renderSoft(); return; }
  if (ds.oreset != null) { S.cur = newOrder(L, c.i); renderSoft(); return; }
  if (ds.ocheck != null) { const tg = D(L).order[c.i][1], ok = orderChunks(tg).join("|") === c.picked.join("|"); c.result = ok ? "ok" : "bad"; if (ok) { C().order[L + ":" + c.i] = true; bump("sentences"); speak(orderText(tg)); } renderSoft(); return; }
  if (ds.oshow != null) { c.picked = orderChunks(D(L).order[c.i][1]); c.pool = []; c.result = "shown"; renderSoft(); toast(t("shownNotCounted")); return; }
  if (ds.onext != null) { S.cur = newOrder(L, (c.i + 1) % D(L).order.length); renderSoft(); return; }
  // listen
  if (ds.lmode) { S.cur = { kind:"listen", mode:ds.lmode, item:newListen(L, ds.lmode), n:0, right:0 }; renderSoft(); speak(S.cur.item.say); return; }
  if (ds.lplay != null) { speak(c.item.say); return; }
  if (ds.lslow != null) { speak(c.item.say, null, true); return; }
  if (ds.lpick != null) { c.pickedOpt = +ds.lpick; const ok = c.item.options[c.pickedOpt] === c.item.answer; c.n++; if (ok) { c.right++; bump("listen", L); } c.fb = { ok }; renderSoft(); return; }
  if (ds.lcheck != null || ds.lshow != null) {
    const typed = ($("#lin") || {}).value || ""; c.typed = typed; let ok = false, diff = null;
    if (ds.lcheck != null) {
      if (c.mode === "numbers") ok = typed.replace(/[\s.,]/g, "") === c.item.answer;
      else if (c.mode === "times") { const m = typed.trim().match(/^(\d{1,2})\s*[:.h時]\s*(\d{2})?/); ok = !!m && (+(m[2] || 0)) === c.item.m && (+m[1] % 12 || 12) === c.item.h; }
      else { diff = compare(c.item.answer, typed).diff; ok = sim(typed, c.item.answer) >= 0.9; }
    }
    c.n++; if (ok) { c.right++; bump("listen", L); } c.fb = { ok, diff }; renderSoft(); return;
  }
  if (ds.lnext != null) { c.item = newListen(L, c.mode); c.fb = null; c.typed = ""; c.pickedOpt = null; renderSoft(); speak(c.item.say); setTimeout(() => $("#lin") && $("#lin").focus(), 0); return; }
  // speak
  if (ds.snext != null) { S.cur = { kind:"speak", line:pick(linePool(L)), ok:c.ok }; renderSoft(); return; }
  if (ds.sself != null) { bump("speak", L); S.cur = { kind:"speak", line:pick(linePool(L)) }; renderSoft(); return; }
  // mock
  if (ds.emode) { P.mode = ds.emode; save(); renderSoft(); return; }
  if (ds.run) { startRun(ds.run); return; }
  if (ds.ans) { const [id, oi] = ds.ans.split(":"); c.answers[id] = +oi; if (c.practice) c.revealed[id] = true; renderSoft(); return; }
  if (ds.play != null) { const it = c.items[+ds.play]; if (!c.submitted && !c.practice) it.plays++; else it.plays = Math.max(it.plays, 1); speak(it.script, () => renderSoft()); renderSoft(); return; }
  if (ds.showscript != null) { c.show[ds.showscript] = !c.show[ds.showscript]; renderSoft(); return; }
  if (ds.trans != null) { const key = ds.trans, kind = key[0], i = +key.slice(1);
    const text = kind === "r" ? c.texts[i].text : kind === "l" ? c.items[i].script : taskOf(c).prompt; translate(key, text); return; }
  if (ds.submit != null) {
    const all = c.type === "mc" ? c.texts.flatMap((x, ti) => x.qs.map((q, qi) => ["t" + ti + "q" + qi, q])) : c.items.flatMap((x, ii) => x.qs.map((q, qi) => ["i" + ii + "q" + qi, q]));
    c.right = all.filter(([id, q]) => c.answers[id] === q.answer).length; c.score = Math.round(c.right / all.length * 100); c.submitted = true; stopAll();
    if (!c.practice) { const key = L + ":" + c.k; C().exams[key] = Math.max(C().exams[key] || 0, c.score); save(); }
    renderSoft(); setTimeout(() => { const r = $(".result"); if (r && r.scrollIntoView) r.scrollIntoView({ block:"center" }); }, 0); return;
  }
  if (ds.rgen != null) { startRun("reading", { gen:+ds.rgen }); return; }
  if (ds.newtext != null) { newText(); return; }
  if (ds.wtask != null) { startRun("writing", { task:+ds.wtask }); return; }
  if (ds.stask != null) { startRun("speaking", { task:+ds.stask }); return; }
  if (ds.selfcheck != null) { c.showCheck = !c.showCheck; renderSoft(); return; }
  if (ds.grade != null) { gradeAnswer(); return; }
  if (ds.example != null) { example(); return; }
});
document.addEventListener("toggle", e => { if (e.target.dataset && e.target.dataset.snd != null && e.target.open) S.openSound = +e.target.dataset.snd; }, true);
document.addEventListener("input", e => {
  const c = S.cur, id = e.target.id;
  if (id === "wtext" && c) { c.text = e.target.value; const x = D().exam.writing[c.task], n = words(c.text); $("#wc").textContent = t("nWords", n) + " " + (n < x.words[0] ? t("tooShort") : n > x.words[1] ? t("tooLong") : ""); }
  if (id === "stext" && c) c.text = e.target.value;
  if ((id === "vin" || id === "lin" || id === "kin") && c) c.typed = e.target.value;
  if (e.target.dataset.journeysearch != null) { S.jQuery = e.target.value; renderSoft(); return; }
  if (e.target.dataset.doc != null) { P.doc = P.doc || {}; P.doc[e.target.dataset.doc] = e.target.dataset.doc === "days" ? +e.target.value : e.target.value; save(); if (e.target.dataset.live) { const el = $("#" + e.target.dataset.live); if (el) el.textContent = e.target.value; } if (e.target.dataset.doc === "grossPay") { const sc = e.target.selectionStart; renderSoft(); const ni = $("[data-doc=grossPay]"); if (ni) { ni.focus(); try { ni.setSelectionRange(sc, sc); } catch (x) {} } } }
  if (e.target.dataset.rate != null) { P.rate = +e.target.value; save(); e.target.nextElementSibling.textContent = P.rate + "x"; }
});
document.addEventListener("change", async e => {
  if (e.target.dataset && e.target.dataset.docBool != null) { P.doc = P.doc || {}; P.doc[e.target.dataset.docBool] = e.target.checked; save(); renderSoft(); return; }
  if (e.target.dataset && e.target.dataset.ck != null) { const cl = C().checklist || (C().checklist = {}), k = countryOf(P.course).code + ":" + e.target.dataset.ck; cl[k] = e.target.checked; save(); renderSoft(); return; }
  if (e.target.dataset.country != null) { const c = COUNTRIES.find(x => x.code === e.target.value) || COUNTRIES[0]; const topic = topicsFor(c).includes(topicOf(P.course)) ? topicOf(P.course) : topicsFor(c)[0]; P.course = c[topic]; save(); pickVoice(); go("home"); history.replaceState(null, "", "?course=" + P.course); return; }
  if (e.target.dataset.topic != null) { P.course = resolveCourse(countryOf(P.course).code, e.target.value); save(); pickVoice(); go("home"); history.replaceState(null, "", "?course=" + P.course); return; }
  if (e.target.dataset.uilang != null) { const l = e.target.value; const rest = location.pathname.replace(new RegExp("^/(" + UI_LANGS.map(x => x[0]).join("|") + ")(/|$)"), "/"); location.href = (l === "en" ? "" : "/" + l) + (rest === "/" ? "/" : rest) + location.search; return; }
  if (e.target.dataset.engine != null) { P.engine = e.target.value; browserBroken = false; save(); renderSoft(); return; }
  if (e.target.id !== "impfile" || !e.target.files[0]) return;
  try { const j = JSON.parse(await e.target.files[0].text()); if (!j.progress || !["forareason","lang-check","nt2-trainer"].includes(j.app)) throw 0;
    localStorage.setItem(KEY, JSON.stringify(j.progress)); toast(t("imported")); setTimeout(() => location.reload(), 600); }
  catch (err) { toast(t("badImport")); }
});
document.addEventListener("keydown", e => { if (e.key !== "Enter") return; const m = { vin:["vcheck","vnext"], lin:["lcheck","lnext"], kin:["kcheck","knext"] }[e.target.id];
  if (m) { const b = $(`[data-${m[0]}]`) || $(`[data-${m[1]}]`); b && b.click(); } });

/* ---------- AI wiring ---------- */
const AI_STATE = { ai:false, checked:true };
async function checkAI() {
  if (IN_CLAUDE) { try { const s = window.claude && window.claude.use ? await window.claude.use("sample") : null;
      ai = s ? { json:p => s.json(p, { modelTier:"default", cache:false }).catch(e => { throw { code:e && e.code }; }) } : null; } catch (e) { ai = null; } }
  else { ai = null; } // deployed site runs without live AI; all core content is pre-generated
  AI_STATE.ai = !!ai; renderSoft();
}

/* ---------- install prompt ---------- */
let deferredInstall = null;
function showInstall(force) {
  const el = $("#install"); if (!el || IN_CLAUDE || STANDALONE) return;
  if (!force && P.installHide && Date.now() - P.installHide < 7 * DAY) return;
  const icon = `<img src="/icons/icon-192.png" alt="" width="44" height="44">`;
  if (deferredInstall) el.innerHTML = `<div class="ibox">${icon}<div class="itext"><strong>${t("installTitle")}</strong><span>${t("installBody")}</span></div><div class="iact"><button class="btn" data-install>${t("install")}</button><button class="link" data-installno>${t("notNow")}</button></div></div>`;
  else if (IS_IOS) el.innerHTML = `<div class="ibox">${icon}<div class="itext"><strong>${t("installTitle")}</strong><span><svg class="share" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 3v12M7 8l5-5 5 5M5 12v8h14v-8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> ${t("iosInstall")}</span></div><div class="iact"><button class="link" data-installno>${t("gotIt")}</button></div></div>`;
  else if (force) el.innerHTML = `<div class="ibox"><div class="itext"><strong>${t("installTitle")}</strong><span>${t("otherInstall")}</span></div><div class="iact"><button class="link" data-installno>${t("gotIt")}</button></div></div>`;
  else return;
  el.hidden = false;
}
function hideInstall(remember) { const el = $("#install"); if (el) { el.hidden = true; el.innerHTML = ""; } if (remember) { P.installHide = Date.now(); save(); } }

/* ---------- boot ---------- */
if (PUBLIC_UID || PUBLIC_HANDLE) { S.view = "pubprofile"; }
else if (!P.onboarded && !anyProgress()) { S.view = "welcome"; }
else { S.view = "dashboard"; }
render(true);
checkAI();
if (typeof Cloud !== "undefined" && !(typeof IN_CLAUDE !== "undefined" && IN_CLAUDE)) { Cloud.init().then(async () => {
  if (Auth.cloud() && Cloud.user) { try { const prof = await Cloud.loadProfile(); if (prof) P.user = prof; const prog = await Cloud.loadProgress(); if (prog) for (const k in prog) P.C[k] = prog[k]; save(); } catch (e) {} }
  renderSoft();
}); Cloud.onAuth(async u => { if (u) { try { const prof = await Cloud.loadProfile(); if (prof) P.user = prof; const prog = await Cloud.loadProgress(); if (prog) for (const k in prog) P.C[k] = prog[k]; save(); } catch (e) {} } else P.user = null; renderSoft(); }); }
if (!IN_CLAUDE) {
  window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredInstall = e; showInstall(); });
  window.addEventListener("appinstalled", () => { deferredInstall = null; hideInstall(false); toast(t("installed")); });
  if (IS_IOS) setTimeout(() => showInstall(), 1200);
  document.addEventListener("click", async e => { const b = e.target.closest("[data-install],[data-installno],[data-installshow]"); if (!b) return;
    if (b.dataset.installshow != null) { showInstall(true); return; } if (b.dataset.installno != null) { hideInstall(true); return; }
    if (deferredInstall) { deferredInstall.prompt(); const r = await deferredInstall.userChoice; deferredInstall = null; hideInstall(r.outcome !== "accepted"); } });
  window.addEventListener("online", checkAI); window.addEventListener("offline", () => { ai = null; renderSoft(); });
  if ("serviceWorker" in navigator) window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(() => {}));
}
