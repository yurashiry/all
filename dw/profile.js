/*
=====================================
 WR ID+
 profile.js
=====================================
*/

const OWNER = "yurskk";
const VERIFIED = "mikke";

/*
==========================
Открыть главный экран
==========================
*/

function showHome(){

    hideAllScreens();

    document
    .getElementById("homeScreen")
    .classList.remove("hidden");

    loadProfile();

}

/*
==========================
Открыть заполнение профиля
==========================
*/

function showSetup(){

    hideAllScreens();

    document
    .getElementById("setupScreen")
    .classList.remove("hidden");

}

/*
==========================
Загрузка профиля
==========================
*/

function loadProfile(){

    const user =
    getCurrentProfile();

    if(!user){

        logout();

        showRegister();

        return;

    }

    document
    .getElementById("profileName")
    .textContent =
    user.profile.firstName +
    " " +
    user.profile.lastName;

    document
    .getElementById("profileUsername")
    .textContent =
    "@" + user.username;

    renderBadge(user);

    renderPassport(user);

    refreshQR();

    updateCardButton();

}
/*
==========================
Сохранить профиль
==========================
*/

document
.getElementById("saveProfile")
.onclick = function(){

    const user =
    getCurrentProfile();

    if(!user){
        return;
    }

    user.profile.firstName =
    document
    .getElementById("firstName")
    .value
    .trim();

    user.profile.lastName =
    document
    .getElementById("lastName")
    .value
    .trim();

    user.profile.passportType =
    document
    .getElementById("passportType")
    .value;

    user.profile.passportNumber =
    document
    .getElementById("passportNumber")
    .value
    .trim();

    if(
        !user.profile.firstName ||
        !user.profile.lastName ||
        !user.profile.passportNumber
    ){

        alert("Заполните все поля.");

        return;

    }

    updateUser(user);

    showHome();

};

/*
==========================
Галочки
==========================
*/

function renderBadge(user){

    const badge =
    document.getElementById("badgeContainer");

    badge.innerHTML = "";

    if(user.username === "yurskk"){

        badge.innerHTML =
        '<span class="badge owner">👑</span>';

        return;

    }

    if(user.username === "mikke"){

        badge.innerHTML =
        '<span class="badge verified">✔</span>';

        return;

    }

    if(user.wrPlus){

        badge.innerHTML =
        '<span class="badge plus">💚</span>';

    }

}

/*
==========================
Настройки
==========================
*/

document
.getElementById("profileButton")
.onclick = function(){

    const user =
    getCurrentProfile();

    document
    .getElementById("editFirstName")
    .value =
    user.profile.firstName;

    document
    .getElementById("editLastName")
    .value =
    user.profile.lastName;

    document
    .getElementById("settingsModal")
    .classList.remove("hidden");

};

document
.getElementById("closeSettings")
.onclick = function(){

    document
    .getElementById("settingsModal")
    .classList.add("hidden");

};

document
.getElementById("saveSettings")
.onclick = function(){

    const user =
    getCurrentProfile();

    user.profile.firstName =
    document
    .getElementById("editFirstName")
    .value
    .trim();

    user.profile.lastName =
    document
    .getElementById("editLastName")
    .value
    .trim();

    const file =
    document
    .getElementById("avatarInput")
    .files[0];

    if(file){

        const reader =
        new FileReader();

        reader.onload = function(){

            user.profile.avatar =
            reader.result;

            updateUser(user);

            loadProfile();

        };

        reader.readAsDataURL(file);

    }else{

        updateUser(user);

        loadProfile();

    }

    document
    .getElementById("settingsModal")
    .classList.add("hidden");

};
