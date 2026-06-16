const Store = {
  KEY: 'class1_adventure_v1',

  load() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || { players: {} };
    } catch {
      return { players: {} };
    }
  },

  save(data) {
    localStorage.setItem(this.KEY, JSON.stringify(data));
  },

  getPlayer(id) {
    const data = this.load();
    if (!data.players[id]) {
      data.players[id] = {
        coins: 0,
        stars: 0,
        xp: 0,
        level: 1,
        streak: 0,
        bestStreak: 0,
        math: {},
        english: {},
        chapters: {},
        badges: [],
        perfectLevels: 0,
        lastDaily: null,
        loginStreak: 0,
        lastLogin: null,
        streakChestAt: 0,
        pet: null,
        assessment: { math: { correct: 0, total: 0 }, english: { correct: 0, total: 0 }, evs: { correct: 0, total: 0 } },
        activityLog: [],
        minigamesWon: 0,
        stickers: [],
        stats: { speedTotalMs: 0, answerCount: 0 },
      };
      this.save(data);
    }
    return data.players[id];
  },

  updatePlayer(id, patch) {
    const data = this.load();
    data.players[id] = { ...this.getPlayer(id), ...patch };
    this.save(data);
    return data.players[id];
  },

  xpForLevel(level) {
    return level * 100;
  },

  xpProgress(p) {
    const level = p.level || 1;
    const base = (level - 1) * 100;
    const current = (p.xp || 0) - base;
    const need = 100;
    return { current: Math.max(0, current), need, pct: Math.min(100, (current / need) * 100) };
  },

  addReward(id, { coins = 0, stars = 0, xp = 0 }) {
    const p = this.getPlayer(id);
    p.coins += coins;
    p.stars += stars;
    p.xp += xp;
    p.level = Math.floor(p.xp / 100) + 1;
    this.updatePlayer(id, p);
    return p;
  },

  dailyChallenge(id) {
    const p = this.getPlayer(id);
    const today = new Date().toISOString().slice(0, 10);
    if (p.lastDaily === today) {
      return { ok: false, msg: 'You already claimed today\'s gift! Come back tomorrow 🌙' };
    }
    p.lastDaily = today;
    p.coins += 8;
    p.stars += 1;
    p.xp += 12;
    p.level = Math.floor(p.xp / 100) + 1;
    this.updatePlayer(id, p);
    return { ok: true, msg: '+8 coins, +1 star, +12 XP! Daily challenge complete! 🎁' };
  },

  completeLevel(id, subject, levelId, starCount) {
    const p = this.getPlayer(id);
    const key = subject;
    if (!p[key]) p[key] = {};
    const prev = p[key][levelId] || 0;
    p[key][levelId] = Math.max(prev, starCount);
    if (starCount === 3) p.perfectLevels = (p.perfectLevels || 0) + 1;
    this.updatePlayer(id, p);
    return p;
  },

  getLevelStars(id, subject, levelId) {
    const p = this.getPlayer(id);
    return (p[subject] && p[subject][levelId]) || 0;
  },

  countCompletedLevels(id, subject, total) {
    const p = this.getPlayer(id);
    const done = Object.values(p[subject] || {}).filter((s) => s > 0).length;
    return `${done}/${total}`;
  },

  completeChapter(id, chapterId, starCount) {
    const p = this.getPlayer(id);
    if (!p.chapters) p.chapters = {};
    const prev = p.chapters[chapterId] || 0;
    p.chapters[chapterId] = Math.max(prev, starCount);
    this.updatePlayer(id, p);
    return p;
  },

  getChapterStars(id, chapterId) {
    const p = this.getPlayer(id);
    return (p.chapters && p.chapters[chapterId]) || 0;
  },

  countChapterStars(id, subjectId) {
    const p = this.getPlayer(id);
    const prefix = subjectId + '_';
    return Object.entries(p.chapters || {}).filter(
      ([k, v]) => k.startsWith(prefix) && v > 0
    ).length;
  },

  bumpStreak(id, success) {
    const p = this.getPlayer(id);
    if (success) {
      p.streak = (p.streak || 0) + 1;
      p.bestStreak = Math.max(p.bestStreak || 0, p.streak);
    } else {
      p.streak = 0;
    }
    this.updatePlayer(id, p);
    return p;
  },

  checkBadges(id) {
    const p = this.getPlayer(id);
    const earned = new Set(p.badges || []);
    const mathDone = Object.keys(p.math || {}).length;
    const engDone = Object.keys(p.english || {}).length;

    BADGES.forEach((b) => {
      if (earned.has(b.id)) return;
      let ok = false;
      if (b.type === 'math_levels') ok = mathDone >= b.need;
      else if (b.type === 'english_levels') ok = engDone >= b.need;
      else if (b.type === 'chapter_levels') ok = Object.keys(p.chapters || {}).length >= b.need;
      else if (b.type === 'streak') ok = p.bestStreak >= b.need;
      else if (b.type === 'perfect') ok = p.perfectLevels >= b.need;
      else if (b.id === 'first_star') ok = p.stars >= 1;
      else if (b.id === 'coin_collector') ok = p.coins >= b.need;
      if (ok) earned.add(b.id);
    });

    const newBadges = [...earned].filter((b) => !(p.badges || []).includes(b));
    if (newBadges.length) {
      p.badges = [...earned];
      this.updatePlayer(id, p);
    }
    return newBadges;
  },

  recordLogin(id) {
    const p = this.getPlayer(id);
    const today = new Date().toISOString().slice(0, 10);
    if (p.lastLogin === today) return { chest: false };
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    if (p.lastLogin === yesterday) p.loginStreak = (p.loginStreak || 0) + 1;
    else if (p.lastLogin !== today) p.loginStreak = 1;
    p.lastLogin = today;
    this.logActivity(id, `Logged in — day ${p.loginStreak} streak 🔥`);
    this.updatePlayer(id, p);
    const chest = p.loginStreak >= 3 && p.loginStreak > (p.streakChestAt || 0);
    return { chest, streak: p.loginStreak };
  },

  claimStreakChest(id) {
    const p = this.getPlayer(id);
    if ((p.loginStreak || 0) < 3 || p.loginStreak <= (p.streakChestAt || 0)) {
      return { ok: false };
    }
    p.streakChestAt = p.loginStreak;
    p.coins += 25;
    p.stars += 3;
    p.xp += 30;
    p.level = Math.floor(p.xp / 100) + 1;
    this.logActivity(id, `Opened ${p.loginStreak}-day streak chest! 🎁`);
    this.updatePlayer(id, p);
    return { ok: true, msg: `3-day streak chest! +25 coins, +3 stars!` };
  },

  adoptPet(id, type) {
    const p = this.getPlayer(id);
    p.pet = { type, hunger: 70, happiness: 70, outfit: null, toys: [] };
    this.logActivity(id, `Adopted pet ${type}! 🐾`);
    this.updatePlayer(id, p);
    return p;
  },

  petAction(id, action, itemId) {
    const p = this.getPlayer(id);
    if (!p.pet) return { ok: false, msg: 'Adopt a pet first!' };
    if (action === 'care') {
      p.pet.happiness = Math.min(100, (p.pet.happiness || 50) + 15);
      this.updatePlayer(id, p);
      return { ok: true, msg: 'Your pet feels loved! 💖', celebrate: true };
    }
    const list = action === 'feed' ? PET_ITEMS.food
      : action === 'toy' ? PET_ITEMS.toys
      : action === 'outfit' ? PET_ITEMS.outfits
      : PET_ITEMS.outfits;
    const item = list.find((i) => i.id === itemId);
    if (!item) return { ok: false, msg: 'Oops!' };
    if (p.coins < item.cost) return { ok: false, msg: `Need ${item.cost} coins! Keep learning!` };
    p.coins -= item.cost;
    if (action === 'feed') {
      p.pet.hunger = Math.min(100, (p.pet.hunger || 50) + item.hunger);
    } else if (action === 'toy') {
      p.pet.happiness = Math.min(100, (p.pet.happiness || 50) + item.happy);
      p.pet.toys = [...(p.pet.toys || []), item.id];
    } else {
      p.pet.outfit = item.id;
      p.pet.happiness = Math.min(100, (p.pet.happiness || 50) + 10);
    }
    this.updatePlayer(id, p);
    return { ok: true, msg: `${item.emoji} Yay! ${PET_TYPES.find((t) => t.id === p.pet.type)?.name} loves it!`, celebrate: true };
  },

  petLessonBonus(id) {
    const p = this.getPlayer(id);
    if (!p.pet) return;
    p.pet.hunger = Math.max(0, (p.pet.hunger || 50) - 5);
    p.pet.happiness = Math.min(100, (p.pet.happiness || 50) + 8);
    this.updatePlayer(id, p);
  },

  trackAnswer(id, subject, correct) {
    const p = this.getPlayer(id);
    if (!p.assessment) p.assessment = {};
    let key = subject;
    if (subject === 'language' || subject === 'english_grammar') key = 'english';
    if (!p.assessment[key]) p.assessment[key] = { correct: 0, total: 0 };
    p.assessment[key].total++;
    if (correct) p.assessment[key].correct++;
    this.updatePlayer(id, p);
  },

  recordMinigameWin(id) {
    const p = this.getPlayer(id);
    p.minigamesWon = (p.minigamesWon || 0) + 1;
    this.logActivity(id, 'Won a mini-game! 🎮');
    this.updatePlayer(id, p);
  },

  logActivity(id, msg) {
    const p = this.getPlayer(id);
    if (!p.activityLog) p.activityLog = [];
    const time = new Date().toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' });
    p.activityLog.push(`${time}: ${msg}`);
    if (p.activityLog.length > 20) p.activityLog = p.activityLog.slice(-20);
    this.updatePlayer(id, p);
  },

  parentNudges(id) {
    const p = this.getPlayer(id);
    const hero = HEROES.find((h) => h.id === id);
    const name = hero?.name || 'your child';
    const nudges = [];
    const a = p.assessment || {};
    if ((a.math?.correct || 0) >= 5) {
      nudges.push(`${name} is practicing addition! Ask: "What is 7 + 5?" at dinner tonight.`);
    }
    if ((a.english?.correct || 0) >= 3) {
      nudges.push(`${name} is building reading skills! Read a short story together before bed.`);
    }
    if ((a.evs?.correct || 0) >= 3) {
      nudges.push(`${name} learned living vs non-living! Point out a tree and a rock on your next walk.`);
    }
    const chDone = Object.keys(p.chapters || {}).filter((k) => p.chapters[k] > 0).length;
    if (chDone >= 5) {
      nudges.push(`${name} finished ${chDone} chapters! Celebrate with a sticker chart at home.`);
    }
    if ((p.loginStreak || 0) >= 3) {
      nudges.push(`${name} has a ${p.loginStreak}-day learning streak! Keep the habit going — 10 minutes daily works best.`);
    }
    if (!nudges.length) {
      nudges.push(`Encourage ${name} to try a mini-game today — Apple Basket is great for beginners!`);
      nudges.push('Read together for 10 minutes. Kids learn best when parents join the fun!');
    }
    return nudges.slice(0, 4);
  },

  trackResponseTime(id, ms) {
    const p = this.getPlayer(id);
    if (!p.stats) p.stats = { speedTotalMs: 0, answerCount: 0 };
    p.stats.speedTotalMs += ms;
    p.stats.answerCount++;
    this.updatePlayer(id, p);
  },

  buySticker(id, itemId) {
    const item = SHOP_ITEMS.find((i) => i.id === itemId);
    if (!item) return { ok: false, msg: 'Item not found' };
    const p = this.getPlayer(id);
    if ((p.stickers || []).includes(itemId)) return { ok: false, msg: 'You already own this sticker!' };
    if (p.coins < item.cost) return { ok: false, msg: `Need ${item.cost} coins! Keep learning!` };
    p.coins -= item.cost;
    p.stickers = [...(p.stickers || []), itemId];
    this.logActivity(id, `Bought sticker ${item.name} ${item.emoji}`);
    this.updatePlayer(id, p);
    return { ok: true, msg: `You got ${item.emoji} ${item.name}!` };
  },

  avgResponseSec(id) {
    const p = this.getPlayer(id);
    const n = p.stats?.answerCount || 0;
    if (!n) return '0.0';
    return (p.stats.speedTotalMs / n / 1000).toFixed(1);
  },

  overallAccuracy(id) {
    const p = this.getPlayer(id);
    const a = p.assessment || {};
    let c = 0; let t = 0;
    Object.values(a).forEach((s) => { c += s.correct || 0; t += s.total || 0; });
    return t ? Math.round((c / t) * 100) : 0;
  },
};
