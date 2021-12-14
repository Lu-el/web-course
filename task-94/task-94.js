"use strict";
const listOfActive = [
    'https://www.b17.ru/blog/101157/',    
    'https://dic.academic.ru/dic.nsf/ruwiki/992753',
    'http://www.danaida.ru/',
    'https://wildfauna.ru/kuznechik',
]


function moveTime() {
    let delta = 10;
    let deadline = new Date(Date.parse(new Date()) + delta * 1000);
    initializeClock("countdown", deadline);
}

function moveSite(id) {
    let site = document.getElementById(id);
    let i = (listOfActive.findIndex(x => x == site.src));

    if (i == 0 || i < (listOfActive.length - 1)) {
        site.src = listOfActive[i+1];
        
    } else { // i = listOfActive.length-1
        let btn = document.getElementsByClassName("lastbtn");
        // site.src = "";
            
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

// let timeinterval = setInterval(updateClock, 1000);
let timeoutId;
function initializeClock(id, endTime) {
    let clock = document.getElementById(id);
    let minutesInterval = clock.querySelector(".minutes");
    let secondsInterval = clock.querySelector(".seconds");
    
    function updateClock() {
        let t = getTimeRemaining (endTime);

        if (t.total >= 0) {
            minutesInterval.innerHTML = ("0" + t.minutes).slice(-2);
            secondsInterval.innerHTML = ("0" + t.seconds).slice(-2);
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
    (i <= 0) ? site.src = listOfActive[0]: site.src = listOfActive[(i-1)];  
}

function test1() {
    moveTime()
};
