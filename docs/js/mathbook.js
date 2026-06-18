// ===== MATH BOOK: learning-first guided solver (book-faithful, self-correcting) =====
const MathBook = {
  data: null,
  chapter: null,
  idx: 0,
  correctCount: 0,
  triesThisProblem: 0,
  usedHelp: false,
  playerId: null,

  async load() {
    if (this.data) return this.data;
    try {
      const res = await fetch(AppConfig.url('data/math_book.json'));
      this.data = await res.json();
    } catch {
      this.data = { chapters: [] };
    }
    return this.data;
  },

  async open() {
    this.playerId = App.playerId;
    await this.load();
    this.showChapters();
  },

  progressText() {
    const total = this.data?.chapters?.length || 0;
    let done = 0;
    (this.data?.chapters || []).forEach((c) => {
      if (Store.getLevelStars(this.playerId, 'math', c.id)) done++;
    });
    return `${done}/${total}`;
  },

  showChapters() {
    document.getElementById('math-game').classList.add('hidden');
    const picker = document.getElementById('math-level-picker');
    picker.classList.remove('hidden');
    const chs = this.data.chapters;
    picker.innerHTML = chs.map((c, i) => {
      const stars = Store.getLevelStars(this.playerId, 'math', c.id);
      const locked = i > 0 && !Store.getLevelStars(this.playerId, 'math', chs[i - 1].id);
      return `
        <button class="level-card ${locked ? 'locked' : ''} ${stars ? 'done' : ''}" data-id="${c.id}">
          <span class="level-emoji">${c.icon}</span>
          <div class="level-info"><h3>${i + 1}. ${c.title}</h3><p>${c.problems.length} problems</p></div>
          <span class="level-stars">${stars ? '⭐'.repeat(stars) : locked ? '🔒' : '▶️'}</span>
        </button>`;
    }).join('');
    picker.querySelectorAll('.level-card:not(.locked)').forEach((card) => {
      card.addEventListener('click', () => { Sounds.tap(); this.startChapter(card.dataset.id); });
    });
    Speech.navSay('Pick a math lesson! We learn step by step.');
  },

  startChapter(id) {
    this.chapter = this.data.chapters.find((c) => c.id === id);
    this.idx = 0;
    this.correctCount = 0;
    document.getElementById('math-level-picker').classList.add('hidden');
    document.getElementById('math-game').classList.remove('hidden');
    this.renderConcept();
  },

  renderConcept() {
    const area = document.getElementById('math-game');
    const ci = this.data.chapters.indexOf(this.chapter);
    const coach = (typeof PUPPIES !== 'undefined' && PUPPIES.length)
      ? PUPPIES[(ci < 0 ? 0 : ci) % PUPPIES.length] : null;
    const mascot = coach
      ? `<img class="mb-mascot" src="${AppConfig.url(coach.photo)}" alt="${coach.name}" style="width:96px;height:96px;border-radius:50%;border:4px solid #fff;box-shadow:0 8px 18px rgba(0,0,0,.18);object-fit:cover">`
      : `<div class="mb-concept-icon">${this.chapter.icon}</div>`;
    const tip = this.chapter.tip
      ? `<div class="mb-tip" style="background:#fff7d6;border:2px dashed #ffcf3f;border-radius:16px;padding:12px 14px;margin:4px 0 16px;font-weight:700;color:#7a5a00;text-align:left">🦴 <b>${coach ? this.esc(coach.name) + "'s" : 'Puppy'} Tip:</b> ${this.esc(this.chapter.tip)}</div>`
      : '';
    area.innerHTML = `
      <div class="mb-concept">
        ${mascot}
        <h2>${this.chapter.icon} ${this.esc(this.chapter.title)}</h2>
        <p>${this.esc(this.chapter.concept)}</p>
        ${tip}
        <button class="btn-fun green btn-big" id="mb-start">Let's Go, Champion! ▶️</button>
      </div>`;
    document.getElementById('mb-start').addEventListener('click', () => { Sounds.tap(); this.renderProblem(); });
    Speech.speak(this.chapter.concept + (this.chapter.tip ? `. ${coach ? coach.name + "'s" : ''} tip: ${this.chapter.tip}` : ''));
  },

  renderProblem() {
    this.triesThisProblem = 0;
    this.usedHelp = false;
    const p = this.chapter.problems[this.idx];
    if (!p) return this.finish();
    const area = document.getElementById('math-game');
    const total = this.chapter.problems.length;
    const pct = (this.idx / total) * 100;
    const opts = this.options(p);

    area.innerHTML = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${pct}%"></div></div>
      <p class="mb-count">Problem ${this.idx + 1} of ${total}</p>
      <div class="mb-problem">
        <p class="mb-q">${this.esc(p.q)} <button class="mb-read" id="mb-read" title="Read aloud">🔊</button></p>
        <div class="mb-visual" id="mb-visual">${this.visual(p)}</div>
        <div class="mb-options" id="mb-options">
          ${opts.map((o) => `<button class="mb-opt" data-v="${this.esc(o)}">${this.esc(o)}</button>`).join('')}
        </div>
        <button class="mb-help" id="mb-help">🤔 Show me how</button>
        <div class="mb-steps" id="mb-steps"></div>
      </div>`;

    document.getElementById('mb-read').addEventListener('click', () => Speech.speak(this.say(p)));
    document.getElementById('mb-help').addEventListener('click', () => { this.usedHelp = true; this.showSolution(p); });
    area.querySelectorAll('.mb-opt').forEach((b) =>
      b.addEventListener('click', () => this.answer(b.dataset.v, p, b)));
    Speech.navSay(this.say(p));
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
      this.correctCount += first ? 1 : 0;
      const cheers = ['Pawsome! 🐾', "You're a math champion! 🏆", 'Brilliant! ⭐', 'Woohoo! 🎉', 'Top of the class! 🌟', 'The puppies are cheering! 🐶'];
      const cheer = first ? cheers[Math.floor(Math.random() * cheers.length)] : 'You fixed it! 💪';
      Rewards.showToast(`${cheer} +${coins} 🪙`);
      App.refreshStats();
      setTimeout(() => { this.idx++; this.renderProblem(); }, 1100);
    } else {
      this.triesThisProblem++;
      btn.classList.add('wrong');
      btn.classList.add('disabled-opt');
      btn.style.pointerEvents = 'none';
      Sounds.wrong();
      Store.bumpStreak(this.playerId, false);
      Rewards.showToast('Almost! Let me show you. 💡');
      this.showSolution(p);
    }
  },

  // Reveal the worked solution step-by-step (animated + narrated), then let them retry.
  showSolution(p) {
    const steps = this.steps(p);
    const box = document.getElementById('mb-steps');
    const visual = document.getElementById('mb-visual');
    document.getElementById('mb-help').style.display = 'none';
    box.innerHTML = '';
    let i = 0;
    const run = () => {
      if (i >= steps.length) {
        // highlight the correct option and invite a retry
        document.querySelectorAll('.mb-opt').forEach((b) => {
          b.classList.remove('disabled-opt');
          b.style.pointerEvents = '';
          if (String(b.dataset.v) === String(p.a)) b.classList.add('hint-glow');
        });
        const tip = document.createElement('p');
        tip.className = 'mb-retry-tip';
        tip.textContent = '👇 Now tap the answer!';
        box.appendChild(tip);
        return;
      }
      const s = steps[i];
      if (s.visual !== undefined && visual) visual.innerHTML = s.visual;
      const row = document.createElement('div');
      row.className = 'mb-step pop-in';
      row.innerHTML = `<span class="mb-step-num">${i + 1}</span><span>${this.esc(s.text)}</span>`;
      box.appendChild(row);
      Speech.speak(s.text);
      i++;
      setTimeout(run, 1400);
    };
    run();
  },

  finish() {
    const total = this.chapter.problems.length;
    const ratio = total ? this.correctCount / total : 1;
    let stars = 1;
    if (ratio >= 0.6) stars = 2;
    if (ratio >= 0.9) stars = 3;
    Store.completeLevel(this.playerId, 'math', this.chapter.id, stars);
    Store.addReward(this.playerId, { coins: stars * 10, xp: 20 });
    Store.logActivity(this.playerId, `Math Book: ${this.chapter.title} — ${stars}⭐`);
    Store.checkBadges(this.playerId);
    Sounds.cheer();
    Rewards.confetti(60);
    Rewards.showPopup({
      emoji: stars === 3 ? '💎' : '🏆',
      title: 'Lesson Complete!',
      text: `${'⭐'.repeat(stars)} You solved ${this.chapter.title}! +${stars * 10} 🪙 for the puppies!`,
      onOk: () => { this.showChapters(); App.refreshStats(); },
    });
  },

  // ---------- answer options ----------
  options(p) {
    if (p.options) return p.options.slice();
    const set = new Set([p.a]);
    let spread = 1;
    while (set.size < 4) {
      const cand = p.a + (Math.random() < 0.5 ? -spread : spread);
      if (cand >= 0) set.add(cand);
      spread++;
      if (spread > 8) { set.add(p.a + set.size); }
    }
    return [...set].sort(() => Math.random() - 0.5);
  },

  esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  // ---------- narration ----------
  say(p) {
    return p.q.replace('?', '').replace('_', 'what').replace('−', 'minus').replace('+', 'plus');
  },

  // ---------- static visuals per skill ----------
  row(emoji, n, crossed = 0) {
    let out = '';
    for (let k = 0; k < n; k++) {
      out += `<span class="mb-obj ${k < crossed ? 'crossed' : ''}">${emoji}</span>`;
    }
    return `<div class="mb-objects">${out}</div>`;
  },

  numlineHtml(p, markAt) {
    const lo = Math.min(p.start, p.a) - 1;
    const hi = Math.max(p.start, p.a) + 1;
    const mark = markAt === undefined ? p.start : markAt;
    let ticks = '';
    for (let v = lo; v <= hi; v++) {
      ticks += `<span class="mb-tick ${v === mark ? 'here' : ''}">${v}</span>`;
    }
    return `<div class="mb-numline">${ticks}</div>`;
  },

  imageHtml(p) {
    return p.image ? `<div class="mb-image"><img src="${AppConfig.url(p.image)}" alt="" loading="lazy" onerror="this.parentElement.style.display='none'"></div>` : '';
  },

  visual(p) {
    if (p.skill === 'count') return this.imageHtml(p) + this.row(p.emoji, p.n);
    if (p.skill === 'crossout') return this.imageHtml(p) + this.row(p.emoji, p.n, 0);
    if (p.skill === 'add') {
      return this.imageHtml(p) + `<div class="mb-add">${this.row(p.emoji, p.x)}<span class="mb-plus">➕</span>${this.row(p.emoji, p.y)}</div>`;
    }
    if (p.skill === 'numberline') return this.numlineHtml(p);
    return this.imageHtml(p); // pick: optional book image + question text
  },

  // ---------- worked solution steps per skill ----------
  steps(p) {
    if (p.skill === 'count') {
      return [
        { text: `Let's count them one by one.`, visual: this.row(p.emoji, p.n) },
        { text: `1, 2, 3 … all the way to ${p.a}.`, visual: this.row(p.emoji, p.n) },
        { text: `There are ${p.a} altogether. The answer is ${p.a}!`, visual: this.row(p.emoji, p.n) },
      ];
    }
    if (p.skill === 'crossout') {
      return [
        { text: `Start with ${p.n} ${p.emoji}.`, visual: this.row(p.emoji, p.n, 0) },
        { text: `Take away ${p.take} — cross them out.`, visual: this.row(p.emoji, p.n, p.take) },
        { text: `Count what is left: ${p.a}. So ${p.n} − ${p.take} = ${p.a}!`, visual: this.row(p.emoji, p.n, p.take) },
      ];
    }
    if (p.skill === 'add') {
      return [
        { text: `Here are ${p.x} and ${p.y}.`, visual: `<div class="mb-add">${this.row(p.emoji, p.x)}<span class="mb-plus">➕</span>${this.row(p.emoji, p.y)}</div>` },
        { text: `Put them together and count them all.`, visual: this.row(p.emoji, p.x + p.y) },
        { text: `That makes ${p.a}. So ${p.x} + ${p.y} = ${p.a}!`, visual: this.row(p.emoji, p.x + p.y) },
      ];
    }
    if (p.skill === 'numberline') {
      const dir = p.op === '+' ? 'forward' : 'back';
      return [
        { text: `Start at ${p.start} on the number line.`, visual: this.numlineHtml(p, p.start) },
        { text: `Hop ${dir} ${p.step} ${p.step === 1 ? 'step' : 'steps'} (${p.op}${p.step}).`, visual: this.numlineHtml(p, p.a) },
        { text: `You land on ${p.a}. So ${p.q.replace(' = ?', '')} = ${p.a}!`, visual: this.numlineHtml(p, p.a) },
      ];
    }
    // pick
    return [
      { text: p.why || `The answer is ${p.a}.` },
      { text: `So the answer is ${p.a}!` },
    ];
  },
};
