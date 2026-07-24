/*
=====================================
 WR ID+
 app.js
=====================================
*/

window.addEventListener("load",startApp);

/*
==========================
Запуск приложения
==========================
*/

function startApp(){

    setTimeout(function(){

        document
        .getElementById("loadingScreen")
        .classList.add("hidden");

        if(isDesktop()){

            document
            .getElementById("desktopScreen")
            .classList.remove("hidden");

            return;

        }

        const user =
        getCurrentProfile();

        if(!user){

            showRegister();

            return;

        }

        if(
            !user.profile.firstName ||
            !user.profile.lastName
        ){

            showSetup();

            return;

        }

        showHome();

    },1200);

}

/*
==========================
ПК или телефон
==========================
*/

function isDesktop(){

    return !/Android|iPhone|iPad|iPod|Mobile/i
    .test(
        navigator.userAgent
    );

}

/*
==========================
Скрыть все экраны
==========================
*/

function hideAllScreens(){

    const screens=[

        "authScreen",

        "loginScreen",

        "setupScreen",

        "homeScreen",

        "desktopScreen"

    ];

    screens.forEach(function(id){

        document
        .getElementById(id)
        .classList.add("hidden");

    });

}

/*
==========================
Экран регистрации
==========================
*/

function showRegister(){

    hideAllScreens();

    document
    .getElementById("authScreen")
    .classList.remove("hidden");

}

/*
==========================
Экран входа
==========================
*/

function showLogin(){

    hideAllScreens();

    document
    .getElementById("loginScreen")
    .classList.remove("hidden");

}

/*
==========================
Перезапуск интерфейса
==========================
*/

function reloadInterface(){

    const user =
    getCurrentProfile();

    if(!user){

        showRegister();

        return;

    }

    if(
        !user.profile.firstName ||
        !user.profile.lastName
    ){

        showSetup();

        return;

    }

    showHome();

}
