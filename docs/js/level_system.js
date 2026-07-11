// ============================================================
// LEVEL SYSTEM — App-wide Level 1–10 Badge, Princess Unfrozen % Badge,
//               Smart Scoring, Hint Tracking, Randomised Princess & Gifts
// ============================================================

const LevelSystem = {
  // ---- LEVEL COMPUTATION ----
  computeLevel(xp) {
    const lvl = Math.min(10, Math.floor((xp || 0) / 100) + 1);
    const base = (lvl - 1) * 100;
    const pct  = Math.min(100, ((xp || 0) - base));
    const next = lvl < 10 ? lvl * 100 : 1000;
    return { level: lvl, pct, next, xp: xp || 0 };
  },

  _levelGradients: [
    '#f39c12, #e74c3c',
    '#e74c3c, #c0392b',
    '#9b59b6, #8e44ad',
    '#2980b9, #1f618d',
    '#27ae60, #1a7a45',
    '#16a085, #0e6655',
    '#d35400, #a04000',
    '#7f8c8d, #566573',
    '#f39c12, #d68910',
    '#2ecc71, #f1c40f',
  ],

  // ---- PRINCESS UNFROZEN COMPUTATION ----
  computeCurseStatus(playerId) {
    let freezePct = 100;
    try {
      if (typeof Curse !== 'undefined' && Curse.getState) {
        freezePct = Curse.getState(playerId || 'advaita').freezePct;
      } else if (window.parent && window.parent.Curse && window.parent.Curse.getState) {
        freezePct = window.parent.Curse.getState(playerId || 'advaita').freezePct;
      }
    } catch (e) {}
    freezePct = Math.max(0, Math.min(100, Number(freezePct || 0)));
    const unfrozenPct = Math.round(100 - freezePct);
    return { freezePct: Math.round(freezePct), unfrozenPct };
  },

  // ---- BADGE RENDERING ----
  updateAllBadges() {
    const playerId = (window.App && App.playerId) ? App.playerId : 'advaita';
    const p = window.Store ? Store.getPlayer(playerId) : null;
    if (!p) return;

    // 1. Update Level Badges
    const info = this.computeLevel(p.xp || 0);
    document.querySelectorAll('.pp-level-badge').forEach(el => {
      const numEl = el.querySelector('.pp-lvl-num');
      if (numEl) numEl.textContent = info.level;
      const grad = this._levelGradients[info.level - 1];
      el.style.background = `linear-gradient(135deg, ${grad})`;
      el.title = `Level ${info.level}/10 — ${p.xp || 0} XP (${info.pct}/100 to next)`;
      const bar = el.querySelector('.pp-lvl-bar');
      if (bar) bar.style.width = `${info.pct}%`;
    });

    // 2. Update Princess Unfrozen % Badges in all panels
    const curseInfo = this.computeCurseStatus(playerId);
    document.querySelectorAll('.pp-unfrozen-badge').forEach(el => {
      const unfrozenEl = el.querySelector('.pp-unfrozen-num');
      const frozenEl   = el.querySelector('.pp-frozen-num');
      if (unfrozenEl) unfrozenEl.textContent = `${curseInfo.unfrozenPct}%`;
      if (frozenEl)   frozenEl.textContent   = `${curseInfo.freezePct}%`;
      el.title = `Princess Unfrozen: ${curseInfo.unfrozenPct}% (Frozen Ice: ${curseInfo.freezePct}%) — Click to open Rescue Screen`;
    });
  },

  badgeHTML() {
    return `<div class="pp-corner-badges" style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;">
      <div class="pp-level-badge" title="Your Level">
        ⭐ <span class="pp-lvl-num">1</span>/10
        <div class="pp-lvl-bar-track"><div class="pp-lvl-bar" style="width:0%"></div></div>
      </div>
      <div class="pp-unfrozen-badge" title="Princess Rescue Status" onclick="if(window.App) App.go('curse')">
        👸 Unfrozen: <span class="pp-unfrozen-num">0%</span>
        <span class="pp-frozen-sub" style="opacity:0.88;font-size:0.75rem;">(❄️ <span class="pp-frozen-num">100%</span>)</span>
      </div>
    </div>`;
  },

  injectStyles() {
    if (document.getElementById('pp-level-styles')) return;
    const s = document.createElement('style');
    s.id = 'pp-level-styles';
    s.textContent = `
      .pp-level-badge {
        display: inline-flex; align-items: center; gap: 5px;
        background: linear-gradient(135deg, #f39c12, #e74c3c);
        color: #fff; font-weight: 800; font-size: 0.85rem;
        padding: 5px 13px; border-radius: 50px;
        border: 2px solid rgba(255,255,255,0.4);
        box-shadow: 0 2px 8px rgba(0,0,0,0.18);
        animation: ppLvlPulse 2.5s ease-in-out infinite;
        position: relative; cursor: default;
        white-space: nowrap; flex-shrink: 0;
      }
      @keyframes ppLvlPulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.05)} }
      .pp-lvl-bar-track {
        position: absolute; bottom:0; left:0; right:0;
        height:3px; background:rgba(255,255,255,0.25);
        border-radius:0 0 50px 50px; overflow:hidden;
      }
      .pp-lvl-bar { height:100%; background:#fff; transition:width 0.7s ease; }

      .pp-unfrozen-badge {
        display: inline-flex; align-items: center; gap: 5px;
        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
        color: #fff; font-weight: 800; font-size: 0.85rem;
        padding: 5px 13px; border-radius: 50px;
        border: 2px solid rgba(255,255,255,0.4);
        box-shadow: 0 2px 8px rgba(59,130,246,0.3);
        cursor: pointer; transition: transform 0.2s, box-shadow 0.2s;
        white-space: nowrap; flex-shrink: 0;
      }
      .pp-unfrozen-badge:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 14px rgba(139,92,246,0.45);
      }

      #pp-hint-toast {
        display:none; position:fixed; top:70px; left:50%;
        transform:translateX(-50%);
        background:linear-gradient(135deg,#e67e22,#c0392b);
        color:#fff; padding:12px 22px; border-radius:50px;
        font-size:0.95rem; font-weight:700; z-index:99999;
        box-shadow:0 6px 20px rgba(0,0,0,0.25);
        text-align:center; max-width:90vw;
        animation:ppShake 0.5s ease;
      }
      @keyframes ppShake {
        0%,100%{transform:translateX(-50%) rotate(0deg)}
        20%{transform:translateX(-50%) rotate(-2deg)}
        40%{transform:translateX(-50%) rotate(2deg)}
        60%{transform:translateX(-50%) rotate(-1.5deg)}
        80%{transform:translateX(-50%) rotate(1.5deg)}
      }
      .pp-score-chip { display:inline-block; padding:3px 10px; border-radius:8px; font-size:0.76rem; font-weight:700; margin-top:4px; margin-right:4px; }
      .pp-score-chip.penalty { background:#fef3c7; color:#92400e; border:1.5px solid #f59e0b; }
      .pp-score-chip.bonus   { background:#d1fae5; color:#065f46; border:1.5px solid #10b981; }
      .pp-score-chip.repeat  { background:#fce7f3; color:#9d174d; border:1.5px solid #ec4899; }
    `;
    document.head.appendChild(s);
  },

  // ---- HINT TRACKING ----
  _hints: {},
  hintKey(subject, levelId, problemIdx) { return `${subject}__${levelId}__${problemIdx}`; },

  recordHint(subject, levelId, problemIdx) {
    const k = this.hintKey(subject, levelId, problemIdx);
    this._hints[k] = (this._hints[k] || 0) + 1;
    const count = this._hints[k];
    if (count > 2) this.showHintWarning(count);
    return count;
  },

  getHintCount(subject, levelId, problemIdx) {
    return this._hints[this.hintKey(subject, levelId, problemIdx)] || 0;
  },

  resetHints(subject, levelId) {
    Object.keys(this._hints).forEach(k => {
      if (k.startsWith(`${subject}__${levelId}__`)) delete this._hints[k];
    });
  },

  showHintWarning(count) {
    let toast = document.getElementById('pp-hint-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'pp-hint-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = `⚠️ Hint #${count} used! Correct answer now earns only 1/10 point!`;
    toast.style.display = 'block';
    toast.style.animation = 'none';
    void toast.offsetWidth;
    toast.style.animation = 'ppShake 0.5s ease';
    clearTimeout(this._hintTimer);
    this._hintTimer = setTimeout(() => { toast.style.display = 'none'; }, 3500);
  },

  // ---- SMART SCORING ----
  smartScore(playerId, subject, levelId, { baseCoins = 10, baseXp = 10, isFirstTry = true, problemIdx = 0 } = {}) {
    const p = Store.getPlayer(playerId);
    if (!p) return { coinsAwarded: baseCoins, xpAwarded: baseXp, notes: [], multiplier: 1.0, bonusCoins: 0 };
    const hintsUsed = this.getHintCount(subject, levelId, problemIdx);
    const existingStars = Store.getLevelStars(playerId, subject, levelId);
    let multiplier = 1.0;
    let bonusCoins = 0;
    const notes = [];

    if (hintsUsed > 2) {
      multiplier = 0.1;
      notes.push({ type: 'penalty', msg: `⚠️ Hint penalty: 1/10 point (${hintsUsed} hints used)` });
    }

    if (isFirstTry && hintsUsed === 0) {
      bonusCoins += 3;
      notes.push({ type: 'bonus', msg: '🚀 First-try bonus! +3 🪙' });
    }

    if (Object.keys(p[subject] || {}).length === 0) {
      bonusCoins += 5;
      notes.push({ type: 'bonus', msg: '🌟 New subject! +5 🪙 bonus!' });
    }

    if (existingStars === 0 && multiplier === 1.0) {
      bonusCoins += 2;
      notes.push({ type: 'bonus', msg: '✨ New chapter! +2 🪙 bonus!' });
    }

    if (existingStars === 3 && multiplier === 1.0) {
      multiplier = 0.9;
      notes.push({ type: 'repeat', msg: '🔄 Already mastered: 9/10 points' });
    }

    const finalCoins = Math.max(1, Math.round(baseCoins * multiplier) + bonusCoins);
    const finalXp    = Math.max(1, Math.round(baseXp   * multiplier));
    return { coinsAwarded: finalCoins, xpAwarded: finalXp, notes, multiplier, bonusCoins };
  },

  renderScoreNotes(notes) {
    return (notes || []).map(n => `<span class="pp-score-chip ${n.type}">${n.msg}</span>`).join(' ');
  },

  // ---- RANDOMISED FROZEN PRINCESS TARGETS ----
  shuffleTargets(list) {
    if (!Array.isArray(list)) return [];
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // ---- RANDOMISED PUPPY GIFTS ----
  grantRandomPuppyGift(playerId) {
    const p = Store.getPlayer(playerId);
    if (!p || typeof Mall === 'undefined') return null;
    const pupIds = ['simba', 'mufasa', 'golu', 'whity'].sort(() => Math.random() - 0.5);
    for (const pid of pupIds) {
      const pup = p.puppies?.[pid];
      if (!pup) continue;
      if (pup.wish) {
        const item = pup.wish;
        if (!pup.owned.includes(item.id)) {
          pup.owned.push(item.id);
          pup.happy = Math.min(100, (pup.happy || 70) + 20);
          pup.wish = null; pup.wishAt = Date.now();
          Store.updatePlayer(playerId, p);
          return { pupId: pid, item, fromWish: true };
        }
      }
      const unowned = Mall.items.filter(it => !(pup.owned || []).includes(it.id));
      if (unowned.length) {
        const item = unowned[Math.floor(Math.random() * Math.min(15, unowned.length))];
        pup.owned.push(item.id);
        pup.happy = Math.min(100, (pup.happy || 70) + 15);
        Store.updatePlayer(playerId, p);
        return { pupId: pid, item, fromWish: false };
      }
    }
    return null;
  },

  // ---- INIT ----
  init() {
    this.injectStyles();
    this._injectBadgesIntoHeaders();
    this.updateAllBadges();
  },

  _injectBadgesIntoHeaders() {
    // Home screen top-bar
    const topActions = document.querySelector('#screen-home .top-actions');
    if (topActions && !topActions.querySelector('.pp-corner-badges')) {
      const badgeContainer = document.createElement('div');
      badgeContainer.innerHTML = this.badgeHTML();
      topActions.insertAdjacentElement('afterbegin', badgeContainer.firstElementChild);
    }
    // All game-headers across every screen/panel
    document.querySelectorAll('.game-header').forEach(header => {
      if (header.querySelector('.pp-corner-badges')) return;
      const badgeContainer = document.createElement('div');
      badgeContainer.innerHTML = this.badgeHTML();
      header.appendChild(badgeContainer.firstElementChild);
    });
  },
};

document.addEventListener('DOMContentLoaded', () => { LevelSystem.init(); });
