// ================================
// WR ID AT - HOME
// ================================

// Получаем пользователя
const user = JSON.parse(localStorage.getItem("wr_current_user"));

if (!user) {
    window.location.href = "index.html";
}

// ================================
// Пользователи с галочками
// ================================

const verifiedUsers = {

    "yurskk": {
        blue: true,
        plus: true
    },

    "wrteam": {
        blue: true,
        plus: false
    }

};

// Проверяем галочки

const badges = verifiedUsers[user.username.toLowerCase()];

user.blue = badges ? badges.blue : false;
user.plus = badges ? badges.plus : false;

// ================================
// Профиль
// ================================

document.getElementById("displayName").childNodes[0].textContent =
    user.name + " ";

document.getElementById("username").textContent =
    "@" + user.username;

document.getElementById("avatar").textContent =
    user.name.charAt(0).toUpperCase();

// Показываем галочки

if (user.blue) {
    document.getElementById("blueBadge").style.display = "inline-flex";
}

if (user.plus) {
    document.getElementById("plusBadge").style.display = "inline-flex";
}

// ================================
// Выход
// ================================

document.getElementById("logout").onclick = () => {

    localStorage.removeItem("wr_current_user");

    window.location.href = "index.html";

};

// ================================
// Карты
// ================================

let cards = JSON.parse(
    localStorage.getItem("wr_cards_" + user.username)
) || [];

const container = document.getElementById("cardsContainer");

renderCards();

function renderCards() {

    container.innerHTML = "";

    if (cards.length === 0) {

        container.innerHTML =
            '<div class="empty">Нет привязанных карт</div>';

        return;

    }

    cards.forEach((card, index) => {

        container.innerHTML += `
            <div class="bank-card">

                <div class="type">${card.type}</div>

                <div class="number">
                    •••• •••• •••• ${card.last4}
                </div>

                <button class="remove" onclick="removeCard(${index})">
                    Удалить карту
                </button>

            </div>
        `;

    });

}

// ================================
// Добавление карты
// ================================

const modal = document.getElementById("cardModal");

document.getElementById("addCard").onclick = () => {

    modal.style.display = "flex";

};

document.getElementById("closeCard").onclick = () => {

    modal.style.display = "none";

};

document.getElementById("saveCard").onclick = () => {

    const type = document.getElementById("cardType").value;

    const number = document
        .getElementById("cardNumber")
        .value
        .replace(/\s/g, "");

    if (number.length < 16) {

        alert("Введите корректный номер карты");

        return;

    }

    cards.push({
        type: type,
        last4: number.slice(-4)
    });

    localStorage.setItem(
        "wr_cards_" + user.username,
        JSON.stringify(cards)
    );

    document.getElementById("cardNumber").value = "";

    modal.style.display = "none";

    renderCards();

};

// ================================
// Удаление карты
// ================================

function removeCard(index) {

    if (!confirm("Удалить карту?")) return;

    cards.splice(index, 1);

    localStorage.setItem(
        "wr_cards_" + user.username,
        JSON.stringify(cards)
    );

    renderCards();

}

// ================================
// Закрытие модальных окон по клику
// ================================

window.onclick = function(event){

    if(event.target === modal){
        modal.style.display = "none";
    }

    const qrModal = document.getElementById("qrModal");

    if(event.target === qrModal){
        qrModal.style.display = "none";
    }

}
