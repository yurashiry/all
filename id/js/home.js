// ================================
// WR ID AT - HOME
// ================================

// Получаем пользователя

const user = JSON.parse(localStorage.getItem("wr_current_user"));

if (!user) {
    window.location.href = "index.html";
}

// ================================
// Проверка галочек
// ================================

const badges = verifiedUsers[user.username.toLowerCase()];

user.blue = badges ? badges.blue : false;
user.plus = badges ? badges.plus : false;

// ================================
// Профиль
// ================================

document.getElementById("name").innerText = user.name;
document.getElementById("username").innerText = "@" + user.username;
document.getElementById("avatar").innerText =
    user.name.charAt(0).toUpperCase();

// ================================
// Показываем галочки
// ================================

if (user.blue) {
    document.getElementById("blue").style.display = "block";
}

if (user.plus) {
    document.getElementById("plus").style.display = "block";
}

// ================================
// Выход
// ================================

function logout() {

    localStorage.removeItem("wr_current_user");

    window.location.href = "index.html";

}

// ================================
// QR
// ================================

function openQR() {

    document.getElementById("qrModal").style.display = "flex";

    const canvas = document.getElementById("qrCanvas");

    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);

    QRCode.toCanvas(canvas,user.username);

}

function closeQR() {

    document.getElementById("qrModal").style.display = "none";

}

// ================================
// Карты
// ================================

let cards = JSON.parse(
    localStorage.getItem("cards_" + user.username)
) || [];

function openCard() {

    document.getElementById("cardModal").style.display = "flex";

    renderCards();

}

function closeCard() {

    document.getElementById("cardModal").style.display = "none";

}

function saveCard() {

    const number =
        document.getElementById("cardNumber").value;

    const type =
        document.getElementById("cardType").value;

    if(number.length < 16){

        alert("Введите номер карты");

        return;

    }

    cards.push({

        type:type,

        last4:number.slice(-4)

    });

    localStorage.setItem(

        "cards_" + user.username,

        JSON.stringify(cards)

    );

    document.getElementById("cardNumber").value="";

    renderCards();

}

function renderCards(){

    const cardsDiv=document.getElementById("cards");

    cardsDiv.innerHTML="";

    if(cards.length===0){

        cardsDiv.innerHTML="<p>Нет карт</p>";

        return;

    }

    cards.forEach((card,index)=>{

        cardsDiv.innerHTML += `

        <div class="bankCard">

            <div><b>${card.type}</b></div>

            <div style="margin-top:12px;">
                •••• •••• •••• ${card.last4}
            </div>

            <button onclick="removeCard(${index})">
                Удалить
            </button>

        </div>

        `;

    });

}

function removeCard(index){

    cards.splice(index,1);

    localStorage.setItem(

        "cards_"+user.username,

        JSON.stringify(cards)

    );

    renderCards();

}
