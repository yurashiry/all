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

/* Boot */

window.onload = () => {

    setTimeout(() => {

        document
        .getElementById("boot-screen")
        .style.display = "none";

    },3000);

};

/* Clock */

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

/* Swipe Unlock */

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

        let currentY =
        e.touches[0].clientY;

        let diff =
        startY - currentY;

        if(diff > 120){

            lockscreen.classList
            .add("unlocking");

            setTimeout(()=>{

                lockscreen.style
                .display="none";

            },600);

        }

    }
);
