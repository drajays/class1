/* englishboosters.js — English Boosters Module (Phase C)
   1. Sight-Word Practice (10 sets from 233 sightWords) -> awardLevel('english', 'sight-N')
   2. Word-Family Blender (8 sets from 78 wordFamilies) -> awardLevel('english', 'family-N')
   3. Hub access to Word Power Book (SubjectBook.open('english_plus') for L3-L5 Noun & Vocab chapters)
*/

const EnglishBoosters = {
  data: null,
  activeTab: 'sight', // 'sight' | 'family'

  async load() {
    if (this.data) return this.data;
    try {
      const res = await fetch('data/word_practice.json');
      this.data = await res.json();
    } catch (e) {
      console.error('Failed to load word_practice.json', e);
      this.data = { sightWords: [], wordFamilies: [] };
    }
    return this.data;
  },

  injectStyles() {
    if (document.getElementById('boosters-styles')) return;
    const style = document.createElement('style');
    style.id = 'boosters-styles';
    style.textContent = `
      .ep-container { max-width: 860px; margin: 0 auto; padding: 16px; font-family: var(--font-main, sans-serif); }
      .ep-nav { display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
      .ep-nav-btn { flex: 1; min-width: 150px; padding: 14px; border-radius: 18px; border: 2px solid #E2E8F0; background: #fff; font-size: 1.1rem; font-weight: 800; color: #4A5568; cursor: pointer; transition: all 0.2s; text-align: center; }
      .ep-nav-btn.active { background: linear-gradient(135deg, #FF6B6B, #FF8E53); color: #fff; border-color: transparent; box-shadow: 0 6px 16px rgba(255,107,107,0.3); }
      
      .ep-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
      .ep-card { background: #fff; border-radius: 20px; padding: 18px; border: 2px solid #F0F0F0; box-shadow: 0 6px 14px rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between; cursor: pointer; transition: transform 0.2s; }
      .ep-card:hover { transform: translateY(-3px); border-color: #FF8E53; }
      .ep-card-title { font-size: 1.25rem; font-weight: 800; color: #2D3748; margin-bottom: 8px; }
      .ep-card-sub { font-size: 0.95rem; font-weight: 700; color: #718096; margin-bottom: 12px; }
      
      .ep-words-box { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
      .ep-word-chip { background: #EDF2F7; padding: 6px 12px; border-radius: 14px; font-weight: 800; color: #2B6CB0; cursor: pointer; transition: transform 0.15s, background 0.15s; }
      .ep-word-chip:hover { background: #FEFCBF; transform: scale(1.08); }
      
      .ep-quiz-box { background: #fff; border-radius: 24px; padding: 24px; box-shadow: 0 10px 25px rgba(0,0,0,0.08); max-width: 650px; margin: 0 auto; text-align: center; }
      .ep-q-title { font-size: 1.45rem; font-weight: 800; color: #2D3748; margin-bottom: 20px; }
      .ep-opt-btn { width: 100%; padding: 16px; border-radius: 18px; border: 2px solid #E2E8F0; background: #F7FAFC; font-size: 1.2rem; font-weight: 700; color: #2D3748; cursor: pointer; margin-bottom: 12px; transition: all 0.2s; }
      .ep-opt-btn:hover { background: #EBF8FF; border-color: #4299E1; }
      .ep-opt-btn.correct { background: #C6F6D5; border-color: #38A169; color: #22543D; }
      .ep-opt-btn.wrong { background: #FED7D7; border-color: #E53E3E; color: #742A2A; }
    `;
    document.head.appendChild(style);
  },

  async open(tab = 'sight') {
    await this.load();
    this.injectStyles();
    this.activeTab = tab;
    this.renderHub();
  },

  renderHub() {
    const view = document.getElementById('boosters-view');
    if (!view) return;

    view.innerHTML = `
      <div class="ep-container">
        <div class="ep-nav">
          <button class="ep-nav-btn ${this.activeTab === 'sight' ? 'active' : ''}" id="ep-tab-sight">
            👀 Sight Words (Sets 1–10)
          </button>
          <button class="ep-nav-btn ${this.activeTab === 'family' ? 'active' : ''}" id="ep-tab-family">
            🧩 Word Families (Phonics)
          </button>
          <button class="ep-nav-btn" id="ep-tab-book">
            📚 Word Power Book (L3–L5 Nouns & Vocab)
          </button>
        </div>
        <div id="ep-content"></div>
      </div>
    `;

    document.getElementById('ep-tab-sight')?.addEventListener('click', () => {
      Sounds.tap();
      this.activeTab = 'sight';
      this.renderHub();
    });

    document.getElementById('ep-tab-family')?.addEventListener('click', () => {
      Sounds.tap();
      this.activeTab = 'family';
      this.renderHub();
    });

    document.getElementById('ep-tab-book')?.addEventListener('click', () => {
      Sounds.tap();
      App.go('evs'); // Using SubjectBook
      SubjectBook.open('english_plus');
    });

    const content = document.getElementById('ep-content');
    if (this.activeTab === 'sight') {
      this.renderSightSets(content);
    } else {
      this.renderFamilySets(content);
    }
  },

  renderSightSets(container) {
    const words = this.data?.sightWords || [];
    const setSize = 23;
    const totalSets = Math.ceil(words.length / setSize);

    let html = `<div class="ep-grid">`;
    for (let i = 0; i < totalSets; i++) {
      const slice = words.slice(i * setSize, (i + 1) * setSize);
      const levelId = `sight-${i + 1}`;
      const stars = Store.getLevelStars(App.playerId || 'advaita', 'english', levelId);
      const starStr = stars === 3 ? '⭐⭐⭐' : stars === 2 ? '⭐⭐' : stars === 1 ? '⭐' : '☆';

      html += `
        <div class="ep-card" data-set-idx="${i}">
          <div>
            <div class="ep-card-title">Sight Words Set ${i + 1}</div>
            <div class="ep-card-sub">${slice.length} words • Level ${i < 4 ? 1 : 2}</div>
            <div class="ep-words-box">
              ${slice.slice(0, 6).map(w => `<span class="ep-word-chip">${w}</span>`).join('')}
              ${slice.length > 6 ? `<span style="align-self:center; color:#A0AEC0; font-weight:700;">+${slice.length - 6} more</span>` : ''}
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
            <span style="font-weight:800; color:#DD6B20;">${starStr}</span>
            <button class="btn-fun pink" style="padding:8px 16px; font-size:0.9rem;">▶️ Practice & Quiz</button>
          </div>
        </div>
      `;
    }
    html += `</div>`;
    container.innerHTML = html;

    container.querySelectorAll('.ep-card').forEach((card) => {
      card.addEventListener('click', () => {
        Sounds.tap();
        const idx = parseInt(card.dataset.setIdx, 10);
        this.startSightSet(idx);
      });
    });
  },

  renderFamilySets(container) {
    const families = this.data?.wordFamilies || [];
    let html = `<div class="ep-grid">`;
    families.forEach((f, i) => {
      const levelId = `family-${i + 1}`;
      const stars = Store.getLevelStars(App.playerId || 'advaita', 'english', levelId);
      const starStr = stars === 3 ? '⭐⭐⭐' : stars === 2 ? '⭐⭐' : stars === 1 ? '⭐' : '☆';

      html += `
        <div class="ep-card" data-fam-idx="${i}">
          <div>
            <div class="ep-card-title">Phonics Family ${f.family}</div>
            <div class="ep-card-sub">${f.words.length} words • Level 2</div>
            <div class="ep-words-box">
              ${f.words.map(w => `<span class="ep-word-chip">${w}</span>`).join('')}
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
            <span style="font-weight:800; color:#DD6B20;">${starStr}</span>
            <button class="btn-fun pink" style="padding:8px 16px; font-size:0.9rem;">▶️ Blend Quiz</button>
          </div>
        </div>
      `;
    });
    html += `</div>`;
    container.innerHTML = html;

    container.querySelectorAll('.ep-card').forEach((card) => {
      card.addEventListener('click', () => {
        Sounds.tap();
        const idx = parseInt(card.dataset.famIdx, 10);
        this.startFamilySet(idx);
      });
    });
  },

  startSightSet(idx) {
    const words = this.data?.sightWords || [];
    const slice = words.slice(idx * 23, (idx + 1) * 23);
    const view = document.getElementById('boosters-view');
    if (!view || !slice.length) return;

    let qIdx = 0;
    let wrong = 0;
    const quizWords = slice.slice(0, Math.min(5, slice.length));

    const renderStep = () => {
      if (qIdx >= quizWords.length) {
        const stars = wrong === 0 ? 3 : wrong === 1 ? 2 : 1;
        const reward = Store.awardLevel(App.playerId || 'advaita', 'english', `sight-${idx + 1}`, stars, 15, {
          total: quizWords.length,
          title: `Sight Words Set ${idx + 1}`,
          level: idx < 4 ? 1 : 2
        });
        Sounds.win();
        view.innerHTML = `
          <div class="ep-quiz-box" style="margin-top: 30px;">
            <div style="font-size:3rem; margin-bottom:12px;">🎉 ⭐</div>
            <h2>Sight Words Set Completed!</h2>
            <div style="font-size:1.8rem; margin:16px 0;">${'⭐'.repeat(stars)}</div>
            ${reward.coins > 0 ? `<div style="font-size:1.2rem; font-weight:800; color:#DD6B20;">+${reward.coins} Coins! 🪙</div>` : ''}
            <button class="btn-fun pink btn-big" id="ep-back-hub" style="margin-top:20px;">Back to Boosters</button>
          </div>
        `;
        document.getElementById('ep-back-hub')?.addEventListener('click', () => this.open('sight'));
        return;
      }

      const target = quizWords[qIdx];
      // Build 3 options
      let opts = [target];
      while (opts.length < 3) {
        const rnd = words[Math.floor(Math.random() * words.length)];
        if (!opts.includes(rnd)) opts.push(rnd);
      }
      opts.sort(() => Math.random() - 0.5);

      view.innerHTML = `
        <div class="ep-container">
          <div class="ep-quiz-box">
            <div style="font-weight:800; color:#A0AEC0; margin-bottom:8px;">SIGHT WORDS SET ${idx + 1} • WORD ${qIdx + 1} OF ${quizWords.length}</div>
            <div class="ep-q-title">Listen and pick the word you hear! <button id="ep-hear-btn" style="border:none; background:none; font-size:1.5rem; cursor:pointer;">🎧</button></div>
            ${opts.map(o => `<button class="ep-opt-btn" data-opt="${o}">${o}</button>`).join('')}
          </div>
        </div>
      `;

      document.getElementById('ep-hear-btn')?.addEventListener('click', () => {
        Sounds.tap();
        Speech.speak(target);
      });
      setTimeout(() => Speech.speak(target), 400);

      view.querySelectorAll('.ep-opt-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btn.dataset.opt === target) {
            Sounds.correct();
            btn.classList.add('correct');
            setTimeout(() => { qIdx++; renderStep(); }, 900);
          } else {
            Sounds.wrong();
            btn.classList.add('wrong');
            wrong++;
          }
        });
      });
    };

    renderStep();
  },

  startFamilySet(idx) {
    const fam = (this.data?.wordFamilies || [])[idx];
    const view = document.getElementById('boosters-view');
    if (!view || !fam) return;

    let qIdx = 0;
    let wrong = 0;
    const words = fam.words;

    const renderStep = () => {
      if (qIdx >= words.length) {
        const stars = wrong === 0 ? 3 : wrong === 1 ? 2 : 1;
        const reward = Store.awardLevel(App.playerId || 'advaita', 'english', `family-${idx + 1}`, stars, 15, {
          total: words.length,
          title: `Phonics Family ${fam.family}`,
          level: 2
        });
        Sounds.win();
        view.innerHTML = `
          <div class="ep-quiz-box" style="margin-top: 30px;">
            <div style="font-size:3rem; margin-bottom:12px;">🎉 ⭐</div>
            <h2>Phonics Family ${fam.family} Mastered!</h2>
            <div style="font-size:1.8rem; margin:16px 0;">${'⭐'.repeat(stars)}</div>
            ${reward.coins > 0 ? `<div style="font-size:1.2rem; font-weight:800; color:#DD6B20;">+${reward.coins} Coins! 🪙</div>` : ''}
            <button class="btn-fun pink btn-big" id="ep-back-hub" style="margin-top:20px;">Back to Boosters</button>
          </div>
        `;
        document.getElementById('ep-back-hub')?.addEventListener('click', () => this.open('family'));
        return;
      }

      const target = words[qIdx];
      let opts = [target];
      const allWords = (this.data?.wordFamilies || []).flatMap(f => f.words);
      while (opts.length < 3 && allWords.length >= 3) {
        const rnd = allWords[Math.floor(Math.random() * allWords.length)];
        if (!opts.includes(rnd)) opts.push(rnd);
      }
      opts.sort(() => Math.random() - 0.5);

      view.innerHTML = `
        <div class="ep-container">
          <div class="ep-quiz-box">
            <div style="font-weight:800; color:#A0AEC0; margin-bottom:8px;">PHONICS FAMILY ${fam.family} • WORD ${qIdx + 1} OF ${words.length}</div>
            <div class="ep-q-title">Which word belongs to the ${fam.family} family and says "${target}"? <button id="ep-hear-fam" style="border:none; background:none; font-size:1.5rem; cursor:pointer;">🎧</button></div>
            ${opts.map(o => `<button class="ep-opt-btn" data-opt="${o}">${o}</button>`).join('')}
          </div>
        </div>
      `;

      document.getElementById('ep-hear-fam')?.addEventListener('click', () => {
        Sounds.tap();
        Speech.speak(target);
      });
      setTimeout(() => Speech.speak(target), 400);

      view.querySelectorAll('.ep-opt-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (btn.dataset.opt === target) {
            Sounds.correct();
            btn.classList.add('correct');
            setTimeout(() => { qIdx++; renderStep(); }, 900);
          } else {
            Sounds.wrong();
            btn.classList.add('wrong');
            wrong++;
          }
        });
      });
    };

    renderStep();
  }
};
