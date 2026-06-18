const CACHE = 'puppypark-v2';
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/config.js',
  './js/data.js',
  './js/puppies.js',
  './js/mall.js',
  './js/store.js',
  './js/sounds.js',
  './js/speech.js',
  './js/rewards.js',
  './js/minigames.js',
  './js/extras.js',
  './js/parent.js',
  './js/learn.js',
  './js/mathbook.js',
  './js/english.js',
  './js/app.js',
  './data/math_book.json',
  './assets/puppies/simba.jpg',
  './assets/puppies/mufasa.jpg',
  './assets/puppies/golu.jpg',
  './assets/puppies/whity.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const net = fetch(e.request).then((res) => {
        if (res.ok && e.request.url.includes(self.location.origin)) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
