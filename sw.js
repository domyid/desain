// =========================================================
// Service Worker — membuat aplikasi bisa dipasang & jalan offline.
// Strategi:
//   - navigasi halaman: network-first (selalu coba versi terbaru),
//     fallback ke cache index saat offline.
//   - aset (js/css/svg/font): stale-while-revalidate (cepat dari
//     cache, diperbarui di latar belakang).
// =========================================================

const CACHE = 'dunia-awan-v1';
const INTI = ['./', './index.html', './css/style.css', './js/main.js', './manifest.webmanifest', './icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(INTI)).then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Navigasi: utamakan jaringan, fallback ke cache (offline).
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('./index.html').then((r) => r || caches.match('./'))),
    );
    return;
  }

  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.host);
  if (!sameOrigin && !isFont) return; // biarkan permintaan lain apa adanya

  // Stale-while-revalidate.
  e.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(req);
      const jaringan = fetch(req)
        .then((res) => { if (res && res.status === 200) cache.put(req, res.clone()); return res; })
        .catch(() => cached);
      return cached || jaringan;
    }),
  );
});
