/*
=====================================
 WR ID+
 qr.js

 Генерация QR-кода профиля
=====================================
*/


/*
 Создать данные для QR
*/


function getQRData(user){


    if(!user){

        return "";

    }



    return JSON.stringify({

        app:"WR ID+",

        username:user.username,

        name:
        user.profile.firstName
        + " "
        +
        user.profile.lastName,

        passport:
        getPassportName(
            user.profile.passportType
        ),

        created:user.created


    });



}



/*
 Создание QR
*/


function generateUserQR(user){


    const canvas =
    document.getElementById(
        "qrCanvas"
    );



    if(!canvas || !user){

        return;

    }



    if(typeof QRCode === "undefined"){

        console.error(
            "QR библиотека не найдена"
        );

        return;

    }



    const data =
    getQRData(user);



    QRCode.toCanvas(

        canvas,

        data,

        {

            width:190,

            margin:2,

            color:{

                dark:"#000000",

                light:"#ffffff"

            }

        },

        function(error){

            if(error){

                console.error(error);

            }

        }

    );


}



/*
 Обновление QR
*/


function refreshQR(){


    const user =
    getCurrentProfile();



    if(user){

        generateUserQR(user);

    }


}



/*
 Данные после сканирования
*/


function decodeQRDemo(data){


    try{


        return JSON.parse(data);


    }
    catch{


        return null;


    }


}
