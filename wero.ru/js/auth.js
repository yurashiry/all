// Wero Ru™ Auth
// sonne™

const Auth = {


    generateID() {

        return Math.floor(
            10000000 +
            Math.random() * 90000000
        ).toString();

    },



    createAccount() {


        const firstName =
        document.getElementById("firstName").value.trim();


        const lastName =
        document.getElementById("lastName").value.trim();


        const username =
        document.getElementById("username").value.trim();


        const phone =
        document.getElementById("phone").value.trim();



        if(
            !firstName ||
            !username
        ){

            this.error(
            "Введите имя и username"
            );

            return;

        }



        const oldUser =
        Storage.getUser();



        if(oldUser){

            this.error(
            "Аккаунт уже существует"
            );

            return;

        }



        const user = {


            id:
            this.generateID(),


            firstName,


            lastName,


            username,


            phone,


            avatar:
            "icons/default-avatar.png",


            balance:
            1000000,


            currency:
            "W",


            cards:[],


            operations:[],


            created:
            Date.now()


        };



        Storage.saveUser(user);



        location.href =
        "index.html";


    },



    openWallet(){


        const user =
        Storage.getUser();


        if(user){

            location.href =
            "index.html";

        }

        else{

            this.error(
            "Аккаунт не найден"
            );

        }


    },



    error(text){


        const box =
        document.getElementById(
        "loginError"
        );


        if(box){

            box.innerText=text;

        }


    }



};





document.addEventListener(
"DOMContentLoaded",
()=>{


const create =
document.getElementById(
"createAccount"
);



if(create){

create.onclick=()=>{

Auth.createAccount();

};

}




const open =
document.getElementById(
"openWallet"
);



if(open){

open.onclick=()=>{

Auth.openWallet();

};

}



});
// ===================================
// Wero Ru™ Authentication
// sonne™
// ===================================


Auth.googleClientID = "";



Auth.googleLogin = function(){


    if(!this.googleClientID){


        this.error(
        "Google Login ещё не настроен"
        );


        return;


    }



    /*
    
    Здесь будет Google Identity Services

    После получения данных:

    {
        name:"",
        surname:"",
        username:"",
        avatar:""
    }

    они сохраняются через Storage.saveUser()

    */



};





Auth.restore = function(){



    const user =
    Storage.getUser();



    if(!user){

        return false;

    }



    return user;



};







Auth.logout = function(){



    localStorage.removeItem(
    "wero_session"
    );



    location.href =
    "login.html";



};







Auth.deleteAccount = function(){



    const confirmDelete =
    confirm(
    "Удалить кошелёк Wero Ru?"
    );



    if(!confirmDelete){

        return;

    }



    Storage.deleteUser();



    localStorage.clear();



    location.href =
    "login.html";



};







Auth.updateProfile = function(data){



    const user =
    Storage.getUser();



    if(!user){

        return;

    }



    Object.assign(
        user,
        data
    );



    Storage.saveUser(user);



};







Auth.getProfile = function(){



    return Storage.getUser();



};







// Проверка при открытии login.html

document.addEventListener(
"DOMContentLoaded",
()=>{


const user =
Auth.restore();



if(user){


    const existing =
    document.querySelector(
    ".login-existing"
    );


    if(existing){

        existing.style.display =
        "block";

    }


}





const google =
document.getElementById(
"googleLogin"
);



if(google){


google.onclick=()=>{


    Auth.googleLogin();


};



}



});
