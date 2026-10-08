// Football Imperium Manager – offline cache. The game is shown from the cache at once and refreshed in the background.
const CACHE='fim-743f1195db',FILES=["./", "apple-touch-icon.png", "icon-192.png", "icon-512.png", "index.html", "manifest.webmanifest", "maskable-512.png", "three.min.js"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
 e.respondWith(caches.open(CACHE).then(async c=>{const hit=await c.match(r,{ignoreSearch:true}),net=fetch(r).then(x=>{if(x&&x.ok)c.put(r,x.clone());return x}).catch(()=>hit);
  if(hit){e.waitUntil(net);return hit}return net}))});
