// ===== COACH: Adaptive Recommender & Today's Mission Card (Phase 9) =====
const Coach = {
  async getAllChapters() {
    const chapters = [];

    // Math Book
    try {
      const mathData = await MathBook.load();
      (mathData?.chapters || []).forEach((c) => {
        chapters.push({
          id: c.id,
          title: c.title,
          icon: c.icon || '📘',
          level: c.level || 1,
          subject: 'math'
        });
      });
    } catch (e) {
      console.error('Coach math load fail', e);
    }

    // English Book
    try {
      const engData = await EnglishBook.load();
      (engData?.chapters || []).forEach((c) => {
        chapters.push({
          id: c.id,
          title: c.title,
          icon: c.icon || '📖',
          level: c.level || 1,
          subject: 'english'
        });
      });
    } catch (e) {
      console.error('Coach english load fail', e);
    }

    // Subject Books (EVS, Sanskrit, Computer)
    const subBooks = [
      { key: 'evs', icon: '🌿' },
      { key: 'sanskrit', icon: '🪔' },
      { key: 'computer', icon: '💻' },
      { key: 'english_plus', icon: '⚡' },
      { key: 'math_challenge', icon: '🏆' }
    ];
    for (const b of subBooks) {
      try {
        const d = await SubjectBook.load(b.key);
        (d?.chapters || []).forEach((c) => {
          chapters.push({
            id: c.id,
            title: c.title,
            icon: c.icon || b.icon,
            level: c.level || 1,
            subject: b.key
          });
        });
      } catch (e) {
        console.error(`Coach ${b.key} load fail`, e);
      }
    }

    // Hindi Book
    try {
      const hindiData = await HindiBook.load();
      (hindiData?.chapters || []).forEach((c) => {
        chapters.push({
          id: c.id,
          title: c.title,
          icon: c.icon || '🕉️',
          level: c.level || 1,
          subject: 'hindi'
        });
      });
    } catch (e) {
      console.error('Coach hindi load fail', e);
    }

    // Story Time (Reading)
    try {
      if (typeof StoryBook !== 'undefined') {
        const readingData = await StoryBook.load();
        (readingData?.levels || []).forEach((band) => {
          (band.stories || []).forEach((st) => {
            chapters.push({
              id: st.id,
              title: st.title,
              icon: st.emoji || '📖',
              level: st.level || band.level || 1,
              subject: 'reading'
            });
          });
        });
      }
    } catch (e) {
      console.error('Coach reading load fail', e);
    }

    return chapters;
  },

  async getRecommendation(playerId = App.playerId) {
    const chapters = await this.getAllChapters();
    if (!chapters || chapters.length === 0) return null;

    const p = Store.getPlayer(playerId);
    const attemptStats = p.attemptStats || {};
    const recent = p.recentCompletions || [];

    // Helper to get star status
    const getStars = (ch) => Store.getLevelStars(playerId, ch.subject, ch.id);

    // 1. STRUGGLE CUSHION CHECK
    // If she struggled on her last attempt (wrong >= 3, abandoned >= 2, or last completion <= 1⭐)
    if (p.lastAttemptSubject && p.lastAttemptLevelId) {
      const lastKey = `${p.lastAttemptSubject}_${p.lastAttemptLevelId}`;
      const lastStat = attemptStats[lastKey];
      const lastCh = chapters.find((c) => c.subject === p.lastAttemptSubject && c.id === p.lastAttemptLevelId);

      if (lastCh && lastStat && (lastStat.wrong >= 3 || lastStat.abandonedCount >= 2 || (lastStat.lastStars > 0 && lastStat.lastStars <= 1))) {
        const cushionLevel = Math.max(1, (lastCh.level || 2) - 1);
        const candidates = chapters.filter((c) => c.subject === p.lastAttemptSubject && c.level <= cushionLevel);
        const unsolvedCushion = candidates.find((c) => getStars(c) === 0);
        const target = unsolvedCushion || candidates[0] || lastCh;
        return {
          mode: 'cushion',
          badge: 'Puppy Favourite! 🐾',
          title: target.title,
          subject: target.subject,
          chapterId: target.id,
          level: target.level,
          icon: target.icon,
          speech: "Let's warm up with a puppy favourite! You can do it! 🐾"
        };
      }
    }

    // 2. LEVEL-UP NUDGE CHECK
    // If the last two completed chapters in a subject earned 3⭐
    if (recent.length >= 2) {
      const last1 = recent[recent.length - 1];
      const last2 = recent[recent.length - 2];
      if (last1.subject === last2.subject && last1.stars === 3 && last2.stars === 3) {
        const lastCh = chapters.find((c) => c.subject === last1.subject && c.id === last1.levelId);
        const nextLevel = (lastCh?.level || 1) + 1;
        const higherUnsolved = chapters.find((c) => c.subject === last1.subject && c.level === nextLevel && getStars(c) === 0);
        if (higherUnsolved) {
          return {
            mode: 'levelup',
            badge: 'Level Up Challenge! 🚀',
            title: higherUnsolved.title,
            subject: higherUnsolved.subject,
            chapterId: higherUnsolved.id,
            level: higherUnsolved.level,
            icon: higherUnsolved.icon,
            speech: "Wow, you're a superstar! Ready for a BIGGER challenge? 🚀"
          };
        }
      }
    }

    // 3. DEFAULT PICK
    // Easiest (lowest-level) unsolved chapter across subjects, biased away from least recently touched
    const unsolved = chapters.filter((c) => getStars(c) === 0);
    if (unsolved.length === 0) {
      // All chapters solved! Celebrate with a fun practice mission
      const randomCh = chapters[Math.floor(Math.random() * chapters.length)];
      return {
        mode: 'default',
        badge: "Today's Mission 🎯",
        title: randomCh.title,
        subject: randomCh.subject,
        chapterId: randomCh.id,
        level: randomCh.level,
        icon: randomCh.icon,
        speech: "You solved all missions! Let's practice a fun adventure! ⭐"
      };
    }

    const minLevel = Math.min(...unsolved.map((c) => c.level));
    const lowestUnsolved = unsolved.filter((c) => c.level === minLevel);
    // Prefer subject different from last attempted if possible
    const diverse = lowestUnsolved.find((c) => c.subject !== p.lastAttemptSubject);
    const chosen = diverse || lowestUnsolved[0];

    return {
      mode: 'default',
      badge: "Today's Mission 🎯",
      title: chosen.title,
      subject: chosen.subject,
      chapterId: chosen.id,
      level: chosen.level,
      icon: chosen.icon,
      speech: "Ready for today's adventure? Let's go!"
    };
  },

  async renderMissionCard(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const rec = await this.getRecommendation();
    if (!rec) {
      el.innerHTML = '';
      return;
    }

    el.innerHTML = `
      <div class="mission-card">
        <div class="mission-header">
          <span class="mission-badge">${rec.badge}</span>
          <span class="mission-level">Level ${rec.level} ⭐</span>
        </div>
        <div class="mission-body">
          <div class="mission-icon">${rec.icon || '📘'}</div>
          <div class="mission-info">
            <div class="mission-subject">${rec.subject.toUpperCase()}</div>
            <div class="mission-title">${rec.title}</div>
          </div>
          <button class="btn-fun green mission-btn" id="btn-play-mission-${containerId}">Play Mission ➜</button>
        </div>
      </div>
    `;

    const btn = el.querySelector(`#btn-play-mission-${containerId}`);
    if (btn) {
      btn.addEventListener('click', async () => {
        Sounds.tap();
        if (rec.speech) {
          Speech.speak(rec.speech);
        }
        await this.launchMission(rec);
      });
    }
  },

  async launchMission(rec) {
    // App.go activates the target <section> (adds .active) and opens the engine's
    // picker; awaiting the engine's cached load() queues startChapter AFTER that
    // picker render, so the chapter view wins — no race, and the screen is visible.
    if (rec.subject === 'reading') {
      await StoryBook.load();
      App.go('storytime');
      StoryBook.startStoryById(rec.chapterId);
    } else {
      App.go(rec.subject);
      if (rec.subject === 'math') {
        await MathBook.load();
        MathBook.startChapter(rec.chapterId);
      } else if (rec.subject === 'english') {
        await EnglishBook.load();
        EnglishBook.startChapter(rec.chapterId);
      } else if (rec.subject === 'hindi') {
        await HindiBook.startLessonById(rec.chapterId);
      } else {
        await SubjectBook.load(rec.subject);
        SubjectBook.startChapter(rec.chapterId);
      }
    }
  }
};
