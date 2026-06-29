// ===== HINDI VARNAMALA: learning-first svar / vyanjan / matra / shabd practice =====
// A tap-to-hear Hindi module for an early learner (Advaita) who is still shaky on
// vyanjan (consonants), svar (vowels), matra (vowel signs) and 2–5 akshar words.
// EVERYTHING is touch-to-hear: tap any letter / akshar / word and it is read aloud.
// Plus a "सुनो और ढूँढो" (listen & find) practice that ties into the coin economy.
//
// Fully self-contained: all data is embedded here (standard varnamala, not from a
// book) and all CSS is injected as `hb-*` classes — NO edits to shared style.css.
// Uses the existing Speech (TTS) + Store (coins/stars) + Rewards (confetti) helpers.
// See COORDINATION.md.
const HindiBook = {
  playerId: null,
  tab: 'svar',
  matraBase: 'क',
  // practice state
  pq: [], pi: 0, pcorrect: 0, pkind: null, pPool: null,

  // -------- data (Devanagari + simple roman fallback for TTS without a Hindi voice) --------
  SVAR: [
    ['अ', 'a'], ['आ', 'aa'], ['इ', 'i'], ['ई', 'ee'], ['उ', 'u'], ['ऊ', 'oo'],
    ['ऋ', 'ri'], ['ए', 'e'], ['ऐ', 'ai'], ['ओ', 'o'], ['औ', 'au'], ['अं', 'an'], ['अः', 'ah'],
  ],
  VYANJAN: [
    ['क', 'ka'], ['ख', 'kha'], ['ग', 'ga'], ['घ', 'gha'], ['ङ', 'nga'],
    ['च', 'cha'], ['छ', 'chha'], ['ज', 'ja'], ['झ', 'jha'], ['ञ', 'nya'],
    ['ट', 'ta'], ['ठ', 'tha'], ['ड', 'da'], ['ढ', 'dha'], ['ण', 'na'],
    ['त', 'ta'], ['थ', 'tha'], ['द', 'da'], ['ध', 'dha'], ['न', 'na'],
    ['प', 'pa'], ['फ', 'pha'], ['ब', 'ba'], ['भ', 'bha'], ['म', 'ma'],
    ['य', 'ya'], ['र', 'ra'], ['ल', 'la'], ['व', 'va'],
    ['श', 'sha'], ['ष', 'shha'], ['स', 'sa'], ['ह', 'ha'],
    ['क्ष', 'ksha'], ['त्र', 'tra'], ['ज्ञ', 'gya'],
  ],
  // matra families: a base consonant run through the 12 baarah-khadi forms
  MATRA_BASES: [
    { dev: 'क', r: 'k' }, { dev: 'ख', r: 'kh' }, { dev: 'ग', r: 'g' }, { dev: 'च', r: 'ch' },
    { dev: 'ज', r: 'j' }, { dev: 'त', r: 't' }, { dev: 'द', r: 'd' }, { dev: 'न', r: 'n' },
    { dev: 'प', r: 'p' }, { dev: 'ब', r: 'b' }, { dev: 'म', r: 'm' }, { dev: 'र', r: 'r' },
    { dev: 'ल', r: 'l' }, { dev: 'स', r: 's' }, { dev: 'ह', r: 'h' },
  ],
  MATRA_ROWS: [
    { sign: '', vow: 'अ', r: 'a' }, { sign: 'ा', vow: 'आ', r: 'aa' }, { sign: 'ि', vow: 'इ', r: 'i' },
    { sign: 'ी', vow: 'ई', r: 'ee' }, { sign: 'ु', vow: 'उ', r: 'u' }, { sign: 'ू', vow: 'ऊ', r: 'oo' },
    { sign: 'े', vow: 'ए', r: 'e' }, { sign: 'ै', vow: 'ऐ', r: 'ai' }, { sign: 'ो', vow: 'ओ', r: 'o' },
    { sign: 'ौ', vow: 'औ', r: 'au' }, { sign: 'ं', vow: 'अं', r: 'an' }, { sign: 'ः', vow: 'अः', r: 'ah' },
  ],
  WORDS: {
    two: [
      ['नल', 'nal', '🚰'], ['फल', 'phal', '🍎'], ['घर', 'ghar', '🏠'], ['जल', 'jal', '💧'],
      ['आम', 'aam', '🥭'], ['गाय', 'gaay', '🐄'], ['नाव', 'naav', '⛵'], ['फूल', 'phool', '🌷'],
      ['हाथ', 'haath', '✋'], ['नाक', 'naak', '👃'],
    ],
    three: [
      ['कमल', 'kamal', '🪷'], ['मछली', 'machhlee', '🐟'], ['तितली', 'titlee', '🦋'], ['गुलाब', 'gulaab', '🌹'],
      ['बकरी', 'bakree', '🐐'], ['बादल', 'baadal', '☁️'], ['किताब', 'kitaab', '📖'], ['हाथी', 'haathee', '🐘'],
      ['तोता', 'tota', '🦜'], ['चिड़िया', 'chidiya', '🐦'],
    ],
    big: [
      ['कबूतर', 'kabootar', '🕊️'], ['तरबूज', 'tarbooj', '🍉'], ['अनानास', 'anaanaas', '🍍'], ['बतख', 'batakh', '🦆'],
      ['समोसा', 'samosa', '🥟'], ['हिमालय', 'himaalay', '🏔️'], ['अमरूद', 'amrood', '🍐'], ['खरगोश', 'khargosh', '🐰'],
    ],
    five: [
      ['मगरमच्छ', 'magarmachchh', '🐊'], ['चमगादड़', 'chamgaadar', '🦇'], ['कलमदान', 'kalamdaan', '🖊️'],
      ['सूरजमुखी', 'soorajmukhee', '🌻'], ['मोटरगाड़ी', 'motargaadee', '🚗'], ['टेलीविजन', 'teleevijan', '📺'],
      ['बारहसिंगा', 'baarahsinga', '🦌'], ['अनारदाना', 'anaardaana', '🔴'],
    ],
  },

  open() {
    this.playerId = App.playerId;
    this.injectStyles();
    this.render();
  },

  allWords() {
    return [...this.WORDS.two, ...this.WORDS.three, ...this.WORDS.big, ...this.WORDS.five];
  },

  progressText() {
    let done = 0;
    ['svar', 'vyanjan', 'shabd'].forEach((k) => {
      if (Store.getLevelStars(this.playerId, 'hindi', 'practice-' + k)) done++;
    });
    return `${done}/3 practice ⭐`;
  },

  // -------- TTS: prefer a real Hindi voice; fall back to roman over en-IN --------
  hasHiVoice() {
    return (window.speechSynthesis?.getVoices() || []).some((v) => v.lang.toLowerCase().startsWith('hi'));
  },
  say(dev, roman) {
    if (this.hasHiVoice()) Speech.speak(dev, 0.6, 'hi-IN');
    else Speech.speak(roman || dev, 0.55, 'en-IN');
  },

  // split a Devanagari word into akshar (grapheme) units for tap-to-hear
  splitAkshar(word) {
    const comb = /[ऀ-ःऺ-ॏ॑-ॗॢॣ]/; // matras, anusvara, virama, nukta…
    const out = [];
    let cur = '';
    for (const ch of word) {
      if (cur === '') { cur = ch; continue; }
      if (comb.test(ch)) { cur += ch; continue; }      // combining mark → glue
      if (cur.charCodeAt(cur.length - 1) === 0x094D) { cur += ch; continue; } // after virama → conjunct
      out.push(cur); cur = ch;
    }
    if (cur) out.push(cur);
    return out;
  },

  // ============================ RENDER ============================
  render() {
    const body = document.getElementById('hindi-body');
    const tabs = [
      ['svar', '🔴 स्वर'], ['vyanjan', '🔵 व्यंजन'], ['matra', '🟢 मात्रा'], ['shabd', '🟡 शब्द'],
    ];
    body.innerHTML = `
      <div class="hb-tabs">
        ${tabs.map(([id, lbl]) => `<button class="hb-tab ${this.tab === id ? 'active' : ''}" data-tab="${id}">${lbl}</button>`).join('')}
      </div>
      <p class="hb-hint">👆 किसी भी अक्षर को छूओ और सुनो! (Tap to hear)</p>
      <div id="hb-panel"></div>`;
    body.querySelectorAll('.hb-tab').forEach((b) =>
      b.addEventListener('click', () => { Sounds.tap(); this.tab = b.dataset.tab; this.render(); }));
    this.renderPanel();
  },

  renderPanel() {
    const panel = document.getElementById('hb-panel');
    if (this.tab === 'svar') this.renderLetters(panel, this.SVAR, 'svar', 'सुनो और ढूँढो — स्वर');
    else if (this.tab === 'vyanjan') this.renderLetters(panel, this.VYANJAN, 'vyanjan', 'सुनो और ढूँढो — व्यंजन');
    else if (this.tab === 'matra') this.renderMatra(panel);
    else this.renderWords(panel);
  },

  renderLetters(panel, list, kind, practiceLabel) {
    panel.innerHTML = `
      <div class="hb-grid">
        ${list.map(([d, r]) => `
          <button class="hb-card" data-say="${d}" data-roman="${r}">
            <span class="hb-dev">${d}</span><span class="hb-roman">${r}</span>
          </button>`).join('')}
      </div>
      <button class="btn-fun green btn-big hb-practice" data-kind="${kind}">🎧 ${practiceLabel}</button>`;
    this.wireSay(panel);
    panel.querySelector('.hb-practice').addEventListener('click', () => this.startPractice(kind));
  },

  renderMatra(panel) {
    const base = this.MATRA_BASES.find((b) => b.dev === this.matraBase) || this.MATRA_BASES[0];
    panel.innerHTML = `
      <p class="hb-sub">कोई अक्षर चुनो — और उसकी सारी मात्राएँ सुनो</p>
      <div class="hb-baserow">
        ${this.MATRA_BASES.map((b) => `<button class="hb-basebtn ${b.dev === base.dev ? 'active' : ''}" data-base="${b.dev}">${b.dev}</button>`).join('')}
      </div>
      <div class="hb-grid hb-matragrid">
        ${this.MATRA_ROWS.map((row) => {
          const dev = base.dev + row.sign;
          const roman = base.r + row.r;
          return `<button class="hb-card hb-matracard" data-say="${dev}" data-roman="${roman}">
            <span class="hb-matravow">${row.vow}</span>
            <span class="hb-dev">${dev}</span><span class="hb-roman">${roman}</span>
          </button>`;
        }).join('')}
      </div>`;
    this.wireSay(panel);
    panel.querySelectorAll('.hb-basebtn').forEach((b) =>
      b.addEventListener('click', () => { Sounds.tap(); this.matraBase = b.dataset.base; this.say(b.dataset.base); this.renderPanel(); }));
  },

  renderWords(panel) {
    const groups = [
      ['two', 'दो अक्षर के शब्द'], ['three', 'तीन अक्षर के शब्द'], ['big', 'बड़े शब्द'],
      ['five', 'पाँच अक्षर के शब्द'],
    ];
    panel.innerHTML = groups.map(([key, title]) => `
      <h3 class="hb-grouptitle">${title}</h3>
      <div class="hb-grid hb-wordgrid">
        ${this.WORDS[key].map(([d, r, e]) => {
          const akshar = this.splitAkshar(d);
          return `<div class="hb-card hb-wordcard">
            <span class="hb-emoji" data-say="${d}" data-roman="${r}">${e}</span>
            <span class="hb-dev hb-worddev" data-say="${d}" data-roman="${r}">${d}</span>
            <span class="hb-roman">${r}</span>
            <span class="hb-akshar">${akshar.map((a) => `<span class="hb-chip" data-say="${a}">${a}</span>`).join('')}</span>
          </div>`;
        }).join('')}
      </div>`).join('') +
      `<button class="btn-fun green btn-big hb-practice" data-kind="shabd">🎧 सुनो और ढूँढो — शब्द</button>`;
    this.wireSay(panel);
    panel.querySelector('.hb-practice').addEventListener('click', () => this.startPractice('shabd'));
  },

  // tap-to-hear for any element carrying data-say
  wireSay(scope) {
    scope.querySelectorAll('[data-say]').forEach((el) => {
      if (el._hbBound) return;
      el._hbBound = true;
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        Sounds.tap();
        this.say(el.dataset.say, el.dataset.roman);
        el.classList.add('hb-ping');
        setTimeout(() => el.classList.remove('hb-ping'), 360);
      });
    });
  },

  // ============================ PRACTICE: listen & find ============================
  startPractice(kind) {
    this.pkind = kind;
    const pool = kind === 'svar' ? this.SVAR.map((x) => ({ dev: x[0], r: x[1] }))
      : kind === 'vyanjan' ? this.VYANJAN.map((x) => ({ dev: x[0], r: x[1] }))
      : this.allWords().map((x) => ({ dev: x[0], r: x[1], emoji: x[2] }));
    this.pPool = pool;
    this.pq = this.shuffle(pool).slice(0, 6);
    this.pi = 0;
    this.pcorrect = 0;
    this.renderPracticeQ();
  },

  renderPracticeQ() {
    if (this.pi >= this.pq.length) return this.finishPractice();
    const item = this.pq[this.pi];
    const distract = this.shuffle(this.pPool.filter((x) => x.dev !== item.dev)).slice(0, 3);
    const opts = this.shuffle([item, ...distract]);
    const isWord = this.pkind === 'shabd';
    const panel = document.getElementById('hb-panel');
    panel.innerHTML = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${(this.pi / this.pq.length) * 100}%"></div></div>
      <p class="hb-sub">सुनो — सही ${isWord ? 'चित्र' : 'अक्षर'} पर छूओ! (${this.pi + 1}/${this.pq.length})</p>
      <div class="hb-listen"><button class="btn-fun blue btn-big" id="hb-replay">🔊 फिर से सुनो</button></div>
      <div class="hb-grid hb-optgrid">
        ${opts.map((o) => `<button class="hb-card hb-opt" data-dev="${o.dev}">
          ${isWord ? `<span class="hb-emoji">${o.emoji}</span>` : `<span class="hb-dev">${o.dev}</span>`}
        </button>`).join('')}
      </div>
      <button class="btn-fun ghost hb-quit">⬅️ वापस</button>`;
    document.getElementById('hb-replay').addEventListener('click', () => { Sounds.tap(); this.say(item.dev, item.r); });
    panel.querySelector('.hb-quit').addEventListener('click', () => { Sounds.tap(); this.render(); });
    panel.querySelectorAll('.hb-opt').forEach((b) =>
      b.addEventListener('click', () => this.answerPractice(b, item)));
    setTimeout(() => this.say(item.dev, item.r), 450);
  },

  answerPractice(btn, item) {
    if (btn.dataset.dev === item.dev) {
      btn.classList.add('hb-correct');
      document.querySelectorAll('.hb-opt').forEach((b) => (b.style.pointerEvents = 'none'));
      Sounds.correct();
      Rewards.confetti(20);
      Store.addReward(this.playerId, { coins: 5, xp: 5 });
      Store.bumpStreak?.(this.playerId, true);
      Store.trackAnswer(this.playerId, 'hindi', true);
      this.pcorrect++;
      this.say(item.dev, item.r);
      Rewards.showToast('शाबाश! +5 🪙');
      App.refreshStats();
      setTimeout(() => { this.pi++; this.renderPracticeQ(); }, 1000);
    } else {
      btn.classList.add('hb-wrong');
      btn.style.pointerEvents = 'none';
      Sounds.wrong();
      Store.bumpStreak?.(this.playerId, false);
      Store.trackAnswer(this.playerId, 'hindi', false);
      Rewards.showToast('फिर से सुनो 🙂');
      setTimeout(() => this.say(item.dev, item.r), 300);
    }
  },

  finishPractice() {
    const ratio = this.pq.length ? this.pcorrect / this.pq.length : 1;
    let stars = 1;
    if (ratio >= 0.6) stars = 2;
    if (ratio >= 0.9) stars = 3;
    Store.completeLevel(this.playerId, 'hindi', 'practice-' + this.pkind, stars);
    Store.addReward(this.playerId, { coins: stars * 10, xp: 20 });
    Store.logActivity(this.playerId, `Hindi practice: ${this.pkind} — ${stars}⭐`);
    if (typeof Pet !== 'undefined' && Pet.onLessonComplete) Pet.onLessonComplete(this.playerId);
    Store.checkBadges?.(this.playerId);
    Sounds.cheer();
    Rewards.confetti(60);
    Rewards.showPopup({
      emoji: stars === 3 ? '💎' : '🏆',
      title: 'शाबाश! 🎉',
      text: `${'⭐'.repeat(stars)} You got ${this.pcorrect}/${this.pq.length}! +${stars * 10} 🪙 for the puppies!`,
      onOk: () => { this.render(); App.refreshStats(); },
    });
  },

  shuffle(a) { return a.slice().sort(() => Math.random() - 0.5); },

  // ---------- one-time self-contained styles (hb- prefix) ----------
  injectStyles() {
    if (document.getElementById('hb-styles')) return;
    const s = document.createElement('style');
    s.id = 'hb-styles';
    s.textContent = `
      #hindi-body{font-family:'Noto Sans Devanagari','Fredoka',sans-serif}
      .hb-tabs{display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap}
      .hb-tab{flex:1;min-width:70px;border:2px solid #d9d5ff;background:#fff;border-radius:14px;
        font-family:inherit;font-weight:700;font-size:1.05rem;padding:10px 6px;cursor:pointer;color:#4b3fb0}
      .hb-tab.active{background:var(--primary,#7c5cff);color:#fff;border-color:var(--primary,#7c5cff)}
      .hb-hint{text-align:center;color:#7a72c9;font-weight:700;margin:6px 0;font-size:.95rem}
      .hb-sub{text-align:center;color:#3a3470;font-weight:700;font-size:1.1rem;margin:8px 0}
      .hb-grouptitle{margin:16px 4px 6px;color:#5a4fd0;font-weight:800;font-size:1.15rem;
        background:linear-gradient(135deg,#ede9ff,#fbe9ff);border-radius:14px;padding:8px 12px;text-align:center}
      .hb-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:10px;margin:8px 0}
      .hb-card{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
        border:3px solid #b8b1ff;background:#f6f4ff;border-radius:16px;padding:10px 6px;cursor:pointer;
        font-family:inherit;transition:transform .12s,background .12s;min-height:78px}
      .hb-card:active{transform:scale(.93)}
      .hb-card.hb-ping,.hb-dev.hb-ping,.hb-emoji.hb-ping,.hb-chip.hb-ping{background:#ffd34d;animation:hb-pop .35s}
      @keyframes hb-pop{0%{transform:scale(1)}45%{transform:scale(1.25)}100%{transform:scale(1)}}
      .hb-dev{font-size:2.3rem;font-weight:700;color:#3a2f8f;line-height:1}
      .hb-roman{font-size:.85rem;color:#8a82c0;font-weight:600}
      .hb-baserow{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin:8px 0}
      .hb-basebtn{font-family:inherit;font-size:1.4rem;font-weight:700;border:2px solid #b8b1ff;background:#fff;
        border-radius:12px;width:46px;height:46px;cursor:pointer;color:#3a2f8f}
      .hb-basebtn.active{background:var(--primary,#7c5cff);color:#fff;border-color:var(--primary,#7c5cff)}
      .hb-matracard .hb-matravow{font-size:.95rem;color:#15a06a;font-weight:800}
      .hb-wordgrid{grid-template-columns:repeat(auto-fill,minmax(120px,1fr))}
      .hb-wordcard{cursor:default;gap:4px}
      .hb-emoji{font-size:2.6rem;line-height:1;cursor:pointer}
      .hb-worddev{font-size:2rem;cursor:pointer}
      .hb-akshar{display:flex;gap:5px;flex-wrap:wrap;justify-content:center;margin-top:4px}
      .hb-chip{font-size:1.25rem;font-weight:700;color:#b14a00;background:#fff3df;border:2px solid #ffce8a;
        border-radius:9px;padding:2px 8px;cursor:pointer}
      .hb-chip:active{transform:scale(.9)}
      .hb-practice{width:100%;margin-top:14px}
      .hb-listen{text-align:center;margin:10px 0}
      .hb-optgrid{grid-template-columns:repeat(2,1fr)}
      .hb-opt{min-height:96px}
      .hb-opt .hb-dev{font-size:3rem}
      .hb-opt .hb-emoji{font-size:3.4rem}
      .hb-opt.hb-correct{background:#c8f7d8;border-color:#15c39a}
      .hb-opt.hb-wrong{background:#ffd6d6;border-color:#ff6b6b;animation:hb-shake .3s}
      @keyframes hb-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
    `;
    document.head.appendChild(s);
  },
};
