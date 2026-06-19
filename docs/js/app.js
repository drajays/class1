const App = {
  playerId: null,

  async init() {
    Sounds.init();
    Mall.build();
    await Learn.init();
    await MathBook.load();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(AppConfig.url('sw.js')).catch(() => {});
    }
    this.renderWelcomePups();
    Parent.init();

    document.getElementById('btn-start')?.addEventListener('click', () => { Sounds.tap(); this.selectPlayer('advaita'); });
    document.getElementById('btn-play')?.addEventListener('click', () => { Sounds.tap(); this.go('play'); });
    document.getElementById('btn-mall')?.addEventListener('click', () => { Sounds.tap(); this.go('mall'); });
    document.getElementById('btn-daily')?.addEventListener('click', () => this.claimDaily());
    document.getElementById('btn-sound')?.addEventListener('click', () => {
      const on = Sounds.toggle();
      Rewards.showToast(on ? '🔊 Sounds on!' : '🔇 Sounds off');
    });
    document.getElementById('btn-update')?.addEventListener('click', () => this.checkForUpdate());
    document.getElementById('minigame-back')?.addEventListener('click', () => MiniGames.back());
    document.getElementById('hub-back')?.addEventListener('click', () => this.go('play'));
    document.getElementById('quest-back')?.addEventListener('click', () => {
      if (QuickQuest.subjectId) SubjectHub.open(QuickQuest.subjectId);
      else this.go('play');
    });

    document.querySelectorAll('[data-back]').forEach((btn) => {
      btn.addEventListener('click', () => {
        Sounds.tap();
        const dest = btn.dataset.back;
        if (dest === 'chapters') Learn.openSubject(Learn.subjectId);
        else this.go(dest);
      });
    });
    document.querySelectorAll('[data-go]').forEach((btn) => {
      btn.addEventListener('click', () => { Sounds.tap(); this.go(btn.dataset.go); });
    });
    document.getElementById('tab-notes')?.addEventListener('click', () => Learn.setMode('notes'));
    document.getElementById('tab-quiz')?.addEventListener('click', () => Learn.setMode('quiz'));

    // Auto-resume Advaita (single player)
    this.selectPlayer('advaita', true);
  },

  renderWelcomePups() {
    const el = document.getElementById('welcome-pups');
    if (!el) return;
    el.innerHTML = PUPPIES.map((d) =>
      `<div class="welcome-pup"><img src="${AppConfig.url(d.photo)}" alt="${d.name}"><span>${d.name}</span></div>`
    ).join('');
  },

  selectPlayer(id, silent) {
    this.playerId = id;
    Learn.playerId = id;
    Store.getPlayer(id);
    Store.ensurePuppies(id);
    Store.recordLogin(id);
    this.go('home');
    if (!silent) Speech.navSay('Welcome to Puppy Park! Your puppies missed you!');
  },

  go(screen) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    const map = {
      login: 'screen-login',
      home: 'screen-home',
      play: 'screen-play',
      mall: 'screen-mall',
      puppy: 'screen-puppy',
      minigames: 'screen-minigames',
      'subject-hub': 'screen-subject-hub',
      'quick-quest': 'screen-quick-quest',
      chapters: 'screen-chapters',
      chapter: 'screen-chapter',
      math: 'screen-math',
      english: 'screen-english',
    };
    document.getElementById(map[screen]).classList.add('active');
    window.scrollTo(0, 0);

    if (screen === 'home') {
      const fresh = Puppies.tick();
      Puppies.renderPark();
      this.refreshStats();
      if (fresh.length) {
        const names = fresh.map((fid) => PUPPIES.find((d) => d.id === fid)?.name).join(' & ');
        setTimeout(() => Rewards.showToast(`🐶 ${names} ${fresh.length === 1 ? 'has' : 'have'} a new wish!`), 600);
      }
    }
    if (screen === 'play') { Learn.playerId = this.playerId; Learn.showHome(); this.refreshStats(); Speech.navSay('Pick something to play and earn coins!'); }
    if (screen === 'mall') { Mall.render(); this.refreshStats(); Speech.navSay('Welcome to the Puppy Mall! Pick a puppy and buy treats!'); }
    if (screen === 'puppy') Puppies.renderDetail();
    if (screen === 'minigames') MiniGames.showHub();
    if (screen === 'math') { MathBook.open(); }
    if (screen === 'english') { EnglishBook.open(); }
  },

  claimDaily() {
    if (!this.playerId) return;
    Sounds.tap();
    const result = Store.dailyChallenge(this.playerId);
    if (result.ok) {
      Sounds.chest();
      Rewards.confetti(35);
      Rewards.showPopup({
        emoji: '🎁',
        title: 'Daily Gift!',
        text: result.msg,
        onOk: () => { this.refreshStats(); Puppies.renderPark(); },
      });
    } else {
      Rewards.showToast(result.msg);
    }
  },

  refreshStats() {
    if (!this.playerId) return;
    const p = Store.getPlayer(this.playerId);
    const hero = HEROES.find((h) => h.id === this.playerId);
    const chip = document.getElementById('player-chip');
    if (chip) chip.textContent = `${hero.avatar} ${hero.name}`;
    const setText = (idEl, txt) => { const e = document.getElementById(idEl); if (e) e.textContent = txt; };
    setText('stat-coins', `🪙 ${p.coins}`);
    setText('stat-bones', `🦴 ${p.bones || 0}`);
    setText('mall-coins', `🪙 ${p.coins}`);
    setText('math-progress', 'Lessons: ' + MathBook.progressText());
    setText('english-progress', 'Lessons: ' + EnglishBook.progressText());
  },

  showEnglishLevels() {
    document.getElementById('english-game').classList.add('hidden');
    document.getElementById('english-level-picker').classList.remove('hidden');
    const picker = document.getElementById('english-level-picker');
    picker.innerHTML = ENGLISH_LEVELS.map((lvl) => {
      const stars = Store.getLevelStars(this.playerId, 'english', lvl.id);
      return `
        <button class="level-card ${stars ? 'done' : ''}" data-id="${lvl.id}">
          <span class="level-emoji">${lvl.emoji}</span>
          <div class="level-info"><h3>${lvl.title}</h3><p>${lvl.desc}</p></div>
          <span class="level-stars">${stars ? '⭐'.repeat(stars) : '▶️'}</span>
        </button>`;
    }).join('');
    picker.querySelectorAll('.level-card').forEach((card) => {
      card.addEventListener('click', () => { Sounds.tap(); EnglishGame.start(card.dataset.id, this.playerId); });
    });
  },

  async checkForUpdate() {
    Sounds.tap();
    Rewards.showToast('🔄 Checking for updates…');
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      if (window.caches) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch (err) {
      console.error('Update check failed:', err);
    }
    location.reload();
  },
};

document.addEventListener('DOMContentLoaded', () => {
  App.init().catch((err) => console.error('App init failed:', err));
});
