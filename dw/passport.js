/*
=====================================
 WR ID+
 passport.js

 Цифровые паспорта
=====================================
*/


/*
 Создание паспорта
*/


function renderPassport(user){


    const box =
    document.getElementById(
        "passportCard"
    );


    if(!box || !user){

        return;

    }



    const profile=user.profile;



    let passportClass="";
    let country="";



    if(profile.passportType==="ru"){


        passportClass="passport-ru";

        country="РОССИЯ";


    }
    else{


        passportClass="passport-alt";

        country="АЛТАЙСК";


    }




    box.innerHTML = `


    <div class="passport ${passportClass}">


        <div class="passport-title">

            WR ID+ DIGITAL PASSPORT

        </div>


        <div class="passport-user">

            ${escapeHTML(
                profile.firstName
            )}

            ${escapeHTML(
                profile.lastName
            )}

        </div>


        <div class="passport-number">

            ${escapeHTML(
                profile.passportNumber
            )}

        </div>


        <div class="passport-country">

            ${country}

        </div>


    </div>


    `;


}



/*
 Получить тип паспорта
*/


function getPassportName(type){


    if(type==="ru"){

        return "Паспорт РФ";

    }


    return "Паспорт Алтайска";


}



/*
 Клик по паспорту
 3D переворот
*/


function enablePassportAnimation(){


    const passport =
    document.querySelector(
        ".passport"
    );


    if(!passport){

        return;

    }



    passport.addEventListener(
        "click",
        ()=>{


            passport.classList.toggle(
                "rotate"
            );


            vibrate(20);


        }
    );


}



/*
 Сохранение профиля
*/


function saveProfileData(data){


    const username =
    getCurrentUser();



    if(!username){

        return false;

    }



    const user =
    getUser(username);



    user.profile = {

        ...user.profile,

        ...data,

        completed:true

    };



    updateUser(
        username,
        {
            profile:user.profile
        }
    );


    return true;


}



/*
 Проверка заполнения
*/


function profileCompleted(user){


    if(!user){

        return false;

    }



    return user.profile.completed===true;


}
