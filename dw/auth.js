/*
=====================================
 WR ID+
 auth.js

 Регистрация и вход
=====================================
*/


/*
 Проверка занятых юзернеймов
*/


function isUsernameTaken(username){


    const user =
    getUser(username);



    return user !== null;


}



/*
 Регистрация
*/


function register(){


    const username =

    document
    .getElementById(
        "username"
    )
    .value
    .trim();



    const password =

    document
    .getElementById(
        "password"
    )
    .value;



    const password2 =

    document
    .getElementById(
        "password2"
    )
    .value;



    if(!validateUsername(username)){


        toast(
            "Некорректный юзернейм"
        );

        return;


    }



    if(!validatePassword(password)){


        toast(
            "Пароль минимум 6 символов"
        );

        return;


    }



    if(password !== password2){


        toast(
            "Пароли не совпадают"
        );

        return;


    }



    if(isUsernameTaken(username)){


        toast(
            "Этот юзернейм уже занят"
        );

        return;


    }



    createUser(
        username,
        password
    );



    setCurrentUser(
        username
    );



    toast(
        "Аккаунт создан"
    );



    setTimeout(()=>{


        showScreen(
            "setupScreen"
        );


    },500);


}



/*
 Вход
*/


function login(){


    const username =

    document
    .getElementById(
        "loginUsername"
    )
    .value
    .trim();



    const password =

    document
    .getElementById(
        "loginPassword"
    )
    .value;



    const user =

    getUser(
        username
    );



    if(!user){


        toast(
            "Пользователь не найден"
        );


        return;


    }



    if(user.password !== password){


        toast(
            "Неверный пароль"
        );


        return;


    }



    setCurrentUser(
        username
    );



    toast(
        "Добро пожаловать"
    );



    setTimeout(()=>{


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



    },500);



}



/*
 Сохранение первого профиля
*/


function completeProfile(){



    const firstName =

    document
    .getElementById(
        "firstName"
    )
    .value
    .trim();



    const lastName =

    document
    .getElementById(
        "lastName"
    )
    .value
    .trim();



    const passportType =

    document
    .getElementById(
        "passportType"
    )
    .value;



    const passportNumber =

    document
    .getElementById(
        "passportNumber"
    )
    .value
    .trim();



    if(!firstName || !lastName){


        toast(
            "Введите имя и фамилию"
        );

        return;


    }



    if(
        !validatePassport(
            passportType,
            passportNumber
        )
    ){


        toast(
            "Неверный номер паспорта"
        );


        return;


    }



    saveProfileData({

        firstName,

        lastName,

        passportType,

        passportNumber

    });



    showScreen(
        "homeScreen"
    );



    loadProfile();



}



/*
 Инициализация кнопок
*/


function initAuth(){


    const registerButton =

    document.getElementById(
        "registerButton"
    );



    if(registerButton){


        registerButton.onclick =
        register;


    }



    const loginButton =

    document.getElementById(
        "loginButton"
    );



    if(loginButton){


        loginButton.onclick =
        login;


    }



    const loginOpen =

    document.getElementById(
        "loginOpenButton"
    );



    if(loginOpen){


        loginOpen.onclick = ()=>{


            showScreen(
                "loginScreen"
            );


        };


    }



    const back =

    document.getElementById(
        "backRegister"
    );



    if(back){


        back.onclick = ()=>{


            showScreen(
                "authScreen"
            );


        };


    }



    const saveProfile =

    document.getElementById(
        "saveProfile"
    );



    if(saveProfile){


        saveProfile.onclick =
        completeProfile;


    }


}
