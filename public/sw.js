/* For a Reason — service worker. App-shell offline + runtime caching.
   Handles installability and offline for client-rendered routes. Server-rendered/auth routes
   fall back to the offline page when the network is unavailable. */
const VERSION = "forareason-next-v1";
const SHELL = ["/", "/offline", "/about", "/community", "/tools", "/manifest.webmanifest",
  "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // let cross-origin (fonts, supabase) hit the network
  // navigations: network-first, fall back to cache, then offline page
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((r) => r || caches.match("/offline")))
    );
    return;
  }
  // static assets (_next, icons, images): cache-first, then network (stale-while-revalidate)
  e.respondWith(
    caches.match(req).then((cached) => {
      const net = fetch(req).then((res) => { if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; }).catch(() => cached);
      return cached || net;
    })
  );
});
