// ==========================================
// THE CRYSTAL CURSE 👸🧊 — Phase 11 Meta-Game
// Steering Advaita toward new, weak, and neglected topics
// ==========================================

const PRINCESS_NAMES = [
  'Rajkumari Chandni',
  'Rajkumari Pari',
  'Rajkumari Divya',
  'Rajkumari Ananya',
  'Rajkumari Meera'
];

const Curse = {
  injectStyles() {
    if (document.getElementById('cc-injected-styles')) return;
    const s = document.createElement('style');
    s.id = 'cc-injected-styles';
    s.textContent = `
      .cc-header { text-align: center; margin-bottom: 1rem; }
      .cc-story { font-size: 0.95rem; color: #4b5563; max-width: 500px; margin: 0.5rem auto; line-height: 1.4; }
      .cc-stage-card { display: flex; align-items: center; justify-content: center; gap: 1.5rem; background: #eff6ff; border: 3px solid #bfdbfe; border-radius: 18px; padding: 1.25rem; margin: 1rem 0; flex-wrap: wrap; }
      .cc-princess-container { position: relative; display: flex; align-items: flex-end; justify-content: center; background: linear-gradient(180deg,#fdf2f8,#eff6ff); border-radius: 16px; overflow: hidden; border: 2px solid #fbcfe8; padding: 8px 10px 0; }
      .cc-card-mini { flex: 0 0 auto; background: #fdf2f8; border-radius: 10px; border: 1px solid #fbcfe8; padding: 2px 4px 0; margin-right: 8px; }
      .cc-princess-emoji { font-size: 4.5rem; line-height: 1; z-index: 1; margin-bottom: 0.25rem; }
      .cc-ice-overlay { position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(to top, rgba(147, 197, 253, 0.85), rgba(219, 234, 254, 0.5)); border-top: 2px solid #60a5fa; transition: height 0.5s ease; z-index: 2; }
      .cc-stage-text { flex: 1; min-width: 200px; }
      .cc-stage-text h3 { margin: 0 0 0.4rem 0; color: #1e3a8a; font-size: 1.2rem; }
      .cc-stage-text p { margin: 0 0 0.8rem 0; color: #3b82f6; font-size: 0.9rem; }
      .cc-meter-bar { width: 100%; height: 12px; background: #dbeafe; border-radius: 8px; overflow: hidden; }
      .cc-meter-fill { height: 100%; background: linear-gradient(90deg, #3b82f6, #60a5fa); transition: width 0.5s ease; }
      .cc-section-title { margin: 1.5rem 0 0.75rem 0; font-size: 1.1rem; color: #1f2937; }
      .cc-targets-list { display: flex; flex-direction: column; gap: 0.75rem; }
      .cc-target-card { display: flex; align-items: center; justify-content: space-between; background: #fff; border: 2px solid #e5e7eb; border-radius: 12px; padding: 0.75rem 1rem; gap: 1rem; }
      .cc-target-icon { font-size: 2rem; }
      .cc-target-info { flex: 1; text-align: left; }
      .cc-target-info b { font-size: 1rem; color: #111827; }
      .cc-target-info p { margin: 0.2rem 0 0 0; font-size: 0.8rem; color: #6b7280; }
      .cc-rescue-box { text-align: center; padding: 1.5rem; max-width: 420px; }
      .cc-rescue-hero { font-size: 5rem; margin: 0.5rem 0; }
      .cc-blessing-card { background: #fef3c7; border: 2px dashed #f59e0b; border-radius: 12px; padding: 1rem; margin: 1rem 0; }
      .cc-blessing-title { font-size: 1.3rem; font-weight: bold; color: #92400e; margin: 0.5rem 0; }
      .cc-blessing-sub { font-size: 0.8rem; color: #b45309; }
      .cc-next-cycle { font-size: 0.85rem; color: #4b5563; margin-bottom: 1rem; }
    `;
    document.head.appendChild(s);
  },

  // Get canonical curse state from player storage
  getState(playerId) {
    const p = Store.getPlayer(playerId);
    if (!p.curse) {
      p.curse = {
        v: 2,
        freezePct: 100,
        lastMeltTs: Date.now(),
        cycleStartTs: Date.now(),
        princessName: PRINCESS_NAMES[0],
        cycleIndex: 0,
        blessingsGranted: []
      };
      Store.updatePlayer(playerId, p);
    }
    if (!p.curse.v) {
      // v2 migration: the story now begins with a fully frozen princess.
      if ((p.curse.blessingsGranted || []).length === 0 && p.curse.freezePct < 100) {
        p.curse.freezePct = 100;
      }
      p.curse.v = 2;
      Store.updatePlayer(playerId, p);
    }
    return p.curse;
  },

  // Save state helper
  saveState(playerId, state) {
    const p = Store.getPlayer(playerId);
    p.curse = state;
    Store.updatePlayer(playerId, p);
  },

  // Lazy day-tick: compute freeze increase since lastMeltTs
  tick(playerId) {
    const st = this.getState(playerId);
    const now = Date.now();
    const elapsedDays = Math.floor((now - st.lastMeltTs) / (24 * 3600 * 1000));
    if (elapsedDays > 0) {
      // Each idle day adds ~15% (7 days ≈ 100% frozen)
      st.freezePct = Math.min(100, st.freezePct + (elapsedDays * 15));
      st.lastMeltTs = now;
      this.saveState(playerId, st);
    }
    return st;
  },

  // Determine if a chapter qualifies as melt fuel: new (0⭐), weak (<=1⭐ or high errors), or neglected (>= 7 days unattempted)
  isQualifyingChapter(playerId, subject, levelId, explicitOldStars) {
    const stars = explicitOldStars !== undefined ? explicitOldStars : Store.getLevelStars(playerId, subject, levelId);
    if (stars === 0) return true; // NEW
    if (stars === 1) return true; // WEAK
    const p = Store.getPlayer(playerId);
    const key = `${subject}_${levelId}`;
    const stat = (p.attemptStats || {})[key];
    if (stat && stat.wrong >= 3) return true; // WEAK (high errors)
    const now = Date.now();
    if (stat && (now - (stat.lastTs || 0) >= 7 * 24 * 3600 * 1000)) return true; // NEGLECTED
    return false; // Mastered/recent chapter -> 0 melt
  },

  // Called when a chapter is completed to melt ice based on qualifying problem count (~12 problems = ~15% melt)
  onChapterCompleted(playerId, subject, levelId, oldStars, problemCount = 12, wasQualifying) {
    const qualify = wasQualifying !== undefined ? wasQualifying : this.isQualifyingChapter(playerId, subject, levelId, oldStars);
    if (!qualify) return { melted: 0, freezePct: this.getState(playerId).freezePct };

    const st = this.getState(playerId);
    if (st.freezePct <= 0) return { melted: 0, freezePct: 0 };

    const baseRate = st.freezePct === 100 ? 2.5 : 1.25;
    const oldPct = st.freezePct;
    const meltedRaw = problemCount * baseRate;
    st.freezePct = Math.max(0, st.freezePct - meltedRaw);
    st.lastMeltTs = Date.now();
    const melted = Number((oldPct - st.freezePct).toFixed(2));
    this.saveState(playerId, st);

    if (st.freezePct === 0 && oldPct > 0) {
      this.celebrateRescue(playerId);
    }

    return { melted, freezePct: st.freezePct };
  },

  // Called when a single problem is solved first try
  onProblemSolved(playerId, subject, levelId, firstTry = true, explicitOldStars) {
    if (!firstTry) return { melted: 0, freezePct: this.getState(playerId).freezePct };
    if (!this.isQualifyingChapter(playerId, subject, levelId, explicitOldStars)) {
      return { melted: 0, freezePct: this.getState(playerId).freezePct };
    }

    const st = this.getState(playerId);
    if (st.freezePct <= 0) return { melted: 0, freezePct: 0 };

    // 1.25% per problem; at 100% frozen double fuel applies (2.5%)
    const rate = st.freezePct === 100 ? 2.5 : 1.25;
    const oldPct = st.freezePct;
    st.freezePct = Math.max(0, st.freezePct - rate);
    st.lastMeltTs = Date.now();
    const melted = Number((oldPct - st.freezePct).toFixed(2));
    this.saveState(playerId, st);

    if (st.freezePct === 0 && oldPct > 0) {
      this.celebrateRescue(playerId);
    }

    return { melted, freezePct: st.freezePct };
  },

  // Check and trigger Royal Mentors prompt when Advaita struggles (>=3 wrongs)
  checkMentorPrompt(playerId, wrongCount, subject, levelId) {
    if (wrongCount < 3) return false;
    const msg = "Even the greatest champions don't fight alone… call upon the Royal Mentors (Mom and Dad) — asking for help when you are stuck is the secret spell for the hardest levels!";
    Speech.navSay(msg);
    Rewards.showToast('👑 ' + msg);

    // Log to journey journal
    Store.logJourneyEvent(playerId, {
      subject: subject || 'curse',
      chapterId: levelId || 'mentor',
      title: 'Called Royal Mentors for help 👑',
      level: 1,
      stars: 1,
      wrong: wrongCount,
      coins: 0
    });
    return true;
  },

  // Get stage info for UI & TTS
  getStageInfo(freezePct) {
    if (freezePct >= 100) {
      return {
        stage: 4,
        title: 'Full Crystal Statue 🧊',
        desc: "She is completely frozen — but safe! Every new lesson you learn melts her crystal ice. Set her free!",
        heightPct: 100
      };
    } else if (freezePct >= 80) {
      return {
        stage: 3,
        title: 'Ice at Shoulders ❄️',
        desc: 'The crystal ice has reached her shoulders! Quickly study new or tricky topics!',
        heightPct: 85
      };
    } else if (freezePct >= 50) {
      return {
        stage: 2,
        title: 'Ice at Waist ❄️',
        desc: 'The ice is creeping up her waist! Challenge learning will melt the ice!',
        heightPct: 55
      };
    } else if (freezePct >= 20) {
      return {
        stage: 1,
        title: 'Ice at Knees ❄️',
        desc: 'Crystal ice is touching her knees. Your knowledge fire can melt it!',
        heightPct: 25
      };
    } else {
      return {
        stage: 0,
        title: 'Safe & Warm ✨',
        desc: 'Her toes are warm and sparkling! Keep learning to keep the curse away!',
        heightPct: Math.max(5, freezePct)
      };
    }
  },

  // Cycle through princess names in a NEW random order each rescue
  celebrateRescue(playerId) {
    const st = this.getState(playerId);
    Sounds.cheer();
    Rewards.confetti(120);
    Speech.navSay(`Hooray! You rescued ${st.princessName}! She grants you a Royal Blessing!`);

    // Get parent-set blessing or default
    const p = Store.getPlayer(playerId);
    const blessings = p.blessings || ['Special Weekend Treat 🍦', 'Choose Tonight’s Bedtime Story 📖', 'Movie Night Pick 🎬'];
    const rewardBlessing = blessings[Math.floor(Math.random() * blessings.length)];

    // 🎲 Pick next princess name RANDOMLY (not sequentially)
    const remaining = PRINCESS_NAMES.filter(n => n !== st.princessName);
    const nextName = remaining[Math.floor(Math.random() * remaining.length)] || PRINCESS_NAMES[0];
    
    // Advance cycle
    st.cycleIndex = (st.cycleIndex + 1) % PRINCESS_NAMES.length;
    st.princessName = nextName;
    st.freezePct = 100; // the next princess arrives fully frozen — a new rescue begins
    st.lastMeltTs = Date.now();
    st.blessingsGranted.push({ blessing: rewardBlessing, ts: Date.now() });
    this.saveState(playerId, st);

    // Show rescue modal / certificate
    this.showRescueModal(rewardBlessing, st.princessName);
  },

  showRescueModal(blessing, nextPrincess) {
    let modal = document.getElementById('rescue-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'rescue-modal';
      modal.className = 'popup-overlay show';
      document.body.appendChild(modal);
    } else {
      modal.classList.add('show');
    }

    modal.innerHTML = `
      <div class="popup-box cc-rescue-box">
        <h2>👑 PRINCESS RESCUED! 👑</h2>
        <div class="cc-rescue-hero">👸✨</div>
        <p>Your learning fire melted all the crystal ice!</p>
        <div class="cc-blessing-card">
          <h3>📜 ROYAL BLESSING GRANTED:</h3>
          <div class="cc-blessing-title">${blessing}</div>
          <p class="cc-blessing-sub">(Show Mom or Dad to claim your Royal Blessing!)</p>
        </div>
        <p class="cc-next-cycle">A princess from a neighboring kingdom (${nextPrincess}) needs your protection next!</p>
        <button class="btn-fun green btn-big" id="btn-close-rescue">Hurray! Continue ➜</button>
      </div>
    `;

    modal.querySelector('#btn-close-rescue')?.addEventListener('click', () => {
      modal.classList.remove('show');
    });
  },

  // Render Princess Screen (#screen-curse)

  princessSVG(freezePct, width = 150) {
    const h = Math.max(0, Math.min(100, freezePct));
    const iceY = 210 * (1 - h / 100); // ice fills from the bottom up
    const frozenFace = h >= 95;
    // unique defs ids per instance — duplicate ids in hidden screens break url() refs
    const uid = 'cc' + Math.random().toString(36).slice(2, 8);
    return `
    <svg viewBox="0 0 130 210" width="${width}" style="display:block" aria-label="Princess ${Math.round(h)}% frozen">
      <defs>
        <linearGradient id="ccGown-${uid}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f9a8d4"/><stop offset="1" stop-color="#ec4899"/>
        </linearGradient>
        <linearGradient id="ccIce-${uid}" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stop-color="rgba(96,165,250,.92)"/>
          <stop offset="1" stop-color="rgba(191,219,254,.55)"/>
        </linearGradient>
        <clipPath id="ccIceClip-${uid}"><rect x="0" y="${iceY}" width="130" height="${210 - iceY}"/></clipPath>
      </defs>
      <!-- hair -->
      <path d="M43 30 Q65 8 87 30 L87 62 Q83 44 65 44 Q47 44 43 62 Z" fill="#7c4a1e"/>
      <!-- arms -->
      <path d="M48 78 Q30 95 34 118" stroke="#ffd9b3" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M82 78 Q100 95 96 118" stroke="#ffd9b3" stroke-width="9" fill="none" stroke-linecap="round"/>
      <!-- gown -->
      <path d="M52 70 L78 70 L104 196 Q65 208 26 196 Z" fill="url(#ccGown-${uid})"/>
      <path d="M52 70 L78 70 L84 100 L46 100 Z" fill="#f472b6"/>
      <!-- feet -->
      <ellipse cx="52" cy="199" rx="9" ry="5" fill="#a855f7"/>
      <ellipse cx="78" cy="199" rx="9" ry="5" fill="#a855f7"/>
      <!-- head -->
      <circle cx="65" cy="42" r="19" fill="#ffd9b3"/>
      <path d="M46 42 Q46 22 65 22 Q84 22 84 42 Q80 30 65 30 Q50 30 46 42 Z" fill="#7c4a1e"/>
      <!-- crown -->
      <path d="M50 20 L55 9 L60 17 L65 6 L70 17 L75 9 L80 20 Z" fill="#fbbf24" stroke="#d97706" stroke-width="1.5"/>
      <!-- face -->
      ${frozenFace
        ? '<path d="M57 42 q3 2 6 0" stroke="#7c4a1e" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M69 42 q3 2 6 0" stroke="#7c4a1e" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M59 52 h12" stroke="#c2410c" stroke-width="2.5" stroke-linecap="round"/>'
        : '<circle cx="59" cy="41" r="2.4" fill="#3b2313"/><circle cx="71" cy="41" r="2.4" fill="#3b2313"/><path d="M58 50 q7 6 14 0" stroke="#c2410c" stroke-width="2.5" fill="none" stroke-linecap="round"/>'}
      <circle cx="53" cy="47" r="3" fill="#fda4af" opacity=".7"/>
      <circle cx="77" cy="47" r="3" fill="#fda4af" opacity=".7"/>
      <!-- rising crystal ice -->
      <g clip-path="url(#ccIceClip-${uid})">
        <rect x="0" y="0" width="130" height="210" fill="url(#ccIce-${uid})"/>
        <path d="M0 ${iceY} L14 ${iceY - 10} L26 ${iceY} L40 ${iceY - 14} L54 ${iceY} L68 ${iceY - 9} L82 ${iceY} L96 ${iceY - 13} L112 ${iceY} L124 ${iceY - 8} L130 ${iceY}" fill="rgba(219,234,254,.9)" stroke="#93c5fd" stroke-width="1.5" transform="translate(0,2)"/>
        <text x="18" y="${Math.min(196, iceY + 26)}" font-size="12">❄️</text>
        <text x="92" y="${Math.min(200, iceY + 44)}" font-size="10">❄️</text>
        <text x="55" y="${Math.min(204, iceY + 66)}" font-size="11">✨</text>
      </g>
      ${h > 0 ? `<path d="M0 ${iceY + 1} H130" stroke="#60a5fa" stroke-width="2" opacity=".8"/>` : ''}
    </svg>`;
  },

  async renderScreen() {
    const st = this.tick(App.playerId);
    const info = this.getStageInfo(st.freezePct);
    const el = document.getElementById('curse-content');
    if (!el) return;

    // Pull 3 recommended melt targets across all subjects
    let allChapters = [];
    try {
      allChapters = await Coach.getAllChapters();
    } catch (e) {
      allChapters = [];
    }

    // Only UNLOCKED chapters (first of subject, or previous has >=1 star), max 1 per subject
    const bySub = {};
    allChapters.forEach((ch) => { (bySub[ch.subject] = bySub[ch.subject] || []).push(ch); });
    const qualifying = [];
    Object.values(bySub).forEach((list) => {
      for (let i = 0; i < list.length; i++) {
        const unlocked = i === 0 || Store.getLevelStars(App.playerId, list[i].subject, list[i - 1].id) > 0;
        if (!unlocked) continue;
        if (this.isQualifyingChapter(App.playerId, list[i].subject, list[i].id)) { qualifying.push(list[i]); break; }
      }
    });
    // 🎲 RANDOMISE frozen princess targets each visit
    const shuffled = typeof LevelSystem !== 'undefined'
      ? LevelSystem.shuffleTargets(qualifying)
      : qualifying.slice().sort(() => Math.random() - 0.5);
    const targets = shuffled.slice(0, 3);

    const subNames = { math: 'Math', english: 'English', evs: 'EVS', hindi: 'Hindi', sanskrit: 'Sanskrit', computer: 'Computer' };

    let targetsHtml = targets.map((c) => `
      <div class="cc-target-card" data-sub="${c.subject}" data-id="${c.id}">
        <span class="cc-target-icon">${c.icon || '📘'}</span>
        <div class="cc-target-info">
          <b>[${subNames[c.subject] || c.subject}] ${c.title}</b>
          <p>Melts crystal ice quickly!</p>
        </div>
        <button class="btn-fun pink btn-sm cc-btn-melt">Melt Ice 🔥</button>
      </div>
    `).join('');

    if (!targetsHtml) {
      targetsHtml = '<p class="cc-empty">Amazing! No weak or neglected topics right now!</p>';
    }

    el.innerHTML = `
      <div class="cc-header">
        <h2>👸 The Crystal Curse 🧊</h2>
        <p class="cc-story">
          A powerful Saint struck ${st.princessName} with the Crystal Curse — she stands fully frozen in sparkling crystal! Only the fire of Advaita's learning can melt the ice. New, tricky, or forgotten lessons melt the most — but if you stay away, the ice grows back!
        </p>
      </div>

      <div class="cc-stage-card">
        <div class="cc-princess-container cc-princess-full">
          ${this.princessSVG(st.freezePct, 150)}
        </div>
        <div class="cc-stage-text">
          <h3>${info.title} (${Math.round(st.freezePct)}% Frozen)</h3>
          <p>${info.desc}</p>
          <div class="cc-meter-bar">
            <div class="cc-meter-fill" style="width: ${st.freezePct}%;"></div>
          </div>
        </div>
      </div>

      <h3 class="cc-section-title">🔥 Today's Recommended Melt Targets</h3>
      <div class="cc-targets-list">
        ${targetsHtml}
      </div>
    `;

    el.querySelectorAll('.cc-target-card').forEach((card) => {
      card.querySelector('.cc-btn-melt')?.addEventListener('click', () => {
        const sub = card.dataset.sub;
        App.go(sub);
      });
    });
  },

  renderCard(containerId = 'curse-card-home') {
    const el = document.getElementById(containerId);
    if (!el) return;
    const st = this.tick(App.playerId);
    const info = this.getStageInfo(st.freezePct);

    el.innerHTML = `
      <div class="mission-card cc-home-card" style="border-color: #93c5fd; background: #eff6ff;">
        <div class="cc-card-mini">${this.princessSVG(st.freezePct, 56)}</div>
        <div class="mission-left">
          <span class="mission-badge" style="background: #dbeafe; color: #1e3a8a;">👸 CRYSTAL CURSE (${Math.round(st.freezePct)}% FROZEN)</span>
          <div class="mission-title">${st.princessName} — ${info.title}</div>
          <div class="mission-why">${info.desc}</div>
        </div>
        <button class="mission-btn" style="background: #3b82f6; color: #fff;" id="btn-open-curse">Rescue ➜</button>
      </div>
    `;

    el.querySelector('#btn-open-curse')?.addEventListener('click', () => {
      App.go('curse');
    });
  }
};
