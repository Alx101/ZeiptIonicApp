var CACHE_VERSION = 4;
var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-v' + CACHE_VERSION
};

self.addEventListener('install', function (event) {
  var urlsToPrefetch = [
    './build/0.js',
    './build/1.js',
    './build/2.js',
    './build/3.js',
    './build/4.js',
    './build/5.js',

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
    'assets/img/barcode-icon.svg',
    'assets/img/receipt-icon.svg',
    'assets/img/master-card.jpg',
    'assets/img/receipt-bottom.png',
    'assets/img/receiptguy.svg',
    'assets/img/visa.jpg',
    'assets/img/zeipt.png',
    'assets/img/zeiptreceipt.svg',
    'assets/img/fikenlogo.png',
    'assets/img/vismalogo.png',
    'assets/img/tryglogo.png',
    'assets/img/iflogo.png',

    'assets/video/addtohome.mp4',
    'assets/video/addtohome.webm',
    'assets/video/addtohome.gif'
  ];

  console.log('Handling install event. Resources to prefetch:', urlsToPrefetch);

  event.waitUntil(caches.open(CURRENT_CACHES.prefatch).then(function (cache) {
    return cache.addAll(urlsToPrefetch);
  }));
});

self.addEventListener('activate', function (event) {
  var expectedCacheNames = Object
    .keys(CURRENT_CACHES)
    .map(function (key) {
      return CURRENT_CACHES[key];
    });

  event.waitUntil(caches.keys().then(function (cacheNames) {
    return Promise.all(cacheNames.map(function (cacheName) {
      if (expectedCacheNames.indexOf(cacheName) === -1) {
        // If this cache name isn't present in the array of "expected" cache names, then
        // delete it.
        console.log('Deleting out of date cache:', cacheName);
        return caches.delete(cacheName);
      }
    }));
  }));
});

self.addEventListener('fetch', function (event) {
  var requestURL = new URL(event.request.url);
  if (event.request.headers.get('range')) {
    var pos = Number(/^bytes\=(\d+)\-$/g.exec(event.request.headers.get('range'))[1]);
    console.log('Range request for', event.request.url, ', starting position:', pos);
    event.respondWith(caches.open(CURRENT_CACHES.prefetch).then(function (cache) {
      return cache.match(event.request.url);
    }).then(function (res) {
      if (!res) {
        return fetch(event.request).then(res => {
          return res.arrayBuffer();
        });
      }
      return res.arrayBuffer();
    }).then(function (ab) {
      return new Response(ab.slice(pos), {
        status: 206,
        statusText: 'Partial Content',
        headers: [
          [
            'Content-Range', 'bytes ' + pos + '-' + (ab.byteLength - 1) + '/' + ab.byteLength
          ]
        ]
      });
    }));
  } else {
    if (requestURL.hostname == 'jsonblob.com') {
      event.respondWith(caches.open('receipts').then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request, response.clone());
          return response;
        });
      }))
    } else {
      event.respondWith(caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      }));
    }
  }
})
