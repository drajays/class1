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
  // reading practice state
  READ_WORDS: null,
  SET_SIZE: 25,
  rSet: 0, rIdx: 0, rScore: 0, rWords: [],

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
    let reads = 0;
    const sets = this.READ_WORDS ? Math.ceil(this.READ_WORDS.length / this.SET_SIZE) : 0;
    for (let i = 0; i < sets; i++) {
      if (Store.getLevelStars(this.playerId, 'hindi', 'read-' + (i + 1))) reads++;
    }
    let paaths = 0;
    const lCount = this.LESSONS ? this.LESSONS.length : 26;
    for (let i = 0; i < lCount; i++) {
      if (Store.getLevelStars(this.playerId, 'hindi', 'paath-' + (i + 1))) paaths++;
    }
    return `${paaths}/26 पाठ • ${reads} reading ⭐`;
  },

  async loadReadWords() {
    if (this.READ_WORDS) return this.READ_WORDS;
    try {
      const res = await fetch(AppConfig.url('data/hindi_words.json'));
      const data = await res.json();
      this.READ_WORDS = [...new Set(data.words || [])]; // dedup, keep order
    } catch {
      this.READ_WORDS = [];
    }
    return this.READ_WORDS;
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
      ['svar', '🔴 स्वर'], ['vyanjan', '🔵 व्यंजन'], ['matra', '🟢 मात्रा'], ['shabd', '🟡 शब्द'], ['read', '📖 पढ़ो'], ['paath', '📕 पाठ'],
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
    else if (this.tab === 'read') this.renderRead(panel);
    else if (this.tab === 'paath') this.renderPaath(panel);
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
      const solved = Store.getLevelStars(this.playerId, 'hindi', 'practice-' + this.pkind) > 0;
      if (!solved) {
        Store.addReward(this.playerId, { coins: 5, xp: 5 });
      } else {
        Store.addReward(this.playerId, { coins: 0, xp: 5 });
      }
      Store.bumpStreak?.(this.playerId, true);
      Store.trackAnswer(this.playerId, 'hindi', true);
      this.pcorrect++;
      this.say(item.dev, item.r);
      Rewards.showToast(!solved ? 'शाबाश! +5 🪙' : 'शाबाश! (Practice mode)');
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
    const prettyKind = { varna: 'वर्णमाला अभ्यास (Varnamala)', matra: 'मात्रा अभ्यास (Matras)', shabd: 'शब्द निर्माण (Words)' }[this.pkind] || ('Hindi Practice: ' + this.pkind);
    const res = Store.awardLevel(this.playerId, 'hindi', 'practice-' + this.pkind, stars, stars * 10, {
      title: prettyKind,
      level: 1,
      wrong: this.pq.length - this.pcorrect
    });
    Store.logActivity(this.playerId, `Hindi practice: ${this.pkind} — ${stars}⭐`);
    if (typeof Pet !== 'undefined' && Pet.onLessonComplete) Pet.onLessonComplete(this.playerId);
    Store.checkBadges?.(this.playerId);
    Sounds.cheer();
    Rewards.confetti(60);

    let text = `${'⭐'.repeat(stars)} You got ${this.pcorrect}/${this.pq.length}! +${res.coins} 🪙 for the puppies!`;
    let title = 'शाबाश! 🎉';
    let btnText = 'OK';
    let onOk = () => { this.render(); App.refreshStats(); };

    if (!res.firstTime && !res.improved) {
      title = 'Practice Superstar! 🌟';
      text = `${'⭐'.repeat(stars)} Practice superstar! The puppies are full — feed them with something NEW! 🦴`;
      Speech.speak("Practice superstar! The puppies are full — feed them with something new!");
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

  // ============================ READING: 500 common words, gated sets, scored ============================
  async renderRead(panel) {
    panel.innerHTML = `<p class="hb-sub">⏳ शब्द आ रहे हैं…</p>`;
    await this.loadReadWords();
    if (this.tab !== 'read') return; // user switched tabs while loading
    const words = this.READ_WORDS;
    const sets = Math.ceil(words.length / this.SET_SIZE);
    let cards = '';
    for (let i = 0; i < sets; i++) {
      const stars = Store.getLevelStars(this.playerId, 'hindi', 'read-' + (i + 1));
      const from = i * this.SET_SIZE;
      const count = Math.min(this.SET_SIZE, words.length - from);
      cards += `
        <button class="hb-setcard ${stars ? 'done' : ''}" data-set="${i}">
          <span class="hb-setno">सेट ${i + 1}</span>
          <span class="hb-setinfo">${count} शब्द</span>
          <span class="hb-setstars">${stars ? '⭐'.repeat(stars) : '▶️'}</span>
        </button>`;
    }
    panel.innerHTML = `
      <p class="hb-sub">पढ़ने की मस्ती! 📖 हर शब्द पढ़ो, सितारे कमाओ 🪙</p>
      <p class="hb-hint">शब्द पढ़ो → ✅ दबाओ। अटक जाओ तो 🔊 सुनो।</p>
      <div class="hb-sets">${cards}</div>`;
    panel.querySelectorAll('.hb-setcard').forEach((b) =>
      b.addEventListener('click', () => { Sounds.tap(); this.startReading(+b.dataset.set); }));
  },

  startReading(setIdx) {
    this.rSet = setIdx;
    const from = setIdx * this.SET_SIZE;
    this.rWords = this.READ_WORDS.slice(from, from + this.SET_SIZE);
    this.rIdx = 0;
    this.rScore = 0;
    this.renderReadCard();
  },

  renderReadCard() {
    if (this.rIdx >= this.rWords.length) return this.finishReading();
    const word = this.rWords[this.rIdx];
    const total = this.rWords.length;
    const panel = document.getElementById('hb-panel');
    panel.innerHTML = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${(this.rIdx / total) * 100}%"></div></div>
      <p class="hb-sub">सेट ${this.rSet + 1} — शब्द ${this.rIdx + 1}/${total} • स्कोर ${this.rScore} ⭐</p>
      <div class="hb-readbox"><span class="hb-readword">${word}</span></div>
      <div class="hb-listen"><button class="btn-fun blue" id="hb-rhear">🔊 सुनो / मदद</button></div>
      <div class="hb-readbtns">
        <button class="btn-fun green btn-big" id="hb-rgot">✅ पढ़ लिया! (+5 🪙)</button>
        <button class="btn-fun orange" id="hb-rnext">➡️ अगला</button>
      </div>
      <button class="btn-fun ghost hb-quit">⬅️ वापस</button>`;
    document.getElementById('hb-rhear').addEventListener('click', () => { Sounds.tap(); this.say(word, this.devToRoman(word)); });
    document.getElementById('hb-rgot').addEventListener('click', () => {
      Sounds.correct();
      Rewards.confetti(16);
      const solved = Store.getLevelStars(this.playerId, 'hindi', 'read-' + (this.rSet + 1)) > 0;
      if (!solved) {
        Store.addReward(this.playerId, { coins: 5, xp: 5 });
      } else {
        Store.addReward(this.playerId, { coins: 0, xp: 5 });
      }
      Store.bumpStreak?.(this.playerId, true);
      Store.trackAnswer(this.playerId, 'hindi', true);
      this.rScore++;
      Rewards.showToast(!solved ? 'शाबाश! +5 🪙' : 'शाबाश! (Practice mode)');
      this.say(word, this.devToRoman(word));
      App.refreshStats();
      this.rIdx++;
      setTimeout(() => this.renderReadCard(), 800);
    });
    document.getElementById('hb-rnext').addEventListener('click', () => {
      Sounds.tap();
      this.say(word, this.devToRoman(word)); // hear it so she learns it
      this.rIdx++;
      setTimeout(() => this.renderReadCard(), 700);
    });
    panel.querySelector('.hb-quit').addEventListener('click', () => { Sounds.tap(); this.render(); });
  },

  finishReading() {
    const total = this.rWords.length;
    const ratio = total ? this.rScore / total : 1;
    let stars = 1;
    if (ratio >= 0.6) stars = 2;
    if (ratio >= 0.9) stars = 3;
    const prettyRead = `पढ़ो और सीखो — Set ${this.rSet + 1}`;
    const res = Store.awardLevel(this.playerId, 'hindi', 'read-' + (this.rSet + 1), stars, stars * 10, {
      title: prettyRead,
      level: 2,
      wrong: total - this.rScore
    });
    Store.logActivity(this.playerId, `Hindi reading set ${this.rSet + 1}: ${this.rScore}/${total} — ${stars}⭐`);
    if (typeof Pet !== 'undefined' && Pet.onLessonComplete) Pet.onLessonComplete(this.playerId);
    Store.checkBadges?.(this.playerId);
    Sounds.cheer();
    Rewards.confetti(60);

    let text = `You read ${this.rScore}/${total} words! ${'⭐'.repeat(stars)} +${res.coins} 🪙 for the puppies!`;
    let title = 'शाबाश! 🎉';
    let btnText = 'OK';
    let onOk = () => { this.renderPanel(); App.refreshStats(); };

    if (!res.firstTime && !res.improved) {
      title = 'Practice Superstar! 🌟';
      text = `${'⭐'.repeat(stars)} Practice superstar! The puppies are full — feed them with something NEW! 🦴`;
      Speech.speak("Practice superstar! The puppies are full — feed them with something new!");
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

  // approximate Devanagari→roman for TTS fallback when no Hindi voice is installed
  devToRoman(w) {
    const C = {
      'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng', 'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
      'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n', 'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
      'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm', 'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v',
      'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h', 'ड़': 'r', 'ढ़': 'rh',
    };
    const V = { 'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au' };
    const M = { 'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au' };
    const NUK = { 'क': 'q', 'ख': 'kh', 'ग': 'gh', 'ज': 'z', 'ड': 'r', 'ढ': 'rh', 'फ': 'f' };
    const a = [...w];
    let out = '';
    for (let i = 0; i < a.length; i++) {
      const c = a[i];
      if (C[c] !== undefined) {
        let base = C[c];
        if (a[i + 1] === '़') { base = NUK[c] || base; i++; }
        out += base;
        const n = a[i + 1];
        if (n === '्') { i++; continue; }           // halant → conjunct, no vowel
        if (n !== undefined && M[n] !== undefined) { out += M[n]; i++; }
        else out += 'a';
      } else if (V[c] !== undefined) { out += V[c]; }
      else if (c === 'ं' || c === 'ँ') { out += 'n'; }
      else if (c === 'ः') { out += 'h'; }
      // ignore stray marks
    }
    return out;
  },

  shuffle(a) {
    const arr = a.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  async loadLessons() {
    if (this.LESSONS) return this.LESSONS;
    try {
      const res = await fetch(AppConfig.url('data/hindi_lessons.json'));
      const data = await res.json();
      this.LESSONS = data.chapters || [];
    } catch {
      this.LESSONS = [];
    }
    return this.LESSONS;
  },

  async load() {
    const chapters = await this.loadLessons();
    return { chapters };
  },

  async startLessonById(id) {
    this.playerId = App.playerId;
    await this.loadLessons();
    this.tab = 'paath';
    const idx = (this.LESSONS || []).findIndex((l) => l.id === id);
    if (idx >= 0) this.startLesson(idx);
  },

  async renderPaath(panel) {
    panel.innerHTML = `<p class="hb-sub">⏳ पाठ आ रहे हैं…</p>`;
    await this.loadLessons();
    if (this.tab !== 'paath') return;
    const lessons = this.LESSONS || [];
    let cards = '';
    for (let i = 0; i < lessons.length; i++) {
      const l = lessons[i];
      const stars = Store.getLevelStars(this.playerId, 'hindi', l.id);
      cards += `
        <button class="hb-setcard ${stars ? 'done' : ''}" data-lesson="${i}">
          <span class="hb-setno">${l.icon || '📕'} पाठ ${i + 1}</span>
          <span class="hb-setinfo" style="font-size:0.95rem;">${l.title}</span>
          <span class="hb-setstars">${stars ? '⭐'.repeat(stars) : '▶️'}</span>
        </button>`;
    }
    panel.innerHTML = `
      <p class="hb-sub">हिंदी पाठ (Lessons) — कहानियाँ और अभ्यास! 📕</p>
      <p class="hb-hint">किसी भी पाठ को छूओ, कहानी सुनो और प्रश्नों के उत्तर दो!</p>
      <div class="hb-sets">${cards}</div>`;
    panel.querySelectorAll('.hb-setcard').forEach((b) =>
      b.addEventListener('click', () => { Sounds.tap(); this.startLesson(+b.dataset.lesson); }));
  },

  startLesson(idx) {
    this.lIdx = idx;
    this.lesson = this.LESSONS[idx];
    this.lProbIdx = 0;
    this.lScore = 0;
    this.lProblems = this.shuffle(this.lesson.problems || []).map(p => ({
      ...p,
      opts: this.shuffle(p.options || [])
    }));
    this.renderLessonConcept();
  },

  renderLessonConcept() {
    const l = this.lesson;
    const panel = document.getElementById('hb-panel');
    const introLines = l.concept?.intro || [];
    const tip = l.concept?.tip || '';
    panel.innerHTML = `
      <div style="text-align:center;margin:10px 0;">
        <div style="font-size:3.5rem;">${l.icon || '📕'}</div>
        <h2 style="color:#3a2f8f;margin:4px 0;font-size:1.6rem;">${l.title}</h2>
      </div>
      <div style="background:#f6f4ff;border:3px solid #b8b1ff;border-radius:18px;padding:14px;margin:12px 0;">
        ${introLines.map(line => `<p style="font-size:1.15rem;color:#2b2660;margin:8px 0;line-height:1.4;cursor:pointer;" class="hb-intro-line">🔊 ${line}</p>`).join('')}
        ${tip ? `<div style="margin-top:12px;padding-top:10px;border-top:2px dashed #d9d5ff;color:#4b3fb0;font-weight:700;font-size:1.05rem;">💡 ${tip}</div>` : ''}
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:16px;">
        <button class="btn-fun green btn-big" id="hb-lstart">🚀 प्रश्न शुरू करें! (Start Practice)</button>
        <button class="btn-fun ghost hb-quit">⬅️ वापस पाठ सूची (Back to Lessons)</button>
      </div>`;
    panel.querySelectorAll('.hb-intro-line').forEach((el, i) => {
      el.addEventListener('click', () => {
        Sounds.tap();
        this.say(introLines[i], this.devToRoman(introLines[i]));
      });
    });
    this.say(`${l.title}। ${introLines[0] || ''}`, this.devToRoman(`${l.title} ${introLines[0] || ''}`));
    document.getElementById('hb-lstart').addEventListener('click', () => {
      Sounds.tap();
      this.renderLessonProblem();
    });
    panel.querySelector('.hb-quit').addEventListener('click', () => {
      Sounds.tap();
      this.render();
    });
  },

  renderLessonProblem() {
    if (this.lProbIdx >= this.lProblems.length) return this.finishLesson();
    const p = this.lProblems[this.lProbIdx];
    const total = this.lProblems.length;
    const panel = document.getElementById('hb-panel');
    panel.innerHTML = `
      <div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:${(this.lProbIdx / total) * 100}%"></div></div>
      <p class="hb-sub">पाठ ${this.lIdx + 1}: ${this.lesson.title} — प्रश्न ${this.lProbIdx + 1}/${total} • स्कोर ${this.lScore} ⭐</p>
      <div style="background:#fff;border:3px solid #ffce8a;border-radius:18px;padding:14px;margin:12px 0;text-align:center;">
        <h3 style="color:#2b2660;font-size:1.3rem;margin:6px 0;">${p.q}</h3>
        <button class="btn-fun blue btn-small" id="hb-lqhear" style="margin-top:6px;">🔊 प्रश्न सुनो</button>
      </div>
      <div class="hb-grid hb-optgrid" style="gap:12px;margin:14px 0;">
        ${p.opts.map((opt, i) => `
          <button class="hb-opt hb-card" data-opt="${i}" style="min-height:80px;padding:12px 8px;font-size:1.15rem;font-weight:700;color:#3a2f8f;">
            ${opt}
          </button>
        `).join('')}
      </div>
      <div id="hb-lexplain" style="display:none;background:#e8fff2;border:3px solid #15c39a;border-radius:16px;padding:12px;margin:12px 0;text-align:center;color:#0a7e4d;font-weight:700;font-size:1.1rem;"></div>
      <div id="hb-lnextbox" style="display:none;text-align:center;margin:14px 0;">
        <button class="btn-fun orange btn-big" id="hb-lnext">➡️ अगला प्रश्न</button>
      </div>
      <button class="btn-fun ghost hb-quit" style="margin-top:6px;">⬅️ वापस पाठ सूची</button>`;
    
    document.getElementById('hb-lqhear').addEventListener('click', () => {
      Sounds.tap();
      this.say(p.q, this.devToRoman(p.q));
    });
    this.say(p.q, this.devToRoman(p.q));

    const optsBtns = panel.querySelectorAll('.hb-opt');
    let answered = false;
    let triesThisProblem = 0;
    optsBtns.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        if (answered || btn.style.pointerEvents === 'none') return;
        const chosen = p.opts[i];
        if (chosen === p.a) {
          answered = true;
          Sounds.correct();
          Rewards.confetti(20);
          btn.classList.add('hb-correct');
          const first = triesThisProblem === 0;
          const coins = first ? 10 : 4;
          if (first) this.lScore++;
          const solved = Store.getLevelStars(this.playerId, 'hindi', this.lesson.id) > 0;
          if (!solved) {
            Store.addReward(this.playerId, { coins, stars: first ? 1 : 0, xp: 10 });
          } else {
            Store.addReward(this.playerId, { coins: 0, stars: 0, xp: 5 });
          }
          Store.bumpStreak?.(this.playerId, true);
          Store.trackAnswer(this.playerId, 'hindi', true);
          
          const explain = document.getElementById('hb-lexplain');
          if (p.why) {
            explain.style.display = 'block';
            explain.style.background = '#e8fff2';
            explain.style.borderColor = '#15c39a';
            explain.style.color = '#0a7e4d';
            explain.innerHTML = `✅ शाबाश! ${p.why}`;
            this.say(`शाबाश! ${p.why}`, this.devToRoman(`शाबाश! ${p.why}`));
          } else {
            this.say('शाबाश! बहुत अच्छा!', 'shaabaash! bahut achchhaa!');
          }
          Rewards.showToast(!solved ? (first ? `Great job! +${coins} 🪙` : `You got it! +${coins} 🪙`) : (first ? `Great job! (Practice mode)` : `You got it! (Practice mode)`));
          document.getElementById('hb-lnextbox').style.display = 'block';
        } else {
          triesThisProblem++;
          Sounds.wrong();
          btn.classList.add('hb-wrong');
          btn.style.pointerEvents = 'none';
          Store.bumpStreak?.(this.playerId, false);
          Store.trackAnswer(this.playerId, 'hindi', false);
          const explain = document.getElementById('hb-lexplain');
          explain.style.display = 'block';
          explain.style.background = '#ffd6d6';
          explain.style.borderColor = '#ff6b6b';
          explain.style.color = '#b30000';
          explain.innerHTML = `❌ फिर से सोचो! ${p.why || ''}<p style="margin-top:8px;color:#3a2f8f;font-weight:800;">👇 Now tap the correct answer!</p>`;
          this.say(`फिर से सोचो! ${p.why || ''}`, this.devToRoman(`phir se socho! ${p.why || ''}`));
        }
      });
    });

    document.getElementById('hb-lnext').addEventListener('click', () => {
      Sounds.tap();
      this.lProbIdx++;
      this.renderLessonProblem();
    });

    panel.querySelector('.hb-quit').addEventListener('click', () => {
      Sounds.tap();
      this.render();
    });
  },

  finishLesson() {
    const total = this.lProblems.length;
    const ratio = total ? this.lScore / total : 1;
    let stars = 1;
    if (ratio >= 0.6) stars = 2;
    if (ratio >= 0.9) stars = 3;
    const l = this.lesson;
    const res = Store.awardLevel(this.playerId, 'hindi', l.id, stars, stars * 10, {
      title: l.title,
      level: l.level || 1,
      wrong: total - this.lScore
    });
    Store.logActivity(this.playerId, `Hindi lesson ${l.title}: ${this.lScore}/${total} — ${stars}⭐`);
    if (typeof Pet !== 'undefined' && Pet.onLessonComplete) Pet.onLessonComplete(this.playerId);
    Store.checkBadges?.(this.playerId);
    Sounds.cheer();
    Rewards.confetti(60);

    let text = `पाठ पूरा हुआ! You completed ${l.title}! ${'⭐'.repeat(stars)} +${res.coins} 🪙 for the puppies!`;
    let title = 'शाबाश! 🎉';
    let btnText = 'OK';
    let onOk = () => { this.renderPanel(); App.refreshStats(); };

    if (!res.firstTime && !res.improved) {
      title = 'Practice Superstar! 🌟';
      text = `${'⭐'.repeat(stars)} Practice superstar! The puppies are full — feed them with something NEW! 🦴`;
      Speech.speak("Practice superstar! The puppies are full — feed them with something new!");
      const unsolvedIdx = (this.LESSONS || []).findIndex(c => Store.getLevelStars(this.playerId, 'hindi', c.id) === 0);
      if (unsolvedIdx >= 0) {
        btnText = 'Next mission ➜';
        onOk = () => { this.startLesson(unsolvedIdx); App.refreshStats(); };
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
      .hb-sets{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:10px;margin:8px 0}
      .hb-setcard{display:flex;flex-direction:column;align-items:center;gap:3px;border:3px solid #b8b1ff;
        background:#f6f4ff;border-radius:16px;padding:14px 8px;cursor:pointer;font-family:inherit}
      .hb-setcard.done{background:linear-gradient(135deg,#e8fff2,#d8f5ff);border-color:#15c39a}
      .hb-setcard:active{transform:scale(.95)}
      .hb-setno{font-size:1.2rem;font-weight:800;color:#3a2f8f}
      .hb-setinfo{font-size:.85rem;color:#8a82c0;font-weight:600}
      .hb-setstars{font-size:1.15rem}
      .hb-readbox{display:flex;align-items:center;justify-content:center;min-height:150px;margin:10px 0;
        background:linear-gradient(135deg,#fff7e6,#fff0f6);border:3px solid #ffce8a;border-radius:22px}
      .hb-readword{font-size:3.8rem;font-weight:700;color:#2b2660;font-family:'Noto Sans Devanagari',sans-serif;text-align:center;padding:8px}
      .hb-readbtns{display:flex;flex-direction:column;gap:10px;margin:6px 0}
      .hb-readbtns .btn-fun{width:100%}
      .hb-quit{margin-top:6px}
    `;
    document.head.appendChild(s);
  },
};
