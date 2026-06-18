// ===== ENGLISH BOOK: learning-first, picture-rich, read-aloud grammar & phonics =====
// Mirrors MathBook (docs/js/mathbook.js). Content in docs/data/english_book.json, authored
// from the real Class-1/2 ICSE syllabus + grammar book (organized/english_grammar/).
// Designed for an EARLY READER: big text, lots of pictures, every word is TAP-TO-HEAR,
// questions auto-read aloud, and a "Say it!" speaking practice. All English styles are
// injected here as self-contained `eb-*` classes — NO edits to shared style.css.
// See COORDINATION.md.
const EnglishBook = {
  data: null,
  chapter: null,
  idx: 0,
  correctCount: 0,
  triesThisProblem: 0,
  usedHelp: false,
  playerId: null,
  builtWord: [],

  async load() {
    if (this.data) return this.data;
    try {
      const res = await fetch(AppConfig.url('data/english_book.json'));
      this.data = await res.json();
    } catch {
      this.data = { chapters: [] };
    }
    return this.data;
  },

  async open() {
    this.playerId = App.playerId;
    this.injectStyles();
    await this.load();
    this.showChapters();
  },

  // One-time self-contained styles (eb- prefix) so we never touch shared style.css.
  injectStyles() {
    if (document.getElementById('eb-styles')) return;
    const s = document.createElement('style');
    s.id = 'eb-styles';
    s.textContent = `
      .eb-word{cursor:pointer;border-radius:7px;padding:0 2px;transition:background .12s,transform .12s;display:inline-block}
      .eb-word:hover{background:#fff0a8}
      .eb-word.eb-ping{background:#ffd34d;animation:eb-pop .35s}
      @keyframes eb-pop{0%{transform:scale(1)}45%{transform:scale(1.3)}100%{transform:scale(1)}}
      .eb-hint{text-align:center;color:#7a72c9;font-weight:700;margin:4px 0 2px;font-size:.95rem}
      .eb-concept{text-align:center;padding:6px 6px 14px}
      .eb-concept-emoji{font-size:88px;line-height:1;margin:4px 0;animation:eb-bob 2.2s ease-in-out infinite}
      @keyframes eb-bob{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
      .eb-concept h2{font-size:1.7rem;margin:6px 0}
      .eb-concept-text{font-size:1.35rem;line-height:1.7;font-weight:600;color:#3a3470;max-width:560px;margin:6px auto 12px}
      .eb-bigq{font-size:1.55rem;line-height:1.7;font-weight:800;color:#2b2660;text-align:center}
      .eb-pic{font-size:72px;text-align:center;margin:8px 0}
      .eb-blend{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin:10px 0}
      .eb-blend span{font-size:2.4rem;font-weight:900;background:#eef0ff;border:3px solid #b8b1ff;border-radius:14px;
        min-width:54px;padding:6px 4px;color:#4b3fb0;cursor:pointer}
      .eb-blend span:active{transform:scale(.92)}
      .eb-saybtn{display:inline-flex;align-items:center;gap:6px;border:none;border-radius:18px;font-weight:800;
        font-size:1.05rem;padding:10px 16px;margin:4px 5px;cursor:pointer;font-family:inherit}
      .eb-saybtn.read{background:linear-gradient(135deg,#7c5cff,#b98bff);color:#fff}
      .eb-saybtn.say{background:linear-gradient(135deg,#ff8a3d,#ffc24d);color:#5a2d00}
      .eb-saybtn:active{transform:scale(.95)}
      .eb-unit{font-size:1.15rem;font-weight:900;color:#5a4fd0;margin:18px 6px 8px;padding:8px 14px;
        background:linear-gradient(135deg,#ede9ff,#fbe9ff);border-radius:16px;text-align:center}
      .eb-unit:first-child{margin-top:4px}
    `;
    document.head.appendChild(s);
  },

  progressText() {
    const total = this.data?.chapters?.length || 0;
    let done = 0;
    (this.data?.chapters || []).forEach((c) => {
      if (Store.getLevelStars(this.playerId, 'english', c.id)) done++;
    });
    return `${done}/${total}`;
  },

  showChapters() {
    document.getElementById('english-game').classList.add('hidden');
    const picker = document.getElementById('english-level-picker');
    picker.classList.remove('hidden');
    const chs = this.data.chapters;
    let lastUnit = null;
    // All lessons are always open — pick any one, in any order.
    picker.innerHTML = chs.map((c, i) => {
      const stars = Store.getLevelStars(this.playerId, 'english', c.id);
      let header = '';
      if (c.unit && c.unit !== lastUnit) {
        lastUnit = c.unit;
        header = `<h2 class="eb-unit">${c.unit}</h2>`;
      }
      return `${header}
        <button class="level-card ${stars ? 'done' : ''}" data-id="${c.id}">
          <span class="level-emoji">${c.icon}</span>
          <div class="level-info"><h3>${i + 1}. ${c.title}</h3><p>${c.problems.length} activities</p></div>
          <span class="level-stars">${stars ? '⭐'.repeat(stars) : '▶️'}</span>
        </button>`;
    }).join('');
    picker.querySelectorAll('.level-card').forEach((card) => {
      card.addEventListener('click', () => { Sounds.tap(); this.startChapter(card.dataset.id); });
    });
    Speech.navSay('Pick an English lesson! Tap any word to hear it. We learn step by step.');
  },

  startChapter(id) {
    this.chapter = this.data.chapters.find((c) => c.id === id);
    this.idx = 0;
    this.correctCount = 0;
    document.getElementById('english-level-picker').classList.add('hidden');
    document.getElementById('english-game').classList.remove('hidden');
    this.renderConcept();
  },

  renderConcept() {
    const area = document.getElementById('english-game');
    const c = this.chapter;
    area.innerHTML = `
      <div class="eb-concept">
        <div class="eb-concept-emoji">${c.icon}</div>
        <h2>${this.tappable(c.title)}</h2>
        <p class="eb-hint">👆 Tap any word to hear it!</p>
        <p class="eb-concept-text">${this.tappable(c.concept)}</p>
        ${c.examples ? `<p class="eb-pic">${c.examples}</p>` : ''}
        <div>
          <button class="eb-saybtn read" id="eb-readme">🔊 Read to me</button>
          <button class="eb-saybtn say" id="eb-sayit">🎤 Say it with me!</button>
        </div>
        <button class="btn-fun green btn-big" id="eb-start" style="margin-top:14px">Let's Play! ▶️</button>
      </div>`;
    this.wireWordTaps(area);
    document.getElementById('eb-readme').addEventListener('click', () => Speech.speak(c.concept));
    document.getElementById('eb-sayit').addEventListener('click', () => {
      Rewards.showToast('Your turn! Say it out loud 🗣️');
      Speech.speak(c.concept);
    });
    document.getElementById('eb-start').addEventListener('click', () => { Sounds.tap(); this.renderProblem(); });
    setTimeout(() => Speech.speak(c.concept), 500);
  },

  renderProblem() {
    this.triesThisProblem = 0;
    this.usedHelp = false;
    this.builtWord = [];
    const p = this.chapter.problems[this.idx];
    if (!p) return this.finish();
    if (p.skill === 'spell') return this.renderSpell(p);
    const area = document.getElementById('english-game');
    const total = this.chapter.problems.length;
    const pct = (this.idx / total) * 100;
    const opts = this.options(p);

    area.innerHTML = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p class="mb-count">Activity ${this.idx + 1} of ${total}</p>
      <div class="mb-problem">
        <p class="eb-hint">👆 Tap any word to hear it!</p>
        <p class="mb-q eb-bigq">${this.tappable(p.q)} <button class="eb-saybtn read" id="eb-read" style="padding:6px 12px;font-size:.95rem">🔊 Read</button></p>
        <div class="mb-visual" id="eb-visual">${this.visual(p)}</div>
        <div class="mb-options" id="eb-options">
          ${opts.map((o) => `<button class="mb-opt" data-v="${this.esc(o)}">${this.esc(o)}</button>`).join('')}
        </div>
        <button class="mb-help" id="eb-help">🤔 Show me how</button>
        <div class="mb-steps" id="eb-steps"></div>
      </div>`;

    this.wireWordTaps(area);
    document.getElementById('eb-read').addEventListener('click', () => this.readAloud(p, opts));
    document.getElementById('eb-help').addEventListener('click', () => { this.usedHelp = true; this.showSolution(p); });
    area.querySelectorAll('.mb-opt').forEach((b) =>
      b.addEventListener('click', () => this.answer(b.dataset.v, p, b)));
    setTimeout(() => this.readAloud(p, opts), 500);
  },

  // ---------- interactive "build the word" (spell / phonics) ----------
  renderSpell(p) {
    const area = document.getElementById('english-game');
    const total = this.chapter.problems.length;
    const pct = (this.idx / total) * 100;
    const letters = p.word.split('');
    const extra = 'aeiousrtnpbdmghl'.split('').filter((c) => !letters.includes(c)).slice(0, 2);
    const pool = [...letters, ...extra].sort(() => Math.random() - 0.5);

    area.innerHTML = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p class="mb-count">Activity ${this.idx + 1} of ${total}</p>
      <div class="mb-problem">
        <p class="mb-q eb-bigq">${this.tappable(p.q)}</p>
        <div class="eb-pic" style="font-size:84px">${p.emoji || '🔤'}</div>
        <button class="eb-saybtn read" id="eb-hear">🔊 Hear the word</button>
        <div class="word-slots" id="eb-slots">${letters.map(() => '<div class="word-slot"></div>').join('')}</div>
        <div class="letter-tiles" id="eb-tiles">${pool.map((l, i) => `<button class="letter-tile" data-l="${l}" data-i="${i}">${l.toUpperCase()}</button>`).join('')}</div>
        <button class="btn-fun green" id="eb-check">Check ✓</button>
        <button class="mb-help" id="eb-help">🤔 Show me how</button>
        <div class="mb-steps" id="eb-steps"></div>
      </div>`;

    this.wireWordTaps(area);
    document.getElementById('eb-hear').addEventListener('click', () => Speech.speakWord(p.word));
    area.querySelectorAll('#eb-tiles .letter-tile').forEach((t) =>
      t.addEventListener('click', () => this.pickLetter(t)));
    document.getElementById('eb-check').addEventListener('click', () => this.checkSpell(p));
    document.getElementById('eb-help').addEventListener('click', () => { this.usedHelp = true; this.showSolution(p); });
    setTimeout(() => { Speech.speak('Build the word'); setTimeout(() => Speech.speakWord(p.word), 700); }, 400);
  },

  pickLetter(tile) {
    if (tile.classList.contains('used')) return;
    const slots = document.querySelectorAll('#eb-slots .word-slot');
    const empty = [...slots].findIndex((s) => !s.textContent);
    if (empty === -1) return;
    slots[empty].textContent = tile.dataset.l.toUpperCase();
    tile.classList.add('used');
    this.builtWord.push(tile.dataset.l);
    Sounds.tap();
    Speech.speakWord(tile.dataset.l); // hear each letter sound = phonics
  },

  resetSpell() {
    this.builtWord = [];
    document.querySelectorAll('#eb-slots .word-slot').forEach((s) => (s.textContent = ''));
    document.querySelectorAll('#eb-tiles .letter-tile').forEach((t) => t.classList.remove('used'));
  },

  checkSpell(p) {
    const attempt = this.builtWord.join('');
    if (attempt === p.word) {
      Sounds.correct();
      Rewards.confetti(this.usedHelp ? 14 : 26);
      const first = this.triesThisProblem === 0 && !this.usedHelp;
      const coins = first ? 10 : 4;
      Store.addReward(this.playerId, { coins, stars: first ? 1 : 0, xp: 10 });
      Store.bumpStreak(this.playerId, true);
      Store.trackAnswer(this.playerId, 'english', true);
      this.correctCount += first ? 1 : 0;
      Speech.speakWord(p.word);
      Rewards.showToast(first ? `You spelled it! +${coins} 🪙` : `You got it! +${coins} 🪙`);
      App.refreshStats();
      document.getElementById('eb-check').style.pointerEvents = 'none';
      setTimeout(() => { this.idx++; this.renderProblem(); }, 1200);
    } else {
      this.triesThisProblem++;
      Sounds.wrong();
      Store.bumpStreak(this.playerId, false);
      Store.trackAnswer(this.playerId, 'english', false);
      Rewards.showToast('Almost! Let me show you. 💡');
      this.showSolution(p);
    }
  },

  answer(val, p, btn) {
    if (btn.classList.contains('disabled-opt')) return;
    if (String(val) === String(p.a)) {
      btn.classList.add('correct');
      document.querySelectorAll('.mb-opt').forEach((b) => (b.style.pointerEvents = 'none'));
      Sounds.correct();
      Rewards.confetti(this.usedHelp ? 14 : 26);
      const first = this.triesThisProblem === 0 && !this.usedHelp;
      const coins = first ? 10 : 4;
      Store.addReward(this.playerId, { coins, stars: first ? 1 : 0, xp: 10 });
      Store.bumpStreak(this.playerId, true);
      Store.trackAnswer(this.playerId, 'english', true);
      this.correctCount += first ? 1 : 0;
      Speech.speak(String(p.a)); // hear the right answer read back
      Rewards.showToast(first ? `Great reading! +${coins} 🪙` : `You got it! +${coins} 🪙`);
      App.refreshStats();
      setTimeout(() => { this.idx++; this.renderProblem(); }, 1100);
    } else {
      this.triesThisProblem++;
      btn.classList.add('wrong');
      btn.classList.add('disabled-opt');
      btn.style.pointerEvents = 'none';
      Sounds.wrong();
      Store.bumpStreak(this.playerId, false);
      Store.trackAnswer(this.playerId, 'english', false);
      Rewards.showToast('Almost! Let me show you. 💡');
      this.showSolution(p);
    }
  },

  // Reveal the worked solution step-by-step (animated + narrated), then let her retry.
  showSolution(p) {
    const steps = this.steps(p);
    const box = document.getElementById('eb-steps');
    document.getElementById('eb-help').style.display = 'none';
    box.innerHTML = '';
    let i = 0;
    const run = () => {
      if (i >= steps.length) {
        if (p.skill === 'spell') {
          this.resetSpell();
          document.getElementById('eb-check').style.pointerEvents = '';
          this.appendTip(box, '👇 Now build it yourself!');
        } else {
          document.querySelectorAll('.mb-opt').forEach((b) => {
            b.classList.remove('disabled-opt');
            b.style.pointerEvents = '';
            if (String(b.dataset.v) === String(p.a)) b.classList.add('hint-glow');
          });
          this.appendTip(box, '👇 Now tap the answer!');
        }
        return;
      }
      const s = steps[i];
      const row = document.createElement('div');
      row.className = 'mb-step pop-in';
      row.innerHTML = `<span class="mb-step-num">${i + 1}</span><span>${this.tappable(s.text)}</span>`;
      box.appendChild(row);
      this.wireWordTaps(box);
      Speech.speak(s.text);
      i++;
      setTimeout(run, 1600);
    };
    run();
  },

  appendTip(box, text) {
    const tip = document.createElement('p');
    tip.className = 'mb-retry-tip';
    tip.textContent = text;
    box.appendChild(tip);
  },

  finish() {
    const total = this.chapter.problems.length;
    const ratio = total ? this.correctCount / total : 1;
    let stars = 1;
    if (ratio >= 0.6) stars = 2;
    if (ratio >= 0.9) stars = 3;
    Store.completeLevel(this.playerId, 'english', this.chapter.id, stars);
    Store.addReward(this.playerId, { coins: stars * 10, xp: 20 });
    Store.logActivity(this.playerId, `English Book: ${this.chapter.title} — ${stars}⭐`);
    if (typeof Pet !== 'undefined' && Pet.onLessonComplete) Pet.onLessonComplete(this.playerId);
    Store.checkBadges(this.playerId);
    Sounds.cheer();
    Rewards.confetti(60);
    Rewards.showPopup({
      emoji: stars === 3 ? '💎' : '🏆',
      title: 'Lesson Complete!',
      text: `${'⭐'.repeat(stars)} You finished ${this.chapter.title}! +${stars * 10} 🪙 for the puppies!`,
      onOk: () => { this.showChapters(); App.refreshStats(); },
    });
  },

  // ---------- tap-any-word-to-hear ----------
  tappable(str) {
    return String(str).split(/(\s+)/).map((tok) => {
      if (!tok.trim()) return tok;
      const clean = tok.replace(/[^A-Za-z'-]/g, '');
      if (!clean) return this.esc(tok);
      return `<span class="eb-word" data-w="${this.esc(clean)}">${this.esc(tok)}</span>`;
    }).join('');
  },

  wireWordTaps(scope) {
    scope.querySelectorAll('.eb-word').forEach((el) => {
      if (el._ebBound) return;
      el._ebBound = true;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        Speech.speakWord(el.dataset.w);
        el.classList.add('eb-ping');
        setTimeout(() => el.classList.remove('eb-ping'), 360);
      });
    });
  },

  readAloud(p, opts) {
    const choices = (opts || []).join(', ');
    Speech.speak(`${this.say(p)}. ${choices ? 'Is it ' + choices + '?' : ''}`);
  },

  // ---------- answer options ----------
  options(p) {
    return p.options.slice().sort(() => Math.random() - 0.5);
  },

  esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  // ---------- narration ----------
  say(p) {
    return String(p.q).replace(/___/g, 'blank').replace(/[-–]/g, ' ').replace('?', '');
  },

  // ---------- visuals ----------
  visual(p) {
    if (p.skill === 'blend' && p.blend) {
      const tiles = p.blend.split('-').map((s) => `<span data-w="${this.esc(s.trim())}">${this.esc(s.trim())}</span>`).join('');
      return `<div class="eb-blend">${tiles}</div>${p.emoji ? `<div class="eb-pic">${p.emoji}</div>` : ''}`;
    }
    return p.emoji ? `<div class="eb-pic">${p.emoji}</div>` : '';
  },

  // ---------- worked solution steps ----------
  steps(p) {
    if (p.skill === 'spell') {
      return [
        { text: `The word is ${p.word.toUpperCase().split('').join(' - ')}.` },
        { text: `Put the sounds together: ${p.word}!` },
      ];
    }
    return [
      { text: p.why || `The answer is "${p.a}".` },
      { text: `So the answer is "${p.a}".` },
    ];
  },
};
