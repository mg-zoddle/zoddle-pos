const CACHE_NAME = 'zoddle-pos-v1';

// Cache critical files immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(['/', '/index.html']);
    })
  );
});

// Intercept network requests: Serve from cache if offline
self.addEventListener('fetch', (event) => {
  // Only intercept HTTP/HTTPS requests
  if (!(event.request.url.startsWith('http'))) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached version if found
      if (cachedResponse) {
        // Fetch new version in the background to keep cache updated
        fetch(event.request).then((networkResponse) => {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
          });
        }).catch(() => {}); // Ignore network errors in background
        return cachedResponse;
      }
      
      // If not in cache, fetch from network and save to cache
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // Offline fallback
        return caches.match('/index.html');
      });
    })
  );
});
