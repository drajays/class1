const App = {
  playerId: null,

  async init() {
    Sounds.init();
    await Learn.init();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(AppConfig.url('sw.js')).catch(() => {});
    }
    this.renderHeroes();
    Parent.init();
    document.getElementById('btn-switch-hero')?.addEventListener('click', () => this.go('login'));
    document.getElementById('btn-daily')?.addEventListener('click', () => this.claimDaily());
    document.getElementById('btn-minigames')?.addEventListener('click', () => this.go('minigames'));
    document.getElementById('btn-shop')?.addEventListener('click', () => this.go('shop'));
    document.getElementById('btn-features')?.addEventListener('click', () => this.go('features'));
    document.getElementById('btn-companion')?.addEventListener('click', () => this.go('companion'));
    document.getElementById('btn-streak-chest')?.addEventListener('click', () => this.showStreakChest());
    document.getElementById('hub-back')?.addEventListener('click', () => this.go('home'));
    document.getElementById('quest-back')?.addEventListener('click', () => {
      if (QuickQuest.subjectId) SubjectHub.open(QuickQuest.subjectId);
      else App.go('home');
    });
    document.getElementById('btn-sound')?.addEventListener('click', () => {
      const on = Sounds.toggle();
      Rewards.showToast(on ? '🔊 Sounds on!' : '🔇 Sounds off');
    });
    document.getElementById('minigame-back')?.addEventListener('click', () => MiniGames.back());
    document.querySelectorAll('[data-back]').forEach((btn) => {
      btn.addEventListener('click', () => {
        Sounds.tap();
        const dest = btn.dataset.back;
        if (dest === 'chapters') Learn.openSubject(Learn.subjectId);
        else this.go(dest);
      });
    });
    document.querySelectorAll('.world-btn, .btn-fun[data-go]').forEach((btn) => {
      btn.addEventListener('click', () => {
        Sounds.tap();
        this.go(btn.dataset.go);
      });
    });
    document.getElementById('tab-notes')?.addEventListener('click', () => Learn.setMode('notes'));
    document.getElementById('tab-quiz')?.addEventListener('click', () => Learn.setMode('quiz'));

    const saved = localStorage.getItem('class1_last_hero');
    if (saved && HEROES.find((h) => h.id === saved)) {
      this.selectHero(saved, true);
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
      btn.addEventListener('click', () => {
        Sounds.tap();
        this.selectHero(btn.dataset.id);
      });
    });
    Speech.navSay('Pick your hero! Tap a big picture to start!');
  },

  selectHero(id, silent) {
    this.playerId = id;
    Learn.playerId = id;
    localStorage.setItem('class1_last_hero', id);
    Store.getPlayer(id);
    const login = Store.recordLogin(id);
    const p = Store.getPlayer(id);

    if (!p.pet?.type) {
      this.go('pet-adopt');
      return;
    }

    this.go('home');
    this.refreshStats();

    if (!silent) {
      if (login.chest) this.showStreakChest();
      const hero = HEROES.find((h) => h.id === id);
      const msgs = [
        `Hi ${hero.name}! Tap a subject or mini games!`,
        `Hey ${hero.name}! Feed your pet after learning!`,
        `${hero.name}, your rocket is waiting on the journey map!`,
        `Go ${hero.name}! 8 fun mini games ready for you!`,
      ];
      document.getElementById('welcome-msg').textContent = msgs[Math.floor(Math.random() * msgs.length)];
      Speech.navSay(NAV_PROMPTS.home);
    }
  },

  showStreakChest() {
    const result = Store.claimStreakChest(this.playerId);
    if (result.ok) {
      Sounds.chest();
      Rewards.confetti(50);
      Rewards.showPopup({
        emoji: '📦',
        title: 'Streak Chest!',
        text: result.msg,
        onOk: () => this.refreshStats(),
      });
    }
  },

  go(screen) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    const map = {
      login: 'screen-login',
      home: 'screen-home',
      'pet-adopt': 'screen-pet-adopt',
      companion: 'screen-companion',
      minigames: 'screen-minigames',
      'subject-hub': 'screen-subject-hub',
      'quick-quest': 'screen-quick-quest',
      shop: 'screen-shop',
      features: 'screen-features',
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
      Pet.renderHome();
      this.refreshStats();
      Journey.render();
    }
    if (screen === 'pet-adopt') Pet.renderAdopt();
    if (screen === 'companion') { Pet.renderLounge(); Speech.navSay(NAV_PROMPTS.pet); }
    if (screen === 'minigames') MiniGames.showHub();
    if (screen === 'shop') Shop.render();
    if (screen === 'features') Features.render();
    if (screen === 'math') { this.showMathLevels(); Speech.navSay(NAV_PROMPTS.math); }
    if (screen === 'english') { this.showEnglishLevels(); Speech.navSay(NAV_PROMPTS.english); }
    if (screen === 'trophy') this.showTrophyRoom();
  },

  claimDaily() {
    if (!this.playerId) return;
    Sounds.tap();
    const result = Store.dailyChallenge(this.playerId);
    if (result.ok) {
      Sounds.chest();
      Rewards.confetti(35);
      Pet.onLessonComplete(this.playerId);
      Rewards.showPopup({
        emoji: '🎁',
        title: 'Daily Challenge!',
        text: result.msg,
        onOk: () => { this.refreshStats(); Pet.renderHome(); },
      });
    } else {
      Rewards.showToast(result.msg);
    }
  },

  refreshStats() {
    if (!this.playerId) return;
    const p = Store.getPlayer(this.playerId);
    const hero = HEROES.find((h) => h.id === this.playerId);
    document.getElementById('player-chip').textContent = `${hero.avatar} ${hero.name}`;
    document.getElementById('stat-coins').textContent = `🪙 ${p.coins}`;
    document.getElementById('stat-stars').textContent = `⭐ ${p.stars}`;
    document.getElementById('stat-streak').textContent = `🔥 ${p.loginStreak || p.streak || 0}`;
    document.getElementById('stat-level').textContent = `Lv ${p.level}`;
    document.getElementById('stat-xp').textContent = `⚡ ${p.xp || 0} XP`;
    const xp = Store.xpProgress(p);
    const bar = document.getElementById('xp-bar');
    if (bar) bar.style.width = `${xp.pct}%`;
    const needEl = document.getElementById('xp-need');
    if (needEl) needEl.textContent = `${xp.need - xp.current} XP to next level`;
    document.getElementById('math-progress').textContent =
      'Arcade: ' + Store.countCompletedLevels(this.playerId, 'math', MATH_LEVELS.length);
    document.getElementById('english-progress').textContent =
      'Arcade: ' + Store.countCompletedLevels(this.playerId, 'english', ENGLISH_LEVELS.length);
    const chestBtn = document.getElementById('btn-streak-chest');
    if (chestBtn) {
      const canChest = (p.loginStreak || 0) >= 3 && p.loginStreak > (p.streakChestAt || 0);
      chestBtn.classList.toggle('hidden', !canChest);
    }
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
      card.addEventListener('click', () => {
        Sounds.tap();
        MathGame.start(card.dataset.id, this.playerId);
      });
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
      card.addEventListener('click', () => {
        Sounds.tap();
        EnglishGame.start(card.dataset.id, this.playerId);
      });
    });
  },

  showTrophyRoom() {
    const p = Store.getPlayer(this.playerId);
    const room = document.getElementById('trophy-room');
    const chDone = Object.keys(p.chapters || {}).filter((k) => p.chapters[k] > 0).length;
    const badgeRack = BADGES.map((b) => {
      const has = (p.badges || []).includes(b.id);
      return `<span class="badge-pill ${has ? 'on' : ''}">${b.emoji} ${b.name}</span>`;
    }).join('');
    const badges = BADGES.map((b) => {
      const has = (p.badges || []).includes(b.id);
      return `
        <div class="badge-card ${has ? '' : 'locked'}">
          <div class="badge-emoji">${b.emoji}</div>
          <div class="badge-name">${b.name}</div>
        </div>`;
    }).join('');
    const stickerEmojis = '🌟🦁🦄🎈🏆🍎📚🔥💎🦋'.split('').map((s, i) => {
      const unlocked = p.stars >= (i + 1) * 2;
      return `
        <div class="sticker-card" style="opacity:${unlocked ? 1 : 0.3}">
          <div style="font-size:36px">${s}</div>
        </div>`;
    }).join('');
    const hero = HEROES.find((h) => h.id === this.playerId);
    const shopStickers = (p.stickers || []).map((id) => {
      const item = SHOP_ITEMS.find((i) => i.id === id);
      return item ? `<span class="badge-pill on">${item.emoji} ${item.name}</span>` : '';
    }).join('');
    room.innerHTML = `
      ${shopStickers ? `<div class="badge-rack">${shopStickers}</div>` : ''}
      <div class="badge-rack">${badgeRack}</div>
      <h3 style="grid-column:1/-1;margin-bottom:8px;font-weight:800">🏅 All Badges</h3>${badges}
      <h3 style="grid-column:1/-1;margin:16px 0 8px;font-weight:800">✨ Sticker Collection</h3>${stickerEmojis}
      <div class="trophy-summary">
        ${hero.avatar} ${hero.name}<br>
        ${p.coins} coins · ${p.stars} stars · ${chDone} chapters · Lv ${p.level}
      </div>`;
  },
};

document.addEventListener('DOMContentLoaded', () => {
  App.init().catch((err) => {
    console.error('App init failed:', err);
    const grid = document.getElementById('hero-grid');
    if (grid && !grid.innerHTML) App.renderHeroes();
  });
});
