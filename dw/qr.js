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

    let badge = "Нет";

    if(user.username === "yurskk"){
        badge = "Владелец";
    }else if(user.username === "mikke"){
        badge = "Подтвержден";
    }else if(user.wrPlus){
        badge = "WR+";
    }

    return [
        "WR ID+",
        "Username: " + user.username,
        "Name: " + user.profile.firstName + " " + user.profile.lastName,
        "Passport: " + getPassportName(user.profile.passportType),
        "Number: " + user.profile.passportNumber,
        "Badge: " + badge
    ].join("\n");

}

function generateUserQR(user){

    const container = document.getElementById("qrCanvas");

    if(!container || !user){
        return;
    }

    container.innerHTML = "";

    const qrText = getQRData(user);

    console.log(qrText);
    console.log("QR length:", qrText.length);

    new QRCode(container,{
        text: qrText,
        width:220,
        height:220,
        colorDark:"#111111",
        colorLight:"#ffffff",
        correctLevel:QRCode.CorrectLevel.L
    });

}

function refreshQR(){

    const user = getCurrentProfile();

    if(user){
        generateUserQR(user);
    }

}

function clearQR(){

    const container = document.getElementById("qrCanvas");

    if(container){
        container.innerHTML = "";
    }

}

function decodeQRDemo(text){

    return text;

}
