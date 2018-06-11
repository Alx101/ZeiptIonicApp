var filesToCache = [
  './build/0.js',
  './build/1.js',
  './build/2.js',
  './build/3.js',
  './build/4.js',

  './build/main.js',
  './build/main.css',
  './build/polyfills.js',
  './build/vendor.js',
  'index.html',
  'manifest.json',

  'assets/fonts/ionicons 2.eot',
  'assets/fonts/ionicons 2.svg',
  'assets/fonts/ionicons 2.ttf',
  'assets/fonts/ionicons 2.woff',

  'assets/fonts/ionicons.eot',
  'assets/fonts/ionicons.scss',
  'assets/fonts/ionicons.svg',
  'assets/fonts/ionicons.ttf',
  'assets/fonts/ionicons.woff',
  'assets/fonts/ionicons.woff2',

  'assets/img/qr-icon.svg',
  'assets/img/receipt-icon.svg',
  'assets/img/mastercard.jpg',
  'assets/img/receipt-bottom.png',
  'assets/img/receiptguy.svg',
  'assets/img/visa.jpg',
  'assets/img/zeipt.png',
  'assets/img/zeiptreceipt.svg'
]

var staticCacheName = 'zeipt-static-v2';

self.addEventListener('install', function (event) {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(caches.open(staticCacheName).then(function (cache) {
    return cache.addAll(filesToCache);
  }).then(() => {
    console.log("Static content is available offline! ");
  }).catch(() => {
    console.log("Something went wrong..");
  }));
});

self.addEventListener('fetch', function (event) {
  var requestURL = new URL(event.request.url);
  if (requestURL.hostname == 'jsonblob.com') {
    event.respondWith(caches.open('receipts').then(function (cache) {
      return fetch(event.request).then(function (response) {
        cache.put(event.request, response.clone());
        return response;
      });
    }))
  } 
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
})

self.addEventListener('activate', function (event) {
  var cacheWhitelist = ['zeipt-dynamic', 'receipts', 'zeipt-static-v2'];

  event.waitUntil(caches.keys().then(function (keyList) {
    return Promise.all(keyList.map(function (key) {
      if (cacheWhitelist.indexOf(key) === -1) {
        console.log("Cache delete: ", key);
        return caches.delete(key);
      }
    }));
  }));
});