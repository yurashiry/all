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
        badge = "👑 Владелец";
    }else if(user.username === "mikke"){
        badge = "✔ Подтвержден";
    }else if(user.wrPlus){
        badge = "💚 WR+";
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

    try{

        const qrText = getQRData(user);

        console.log(qrText);
        console.log("Длина QR:", qrText.length);

        new QRCode(container,{
            text: qrText,
            width:220,
            height:220,
            correctLevel:QRCode.CorrectLevel.L
        });

    }catch(e){

        console.error("Ошибка QR:", e);

        container.innerHTML =
        "<div style='padding:20px;color:red;text-align:center'>Ошибка создания QR</div>";

    }

}
