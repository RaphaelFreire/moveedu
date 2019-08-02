// sw.js
const staticCacheName = "ensina-01/08/2019";

let filesToCache = [
    "index.html",
    "/img/banner-principal.png",
    "/img/favicon.png",
    "/img/perso-01.png",
    "/img/perso-02.png",
    "/img/perso-03.png",
    "/img/perso-04.png",
    "/img/perso-04.png",
    "/img/detalhe-depoimento-01.svg",
    "/img/icones-inf.svg",
    "/img/icones-recursos.svg",
    "/img/foto-depoimento.png",
    "/img/assinatura-mauricio-01.svg",
    "/img/detalhe-onda.svg",
    "/img/icones-sup.svg",
    "/img/ensina-mais.svg",
    "/img/logo-moveedu.svg",
    "/img/img-trans.svg",
    "/js/aos.js",
    "/js/bootstrap.min.js",
	"/js/jquery.min.js",
	"/js/popper.min.js"
];

// Cache on install
this.addEventListener("install", event => {
	this.skipWaiting();

	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			return cache.addAll(filesToCache);
		})
	);
});

// Clear cache on activate
this.addEventListener("activate", event => {
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return Promise.all(
				cacheNames
					.filter(cacheName =>
						cacheName.startsWith("ensina-")
					)
					.filter(cacheName => cacheName !== staticCacheName)
					.map(cacheName => caches.delete(cacheName))
			);
		})
	);
});

// Serve from Cache
this.addEventListener("fetch", event => {
	event.respondWith(
		caches
			.match(event.request)
			.then(response => {
				return response || fetch(event.request);
			})
			.catch(() => {
				return caches.match("index.html");
			})
	);
});
