// Zepòl Service Worker — PWA offline support
const CACHE_NAME = 'zepol-v19.0.0';

// Core app shell (resilient: each cached individually so one 404 won't break install)
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './styles.css',
    './premium-dashboard.css',
    './mobile-and-messaging.css',
    './translations.js',
    './main.js',
    './firebase-config.js',
    './modules/ui.js',
    './modules/ui-core.js',
    './modules/auth.js',
    './modules/wellness.js',
    './modules/library.js',
    './modules/books-data.js',
    './modules/messaging.js',
    './modules/ai-service.js',
    './modules/firebase-manager.js',
    './assets/logo.png',
    './assets/icon-192.png',
    './assets/icon-512.png',
    './assets/hero_illustration.png',
    './assets/community_bg.png',
    './assets/resources_bg.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// ── INSTALL: precache shell (resilient) ──────────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('🔧 Zepòl SW: caching app shell...');
            // Cache each asset individually — ignore failures so install always succeeds
            return Promise.all(
                ASSETS_TO_CACHE.map(url =>
                    cache.add(url).catch(err => console.warn('SW skip cache:', url))
                )
            );
        }).then(() => self.skipWaiting())
    );
});

// ── ACTIVATE: clean old caches ───────────────────────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

// ── FETCH: network-first for app, bypass for Firebase/dynamic ────
self.addEventListener('fetch', event => {
    const req = event.request;
    const url = req.url;

    // Only handle GET requests
    if (req.method !== 'GET') return;

    // Never intercept Firebase / Google / dynamic APIs — let them go straight to network
    if (url.includes('firestore.googleapis.com') ||
        url.includes('firebaseio.com') ||
        url.includes('identitytoolkit.googleapis.com') ||
        url.includes('googleapis.com') ||
        url.includes('gstatic.com') ||
        url.includes('google.com') ||
        url.includes('translate.goog')) {
        return; // default browser handling
    }

    // Network-first: always try fresh (so updates are instant), fall back to cache offline
    event.respondWith(
        fetch(req)
            .then(res => {
                // Cache a copy of successful same-origin responses for offline use
                if (res && res.status === 200 && (url.startsWith(self.location.origin) || url.includes('cdnjs'))) {
                    const copy = res.clone();
                    caches.open(CACHE_NAME).then(cache => cache.put(req, copy)).catch(() => {});
                }
                return res;
            })
            .catch(() => {
                // Offline: serve from cache
                return caches.match(req).then(cacheRes => {
                    if (cacheRes) return cacheRes;
                    // For navigation requests, fall back to index.html
                    if (req.mode === 'navigate' || url.includes('.html')) {
                        return caches.match('./index.html');
                    }
                    return new Response('Offline', { status: 503, statusText: 'Offline' });
                });
            })
    );
});
