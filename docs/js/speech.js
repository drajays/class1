const Speech = {
  // Phase 12: voice prefs (Store.getVoicePrefs) + Phase 12b Mummy's Voice clips.
  _manifest: null,
  _audio: null,
  _unlocked: false,
  _speakToken: 0,
  _lastUtterance: null,
  _log: [],

  _debugLog(type, detail) {
    this._log.push({ type, detail, time: Date.now() });
    if (this._log.length > 50) this._log.shift();
    try {
      if (typeof window !== 'undefined' && window.location && new URLSearchParams(window.location.search).get('voicedebug') === '1') {
        if (typeof Rewards !== 'undefined' && Rewards.showToast) {
          Rewards.showToast(`${type} ${detail}`);
        }
      }
    } catch { /* */ }
  },

  // iOS/iPadOS: audio must be unlocked inside a real user gesture, and our clip
  // path awaits (manifest+hash) which loses the gesture token. So we keep ONE
  // reusable <audio> element, unlock it (and speechSynthesis) on the first tap,
  // then reuse it for every clip — reused elements may play programmatically.
  init() {
    if (this._audio) return;
    this._audio = new Audio();
    const unlock = () => {
      if (this._unlocked) return;
      this._unlocked = true;
      try {
        this._audio.muted = true;
        const pr = this._audio.play();
        if (pr && pr.catch) pr.catch(() => {});
        setTimeout(() => { try { this._audio.pause(); this._audio.muted = false; } catch { /* */ } }, 60);
      } catch { /* */ }
      try {
        if (window.speechSynthesis) {
          speechSynthesis.resume();
          speechSynthesis.getVoices();
        }
      } catch { /* */ }
    };
    document.addEventListener('pointerdown', unlock, { once: true, capture: true });
    document.addEventListener('touchstart', unlock, { once: true, capture: true });
    this.loadManifest();
  },

  async loadManifest() {
    if (this._manifest !== null) return this._manifest;
    try {
      const r = await fetch(AppConfig.url('data/voice_manifest.json'));
      this._manifest = r.ok ? await r.json() : {};
    } catch {
      this._manifest = {};
    }
    return this._manifest;
  },

  sha8Sync(str) {
    function encodeUTF8(s) {
      const utf8 = [];
      for (let i = 0; i < s.length; i++) {
        let charcode = s.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
        } else {
          i++;
          charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (s.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    const msg = encodeUTF8(str);
    const len = msg.length * 8;
    msg.push(0x80);
    while ((msg.length % 64) !== 56) msg.push(0);
    msg.push(0, 0, 0, 0, (len >>> 24) & 0xff, (len >>> 16) & 0xff, (len >>> 8) & 0xff, len & 0xff);
    const words = [];
    for (let i = 0; i < msg.length; i += 4) {
      words.push((msg[i] << 24) | (msg[i+1] << 16) | (msg[i+2] << 8) | msg[i+3]);
    }
    let h0 = 0x67452301, h1 = 0xEFCDAB89, h2 = 0x98BADCFE, h3 = 0x10325476, h4 = 0xC3D2E1F0;
    function rotl(n, s) { return (n << s) | (n >>> (32 - s)); }
    for (let i = 0; i < words.length; i += 16) {
      const w = words.slice(i, i + 16);
      for (let j = 16; j < 80; j++) {
        w[j] = rotl(w[j-3] ^ w[j-8] ^ w[j-14] ^ w[j-16], 1);
      }
      let a = h0, b = h1, c = h2, d = h3, e = h4;
      for (let j = 0; j < 80; j++) {
        let f, k;
        if (j < 20) { f = (b & c) | ((~b) & d); k = 0x5A827999; }
        else if (j < 40) { f = b ^ c ^ d; k = 0x6ED9EBA1; }
        else if (j < 60) { f = (b & c) | (b & d) | (c & d); k = 0x8F1BBCDC; }
        else { f = b ^ c ^ d; k = 0xCA62C1D6; }
        const temp = (rotl(a, 5) + f + e + k + w[j]) >>> 0;
        e = d; d = c; c = rotl(b, 30) >>> 0; b = a; a = temp;
      }
      h0 = (h0 + a) >>> 0; h1 = (h1 + b) >>> 0; h2 = (h2 + c) >>> 0; h3 = (h3 + d) >>> 0; h4 = (h4 + e) >>> 0;
    }
    const hex = [h0, h1].map(x => ('00000000' + (x >>> 0).toString(16)).slice(-8)).join('');
    return hex.slice(0, 8);
  },

  async _sha8(text) {
    return this.sha8Sync(String(text));
  },

  prefs() {
    try {
      return (typeof Store !== 'undefined' && Store.getVoicePrefs) ? Store.getVoicePrefs() : {};
    } catch {
      return {};
    }
  },

  cleanText(text) {
    if (text == null) return '';
    let str = String(text);
    const prefs = this.prefs();
    if (prefs.skipSymbols === false) return str;
    str = str.replace(/[\u{1F300}-\u{1FAD6}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{1F201}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}\u{FE0F}]/gu, '');
    str = str.replace(/([|*#@~^=_-]){2,}/g, '');
    str = str.replace(/\s+/g, ' ').trim();
    return str;
  },

  _paused: false,

  pause() {
    this._paused = true;
    if (this._audio && !this._audio.paused) {
      try { this._audio.pause(); } catch { /* */ }
    }
    if (window.speechSynthesis && (speechSynthesis.speaking || speechSynthesis.pending)) {
      try { speechSynthesis.pause(); } catch { /* */ }
    }
    this.updateUI();
  },

  resume() {
    this._paused = false;
    if (this._audio && this._audio.paused && this._audio.src) {
      try { this._audio.play(); } catch { /* */ }
    }
    if (window.speechSynthesis && speechSynthesis.paused) {
      try { speechSynthesis.resume(); } catch { /* */ }
    }
    this.updateUI();
  },

  togglePause() {
    if (this.isPaused()) {
      this.resume();
    } else {
      this.pause();
    }
  },

  isPaused() {
    return this._paused || (window.speechSynthesis && speechSynthesis.paused);
  },

  updateUI() {
    const paused = this.isPaused();
    document.querySelectorAll('.speech-pause-btn').forEach((btn) => {
      btn.innerHTML = paused ? '▶️ Play Voice' : '⏸️ Pause Voice';
      btn.title = paused ? 'Resume voice' : 'Pause voice';
    });
  },

  speak(text, rate = 0.85, lang = 'en-IN') {
    this._paused = false;
    this.updateUI();
    this._speakToken = (this._speakToken || 0) + 1;
    const token = this._speakToken;
    const prefs = this.prefs();
    if (prefs.rate) rate = prefs.rate;
    const wantName = lang.startsWith('hi') ? prefs.hiVoice : prefs.enVoice;

    if (wantName === '__mummy__') {
      if (this._manifest !== null) {
        const h = this.sha8Sync(String(text));
        if (this._manifest[h]) {
          if (window.speechSynthesis && (speechSynthesis.speaking || speechSynthesis.pending)) {
            speechSynthesis.cancel();
          }
          this.init();
          const a = this._audio;
          try { a.pause(); } catch { /* */ }
          a.src = AppConfig.url(this._manifest[h]);
          a.muted = false;
          a.playbackRate = Math.max(0.6, Math.min(1.4, rate / 0.85));
          const pr = a.play();
          this._debugLog('🎙️ clip', h);
          if (pr && pr.catch) pr.catch(() => this._tts(text, rate, lang, prefs, token));
          return;
        }
      } else {
        this.loadManifest().then((man) => {
          const h = this.sha8Sync(String(text));
          if (man[h]) {
            if (token !== this._speakToken) return;
            if (window.speechSynthesis && (speechSynthesis.speaking || speechSynthesis.pending)) {
              speechSynthesis.cancel();
            }
            this.init();
            const a = this._audio;
            try { a.pause(); } catch { /* */ }
            a.src = AppConfig.url(man[h]);
            a.muted = false;
            a.playbackRate = Math.max(0.6, Math.min(1.4, rate / 0.85));
            const pr = a.play();
            if (pr && pr.catch) pr.catch(() => this._tts(text, rate, lang, prefs, token));
            return;
          }
          if (token === this._speakToken) this._tts(text, rate, lang, prefs, token);
        });
        return;
      }
    }
    this._tts(text, rate, lang, prefs, token);
  },

  async _clipOrTTS(text, rate, lang, prefs, token) {
    this.speak(text, rate, lang);
  },

  _tts(text, rate, lang, prefs = {}, token = null) {
    const cleaned = this.cleanText(text);
    if (!cleaned.trim()) return;
    text = cleaned;
    if (!window.speechSynthesis) {
      this._debugLog('⛔ blocked', 'no speechSynthesis');
      return;
    }
    if (token && token !== this._speakToken) return;
    if (this._audio) { try { this._audio.pause(); } catch { /* */ } }
    const voices = speechSynthesis.getVoices();
    let match = null;
    const wantName = lang.startsWith('hi') ? prefs.hiVoice : prefs.enVoice;
    const findVoice = (pred) => voices.find((v) => v.localService && pred(v)) || voices.find(pred);
    if (wantName && wantName !== '__mummy__') {
      match = findVoice((v) => v.name === wantName && v.lang.startsWith(lang.slice(0, 2)))
        || findVoice((v) => v.name === wantName);
    }
    if (!match) match = findVoice((v) => v.lang.startsWith(lang.slice(0, 2)));
    if (!match && voices.length > 0 && lang.startsWith('hi') && typeof HindiBook !== 'undefined' && HindiBook.devToRoman) {
      text = HindiBook.devToRoman(text);
      lang = 'en-IN';
      if (prefs.enVoice && prefs.enVoice !== '__mummy__') {
        match = findVoice((v) => v.name === prefs.enVoice);
      }
    }
    if (!match) match = findVoice((v) => v.lang.startsWith('en'));
    const voiceName = match ? match.name : (lang || 'default');
    this._debugLog('🗣️ tts', voiceName);
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1.1;
    u.lang = lang;
    if (match) u.voice = match;
    this._lastUtterance = u;
    u.onend = () => { if (this._lastUtterance === u) this._lastUtterance = null; };
    u.onerror = (e) => {
      this._debugLog('⛔ blocked', e.error || 'tts error');
      if (this._lastUtterance === u) this._lastUtterance = null;
    };
    const doSpeak = () => {
      if (token && token !== this._speakToken) return;
      try {
        window.speechSynthesis.speak(u);
      } catch (e) {
        this._debugLog('⛔ blocked', 'speak exception');
      }
    };
    if (speechSynthesis.speaking || speechSynthesis.pending) {
      speechSynthesis.cancel();
      setTimeout(doSpeak, 60);
    } else {
      doSpeak();
    }
  },

  stop() {
    this._paused = false;
    if (window.speechSynthesis) speechSynthesis.cancel();
    if (this._audio) { try { this._audio.pause(); } catch { /* */ } }
    this.updateUI();
  },

  speakWord(word) {
    const entry = SPEAK_WORDS?.find((w) => w.word === word);
    this.speak(word, 0.7, entry?.lang || 'en-IN');
  },

  speakSentence(s) {
    this.speak(s, 0.8);
  },

  navSay(text) {
    if (localStorage.getItem('class1_voice_nav') === 'off') return;
    setTimeout(() => this.speak(text, 0.9), 400);
  },

  listen(lang = 'en-IN') {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return Promise.resolve(null);
    return new Promise((resolve) => {
      const rec = new SR();
      rec.lang = lang;
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e) => resolve(e.results[0][0].transcript.trim().toLowerCase());
      rec.onerror = () => resolve(null);
      rec.onend = () => {};
      try {
        rec.start();
        setTimeout(() => { try { rec.stop(); } catch { /* */ } }, 5000);
      } catch {
        resolve(null);
      }
    });
  },
};

if (window.speechSynthesis) {
  speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
}
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => Speech.init());
  else Speech.init();
}
