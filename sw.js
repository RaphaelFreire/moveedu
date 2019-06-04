// sw.js
const staticCacheName = "raphael-freire-30/05/2019";

let filesToCache = [
	"index.html",
	"css/moveedu.min.css",
	"css/bootstrap.min.css",
	"img/logos/logo-facebook.svg",
	"img/logos/logo-insta.svg",
	"img/logos/logo-marcas.svg",
	"img/logos/logo-moveedu.svg",
	"img/logos/logo-selo-dados.svg",
	"img/logos/img-trans.svg",
	"img/move-edu/banner.jpg",
	"img/move-edu/bg-pattern-moveedu.svg",
	"js/bootstrap.min.js",
	"js/jquery.min.js",
	"js/popper.min.js"
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
						cacheName.startsWith("raphael-freire-")
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

this.addEventListener('push', function(event) {
	console.log('Received a push message', event);
  
	var title = 'Yay a message.';
	var body = 'We have received a push message.';
	var icon = '/img/icone-moveedu-192.png';
	var tag = 'simple-push-demo-notification-tag';
	var data = {
	  doge: {
		  wow: 'such amaze notification data'
	  }
	};
  
	event.waitUntil(
	  self.registration.showNotification(title, {
		body: body,
		icon: icon,
		tag: tag,
		data: data
	  })
	);
  });

  