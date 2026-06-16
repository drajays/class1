const MathGame = {
  level: null,
  qIndex: 0,
  correct: 0,
  wrong: 0,
  streak: 0,
  playerId: null,

  start(levelId, playerId) {
    this.level = MATH_LEVELS.find((l) => l.id === levelId);
    this.playerId = playerId;
    this.qIndex = 0;
    this.correct = 0;
    this.wrong = 0;
    this.streak = 0;
    document.getElementById('math-level-picker').classList.add('hidden');
    document.getElementById('math-game').classList.remove('hidden');
    this.render();
  },

  render() {
    const area = document.getElementById('math-game');
    const total = this.level.questions.length;
    const q = this.level.questions[this.qIndex];

    if (!q) return this.finish();

    const pct = (this.qIndex / total) * 100;
    let html = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p style="text-align:center;font-weight:600;color:#888">Question ${this.qIndex + 1} of ${total}</p>
    `;
    if (this.streak >= 2) {
      html += `<div class="streak-banner">🔥 ${this.streak} in a row! Bonus coins!</div>`;
    }

    html += `<div class="question-box">
      <h3>${this.level.emoji} ${this.level.title}</h3>
      <p class="question-text">${q.q}</p>
      ${this.renderVisual(q)}
      ${q.equation ? `<div class="math-equation">${q.equation}</div>` : ''}
      <div class="options-grid" id="math-options">
        ${q.options.map((o) => `<button class="option-btn" data-val="${o}">${o}</button>`).join('')}
      </div>
      <div id="math-explain"></div>
    </div>`;

    area.innerHTML = html;
    area.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.answer(btn, q));
    });
  },

  renderVisual(q) {
    const v = q.visual;
    if (!v) return '';
    if (v.type === 'image') {
      return `<div class="visual-aid"><img src="${v.src}" alt="${v.alt || ''}" onerror="this.style.display='none'"></div>`;
    }
    if (v.type === 'emoji') {
      let items = v.items;
      if (v.cross) {
        const chars = [...items];
        let crossed = 0;
        items = chars.map((c, i) => {
          if (crossed < v.cross && c.trim()) {
            crossed++;
            return `<span class="crossed">${c}</span>`;
          }
          return c;
        }).join('');
      }
      return `<div class="visual-aid"><div class="emoji-row">${items}</div></div>`;
    }
    return '';
  },

  renderExplain(q, container) {
    const ex = q.explain;
    if (!ex) return;
    let steps = ex.steps.map((s, i) => `
      <li><span class="step-num">${i + 1}</span>
        <span>${s.text}${s.visual ? `<br><span class="emoji-row">${s.visual}</span>` : ''}</span>
      </li>
    `).join('');
    container.innerHTML = `
      <div class="explain-box">
        <h4>💡 ${ex.title}</h4>
        <ol class="explain-steps">${steps}</ol>
        <button class="btn-primary" id="math-next-btn">Try Next →</button>
      </div>`;
    document.getElementById('math-next-btn').addEventListener('click', () => {
      this.qIndex++;
      this.render();
    });
  },

  answer(btn, q) {
    const val = btn.dataset.val;
    const isNum = typeof q.answer === 'number';
    const correct = isNum ? Number(val) === q.answer : val === q.answer;
    const container = document.getElementById('math-explain');
    const buttons = document.querySelectorAll('#math-options .option-btn');
    buttons.forEach((b) => (b.style.pointerEvents = 'none'));

    if (correct) {
      btn.classList.add('correct');
      this.correct++;
      this.streak++;
      const bonus = this.streak >= 3 ? 5 : 0;
      const coins = 10 + bonus;
      Store.addReward(this.playerId, { coins, stars: 1, xp: 15 });
      const p = Store.getPlayer(this.playerId);
      p.streak = this.streak;
      p.bestStreak = Math.max(p.bestStreak || 0, this.streak);
      Store.updatePlayer(this.playerId, p);
      Rewards.celebrateCorrect(this.streak);
      Rewards.showToast(`+${coins} coins! +1 star!`);

      setTimeout(() => {
        this.qIndex++;
        this.render();
        App.refreshStats();
      }, 1200);
    } else {
      btn.classList.add('wrong');
      buttons.forEach((b) => {
        const match = isNum ? Number(b.dataset.val) === q.answer : b.dataset.val === q.answer;
        if (match) b.classList.add('correct');
      });
      this.wrong++;
      this.streak = 0;
      const p = Store.getPlayer(this.playerId);
      p.streak = 0;
      Store.updatePlayer(this.playerId, p);
      Rewards.showToast(ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]);
      this.renderExplain(q, container);
    }
  },

  finish() {
    const total = this.level.questions.length;
    const ratio = this.correct / total;
    let stars = 1;
    if (ratio >= 0.6) stars = 2;
    if (ratio >= 0.9 && this.wrong === 0) stars = 3;
    const coins = stars * 15;
    Store.addReward(this.playerId, { coins, xp: 30 });
    Store.completeLevel(this.playerId, 'math', this.level.id, stars);
    const newBadges = Store.checkBadges(this.playerId);

    const area = document.getElementById('math-game');
    area.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:64px">${stars === 3 ? '💎' : '🏆'}</div>
        <h2>Level Complete!</h2>
        <p style="font-size:1.2rem;margin:12px 0">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</p>
        <p>You got ${this.correct} of ${total} right!</p>
        <p>+${coins} bonus coins!</p>
        ${newBadges.length ? `<p>🏅 New badge: ${newBadges.map((id) => BADGES.find((b) => b.id === id)?.emoji).join('')}</p>` : ''}
        <button class="btn-primary" id="math-done">Back to Levels</button>
      </div>`;
    Rewards.celebrateLevelComplete(stars, coins);
    document.getElementById('math-done').addEventListener('click', () => {
      document.getElementById('math-game').classList.add('hidden');
      document.getElementById('math-level-picker').classList.remove('hidden');
      App.showMathLevels();
      App.refreshStats();
    });
  },
};
