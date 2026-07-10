const App = {
  playerId: null,

  async init() {
    Sounds.init();
    Mall.build();
    await MathBook.load();
    await SubjectBook.loadAll();
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(AppConfig.url('sw.js')).then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          newWorker?.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              location.reload();
            }
          });
        });
      }).catch(() => {});
    }
    this.renderWelcomePups();
    Parent.init();

    document.getElementById('btn-start')?.addEventListener('click', () => { Sounds.tap(); this.selectPlayer('advaita'); });
    document.getElementById('btn-play')?.addEventListener('click', () => { Sounds.tap(); this.go('play'); });
    document.getElementById('btn-mall')?.addEventListener('click', () => { Sounds.tap(); this.go('mall'); });
    document.getElementById('btn-daily')?.addEventListener('click', () => this.claimDaily());
    document.getElementById('btn-mummy-voice')?.addEventListener('click', () => this.toggleMummyVoice());
    document.getElementById('btn-voice-pause')?.addEventListener('click', () => { Sounds.tap(); Speech.togglePause(); });
    document.getElementById('btn-sound')?.addEventListener('click', () => {
      const on = Sounds.toggle();
      Rewards.showToast(on ? '🔊 Sounds on!' : '🔇 Sounds off');
    });
    document.getElementById('btn-update')?.addEventListener('click', () => this.checkForUpdate());
    document.getElementById('minigame-back')?.addEventListener('click', () => MiniGames.back());

    document.querySelectorAll('[data-back]').forEach((btn) => {
      btn.addEventListener('click', () => {
        Sounds.tap();
        this.go(btn.dataset.back);
      });
    });
    document.querySelectorAll('[data-go]').forEach((btn) => {
      btn.addEventListener('click', () => { Sounds.tap(); this.go(btn.dataset.go); });
    });

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
      curse: 'screen-curse',
      math: 'screen-math',
      english: 'screen-english',
      hindi: 'screen-hindi',
      storytime: 'screen-storytime',
      englishboosters: 'screen-englishboosters',
      english_plus: 'screen-subjectbook',
      math_challenge: 'screen-subjectbook',
      evs: 'screen-subjectbook',
      sanskrit: 'screen-subjectbook',
      computer: 'screen-subjectbook',
      brainobrain: 'screen-brainobrain',
    };
    document.getElementById(map[screen]).classList.add('active');
    window.scrollTo(0, 0);

    if (screen === 'home') {
      const fresh = Puppies.tick();
      Puppies.renderPark();
      Curse.injectStyles();
      Curse.renderCard('curse-card-home');
      Coach.renderMissionCard('mission-card-home');
      if (typeof StoryBook !== 'undefined') StoryBook.renderHomeCard('storytime-card-home');
      this.refreshStats();
      if (fresh.length) {
        const names = fresh.map((fid) => PUPPIES.find((d) => d.id === fid)?.name).join(' & ');
        setTimeout(() => Rewards.showToast(`🐶 ${names} ${fresh.length === 1 ? 'has' : 'have'} a new wish!`), 600);
      }
    }
    if (screen === 'curse') {
      Curse.injectStyles();
      Curse.renderScreen();
      this.refreshStats();
    }
    if (screen === 'play') {
      Coach.renderMissionCard('mission-card-play');
      this.refreshStats();
      Speech.navSay('Pick something to play and earn coins!');
    }
    if (screen === 'mall') { Mall.render(); this.refreshStats(); Speech.navSay('Welcome to the Puppy Mall! Pick a puppy and buy treats!'); }
    if (screen === 'puppy') Puppies.renderDetail();
    if (screen === 'minigames') MiniGames.showHub();
    if (screen === 'math') { MathBook.open(); }
    if (screen === 'english') { EnglishBook.open(); }
    if (screen === 'storytime') { StoryBook.open(); Speech.navSay('Welcome to Story Time! Tap any word to hear it!'); }
    if (screen === 'englishboosters') { EnglishBoosters.open(); Speech.navSay('Welcome to Word Power Boosters!'); }
    if (screen === 'hindi') { HindiBook.open(); Speech.navSay('Tap any letter to hear it. Let us learn Hindi!'); }
    if (screen === 'evs' || screen === 'sanskrit' || screen === 'computer' || screen === 'english_plus' || screen === 'math_challenge') { SubjectBook.open(screen); }
    if (screen === 'brainobrain') {
      Speech.navSay('Welcome to Brainobrain 500 Questions Challenger! Solve questions and earn coins!');
    }
  },

  toggleMummyVoice() {
    const on = Store.getVoicePrefs().enVoice === '__mummy__';
    Store.setVoicePref('enVoice', on ? '' : '__mummy__');
    Store.setVoicePref('hiVoice', on ? '' : '__mummy__');
    this.paintMummyBtn();
    Sounds.tap();
    if (!on) {
      Rewards.showToast("🎙️ Mummy's voice is ON!");
      Speech.speak("Hello Advaita! Let's learn something new!", 0.85, 'en-IN');
    } else {
      Rewards.showToast('✨ Normal voice');
      Speech.speak('Okay, back to my normal voice!', 0.85, 'en-IN');
    }
  },

  paintMummyBtn() {
    const b = document.getElementById('btn-mummy-voice');
    if (b) {
      const on = Store.getVoicePrefs().enVoice === '__mummy__';
      b.style.background = on ? 'linear-gradient(135deg,#f9a8d4,#ec4899)' : '';
      b.title = on ? "Mummy's voice ON — tap for normal voice" : "Tap for Mummy's voice";
    }
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
    setText('hindi-progress', HindiBook.progressText());
    this.paintMummyBtn();
    setText('evs-progress', 'Lessons: ' + SubjectBook.progressText('evs'));
    setText('sanskrit-progress', 'Lessons: ' + SubjectBook.progressText('sanskrit'));
    setText('computer-progress', 'Lessons: ' + SubjectBook.progressText('computer'));
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
