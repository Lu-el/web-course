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

function clearBtns() {
    let btn = document.getElementsByClassName("lastbtn");
    for (let elem of btn) {
        elem.style.display = "none";
    }

    let time = document.getElementsByClassName("time");
    for (let char of time) {
        char.style.display = "inline-block";
    }
}

let timeoutId;
function moveTime() {
    let delta = 10;
    let deadline = new Date(Date.now() + delta * 1000);
    initializeClock("countdown", deadline);
    clearBtns()
}

class Router {
    constructor({
        pages,
        rootSelector
    }) {
        this.pages = pages;
        this.rootSelector = rootSelector;
        this.initRouting();
    }

    findAndRenderPage = () => {
        const pageHash = location.hash.slice(1);
        const relatedPage = this.pages.find(page => page.hash === pageHash);

        if (relatedPage == undefined) {
            let site = document.getElementById("mainWindow");
            let i = pageHash.slice(-1);
                if (i >= listOfActive.length || (!i)) location.hash = this.pages[0].hash;
            clearTimeout(timeoutId);
            site.src = listOfActive[i];
            return;
        }

        const rootElement = document.querySelector(this.rootSelector);
        rootElement.innerHTML = relatedPage.render();
    }

    initRouting() {
        window.addEventListener('hashchange', this.findAndRenderPage);
        this.findAndRenderPage();
    }
}

const createRouter = () => new Router({
    pages: [
        {
            get hash() {
                let site = document.getElementById("mainWindow");
                let i = (listOfActive.findIndex(x => x == site.src));
                return `window${i}`
            },
            render() {
                let site = document.getElementById("mainWindow");
                let i = (listOfActive.findIndex(x => x == site.src));
                return `<div> Page ${i}</div>`
            }
        }
    ],
    rootSelector: '#root'
});

createRouter();

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
    location.hash = `#window0`;

    clearBtns();
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
        location.hash = `#window0`
     } else { 
        location.hash = `#window${i-1}`
     }
     clearBtns();
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
