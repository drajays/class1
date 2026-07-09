// ===== SUBJECT BOOK: shared book-faithful engine for EVS, Sanskrit, Computer =====
// Mirrors MathBook and EnglishBook. Content in docs/data/<subject>_book.json.
// Learning first: kid-friendly concept intros, guided problem solver, step-by-step
// worked solutions on wrong answers (never punish), tap-to-hear words, TTS in target lang.
// Reuses mb-* classes + self-injected sb-* styles (zero edits to style.css).
const SubjectBook = {
  dataCache: {},
  subject: null,
  data: null,
  chapter: null,
  idx: 0,
  correctCount: 0,
  triesThisProblem: 0,
  usedHelp: false,
  playerId: null,

  async load(subject) {
    if (this.dataCache[subject]) return this.dataCache[subject];
    try {
      const res = await fetch(AppConfig.url(`data/${subject}_book.json`));
      const data = await res.json();
      this.dataCache[subject] = data;
      return data;
    } catch {
      const empty = { subject, title: subject.toUpperCase(), icon: '📘', lang: 'en-IN', chapters: [] };
      this.dataCache[subject] = empty;
      return empty;
    }
  },

  async loadAll() {
    await Promise.all(['evs', 'sanskrit', 'computer', 'english_plus', 'math_challenge'].map((s) => this.load(s)));
  },

  async open(subject) {
    this.subject = subject;
    this.playerId = App.playerId;
    this.injectStyles();
    this.data = await this.load(subject);
    this.showChapters();
  },

  // Self-contained runtime styles to ensure zero edits to shared style.css
  injectStyles() {
    if (document.getElementById('sb-styles')) return;
    const s = document.createElement('style');
    s.id = 'sb-styles';
    s.textContent = `
      .sb-word{cursor:pointer;border-radius:7px;padding:0 2px;transition:background .12s,transform .12s;display:inline-block}
      .sb-word:hover{background:#fff0a8}
      .sb-word.sb-ping{background:#ffd34d;animation:sb-pop .35s}
      @keyframes sb-pop{0%{transform:scale(1)}45%{transform:scale(1.3)}100%{transform:scale(1)}}
      .sb-concept{text-align:center;padding:10px 8px 16px}
      .sb-concept-emoji{font-size:84px;line-height:1;margin:6px 0;animation:sb-bob 2.2s ease-in-out infinite}
      @keyframes sb-bob{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-8px) rotate(3deg)}}
      .sb-concept h2{font-size:1.75rem;margin:8px 0;color:#2b2660}
      .sb-concept-text{font-size:1.35rem;line-height:1.7;font-weight:600;color:#3a3470;max-width:560px;margin:8px auto 14px}
      .sb-tip-box{background:linear-gradient(135deg,#fff8db,#ffeed1);border:3px solid #ffd166;border-radius:16px;padding:12px 16px;margin:12px auto;max-width:520px;font-size:1.15rem;font-weight:700;color:#5a3800}
      .sb-saybtn{display:inline-flex;align-items:center;gap:6px;border:none;border-radius:18px;font-weight:800;font-size:1.05rem;padding:10px 16px;margin:6px 5px;cursor:pointer;font-family:inherit;transition:transform .1s}
      .sb-saybtn.read{background:linear-gradient(135deg,#7c5cff,#b98bff);color:#fff}
      .sb-saybtn.say{background:linear-gradient(135deg,#ff8a3d,#ffc24d);color:#5a2d00}
      .sb-saybtn:active{transform:scale(.95)}
      .sb-pic{font-size:72px;text-align:center;margin:10px 0}
      .sb-hint{text-align:center;color:#7a72c9;font-weight:700;margin:4px 0 6px;font-size:.95rem}
    `;
    document.head.appendChild(s);
  },

  progressText(subject) {
    const data = this.dataCache[subject];
    if (!data || !data.chapters || !data.chapters.length) return '0/0';
    const total = data.chapters.length;
    let done = 0;
    data.chapters.forEach((c) => {
      if (Store.getLevelStars(this.playerId || App.playerId, subject, c.id)) done++;
    });
    return `${done}/${total}`;
  },

  showChapters() {
    const gameArea = document.getElementById('sb-game');
    const picker = document.getElementById('sb-level-picker');
    const headerTitle = document.getElementById('sb-header-title');
    if (headerTitle) headerTitle.textContent = `${this.data.icon || '📘'} ${this.data.title || this.subject.toUpperCase()}`;
    if (gameArea) gameArea.classList.add('hidden');
    if (picker) {
      picker.classList.remove('hidden');
      const chs = this.data.chapters || [];
      if (!chs.length) {
        picker.innerHTML = '<p class="hint" style="text-align:center;padding:40px;font-size:1.2rem">More lessons coming soon! 🐶📚</p>';
        return;
      }
      picker.innerHTML = chs.map((c, i) => {
        const stars = Store.getLevelStars(this.playerId, this.subject, c.id);
        let isLocked = false;
        let lockReason = 'Complete previous chapter to unlock!';
        if (c.reqTopic) {
          const reqStars = Store.getLevelStars(this.playerId, 'math', c.reqTopic);
          isLocked = reqStars < 2;
          if (isLocked) lockReason = `Unlock with ⭐⭐ in Math Book: ${c.reqTitle || c.reqTopic}`;
        } else {
          isLocked = (i > 0) && (Store.getLevelStars(this.playerId, this.subject, chs[i - 1].id) === 0);
        }
        return `
          <button class="level-card ${stars ? 'done' : ''} ${isLocked ? 'locked' : ''}" data-id="${c.id}" data-locked="${isLocked ? '1' : ''}" data-reason="${lockReason}">
            <span class="level-emoji">${c.icon || '📘'}</span>
            <div class="level-info"><h3>${i + 1}. ${c.title}</h3><p>${(c.problems || []).length} activities</p></div>
            <span class="level-stars">${isLocked ? '🔒' : (stars ? '⭐'.repeat(stars) : '▶️')}</span>
          </button>`;
      }).join('');
      picker.querySelectorAll('.level-card').forEach((card) => {
        card.addEventListener('click', () => {
          if (card.dataset.locked === '1') {
            Sounds.wrong();
            Rewards.showToast('🔒 ' + (card.dataset.reason || 'Complete previous chapter to unlock!'));
            return;
          }
          Sounds.tap();
          this.startChapter(card.dataset.id);
        });
      });
    }
    Speech.navSay(`Welcome to ${this.data.title || this.subject}! Pick a lesson. Tap any word to hear it.`);
  },

  startChapter(id) {
    this.chapter = (this.data.chapters || []).find((c) => c.id === id);
    this.idx = 0;
    this.correctCount = 0;
    document.getElementById('sb-level-picker')?.classList.add('hidden');
    document.getElementById('sb-game')?.classList.remove('hidden');
    this.renderConcept();
  },

  renderConcept() {
    const area = document.getElementById('sb-game');
    if (!area || !this.chapter) return;
    const c = this.chapter;
    const lang = this.data.lang || 'en-IN';
    const introText = Array.isArray(c.concept?.intro) ? c.concept.intro.join(' ') : (c.concept?.intro || '');
    const tipText = c.concept?.tip || '';

    area.innerHTML = `
      <div class="sb-concept">
        <div class="sb-concept-emoji">${c.icon || '📘'}</div>
        <h2>${this.tappable(c.title)}</h2>
        <p class="sb-hint">👆 Tap any word to hear it!</p>
        <div class="sb-concept-text">${this.tappable(introText)}</div>
        ${tipText ? `<div class="sb-tip-box">💡 <b>Memory Tip:</b><br>${this.tappable(tipText)}</div>` : ''}
        <div>
          <button class="sb-saybtn read" id="sb-readme">🔊 Read to me</button>
          <button class="sb-saybtn say speech-pause-btn" id="sb-pauseme" style="background:#ECC94B; color:#744210;">⏸️ Pause Voice</button>
          <button class="sb-saybtn say" id="sb-sayit">🎤 Say it with me!</button>
        </div>
        <button class="btn-fun green btn-big" id="sb-start" style="margin-top:16px">Let's Play! ▶️</button>
      </div>`;

    this.wireWordTaps(area, lang);
    document.getElementById('sb-readme')?.addEventListener('click', () => Speech.speak(introText + '. ' + tipText, 0.85, lang));
    document.getElementById('sb-pauseme')?.addEventListener('click', () => { Sounds.tap(); Speech.togglePause(); });
    document.getElementById('sb-sayit')?.addEventListener('click', () => {
      Rewards.showToast('Your turn! Say it out loud 🗣️');
      Speech.speak(introText, 0.85, lang);
    });
    document.getElementById('sb-start')?.addEventListener('click', () => { Sounds.tap(); this.renderProblem(); });
    setTimeout(() => Speech.speak(introText, 0.85, lang), 400);
  },

  renderProblem() {
    this.triesThisProblem = 0;
    this.usedHelp = false;
    const area = document.getElementById('sb-game');
    if (!area) return;
    const problems = this.chapter?.problems || [];
    const p = problems[this.idx];
    if (!p) return this.finish();

    const total = problems.length;
    const pct = (this.idx / total) * 100;
    const lang = this.data.lang || 'en-IN';
    const opts = this.options(p);

    area.innerHTML = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p class="mb-count">Activity ${this.idx + 1} of ${total}</p>
      <div class="mb-problem">
        <p class="sb-hint">👆 Tap any word to hear it!</p>
        <p class="mb-q" style="font-size:1.5rem;line-height:1.6;color:#2b2660;text-align:center;font-weight:800">${this.tappable(p.q)} <button class="sb-saybtn read" id="sb-read" style="padding:6px 12px;font-size:.9rem">▶️ Read All</button></p>
        ${p.emoji ? `<div class="sb-pic">${p.emoji}</div>` : ''}
        <div class="mb-options" id="sb-options">
          ${opts.map((o) => `<button class="mb-opt" data-v="${this.esc(o)}">${this.esc(o)}</button>`).join('')}
        </div>
        <button class="mb-help" id="sb-help">🤔 Show me how</button>
        <div class="mb-steps" id="sb-steps"></div>
      </div>`;

    this.wireWordTaps(area, lang);
    document.getElementById('sb-read')?.addEventListener('click', () => this.readAloud(p, opts, lang));
    document.getElementById('sb-help')?.addEventListener('click', () => { this.usedHelp = true; this.showSolution(p, lang); });
    area.querySelectorAll('.mb-opt').forEach((b) =>
      b.addEventListener('click', () => this.answer(b.dataset.v, p, b, lang)));
    setTimeout(() => this.readAloud(p, opts, lang), 400);
  },

  answer(val, p, btn, lang) {
    if (btn.classList.contains('disabled-opt')) return;
    if (String(val) === String(p.a)) {
      btn.classList.add('correct');
      document.querySelectorAll('#sb-options .mb-opt').forEach((b) => (b.style.pointerEvents = 'none'));
      Sounds.correct();
      Rewards.confetti(this.usedHelp ? 14 : 26);
      const first = this.triesThisProblem === 0 && !this.usedHelp;
      const coins = first ? 10 : 4;
      const solved = Store.getLevelStars(this.playerId, this.subject, this.chapter.id) > 0;
      if (!solved) {
        Store.addReward(this.playerId, { coins, stars: first ? 1 : 0, xp: 10 });
      } else {
        Store.addReward(this.playerId, { coins: 0, stars: 0, xp: 5 });
      }
      Store.bumpStreak(this.playerId, true);
      Store.trackAnswer(this.playerId, this.subject, true);
      this.correctCount += first ? 1 : 0;
      Speech.speak(String(p.a), 0.85, lang);
      Rewards.showToast(!solved ? (first ? `Great job! +${coins} 🪙` : `You got it! +${coins} 🪙`) : (first ? `Great job! (Practice mode)` : `You got it! (Practice mode)`));
      App.refreshStats();
      setTimeout(() => { this.idx++; this.renderProblem(); }, 1100);
    } else {
      this.triesThisProblem++;
      btn.classList.add('wrong');
      btn.classList.add('disabled-opt');
      btn.style.pointerEvents = 'none';
      Sounds.wrong();
      Store.bumpStreak(this.playerId, false);
      Store.trackAnswer(this.playerId, this.subject, false);
      Rewards.showToast('Almost! Let me show you. 💡');
      this.showSolution(p, lang);
    }
  },

  showSolution(p, lang) {
    const box = document.getElementById('sb-steps');
    const helpBtn = document.getElementById('sb-help');
    if (helpBtn) helpBtn.style.display = 'none';
    if (!box) return;
    box.innerHTML = '';
    const whyText = p.why || `The correct answer is "${p.a}".`;
    const row = document.createElement('div');
    row.className = 'mb-step pop-in';
    row.innerHTML = `<span class="mb-step-num">💡</span><span>${this.tappable(whyText)}</span>`;
    box.appendChild(row);
    this.wireWordTaps(box, lang);
    Speech.speak(whyText, 0.85, lang);

    setTimeout(() => {
      document.querySelectorAll('#sb-options .mb-opt').forEach((b) => {
        b.classList.remove('disabled-opt');
        b.style.pointerEvents = '';
        if (String(b.dataset.v) === String(p.a)) b.classList.add('hint-glow');
      });
      const tip = document.createElement('p');
      tip.className = 'mb-retry-tip';
      tip.textContent = '👇 Now tap the correct answer!';
      box.appendChild(tip);
    }, 1800);
  },

  finish() {
    const total = (this.chapter?.problems || []).length;
    const ratio = total ? this.correctCount / total : 1;
    let stars = 1;
    if (ratio >= 0.6) stars = 2;
    if (ratio >= 0.9) stars = 3;
    const res = Store.awardLevel(this.playerId, this.subject, this.chapter.id, stars, stars * 10, {
      total,
      title: this.chapter.title,
      level: this.chapter.level || 1,
      wrong: total - this.correctCount
    });
    Store.logActivity(this.playerId, `${this.data.title || this.subject}: ${this.chapter.title} — ${stars}⭐`);
    if (typeof Pet !== 'undefined' && Pet.onLessonComplete) Pet.onLessonComplete(this.playerId);
    Store.checkBadges(this.playerId);
    Sounds.cheer();
    Rewards.confetti(60);

    let text = `${'⭐'.repeat(stars)} You finished ${this.chapter.title}! +${res.coins} 🪙 for the puppies!`;
    let title = 'Lesson Complete!';
    let btnText = 'OK';
    let onOk = () => { this.showChapters(); App.refreshStats(); };

    if (!res.firstTime && !res.improved) {
      title = 'Practice Superstar! 🌟';
      text = `${'⭐'.repeat(stars)} Practice superstar! The puppies are full — feed them with something NEW! 🦴`;
      Speech.speak("Practice superstar! The puppies are full — feed them with something new!");
      const unsolved = (this.data?.chapters || []).find(c => Store.getLevelStars(this.playerId, this.subject, c.id) === 0);
      if (unsolved) {
        btnText = 'Next mission ➜';
        onOk = () => { this.startChapter(unsolved.id); App.refreshStats(); };
      }
    } else if (res.improved) {
      title = 'New Star Record! 🌟';
      text = `${'⭐'.repeat(stars)} Amazing improvement! +${res.coins} 🪙 difference earned for the puppies!`;
    }

    Rewards.showPopup({
      emoji: stars === 3 ? '💎' : '🏆',
      title,
      text,
      onOk,
      btnText,
    });
  },

  tappable(str) {
    return String(str || '').split(/(\s+)/).map((tok) => {
      if (!tok.trim()) return tok;
      const clean = tok.replace(/[^A-Za-z\u0900-\u097F'-]/g, '');
      if (!clean) return this.esc(tok);
      return `<span class="sb-word" data-w="${this.esc(clean)}">${this.esc(tok)}</span>`;
    }).join('');
  },

  wireWordTaps(scope, lang) {
    scope.querySelectorAll('.sb-word').forEach((el) => {
      if (el._sbBound) return;
      el._sbBound = true;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        Speech.speak(el.dataset.w, 0.8, lang);
        el.classList.add('sb-ping');
        setTimeout(() => el.classList.remove('sb-ping'), 360);
      });
    });
  },

  readAloud(p, opts, lang) {
    const choices = (opts || []).join(', ');
    Speech.speak(`${p.q} ${choices ? 'Is it ' + choices + '?' : ''}`, 0.85, lang);
  },

  options(p) {
    const arr = (p.options || []).slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  esc(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },
};
