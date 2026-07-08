const Speech = {
  // Phase 12: voice prefs (Store.getVoicePrefs) + Phase 12b Mummy's Voice clips.
  _manifest: null,
  _audio: null,

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

  async _sha8(text) {
    const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text));
    return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 8);
  },

  prefs() {
    try {
      return (typeof Store !== 'undefined' && Store.getVoicePrefs) ? Store.getVoicePrefs() : {};
    } catch {
      return {};
    }
  },

  speak(text, rate = 0.85, lang = 'en-IN') {
    const prefs = this.prefs();
    if (prefs.rate) rate = prefs.rate;
    const wantName = lang.startsWith('hi') ? prefs.hiVoice : prefs.enVoice;
    if (wantName === '__mummy__') {
      this._clipOrTTS(text, rate, lang, prefs);
      return;
    }
    this._tts(text, rate, lang, prefs);
  },

  async _clipOrTTS(text, rate, lang, prefs) {
    try {
      const man = await this.loadManifest();
      const h = await this._sha8(String(text));
      if (man[h]) {
        if (window.speechSynthesis) speechSynthesis.cancel();
        if (this._audio) { try { this._audio.pause(); } catch { /* */ } }
        const a = new Audio(AppConfig.url(man[h]));
        a.playbackRate = Math.max(0.6, Math.min(1.4, rate / 0.85));
        this._audio = a;
        a.play().catch(() => this._tts(text, rate, lang, prefs));
        return;
      }
    } catch { /* fall through to TTS */ }
    this._tts(text, rate, lang, prefs);
  },

  _tts(text, rate, lang, prefs = {}) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (this._audio) { try { this._audio.pause(); } catch { /* */ } }
    const voices = speechSynthesis.getVoices();
    let match = null;
    const wantName = lang.startsWith('hi') ? prefs.hiVoice : prefs.enVoice;
    if (wantName && wantName !== '__mummy__') {
      match = voices.find((v) => v.name === wantName && v.lang.startsWith(lang.slice(0, 2)))
        || voices.find((v) => v.name === wantName);
    }
    if (!match) match = voices.find((v) => v.lang.startsWith(lang.slice(0, 2)));
    if (!match && voices.length > 0 && lang.startsWith('hi') && typeof HindiBook !== 'undefined' && HindiBook.devToRoman) {
      text = HindiBook.devToRoman(text);
      lang = 'en-IN';
      if (prefs.enVoice && prefs.enVoice !== '__mummy__') {
        match = voices.find((v) => v.name === prefs.enVoice);
      }
    }
    if (!match) match = voices.find((v) => v.lang.startsWith('en'));
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1.1;
    u.lang = lang;
    if (match) u.voice = match;
    speechSynthesis.speak(u);
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
