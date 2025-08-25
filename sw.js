const CACHE = 'network-or-cache-v1';
const timeout = 400;

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches
            .open(CACHE)
            .then((cache) => cache.addAll([
                '/',
                '/index.html',
                '/assets/ico/favicon-96x96.png',
                '/assets/ico/favicon.svg',
                '/assets/ico/favicon.ico',
                '/assets/ico/apple-touch-icon.png',
                '/assets/ico/site.webmanifest',
                '/assets/js/script.js',
                'https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap'
            ])
        ));
});

self.addEventListener('fetch', (event) => {
    event.respondWith(fromNetwork(event.request, timeout)
      .catch((err) => {
          console.log(`Error: ${err.message()}`);
          return fromCache(event.request);
      }));
});

function fromNetwork(request, timeout)
{
    return new Promise((fulfill, reject) => {
        var timeoutId = setTimeout(reject, timeout);
        fetch(request).then((response) => {
            clearTimeout(timeoutId);
            fulfill(response);
        }, reject);
    });
}

function fromCache(request)
{
    return caches.open(CACHE).then((cache) =>
        cache.match(request).then((matching) =>
            matching || Promise.reject('no-match')
        ));
}