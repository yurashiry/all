const username = localStorage.getItem("wr_username");
const name = localStorage.getItem("wr_name");

document.getElementById("profileUsername").innerText =
"@" + (username || "username");

document.getElementById("profileName").innerText =
name || "Пользователь";

/*
Потом сервер будет отдавать:

verified:true
plus:true

и галочки появятся автоматически.
*/

// Демонстрация

const verified = false;
const plus = false;

if(verified){

    document.getElementById("blueBadge").style.display="inline-flex";

}

if(plus){

    document.getElementById("plusBadge").style.display="inline-flex";

}

document.getElementById("qrButton").onclick=function(){

    alert("Здесь откроется QR-код пользователя.");

}

document.getElementById("addCard").onclick=function(){

    alert("Добавление карты появится после подключения backend.");

}
