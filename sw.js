const CACHE_NAME = 'the-king-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/css.css',
  '/js/script.js',
  '/img/logo.png'
];

// تثبيت الـ Service Worker وحفظ الملفات المهمة
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// تشغيل الملفات من الكاش لو مفيش نت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});