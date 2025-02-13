importScripts('https://cdnjs.cloudflare.com/ajax/libs/workbox-sw/7.0.0/workbox-sw.min.js');

workbox.core.clientsClaim();

self.addEventListener('install', (event) => {
  self.skipWaiting();
  // Additional custom logic if required
});

workbox.routing.registerRoute(
  ({ url }) => {
    return url.pathname.startsWith('/my-academic-timetable/')
      || url.host === 'cdn.jsdelivr.net'
      || url.href.endsWith("better-cue-parser.0.3.1.min.js")
  },
  new workbox.strategies.NetworkFirst({
    cacheName: 'my-cache',
    plugins: [
      // 0 is for opaque response
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);