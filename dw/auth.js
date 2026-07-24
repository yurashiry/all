/*
=====================================
 WR ID+
 auth.js
=====================================
*/

const RESERVED = {

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
        passportNumber:"4525 723197"
    }

};

/*
==========================
Запуск
==========================
*/

window.addEventListener("load",initAuth);

function initAuth(){

    const current = getCurrentProfile();

    if(current){

        if(
            current.profile.firstName &&
            current.profile.lastName
        ){

            showHome();

        }else{

            showSetup();

        }

        return;

    }

    showRegister();

}

/*
==========================
Регистрация
==========================
*/

document
.getElementById("registerButton")
.onclick = register;

function register(){

    const username =
    document.getElementById("username")
    .value
    .trim()
    .toLowerCase();

    const password =
    document.getElementById("password")
    .value;

    const password2 =
    document.getElementById("password2")
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

        alert("Этот аккаунт уже существует.");

        return;

    }

    if(username === "mikke"){

        alert("Этот аккаунт уже существует.");

        return;

    }

    if(!createUser(username,password)){

        alert("Юзернейм уже занят.");

        return;

    }

    login(username,password);

    showSetup();

}

/*
==========================
Вход
==========================
*/

document
.getElementById("loginButton")
.onclick = loginAccount;

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

    if(RESERVED[username]){

        if(
            RESERVED[username].password === password
        ){

            if(!findUser(username)){

                createUser(username,password);

            }

            login(username,password);

            const user =
            getCurrentProfile();

            if(username==="yurskk"){

                user.profile.passportType="ru";

                user.profile.passportNumber="4525 702109";

            }

            updateUser(user);

            showHome();

            return;

        }

    }

    if(!login(username,password)){

        alert("Неверный логин или пароль.");

        return;

    }

    const user =
    getCurrentProfile();

    if(
        user.profile.firstName &&
        user.profile.lastName
    ){

        showHome();

    }else{

        showSetup();

    }

}

/*
==========================
Кнопки
==========================
*/

document
.getElementById("loginOpenButton")
.onclick = showLogin;

document
.getElementById("backRegister")
.onclick = showRegister;
