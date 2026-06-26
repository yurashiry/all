const form = document.getElementById("registerForm");

form.addEventListener("submit", function(e){

    e.preventDefault();

    const username =
    document.getElementById("username").value.trim();

    const name =
    document.getElementById("name").value.trim();

    const password =
    document.getElementById("password").value.trim();

    localStorage.setItem("wr_username",username);

    localStorage.setItem("wr_name",name);

    localStorage.setItem("wr_password",password);

    alert("Аккаунт создан!");

    window.location.href="home.html";

});
