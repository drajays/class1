const MiniGames = {
  current: null,
  playerId: null,
  _timer: null,

  showHub() {
    const hub = document.getElementById('minigame-hub');
    hub.innerHTML = MINI_GAMES.map((g) => `
      <button class="minigame-card" data-id="${g.id}">
        <span class="minigame-emoji">${g.emoji}</span>
        <span class="minigame-title">${g.title}</span>
        <span class="minigame-sub">${g.sub}</span>
      </button>
    `).join('');
    hub.querySelectorAll('.minigame-card').forEach((btn) => {
      btn.addEventListener('click', () => {
        Sounds.tap();
        this.start(btn.dataset.id, App.playerId);
      });
    });
    Speech.navSay(NAV_PROMPTS.minigames);
  },

  start(id, playerId) {
    this.current = id;
    this.playerId = playerId;
    document.getElementById('minigame-hub').classList.add('hidden');
    const wrap = document.getElementById('minigame-play');
    wrap.classList.remove('hidden');
    const game = MINI_GAMES.find((g) => g.id === id);
    document.getElementById('minigame-title').textContent = `${game.emoji} ${game.title}`;

    const map = {
      'apple-basket': () => this.appleBasket(),
      'math-race': () => this.mathRace(),
      'count-basket': () => this.countBasket(),
      'speak-word': () => this.speakWord(),
      'trace-letter': () => this.traceLetter(),
      'word-builder': () => this.wordBuilder(),
      'story-quest': () => this.storyQuest(),
      'fable-choice': () => this.fableChoice(),
      'evs-sort': () => this.evsSort(),
      habitat: () => this.habitat(),
      'plant-magic': () => this.plantMagic(),
      'noun-sort': () => this.nounSort(),
      'memory-match': () => this.memoryMatch(),
      'creative-draw': () => this.creativeDraw(),
      'spin-wheel': () => this.spinWheel(),
    };
    (map[id] || (() => { this._area().innerHTML = '<p>Coming soon!</p>'; }))();
  },

  _area() {
    return document.getElementById('minigame-body');
  },

  back() {
    clearInterval(this._timer);
    this._stopCamera();
    document.getElementById('minigame-play').classList.add('hidden');
    document.getElementById('minigame-hub').classList.remove('hidden');
    this.showHub();
  },

  win(coins = 10, subject = 'general') {
    Store.trackAnswer(this.playerId, subject, true);
    const res = Store.awardFun(this.playerId, { coins, xp: 12, label: 'Minigame' });
    Store.recordMinigameWin(this.playerId);
    Pet.onLessonComplete(this.playerId);
    Sounds.cheer();
    Rewards.confetti(40);
    let title = 'You did it!';
    let text = `+${res.coins} coins! Your pet is happy too!`;
    if (res.capped) {
      title = 'Practice Superstar! 🌟';
      text = `Fun game superstar! The puppies are full for today — feed them with something NEW! 🦴`;
      Speech.speak("Fun game superstar! The puppies are full for today — feed them with something new!");
    }
    Rewards.showPopup({
      emoji: '🏆',
      title,
      text,
      onOk: () => this.back(),
    });
    App.refreshStats();
  },

  /* ---- Apple Basket (drag-drop addition) ---- */
  appleBasket() {
    const target = 2 + Math.floor(Math.random() * 4);
    const area = this._area();
    area.innerHTML = `
      <p class="game-instruction">Drag <b>${target}</b> apples into the basket!</p>
      <div class="drag-zone">
        <div class="apple-pile" id="apple-pile">
          ${Array(8).fill('🍎').map((a, i) => `<span class="draggable" draggable="true" data-i="${i}">${a}</span>`).join('')}
        </div>
        <div class="drop-basket" id="basket">🧺<br><span id="basket-count">0</span></div>
      </div>
      <button class="btn-primary btn-big" id="check-basket">Check! ✓</button>
    `;
    let count = 0;
    const basket = document.getElementById('basket');
    this._setupDrag('.draggable', basket, (el) => {
      if (el.parentElement === basket) return;
      basket.appendChild(el);
      count++;
      document.getElementById('basket-count').textContent = count;
      Sounds.tap();
    });
    document.getElementById('check-basket').addEventListener('click', () => {
      if (count === target) this.win(15, 'math');
      else {
        Sounds.wrong();
        Rewards.showToast(count < target ? 'Add more apples!' : 'Too many! Take some out.');
      }
    });
    Speech.navSay(`Drag ${target} apples into the basket!`);
  },

  /* ---- Math Race ---- */
  mathRace() {
    let pos = 10;
    let rival = 10;
    let qIdx = 0;
    const questions = Array(5).fill(0).map(() => {
      const a = 1 + Math.floor(Math.random() * 5);
      const b = 1 + Math.floor(Math.random() * 5);
      return { a, b, answer: a + b };
    });
    const render = () => {
      rival = Math.min(88, rival + 4 + Math.floor(Math.random() * 6));
      const q = questions[qIdx];
      if (!q) return this.win(20, 'math');
      const area = this._area();
      const opts = [...new Set([q.answer, q.answer + 1, q.answer - 1, q.answer + 2].filter((n) => n > 0))]
        .sort(() => Math.random() - 0.5).slice(0, 4);
      area.innerHTML = `
        <div class="race-track race-duel">
          <div class="race-lane"><span class="race-car" style="left:${pos}%">🏎️</span><small>You</small></div>
          <div class="race-lane rival"><span class="race-car" style="left:${rival}%">🚙</span><small>Rival</small></div>
          <div class="race-flag">🏁</div>
        </div>
        <p class="question-text">${q.a} + ${q.b} = ?</p>
        <div class="options-grid">${opts.map((o) => `<button class="option-btn btn-big" data-v="${o}">${o}</button>`).join('')}</div>`;
      area.querySelectorAll('.option-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (Number(btn.dataset.v) === q.answer) {
            Sounds.raceBoost();
            pos = Math.min(88, pos + 16);
            qIdx++;
            Store.trackAnswer(this.playerId, 'math', true);
            if (pos >= 85) return this.win(22, 'math');
            render();
          } else {
            Sounds.wrong();
            Store.trackAnswer(this.playerId, 'math', false);
            Rewards.showToast('Wrong — rival is catching up!');
          }
        });
      });
    };
    render();
    Speech.navSay('Answer math to beat the blue car!');
  },

  /* ---- Speak & Win ---- */
  speakWord() {
    this._voiceLang = this._voiceLang || 'en';
    const words = SPEAK_WORDS.filter((w) => {
      if (this._voiceLang === 'hi') return w.lang.startsWith('hi');
      if (this._voiceLang === 'sa') return w.lang.startsWith('sa');
      return w.lang.startsWith('en');
    });
    const w = words[Math.floor(Math.random() * words.length)] || SPEAK_WORDS[0];
    const area = this._area();
    area.innerHTML = `
      <div class="mini-tabs">
        <button class="tab-pill ${this._voiceLang === 'en' ? 'active' : ''}" data-lang="en">📘 English</button>
        <button class="tab-pill ${this._voiceLang === 'hi' ? 'active' : ''}" data-lang="hi">🇮🇳 Hindi</button>
        <button class="tab-pill ${this._voiceLang === 'sa' ? 'active' : ''}" data-lang="sa">🕉️ Sanskrit</button>
      </div>
      <div class="question-emoji">${w.emoji}</div>
      <p class="question-text">Say: <b>${w.word}</b></p>
      ${w.hint ? `<p class="tip-box">${w.hint}</p>` : ''}
      <button class="btn-primary btn-big" id="btn-listen">🎤 Tap to Speak</button>
      <button class="btn-fun ghost btn-big" id="magic-match">🪄 I said it!</button>
      <p id="speak-result" class="hint"></p>
      <button class="btn-speak" id="hear-word">🔊 Hear word</button>`;
    area.querySelectorAll('[data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => { this._voiceLang = btn.dataset.lang; this.speakWord(); });
    });
    document.getElementById('hear-word').addEventListener('click', () => Speech.speakWord(w.word));
    document.getElementById('magic-match').addEventListener('click', () => {
      Sounds.correct();
      this.win(10, 'english');
    });
    document.getElementById('btn-listen').addEventListener('click', async () => {
      document.getElementById('speak-result').textContent = 'Listening...';
      const heard = await Speech.listen(w.lang);
      const ok = heard && (heard.includes(w.word.toLowerCase()) || this._fuzzyMatch(heard, w.word));
      if (ok) {
        document.getElementById('speak-result').textContent = `Great! I heard: "${heard}"`;
        Sounds.correct();
        setTimeout(() => this.win(12, 'english'), 800);
      } else {
        document.getElementById('speak-result').textContent = heard ? `Heard "${heard}" — try again or tap magic match!` : 'Try again!';
        Sounds.wrong();
        Store.trackAnswer(this.playerId, 'english', false);
      }
    });
  },

  _fuzzyMatch(heard, target) {
    const h = heard.replace(/\s/g, '').toLowerCase();
    const t = target.toLowerCase();
    return h.length >= 2 && (t.includes(h) || h.includes(t.slice(0, 2)));
  },

  /* ---- Magic Tracing ---- */
  traceLetter() {
    this._traceIdx = this._traceIdx ?? 0;
    const letter = TRACE_TABS[this._traceIdx];
    const area = this._area();
    area.innerHTML = `
      <div class="mini-tabs">${TRACE_TABS.map((t, i) =>
        `<button class="tab-pill ${i === this._traceIdx ? 'active' : ''}" data-i="${i}">${t.id}</button>`
      ).join('')}</div>
      <p class="game-instruction">${letter.prompt}</p>
      <div class="trace-wrap">
        <canvas id="trace-canvas" width="400" height="300"></canvas>
        <div class="trace-letter-bg">${letter.id}</div>
      </div>
      <button class="btn-primary btn-big" id="trace-done">Perfect tracing! ✓</button>
      <button class="btn-ghost-inline" id="trace-clear">Clear</button>`;
    area.querySelectorAll('[data-i]').forEach((btn) => {
      btn.addEventListener('click', () => { this._traceIdx = Number(btn.dataset.i); this.traceLetter(); });
    });
    const canvas = document.getElementById('trace-canvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let strokes = 0;
    const draw = (x, y) => {
      const colors = ['#6658ff', '#ff5ea8', '#ff8a00', '#20c997', '#ffd166'];
      ctx.strokeStyle = colors[strokes % colors.length];
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.shadowColor = '#ffd166';
      ctx.shadowBlur = 14;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.fillStyle = ctx.strokeStyle;
      ctx.font = '16px Fredoka';
      ctx.fillText('⭐', x - 8, y + 6);
      strokes++;
    };
    canvas.onpointerdown = (e) => {
      drawing = true;
      const r = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.moveTo((e.clientX - r.left) * (canvas.width / r.width), (e.clientY - r.top) * (canvas.height / r.height));
    };
    canvas.onpointermove = (e) => {
      if (!drawing) return;
      const r = canvas.getBoundingClientRect();
      draw((e.clientX - r.left) * (canvas.width / r.width), (e.clientY - r.top) * (canvas.height / r.height));
    };
    canvas.onpointerup = () => { drawing = false; };
    document.getElementById('trace-clear').onclick = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); strokes = 0; };
    document.getElementById('trace-done').onclick = () => {
      if (strokes > 12) this.win(12, 'english');
      else Rewards.showToast('Trace more — make sparkles!');
    };
  },

  /* ---- Story Quest ---- */
  storyQuest() {
    const tale = STORY_TALES[Math.floor(Math.random() * STORY_TALES.length)];
    let scene = 0;
    const render = () => {
      const s = tale.scenes[scene];
      if (!s) return this.win(15, 'english');
      const area = this._area();
      area.innerHTML = `
        <h3>${tale.emoji} ${tale.title}</h3>
        <div class="story-scene">
          <span class="story-emoji">${s.emoji}</span>
          <p class="story-text">${s.text.replace('___', '______')}</p>
        </div>
        <div class="options-grid">${s.options.map((o) => `<button class="option-btn btn-big" data-v="${o}">${o}</button>`).join('')}</div>
      `;
      area.querySelectorAll('.option-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btn.dataset.v === s.word) {
            Sounds.correct();
            Store.trackAnswer(this.playerId, 'english', true);
            scene++;
            render();
          } else {
            Sounds.wrong();
            Rewards.showToast('Listen to the story and try again!');
          }
        });
      });
    };
    render();
    Speech.navSay('Tap the right word to continue the story!');
  },

  /* ---- EVS Sort ---- */
  evsSort() {
    let score = 0;
    let timeLeft = 30;
    const items = [...EVS_SORT_ITEMS, ...EVS_SORT_ITEMS].sort(() => Math.random() - 0.5);
    let idx = 0;
    const render = () => {
      if (timeLeft <= 0) {
        clearInterval(this._timer);
        return this.win(10 + Math.floor(score / 10), 'evs');
      }
      const item = items[idx % items.length];
      idx++;
      const area = this._area();
      area.innerHTML = `
        <div class="sort-hud"><span>🎯 ${score}</span><span>⏳ ${timeLeft}s</span></div>
        <div class="sort-item-big">${item.item}<br><b>${item.name}</b></div>
        <div class="sort-bins">
          <button class="sort-bin living btn-big" data-l="true">🌱 Living</button>
          <button class="sort-bin nonliving btn-big" data-l="false">🪨 Non-Living</button>
        </div>`;
      area.querySelectorAll('.sort-bin').forEach((btn) => {
        btn.addEventListener('click', () => {
          const pick = btn.dataset.l === 'true';
          if (pick === item.living) { Sounds.correct(); score += 10; Store.trackAnswer(this.playerId, 'evs', true); }
          else { Sounds.wrong(); Store.trackAnswer(this.playerId, 'evs', false); }
          render();
        });
      });
    };
    clearInterval(this._timer);
    this._timer = setInterval(() => { timeLeft--; const el = document.querySelector('.sort-hud span:last-child'); if (el) el.textContent = `⏳ ${timeLeft}s`; if (timeLeft <= 0) render(); }, 1000);
    render();
    Speech.navSay('Sort fast! Living or non-living!');
  },

  /* ---- Habitat Builder ---- */
  habitat() {
    const pool = [...HABITAT_ANIMALS].sort(() => Math.random() - 0.5);
    let selected = null;
    const area = this._area();
    area.innerHTML = `
      <p class="game-instruction">Tap an animal, then tap its home!</p>
      <div class="habitat-zones">
        <div class="habitat-zone" data-biome="desert">🏜️ Desert<div class="zone-drop" data-biome="desert"></div></div>
        <div class="habitat-zone" data-biome="ocean">🌊 Ocean<div class="zone-drop" data-biome="ocean"></div></div>
        <div class="habitat-zone" data-biome="forest">🌲 Forest<div class="zone-drop" data-biome="forest"></div></div>
      </div>
      <div class="animal-pool" id="animal-pool">
        ${pool.map((a) => `<button type="button" class="animal-chip" data-biome="${a.biome}" data-name="${a.name}">${a.emoji}</button>`).join('')}
      </div>
      <button class="btn-primary btn-big" id="habitat-check">Check Habitat ✓</button>
    `;
    area.querySelectorAll('.animal-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        Sounds.tap();
        area.querySelectorAll('.animal-chip').forEach((c) => c.classList.remove('selected'));
        chip.classList.add('selected');
        selected = chip;
      });
    });
    area.querySelectorAll('.zone-drop').forEach((zone) => {
      zone.addEventListener('click', () => {
        if (!selected) return;
        zone.appendChild(selected);
        selected.classList.remove('selected');
        selected = null;
        Sounds.tap();
      });
    });
    document.getElementById('habitat-check').addEventListener('click', () => {
      let ok = true;
      area.querySelectorAll('.zone-drop .animal-chip').forEach((el) => {
        const zone = el.closest('.zone-drop').dataset.biome;
        if (zone !== el.dataset.biome) ok = false;
      });
      const left = area.querySelectorAll('#animal-pool .animal-chip').length;
      if (ok && left === 0) this.win(18, 'evs');
      else {
        Sounds.wrong();
        Rewards.showToast(left > 0 ? 'Place all animals first!' : 'Some animals need a new home!');
      }
    });
    Speech.navSay('Put each animal in the right habitat!');
  },

  /* ---- Plant Magic (camera AR-lite) ---- */
  plantMagic() {
    const steps = [
      { emoji: '🌰', title: 'Plant the seed', btn: 'Plant Seed 🌱', desc: 'A tiny seed waits to grow!' },
      { emoji: '🌱', title: 'Give water', btn: 'Water 💦', desc: 'Roots drink and sprouts appear!' },
      { emoji: '🪴', title: 'Sunlight', btn: 'Sunlight ☀️', desc: 'Leaves make plant food!' },
      { emoji: '🌸', title: 'Bloom!', btn: 'Grow another 🔄', desc: 'A beautiful flower blossomed!' },
    ];
    let step = 0;
    const area = this._area();
    const render = () => {
      const s = steps[step];
      area.innerHTML = `
        <p class="game-instruction">${s.title}</p>
        <div class="ar-view">
          <video id="ar-video" autoplay playsinline muted></video>
          <div class="plant-overlay"><span class="plant-stage" id="plant-stage">${s.emoji}</span></div>
        </div>
        <p class="hint" id="plant-msg">${s.desc}</p>
        <button class="btn-primary btn-big" id="plant-tap">${s.btn}</button>`;
      this._startCamera();
      document.getElementById('plant-tap').onclick = () => {
        Sounds.tap();
        if (step < steps.length - 1) {
          step++;
          Rewards.confetti(12);
          render();
        } else {
          Sounds.cheer();
          this.win(18, 'evs');
        }
      };
    };
    render();
    Speech.navSay('Grow a magical plant on your table!');
  },

  countBasket() {
    const target = 2 + Math.floor(Math.random() * 4);
    let count = 0;
    const area = this._area();
    const render = () => {
      area.innerHTML = `
        <p class="game-instruction">Put exactly <b>${target}</b> apples in the basket!</p>
        <div class="drop-basket" id="count-basket" style="font-size:2.5rem;min-height:100px">🧺</div>
        <div class="apple-pile" style="justify-content:center;margin-top:12px">
          ${Array(8).fill(0).map((_, i) => `<button class="draggable btn-big" data-i="${i}">🍎</button>`).join('')}
        </div>
        <button class="btn-primary btn-big" id="count-check">Check count ✓</button>`;
      area.querySelectorAll('.draggable').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btn.disabled) return;
          btn.disabled = true;
          btn.style.opacity = '0.4';
          count++;
          document.getElementById('count-basket').textContent = '🧺' + '🍎'.repeat(count);
          Sounds.tap();
        });
      });
      document.getElementById('count-check').onclick = () => {
        if (count === target) this.win(12, 'math');
        else { Sounds.wrong(); Rewards.showToast(`You have ${count} — need ${target}!`); }
      };
    };
    render();
  },

  wordBuilder() {
    const word = WORD_BUILD_LIST[Math.floor(Math.random() * WORD_BUILD_LIST.length)];
    let built = '';
    const extra = 'AEIOU'.split('').slice(0, 2);
    const pool = [...word.split(''), ...extra].sort(() => Math.random() - 0.5);
    const area = this._area();
    area.innerHTML = `
      <p class="game-instruction">Spell: <b class="rainbow">${word}</b></p>
      <div class="word-slots" id="wb-slots">${word.split('').map(() => '<div class="word-slot"></div>').join('')}</div>
      <div class="letter-tiles">${pool.map((l) => `<button class="letter-tile">${l}</button>`).join('')}</div>
      <button class="btn-primary btn-big" id="wb-check">Check ✓</button>`;
    area.querySelectorAll('.letter-tile').forEach((tile) => {
      tile.addEventListener('click', () => {
        if (tile.classList.contains('used')) return;
        built += tile.textContent;
        tile.classList.add('used');
        const slots = area.querySelectorAll('.word-slot');
        slots[built.length - 1].textContent = tile.textContent;
        Sounds.tap();
      });
    });
    document.getElementById('wb-check').onclick = () => {
      if (built === word) this.win(12, 'english');
      else { Sounds.wrong(); built = ''; area.querySelectorAll('.word-slot').forEach((s) => { s.textContent = ''; }); area.querySelectorAll('.letter-tile').forEach((t) => t.classList.remove('used')); }
    };
    Speech.speakWord(word.toLowerCase());
  },

  fableChoice() {
    const f = FABLE_CHOICE[Math.floor(Math.random() * FABLE_CHOICE.length)];
    const area = this._area();
    area.innerHTML = `
      <h3>${f.title}</h3>
      <div class="story-scene"><span class="story-emoji">${f.art}</span><p class="story-text">${f.text}</p></div>
      <div class="options-grid">
        <button class="option-btn btn-big" data-ok="1">${f.correct}</button>
        <button class="option-btn btn-big" data-ok="0">${f.wrong}</button>
      </div>`;
    Speech.speakSentence(f.text);
    area.querySelectorAll('.option-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (btn.dataset.ok === '1') {
          Sounds.cheer();
          area.querySelector('.story-text').innerHTML = `<b>Wonderful!</b> ${f.success}`;
          setTimeout(() => this.win(15, 'values'), 1200);
        } else {
          Sounds.wrong();
          Rewards.showToast('Think again — pick the smart choice!');
        }
      });
    });
  },

  nounSort() {
    const items = [
      { word: 'Simba', type: 'Person/Animal' },
      { word: 'Park', type: 'Place/Thing' },
      { word: 'Puppy', type: 'Person/Animal' },
      { word: 'Bone', type: 'Place/Thing' },
      { word: 'Mufasa', type: 'Person/Animal' },
      { word: 'Ball', type: 'Place/Thing' },
    ];
    let idx = 0;
    const area = this._area();
    const renderNext = () => {
      if (idx >= items.length) {
        return this.win(15, 'english');
      }
      const cur = items[idx];
      area.innerHTML = `
        <p class="game-instruction">Sort the noun into the right puppy bucket!</p>
        <div style="text-align:center;margin:18px 0;">
          <span style="font-size:2rem;font-weight:900;background:#fff8db;border:3px solid #ffd166;padding:12px 28px;border-radius:24px;color:#2b2660;display:inline-block;">
            ${cur.word}
          </span>
        </div>
        <div style="display:flex;justify-content:center;gap:24px;margin-top:20px;">
          <button class="btn-primary btn-big sort-bucket" data-type="Person/Animal" style="background:linear-gradient(135deg,#ff8a3d,#ffc24d);color:#5a2d00;">
            🐶 Person / Animal
          </button>
          <button class="btn-primary btn-big sort-bucket" data-type="Place/Thing" style="background:linear-gradient(135deg,#38bdf8,#0284c7);">
            🏠 Place / Thing
          </button>
        </div>
      `;
      area.querySelectorAll('.sort-bucket').forEach((btn) => {
        btn.onclick = () => {
          if (btn.dataset.type === cur.type) {
            Sounds.correct();
            Store.trackAnswer(this.playerId, 'english', true);
            idx++;
            renderNext();
          } else {
            Sounds.wrong();
            Store.trackAnswer(this.playerId, 'english', false);
            Rewards.showToast('Oops! Try the other puppy bucket! 🐾');
          }
        };
      });
    };
    renderNext();
  },

  memoryMatch() {
    const words = ['Simba 🐶', 'Bone 🦴', 'Park 🌳', 'Ball ⚽', 'Puppy 🐾', 'Happy 🌟'];
    const vals = [...words, ...words].sort(() => Math.random() - 0.5);
    let open = [];
    let done = 0;
    const area = this._area();
    const render = () => {
      area.innerHTML = `<p class="game-instruction">Find matching English noun & word pairs!</p>
        <div class="memory-grid">${vals.map((v, i) =>
          `<button class="mem-card" data-v="${v}" data-i="${i}" style="font-size:1.15rem;font-weight:800;">🐾</button>`
        ).join('')}</div>`;
      area.querySelectorAll('.mem-card').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btn.classList.contains('done') || btn.classList.contains('open') || open.length >= 2) return;
          Sounds.tap();
          btn.classList.add('open');
          btn.textContent = btn.dataset.v;
          open.push(btn);
          if (open.length === 2) {
            setTimeout(() => {
              if (open[0].dataset.v === open[1].dataset.v) {
                Sounds.correct();
                Store.trackAnswer(this.playerId, 'english', true);
                open.forEach((b) => { b.classList.add('done'); });
                done += 2;
                if (done === vals.length) this.win(20, 'english');
              } else {
                Sounds.wrong();
                Store.trackAnswer(this.playerId, 'english', false);
                open.forEach((b) => { b.classList.remove('open'); b.textContent = '🐾'; });
              }
              open = [];
            }, 700);
          }
        });
      });
    };
    render();
  },

  creativeDraw() {
    const area = this._area();
    area.innerHTML = `
      <p class="game-instruction">Draw a sun, flower, or your pet!</p>
      <div class="draw-tools">
        ${['#111', '#ff5a5f', '#20c997', '#38bdf8', '#ffd166', '#ff5ea8'].map((c) =>
          `<button class="color-dot" style="background:${c}" data-c="${c}"></button>`
        ).join('')}
        <button class="btn-fun ghost" id="draw-clear">Clear</button>
      </div>
      <canvas id="draw-canvas" class="draw-canvas" width="600" height="280"></canvas>
      <button class="btn-primary btn-big" id="draw-done">✨ Art finished!</button>`;
    const canvas = document.getElementById('draw-canvas');
    const ctx = canvas.getContext('2d');
    let color = '#111';
    let drawing = false;
    area.querySelectorAll('.color-dot').forEach((b) => {
      b.onclick = () => { color = b.dataset.c; };
    });
    const pos = (e) => {
      const r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) };
    };
    canvas.onpointerdown = (e) => { drawing = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); };
    canvas.onpointermove = (e) => {
      if (!drawing) return;
      ctx.strokeStyle = color;
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      const p = pos(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    canvas.onpointerup = () => { drawing = false; };
    document.getElementById('draw-clear').onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById('draw-done').onclick = () => this.win(10, 'art');
  },

  spinWheel() {
    const area = this._area();
    area.innerHTML = `
      <p class="game-instruction">Spin for a surprise reward!</p>
      <div class="wheel-pointer">🔻</div>
      <div class="prize-wheel" id="prize-wheel">🎁</div>
      <button class="btn-fun orange btn-big" id="spin-btn">Spin! 🎡</button>
      <p id="spin-result" class="hint"></p>`;
    document.getElementById('spin-btn').onclick = () => {
      const prizes = [5, 8, 10, 12, 15, 20];
      const coins = prizes[Math.floor(Math.random() * prizes.length)];
      const wheel = document.getElementById('prize-wheel');
      wheel.style.transform = `rotate(${1440 + Math.random() * 360}deg)`;
      Sounds.chest();
      setTimeout(() => {
        const res = Store.awardFun(this.playerId, { coins, xp: 8, label: 'Prize Wheel' });
        if (res.capped) {
          document.getElementById('spin-result').textContent = `Fun superstar! The puppies are full for today (XP only)!`;
          Speech.speak("Fun superstar! The puppies are full for today — feed them with something new!");
        } else {
          document.getElementById('spin-result').textContent = `You won ${res.coins} coins!`;
        }
        Rewards.confetti(30);
        App.refreshStats();
      }, 2800);
    };
  },

  _setupDrag(selector, dropZone, onDrop) {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text', el.dataset.i || '1');
        el.classList.add('dragging');
      });
      el.addEventListener('dragend', () => el.classList.remove('dragging'));
      el.addEventListener('click', () => {
        if (dropZone && dropZone.classList.contains('zone-drop')) {
          dropZone.appendChild(el);
          onDrop(el);
        } else if (dropZone && el.parentElement !== dropZone) {
          dropZone.appendChild(el);
          onDrop(el);
        }
      });
    });
    if (dropZone) {
      dropZone.addEventListener('dragover', (e) => e.preventDefault());
      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const dragging = document.querySelector('.dragging');
        if (dragging) {
          dropZone.appendChild(dragging);
          onDrop(dragging);
        }
      });
    }
  },

  _startCamera() {
    const video = document.getElementById('ar-video');
    if (!video || !navigator.mediaDevices) {
      video?.parentElement?.insertAdjacentHTML('beforeend', '<p class="tip-box">Camera not available — imagine the seed on your table!</p>');
      return;
    }
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => { this._stream = stream; video.srcObject = stream; })
      .catch(() => {
        document.getElementById('plant-overlay').style.background = 'linear-gradient(180deg,#87CEEB,#90EE90)';
      });
  },

  _stopCamera() {
    if (this._stream) {
      this._stream.getTracks().forEach((t) => t.stop());
      this._stream = null;
    }
  },
};
