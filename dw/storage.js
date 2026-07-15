/*
=====================================
 WR ID+
 storage.js

 Работа с localStorage
=====================================
*/


const WR_STORAGE_KEY = "wrid_users";
const WR_CURRENT_USER = "wrid_current";



/*
 Получить всех пользователей
*/

function getUsers() {

    const data = localStorage.getItem(WR_STORAGE_KEY);

    if (!data) {

        return {};

    }


    try {

        return JSON.parse(data);

    } catch {

        return {};

    }

}



/*
 Сохранить пользователей
*/

function saveUsers(users) {

    localStorage.setItem(
        WR_STORAGE_KEY,
        JSON.stringify(users)
    );

}



/*
 Создать пользователя
*/

function createUser(username, password) {


    const users = getUsers();


    users[username] = {

        username: username,

        password: password,


        profile: {

            completed: false,

            firstName: "",

            lastName: "",

            passportType: "",

            passportNumber: "",

            avatar: ""

        },


        badges: {

            owner: false,

            verified: false,

            wrplus: false

        },


        cardOpened: false,


        created:

        new Date().toISOString()

    };



    saveUsers(users);


    return users[username];

}



/*
 Найти пользователя
*/

function getUser(username) {


    const users = getUsers();


    return users[username] || null;


}



/*
 Обновить пользователя
*/

function updateUser(username, data) {


    const users = getUsers();


    if (!users[username]) {

        return false;

    }


    users[username] = {

        ...users[username],

        ...data

    };


    saveUsers(users);


    return true;

}



/*
 Удалить пользователя
*/

function deleteUser(username) {


    const users = getUsers();


    delete users[username];


    saveUsers(users);


}



/*
 Текущий пользователь
*/


function setCurrentUser(username) {


    localStorage.setItem(

        WR_CURRENT_USER,

        username

    );


}



function getCurrentUser() {


    return localStorage.getItem(

        WR_CURRENT_USER

    );


}



function logoutUser() {


    localStorage.removeItem(

        WR_CURRENT_USER

    );


}



/*
 Получить полный профиль
*/


function getCurrentProfile() {


    const username = getCurrentUser();


    if (!username) {

        return null;

    }


    return getUser(username);


}



/*
 Зарезервированные аккаунты
*/


function initReservedUsers() {


    const users = getUsers();



    if (!users["yurskk"]) {


        users["yurskk"] = {


            username:"yurskk",

            password:"Yura29102011",


            profile:{


                completed:true,


                firstName:"Yura",

                lastName:"Shiry",


                passportType:"ru",


                passportNumber:"0000 000000",


                avatar:""


            },


            badges:{


                owner:true,

                verified:false,

                wrplus:false


            },


            cardOpened:false,


            created:

            new Date().toISOString()


        };


    }



    if (!users["mikke"]) {


        users["mikke"] = {


            username:"mikke",

            password:"Asap1131/",


            profile:{


                completed:true,


                firstName:"Mikke",

                lastName:"",


                passportType:"alt",


                passportNumber:"0000 00000",


                avatar:""


            },


            badges:{


                owner:false,

                verified:true,

                wrplus:false


            },


            cardOpened:false,


            created:

            new Date().toISOString()


        };


    }



    saveUsers(users);


}



initReservedUsers();
