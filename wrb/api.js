/* Слой данных. Весь сайт ходит на бэкенд только через этот файл.
   Firestore (клиент только читает):
     users/{uid}:        firstName, lastName, birthDate, phone, wrPlus:{active}
     accounts/{id}:      ownerUid, number, currency, balance (целое, в сотых долях)
     cards/{id}:         ownerUid, accountId, system (altpay|wrpay|visa_local|mc_elite_local),
                         number, expiry "MM/YY", cvv, holderName
     transactions/{id}:  fromUid, toUid, fromNumber, toNumber, amount, currency, createdAt (Timestamp)
   Cloud Functions (callable), ошибка = HttpsError с message-кодом:
     completeProfile {firstName,lastName,birthDate,phone,lang}  → создаёт users/{uid} и счёт ATY
     transfer {fromAccountId,toNumber,amount}
     openAccount {currency}      issueCard {accountId,system}      subscribeWrPlus {}
   Коды ошибок: insufficient-funds, recipient-not-found, currency-mismatch,
                invalid-amount, card-limit, wr-required */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, collection, query, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js";
import { FIREBASE, REGION } from "./config.js";

export const configured = !!FIREBASE.apiKey;
let auth, db, fns;
if (configured) {
  const app = initializeApp(FIREBASE);
  auth = getAuth(app); db = getFirestore(app); fns = getFunctions(app, REGION);
}
const call = (name, data) => httpsCallable(fns, name)(data).then(r => r.data).catch(e => { throw new Error(e.message); });
const need = () => { if (!configured) throw new Error("not-configured"); };

export const onUser = cb => configured ? onAuthStateChanged(auth, cb) : (cb(null), () => {});
export const signIn = () => { need(); return signInWithPopup(auth, new GoogleAuthProvider()); };
export const logout = () => signOut(auth);
export const watchProfile = (uid, cb) => onSnapshot(doc(db, "users", uid), s => cb(s.exists() ? s.data() : null));
const col = (name, field, uid, cb) => onSnapshot(query(collection(db, name), where(field, "==", uid)), s => cb(s.docs.map(d => ({ id: d.id, ...d.data() }))));
export const watchAccounts = (uid, cb) => col("accounts", "ownerUid", uid, cb);
export const watchCards = (uid, cb) => col("cards", "ownerUid", uid, cb);
export function watchTx(uid, cb) {
  let out = [], inc = [];
  const emit = () => {
    const m = new Map([...out, ...inc].map(x => [x.id, x]));
    cb([...m.values()].sort((a, b) => (b.createdAt?.toMillis?.() ?? 0) - (a.createdAt?.toMillis?.() ?? 0)));
  };
  const u1 = col("transactions", "fromUid", uid, l => { out = l; emit(); });
  const u2 = col("transactions", "toUid", uid, l => { inc = l; emit(); });
  return () => { u1(); u2(); };
}
export const completeProfile = d => call("completeProfile", d);
export const transfer = d => call("transfer", d);
export const openAccount = d => call("openAccount", d);
export const issueCard = d => call("issueCard", d);
export const subscribeWrPlus = () => call("subscribeWrPlus", {});
