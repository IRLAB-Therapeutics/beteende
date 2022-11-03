const i = [
  "/_app/immutable/start-86d33831.js",
  "/_app/immutable/components/pages/_layout.svelte-2a669211.js",
  "/_app/immutable/assets/Offcanvas-60614438.css",
  "/_app/immutable/components/error.svelte-ce154f45.js",
  "/_app/immutable/components/pages/_page.svelte-4cccd262.js",
  "/_app/immutable/components/pages/admin/_page.svelte-a289b9d3.js",
  "/_app/immutable/components/pages/experiment/_page.svelte-3972477f.js",
  "/_app/immutable/components/pages/experiment/_id_/_page.svelte-b16beeef.js",
  "/_app/immutable/assets/_page-41a63a6d.css",
  "/_app/immutable/components/pages/runner/_page.svelte-f12fa57b.js",
  "/_app/immutable/assets/_page-1b360e72.css",
  "/_app/immutable/modules/pages/_layout.js-7b9cbfbc.js",
  "/_app/immutable/chunks/singletons-a5abb9b3.js",
  "/_app/immutable/chunks/env-public-6aa99648.js",
  "/_app/immutable/chunks/index-2930019b.js",
  "/_app/immutable/chunks/index-0d1c4b0e.js",
  "/_app/immutable/chunks/_layout-8d2a742b.js",
  "/_app/immutable/chunks/stores-e62af082.js",
  "/_app/immutable/chunks/stores-1f586f8b.js",
  "/_app/immutable/chunks/Button-17fdc8f0.js",
  "/_app/immutable/chunks/ListGroupItem-d4189c9a.js",
  "/_app/immutable/chunks/utils-30e0e084.js",
  "/_app/immutable/chunks/Label-6a9c7a07.js",
  "/_app/immutable/chunks/0-c64bad7c.js",
  "/_app/immutable/chunks/1-37ea05b9.js",
  "/_app/immutable/chunks/2-88f17859.js",
  "/_app/immutable/chunks/3-f0de963b.js",
  "/_app/immutable/chunks/4-f55d20d7.js",
  "/_app/immutable/chunks/5-09877512.js",
  "/_app/immutable/chunks/6-93943340.js"
], m = [
  "/IRLAB_beteende_180.png",
  "/favicon.png",
  "/manifest.json"
], c = self, p = "cache-v1", l = i.concat(m), u = new Set(l).add("/service-worker.js");
c.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(p).then((s) => s.addAll(l)).then(() => {
      c.skipWaiting(), console.log("Installed service-worker");
    })
  );
});
c.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(async (s) => {
      for (const a of s)
        a !== p && await caches.delete(a);
      c.clients.claim();
    })
  );
});
async function h(e) {
  const s = await caches.open("offline-v1");
  try {
    console.log("Going to fetch " + e.url);
    const a = await fetch(e);
    return console.log("Fetched " + e.url), s.put(e, a.clone()), a;
  } catch (a) {
    console.log("Could not fetch " + e.url + ", getting it from the cache");
    const t = await s.match(e);
    if (t)
      return t;
    throw console.log("Could not get " + e.url + " from the cache"), a;
  }
}
c.addEventListener("fetch", (e) => {
  if (console.log("Event listener: " + e.request.method), console.log(e.request.headers), e.request.method !== "GET" || e.request.headers.has("range"))
    return;
  const s = new URL(e.request.url), a = s.protocol.startsWith("http"), t = s.hostname === self.location.hostname && s.port !== self.location.port, n = s.host === self.location.host && u.has(s.pathname), o = e.request.cache === "only-if-cached" && !n;
  console.log({ href: s.href, isDevServerRequest: t, isStaticAsset: n, skipBecauseUncached: o }), a && !t && !o && e.respondWith(
    (async () => n && await caches.match(e.request) || h(e.request))()
  );
});
