var cacheName = 'petstore-v1';
var cacheFiles = [
    'index.html',
    'petstore.webmainfest',
    'images/Cat litter.jpg',
    'images/cat-animation.png',
    'images/icon-store-512.png',
    'images/istockphoto-1423650559-612x612.jpg'
];
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waituntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cacheFiles);
        })
    );
    });
self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r) {
            return r || fetch(e.request).then(function (response) {
                return caches.open(cacheNames).then(function (cache){
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    )
})
    