const Speech = {
  speak(text, rate = 0.85) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate;
    u.pitch = 1.1;
    const voices = speechSynthesis.getVoices();
    const en = voices.find((v) => v.lang.startsWith('en'));
    if (en) u.voice = en;
    speechSynthesis.speak(u);
  },

  speakWord(word) {
    this.speak(word, 0.7);
  },

  speakSentence(s) {
    this.speak(s, 0.8);
  },
};

if (window.speechSynthesis) {
  speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
}
