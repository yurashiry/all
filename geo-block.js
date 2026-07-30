fetch("https://ipapi.co/json/")
.then(r => r.json())
.then(data => {
    const blocked = [
        "PL","DE","FR","IT","ES","NL","BE","CZ","SK","AT","HU","RO","BG",
        "HR","SI","EE","LV","LT","FI","SE","DK","IE","PT","LU","GR","CY","MT","UA"
    ];

    if (blocked.includes(data.country_code)) {
        document.body.innerHTML = `
        <div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;text-align:center">
            <div>
                <h1>Доступ запрещён</h1>
                <p>Этот сайт недоступен в вашем регионе.</p>
            </div>
        </div>`;
    }
});
