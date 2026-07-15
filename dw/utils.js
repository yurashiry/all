/*
=====================================
 WR ID+
 utils.js

 Вспомогательные функции
=====================================
*/


/*
 Проверка устройства
*/


function isMobileDevice() {


    return /Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
    );


}



/*
 Показать экран
*/


function showScreen(id) {


    document
    .querySelectorAll(".screen")
    .forEach(screen => {

        screen.classList.add("hidden");

    });


    const element = document.getElementById(id);


    if (element) {

        element.classList.remove("hidden");

    }


}



/*
 Скрыть загрузку
*/


function hideLoading() {


    const loader = document.getElementById(
        "loadingScreen"
    );


    if(loader){

        loader.classList.add("hide");


        setTimeout(()=>{

            loader.style.display="none";

        },500);

    }


}



/*
 Безопасный текст
*/


function escapeHTML(text){


    return String(text)

    .replace(/&/g,"&amp;")

    .replace(/</g,"&lt;")

    .replace(/>/g,"&gt;")

    .replace(/"/g,"&quot;")

    .replace(/'/g,"&#039;");


}



/*
 Проверка юзернейма
*/


function validateUsername(username){


    return /^[a-zA-Z0-9_]{3,20}$/.test(
        username
    );


}



/*
 Проверка пароля
*/


function validatePassword(password){


    return password.length >= 6;


}



/*
 Проверка паспорта
*/


function validatePassport(type, number){


    if(type==="ru"){


        return /^\d{4}\s\d{6}$/.test(
            number
        );


    }


    if(type==="alt"){


        return /^\d{4}\s\d{5}$/.test(
            number
        );


    }


    return false;


}



/*
 Уведомление
*/


function toast(message){


    let old =
    document.querySelector(".toast");


    if(old){

        old.remove();

    }



    const div =
    document.createElement("div");


    div.className="toast";


    div.innerText=message;


    document.body.appendChild(div);



    setTimeout(()=>{


        div.classList.add("show");


    },10);



    setTimeout(()=>{


        div.classList.remove("show");


        setTimeout(()=>{

            div.remove();

        },300);


    },2500);



}



/*
 Получение букв аватара
*/


function getAvatarLetter(name){


    if(!name) return "W";


    return name
    .charAt(0)
    .toUpperCase();


}



/*
 Форматирование паспорта
*/


function formatPassport(type,value){


    value=value.replace(/\D/g,"");


    if(type==="ru"){


        return value
        .slice(0,10)
        .replace(
            /(\d{4})(\d+)/,
            "$1 $2"
        );


    }



    return value
    .slice(0,9)
    .replace(
        /(\d{4})(\d+)/,
        "$1 $2"
    );


}



/*
 Переход наружу
*/


function openExternal(url){


    window.location.href=url;


}



/*
 Вибрация телефона
*/


function vibrate(ms=30){


    if(
        navigator.vibrate
    ){

        navigator.vibrate(ms);

    }


}
