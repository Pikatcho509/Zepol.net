const CACHE_NAME = 'zepol-v18.0.43-MOOD-ENHANCED';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './styles.css',
    './registration-styles.css',
    './v4-styles.css',
    './script.js',
    './firebase-config.js',
    './translations.js',
    './modules/firebase-manager.js',
    './modules/ui.js',
    './modules/auth.js',
    './modules/wellness.js',
    './assets/logo.png',
    './assets/hero_illustration.png',
    './assets/depression_support.jfif',
    './assets/support_vibe.jfif',
    './assets/community_bg.png',
    './assets/resources_bg.png',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Zepòl Cache Opening...');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Event
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Fetch Event - BYPASS CACHE FOR DEBUGGING
self.addEventListener('fetch', event => {
    event.respondWith(
        fetch(event.request).catch(() => {
            // Only use cache as fallback for offline
            return caches.match(event.request).then(cacheRes => {
                if (cacheRes) return cacheRes;
                if (event.request.url.indexOf('.html') > -1) {
                    return caches.match('./index.html');
                }
            });
        })
    );
});
