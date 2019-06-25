module.exports = {
  "globDirectory": "dist/public/",
  "globPatterns": [
    "index.html",
    "assets/favicon.ico",
    "*.js",
    "*.css",
    "assets/**/*.png",
    "manifest.json"
  ],
  "dontCacheBustURLsMatching": new RegExp('.+\.[a-f0-9]{20}\..+'),
  "maximumFileSizeToCacheInBytes": 5000000,
  "swSrc": "client/service-worker.js",
  "swDest": "dist/public/service-worker.js"
};
