/*
=====================================
 WR ID+
 card.js

 Виртуальная карта
=====================================
*/


const CARD_URL =
"https://haorik.ru/card/2";



/*
 Проверка состояния карты
*/


function hasOpenedCard(user){


    if(!user){

        return false;

    }


    return user.cardOpened === true;


}



/*
 Обновить кнопку карты
*/


function updateCardButton(){


    const button =
    document.getElementById(
        "cardButton"
    );


    const user =
    getCurrentProfile();



    if(!button || !user){

        return;

    }



    if(
        hasOpenedCard(user)
    ){


        button.innerText =
        "Открыть реквизиты";


    }
    else{


        button.innerText =
        "Открыть виртуальную карту";


    }


}



/*
 Создание окна карты
*/


function showCardPopup(){


    const popup =
    document.createElement(
        "div"
    );


    popup.className =
    "card-popup";



    popup.innerHTML = `


    <div class="glass card-window">


        <h2>

        Ваша виртуальная карта открывается

        </h2>


        <div class="card-timer">

            10

        </div>


        <p>

        Подождите немного...

        </p>


    </div>


    `;



    document.body.appendChild(
        popup
    );



    let seconds=10;



    const timer =
    popup.querySelector(
        ".card-timer"
    );



    const interval =
    setInterval(()=>{


        seconds--;


        timer.innerText =
        seconds;



        vibrate(20);



        if(seconds<=0){


            clearInterval(
                interval
            );



            markCardOpened();



            openExternal(
                CARD_URL
            );


        }



    },1000);



}



/*
 Сохранить открытие карты
*/


function markCardOpened(){


    const username =
    getCurrentUser();



    const user =
    getUser(
        username
    );



    if(!user){

        return;

    }



    user.cardOpened =
    true;



    updateUser(

        username,

        {

            cardOpened:true

        }

    );


}



/*
 Нажатие кнопки
*/


function initCardButton(){


    const button =
    document.getElementById(
        "cardButton"
    );



    if(!button){

        return;

    }



    button.onclick = ()=>{


        const user =
        getCurrentProfile();



        if(
            hasOpenedCard(user)
        ){


            openExternal(
                CARD_URL
            );


        }
        else{


            showCardPopup();


        }


    };


}
