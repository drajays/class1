const Parent = {
  holdTimer: null,
  gateA: 0,
  gateB: 0,

  init() {
    const btn = document.getElementById('btn-parent');
    if (!btn) return;
    btn.addEventListener('click', () => {
      Sounds.tap();
      this.openGate();
    });
    document.getElementById('parent-close')?.addEventListener('click', () => this.close());
    document.getElementById('parent-gate-cancel')?.addEventListener('click', () => this.close());
    document.getElementById('parent-gate-go')?.addEventListener('click', () => this.verifyGate());
    document.getElementById('parent-overlay')?.addEventListener('click', (e) => {
      if (e.target.id === 'parent-overlay') this.close();
    });
    document.getElementById('btn-print-cert')?.addEventListener('click', () => window.print());
  },

  openGate() {
    if (!App.playerId) return;
    this.gateA = 5 + Math.floor(Math.random() * 8);
    this.gateB = 3 + Math.floor(Math.random() * 7);
    document.getElementById('gate-question').textContent = `${this.gateA} + ${this.gateB} = ?`;
    document.getElementById('gate-answer').value = '';
    document.getElementById('parent-gate').classList.remove('hidden');
    document.getElementById('parent-dashboard').classList.add('hidden');
    document.getElementById('parent-overlay').classList.add('show');
  },

  verifyGate() {
    const ans = Number(document.getElementById('gate-answer').value);
    if (ans === this.gateA + this.gateB) {
      document.getElementById('parent-gate').classList.add('hidden');
      document.getElementById('parent-dashboard').classList.remove('hidden');
      this.render();
      Speech.navSay(NAV_PROMPTS.parent);
    } else {
      Sounds.wrong();
      Rewards.showToast('Try again — grown-ups only!');
    }
  },

  open() {
    this.openGate();
  },

  close() {
    document.getElementById('parent-overlay').classList.remove('show');
  },

  render() {
    const p = Store.getPlayer(App.playerId);
    const hero = HEROES.find((h) => h.id === App.playerId);
    const a = p.assessment || {};
    const nudges = Store.parentNudges(App.playerId);
    const el = document.getElementById('parent-content');
    const chDone = Object.keys(p.chapters || {}).filter((k) => p.chapters[k] > 0).length;

    el.innerHTML = `
      <h2>👨‍👩‍👧 Parent Dashboard</h2>
      <p class="parent-sub">Invisible assessment — gameplay tracks accuracy & speed</p>
      <div class="parent-hero">${hero.avatar} <b>${hero.name}</b> · Lv ${p.level} · ${p.loginStreak || 0}-day streak</div>
      <div class="parent-stats">
        <div class="parent-stat"><span>Accuracy</span><b>${Store.overallAccuracy(App.playerId)}%</b></div>
        <div class="parent-stat"><span>Avg speed</span><b>${Store.avgResponseSec(App.playerId)}s</b></div>
        <div class="parent-stat"><span>Chapters</span><b>${chDone}</b></div>
        <div class="parent-stat"><span>Mini-games</span><b>${p.minigamesWon || 0}</b></div>
      </div>
      <h3>💡 Try at home today</h3>
      <div class="nudge-list">${nudges.map((n) => `<div class="nudge-card">${n}</div>`).join('')}</div>
      <h3>📊 Recent activity</h3>
      <ul class="activity-list">
        ${(p.activityLog || []).slice(-5).reverse().map((l) => `<li>${l}</li>`).join('') || '<li>Encourage a mini-game today!</li>'}
      </ul>
      <div class="cert-box" id="cert-print">
        <h2>👑 Certificate of Happy Learning</h2>
        <p>This certifies that</p>
        <div class="cert-name">${hero.name}</div>
        <p>has explored Class 1 learning with curiosity and joy!</p>
        <p>⭐ ${p.stars} · 🪙 ${p.coins} · ⚡ ${p.xp || 0} XP</p>
      </div>
      <button class="btn-fun green btn-big" id="btn-print-cert">🖨️ Print Certificate</button>
    `;
    document.getElementById('btn-print-cert')?.addEventListener('click', () => window.print());
  },
};
