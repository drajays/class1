const Rewards = {
  showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.add('hidden'), 2500);
  },

  confetti(count = 40) {
    const layer = document.getElementById('confetti-layer');
    const colors = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4ecdc4', '#a29bfe', '#ff8fab'];
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.animationDuration = 1.5 + Math.random() * 2 + 's';
      p.style.animationDelay = Math.random() * 0.5 + 's';
      layer.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }
  },

  showPopup({ emoji, title, text, onOk }) {
    const pop = document.getElementById('reward-popup');
    document.getElementById('reward-emoji').textContent = emoji;
    document.getElementById('reward-title').textContent = title;
    document.getElementById('reward-text').textContent = text;
    pop.classList.remove('hidden');
    const btn = document.getElementById('reward-ok');
    const handler = () => {
      pop.classList.add('hidden');
      btn.removeEventListener('click', handler);
      if (onOk) onOk();
    };
    btn.addEventListener('click', handler);
  },

  celebrateCorrect(streak) {
    this.confetti(30 + streak * 5);
    const msg = CHEERS[Math.floor(Math.random() * CHEERS.length)];
    this.showToast(msg);
  },

  celebrateLevelComplete(stars, coins) {
    this.confetti(60);
    this.showPopup({
      emoji: stars === 3 ? '💎' : '🏆',
      title: stars === 3 ? 'Perfect Level!' : 'Level Complete!',
      text: `You earned ${stars} ⭐ and ${coins} 🪙`,
      onOk: null,
    });
  },
};
