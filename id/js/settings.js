const name = localStorage.getItem("wr_name");
const password = localStorage.getItem("wr_password");

// заполнение (пока демо)
document.getElementById("newName").value = name || "";

// сохранить имя
document.getElementById("saveName").onclick = function(){

    const newName = document.getElementById("newName").value.trim();

    if(!newName) return alert("Введите имя");

    localStorage.setItem("wr_name", newName);

    alert("Имя обновлено");

}

// изменить пароль
document.getElementById("savePassword").onclick = function(){

    const newPass = document.getElementById("newPassword").value.trim();

    if(!newPass) return alert("Введите пароль");

    localStorage.setItem("wr_password", newPass);

    alert("Пароль изменён");

}

// выход
document.getElementById("logoutBtn").onclick = function(){

    localStorage.clear();

    window.location.href = "index.html";

}

// удаление аккаунта
document.getElementById("deleteBtn").onclick = function(){

    if(confirm("Удалить аккаунт?")){

        localStorage.clear();

        window.location.href = "register.html";

    }

}
