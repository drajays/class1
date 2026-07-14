/* storybook.js — Story Time Module (Phase B Crown Jewel)
   120 leveled micro-stories with tap-to-hear words, auto-read, read-aloud moment, and comprehension quiz.
*/

const StoryBook = {
  DATA: null,
  currentStory: null,
  startTime: 0,
  wrongCount: 0,
  qIndex: 0,

  async load() {
    if (this.DATA) return this.DATA;
    try {
      const res = await fetch('data/stories.json');
      this.DATA = await res.json();
    } catch (e) {
      console.error('Failed to load stories.json', e);
      this.DATA = { levels: [] };
    }
    return this.DATA;
  },

  injectStyles() {
    if (document.getElementById('storybook-styles')) return;
    const style = document.createElement('style');
    style.id = 'storybook-styles';
    style.textContent = `
      .st-container { max-width: 860px; margin: 0 auto; padding: 16px; font-family: var(--font-main, sans-serif); }
      .st-bands-tabs { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 12px; margin-bottom: 16px; }
      .st-band-tab { flex: 1; min-width: 140px; padding: 12px 16px; border-radius: 16px; border: 2px solid #e0e0e0; background: #fff; font-size: 1rem; font-weight: 700; cursor: pointer; text-align: center; transition: all 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
      .st-band-tab.active { background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: #fff; border-color: transparent; transform: translateY(-2px); box-shadow: 0 6px 16px rgba(255,107,107,0.3); }
      .st-band-tab.locked { opacity: 0.6; cursor: not-allowed; background: #f5f5f5; }
      .st-stories-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
      .st-story-card { background: #fff; border-radius: 20px; padding: 18px; border: 2px solid #f0f0f0; box-shadow: 0 6px 14px rgba(0,0,0,0.06); cursor: pointer; transition: all 0.2s; display: flex; flex-direction: column; justify-content: space-between; }
      .st-story-card:hover { transform: translateY(-3px); border-color: #FF8E53; box-shadow: 0 10px 20px rgba(255,142,83,0.18); }
      .st-story-emoji { font-size: 2.2rem; margin-bottom: 8px; }
      .st-story-title { font-size: 1.18rem; font-weight: 800; color: #2D3748; margin-bottom: 8px; line-height: 1.3; }
      .st-story-meta { display: flex; justify-content: space-between; align-items: center; font-size: 0.95rem; font-weight: 700; }
      .st-level-pill { background: #EDF2F7; color: #4A5568; padding: 4px 10px; border-radius: 12px; font-size: 0.82rem; }
      .st-stars { color: #F6AD55; letter-spacing: 2px; }
      
      .st-reader { background: #fff; border-radius: 24px; padding: 28px; box-shadow: 0 12px 30px rgba(0,0,0,0.08); margin-bottom: 24px; border: 3px solid #FFF5F5; }
      .st-reader-header { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px; border-bottom: 2px solid #EDF2F7; padding-bottom: 16px; }
      .st-reader-actions { display: flex; gap: 10px; flex-wrap: wrap; }
      .st-btn { padding: 12px 22px; border-radius: 16px; font-weight: 800; font-size: 1rem; cursor: pointer; border: none; display: inline-flex; align-items: center; gap: 8px; transition: all 0.2s; }
      .st-btn-primary { background: linear-gradient(135deg, #48BB78, #38A169); color: #fff; box-shadow: 0 6px 14px rgba(72,187,120,0.3); }
      .st-btn-accent { background: linear-gradient(135deg, #4299E1, #3182CE); color: #fff; box-shadow: 0 6px 14px rgba(66,153,225,0.3); }
      .st-btn-mic { background: linear-gradient(135deg, #ED8936, #DD6B20); color: #fff; box-shadow: 0 6px 14px rgba(237,137,54,0.3); }
      
      .st-text-area { font-size: 1.65rem; line-height: 2.1; color: #2D3748; padding: 18px 8px; }
      .st-word { display: inline-block; padding: 2px 6px; margin: 2px; border-radius: 10px; cursor: pointer; transition: background 0.15s, transform 0.15s; border-bottom: 2px dotted #CBD5E0; }
      .st-word:hover { background: #FEFCBF; transform: scale(1.06); border-bottom-color: #D69E2E; }
      .st-word.active { background: #FAF089; color: #744210; font-weight: 800; transform: scale(1.1); box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
      
      .st-aloud-card { background: #EBF8FF; border: 2px solid #90CDF4; border-radius: 18px; padding: 16px; margin-top: 20px; text-align: center; }
      .st-aloud-praise { font-size: 1.15rem; font-weight: 800; color: #2B6CB0; margin-top: 10px; }
      
      .st-quiz-card { background: #fff; border-radius: 24px; padding: 28px; box-shadow: 0 12px 30px rgba(0,0,0,0.08); text-align: center; max-width: 680px; margin: 0 auto; }
      .st-quiz-q { font-size: 1.4rem; font-weight: 800; color: #2D3748; margin-bottom: 22px; white-space: pre-line; }
      .st-quiz-options { display: grid; gap: 14px; margin-bottom: 20px; }
      .st-quiz-opt { padding: 16px 20px; border-radius: 18px; border: 2px solid #E2E8F0; background: #F7FAFC; font-size: 1.15rem; font-weight: 700; color: #2D3748; cursor: pointer; transition: all 0.2s; text-align: left; }
      .st-quiz-opt:hover { border-color: #4299E1; background: #EBF8FF; transform: translateX(4px); }
      .st-quiz-opt.correct { background: #C6F6D5; border-color: #38A169; color: #22543D; }
      .st-quiz-opt.wrong { background: #FED7D7; border-color: #E53E3E; color: #742A2A; }
      .st-why { background: #EDF2F7; padding: 12px 18px; border-radius: 14px; font-weight: 700; color: #4A5568; margin-top: 12px; }
      
      .st-home-hero { background: linear-gradient(135deg, #FFF5F5, #FEEBC8); border: 3px solid #FBD38D; border-radius: 24px; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between; gap: 16px; box-shadow: 0 8px 20px rgba(237,137,54,0.15); margin-bottom: 20px; }
      .st-home-hero-content h3 { font-size: 1.35rem; font-weight: 800; color: #7B341E; margin: 0 0 6px 0; }
      .st-home-hero-content p { font-size: 0.98rem; font-weight: 700; color: #9C4221; margin: 0; }
    `;
    document.head.appendChild(style);
  },

  isBandUnlocked(bandLevel) {
    if (bandLevel <= 1) return true;
    const playerId = App.playerId || 'advaita';
    const prevBand = (this.DATA?.levels || []).find((b) => b.level === bandLevel - 1);
    if (!prevBand) return true;
    return prevBand.stories.some((st) => Store.getLevelStars(playerId, 'reading', st.id) > 0);
  },

  getStoryStars(storyId) {
    return Store.getLevelStars(App.playerId || 'advaita', 'reading', storyId);
  },

  async open(selectedBandLevel = 1) {
    await this.load();
    this.injectStyles();
    const view = document.getElementById('storytime-view');
    if (!view) return;

    const bands = this.DATA?.levels || [];
    if (!bands.length) {
      view.innerHTML = `<div class="st-container"><p>No stories found.</p></div>`;
      return;
    }

    let activeBand = bands.find((b) => b.level === selectedBandLevel) || bands[0];

    const renderPicker = () => {
      let tabsHtml = `<div class="st-bands-tabs">`;
      bands.forEach((b) => {
        const unlocked = this.isBandUnlocked(b.level);
        const activeCls = b.level === activeBand.level ? 'active' : '';
        const lockCls = !unlocked ? 'locked' : '';
        tabsHtml += `
          <button class="st-band-tab ${activeCls} ${lockCls}" data-level="${b.level}">
            ${!unlocked ? '🔒 ' : ''}${b.name}
          </button>
        `;
      });
      tabsHtml += `</div>`;

      let gridHtml = `<div class="st-stories-grid">`;
      activeBand.stories.forEach((st) => {
        const stars = this.getStoryStars(st.id);
        const starStr = stars === 3 ? '⭐⭐⭐' : stars === 2 ? '⭐⭐' : stars === 1 ? '⭐' : '☆';
        gridHtml += `
          <div class="st-story-card" data-story-id="${st.id}">
            <div>
              <div class="st-story-emoji">${st.emoji || '📖'}</div>
              <div class="st-story-title">${st.title}</div>
            </div>
            <div class="st-story-meta">
              <span class="st-level-pill">Level ${st.level}</span>
              <span class="st-stars">${starStr}</span>
            </div>
          </div>
        `;
      });
      gridHtml += `</div>`;

      view.innerHTML = `
        <div class="st-container">
          ${tabsHtml}
          ${gridHtml}
        </div>
      `;

      view.querySelectorAll('.st-band-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          const lvl = parseInt(tab.dataset.level, 10);
          if (!this.isBandUnlocked(lvl)) {
            Sounds.wrong();
            Speech.speak('Complete a story in the previous level to unlock this book!');
            return;
          }
          Sounds.tap();
          activeBand = bands.find((b) => b.level === lvl) || activeBand;
          renderPicker();
        });
      });

      view.querySelectorAll('.st-story-card').forEach((card) => {
        card.addEventListener('click', () => {
          Sounds.tap();
          this.startStoryById(card.dataset.storyId);
        });
      });
    };

    renderPicker();
  },

  startStoryById(storyId) {
    let target = null;
    (this.DATA?.levels || []).forEach((b) => {
      const found = (b.stories || []).find((s) => s.id === storyId);
      if (found) target = found;
    });
    if (!target) return;
    this.renderStoryScreen(target);
  },

  renderStoryScreen(st) {
    this.currentStory = st;
    this.startTime = Date.now();
    this.wrongCount = 0;
    this.injectStyles();

    const view = document.getElementById('storytime-view');
    if (!view) return;

    const words = st.text.split(' ');
    const wordsHtml = words.map((w, i) => {
      const clean = w.replace(/[^a-zA-Z0-9']/g, '');
      return `<span class="st-word" data-word="${clean}">${w}</span>`;
    }).join(' ');

    view.innerHTML = `
      <div class="st-container">
        <div class="st-reader">
          <div class="st-reader-header">
            <div>
              <button class="btn-back" id="st-back-btn">← All Stories</button>
              <h3 style="margin: 8px 0 0 0; font-size: 1.4rem; color: #2D3748;">
                ${st.emoji || '📖'} ${st.title}
              </h3>
            </div>
            <div class="st-reader-actions">
              <button class="st-btn st-btn-accent" id="st-read-all">▶️ Read All to Me</button>
              <button class="st-btn speech-pause-btn" id="st-pause-btn" style="background:#ECC94B; color:#744210;">⏸️ Pause Voice</button>
              <button class="st-btn st-btn-mic" id="st-read-aloud">🎙️ Read Aloud to Simba</button>
            </div>
          </div>

          <div class="st-text-area" id="st-text-box">
            ${wordsHtml}
          </div>

          <div id="st-aloud-feedback"></div>

          <div style="margin-top: 28px; text-align: center;">
            <button class="st-btn st-btn-primary" id="st-finish-btn" style="font-size: 1.15rem; padding: 14px 32px;">
              ${st.level >= 2 && st.questions && st.questions.length ? '❓ Take Story Quiz!' : '✨ Finish & Earn Reward!'}
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('st-back-btn')?.addEventListener('click', () => {
      Sounds.tap();
      Speech.stop();
      this.open(st.level);
    });

    view.querySelectorAll('.st-word').forEach((el) => {
      el.addEventListener('click', () => {
        Sounds.tap();
        view.querySelectorAll('.st-word').forEach((sp) => sp.classList.remove('active'));
        el.classList.add('active');
        const word = el.dataset.word;
        if (word) Speech.speak(word);
        setTimeout(() => el.classList.remove('active'), 850);
      });
    });

    document.getElementById('st-read-all')?.addEventListener('click', () => {
      Sounds.tap();
      Speech.speak(st.text);
    });
    document.getElementById('st-pause-btn')?.addEventListener('click', () => {
      Sounds.tap();
      Speech.togglePause();
    });

    document.getElementById('st-read-aloud')?.addEventListener('click', async () => {
      Sounds.tap();
      const fb = document.getElementById('st-aloud-feedback');
      fb.innerHTML = `
        <div class="st-aloud-card">
          <div style="font-weight: 800; color: #2B6CB0;">🎙️ Listening... Read a sentence to Simba!</div>
        </div>
      `;
      const transcript = await Speech.listen('en-IN');
      fb.innerHTML = `
        <div class="st-aloud-card">
          <div class="st-aloud-praise">
            🐶 Wonderful reading! Simba loves hearing your voice! ⭐
            ${transcript ? `<div style="font-size:0.9rem; margin-top:4px; font-weight:600; color:#4A5568;">Simba heard: "${transcript}"</div>` : ''}
          </div>
        </div>
      `;
      Sounds.cheer();
    });

    document.getElementById('st-finish-btn')?.addEventListener('click', () => {
      Sounds.tap();
      Speech.stop();
      if (st.level >= 2 && st.questions && st.questions.length) {
        this.startQuiz(st);
      } else {
        this.finishStory(st, 0);
      }
    });

    setTimeout(() => {
      Speech.speak(st.text);
    }, 600);
  },

  startQuiz(st) {
    this.qIndex = 0;
    this.wrongCount = 0;
    this.renderQuizScreen(st);
  },

  renderQuizScreen(st) {
    const q = st.questions[this.qIndex];
    const view = document.getElementById('storytime-view');
    if (!view || !q) {
      this.finishStory(st, this.wrongCount);
      return;
    }

    const optsHtml = q.options.map((opt, idx) => `
      <button class="st-quiz-opt" data-opt="${opt.replace(/"/g, '&quot;')}">
        ${idx + 1}. ${opt}
      </button>
    `).join('');

    view.innerHTML = `
      <div class="st-container">
        <div class="st-quiz-card">
          <div style="font-size:0.95rem; font-weight:800; color:#718096; margin-bottom: 8px;">
            STORY QUIZ • QUESTION ${this.qIndex + 1} OF ${st.questions.length}
          </div>
          <div class="st-quiz-q">${q.q}</div>
          <div class="st-quiz-options" id="quiz-options-grid">
            ${optsHtml}
          </div>
          <div id="st-why-box"></div>
        </div>
      </div>
    `;

    const grid = document.getElementById('quiz-options-grid');
    grid.querySelectorAll('.st-quiz-opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        const picked = btn.dataset.opt;
        if (picked === q.a) {
          Sounds.correct();
          btn.classList.add('correct');
          const whyBox = document.getElementById('st-why-box');
          if (whyBox && q.why) {
            whyBox.innerHTML = `<div class="st-why">💡 ${q.why}</div>`;
          }
          grid.querySelectorAll('.st-quiz-opt').forEach((b) => b.style.pointerEvents = 'none');
          setTimeout(() => {
            this.qIndex++;
            if (this.qIndex < st.questions.length) {
              this.renderQuizScreen(st);
            } else {
              this.finishStory(st, this.wrongCount);
            }
          }, 1400);
        } else {
          Sounds.wrong();
          btn.classList.add('wrong');
          btn.style.pointerEvents = 'none';
          this.wrongCount++;
          const whyBox = document.getElementById('st-why-box');
          const help = q.why || `The answer is "${q.a}".`;
          if (whyBox) whyBox.innerHTML = `<div class="st-why">💡 ${help} 👇 Now tap the right answer!</div>`;
          Speech.speak(help, 0.85, 'en-IN');
        }
      });
    });
  },

  finishStory(st, wrong) {
    const elapsed = Math.round((Date.now() - this.startTime) / 1000);
    const playerId = App.playerId || 'advaita';
    const stars = wrong === 0 ? 3 : wrong === 1 ? 2 : 1;
    const coins = 15;

    const reward = Store.awardLevel(playerId, 'reading', st.id, stars, coins, {
      total: Math.max(3, (st.questions && st.questions.length) || 1),
      title: st.title,
      level: st.level,
      wrong: wrong,
      timeSec: elapsed
    });

    Sounds.cheer();
    const starStr = '⭐'.repeat(stars);

    const view = document.getElementById('storytime-view');
    if (view) {
      view.innerHTML = `
        <div class="st-container">
          <div class="st-quiz-card" style="margin-top: 30px;">
            <div style="font-size: 3.5rem; margin-bottom: 12px;">🎉 🐶 🌟</div>
            <h2 style="font-size: 1.8rem; color: #2D3748; margin-bottom: 8px;">Story Completed!</h2>
            <p style="font-size: 1.2rem; color: #4A5568; font-weight: 700;">
              You read <strong>${st.title}</strong>!
            </p>
            <div style="font-size: 1.8rem; margin: 16px 0;">${starStr}</div>
            ${reward.coins > 0 ? `<div style="font-size: 1.3rem; font-weight: 800; color: #DD6B20;">+${reward.coins} Coins Earned! 🪙</div>` : ''}
            <div style="margin-top: 26px;">
              <button class="st-btn st-btn-primary" id="st-back-picker">📖 Back to Story Books</button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('st-back-picker')?.addEventListener('click', () => {
        Sounds.tap();
        this.open(st.level);
      });
    }
  },

  renderHomeCard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    this.injectStyles();

    let completedCount = 0;
    let totalCount = 120;
    if (this.DATA && this.DATA.levels) {
      totalCount = 0;
      const playerId = App.playerId || 'advaita';
      this.DATA.levels.forEach((b) => {
        (b.stories || []).forEach((st) => {
          totalCount++;
          if (Store.getLevelStars(playerId, 'reading', st.id) > 0) completedCount++;
        });
      });
    }

    const pct = totalCount > 0 ? Math.min(100, Math.floor((completedCount / totalCount) * 100)) : 0;
    container.innerHTML = `
      <button class="mission-card ui-promo-card st-compact-card" id="st-home-open-btn" style="height:100%; display:flex; flex-direction:column; justify-content:space-between; text-align:left;">
        <div class="mission-header" style="width:100%; display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <span class="mission-badge" style="background:#fce7f3; color:#db2777;">📖 STORY TIME</span>
          <span class="mission-reward-badge">${completedCount}/${totalCount} read</span>
        </div>
        <div class="mission-body" style="display:flex; gap:10px; align-items:center; width:100%; margin:4px 0;">
          <div style="font-size:2rem; flex-shrink:0;">🦁</div>
          <div class="mission-left" style="flex:1; min-width:0;">
            <div class="mission-title" style="font-size:0.95rem; margin:0 0 4px; color:var(--text-primary);">Read with Simba!</div>
            <div class="ui-progress" style="height:6px; margin:4px 0;"><div class="ui-progress-bar" style="width:${pct}%; background:linear-gradient(90deg,#f472b6,#ec4899);"></div></div>
            <div class="mission-why" style="font-size:0.88rem; color:var(--text-secondary); line-height:1.3; margin:0;">Tap words to hear • Read Aloud</div>
          </div>
        </div>
        <div style="width:100%; text-align:right; margin-top:4px;">
          <span class="btn-fun pink mission-btn" style="padding:6px 12px; font-size:0.85rem;">Read ➜</span>
        </div>
      </button>
    `;

    container.querySelector('#st-home-open-btn')?.addEventListener('click', () => {
      Sounds.tap();
      App.go('storytime');
    });
  }
};
