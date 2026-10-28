import * as api from "./api.js";
import { I } from "./i18n.js";
import { LINKS, RATES_RUB, SYSTEMS, MAX_CARDS, CURRENCIES } from "./config.js";

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => "&#" + c.charCodeAt(0) + ";");
const ls = { get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
const SYM = { ATY: "ATY", RUB: "₽", UAH: "₴", USD: "$", EUR: "€" };
const CC = ["+7", "+380", "+375", "+48", "+49", "+44", "+1", "+33", "+34", "+39", "+90", "+86", "+81", "+971", "+995", "+374", "+373", "+371", "+370", "+372"];
const TABS = ["home", "send", "altpay", "wrplus", "history"];
const S = { lang: I[ls.get("lang")] ? ls.get("lang") : "ru", user: undefined, profile: undefined, accounts: [], cards: [], tx: [], shown: new Set(), msg: null };

const t = k => I[S.lang][k] ?? k;
const loc = () => ({ ru: "ru-RU", alt: "pl-PL", en: "en-US" }[S.lang]);
const tab = () => TABS.includes(location.hash.slice(1)) ? location.hash.slice(1) : "home";
const money = (v, c) => (v / 100).toLocaleString(loc(), { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " " + (SYM[c] || c);
const fmt = n => String(n).replace(/(\d{4})(?=\d)/g, "$1 ");
const fail = c => { S.msg = { t: I[S.lang]["err_" + c] || t("err_unknown"), e: 1 }; render(); };

let un = [];
api.onUser(u => {
  un.forEach(f => f()); un = [];
  Object.assign(S, { user: u, profile: undefined, accounts: [], cards: [], tx: [], msg: null });
  if (u) un = [
    api.watchProfile(u.uid, p => { S.profile = p; render(); }),
    api.watchAccounts(u.uid, a => { S.accounts = a; render(); }),
    api.watchCards(u.uid, c => { S.cards = c; render(); }),
    api.watchTx(u.uid, x => { S.tx = x; render(); })
  ];
  render();
});

function nav() {
  const ok = S.user && S.profile;
  $("#nav").innerHTML = `<a class="logo" href="${LINKS.home}"><img src="logo.png" alt="WRB"></a>` +
    (ok ? `<nav class="tabs">${TABS.map(k => `<a href="#${k}" class="${tab() === k ? "on" : ""}">${t("n_" + k)}</a>`).join("")}</nav>` : "") +
    `<div class="tools">${["ru", "alt", "en"].map(l => `<button class="chip ${S.lang === l ? "on" : ""}" data-a="lang" data-v="${l}">${l.toUpperCase()}</button>`).join("")}${S.user ? `<button class="chip" data-a="out">${t("signout")}</button>` : ""}</div>`;
}

const card = c => {
  const s = S.shown.has(c.id);
  return `<div class="pc ${esc(c.system)}"><b>${esc(SYSTEMS[c.system])}</b><button class="eye" data-a="eye" data-v="${esc(c.id)}">${s ? t("hide") : t("show")}</button>
  <div class="n">${s ? fmt(esc(c.number)) : "•••• •••• •••• " + esc(String(c.number).slice(-4))}</div>
  <div class="r"><span>${esc(c.holderName)}</span><span>${esc(c.expiry)}${s ? " · CVV " + esc(c.cvv) : ""}</span></div></div>`;
};

const home = () => `<h1>${t("hello")}, ${esc(S.profile.firstName)}</h1>` + S.accounts.map(a => {
  const cs = S.cards.filter(c => c.accountId === a.id);
  return `<section class="glass box"><div class="bal">${money(a.balance, a.currency)}</div>
  <div class="mut">${esc(a.number)} · ${t("cur_" + a.currency)} · ${cs.length}/${MAX_CARDS} ${t("cardsN")}</div>
  <div class="cards">${cs.map(card).join("")}</div>
  <form class="row" data-f="card" data-acc="${esc(a.id)}"><select name="sys-${esc(a.id)}">${Object.entries(SYSTEMS).map(([k, v]) => `<option value="${k}">${v}</option>`).join("")}</select>
  <button class="btn" ${cs.length >= MAX_CARDS ? "disabled" : ""}>${t("newCard")}</button></form></section>`;
}).join("");

const send = () => `<section class="glass box narrow"><h1>${t("sendT")}</h1><form data-f="send">
  <label>${t("from")}<select name="from">${S.accounts.map(a => `<option value="${esc(a.id)}">${esc(a.number)} · ${money(a.balance, a.currency)}</option>`).join("")}</select></label>
  <label>${t("toNum")}<input name="to" autocomplete="off" required></label>
  <label>${t("amt")}<input name="amt" inputmode="decimal" autocomplete="off" required></label>
  <button class="btn wide">${t("sendBtn")}</button></form></section>`;

const altpay = () => `<section class="glass frame"><iframe src="${LINKS.altpay}" title="AltPay" loading="lazy" allow="payment"></iframe></section>
  <p class="mut c">${t("altHint")} <a href="${LINKS.altpay}" target="_blank" rel="noopener">${t("openNew")}</a></p>`;

const wrplus = () => `<section class="glass box narrow"><h1>${t("wrT")}</h1>` + (S.profile.wrPlus?.active
  ? `<p class="ok">${t("wrOn")}</p><form data-f="acc"><label>${t("cur")}<select name="cur">${CURRENCIES.filter(c => c !== "ATY").map(c => `<option value="${c}">${c} · ${t("cur_" + c)}</option>`).join("")}</select></label><button class="btn wide">${t("openAcc")}</button></form>`
  : `<p>${t("wrInfo")}</p><button class="btn wide" data-a="wr">${t("wrBtn")}</button>`) +
  `<p class="mut">${t("rates")}: ${Object.entries(RATES_RUB).map(([c, r]) => `1 ${SYM[c]} = ${r} ₽`).join(", ")}</p></section>`;

const history = () => `<section class="glass box"><h1>${t("hist")}</h1>` + (S.tx.length ? S.tx.map(x => {
  const o = x.fromUid === S.user.uid;
  return `<div class="tx"><span>${new Date(x.createdAt?.toMillis?.() ?? 0).toLocaleString(loc())}<br><span class="mut">${esc(x.fromNumber)} → ${esc(x.toNumber)}</span></span><b class="${o ? "neg" : "pos"}">${o ? "−" : "+"}${money(x.amount, x.currency)}</b></div>`;
}).join("") : `<p class="mut">${t("noTx")}</p>`) + `</section>`;

const reg = m => `<section class="glass box narrow"><h1>${t("finishT")}</h1>${m}<form data-f="reg">
  <label>${t("fn")}<input name="fn" autocomplete="given-name" required></label>
  <label>${t("ln")}<input name="ln" autocomplete="family-name" required></label>
  <label>${t("bd")}<input name="bd" type="date" max="${new Date().toISOString().slice(0, 10)}" required></label>
  <label>${t("ph")}</label><div class="row"><select name="cc" aria-label="${t("cc")}" style="flex:0 0 96px">${CC.map(c => `<option>${c}</option>`).join("")}</select><input name="ph" type="tel" inputmode="tel" autocomplete="tel-national" required></div>
  <button class="btn wide">${t("cont")}</button></form></section>`;

function view() {
  const m = S.msg ? `<div class="msg ${S.msg.e ? "err" : ""}" role="status">${esc(S.msg.t)}</div>` : "";
  if (S.user === undefined || (S.user && S.profile === undefined)) return `<p class="mut c">…</p>`;
  if (!S.user) return `<section class="glass box narrow"><h1>${t("authT")}</h1><p class="mut">${t("authS")}</p>${api.configured ? m : `<div class="msg err">${t("err_not-configured")}</div>`}<button class="btn wide" data-a="in">${t("signin")}</button></section>`;
  if (!S.profile) return reg(m);
  return m + { home, send, altpay, wrplus, history }[tab()]();
}

function render(clear) {
  const keep = clear ? [] : [...document.querySelectorAll("#app [name]")].map(e => [e.name, e.value]);
  const fa = clear ? null : document.activeElement?.name;
  nav(); $("#ft").textContent = t("footer");
  $("#app").innerHTML = view();
  keep.forEach(([n, v]) => { const e = $(`#app [name="${n}"]`); if (e && v) e.value = v; });
  if (fa) $(`#app [name="${fa}"]`)?.focus();
}

async function run(f, ok) {
  S.msg = null;
  try { await f(); if (ok) S.msg = { t: t(ok) }; render(true); }
  catch (e) { fail(e.message); }
}

document.addEventListener("click", e => {
  const b = e.target.closest("[data-a]"); if (!b) return;
  const a = b.dataset.a, v = b.dataset.v;
  if (a === "lang") { S.lang = v; ls.set("lang", v); document.documentElement.lang = v === "alt" ? "pl" : v; render(); }
  else if (a === "in") run(() => api.signIn());
  else if (a === "out") api.logout();
  else if (a === "eye") { S.shown.has(v) ? S.shown.delete(v) : S.shown.add(v); render(); }
  else if (a === "wr") run(() => api.subscribeWrPlus(), "okWr");
});

document.addEventListener("submit", e => {
  const f = e.target.closest("form[data-f]"); if (!f) return;
  e.preventDefault();
  const d = Object.fromEntries(new FormData(f)), k = f.dataset.f;
  if (k === "reg") {
    const ph = (d.ph || "").replace(/\D/g, "");
    if (!d.fn.trim() || !d.ln.trim() || !d.bd || ph.length < 5) return fail("fill");
    run(() => api.completeProfile({ firstName: d.fn.trim(), lastName: d.ln.trim(), birthDate: d.bd, phone: d.cc + ph, lang: S.lang }));
  } else if (k === "send") {
    const amt = Math.round(parseFloat(String(d.amt).replace(",", ".")) * 100);
    if (!(amt > 0)) return fail("invalid-amount");
    run(() => api.transfer({ fromAccountId: d.from, toNumber: d.to.trim().toUpperCase(), amount: amt }), "okSend");
  } else if (k === "card") {
    run(() => api.issueCard({ accountId: f.dataset.acc, system: d["sys-" + f.dataset.acc] }), "okCard");
  } else if (k === "acc") {
    run(() => api.openAccount({ currency: d.cur }), "okAcc");
  }
});

window.addEventListener("hashchange", () => { S.msg = null; render(); });
document.documentElement.lang = S.lang === "alt" ? "pl" : S.lang;
render();
