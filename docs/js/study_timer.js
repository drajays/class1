/**
 * StudyTimer - 25m Active Study -> 10m Play Gap Reward System
 * Tracks active learning across Advaita's Puppy Park & Brainobrain app.
 * When Advaita studies actively for 25 minutes (1500s), she earns:
 *   1. A 10-minute Play Gap Reward break (600s)
 *   2. +50 Bonus Coins & +20 Puppy Happiness
 */
const StudyTimer = {
  STUDY_GOAL_SEC: 25 * 60, // 1500 seconds = 25 minutes
  PLAY_GAP_SEC: 10 * 60,   // 600 seconds = 10 minutes
  STORAGE_KEY: 'advaita_study_reward_state',

  state: {
    mode: 'STUDY', // 'STUDY' or 'PLAY_GAP'
    studySeconds: 0,
    playGapSeconds: 600,
    rewardsEarnedToday: 0,
    lastUpdate: Date.now()
  },

  timerId: null,
  lastActiveTimestamp: Date.now(),
  isPaused: false,

  init() {
    this.loadState();
    this.injectStyles?.();
    this.injectUI?.();
    this.bindActivityListeners();
    this.startLoop();
  },

  bindActivityListeners() {
    const markActive = () => {
      this.lastActiveTimestamp = Date.now();
      if (window.parent && window.parent.StudyTimer && window.parent !== window) {
        window.parent.StudyTimer.lastActiveTimestamp = Date.now();
      }
    };
    ['pointerdown', 'touchstart', 'click', 'keydown', 'input', 'scroll'].forEach((evt) => {
      window.addEventListener(evt, markActive, { passive: true });
      document.addEventListener(evt, markActive, { passive: true });
    });
  },

  isStudyScreenActive() {
    // If inside standalone or iframe brainobrain.html, child is in learning challenge
    if (window.location.pathname.includes('brainobrain.html')) return true;

    // Check index.html study screens
    const studyIds = [
      'screen-math',
      'screen-english',
      'screen-hindi',
      'screen-subjectbook',
      'screen-storytime',
      'screen-englishboosters',
      'screen-brainobrain'
    ];
    return studyIds.some((id) => {
      const el = document.getElementById(id);
      return el && el.classList.contains('active');
    });
  },

  loadState() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.state = Object.assign(this.state, parsed);
      }
    } catch (e) {
      console.warn('StudyTimer load error:', e);
    }
  },

  saveState() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {}
  },

  injectStyles() {
    if (document.getElementById('study-timer-styles')) return;
    const style = document.createElement('style');
    style.id = 'study-timer-styles';
    style.textContent = `
      #stat-study-reward {
        cursor: pointer;
        transition: all 0.25s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        user-select: none;
      }
      #stat-study-reward:hover {
        transform: translateY(-2px) scale(1.04);
        box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
      }
      #stat-study-reward.mode-study {
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        color: #ffffff;
        border: 2px solid rgba(255,255,255,0.85);
      }
      #stat-study-reward.mode-play {
        background: linear-gradient(135deg, #059669, #10b981);
        color: #ffffff;
        border: 2px solid #ffffff;
        animation: playRewardPulse 2s infinite;
      }
      @keyframes playRewardPulse {
        0%, 100% { box-shadow: 0 0 10px rgba(16, 185, 129, 0.5); }
        50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.9); }
      }

      /* Modal styling */
      #study-reward-modal-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(15, 23, 42, 0.75);
        backdrop-filter: blur(6px);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 16px;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.25s ease;
      }
      #study-reward-modal-overlay.open {
        opacity: 1;
        pointer-events: auto;
      }
      .study-reward-modal-card {
        background: #ffffff;
        border-radius: 28px;
        padding: 24px 28px;
        max-width: 480px;
        width: 100%;
        box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        border: 4px solid #ede9fe;
        text-align: center;
        position: relative;
        font-family: 'Fredoka', sans-serif;
      }
      .st-progress-bar-wrap {
        width: 100%;
        height: 22px;
        background: #f1f5f9;
        border-radius: 999px;
        overflow: hidden;
        margin: 16px 0;
        border: 2px solid #e2e8f0;
        position: relative;
      }
      .st-progress-bar-fill {
        height: 100%;
        border-radius: 999px;
        transition: width 0.3s ease;
      }
      .st-progress-bar-fill.mode-study {
        background: linear-gradient(90deg, #6366f1, #a855f7);
      }
      .st-progress-bar-fill.mode-play {
        background: linear-gradient(90deg, #10b981, #34d399);
      }
      .st-action-btn {
        padding: 10px 18px;
        border-radius: 16px;
        border: none;
        font-family: 'Fredoka', sans-serif;
        font-weight: 700;
        font-size: 0.95rem;
        cursor: pointer;
        transition: all 0.2s ease;
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }
      .st-action-btn:hover {
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);
  },

  injectUI() {
    // 1. Inject pill into home badges row right below top-bar
    let container = document.querySelector('#screen-home .home-badges-row');
    if (!container) {
      const homeScreen = document.getElementById('screen-home');
      if (homeScreen) {
        container = document.createElement('div');
        container.className = 'home-badges-row';
        container.style.cssText = 'display:flex; justify-content:center; gap:10px; margin-bottom:12px; flex-wrap:wrap;';
        const topBar = homeScreen.querySelector('.top-bar');
        const missionCard = homeScreen.querySelector('#mission-card-home');
        if (topBar && topBar.parentNode === homeScreen && topBar.nextSibling) {
          homeScreen.insertBefore(container, topBar.nextSibling);
        } else if (missionCard && missionCard.parentNode === homeScreen) {
          homeScreen.insertBefore(container, missionCard);
        } else {
          homeScreen.appendChild(container);
        }
      } else {
        container = document.querySelector('.top-actions') || document.querySelector('header .header-content > div:last-child');
      }
    }
    if (container && !document.getElementById('stat-study-reward')) {
      const pill = document.createElement('span');
      pill.id = 'stat-study-reward';
      pill.className = 'pill-stat mode-study';
      pill.title = 'Active Study & Play Gap Reward Timer';
      pill.addEventListener('click', () => this.openModal());
      container.appendChild(pill);
    }

    // 2. Inject Modal Overlay without child-accessible cheat buttons
    if (!document.getElementById('study-reward-modal-overlay')) {
      const overlay = document.createElement('div');
      overlay.id = 'study-reward-modal-overlay';
      overlay.innerHTML = `
        <div class="study-reward-modal-card">
          <button id="st-modal-close" style="position:absolute; top:12px; right:12px; background:#f1f5f9; border:none; border-radius:50%; width:44px; height:44px; display:inline-flex; align-items:center; justify-content:center; font-size:1.2rem; cursor:pointer; font-weight:bold;">✕</button>
          <div id="st-modal-icon" style="font-size:3rem; margin-bottom:8px;">📚</div>
          <h2 id="st-modal-title" style="font-size:1.5rem; color:#1e1b4b; margin:0 0 6px;">25-Minute Study Goal</h2>
          <p id="st-modal-sub" style="color:#64748b; font-size:0.95rem; margin:0;">Study actively for 25 mins to earn a 10-min Play Gap Reward + 50 Coins!</p>

          <div class="st-progress-bar-wrap">
            <div id="st-modal-progress-bar" class="st-progress-bar-fill mode-study" style="width: 0%"></div>
          </div>
          <div id="st-modal-timer-text" style="font-size:1.35rem; font-weight:800; color:#334155; margin-bottom:16px;">00:00 / 25:00</div>

          <div style="background:#f8fafc; border:2px dashed #cbd5e1; border-radius:18px; padding:14px; margin-bottom:6px; text-align:left;">
            <div style="font-weight:800; font-size:0.9rem; color:#475569; margin-bottom:8px;">🎁 Reward Rules:</div>
            <div style="font-size:0.85rem; color:#64748b; line-height:1.4;">
              ✅ <b>25 Minutes Active Study:</b> Earn a 10-Minute Play Gap Reward break & +50 Coins!<br>
              🎉 <b>10 Minutes Play Gap:</b> Free reward time to enjoy Puppy Park, Mall & Mini Games!
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      document.getElementById('st-modal-close')?.addEventListener('click', () => this.closeModal());
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.closeModal();
      });
    }

    this.updateUI();
  },

  startLoop() {
    if (this.timerId) clearInterval(this.timerId);
    this.timerId = setInterval(() => this.tick(), 1000);
  },

  tick() {
    // Do not tick if document is hidden/backgrounded
    if (document.hidden) return;

    // Must have interacted within the last 45 seconds to count as active
    const isRecentlyActive = (Date.now() - (this.lastActiveTimestamp || 0)) <= 45000;

    if (this.state.mode === 'STUDY') {
      const onStudyScreen = this.isStudyScreenActive();
      this.isPaused = !(isRecentlyActive && onStudyScreen);

      if (!this.isPaused) {
        this.state.studySeconds += 1;
        if (this.state.studySeconds >= this.STUDY_GOAL_SEC) {
          this.triggerPlayGapReward();
        }
      }
    } else if (this.state.mode === 'PLAY_GAP') {
      this.isPaused = !isRecentlyActive;
      if (!this.isPaused) {
        this.state.playGapSeconds -= 1;
        if (this.state.playGapSeconds <= 0) {
          this.endPlayGapReward();
        }
      }
    }

    // Save every 5s
    if (Date.now() - (this.state.lastUpdate || 0) > 4000) {
      this.state.lastUpdate = Date.now();
      this.saveState();
    }

    this.updateUI();
  },

  formatTime(totalSec) {
    const m = Math.floor(Math.max(0, totalSec) / 60);
    const s = Math.floor(Math.max(0, totalSec) % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  },

  updateUI() {
    const pill = document.getElementById('stat-study-reward');
    if (!pill) return;

    if (this.state.mode === 'STUDY') {
      pill.className = 'pill-stat mode-study';
      const mLeft = Math.ceil((this.STUDY_GOAL_SEC - this.state.studySeconds) / 60);
      const statusIcon = this.isPaused ? '⏸️' : '🟢';
      pill.innerHTML = `📚 Study: ${this.formatTime(this.state.studySeconds)} ${statusIcon} <span style="opacity:0.85;font-size:0.82rem">(${mLeft}m to Play Reward)</span>`;
    } else {
      pill.className = 'pill-stat mode-play';
      const statusIcon = this.isPaused ? '⏸️' : '🟢';
      pill.innerHTML = `🎮 🎁 PLAY REWARD: ${this.formatTime(this.state.playGapSeconds)} ${statusIcon}`;
    }

    // Update modal if open
    const overlay = document.getElementById('study-reward-modal-overlay');
    if (overlay && overlay.classList.contains('open')) {
      const icon = document.getElementById('st-modal-icon');
      const title = document.getElementById('st-modal-title');
      const sub = document.getElementById('st-modal-sub');
      const bar = document.getElementById('st-modal-progress-bar');
      const timeTxt = document.getElementById('st-modal-timer-text');

      if (this.state.mode === 'STUDY') {
        if (icon) icon.textContent = '📚';
        if (title) title.textContent = '25-Minute Study Goal';
        if (sub) sub.textContent = 'Study actively for 25 mins to earn a 10-min Play Gap Reward + 50 Coins!';
        const pct = Math.min(100, Math.floor((this.state.studySeconds / this.STUDY_GOAL_SEC) * 100));
        if (bar) {
          bar.className = 'st-progress-bar-fill mode-study';
          bar.style.width = `${pct}%`;
        }
        if (timeTxt) timeTxt.textContent = `${this.formatTime(this.state.studySeconds)} / ${this.formatTime(this.STUDY_GOAL_SEC)} (${pct}%)`;
      } else {
        if (icon) icon.textContent = '🎮';
        if (title) title.textContent = '10-Minute Play Gap Reward!';
        if (sub) sub.textContent = 'Enjoy your reward break with your Puppies, Mall & Fun Games!';
        const pct = Math.min(100, Math.floor((this.state.playGapSeconds / this.PLAY_GAP_SEC) * 100));
        if (bar) {
          bar.className = 'st-progress-bar-fill mode-play';
          bar.style.width = `${pct}%`;
        }
        if (timeTxt) timeTxt.textContent = `${this.formatTime(this.state.playGapSeconds)} remaining`;
      }
    }
  },

  openModal() {
    this.updateUI();
    const overlay = document.getElementById('study-reward-modal-overlay');
    if (overlay) overlay.classList.add('open');
  },

  closeModal() {
    const overlay = document.getElementById('study-reward-modal-overlay');
    if (overlay) overlay.classList.remove('open');
  },

  triggerPlayGapReward() {
    this.state.mode = 'PLAY_GAP';
    this.state.playGapSeconds = this.PLAY_GAP_SEC;
    this.state.rewardsEarnedToday = (this.state.rewardsEarnedToday || 0) + 1;
    this.saveState();
    this.updateUI();

    // Reward player with 50 coins
    if (typeof Store !== 'undefined' && Store.addCoins) {
      Store.addCoins(50, '25m Active Study Reward');
    } else {
      // Fallback direct storage update if needed
      try {
        const pd = JSON.parse(localStorage.getItem('puppy_player_advaita') || '{}');
        pd.coins = (pd.coins || 0) + 50;
        localStorage.setItem('puppy_player_advaita', JSON.stringify(pd));
      } catch (e) {}
    }

    // Refresh UI stats
    if (typeof App !== 'undefined' && App.refreshStats) App.refreshStats();

    // Sound & Confetti
    if (typeof Sounds !== 'undefined' && Sounds.fanfare) Sounds.fanfare();
    if (typeof Rewards !== 'undefined' && Rewards.confetti) Rewards.confetti(60);

    // Speak announcement
    if (typeof Speech !== 'undefined' && Speech.speak) {
      Speech.speak('Amazing Advaita! You studied actively for 25 minutes! You earned a 10-minute Play Gap Reward and 50 Bonus Coins!', 0.85, 'en-IN');
    }

    // Show popup celebration
    if (typeof Rewards !== 'undefined' && Rewards.showPopup) {
      Rewards.showPopup({
        emoji: '🎉 🎮 🐶',
        title: '10-Min Play Gap Reward!',
        text: 'WOW Advaita! You studied actively for 25 minutes! Enjoy 10 minutes of fun play gap with your Puppies & Games + 50 Bonus Coins!',
        onOk: () => {}
      });
    } else {
      alert('🎉 10-Min Play Gap Reward! WOW Advaita! You studied actively for 25 minutes! Enjoy 10 minutes of fun play + 50 Bonus Coins!');
    }
  },

  endPlayGapReward() {
    this.resetToStudyMode();

    if (typeof Speech !== 'undefined' && Speech.speak) {
      Speech.speak('Your 10 minute play gap is complete! Ready to study and earn your next reward?', 0.85, 'en-IN');
    }
    if (typeof Rewards !== 'undefined' && Rewards.showPopup) {
      Rewards.showPopup({
        emoji: '🌟 📚',
        title: 'Play Gap Complete!',
        text: 'Your 10-minute reward play gap is complete! Let us study actively for another 25 minutes to earn your next Play Gap reward!',
        onOk: () => {}
      });
    }
  },

  resetToStudyMode() {
    this.state.mode = 'STUDY';
    this.state.studySeconds = 0;
    this.saveState();
    this.updateUI();
  }
};

if (typeof window !== 'undefined') {
  window.StudyTimer = StudyTimer;
  document.addEventListener('DOMContentLoaded', () => {
    StudyTimer.init();
  });
}
