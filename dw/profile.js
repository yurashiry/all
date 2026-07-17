/*
=====================================
 WR ID+
 profile.js

 Профиль пользователя
=====================================
*/


/*
 Загрузка профиля на главный экран
*/


function loadProfile(){


    const user =
    getCurrentProfile();



    if(!user){

        return;

    }
    generateUserQR(user);


    const profile =
    user.profile;



    const name =
    document.getElementById(
        "profileName"
    );


    const username =
    document.getElementById(
        "profileUsername"
    );


    const avatar =
    document.getElementById(
        "avatar"
    );


    const badges =
    document.getElementById(
        "badgeContainer"
    );



    if(name){


        name.innerText =

        profile.firstName
        +
        " "
        +
        profile.lastName;


    }



    if(username){


        username.innerText =

        "@"
        +
        user.username;


    }



    if(avatar){


        if(profile.avatar){


            avatar.innerHTML =
            
            `

            <img src="${profile.avatar}">

            `;


        }
        else{


            avatar.innerText =

            getAvatarLetter(
                profile.firstName
            );


        }


    }



    if(badges){


        badges.innerHTML =

        renderBadges(user);


    }



    renderPassport(user);

    generateUserQR(user);

    updateCardButton();


}



/*
 Открытие настроек
*/


function openSettings(){


    const user =
    getCurrentProfile();



    if(!user){

        return;

    }



    document.getElementById(
        "editFirstName"
    ).value =
    user.profile.firstName;



    document.getElementById(
        "editLastName"
    ).value =
    user.profile.lastName;



    document
    .getElementById(
        "settingsModal"
    )
    .classList
    .remove(
        "hidden"
    );



}



/*
 Закрыть настройки
*/


function closeSettings(){


    document
    .getElementById(
        "settingsModal"
    )
    .classList
    .add(
        "hidden"
    );


}



/*
 Сохранение настроек
*/


function saveSettings(){


    const username =
    getCurrentUser();



    const user =
    getUser(username);



    if(!user){

        return;

    }



    user.profile.firstName =

    document.getElementById(
        "editFirstName"
    ).value;



    user.profile.lastName =

    document.getElementById(
        "editLastName"
    ).value;



    updateUser(

        username,

        {

            profile:user.profile

        }

    );



    loadProfile();



    closeSettings();



    toast(
        "Профиль обновлён"
    );


}



/*
 Загрузка аватара
*/


function initAvatarUpload(){


    const input =

    document.getElementById(
        "avatarInput"
    );



    if(!input){

        return;

    }



    input.onchange = ()=>{


        const file =
        input.files[0];



        if(!file){

            return;

        }



        const reader =
        new FileReader();



        reader.onload = ()=>{


            const username =
            getCurrentUser();



            const user =
            getUser(username);



            user.profile.avatar =

            reader.result;



            updateUser(

                username,

                {

                    profile:user.profile

                }

            );



            loadProfile();



        };



        reader.readAsDataURL(
            file
        );


    };


}



/*
 Запуск событий профиля
*/


function initProfileEvents(){


    const profileButton =

    document.getElementById(
        "profileButton"
    );



    if(profileButton){


        profileButton.onclick =
        openSettings;


    }



    const close =

    document.getElementById(
        "closeSettings"
    );



    if(close){


        close.onclick =
        closeSettings;


    }



    const save =

    document.getElementById(
        "saveSettings"
    );



    if(save){


        save.onclick =
        saveSettings;


    }



    initAvatarUpload();


}
