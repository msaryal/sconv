const CACHE = 'network-or-cache-v1';
const timeout = 400;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll([
                '/sconv/',
                '/sconv/index.html',
                '/sconv/assets/ico/favicon-96x96.png',
                '/sconv/assets/ico/favicon.svg',
                '/sconv/assets/ico/favicon.ico',
                '/sconv/assets/ico/apple-touch-icon.png',
                '/sconv/assets/ico/site.webmanifest',
                '/sconv/assets/css/style.css',
                '/sconv/assets/js/script.js',
                'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap'
            ])
        ));
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            if (cachedResponse) {
                return cachedResponse;
            }

            return fetch(event.request);
        })
    );
});