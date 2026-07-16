/*
=====================================
 WR ID+
 qr.js
=====================================
*/

function getQRData(user){

    if(!user) return "";

    return JSON.stringify({

        app:"WR ID+",

        username:user.username,

        name:
            user.profile.firstName +
            " " +
            user.profile.lastName,

        passport:
            getPassportName(
                user.profile.passportType
            ),

        created:user.created

    });

}

function generateUserQR(user){

    const canvas =
    document.getElementById("qrCanvas");

    if(!canvas || !user) return;

    canvas.innerHTML = "";

    const data =
    getQRData(user);

    new QRCode(canvas,{

        text:data,

        width:220,

        height:220,

        colorDark:"#000000",

        colorLight:"#ffffff",

        correctLevel:
        QRCode.CorrectLevel.H

    });

}
/*
 Обновить QR
*/

function refreshQR(){

    const user =
    getCurrentProfile();

    if(!user){

        return;

    }

    generateUserQR(user);

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

/*
 Очистить старый QR
*/

function clearQR(){

    const qr =
    document.getElementById("qrCanvas");

    if(qr){

        qr.innerHTML = "";

    }

}
