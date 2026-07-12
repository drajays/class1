const CONFETTI_EMOJIS = ['⭐', '🎉', '✨', '🌟', '💫', '🎈', '🏆', '💖', '🌈', '🍎'];

const Rewards = {
  showToast(msg) {
    if (typeof StudyTimer !== 'undefined') StudyTimer.lastActiveTimestamp = Date.now();
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.classList.add('hidden'), 300);
    }, 2500);
  },

  confetti(count = 40) {
    const layer = document.getElementById('confetti-layer');
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4ecdc4', '#a29bfe', '#ff8fab'];
    for (let i = 0; i < count; i++) {
      const useEmoji = Math.random() > 0.45;
      const p = document.createElement('div');
      if (useEmoji) {
        p.className = 'confetti-piece';
        p.textContent = CONFETTI_EMOJIS[Math.floor(Math.random() * CONFETTI_EMOJIS.length)];
      } else {
        p.className = 'confetti-square';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
      }
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = 1.5 + Math.random() * 2 + 's';
      p.style.animationDelay = Math.random() * 0.5 + 's';
      layer.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  },

  showPopup({ emoji, title, text, onOk, btnText = 'OK' }) {
    const pop = document.getElementById('reward-popup');
    document.getElementById('reward-emoji').textContent = emoji;
    document.getElementById('reward-title').textContent = title;
    document.getElementById('reward-text').textContent = text;
    pop.classList.remove('hidden');
    const btn = document.getElementById('reward-ok');
    btn.textContent = btnText;
    const handler = () => {
      pop.classList.add('hidden');
      btn.removeEventListener('click', handler);
      if (onOk) onOk();
    };
    btn.addEventListener('click', handler);
  },

  celebrateCorrect(streak) {
    Sounds.correct();
    this.confetti(30 + (streak || 1) * 5);
    const msg = CHEERS[Math.floor(Math.random() * CHEERS.length)];
    this.showToast(msg);
  },

  praiseEffort() {
    const list = typeof PRAISE_EFFORT !== 'undefined' ? PRAISE_EFFORT : CHEERS;
    const msg = list[Math.floor(Math.random() * list.length)];
    this.showToast(msg);
    if (typeof Speech !== 'undefined' && Speech.speak) Speech.speak(msg.replace(/[^\w\s!']/g, ''), 0.9, 'en-IN');
    return msg;
  },

  praiseFocus() {
    const list = typeof PRAISE_FOCUS !== 'undefined' ? PRAISE_FOCUS : CHEERS;
    const msg = list[Math.floor(Math.random() * list.length)];
    this.showToast(msg);
    if (typeof Speech !== 'undefined' && Speech.speak) Speech.speak(msg.replace(/[^\w\s!']/g, ''), 0.9, 'en-IN');
    return msg;
  },

  praiseCharacter() {
    const list = typeof PRAISE_CHARACTER !== 'undefined' ? PRAISE_CHARACTER : CHEERS;
    const msg = list[Math.floor(Math.random() * list.length)];
    this.showToast(msg);
    if (typeof Speech !== 'undefined' && Speech.speak) Speech.speak(msg.replace(/[^\w\s!']/g, ''), 0.9, 'en-IN');
    return msg;
  },

  praiseQuick() {
    const list = typeof PRAISE_QUICK !== 'undefined' ? PRAISE_QUICK : CHEERS;
    const msg = list[Math.floor(Math.random() * list.length)];
    this.showToast(msg);
    return msg;
  },

  celebrateLevelComplete(stars, coins) {
    Sounds.cheer();
    this.confetti(60);
    const effortMsg = typeof PRAISE_EFFORT !== 'undefined'
      ? PRAISE_EFFORT[Math.floor(Math.random() * PRAISE_EFFORT.length)]
      : 'Amazing effort!';
    this.showPopup({
      emoji: stars === 3 ? '💎' : '🏆',
      title: stars === 3 ? 'Perfect Level!' : 'Level Complete!',
      text: `${effortMsg} You earned ${stars} ⭐ and ${coins} 🪙`,
      onOk: null,
    });
  },
};
