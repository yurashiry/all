// Wero Ru
// storage.js

const STORAGE_KEY = "weroru";

const DEFAULT_BALANCE = 1000000;

class StorageManager {

    constructor() {

        this.data = this.load();

    }

    load() {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {

            try {
                return JSON.parse(saved);
            } catch (e) {
                localStorage.removeItem(STORAGE_KEY);
            }

        }

        return null;

    }

    save() {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(this.data)
        );

    }

    hasAccount() {

        return this.data !== null;

    }

    createUser(googleUser) {

        if (this.data) {

            return this.data;

        }

        const username = this.generateUsername(
            googleUser.given_name ||
            googleUser.name
        );

        this.data = {

            user: {

                id: this.generateWalletId(),

                googleId: googleUser.sub,

                avatar: googleUser.picture,

                name: googleUser.given_name ||

                    googleUser.name,

                surname:

                    googleUser.family_name || "",

                username,

                phone: ""

            },

            wallet: {

                balance: DEFAULT_BALANCE,

                cardsIssued: 0,

                hasCard: false

            },

            linkedCards: [],

            operations: [

                {

                    id: crypto.randomUUID(),

                    type: "system",

                    title: "Создание кошелька",

                    subtitle: "Начальный баланс",

                    amount: DEFAULT_BALANCE,

                    date: new Date().toISOString()

                }

            ],

            settings: {

                theme: "light"

            }

        };

        this.save();

        return this.data;

    }

    getUser() {

        return this.data?.user;

    }

    getWallet() {

        return this.data?.wallet;

    }

    getOperations() {

        return this.data?.operations || [];

    }

    getSettings() {

        return this.data?.settings;

    }

    updateUser(values) {

        Object.assign(this.data.user, values);

        this.save();

    }

    addOperation({

        type,

        title,

        subtitle,

        amount

    }) {

        this.data.operations.unshift({

            id: crypto.randomUUID(),

            type,

            title,

            subtitle,

            amount,

            date: new Date().toISOString()

        });

        this.save();

    }

    addBalance(amount) {

        this.data.wallet.balance += amount;

        this.save();

    }

    removeBalance(amount) {

        if (this.data.wallet.balance < amount) {

            return false;

        }

        this.data.wallet.balance -= amount;

        this.save();

        return true;

    }

    issueCard() {

        this.data.wallet.cardsIssued++;

        this.data.wallet.hasCard = true;

        this.save();

    }

    deleteAccount() {

        localStorage.removeItem(STORAGE_KEY);

        this.data = null;

    }

    logout() {

        localStorage.removeItem("google_session");

    }

    generateWalletId() {

        let id = "";

        while (id.length < 8) {

            id += Math.floor(

                Math.random() * 10

            );

        }

        return id;

    }

    generateUsername(name) {

        const clean = name

            .toLowerCase()

            .replace(/\s/g, "");

        const random = Math.floor(

            1000 + Math.random() * 9000

        );

        return "@" + clean + random;

    }

}

const storage = new StorageManager();
