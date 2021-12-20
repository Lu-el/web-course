"use strict";

const listOfActive = [
    'https://www.b17.ru/blog/101157/',    
    'https://wildfauna.ru/ploskie-chervi',
    'http://www.danaida.ru/',
    'https://wildfauna.ru/kuznechik',
]

function closeWindow() {
    window.close();
}

function moveTime() {
    let delta = 10;
    let deadline = new Date(Date.now() + delta * 1000);
    initializeClock("countdown", deadline);
}

function moveSite(id) {
    let site = document.getElementById(id);
    let i = (listOfActive.findIndex(x => x == site.src));

    if (i < 0 && (listOfActive.length != 1 )) {
        site.src = listOfActive[1];
        location.hash = `#window${1}`

    } else if (i == 0 || i < (listOfActive.length - 1)) {
        site.src = listOfActive[i+1];
        location.hash = `#window${i+1}`;

    } else {
        let btn = document.getElementsByClassName("lastbtn");
        location.hash = `#theEnd`;   
        for (let elem of btn) {
        elem.style.display = "inline-block";
        }

        let time = document.getElementsByClassName("time");
            
        for (let char of time) {
        char.style.display = "none";
        }
    }
}

function watchAgain(id) {
    let site = document.getElementById(id);
    site.src = listOfActive[0];  
    location.hash = `#window0`

    let btn = document.getElementsByClassName("lastbtn");
    for (let elem of btn) {
        elem.style.display = "none";
    }

    let time = document.getElementsByClassName("time");
    for (let char of time) {
        char.style.display = "inline-block";
    }
}

function getTimeRemaining (endTime) {
    let t = Date.parse(endTime)-Date.parse(new Date())
    let seconds = Math.floor(t/1000)%60;
    let minutes = Math.floor(t/(1000*60)%60);

    return {
        total: t,
        minutes: minutes,
        seconds: seconds,
    }
}

let timeoutId;

function initializeClock(id, endTime) {
    let clock = document.getElementById(id);
    let minutesInterval = clock.querySelector(".minutes");
    let secondsInterval = clock.querySelector(".seconds");
    
    function updateClock() {
        let t = getTimeRemaining (endTime);

        if (t.total >= 0) {
            minutesInterval.innerHTML = `${t.minutes}`.padStart(2, 0);
            secondsInterval.innerHTML = `${t.seconds}`.padStart(2, 0);
            timeoutId = window.setTimeout(updateClock, 1000);
        } else if (t.total <= 0) {
            moveSite("mainWindow");
        }
    }
    updateClock()
}

function moveBack(id) {
    clearTimeout(timeoutId);
    let site = document.getElementById(id);
    let i = (listOfActive.findIndex(x => x == site.src)); 

    if (i <= 0) {
        site.src = listOfActive[0];
        location.hash = `#window0`
     } else {
        site.src = listOfActive[(i-1)];  
        location.hash = `#window${i-1}`
     }
    let btn = document.getElementsByClassName("lastbtn");
    for (let elem of btn) {
        elem.style.display = "none";
    }

    let time = document.getElementsByClassName("time");
    for (let char of time) {
        char.style.display = "inline-block";
    }
};

document.addEventListener('click', function(event) {
    let time = event.target.closest('#stop');
    if (!time) return;
    clearTimeout(timeoutId);
});

document.addEventListener('click', function(event) {
    let time = event.target.closest('#again');
    if (!time) return;
    clearTimeout(timeoutId);
    moveTime();
});
