const SubjectHub = {
  subjectId: null,

  open(id) {
    this.subjectId = id;
    const extra = EXTRA_SUBJECTS.find((s) => s.id === id);
    const cat = Learn.catalog?.subjects?.find((s) => s.id === id);
    const meta = SUBJECT_HUB_META[id] || { desc: '', games: [] };
    const name = cat?.name || extra?.name || id;
    const emoji = cat?.emoji || extra?.emoji || '📚';

    document.getElementById('hub-title').textContent = `${emoji} ${name} Hub`;
    document.getElementById('hub-desc').textContent = meta.desc || extra?.desc || 'Choose a learning mission!';

    const opts = document.getElementById('hub-options');
    let html = '';

    if (cat && cat.chapterCount > 0) {
      html += `
        <button class="hub-card hub-chapters" data-action="chapters">
          <span class="hub-icon">📚</span>
          <b>Chapter Notes & Quizzes</b>
          <small>${cat.chapterCount} chapters from your book</small>
        </button>`;
    }

    html += `
      <button class="hub-card hub-quest" data-action="quest">
        <span class="hub-icon">🎯</span>
        <b>5-Question Quick Quest</b>
        <small>Fun emoji quiz — no formal test!</small>
      </button>`;

    meta.games.forEach((gid) => {
      const g = MINI_GAMES.find((x) => x.id === gid);
      if (!g) return;
      html += `
        <button class="hub-card hub-game" data-game="${gid}">
          <span class="hub-icon">${g.emoji}</span>
          <b>${g.title}</b>
          <small>${g.sub}</small>
        </button>`;
    });

    opts.innerHTML = html;
    opts.querySelector('[data-action="chapters"]')?.addEventListener('click', () => Learn.openSubject(id));
    opts.querySelector('[data-action="quest"]')?.addEventListener('click', () => QuickQuest.start(id, App.playerId));
    opts.querySelectorAll('[data-game]').forEach((btn) => {
      btn.addEventListener('click', () => {
        App.go('minigames');
        MiniGames.start(btn.dataset.game, App.playerId);
      });
    });
    App.go('subject-hub');
    Speech.navSay(`Welcome to ${name}! Pick a mission!`);
  },
};

const QuickQuest = {
  subjectId: null,
  playerId: null,
  qIndex: 0,
  correct: 0,
  startTime: 0,

  start(subjectId, playerId) {
    this.subjectId = subjectId;
    this.playerId = playerId;
    this.qIndex = 0;
    this.correct = 0;
    const qs = QUEST_BANK[subjectId];
    if (!qs?.length) {
      Rewards.showToast('Quest coming soon for this subject!');
      return;
    }
    App.go('quick-quest');
    this.render();
  },

  questions() {
    return QUEST_BANK[this.subjectId] || [];
  },

  render() {
    const qs = this.questions();
    const q = qs[this.qIndex];
    const area = document.getElementById('quick-quest-body');
    if (!q) return this.finish();

    this.startTime = Date.now();
    const sub = Learn.catalog?.subjects?.find((s) => s.id === this.subjectId)
      || EXTRA_SUBJECTS.find((s) => s.id === this.subjectId);
    document.getElementById('quick-quest-title').textContent =
      `${sub?.emoji || '🎯'} ${sub?.name || 'Quest'}`;

    area.innerHTML = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${(this.qIndex / qs.length) * 100}%"></div></div>
      <p class="quiz-progress">Question ${this.qIndex + 1} of ${qs.length}</p>
      <div class="question-emoji">${q.emoji || '🤔'}</div>
      <p class="question-text">${q.q}</p>
      <div class="options-grid" id="qq-options">
        ${q.options.map((o) => `<button class="option-btn btn-big" data-v="${encodeURIComponent(o)}">${o}</button>`).join('')}
      </div>
      <button class="btn-speak" id="qq-speak">🔊 Read question</button>
      <div id="qq-feedback"></div>`;

    document.getElementById('qq-speak').addEventListener('click', () => Speech.speakSentence(q.q));
    area.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.answer(decodeURIComponent(btn.dataset.v), q, btn));
    });
  },

  answer(choice, q, btn) {
    const ms = Date.now() - this.startTime;
    Store.trackResponseTime(this.playerId, ms);
    const ok = choice === q.answer;
    const area = document.getElementById('quick-quest-body');
    area.querySelectorAll('.option-btn').forEach((b) => (b.disabled = true));

    if (ok) {
      btn.classList.add('correct');
      this.correct++;
      Store.trackAnswer(this.playerId, this.subjectId, true);
      Sounds.correct();
      Rewards.confetti(15);
      document.getElementById('qq-feedback').innerHTML =
        `<div class="explain-box success">${CHEERS[Math.floor(Math.random() * CHEERS.length)]}</div>`;
      setTimeout(() => { this.qIndex++; this.render(); }, 900);
    } else {
      btn.classList.add('wrong');
      Store.trackAnswer(this.playerId, this.subjectId, false);
      Sounds.wrong();
      area.querySelectorAll('.option-btn').forEach((b) => {
        if (decodeURIComponent(b.dataset.v) === q.answer) b.classList.add('correct');
      });
      document.getElementById('qq-feedback').innerHTML =
        `<div class="explain-box">${q.hint || ''}<br><b>Answer:</b> ${q.answer}</div>`;
      setTimeout(() => { this.qIndex++; this.render(); }, 1600);
    }
  },

  finish() {
    const total = this.questions().length;
    const coins = this.correct * 6 + 10;
    Store.addReward(this.playerId, { coins, stars: this.correct >= 4 ? 1 : 0, xp: this.correct * 10 });
    Store.logActivity(this.playerId, `Quick quest ${this.subjectId}: ${this.correct}/${total}`);
    Pet.onLessonComplete(this.playerId);
    Rewards.showPopup({
      emoji: '🏅',
      title: 'Quest Complete!',
      text: `${this.correct}/${total} correct · +${coins} coins`,
      onOk: () => SubjectHub.open(this.subjectId),
    });
    App.refreshStats();
  },
};
