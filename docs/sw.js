const CACHE = 'puppypark-v27';
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
  './js/parent.js',
  './js/curse.js',
  './js/mathbook.js',
  './js/englishbook.js',
  './js/storybook.js',
  './js/englishboosters.js',
  './js/hindibook.js',
  './js/subjectbook.js',
  './js/coach.js',
  './js/app.js',
  './data/math_book.json',
  './data/math_challenge_book.json',
  './data/english_book.json',
  './data/stories.json',
  './data/english_plus_book.json',
  './data/hindi_words.json',
  './data/evs_book.json',
  './data/sanskrit_book.json',
  './data/computer_book.json',
  './data/hindi_lessons.json',
  './data/voice_manifest.json',
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
