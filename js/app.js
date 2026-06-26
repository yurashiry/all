// WR ID AT
// Frontend Demo

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event){

    event.preventDefault();

    const username = document.getElementById("username").value.trim();

    const password = document.getElementById("password").value.trim();

    if(username === "" || password === ""){

        alert("Заполните все поля.");

        return;

    }

    // Пока без сервера.
    // Потом здесь будет запрос к Symfony API.

    localStorage.setItem("wr_username", username);

    window.location.href = "home.html";

});
