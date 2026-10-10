// OttoHSK's service worker. It exists so browsers treat the app as
// installable; it caches nothing and lets every request go to the network as
// usual, so the app is never served stale.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
self.addEventListener("fetch", () => {});
