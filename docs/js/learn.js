const Learn = {
  catalog: null,
  subjectCache: {},
  subjectId: null,
  chapter: null,
  mode: 'notes',
  qIndex: 0,
  correct: 0,
  playerId: null,

  async init() {
    try {
      const res = await fetch('data/catalog.json');
      this.catalog = await res.json();
    } catch {
      this.catalog = { subjects: [] };
    }
  },

  async loadSubject(id) {
    if (this.subjectCache[id]) return this.subjectCache[id];
    const sub = this.catalog.subjects.find((s) => s.id === id);
    if (!sub) return null;
    const res = await fetch(sub.file);
    const data = await res.json();
    this.subjectCache[id] = data;
    return data;
  },

  showHome() {
    const grid = document.getElementById('subject-grid');
    if (!this.catalog?.subjects?.length) {
      grid.innerHTML = '<p class="hint">Run build_app_data.py to load chapter notes.</p>';
      return;
    }
    grid.innerHTML = this.catalog.subjects.map((s) => {
      const done = Store.countChapterStars(this.playerId, s.id);
      return `
        <button class="subject-btn" data-id="${s.id}" style="--sub-color:${s.color}">
          <span class="subject-emoji">${s.emoji}</span>
          <span class="subject-name">${s.name}</span>
          <span class="subject-meta">${s.chapterCount} chapters · ${done} done</span>
        </button>`;
    }).join('');
    grid.querySelectorAll('.subject-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.openSubject(btn.dataset.id));
    });
  },

  async openSubject(id) {
    this.subjectId = id;
    this.playerId = App.playerId;
    const sub = this.catalog.subjects.find((s) => s.id === id);
    document.getElementById('chapters-title').textContent = `${sub.emoji} ${sub.name}`;
    const data = await this.loadSubject(id);
    const list = document.getElementById('chapter-list');
    list.innerHTML = data.chapters.map((ch, i) => {
      const stars = Store.getChapterStars(this.playerId, ch.id);
      const locked = i > 0 && !Store.getChapterStars(this.playerId, data.chapters[i - 1].id);
      return `
        <button class="level-card ${locked ? 'locked' : ''} ${stars ? 'done' : ''}" data-id="${ch.id}">
          <span class="level-emoji">📄</span>
          <div class="level-info">
            <h3>${ch.title}</h3>
            <p>${ch.notes.length} notes · ${ch.questions.length} questions</p>
          </div>
          <span class="level-stars">${stars ? '⭐'.repeat(stars) : locked ? '🔒' : '▶️'}</span>
        </button>`;
    }).join('');
    list.querySelectorAll('.level-card:not(.locked)').forEach((card) => {
      card.addEventListener('click', () => this.openChapter(card.dataset.id));
    });
    App.go('chapters');
  },

  openChapter(chapterId) {
    const data = this.subjectCache[this.subjectId];
    this.chapter = data.chapters.find((c) => c.id === chapterId);
    this.playerId = App.playerId;
    this.mode = 'notes';
    document.getElementById('chapter-title').textContent = this.chapter.title;
    this.renderNotes();
    App.go('chapter');
  },

  setMode(mode) {
    this.mode = mode;
    document.querySelectorAll('.tab-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.tab === mode);
    });
    if (mode === 'notes') this.renderNotes();
    else this.startQuiz();
  },

  renderNotes() {
    const area = document.getElementById('chapter-content');
    const notes = this.chapter.notes;
    if (!notes.length) {
      area.innerHTML = '<p class="hint">No notes for this chapter yet. Try the quiz!</p>';
      return;
    }
    area.innerHTML = notes.map((n, i) => {
      if (n.type === 'heading') {
        return `<h3 class="note-heading">${n.text}</h3>`;
      }
      if (n.type === 'image') {
        return `<div class="note-image"><img src="${n.src}" alt="${n.alt}" loading="lazy" onerror="this.parentElement.style.display='none'"></div>`;
      }
      return `
        <div class="note-para">
          <p>${n.text}</p>
          <button class="btn-speak" type="button" data-text="${encodeURIComponent(n.text)}" title="Read aloud">🔊 Read</button>
        </div>`;
    }).join('');
    area.querySelectorAll('.btn-speak').forEach((btn) => {
      btn.addEventListener('click', () => {
        Speech.speakSentence(decodeURIComponent(btn.dataset.text));
      });
    });
    document.getElementById('chapter-quiz').classList.add('hidden');
    area.classList.remove('hidden');
  },

  startQuiz() {
    this.qIndex = 0;
    this.correct = 0;
    document.getElementById('chapter-content').classList.add('hidden');
    const quiz = document.getElementById('chapter-quiz');
    quiz.classList.remove('hidden');
    this.renderQuestion();
  },

  renderQuestion() {
    const quiz = document.getElementById('chapter-quiz');
    const qs = this.chapter.questions;
    const q = qs[this.qIndex];
    if (!q) return this.finishQuiz();

    const pct = (this.qIndex / qs.length) * 100;
    quiz.innerHTML = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p class="quiz-progress">Question ${this.qIndex + 1} of ${qs.length}</p>
      <div class="question-box">
        <p class="question-text">${q.q}</p>
        <div class="options-grid" id="quiz-options">
          ${q.options.map((o) => `<button class="option-btn" data-val="${encodeURIComponent(o)}">${o}</button>`).join('')}
        </div>
        <div id="quiz-feedback"></div>
      </div>`;
    quiz.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.answer(decodeURIComponent(btn.dataset.val), q, btn));
    });
  },

  answer(choice, q, btn) {
    const feedback = document.getElementById('quiz-feedback');
    const buttons = document.querySelectorAll('#quiz-options .option-btn');
    buttons.forEach((b) => (b.disabled = true));

    const ok = choice === q.answer;
    if (ok) {
      btn.classList.add('correct');
      this.correct++;
      feedback.innerHTML = `<div class="explain-box success">${CHEERS[Math.floor(Math.random() * CHEERS.length)]}</div>`;
      Rewards.confetti(12);
    } else {
      btn.classList.add('wrong');
      buttons.forEach((b) => {
        if (decodeURIComponent(b.dataset.val) === q.answer) b.classList.add('correct');
      });
      feedback.innerHTML = `<div class="explain-box"><strong>Answer:</strong> ${q.answer}<br>${q.hint || ''}</div>`;
    }

    setTimeout(() => {
      this.qIndex++;
      this.renderQuestion();
    }, ok ? 900 : 1800);
  },

  finishQuiz() {
    const total = this.chapter.questions.length;
    const ratio = total ? this.correct / total : 1;
    let stars = 1;
    if (ratio >= 0.9) stars = 3;
    else if (ratio >= 0.6) stars = 2;

    Store.completeChapter(this.playerId, this.chapter.id, stars);
    const coins = this.correct * 5 + stars * 10;
    Store.addReward(this.playerId, { coins, stars: stars > 1 ? 1 : 0, xp: this.correct * 8 });
    Store.bumpStreak(this.playerId, ratio >= 0.5);
    const newBadges = Store.checkBadges(this.playerId);

    Rewards.showPopup({
      emoji: stars === 3 ? '💎' : '⭐',
      title: 'Chapter Complete!',
      text: `${this.correct}/${total} correct · +${coins} coins · ${'⭐'.repeat(stars)}`,
      onOk: () => {
        if (newBadges.length) Rewards.showToast(`New badge: ${newBadges[0]}!`);
        this.openSubject(this.subjectId);
      },
    });
  },
};
