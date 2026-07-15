/*
=====================================
 WR ID+
 Service Worker

 Offline режим
=====================================
*/


const CACHE_NAME = "wr-id-v1";


const FILES = [

    "./",

    "./index.html",

    "./style.css",

    "./app.js",

    "./auth.js",

    "./storage.js",

    "./utils.js",

    "./badges.js",

    "./passport.js",

    "./qr.js",

    "./card.js",

    "./profile.js",

    "./manifest.json"

];



self.addEventListener(
"install",
event=>{


    event.waitUntil(

        caches.open(
            CACHE_NAME
        )
        .then(
            cache=>
            cache.addAll(FILES)
        )

    );


});




self.addEventListener(
"fetch",
event=>{


    event.respondWith(

        caches.match(
            event.request
        )
        .then(

            response=>{

                return response ||

                fetch(
                    event.request
                );

            }

        )

    );


});
