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
        bones: 0,
        lifetimeCoins: 0,
        puppies: {},
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
    // Earning coins makes every puppy a little happier + earns rare bones.
    if (coins > 0) {
      const before = p.lifetimeCoins || 0;
      p.lifetimeCoins = before + coins;
      const newBones = Math.floor(p.lifetimeCoins / 40) - Math.floor(before / 40);
      if (newBones > 0) p.bones = (p.bones || 0) + newBones;
      this.ensurePuppies(id, p);
      Object.values(p.puppies).forEach((pup) => {
        pup.happy = Math.min(100, (pup.happy ?? 70) + 2);
      });
    }
    this.updatePlayer(id, p);
    return p;
  },

  // ---- Puppy world ----
  ensurePuppies(id, pref) {
    const p = pref || this.getPlayer(id);
    if (!p.puppies) p.puppies = {};
    let changed = false;
    (typeof PUPPIES !== 'undefined' ? PUPPIES : []).forEach((def) => {
      if (!p.puppies[def.id]) {
        p.puppies[def.id] = { happy: 80, owned: [], equipped: {}, wish: null, wishAt: 0, lastSeen: Date.now() };
        changed = true;
      }
    });
    if (changed && !pref) this.updatePlayer(id, p);
    return p;
  },

  // Gentle happiness decay over real time so puppies "miss" the player.
  decayHappiness(id) {
    const p = this.ensurePuppies(id);
    const now = Date.now();
    Object.values(p.puppies).forEach((pup) => {
      const hrs = (now - (pup.lastSeen || now)) / 3600000;
      if (hrs >= 1) {
        pup.happy = Math.max(30, Math.round((pup.happy ?? 80) - hrs * 3));
        pup.lastSeen = now;
      }
    });
    this.updatePlayer(id, p);
    return p;
  },

  // Roll a fresh wish for any puppy whose wish is old/empty. Returns puppies that got a NEW wish.
  refreshWishes(id, intervalMs) {
    const p = this.ensurePuppies(id);
    const now = Date.now();
    const fresh = [];
    (PUPPIES || []).forEach((def) => {
      const pup = p.puppies[def.id];
      if (!pup.wish || (now - (pup.wishAt || 0)) >= intervalMs) {
        pup.wish = Mall.rollWish(def);
        pup.wishAt = now;
        fresh.push(def.id);
      }
    });
    if (fresh.length) this.updatePlayer(id, p);
    return fresh;
  },

  // Buy a mall item for a puppy. Grants wish bonus if it matches the puppy's wish.
  buyMallItem(id, puppyId, itemId) {
    const p = this.ensurePuppies(id);
    const item = Mall.byId(itemId);
    const pup = p.puppies[puppyId];
    if (!item || !pup) return { ok: false, msg: 'Oops, try again!' };
    if (p.coins < item.price) return { ok: false, msg: `Need ${item.price} 🪙 — play to earn more!` };
    p.coins -= item.price;
    if (!pup.owned.includes(itemId)) pup.owned.push(itemId);
    // wearable categories get auto-equipped
    if (item.cat === 'clothes' || item.cat === 'other') pup.equipped[item.cat] = itemId;
    let happy = 12;
    let bones = 0;
    const grantedWish = pup.wish && pup.wish.id === itemId;
    if (grantedWish) {
      happy = 30;
      bones = 2;
      pup.wish = null;
      pup.wishAt = Date.now();
    }
    pup.happy = Math.min(100, (pup.happy ?? 70) + happy);
    pup.lastSeen = Date.now();
    if (bones) p.bones = (p.bones || 0) + bones;
    this.logActivity(id, `${grantedWish ? 'Granted wish' : 'Bought'} ${item.emoji} ${item.name} for ${puppyId}`);
    this.updatePlayer(id, p);
    const def = (PUPPIES || []).find((d) => d.id === puppyId);
    return {
      ok: true, grantedWish, bones, item,
      msg: grantedWish
        ? `${def?.name || 'Puppy'} got the wish! +2 🦴 bones!`
        : `${def?.name || 'Puppy'} loves the ${item.name}!`,
    };
  },

  equipItem(id, puppyId, itemId) {
    const p = this.ensurePuppies(id);
    const pup = p.puppies[puppyId];
    const item = Mall.byId(itemId);
    if (!pup || !item) return;
    const slot = item.cat;
    if (pup.equipped[slot] === itemId) delete pup.equipped[slot];
    else pup.equipped[slot] = itemId;
    this.updatePlayer(id, p);
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

  awardLevel(id, subject, levelId, stars, coins, extra = {}) {
    const oldStars = this.getLevelStars(id, subject, levelId);
    let awardedCoins = 0;
    let awardedStars = 0;
    let firstTime = false;
    let improved = false;

    if (oldStars === 0) {
      firstTime = true;
      awardedCoins = coins;
      awardedStars = stars;
    } else if (stars > oldStars) {
      improved = true;
      awardedCoins = Math.max(0, Math.round(coins * ((stars - oldStars) / stars)));
      awardedStars = stars - oldStars;
    }

    const wasQualifying = typeof Curse !== 'undefined' ? Curse.isQualifyingChapter(id, subject, levelId, oldStars) : false;
    this.completeLevel(id, subject, levelId, stars);
    const xp = awardedCoins > 0 ? Math.max(10, awardedCoins * 2) : 5;
    this.addReward(id, { coins: awardedCoins, stars: awardedStars, xp });

    const journeyEvent = this.logJourneyEvent(id, {
      subject,
      chapterId: levelId,
      title: extra.title || levelId,
      level: extra.level || 1,
      stars,
      wrong: extra.wrong || 0,
      timeSec: extra.timeSec || 0,
      coins: awardedCoins,
      firstTime
    });
    this.stampHistoryTrail(journeyEvent);

    if (typeof Curse !== 'undefined') {
      if (extra.wrong >= 3) {
        Curse.checkMentorPrompt(id, extra.wrong, subject, levelId);
      }
      const problemCount = extra.total || 12;
      Curse.onChapterCompleted(id, subject, levelId, oldStars, problemCount, wasQualifying);
    }

    return {
      coins: awardedCoins,
      stars: awardedStars,
      firstTime,
      improved,
      oldStars,
      newStars: Math.max(oldStars, stars)
    };
  },

  grantBrainobrainReward(id = 'advaita', qId = 1, qText = 'Question', scoreMultiplier = 1.0, bonusCoins = 0) {
    const baseCoins = Math.max(1, Math.round(10 * scoreMultiplier)) + bonusCoins;
    const baseXp    = Math.max(1, Math.round(15 * scoreMultiplier));
    this.addReward(id, { coins: baseCoins, stars: 1, xp: baseXp });

    let melted = 0;
    let freezePct = 0;
    if (typeof Curse !== 'undefined') {
      const meltRes = Curse.onProblemSolved(id, 'brainobrain', `q_${qId}`, true, 0);
      if (meltRes) {
        melted = meltRes.melted || 0;
        freezePct = meltRes.freezePct || 0;
      }
    }

    // 🎲 RANDOMISED puppy gift (shuffled puppy order + random item)
    this.ensurePuppies(id);
    const p = this.getPlayer(id);
    p.bbSolvedCount = (p.bbSolvedCount || 0) + 1;
    // Boost happiness for all puppies
    ['simba', 'mufasa', 'golu', 'whity'].forEach(pid => {
      const pup = p.puppies[pid];
      if (pup) pup.happy = Math.min(100, (pup.happy ?? 70) + 8);
    });

    let giftName = null; let giftEmoji = null; let pupName = null;
    if (p.bbSolvedCount % 3 === 0 || Math.random() < 0.35) {
      if (typeof LevelSystem !== 'undefined') {
        this.updatePlayer(id, p);
        const gift = LevelSystem.grantRandomPuppyGift(id);
        if (gift) { giftName = gift.item.name; giftEmoji = gift.item.emoji; pupName = gift.pupId; }
      } else {
        // Fallback: shuffled puppy order
        const pupIds = ['simba', 'mufasa', 'golu', 'whity'].sort(() => Math.random() - 0.5);
        for (const pid of pupIds) {
          const pup = p.puppies[pid];
          if (pup && pup.wish) {
            const item = pup.wish;
            if (!pup.owned.includes(item.id)) pup.owned.push(item.id);
            giftName = item.name; giftEmoji = item.emoji; pupName = pid;
            pup.wish = null; pup.wishAt = Date.now(); pup.happy = 100;
            break;
          }
        }
        if (!giftName && typeof Mall !== 'undefined' && Mall.items.length) {
          const pupIds2 = ['simba', 'mufasa', 'golu', 'whity'].sort(() => Math.random() - 0.5);
          for (const pid of pupIds2) {
            const pup = p.puppies[pid];
            const unowned = Mall.items.filter(it => !(pup.owned || []).includes(it.id));
            if (unowned.length) {
              const item = unowned[Math.floor(Math.random() * Math.min(20, unowned.length))];
              pup.owned.push(item.id); giftName = item.name; giftEmoji = item.emoji; pupName = pid;
              pup.happy = 100; break;
            }
          }
        }
      }
    }

    this.updatePlayer(id, p);

    if (typeof Rewards !== 'undefined') {
      const msgParts = [`🎉 +${baseCoins} 🪙 Earned!`];
      if (melted > 0) msgParts.push(`👸 Princess Ice -${melted}%`);
      if (giftName) msgParts.push(`🎁 ${giftEmoji} ${giftName} → ${(pupName || '').toUpperCase()}!`);
      Rewards.showToast(msgParts.join(' | '));
    }

    return { coins: baseCoins, melted, freezePct, giftName, giftEmoji, pupName };
  },


  grantBrainobrainMockReward(id = 'advaita', totalCorrect = 35) {
    const coins = Math.max(20, totalCorrect * 5);
    const stars = Math.floor(totalCorrect / 8);
    this.addReward(id, { coins, stars, xp: totalCorrect * 5 });

    let melted = 0;
    let freezePct = 0;
    if (typeof Curse !== 'undefined') {
      const meltRes = Curse.onChapterCompleted(id, 'brainobrain', 'mock_test', 0, totalCorrect, true);
      if (meltRes) {
        melted = meltRes.melted || 0;
        freezePct = meltRes.freezePct || 0;
      }
    }

    this.ensurePuppies(id);
    const p = this.getPlayer(id);
    const pupIds = ['simba', 'mufasa', 'golu', 'whity'];
    const giftsGranted = [];

    if (typeof Mall !== 'undefined' && Mall.items.length) {
      pupIds.forEach((pid) => {
        const pup = p.puppies[pid];
        if (pup) {
          pup.happy = 100;
          const unowned = Mall.items.filter((it) => !(pup.owned || []).includes(it.id));
          if (unowned.length && Math.random() < 0.6) {
            const item = unowned[Math.floor(Math.random() * Math.min(20, unowned.length))];
            pup.owned.push(item.id);
            giftsGranted.push(`${item.emoji} ${item.name} (${pid})`);
          }
        }
      });
    }

    this.updatePlayer(id, p);
    if (typeof Rewards !== 'undefined') {
      Rewards.confetti(80);
      Rewards.showToast(`🏆 Mock Test Complete! +${coins} 🪙 | 👸 Princess Ice -${melted}% | 🎁 ${giftsGranted.length} Puppy Gifts!`);
    }

    return { coins, stars, melted, freezePct, giftsGranted };
  },

  logJourneyEvent(id, entry) {
    const p = this.getPlayer(id);
    if (!p.journal) p.journal = [];
    const now = Date.now();
    const event = {
      ts: now,
      date: new Date(now).toISOString().slice(0, 10),
      subject: entry.subject || 'general',
      chapterId: entry.chapterId || '',
      title: entry.title || entry.chapterId || 'Lesson',
      level: entry.level || 1,
      stars: entry.stars || 0,
      wrong: entry.wrong || 0,
      timeSec: entry.timeSec || 0,
      coins: entry.coins || 0,
      firstTime: !!entry.firstTime
    };
    p.journal.unshift(event);
    if (p.journal.length > 500) {
      p.journal = p.journal.slice(0, 500);
    }
    this.updatePlayer(id, p);
    return event;
  },

  getVoicePrefs() {
    let p = {};
    try { p = JSON.parse(localStorage.getItem('pp_voice') || '{}'); } catch { p = {}; }
    // Mummy's voice is the app default for BOTH languages (all subjects).
    // '' means the user explicitly chose the normal/auto voice in-app.
    if (p.enVoice === undefined) p.enVoice = '__mummy__';
    if (p.hiVoice === undefined) p.hiVoice = '__mummy__';
    if (p.skipSymbols === undefined) p.skipSymbols = true;
    return p;
  },

  setVoicePref(key, value) {
    const p = this.getVoicePrefs();
    p[key] = value;
    localStorage.setItem('pp_voice', JSON.stringify(p));
    return p;
  },

  getJournal(id) {
    const p = this.getPlayer(id);
    return p.journal || [];
  },

  stampHistoryTrail(event) {
    if (typeof window === 'undefined' || !window.history || typeof location === 'undefined') return;
    try {
      const date = event.date || new Date().toISOString().slice(0, 10);
      const sub = (event.subject || 'general').replace(/[^a-zA-Z0-9_-]/g, '-');
      const chap = (event.chapterId || event.title || 'lesson').replace(/[^a-zA-Z0-9_-]/g, '-');
      const stars = (event.stars || 1) + 'star';
      const hashPath = `#journey/${date}/${sub}/${chap}/${stars}`;
      window.history.pushState({ journeyStamp: true }, '', hashPath);
      if (typeof document !== 'undefined') {
        const origTitle = document.title || 'Puppy Park';
        document.title = `✅ ${sub.toUpperCase()} — ${event.title} ${'⭐'.repeat(event.stars || 1)} · Puppy Park`;
        setTimeout(() => {
          if (document.title && document.title.startsWith('✅ ')) {
            document.title = origTitle;
          }
        }, 4000);
      }
    } catch (e) {}
  },

  awardFun(id, { coins = 0, xp = 0, label = 'Fun Game', stars = 0 }) {
    const p = this.getPlayer(id);
    const today = new Date().toISOString().slice(0, 10);
    if (p.funDate !== today) {
      p.funDate = today;
      p.funWinsToday = 0;
    }
    const wins = p.funWinsToday || 0;
    let awardedCoins = coins;
    let awardedStars = stars;
    let capped = false;
    if (wins >= 3) {
      awardedCoins = 0;
      awardedStars = 0;
      capped = true;
    }
    p.funWinsToday = wins + 1;
    this.updatePlayer(id, p);

    this.addReward(id, { coins: awardedCoins, stars: awardedStars, xp });
    if (label) {
      if (capped) {
        this.logActivity(id, `${label}: won (daily fun cap reached, XP only)`);
      } else {
        this.logActivity(id, `${label}: won +${awardedCoins} coins! 🎮`);
      }
    }
    return { coins: awardedCoins, stars: awardedStars, xp, capped, winsToday: p.funWinsToday };
  },

  logAttempt(id, subject, levelId, { wrong = 0, timeSec = 0, stars = 0, abandoned = false } = {}) {
    const p = this.getPlayer(id);
    if (!p.attemptStats) p.attemptStats = {};
    const key = `${subject}_${levelId}`;
    const prev = p.attemptStats[key] || { wrong: 0, attempts: 0, abandonedCount: 0, lastStars: 0, timeSec: 0 };
    p.attemptStats[key] = {
      wrong: prev.wrong + wrong,
      attempts: prev.attempts + 1,
      abandonedCount: prev.abandonedCount + (abandoned ? 1 : 0),
      lastStars: stars || prev.lastStars || 0,
      timeSec: (prev.timeSec || 0) + timeSec,
      lastTs: Date.now()
    };
    p.lastAttemptSubject = subject;
    p.lastAttemptLevelId = levelId;
    this.updatePlayer(id, p);
    if (typeof Curse !== 'undefined') {
      if (wrong >= 3) {
        Curse.checkMentorPrompt(id, wrong, subject, levelId);
      }
    }
    return p.attemptStats[key];
  },

  completeLevel(id, subject, levelId, starCount) {
    const p = this.getPlayer(id);
    const key = subject;
    if (!p[key]) p[key] = {};
    const prev = p[key][levelId] || 0;
    p[key][levelId] = Math.max(prev, starCount);
    if (starCount === 3) p.perfectLevels = (p.perfectLevels || 0) + 1;
    if (!p.recentCompletions) p.recentCompletions = [];
    p.recentCompletions.push({ subject, levelId, stars: starCount, ts: Date.now() });
    if (p.recentCompletions.length > 50) p.recentCompletions.shift();
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
      p.consecutiveWrongs = 0;
      this.updatePlayer(id, p);
    } else {
      p.streak = 0;
      p.consecutiveWrongs = (p.consecutiveWrongs || 0) + 1;
      this.updatePlayer(id, p);
      if (typeof Curse !== 'undefined' && p.consecutiveWrongs >= 3 && p.consecutiveWrongs % 3 === 0) {
        Curse.checkMentorPrompt(id, p.consecutiveWrongs);
      }
    }
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
