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

  addReward(id, { coins = 0, stars = 0, xp = 0 }) {
    const p = this.getPlayer(id);
    p.coins += coins;
    p.stars += stars;
    p.xp += xp;
    p.level = Math.floor(p.xp / 100) + 1;
    this.updatePlayer(id, p);
    return p;
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
};
