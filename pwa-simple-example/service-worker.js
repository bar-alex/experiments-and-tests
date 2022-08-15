// Imports Workbox from the CDN. Note that "6.2.0" of the URL
// is the version of the Workbox runtime.
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js');

workbox.routing.registerRoute(
    ({request}) => request.destination === 'image',
    // new workbox.strategies.CacheFirst()
    new workbox.strategies.NetworkFirst()
)
