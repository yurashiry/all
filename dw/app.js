/*
=====================================
 WR ID+
 app.js

 Запуск приложения
=====================================
*/


document.addEventListener(
    "DOMContentLoaded",
    ()=>{


    /*
    Инициализация
    */

    initAuth();

    initProfileEvents();

    initCardButton();



    /*
    Проверка устройства
    */


    if(!isMobileDevice()){


        hideLoading();


        document
        .getElementById(
            "desktopScreen"
        )
        .classList
        .remove(
            "hidden"
        );


        return;


    }



    /*
    Мобильное устройство
    */


    setTimeout(()=>{


        hideLoading();



        const current =
        getCurrentUser();



        if(current){


            const user =
            getUser(current);



            if(
                profileCompleted(user)
            ){


                showScreen(
                    "homeScreen"
                );


                loadProfile();


            }
            else{


                showScreen(
                    "setupScreen"
                );


            }



        }
        else{


            showScreen(
                "authScreen"
            );


        }



    },800);


if(
    "serviceWorker" in navigator
){

    navigator.serviceWorker.register(
        "sw.js"
    );

}
});
