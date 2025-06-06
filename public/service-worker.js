self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("shadsapp-cache").then(cache => {
      return cache.addAll(["/", "/index.html", "/styles.css", "/client.js"]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then(response => response || caches.match("/"))
    )
  );
});