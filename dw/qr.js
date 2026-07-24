/*
=====================================
 WR ID+
 qr.js
=====================================
*/

function getQRData(user){

    if(!user){
        return "";
    }

    let badge = "none";

    if(user.username === "yurskk"){
        badge = "owner";
    }
    else if(user.username === "mikke"){
        badge = "verified";
    }
    else if(user.wrPlus){
        badge = "wrplus";
    }

    return JSON.stringify({

        app: "WR ID+",

        username: user.username,

        firstName: user.profile.firstName,

        lastName: user.profile.lastName,

        passportType: user.profile.passportType,

        passportNumber: user.profile.passportNumber,

        badge: badge

    });

}

function generateUserQR(user){

    const container =
    document.getElementById("qrCanvas");

    if(!container || !user){
        return;
    }

    container.innerHTML = "";

    const text = getQRData(user);

    console.log("QR DATA:", text);
    console.log("Length:", text.length);

    try{

        new QRCode(container,{
            text: text,
            width:180,
            height:180,
            colorDark:"#111111",
            colorLight:"#ffffff",
            correctLevel:QRCode.CorrectLevel.L
        });

    }catch(e){

        console.error(e);

        container.innerHTML =
        "<p style='color:red'>Ошибка QR</p>";

    }

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

        container.innerHTML = "";

    }

}

function decodeQR(text){

    try{

        return JSON.parse(text);

    }catch{

        return null;

    }

}
