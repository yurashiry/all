/* ==========================
WR OS™ v0.3
Sonne™
========================== */

const lockscreen =
document.getElementById("lockscreen");

const clock =
document.getElementById("clock");

const dateEl =
document.getElementById("date");

const homeTime =
document.getElementById("home-time");

const homeDate =
document.getElementById("home-date");

/* ==========================
BOOT
========================== */

window.onload = () => {

setTimeout(() => {

document.getElementById(
"boot-screen"
).style.display = "none";

loadSettings();

},3000);

};

/* ==========================
CLOCK
========================== */

function updateClock(){

const now = new Date();

const time =
now.toLocaleTimeString(
[],
{
hour:"2-digit",
minute:"2-digit"
}
);

const date =
now.toLocaleDateString(
"ru-RU",
{
weekday:"long",
day:"numeric",
month:"long"
}
);

clock.textContent = time;
dateEl.textContent = date;

homeTime.textContent = time;
homeDate.textContent = date;

}

setInterval(updateClock,1000);
updateClock();

/* ==========================
SWIPE UNLOCK
========================== */

let startY = 0;

lockscreen.addEventListener(
"touchstart",
e => {

startY =
e.touches[0].clientY;

}
);

lockscreen.addEventListener(
"touchmove",
e => {

const currentY =
e.touches[0].clientY;

const diff =
startY - currentY;

if(diff > 120){

lockscreen.classList
.add("unlocking");

setTimeout(()=>{

lockscreen.style.display =
"none";

},550);

}

}
);

/* ==========================
APPS
========================== */

function openApp(id){

const app =
document.getElementById(id);

app.classList.add("open");

}

function closeApp(id){

const app =
document.getElementById(id);

app.classList.remove("open");

}

/* ==========================
THEME
========================== */

function toggleTheme(){

document.body.classList.toggle(
"dark-theme"
);

const dark =
document.body.classList.contains(
"dark-theme"
);

localStorage.setItem(
"wr_theme",
dark
);

showToast(
dark ?
"Темная тема включена"
:
"Светлая тема включена"
);

}

/* ==========================
NOTIFICATIONS
========================== */

function toggleNotifications(){

let enabled =
localStorage.getItem(
"wr_notifications"
);

enabled = enabled !== "true";

localStorage.setItem(
"wr_notifications",
enabled
);

showToast(

enabled
?
"Уведомления включены"
:
"Уведомления выключены"

);

}

/* ==========================
WALLPAPERS
========================== */

const wallpapers = [

"https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1080",

"https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1080",

"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1080"

];

let wallpaperIndex = 0;

function changeWallpaper(){

wallpaperIndex++;

if(
wallpaperIndex >=
wallpapers.length
){
wallpaperIndex = 0;
}

const bg = wallpapers[
wallpaperIndex
];

document.getElementById(
"home-screen"
).style.backgroundImage =
"linear-gradient( rgba(0,0,0,.2), rgba(0,0,0,.35) ),url('${bg}')";

localStorage.setItem(
"wr_wallpaper",
bg
);

showToast(
"Обои изменены"
);

}

/* ==========================
STORE
========================== */

function installApp(name){

let apps =
JSON.parse(
localStorage.getItem(
"wr_apps"
)
|| "[]"
);

if(
apps.includes(name)
){

showToast(
"Уже установлено"
);

return;
}

apps.push(name);

localStorage.setItem(
"wr_apps",
JSON.stringify(apps)
);

showToast(
name +
" установлено"
);

}

/* ==========================
LOAD SETTINGS
========================== */

function loadSettings(){

const dark =
localStorage.getItem(
"wr_theme"
);

if(dark === "true"){

document.body.classList.add(
"dark-theme"
);

}

const savedWallpaper =
localStorage.getItem(
"wr_wallpaper"
);

if(savedWallpaper){

document.getElementById(
"home-screen"
).style.backgroundImage =
"linear-gradient( rgba(0,0,0,.2), rgba(0,0,0,.35) ),url('${savedWallpaper}')";

}

}

/* ==========================
TOAST
========================== */

function showToast(text){

let toast =
document.createElement("div");

toast.innerText = text;

toast.style.position =
"fixed";

toast.style.bottom =
"90px";

toast.style.left =
"50%";

toast.style.transform =
"translateX(-50%)";

toast.style.background =
"rgba(0,0,0,.8)";

toast.style.color =
"white";

toast.style.padding =
"12px 20px";

toast.style.borderRadius =
"15px";

toast.style.zIndex =
"99999";

toast.style.backdropFilter =
"blur(10px)";

document.body.appendChild(
toast
);

setTimeout(()=>{

toast.remove();

},2500);

}
