const Sounds = {
  ctx: null,
  enabled: true,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch { /* no audio */ }
    const saved = localStorage.getItem('class1_sound');
    if (saved === 'off') this.enabled = false;
  },

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('class1_sound', this.enabled ? 'on' : 'off');
    return this.enabled;
  },

  _play(freq, dur, type = 'sine', vol = 0.15) {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.value = freq;
    g.gain.value = vol;
    g.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + dur);
    o.connect(g);
    g.connect(this.ctx.destination);
    o.start();
    o.stop(this.ctx.currentTime + dur);
  },

  correct() {
    this._play(523, 0.12);
    setTimeout(() => this._play(659, 0.12), 80);
    setTimeout(() => this._play(784, 0.18), 160);
    if (navigator.vibrate) navigator.vibrate([30, 20, 50]);
  },

  wrong() {
    this._play(220, 0.08, 'triangle', 0.12);
    setTimeout(() => this._play(180, 0.15, 'triangle', 0.1), 120);
    if (navigator.vibrate) navigator.vibrate(40);
  },

  cheer() {
    [523, 587, 659, 784, 880].forEach((f, i) => {
      setTimeout(() => this._play(f, 0.1), i * 70);
    });
  },

  tap() {
    this._play(440, 0.05, 'square', 0.08);
  },

  chest() {
    [392, 494, 587, 698].forEach((f, i) => {
      setTimeout(() => this._play(f, 0.14, 'sine', 0.18), i * 100);
    });
  },

  raceBoost() {
    this._play(330, 0.06, 'sawtooth', 0.1);
    setTimeout(() => this._play(440, 0.08, 'sawtooth', 0.1), 50);
  },
};
