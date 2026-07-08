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

  async render() {
    const p = Store.getPlayer(App.playerId);
    const hero = HEROES.find((h) => h.id === App.playerId) || { name: 'Advaita', avatar: '👧' };
    const nudges = Store.parentNudges(App.playerId);
    const el = document.getElementById('parent-content');
    const chDone = Object.keys(p.chapters || {}).filter((k) => p.chapters[k] > 0).length;

    let allChapters = [];
    try {
      allChapters = await Coach.getAllChapters();
    } catch (e) {
      allChapters = [];
    }

    const attemptStats = p.attemptStats || {};
    const journal = p.journal || [];

    // 1. Good at (3⭐ and low errors)
    const goodBySub = {};
    allChapters.forEach((c) => {
      const stars = Store.getLevelStars(App.playerId, c.subject, c.id);
      const stat = attemptStats[`${c.subject}_${c.id}`] || { wrong: 0 };
      if (stars === 3 && stat.wrong <= 2) {
        if (!goodBySub[c.subject]) goodBySub[c.subject] = [];
        goodBySub[c.subject].push(c);
      }
    });

    let goodHtml = '';
    const subNames = { math: 'Math', english: 'English', evs: 'EVS', hindi: 'Hindi', sanskrit: 'Sanskrit', computer: 'Computer' };
    Object.keys(goodBySub).forEach((sub) => {
      const list = goodBySub[sub];
      goodHtml += `<div class="parent-group-title">${subNames[sub] || sub} (${list.length})</div>`;
      list.forEach((c) => {
        goodHtml += `
          <div class="parent-item good">
            <span>${c.icon || '📘'} ${c.title}</span>
            <span class="parent-item-badge">⭐⭐⭐ Mastered</span>
          </div>`;
      });
    });
    if (!goodHtml) goodHtml = '<p class="parent-sub">Complete lessons with 3⭐ to unlock mastery highlights!</p>';

    // 2. Struggling (high wrong rate or abandoned or <= 1⭐)
    let struggleHtml = '';
    const struggleItems = [];
    allChapters.forEach((c) => {
      const key = `${c.subject}_${c.id}`;
      const stat = attemptStats[key];
      const stars = Store.getLevelStars(App.playerId, c.subject, c.id);
      if (stat && (stat.wrong >= 3 || stat.abandonedCount >= 2 || (stars > 0 && stars <= 1))) {
        struggleItems.push({ chapter: c, reason: stat.wrong >= 3 ? `${stat.wrong} mistakes` : stat.abandonedCount >= 2 ? 'Repeatedly exited' : '1⭐ progress' });
      }
    });
    struggleItems.forEach((item) => {
      struggleHtml += `
        <div class="parent-item struggle">
          <span>${item.chapter.icon || '📘'} [${subNames[item.chapter.subject] || item.chapter.subject}] ${item.chapter.title}</span>
          <span class="parent-item-badge" style="background:#fecdd3;color:#9f1239;">⚠️ ${item.reason}</span>
        </div>`;
    });
    if (!struggleHtml) struggleHtml = '<p class="parent-sub">🎉 No struggling topics detected right now!</p>';

    // 3. Not touching (avoidance signal - unlocked frontier only)
    let avoidHtml = '';
    const avoidItems = [];
    const nowTs = Date.now();
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    const chapsBySub = {};
    allChapters.forEach((c) => {
      if (!chapsBySub[c.subject]) chapsBySub[c.subject] = [];
      chapsBySub[c.subject].push(c);
    });
    Object.values(chapsBySub).forEach((subList) => {
      subList.forEach((c, idx) => {
        const isUnlocked = (idx === 0) || (Store.getLevelStars(App.playerId, c.subject, subList[idx - 1].id) > 0);
        if (!isUnlocked) return; // Skip locked chapters
        const stars = Store.getLevelStars(App.playerId, c.subject, c.id);
        const stat = attemptStats[`${c.subject}_${c.id}`];
        if (stars === 0 && (!stat || (nowTs - (stat.lastTs || 0) > sevenDaysMs))) {
          avoidItems.push(c);
        }
      });
    });
    avoidItems.slice(0, 6).forEach((c) => {
      avoidHtml += `
        <div class="parent-item avoid">
          <span>${c.icon || '📘'} [${subNames[c.subject] || c.subject}] ${c.title}</span>
          <span class="parent-item-badge" style="background:#fef3c7;color:#b45309;">🙈 Untouched</span>
        </div>`;
    });
    if (!avoidHtml) avoidHtml = '<p class="parent-sub">Advaita is actively exploring all subject areas!</p>';

    // 4. Daily journey timeline (last 14 days)
    const timelineByDate = {};
    journal.forEach((ev) => {
      const d = ev.date || 'Recent';
      if (!timelineByDate[d]) timelineByDate[d] = [];
      timelineByDate[d].push(ev);
    });
    let timelineHtml = '';
    Object.keys(timelineByDate).sort().reverse().slice(0, 14).forEach((dateStr) => {
      const evs = timelineByDate[dateStr];
      const itemsHtml = evs.map((ev) => {
        const timeStr = ev.ts ? new Date(ev.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        return `
          <li>
            <span><b>[${subNames[ev.subject] || ev.subject}]</b> ${ev.title}</span>
            <span>${'⭐'.repeat(ev.stars || 1)} +${ev.coins || 0}🪙 <small>${timeStr}</small></span>
          </li>`;
      }).join('');
      timelineHtml += `
        <div class="parent-timeline-day">
          <div class="parent-timeline-date">📅 ${dateStr} (${evs.length} completed)</div>
          <ul class="parent-timeline-list">${itemsHtml}</ul>
        </div>`;
    });
    if (!timelineHtml) timelineHtml = '<p class="parent-sub">No journal events recorded yet today.</p>';

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

      <div class="parent-section">
        <h3>💪 Good at (Mastered with confidence)</h3>
        ${goodHtml}
      </div>

      <div class="parent-section">
        <h3>🤔 Struggling (High errors or abandoned)</h3>
        ${struggleHtml}
      </div>

      <div class="parent-section">
        <h3>🙈 Not touching (Avoided / Untouched topics)</h3>
        ${avoidHtml}
      </div>

      <div class="parent-section">
        <h3>📅 Daily Journey Log (Last 14 days)</h3>
        ${timelineHtml}
      </div>

      <div class="parent-section">
        <h3>👑 Royal Blessings (Princess Rescue Rewards)</h3>
        <p class="parent-sub">Set small rewards Advaita receives when she rescues a frozen Princess by mastering tricky/new topics!</p>
        <div id="blessings-list">
          ${(p.blessings || ['Special Weekend Treat 🍦', 'Choose Tonight’s Bedtime Story 📖', 'Movie Night Pick 🎬']).map((b, idx) => `
            <div class="parent-item" style="justify-content: space-between;">
              <span>📜 ${b}</span>
              <button class="btn-sm btn-fun orange btn-del-blessing" data-idx="${idx}">Remove</button>
            </div>
          `).join('')}
        </div>
        <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
          <input type="text" id="input-new-blessing" placeholder="Add a new Royal Blessing..." style="flex:1; padding: 0.5rem; border-radius: 8px; border: 1px solid #ccc;">
          <button class="btn-fun green btn-sm" id="btn-add-blessing">Add</button>
        </div>
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

    document.getElementById('btn-add-blessing')?.addEventListener('click', () => {
      const inp = document.getElementById('input-new-blessing');
      if (inp && inp.value.trim()) {
        const p = Store.getPlayer(App.playerId);
        if (!p.blessings) p.blessings = ['Special Weekend Treat 🍦', 'Choose Tonight’s Bedtime Story 📖', 'Movie Night Pick 🎬'];
        p.blessings.push(inp.value.trim());
        Store.updatePlayer(App.playerId, p);
        this.render();
      }
    });

    el.querySelectorAll('.btn-del-blessing').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.idx);
        const p = Store.getPlayer(App.playerId);
        if (!p.blessings) p.blessings = ['Special Weekend Treat 🍦', 'Choose Tonight’s Bedtime Story 📖', 'Movie Night Pick 🎬'];
        p.blessings.splice(idx, 1);
        Store.updatePlayer(App.playerId, p);
        this.render();
      });
    });
  },
};
