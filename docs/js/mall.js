// ====== PUPPY MALL: 1000 generated items across 5 categories + ⭐ Wishes tab ======
const MALL_CATS = [
  { id: 'wishes', name: 'Wishes', icon: '⭐' },
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
  cat: 'wishes',
  filter: 'all',
  visibleCount: 16,

  build() {
    if (this.items.length) return;
    MALL_CATS.forEach((c) => {
      if (c.id === 'wishes') return;
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
      : MALL_CATS.filter(c => c.id !== 'wishes')[Math.floor(Math.random() * (MALL_CATS.length - 1))].id;
    const pool = this.inCat(catId).filter((i) => i.price <= 45); // wishes stay affordable
    const item = pool[Math.floor(Math.random() * pool.length)];
    return { id: item.id, emoji: item.emoji, name: item.name, price: item.price, cat: item.cat };
  },

  // ---------- UI ----------
  render() {
    this.build();
    const p = Store.getPlayer(App.playerId);
    if (!this.selectedPuppy) this.selectedPuppy = (PUPPIES[0] || {}).id;

    // Step 13: Compact round photo chips + name + wish dot
    const chips = PUPPIES.map((def) => {
      const pup = p.puppies[def.id] || {};
      const wishDot = pup.wish ? `<span class="wish-dot" title="Wants ${pup.wish.emoji}">⭐</span>` : '';
      return `<button class="shop-pup-chip compact-pup-chip ${def.id === this.selectedPuppy ? 'on' : ''}" data-pup="${def.id}">
          <div class="pup-chip-img-wrapper">
            <img src="${AppConfig.url(def.photo)}" alt="${def.name}">
            ${wishDot}
          </div>
          <span>${def.name}</span>
        </button>`;
    }).join('');

    const tabs = MALL_CATS.map((c) =>
      `<button class="mall-tab ${c.id === this.cat ? 'on' : ''}" data-cat="${c.id}">${c.icon} ${c.name}</button>`
    ).join('');

    // Step 15: Filter chips above grid
    const filtersHtml = this.cat === 'wishes' ? '' : `
      <div class="mall-filter-chips">
        <button class="filter-chip ${this.filter === 'all' ? 'on' : ''}" data-filter="all">All</button>
        <button class="filter-chip ${this.filter === 'can_buy' ? 'on' : ''}" data-filter="can_buy">🪙 Can Buy</button>
        <button class="filter-chip ${this.filter === 'not_owned' ? 'on' : ''}" data-filter="not_owned">🆕 Not Owned</button>
      </div>
    `;

    const shopperEl = document.getElementById('mall-shopper');
    if (shopperEl) shopperEl.innerHTML = `<p class="mall-for">Shopping for:</p><div class="shop-pup-row compact-pup-row">${chips}</div>`;
    
    const tabsEl = document.getElementById('mall-tabs');
    if (tabsEl) tabsEl.innerHTML = tabs;

    const filtersEl = document.getElementById('mall-filters');
    if (filtersEl) filtersEl.innerHTML = filtersHtml;

    this.renderGrid();

    document.querySelectorAll('#mall-shopper .shop-pup-chip').forEach((b) =>
      b.addEventListener('click', () => { Sounds.tap(); this.selectedPuppy = b.dataset.pup; this.render(); }));
    document.querySelectorAll('#mall-tabs .mall-tab').forEach((b) =>
      b.addEventListener('click', () => {
        Sounds.tap();
        this.cat = b.dataset.cat;
        this.visibleCount = 16;
        this.render();
      }));
    document.querySelectorAll('#mall-filters .filter-chip').forEach((b) =>
      b.addEventListener('click', () => {
        Sounds.tap();
        this.filter = b.dataset.filter;
        this.visibleCount = 16;
        this.markFilters();
        this.renderGrid();
      }));
  },

  markFilters() {
    document.querySelectorAll('#mall-filters .filter-chip').forEach((b) =>
      b.classList.toggle('on', b.dataset.filter === this.filter));
  },

  renderGrid() {
    const p = Store.getPlayer(App.playerId);
    const grid = document.getElementById('mall-grid');
    const pagination = document.getElementById('mall-pagination');
    if (!grid) return;

    // Step 13: ⭐ Wishes pseudo-category
    if (this.cat === 'wishes') {
      if (pagination) pagination.innerHTML = '';
      const wishesHtml = PUPPIES.map((def) => {
        const pup = p.puppies[def.id] || {};
        if (!pup.wish) {
          return `
            <div class="wish-card-item empty-wish">
              <div class="wish-card-header">
                <img src="${AppConfig.url(def.photo)}" alt="${def.name}" class="wish-pup-img">
                <span class="wish-pup-name">${def.name}</span>
              </div>
              <p class="wish-desc">🌟 ${def.name}'s wishes are all granted right now!</p>
            </div>
          `;
        }
        const afford = p.coins >= pup.wish.price;
        return `
          <div class="wish-card-item active-wish">
            <div class="wish-card-header">
              <img src="${AppConfig.url(def.photo)}" alt="${def.name}" class="wish-pup-img">
              <span class="wish-pup-name">${def.name} wishes for:</span>
            </div>
            <div class="wish-card-body">
              <div class="wish-emoji-big">${pup.wish.emoji}</div>
              <div class="wish-details">
                <h4 class="wish-item-name">${pup.wish.name}</h4>
                <div class="wish-item-price">🪙 ${pup.wish.price}</div>
              </div>
            </div>
            <div class="wish-card-action">
              ${afford
                ? `<button class="btn-fun green mall-buy-wish" data-id="${pup.wish.id}" data-pup="${def.id}">🎁 Buy for ${def.name}</button>`
                : `<div class="cant-afford-box">
                    <span class="need-coins-text">Need ${pup.wish.price - p.coins} more 🪙</span>
                    <button class="btn-fun blue btn-play-to-earn">▶️ Play to earn</button>
                   </div>`}
            </div>
          </div>
        `;
      }).join('');
      grid.innerHTML = `<div class="wishes-grid">${wishesHtml}</div>`;
      grid.querySelectorAll('.mall-buy-wish').forEach((b) =>
        b.addEventListener('click', () => this.buy(b.dataset.id, b.dataset.pup)));
      grid.querySelectorAll('.btn-play-to-earn').forEach((b) =>
        b.addEventListener('click', () => { Sounds.tap(); App.go('play'); }));
      return;
    }

    // Regular categories with Step 14 sorting and Step 15 filters
    const pup = p.puppies[this.selectedPuppy] || { owned: [], wish: null };
    let pool = this.inCat(this.cat);

    // Apply filters
    if (this.filter === 'can_buy') {
      pool = pool.filter(it => !(pup.owned || []).includes(it.id) && p.coins >= it.price);
    } else if (this.filter === 'not_owned') {
      pool = pool.filter(it => !(pup.owned || []).includes(it.id));
    }

    // Sort: wish -> affordable ascending -> unaffordable ascending -> owned sink to end
    pool.sort((a, b) => {
      const aOwned = (pup.owned || []).includes(a.id);
      const bOwned = (pup.owned || []).includes(b.id);
      if (aOwned !== bOwned) return aOwned ? 1 : -1;
      if (aOwned && bOwned) return a.price - b.price;

      const aWish = pup.wish && pup.wish.id === a.id;
      const bWish = pup.wish && pup.wish.id === b.id;
      if (aWish !== bWish) return aWish ? -1 : 1;

      const aAfford = p.coins >= a.price;
      const bAfford = p.coins >= b.price;
      if (aAfford !== bAfford) return aAfford ? -1 : 1;

      return a.price - b.price;
    });

    const slice = pool.slice(0, this.visibleCount);
    grid.innerHTML = slice.map((it) => {
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
            : (afford
                ? `<button class="mall-buy" data-id="${it.id}">Buy</button>`
                : `<div class="cant-afford-box">
                    <span class="need-coins-text">Need ${it.price - p.coins} more 🪙</span>
                    <button class="btn-fun blue btn-play-to-earn">▶️ Play to earn</button>
                   </div>`)}
        </div>`;
    }).join('');

    grid.querySelectorAll('.mall-buy').forEach((b) =>
      b.addEventListener('click', () => this.buy(b.dataset.id)));
    grid.querySelectorAll('.btn-play-to-earn').forEach((b) =>
      b.addEventListener('click', () => { Sounds.tap(); App.go('play'); }));

    // Step 14: Pagination button
    if (pagination) {
      if (pool.length > this.visibleCount) {
        pagination.innerHTML = `
          <button class="btn-fun orange btn-big show-more-btn" id="mall-show-more" style="width: 100%; margin-top: 16px; padding: 14px; font-size: 1.05rem;">
            ⬇️ Show More Toys (${pool.length - this.visibleCount} more)
          </button>
        `;
        document.getElementById('mall-show-more')?.addEventListener('click', () => {
          Sounds.tap();
          this.visibleCount += 16;
          this.renderGrid();
        });
      } else {
        pagination.innerHTML = '';
      }
    }
  },

  buy(itemId, targetPupId) {
    const pupId = targetPupId || this.selectedPuppy;
    const res = Store.buyMallItem(App.playerId, pupId, itemId);
    if (!res.ok) { Sounds.wrong(); Rewards.showToast(res.msg); return; }
    Sounds.correct();
    Rewards.confetti(res.grantedWish ? 50 : 20);
    const def = PUPPIES.find((d) => d.id === pupId);
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
