// ====== Advaita's 4 real puppies ======
const PUPPIES = [
  { id: 'simba',  name: 'Simba',  gender: 'boy',  photo: 'assets/puppies/simba.jpg',  color: '#c97b3c', favs: ['toys', 'food'],     say: 'Woof! Play with me!' },
  { id: 'mufasa', name: 'Mufasa', gender: 'boy',  photo: 'assets/puppies/mufasa.jpg', color: '#d98c3a', favs: ['food', 'home'],     say: 'I am hungry, hehe!' },
  { id: 'golu',   name: 'Golu',   gender: 'girl', photo: 'assets/puppies/golu.jpg',   color: '#4a4038', favs: ['clothes', 'other'], say: 'Make me pretty!' },
  { id: 'whity',  name: 'Whity',  gender: 'girl', photo: 'assets/puppies/whity.jpg',  color: '#caa472', favs: ['clothes', 'toys'],  say: 'Let us go shopping!' },
];

const WISH_INTERVAL_MS = 3 * 60 * 60 * 1000; // a new wish every ~3 hours

function moodFace(happy) {
  if (happy >= 80) return '😄';
  if (happy >= 55) return '🙂';
  if (happy >= 35) return '😟';
  return '🥺';
}

const Puppies = {
  // refresh wishes + decay on entering the park
  tick() {
    Store.decayHappiness(App.playerId);
    const fresh = Store.refreshWishes(App.playerId, WISH_INTERVAL_MS);
    return fresh;
  },

  renderPark() {
    const wrap = document.getElementById('puppy-yard');
    if (!wrap) return;
    const p = Store.ensurePuppies(App.playerId);
    const wishCount = PUPPIES.filter((d) => p.puppies[d.id]?.wish).length;
    const banner = document.getElementById('park-banner');
    if (banner) {
      banner.textContent = wishCount
        ? `🐶 ${wishCount} ${wishCount === 1 ? 'puppy has' : 'puppies have'} a wish! Play to earn 🪙 then shop!`
        : '🐾 Your puppies are happy! Play to earn coins for treats!';
    }
    wrap.innerHTML = PUPPIES.map((def) => {
      const pup = p.puppies[def.id];
      const happy = pup.happy ?? 80;
      const eqClothes = pup.equipped?.clothes ? Mall.byId(pup.equipped.clothes) : null;
      const eqOther = pup.equipped?.other ? Mall.byId(pup.equipped.other) : null;
      const overlay = [eqClothes?.emoji, eqOther?.emoji].filter(Boolean).join('');
      const wish = pup.wish
        ? `<div class="wish-bubble">Wish: ${pup.wish.emoji} <b>${pup.wish.name}</b></div>`
        : `<div class="wish-bubble calm">${moodFace(happy)} ${def.say}</div>`;
      return `
        <button class="pup-card" data-pup="${def.id}">
          ${wish}
          <div class="pup-photo-wrap">
            <img class="pup-photo" src="${AppConfig.url(def.photo)}" alt="${def.name}">
            ${overlay ? `<span class="pup-overlay">${overlay}</span>` : ''}
          </div>
          <div class="pup-name">${def.name} ${def.gender === 'girl' ? '👧' : '👦'}</div>
          <div class="happy-bar"><div class="happy-fill" style="width:${happy}%"></div></div>
        </button>`;
    }).join('');
    wrap.querySelectorAll('.pup-card').forEach((c) =>
      c.addEventListener('click', () => { Sounds.tap(); this.openPuppy(c.dataset.pup); }));
  },

  openPuppy(puppyId) {
    this.current = puppyId;
    App.go('puppy');
  },

  renderDetail() {
    const def = PUPPIES.find((d) => d.id === this.current) || PUPPIES[0];
    this.current = def.id;
    const p = Store.ensurePuppies(App.playerId);
    const pup = p.puppies[def.id];
    const happy = pup.happy ?? 80;
    const el = document.getElementById('puppy-detail');

    const wishHtml = pup.wish
      ? `<div class="detail-wish">
           <span class="detail-wish-emoji">${pup.wish.emoji}</span>
           <div><b>${def.name} wishes for</b><br>${pup.wish.name} · 🪙 ${pup.wish.price}</div>
           <button class="btn-fun green btn-big" id="grant-wish">Grant it! 🛍️</button>
         </div>`
      : `<div class="detail-wish calm">${moodFace(happy)} ${def.name} has no wish right now. Come back later!</div>`;

    const owned = (pup.owned || []).map((id) => Mall.byId(id)).filter(Boolean);
    const wardrobe = owned.length
      ? owned.map((it) => {
          const isEq = pup.equipped?.[it.cat] === it.id;
          const wearable = it.cat === 'clothes' || it.cat === 'other';
          return `<button class="ward-item ${isEq ? 'on' : ''}" data-id="${it.id}" data-wear="${wearable}">
              <span>${it.emoji}</span><small>${isEq ? 'On' : (wearable ? 'Wear' : '✓')}</small>
            </button>`;
        }).join('')
      : '<p class="hint">No toys yet — grant a wish in the mall!</p>';

    const eqClothes = pup.equipped?.clothes ? Mall.byId(pup.equipped.clothes) : null;
    const eqOther = pup.equipped?.other ? Mall.byId(pup.equipped.other) : null;
    const overlay = [eqClothes?.emoji, eqOther?.emoji].filter(Boolean).join('');

    el.innerHTML = `
      <div class="detail-stage">
        <div class="pup-photo-wrap big">
          <img class="pup-photo" src="${AppConfig.url(def.photo)}" alt="${def.name}">
          ${overlay ? `<span class="pup-overlay">${overlay}</span>` : ''}
        </div>
        <h2>${def.name} ${def.gender === 'girl' ? '👧' : '👦'} <span class="mood">${moodFace(happy)}</span></h2>
        <div class="happy-bar big"><div class="happy-fill" style="width:${happy}%"></div></div>
        <p class="happy-label">Happiness ${happy}%</p>
      </div>
      ${wishHtml}
      <h3 class="ward-title">🎒 ${def.name}'s Things</h3>
      <div class="wardrobe">${wardrobe}</div>
      <div class="detail-actions">
        <button class="btn-fun pink btn-big" id="pup-shop">🛍️ Go Shopping</button>
        <button class="btn-fun orange btn-big" id="pup-play">▶️ Play & Earn</button>
      </div>`;

    document.getElementById('grant-wish')?.addEventListener('click', () => {
      Mall.selectedPuppy = def.id;
      Mall.cat = pup.wish.cat;
      App.go('mall');
    });
    document.getElementById('pup-shop').addEventListener('click', () => {
      Sounds.tap(); Mall.selectedPuppy = def.id; App.go('mall');
    });
    document.getElementById('pup-play').addEventListener('click', () => { Sounds.tap(); App.go('play'); });
    el.querySelectorAll('.ward-item[data-wear="true"]').forEach((b) =>
      b.addEventListener('click', () => {
        Sounds.tap();
        Store.equipItem(App.playerId, def.id, b.dataset.id);
        this.renderDetail();
      }));
    Speech.navSay(`${def.name} is so happy to see you!`);
  },
};

// Shim so existing learning engines (math/english/learn/quest) keep working.
const Pet = {
  onLessonComplete() { /* coins already flow through Store.addReward → puppies */ },
};
