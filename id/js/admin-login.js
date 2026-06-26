document.getElementById("adminLoginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;

    const res = await fetch("https://YOUR_BACKEND_URL/api/admin/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            login,
            password
        })
    });

    if(res.ok){
        const data = await res.json();

        localStorage.setItem("admin_token", data.token);

        window.location.href = "admin.html";
    } else {
        alert("Неверный логин или пароль");
    }
});
