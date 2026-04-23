const CACHE_NAME = 'stuf-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/logo.png',
  '/1.jpg',
  '/1-mobile.jpg',
  '/6.jpg',
  '/6-mobile.jpg',
  '/7.jpg',
  '/7-mobile.jpg',
  '/Harrow_club_workshop.jpg',
  '/Harrow_club_workshop-mobile.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200) return response;

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(() => {
        return caches.match(event.request);
      });
    })
  );
});
