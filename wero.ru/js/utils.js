/*
==========================================
Wero Ru™ Utils
sonne™
==========================================
*/

const Utils = {

    // ==========================================
    // Форматирование баланса
    // ==========================================

    formatBalance(amount) {

        return Number(amount).toLocaleString(
            "ru-RU"
        ) + " W";

    },



    // ==========================================
    // Форматирование даты
    // ==========================================

    formatDate(timestamp) {

        const date = new Date(timestamp);

        return date.toLocaleString("ru-RU", {

            day: "2-digit",

            month: "2-digit",

            year: "numeric",

            hour: "2-digit",

            minute: "2-digit"

        });

    },



    // ==========================================
    // Генерация ID пользователя
    // ==========================================

    generateUserID() {

        let id;

        do {

            id = Math.floor(
                10000000 +
                Math.random() * 90000000
            ).toString();

        }

        while (
            localStorage.getItem(
                "wero_user_" + id
            )
        );

        return id;

    },



    // ==========================================
    // Генерация номера карты
    // ==========================================

    generateCardNumber() {

        const user = Storage.getUser();

        const count =
            (user.cards?.length || 0) + 1;

        return "WRC-" +
            String(count).padStart(6, "0");

    },



    // ==========================================
    // Генерация номера операции
    // ==========================================

    generateTransactionID() {

        const user = Storage.getUser();

        const count =
            (user.operations?.length || 0) + 1;

        return "TX-" +
            String(count).padStart(8, "0");

    },



    // ==========================================
    // UUID (если понадобится)
    // ==========================================

    uuid() {

        if (
            window.crypto &&
            crypto.randomUUID
        ) {

            return crypto.randomUUID();

        }

        return Date.now() +
            "-" +
            Math.random()
                .toString(36)
                .substring(2);

    },



    // ==========================================
    // Копирование текста
    // ==========================================

    async copy(text) {

        try {

            await navigator.clipboard.writeText(text);

            this.toast("Скопировано");

            return true;

        }

        catch {

            return false;

        }

    },



    // ==========================================
    // Toast
    // ==========================================

    toast(text) {

        const toast =
            document.getElementById("toast");

        const label =
            document.getElementById("toastText");

        if (!toast || !label) {

            return;

        }

        label.textContent = text;

        toast.classList.remove("hidden");

        toast.classList.add("show");

        clearTimeout(
            this.toastTimer
        );

        this.toastTimer =
            setTimeout(() => {

                toast.classList.remove("show");

                toast.classList.add("hidden");

            }, 2500);

    },
      // ==========================================
    // Скачать файл
    // ==========================================

    download(filename, content, type = "application/json") {

        const blob = new Blob([content], {
            type: type
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = filename;

        document.body.appendChild(a);

        a.click();

        a.remove();

        URL.revokeObjectURL(url);

    },



    // ==========================================
    // Загрузка файла
    // ==========================================

    openFile(callback) {

        const input = document.createElement("input");

        input.type = "file";

        input.accept = ".json";

        input.onchange = event => {

            const file = event.target.files[0];

            if (!file) {

                return;

            }

            const reader = new FileReader();

            reader.onload = () => {

                callback(reader.result);

            };

            reader.readAsText(file);

        };

        input.click();

    },



    // ==========================================
    // Безопасное число
    // ==========================================

    number(value) {

        const n = Number(value);

        if (isNaN(n)) {

            return 0;

        }

        return n;

    },



    // ==========================================
    // Денежная проверка
    // ==========================================

    isPositiveMoney(value) {

        const amount = Number(value);

        return Number.isFinite(amount) && amount > 0;

    },



    // ==========================================
    // Задержка
    // ==========================================

    wait(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    },



    // ==========================================
    // Случайное число
    // ==========================================

    random(min, max) {

        return Math.floor(

            Math.random() *

            (max - min + 1)

        ) + min;

    },



    // ==========================================
    // Проверка телефона
    // ==========================================

    isPhone(phone) {

        return /^[0-9+\-() ]{6,20}$/.test(phone);

    },



    // ==========================================
    // Проверка username
    // ==========================================

    isUsername(username) {

        return /^[a-zA-Z0-9._]{3,32}$/.test(username);

    },



    // ==========================================
    // Проверка имени
    // ==========================================

    isName(name) {

        return name.trim().length >= 2;

    }

};
