const Speech = {
  speak(text, rate = 0.85, lang = 'en-IN') {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1.1;
    u.lang = lang;
    const voices = speechSynthesis.getVoices();
    const match = voices.find((v) => v.lang.startsWith(lang.slice(0, 2))) || voices.find((v) => v.lang.startsWith('en'));
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
