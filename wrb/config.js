// Заполните этот файл один раз — и сайт заработает.
// Firebase: консоль → Project settings → Your apps → Web app → firebaseConfig
export const FIREBASE = { apiKey: "", authDomain: "", projectId: "", appId: "" };
export const REGION = "europe-west1"; // регион Cloud Functions
export const LINKS = { home: "https://haorik.ru/wrb", altpay: "https://haorik.ru/altpay" };
export const CURRENCIES = ["ATY", "RUB", "UAH", "USD", "EUR"];
export const RATES_RUB = { ATY: 10, UAH: 3, USD: 85, EUR: 99 }; // сколько рублей стоит 1 единица
export const SYSTEMS = { altpay: "AltPay", wrpay: "WR Pay+", visa_local: "Visa Local", mc_elite_local: "Mastercard Elite Local" };
export const MAX_CARDS = 5;
