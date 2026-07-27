/*
==========================================
Wero Ru™ Wallet Engine
sonne™
==========================================
*/

const Wallet = {

    user: null,

    load() {

        this.user = Storage.getUser();

        if (!this.user) {
            return false;
        }

        if (!Array.isArray(this.user.operations)) {
            this.user.operations = [];
        }

        if (!Array.isArray(this.user.cards)) {
            this.user.cards = [];
        }

        if (typeof this.user.balance !== "number") {
            this.user.balance = 1000000;
        }

        return true;

    },



    save() {

        Storage.saveUser(this.user);

    },



    getBalance() {

        return this.user.balance;

    },



    setBalance(value) {

        this.user.balance = value;

        this.save();

    },



    format(amount) {

        return amount.toLocaleString("ru-RU") + " W";

    },



    hasMoney(amount) {

        return this.user.balance >= amount;

    },



    pay(amount, title, description = "") {

        if (!this.hasMoney(amount)) {

            return false;

        }

        this.user.balance -= amount;

        this.user.operations.unshift({

            id: crypto.randomUUID(),

            type: "payment",

            title: title,

            description: description,

            amount: -amount,

            balance: this.user.balance,

            date: Date.now()

        });

        this.save();

        return true;

    },



    add(amount, title, description = "") {

        this.user.balance += amount;

        this.user.operations.unshift({

            id: crypto.randomUUID(),

            type: "income",

            title: title,

            description: description,

            amount: amount,

            balance: this.user.balance,

            date: Date.now()

        });

        this.save();

        return true;

    },
    // ==========================================
    // История операций
    // ==========================================

    getOperations() {

        return this.user.operations;

    },



    getOperation(id) {

        return this.user.operations.find(
            operation => operation.id === id
        );

    },



    clearOperations() {

        this.user.operations = [];

        this.save();

    },



    // ==========================================
    // Добавление собственной операции
    // ==========================================

    addOperation(data) {

        this.user.operations.unshift({

            id: crypto.randomUUID(),

            type: data.type || "custom",

            title: data.title || "Операция",

            description: data.description || "",

            amount: data.amount || 0,

            balance: this.user.balance,

            date: Date.now()

        });

        this.save();

    },



    // ==========================================
    // Выпуск карты
    // ==========================================

    createCard() {

        if (!this.hasMoney(250)) {

            return {

                success: false,

                message: "Недостаточно средств"

            };

        }



        this.pay(

            250,

            "Выпуск карты",

            "Выпуск новой карты Wero"

        );



        const card = {

            id: crypto.randomUUID(),

            created: Date.now(),

            active: true,

            provider: "Wero",

            name: "Wero Card"

        };



        this.user.cards.push(card);

        this.save();



        return {

            success: true,

            card

        };

    },



    // ==========================================
    // Получить карты
    // ==========================================

    getCards() {

        return this.user.cards;

    },



    hasCard() {

        return this.user.cards.length > 0;

    },



    // ==========================================
    // Перевод другому пользователю
    // (подготовка)
    // ==========================================

    transfer(receiverId, amount) {

        if (!this.hasMoney(amount)) {

            return {

                success: false,

                message: "Недостаточно средств"

            };

        }



        this.pay(

            amount,

            "Перевод",

            "Получатель #" + receiverId

        );



        return {

            success: true

        };

    },



    // ==========================================
    // Эквайринг Wero Pay
    // ==========================================

    payMerchant(shop, product, amount) {

        if (!this.hasMoney(amount)) {

            return {

                success: false,

                message: "Недостаточно средств"

            };

        }



        this.pay(

            amount,

            shop,

            product

        );



        return {

            success: true

        };

    },
      // ==========================================
    // Обновление профиля
    // ==========================================

    updateProfile(data) {

        Object.assign(this.user, data);

        this.save();

        return true;

    },



    // ==========================================
    // Экспорт кошелька
    // ==========================================

    exportWallet() {

        return JSON.stringify(

            this.user,

            null,

            2

        );

    },



    // ==========================================
    // Импорт кошелька
    // ==========================================

    importWallet(json) {

        try {

            const user = JSON.parse(json);

            if (
                !user ||
                typeof user !== "object"
            ) {

                return false;

            }

            if (
                !user.id ||
                typeof user.balance !== "number"
            ) {

                return false;

            }

            this.user = user;

            this.save();

            return true;

        }

        catch (e) {

            console.error(e);

            return false;

        }

    },



    // ==========================================
    // Полное удаление данных
    // ==========================================

    reset() {

        Storage.deleteUser();

        this.user = null;

    },



    // ==========================================
    // Инициализация
    // ==========================================

    init() {

        if (!this.load()) {

            location.href = "login.html";

            return;

        }

        return true;

    }

};



// ==========================================
// Автоматическая инициализация
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        Wallet.init();

    }
);
