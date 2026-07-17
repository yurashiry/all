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

    const container =
    document.getElementById("qrCanvas");

    if(!container || !user){

        return;

    }

    container.innerHTML = "";

    new QRCode(container,{

        text:getQRData(user),

        width:220,

        height:220,

        colorDark:"#111111",

        colorLight:"#ffffff",

        correctLevel:
        QRCode.CorrectLevel.H

    });

}

function refreshQR(){

    const user =
    getCurrentProfile();

    if(user){

        generateUserQR(user);

    }

}

function clearQR(){

    const container =
    document.getElementById("qrCanvas");

    if(container){

        container.innerHTML="";

    }

}

function decodeQRDemo(data){

    try{

        return JSON.parse(data);

    }

    catch{

        return null;

    }

}

/*
=====================================
Автоматическая генерация
=====================================
*/

document.addEventListener("DOMContentLoaded",()=>{

    setTimeout(()=>{

        refreshQR();

    },300);

});

/*
=====================================
Если профиль изменился
=====================================
*/

window.addEventListener("storage",()=>{

    refreshQR();

});
