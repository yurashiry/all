/*
=====================================
 WR ID+
 storage.js
=====================================
*/

const USERS_KEY = "wrid_users";
const SESSION_KEY = "wrid_current_user";

/*
==========================
Получить всех пользователей
==========================
*/

function getUsers(){

    const data = localStorage.getItem(USERS_KEY);

    if(!data){
        return [];
    }

    try{
        return JSON.parse(data);
    }catch{
        return [];
    }

}

/*
==========================
Сохранить пользователей
==========================
*/

function saveUsers(users){

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(users)
    );

}

/*
==========================
Поиск пользователя
==========================
*/

function findUser(username){

    return getUsers().find(
        u => u.username.toLowerCase() === username.toLowerCase()
    );

}

/*
==========================
Создание пользователя
==========================
*/

function createUser(username,password){

    const users = getUsers();

    if(findUser(username)){
        return false;
    }

    const user = {

        username: username,

        password: password,

        created: Date.now(),

        wrPlus: false,

        profile:{

            firstName:"",
            lastName:"",
            passportType:"",
            passportNumber:"",
            avatar:""

        }

    };

    users.push(user);

    saveUsers(users);

    return true;

}

/*
==========================
Обновить пользователя
==========================
*/

function updateUser(user){

    const users = getUsers();

    const index = users.findIndex(
        u => u.username === user.username
    );

    if(index === -1){
        return;
    }

    users[index] = user;

    saveUsers(users);

}

/*
==========================
Войти
==========================
*/

function login(username,password){

    const user = findUser(username);

    if(!user){
        return false;
    }

    if(user.password !== password){
        return false;
    }

    localStorage.setItem(
        SESSION_KEY,
        user.username
    );

    return true;

}

/*
==========================
Выход
==========================
*/

function logout(){

    localStorage.removeItem(
        SESSION_KEY
    );

}

/*
==========================
Текущий пользователь
==========================
*/

function getCurrentProfile(){

    const username =
    localStorage.getItem(
        SESSION_KEY
    );

    if(!username){
        return null;
    }

    return findUser(username);

}
