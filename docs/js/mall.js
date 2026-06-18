// ====== PUPPY MALL: 1000 generated items across 5 categories ======
const MALL_CATS = [
  { id: 'clothes', name: 'Clothes', icon: '👗' },
  { id: 'food', name: 'Food', icon: '🍖' },
  { id: 'toys', name: 'Toys', icon: '🧸' },
  { id: 'home', name: 'Home', icon: '🏠' },
  { id: 'other', name: 'Other', icon: '✨' },
];

const MALL_BASES = {
  clothes: [
    ['🎀', 'Bow'], ['🧢', 'Cap'], ['👕', 'Shirt'], ['🧥', 'Coat'], ['🧣', 'Scarf'],
    ['🥾', 'Boots'], ['👗', 'Dress'], ['🕶️', 'Shades'], ['👑', 'Crown'], ['🧦', 'Socks'],
  ],
  food: [
    ['🦴', 'Bone'], ['🍖', 'Meaty Treat'], ['🍗', 'Drumstick'], ['🍪', 'Biscuit'], ['🥛', 'Milk'],
    ['🧀', 'Cheese'], ['🥕', 'Carrot'], ['🍎', 'Apple'], ['🎂', 'Pup Cake'], ['🍩', 'Donut'],
  ],
  toys: [
    ['⚽', 'Ball'], ['🎾', 'Tennis Ball'], ['🥏', 'Frisbee'], ['🧶', 'Yarn'], ['🪀', 'Yo-Yo'],
    ['🧸', 'Teddy'], ['🪁', 'Kite'], ['🧩', 'Puzzle'], ['🛼', 'Skates'], ['🎈', 'Balloon'],
  ],
  home: [
    ['🛏️', 'Bed'], ['🛋️', 'Sofa'], ['🥣', 'Bowl'], ['🪟', 'Window'], ['🪑', 'Chair'],
    ['🛁', 'Bath'], ['🚪', 'Doghouse Door'], ['🪴', 'Plant'], ['🕯️', 'Lamp'], ['🖼️', 'Picture'],
  ],
  other: [
    ['🌈', 'Rainbow'], ['⭐', 'Star'], ['🎁', 'Gift'], ['🫧', 'Bubbles'], ['🪄', 'Wand'],
    ['🎖️', 'Medal'], ['📸', 'Camera'], ['🎟️', 'Ticket'], ['🪙', 'Lucky Coin'], ['💎', 'Gem'],
  ],
};

const MALL_ADJ = [
  'Tiny', 'Cozy', 'Royal', 'Shiny', 'Rainbow', 'Sparkly', 'Magic', 'Super', 'Lucky', 'Fluffy',
  'Golden', 'Polka-Dot', 'Striped', 'Glittery', 'Cloud', 'Star', 'Heart', 'Candy', 'Velvet', 'Deluxe',
];

function rarityFor(price) {
  if (price >= 60) return { key: 'legendary', label: '🌟 Legendary' };
  if (price >= 40) return { key: 'epic', label: '💜 Epic' };
  if (price >= 22) return { key: 'rare', label: '💙 Rare' };
  return { key: 'common', label: '⚪ Common' };
}

const Mall = {
  items: [],
  byIdMap: {},
  selectedPuppy: null,
  cat: 'clothes',

  build() {
    if (this.items.length) return;
    MALL_CATS.forEach((c) => {
      MALL_ADJ.forEach((adj, ai) => {
        MALL_BASES[c.id].forEach(([emoji, noun], bi) => {
          const price = 6 + bi * 2 + ai * 3; // 6 .. 80
          const item = {
            id: `${c.id}-${ai}-${bi}`,
            cat: c.id,
            emoji,
            name: `${adj} ${noun}`,
            price,
            rarity: rarityFor(price).key,
          };
          this.items.push(item);
          this.byIdMap[item.id] = item;
        });
      });
    });
  },

  byId(id) {
    return this.byIdMap[id];
  },

  inCat(catId) {
    return this.items.filter((i) => i.cat === catId);
  },

  // Pick a wish for a puppy, biased toward its favourite categories.
  rollWish(def) {
    this.build();
    const useFav = Math.random() < 0.72 && def.favs && def.favs.length;
    const catId = useFav
      ? def.favs[Math.floor(Math.random() * def.favs.length)]
      : MALL_CATS[Math.floor(Math.random() * MALL_CATS.length)].id;
    const pool = this.inCat(catId).filter((i) => i.price <= 45); // wishes stay affordable
    const item = pool[Math.floor(Math.random() * pool.length)];
    return { id: item.id, emoji: item.emoji, name: item.name, price: item.price, cat: item.cat };
  },

  // ---------- UI ----------
  render() {
    this.build();
    const p = Store.getPlayer(App.playerId);
    if (!this.selectedPuppy) this.selectedPuppy = (PUPPIES[0] || {}).id;

    const chips = PUPPIES.map((def) => {
      const pup = p.puppies[def.id] || {};
      const wishHint = pup.wish ? ` wants ${pup.wish.emoji}` : '';
      return `<button class="shop-pup-chip ${def.id === this.selectedPuppy ? 'on' : ''}" data-pup="${def.id}">
          <img src="${AppConfig.url(def.photo)}" alt="${def.name}">
          <span>${def.name}${wishHint}</span>
        </button>`;
    }).join('');

    const tabs = MALL_CATS.map((c) =>
      `<button class="mall-tab ${c.id === this.cat ? 'on' : ''}" data-cat="${c.id}">${c.icon} ${c.name}</button>`
    ).join('');

    document.getElementById('mall-shopper').innerHTML =
      `<p class="mall-for">Shopping for:</p><div class="shop-pup-row">${chips}</div>`;
    document.getElementById('mall-tabs').innerHTML = tabs;
    this.renderGrid();

    document.querySelectorAll('#mall-shopper .shop-pup-chip').forEach((b) =>
      b.addEventListener('click', () => { Sounds.tap(); this.selectedPuppy = b.dataset.pup; this.render(); }));
    document.querySelectorAll('#mall-tabs .mall-tab').forEach((b) =>
      b.addEventListener('click', () => { Sounds.tap(); this.cat = b.dataset.cat; this.renderGrid(); this.markTabs(); }));
  },

  markTabs() {
    document.querySelectorAll('#mall-tabs .mall-tab').forEach((b) =>
      b.classList.toggle('on', b.dataset.cat === this.cat));
  },

  renderGrid() {
    const p = Store.getPlayer(App.playerId);
    const pup = p.puppies[this.selectedPuppy] || { owned: [], wish: null };
    const grid = document.getElementById('mall-grid');
    grid.innerHTML = this.inCat(this.cat).map((it) => {
      const owned = (pup.owned || []).includes(it.id);
      const isWish = pup.wish && pup.wish.id === it.id;
      const afford = p.coins >= it.price;
      return `
        <div class="mall-item ${owned ? 'owned' : ''} ${isWish ? 'wish' : ''}">
          ${isWish ? '<span class="wish-flag">⭐ Wish!</span>' : ''}
          <div class="mall-emoji">${it.emoji}</div>
          <div class="mall-name">${it.name}</div>
          <div class="mall-price">🪙 ${it.price}</div>
          ${owned
            ? '<div class="mall-owned">✅ Owned</div>'
            : `<button class="mall-buy ${afford ? '' : 'cant'}" data-id="${it.id}">${afford ? 'Buy' : 'Need 🪙'}</button>`}
        </div>`;
    }).join('');
    grid.querySelectorAll('.mall-buy:not(.cant)').forEach((b) =>
      b.addEventListener('click', () => this.buy(b.dataset.id)));
    grid.querySelectorAll('.mall-buy.cant').forEach((b) =>
      b.addEventListener('click', () => { Sounds.wrong(); Rewards.showToast('Play & earn more 🪙 first!'); }));
  },

  buy(itemId) {
    const res = Store.buyMallItem(App.playerId, this.selectedPuppy, itemId);
    if (!res.ok) { Sounds.wrong(); Rewards.showToast(res.msg); return; }
    Sounds.correct();
    Rewards.confetti(res.grantedWish ? 50 : 20);
    const def = PUPPIES.find((d) => d.id === this.selectedPuppy);
    if (res.grantedWish) {
      Sounds.cheer();
      Speech.speak(`${def.name} says thank you! Woof woof!`);
    } else {
      Speech.speak(`Yummy! ${def.name} is happy!`);
    }
    Rewards.showToast(res.msg);
    this.render();
    App.refreshStats();
  },
};
