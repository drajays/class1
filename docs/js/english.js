const EnglishGame = {
  level: null,
  qIndex: 0,
  correct: 0,
  wrong: 0,
  streak: 0,
  playerId: null,
  builtWord: [],

  start(levelId, playerId) {
    this.level = ENGLISH_LEVELS.find((l) => l.id === levelId);
    this.playerId = playerId;
    this.qIndex = 0;
    this.correct = 0;
    this.wrong = 0;
    this.streak = 0;
    document.getElementById('english-level-picker').classList.add('hidden');
    document.getElementById('english-game').classList.remove('hidden');
    this.render();
  },

  render() {
    const area = document.getElementById('english-game');
    const total = this.level.questions.length;
    if (this.qIndex >= total) return this.finish();

    const pct = (this.qIndex / total) * 100;
    let html = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p style="text-align:center;font-weight:600;color:#888">Activity ${this.qIndex + 1} of ${total}</p>
    `;

    switch (this.level.mode) {
      case 'read_match': html += this.renderReadMatch(); break;
      case 'article_pick': html += this.renderArticle(); break;
      case 'picture_match': html += this.renderPictureMatch(); break;
      case 'spell': html += this.renderSpell(); break;
      case 'sentence_blank': html += this.renderSentence(); break;
      default: html += '<p>Coming soon!</p>';
    }

    area.innerHTML = html;
    this.bindEvents();
  },

  currentQ() {
    return this.level.questions[this.qIndex];
  },

  renderReadMatch() {
    const q = this.currentQ();
    const opts = [q.emoji, '🏠', '🚗', '🌸'].sort(() => Math.random() - 0.5);
    return `
      <div class="question-box">
        <h3>Tap 🔊 to hear the word, then pick the picture!</h3>
        <div class="big-word">${q.word.toUpperCase()}</div>
        <button class="btn-speak" id="btn-speak-word">Hear: "${q.word}"</button>
        <p style="text-align:center;margin:8px 0;font-size:1.1rem">${q.sentence}</p>
        <button class="btn-speak" id="btn-speak-sent">Hear full sentence</button>
        <div class="options-grid" style="margin-top:16px">
          ${opts.map((e) =>
            `<button class="option-btn" data-val="${e}" style="font-size:40px">${e}</button>`
          ).join('')}
        </div>
        <div id="eng-explain"></div>
      </div>`;
  },

  renderArticle() {
    const q = this.currentQ();
    return `
      <div class="question-box">
        <h3>Pick: a or an?</h3>
        <div style="font-size:48px;text-align:center">${q.visual}</div>
        <p class="question-text" style="text-align:center;font-size:1.5rem">${q.q.replace('___', '___')}</p>
        <div class="options-grid">
          ${q.options.map((o) => `<button class="option-btn" data-val="${o}" style="font-size:1.5rem">${o}</button>`).join('')}
        </div>
        <div id="eng-explain"></div>
      </div>`;
  },

  renderPictureMatch() {
    const q = this.currentQ();
    const opts = [q.emoji, ...q.wrong].sort(() => Math.random() - 0.5);
    return `
      <div class="question-box">
        <h3>Which picture matches the word?</h3>
        <div class="big-word">${q.word.toUpperCase()}</div>
        <button class="btn-speak" id="btn-speak-word">Hear: "${q.word}"</button>
        <div class="options-grid" style="margin-top:16px">
          ${opts.map((e) => `<button class="option-btn" data-val="${e}" style="font-size:40px">${e}</button>`).join('')}
        </div>
        <div id="eng-explain"></div>
      </div>`;
  },

  renderSpell() {
    const q = this.currentQ();
    this.builtWord = [];
    const letters = q.word.split('');
    const extra = 'aeiourt'.split('').slice(0, 2);
    const pool = [...letters, ...extra].sort(() => Math.random() - 0.5);

    return `
      <div class="question-box">
        <h3>Build the word!</h3>
        <div style="font-size:48px;text-align:center">${q.emoji}</div>
        <button class="btn-speak" id="btn-speak-word">Hear: "${q.word}"</button>
        <div class="word-slots" id="word-slots">
          ${letters.map(() => '<div class="word-slot"></div>').join('')}
        </div>
        <div class="letter-tiles" id="letter-tiles">
          ${pool.map((l, i) => `<button class="letter-tile" data-l="${l}" data-i="${i}">${l.toUpperCase()}</button>`).join('')}
        </div>
        <button class="btn-primary" id="spell-check">Check Word ✓</button>
        <div id="eng-explain"></div>
      </div>`;
  },

  renderSentence() {
    const q = this.currentQ();
    return `
      <div class="question-box">
        <h3>Read the sentence. Fill the blank!</h3>
        <div style="font-size:48px;text-align:center">${q.emoji}</div>
        <p class="question-text" style="font-size:1.3rem;text-align:center">${q.sentence.replace('___', '______')}</p>
        <button class="btn-speak" id="btn-speak-sent">🔊 Read sentence</button>
        <div class="options-grid" style="margin-top:12px">
          ${q.options.map((o) => `<button class="option-btn" data-val="${o}">${o}</button>`).join('')}
        </div>
        <div id="eng-explain"></div>
      </div>`;
  },

  bindEvents() {
    const q = this.currentQ();
    const speakWord = document.getElementById('btn-speak-word');
    if (speakWord) speakWord.addEventListener('click', () => Speech.speakWord(q.word));

    const speakSent = document.getElementById('btn-speak-sent');
    if (speakSent) {
      const text = q.sentence || q.full;
      if (text) speakSent.addEventListener('click', () => Speech.speakSentence(text));
    }

    document.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.pickOption(btn));
    });

    document.querySelectorAll('.letter-tile').forEach((tile) => {
      tile.addEventListener('click', () => this.pickLetter(tile));
    });

    const check = document.getElementById('spell-check');
    if (check) check.addEventListener('click', () => this.checkSpell());
  },

  pickLetter(tile) {
    if (tile.classList.contains('used')) return;
    const slots = document.querySelectorAll('.word-slot');
    const empty = [...slots].findIndex((s) => !s.textContent);
    if (empty === -1) return;
    slots[empty].textContent = tile.dataset.l.toUpperCase();
    tile.classList.add('used');
    this.builtWord.push(tile.dataset.l);
  },

  checkSpell() {
    const q = this.currentQ();
    const attempt = this.builtWord.join('');
    const fakeBtn = document.createElement('button');
    fakeBtn.dataset.val = attempt;
    this.pickOption(fakeBtn, attempt === q.word, q.word);
  },

  pickOption(btn, forceCorrect, correctVal) {
    const q = this.currentQ();
    let answer, correct;

    if (this.level.mode === 'read_match') {
      answer = btn.dataset.val;
      correct = answer === q.emoji;
    } else if (this.level.mode === 'article_pick') {
      answer = btn.dataset.val;
      correct = answer === q.answer;
    } else if (this.level.mode === 'picture_match') {
      answer = btn.dataset.val;
      correct = answer === q.emoji;
    } else if (this.level.mode === 'spell') {
      answer = forceCorrect !== undefined ? (forceCorrect ? correctVal : 'x') : btn.dataset.val;
      correct = forceCorrect !== undefined ? forceCorrect : false;
    } else if (this.level.mode === 'sentence_blank') {
      answer = btn.dataset.val;
      correct = answer === q.blank;
    }

    const buttons = document.querySelectorAll('.option-btn, .letter-tile, #spell-check');
    buttons.forEach((b) => (b.style.pointerEvents = 'none'));

    if (btn.classList) btn.classList.add(correct ? 'correct' : 'wrong');

    if (correct) {
      this.correct++;
      this.streak++;
      const coins = 10 + (this.streak >= 3 ? 5 : 0);
      Store.addReward(this.playerId, { coins, stars: 1, xp: 15 });
      Store.trackAnswer(this.playerId, 'english', true);
      Rewards.celebrateCorrect(this.streak);
      Rewards.showToast(`+${coins} coins! Great reading!`);
      setTimeout(() => {
        this.qIndex++;
        this.builtWord = [];
        this.render();
        App.refreshStats();
      }, 1500);
    } else {
      this.wrong++;
      this.streak = 0;
      Store.trackAnswer(this.playerId, 'english', false);
      Sounds.wrong();
      const container = document.getElementById('eng-explain');
      const hint = q.hint || `The answer is "${q.blank || q.answer || q.word || q.emoji}". Tap 🔊 and try to remember!`;
      container.innerHTML = `
        <div class="explain-box">
          <h4>💡 Let me help you read!</h4>
          <p>${hint}</p>
          <button class="btn-speak" id="hint-speak">Hear the answer</button>
          <button class="btn-primary" id="eng-next">Try Next →</button>
        </div>`;
      const ans = q.blank || q.answer || q.word;
      if (ans) document.getElementById('hint-speak').addEventListener('click', () => Speech.speakWord(ans));
      document.getElementById('eng-next').addEventListener('click', () => {
        this.qIndex++;
        this.builtWord = [];
        this.render();
      });
    }
  },

  finish() {
    const total = this.level.questions.length;
    const ratio = this.correct / total;
    let stars = 1;
    if (ratio >= 0.6) stars = 2;
    if (ratio >= 0.9 && this.wrong === 0) stars = 3;
    const res = Store.awardLevel(this.playerId, 'english', this.level.id, stars, stars * 15);
    const coins = res.coins;
    Store.logActivity(this.playerId, `Reading level ${this.level.title} — ${stars} stars`);
    Pet.onLessonComplete(this.playerId);
    Store.checkBadges(this.playerId);

    const area = document.getElementById('english-game');
    area.innerHTML = `
      <div style="text-align:center;padding:20px">
        <div style="font-size:64px">📖🏆</div>
        <h2>Reading Star!</h2>
        <p style="font-size:1.2rem">${'⭐'.repeat(stars)}</p>
        <p>${this.correct} of ${total} correct!</p>
        <button class="btn-primary" id="eng-done">Back to Levels</button>
      </div>`;
    Rewards.celebrateLevelComplete(stars, coins);
    document.getElementById('eng-done').addEventListener('click', () => {
      document.getElementById('english-game').classList.add('hidden');
      document.getElementById('english-level-picker').classList.remove('hidden');
      App.showEnglishLevels();
      App.refreshStats();
    });
  },
};
