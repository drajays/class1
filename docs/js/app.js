const App = {
  playerId: null,

  async init() {
    await Learn.init();
    this.renderHeroes();
    document.getElementById('btn-switch-hero').addEventListener('click', () => this.go('login'));
    document.querySelectorAll('[data-back]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const dest = btn.dataset.back;
        if (dest === 'chapters') Learn.openSubject(Learn.subjectId);
        else this.go(dest);
      });
    });
    document.querySelectorAll('.world-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.go(btn.dataset.go));
    });
    document.getElementById('tab-notes').addEventListener('click', () => Learn.setMode('notes'));
    document.getElementById('tab-quiz').addEventListener('click', () => Learn.setMode('quiz'));

    const saved = localStorage.getItem('class1_last_hero');
    if (saved && HEROES.find((h) => h.id === saved)) {
      this.selectHero(saved);
    }
  },

  renderHeroes() {
    const grid = document.getElementById('hero-grid');
    grid.innerHTML = HEROES.map((h) => `
      <button class="hero-btn" data-id="${h.id}">
        <span class="avatar">${h.avatar}</span>
        <span class="name">${h.name}</span>
        <span class="tag">Tap to play!</span>
      </button>
    `).join('');
    grid.querySelectorAll('.hero-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.selectHero(btn.dataset.id));
    });
  },

  selectHero(id) {
    this.playerId = id;
    Learn.playerId = id;
    localStorage.setItem('class1_last_hero', id);
    Store.getPlayer(id);
    this.go('home');
    this.refreshStats();
    const hero = HEROES.find((h) => h.id === id);
    const msgs = [
      `Hi ${hero.name}! Pick a subject to read notes!`,
      `Hey ${hero.name}! Try a chapter quiz!`,
      `${hero.name}, earn coins and stars in every subject!`,
      `Go ${hero.name}! 120 chapters waiting for you!`,
    ];
    document.getElementById('welcome-msg').textContent =
      msgs[Math.floor(Math.random() * msgs.length)];
  },

  go(screen) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    const map = {
      login: 'screen-login',
      home: 'screen-home',
      chapters: 'screen-chapters',
      chapter: 'screen-chapter',
      math: 'screen-math',
      english: 'screen-english',
      trophy: 'screen-trophy',
    };
    document.getElementById(map[screen]).classList.add('active');

    if (screen === 'home') {
      Learn.playerId = this.playerId;
      Learn.showHome();
      this.refreshStats();
    }
    if (screen === 'math') this.showMathLevels();
    if (screen === 'english') this.showEnglishLevels();
    if (screen === 'trophy') this.showTrophyRoom();
  },

  refreshStats() {
    if (!this.playerId) return;
    const p = Store.getPlayer(this.playerId);
    const hero = HEROES.find((h) => h.id === this.playerId);
    document.getElementById('player-chip').textContent = `${hero.avatar} ${hero.name}`;
    document.getElementById('stat-coins').textContent = `🪙 ${p.coins}`;
    document.getElementById('stat-stars').textContent = `⭐ ${p.stars}`;
    document.getElementById('stat-streak').textContent = `🔥 ${p.streak || 0}`;
    document.getElementById('stat-level').textContent = `Lv ${p.level}`;
    document.getElementById('math-progress').textContent =
      'Arcade: ' + Store.countCompletedLevels(this.playerId, 'math', MATH_LEVELS.length);
    document.getElementById('english-progress').textContent =
      'Arcade: ' + Store.countCompletedLevels(this.playerId, 'english', ENGLISH_LEVELS.length);
  },

  showMathLevels() {
    document.getElementById('math-game').classList.add('hidden');
    document.getElementById('math-level-picker').classList.remove('hidden');
    const picker = document.getElementById('math-level-picker');
    picker.innerHTML = MATH_LEVELS.map((lvl, i) => {
      const stars = Store.getLevelStars(this.playerId, 'math', lvl.id);
      const locked = i > 0 && !Store.getLevelStars(this.playerId, 'math', MATH_LEVELS[i - 1].id);
      return `
        <button class="level-card ${locked ? 'locked' : ''} ${stars ? 'done' : ''}" data-id="${lvl.id}">
          <span class="level-emoji">${lvl.emoji}</span>
          <div class="level-info">
            <h3>${lvl.title}</h3>
            <p>${lvl.desc}</p>
          </div>
          <span class="level-stars">${stars ? '⭐'.repeat(stars) : locked ? '🔒' : '▶️'}</span>
        </button>`;
    }).join('');
    picker.querySelectorAll('.level-card:not(.locked)').forEach((card) => {
      card.addEventListener('click', () => MathGame.start(card.dataset.id, this.playerId));
    });
  },

  showEnglishLevels() {
    document.getElementById('english-game').classList.add('hidden');
    document.getElementById('english-level-picker').classList.remove('hidden');
    const picker = document.getElementById('english-level-picker');
    picker.innerHTML = ENGLISH_LEVELS.map((lvl, i) => {
      const stars = Store.getLevelStars(this.playerId, 'english', lvl.id);
      const locked = i > 0 && !Store.getLevelStars(this.playerId, 'english', ENGLISH_LEVELS[i - 1].id);
      return `
        <button class="level-card ${locked ? 'locked' : ''} ${stars ? 'done' : ''}" data-id="${lvl.id}">
          <span class="level-emoji">${lvl.emoji}</span>
          <div class="level-info">
            <h3>${lvl.title}</h3>
            <p>${lvl.desc}</p>
          </div>
          <span class="level-stars">${stars ? '⭐'.repeat(stars) : locked ? '🔒' : '▶️'}</span>
        </button>`;
    }).join('');
    picker.querySelectorAll('.level-card:not(.locked)').forEach((card) => {
      card.addEventListener('click', () => EnglishGame.start(card.dataset.id, this.playerId));
    });
  },

  showTrophyRoom() {
    const p = Store.getPlayer(this.playerId);
    const room = document.getElementById('trophy-room');
    const chDone = Object.keys(p.chapters || {}).filter((k) => p.chapters[k] > 0).length;
    const badges = BADGES.map((b) => {
      const has = (p.badges || []).includes(b.id);
      return `
        <div class="badge-card ${has ? '' : 'locked'}">
          <div class="badge-emoji">${b.emoji}</div>
          <div class="badge-name">${b.name}</div>
        </div>`;
    }).join('');
    const stickers = '🌟🦁🦄🎈🏆🍎📚🔥💎🦋'.split('').map((s, i) => {
      const unlocked = p.stars >= (i + 1) * 2;
      return `
        <div class="sticker-card" style="opacity:${unlocked ? 1 : 0.3}">
          <div style="font-size:36px">${s}</div>
        </div>`;
    }).join('');
    room.innerHTML = `
      <h3 style="grid-column:1/-1;margin-bottom:8px">🏅 Badges</h3>${badges}
      <h3 style="grid-column:1/-1;margin:16px 0 8px">✨ Stickers</h3>${stickers}
      <div style="grid-column:1/-1;text-align:center;margin-top:16px;padding:16px;background:#fff;border-radius:20px">
        <p style="font-size:1.1rem;font-weight:700">${HEROES.find((h) => h.id === this.playerId).avatar}
        ${p.coins} coins · ${p.stars} stars · ${chDone} chapters · Lv ${p.level}</p>
      </div>`;
  },
};

document.addEventListener('DOMContentLoaded', () => App.init());
