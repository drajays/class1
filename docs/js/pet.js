const Pet = {
  renderAdopt() {
    const grid = document.getElementById('pet-adopt-grid');
    grid.innerHTML = PET_TYPES.map((p) => `
      <button class="pet-pick" data-id="${p.id}">
        <span class="pet-big">${p.emoji}</span>
        <span class="pet-name">${p.name}</span>
        <span class="pet-say">${p.say}</span>
      </button>
    `).join('');
    grid.querySelectorAll('.pet-pick').forEach((btn) => {
      btn.addEventListener('click', () => {
        Sounds.tap();
        Store.adoptPet(App.playerId, btn.dataset.id);
        Speech.navSay(`Yay! You adopted ${PET_TYPES.find((p) => p.id === btn.dataset.id).name}!`);
        App.go('home');
      });
    });
    Speech.navSay('Choose your pet friend! Tap the dragon, robot, or puppy!');
  },

  renderLounge() {
    const el = document.getElementById('companion-lounge');
    const p = Store.getPlayer(App.playerId);
    if (!p.pet?.type) {
      el.innerHTML = `<button class="btn-fun pink btn-big" id="btn-adopt-from-lounge">🐾 Adopt a Pet First!</button>`;
      document.getElementById('btn-adopt-from-lounge')?.addEventListener('click', () => App.go('pet-adopt'));
      return;
    }
    const type = PET_TYPES.find((t) => t.id === p.pet.type) || PET_TYPES[0];
    const outfit = p.pet.outfit ? PET_ITEMS.outfits.find((o) => o.id === p.pet.outfit)?.emoji || '' : '';
    el.innerHTML = `
      <div class="companion-box">
        <div class="companion-stage">
          <span class="companion-sprite" id="companion-sprite">${type.emoji}</span>
          <span class="companion-outfit">${outfit}</span>
          <div class="companion-speech-bubble" id="companion-bubble">I love learning with you!</div>
        </div>
        <div>
          <h3>${type.name}</h3>
          <p>❤️ Happy ${p.pet.happiness ?? 50}% · 🍖 Full ${p.pet.hunger ?? 50}%</p>
          <div class="pet-shop-row">
            ${PET_ITEMS.food.map((f) => `<button class="pet-item-btn" data-action="feed" data-id="${f.id}">${f.emoji}</button>`).join('')}
            ${PET_ITEMS.toys.map((t) => `<button class="pet-item-btn" data-action="toy" data-id="${t.id}">${t.emoji}</button>`).join('')}
            ${PET_ITEMS.outfits.map((o) => `<button class="pet-item-btn" data-action="outfit" data-id="${o.id}">${o.emoji}</button>`).join('')}
            <button class="pet-item-btn" data-action="care">🤗</button>
          </div>
        </div>
      </div>`;
    document.getElementById('companion-sprite').addEventListener('click', () => this.poke());
    el.querySelectorAll('.pet-item-btn').forEach((btn) => {
      btn.addEventListener('click', () => this.interact(btn.dataset.action, btn.dataset.id));
    });
  },

  poke() {
    Sounds.tap();
    const phrases = ['Giggle! That tickles!', 'You are my best friend!', 'Let us win coins!', 'Can we play a mini game?'];
    const bubble = document.getElementById('companion-bubble');
    if (bubble) bubble.textContent = phrases[Math.floor(Math.random() * phrases.length)];
    Store.petAction(App.playerId, 'care');
    this.renderLounge();
  },

  renderHome() {
    const panel = document.getElementById('pet-panel');
    if (!panel || !App.playerId) return;
    const p = Store.getPlayer(App.playerId);
    if (!p.pet?.type) {
      panel.innerHTML = `<button class="btn-fun pink btn-big" id="btn-adopt-pet">🐾 Adopt a Pet Friend!</button>`;
      document.getElementById('btn-adopt-pet')?.addEventListener('click', () => App.go('pet-adopt'));
      return;
    }
    const type = PET_TYPES.find((t) => t.id === p.pet.type) || PET_TYPES[0];
    const hunger = p.pet.hunger ?? 50;
    const happy = p.pet.happiness ?? 50;
    const outfit = p.pet.outfit ? PET_ITEMS.outfits.find((o) => o.id === p.pet.outfit)?.emoji || '' : '';
    panel.innerHTML = `
      <div class="pet-card">
        <div class="pet-avatar-wrap">
          <span class="pet-outfit">${outfit}</span>
          <span class="pet-avatar ${hunger < 30 ? 'hungry' : ''} ${happy > 70 ? 'happy-bounce' : ''}" id="home-pet-tap">${type.emoji}</span>
        </div>
        <div class="pet-info">
          <h3>${type.name}</h3>
          <div class="pet-bars">
            <label>🍖 Hunger <div class="mini-bar"><div class="mini-fill hunger" style="width:${hunger}%"></div></div></label>
            <label>💖 Happy <div class="mini-bar"><div class="mini-fill happy" style="width:${happy}%"></div></div></label>
          </div>
          <button class="btn-fun pink btn-big" id="btn-open-lounge">🐾 Pet Lounge</button>
        </div>
      </div>`;
    document.getElementById('btn-open-lounge')?.addEventListener('click', () => App.go('companion'));
    document.getElementById('home-pet-tap')?.addEventListener('click', () => this.poke());
  },

  interact(action, itemId) {
    const result = Store.petAction(App.playerId, action, itemId);
    if (!result.ok) {
      Rewards.showToast(result.msg);
      Sounds.wrong();
      return;
    }
    Sounds.correct();
    Rewards.showToast(result.msg);
    if (result.celebrate) Rewards.confetti(15);
    this.renderHome();
    if (document.getElementById('companion-lounge')) this.renderLounge();
    App.refreshStats();
  },

  onLessonComplete(playerId) {
    Store.petLessonBonus(playerId);
  },
};
