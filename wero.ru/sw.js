const CACHE_NAME = "weroru-v1";

const FILES = [
    "/",
    "/index.html",

    "/css/style.css",
    "/css/home.css",
    "/css/cards.css",
    "/css/settings.css",
    "/css/components.css",

    "/js/app.js",
    "/js/auth.js",
    "/js/storage.js",
    "/js/navigation.js",
    "/js/cards.js",
    "/js/settings.js",
    "/js/ui.js",

    "/assets/logo.svg",
    "/assets/icon-192.png",
    "/assets/icon-512.png"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => cache.addAll(FILES))

    );

});

self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys()

            .then(keys =>

                Promise.all(

                    keys

                        .filter(key => key !== CACHE_NAME)

                        .map(key => caches.delete(key))

                )

            )

    );

});

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                return response || fetch(event.request);

            })

    );

});
