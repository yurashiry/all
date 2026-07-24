/*
=====================================
 WR ID+
 auth.js
=====================================
*/

const RESERVED_USERS = {

    yurskk:{

        password:"Yura29102011",

        badge:"owner",

        passportType:"ru",

        passportNumber:"4525 702109"

    },

    mikke:{

        password:"Asap1131/",

        badge:"verified",
     
        passportType:"ru",

        passportNumber:"4525 712047"

    }

};

/*
=====================================
Регистрация
=====================================
*/

function register(){

    const username =
    document
    .getElementById("username")
    .value
    .trim()
    .toLowerCase();

    const password =
    document
    .getElementById("password")
    .value;

    const password2 =
    document
    .getElementById("password2")
    .value;

    if(username.length < 3){

        alert("Минимум 3 символа.");

        return;

    }

    if(password.length < 6){

        alert("Минимум 6 символов.");

        return;

    }

    if(password !== password2){

        alert("Пароли не совпадают.");

        return;

    }

    if(username === "yurskk"){

        alert("Этот юзернейм занят.");

        return;

    }

    if(username === "mikke"){

        alert("Этот юзернейм занят.");

        return;

    }

    if(findUser(username)){

        alert("Юзернейм уже существует.");

        return;

    }

    createUser(username,password);

    login(username,password);

    showSetup();

}

/*
=====================================
Вход
=====================================
*/

function loginAccount(){

    const username =
    document
    .getElementById("loginUsername")
    .value
    .trim()
    .toLowerCase();

    const password =
    document
    .getElementById("loginPassword")
    .value;

    if(RESERVED_USERS[username]){

        if(
            RESERVED_USERS[username]
            .password !== password
        ){

            alert("Неверный пароль.");

            return;

        }

        if(!findUser(username)){

            createUser(
                username,
                password
            );

        }

        login(
            username,
            password
        );

        const user =
        getCurrentProfile();
             if(username === "yurskk"){

            user.profile.passportType =
            RESERVED_USERS[username].passportType;

            user.profile.passportNumber =
            RESERVED_USERS[username].passportNumber;

            updateUser(user);

        }

        if(
            user.profile.firstName &&
            user.profile.lastName
        ){

            showHome();

        }else{

            showSetup();

        }

        return;

    }

    if(!login(username,password)){

        alert("Неверный логин или пароль.");

        return;

    }

    const current =
    getCurrentProfile();

    if(
        current.profile.firstName &&
        current.profile.lastName
    ){

        showHome();

    }else{

        showSetup();

    }

}

/*
=====================================
Инициализация кнопок
=====================================
*/

window.addEventListener(
    "DOMContentLoaded",
    function(){

        document
        .getElementById("registerButton")
        .onclick = register;

        document
        .getElementById("loginButton")
        .onclick = loginAccount;

        document
        .getElementById("loginOpenButton")
        .onclick = function(){

            showLogin();

        };

        document
        .getElementById("backRegister")
        .onclick = function(){

            showRegister();

        };

    }
);
