const minWork = document.querySelector('.minutes-work');
const secWork = document.querySelector('.seconds-work');
const startWork = document.querySelector('.start-work');
const pauseWork = document.querySelector('.pause-work');
const resetWork = document.querySelector('.reset-work');
const selectTime = document.querySelector('#time-selector');

const minBreak = document.querySelector('.minutes-break');
const secBreak = document.querySelector('.seconds-break');
const startBreak = document.querySelector('.start-break');
const pauseBreak = document.querySelector('.pause-break');

let workTime = {
    minutes: 0,
    seconds: 0,
};

let breakTime = {
    minutes: 0,
    seconds: 0,
};

let workAudio = new Audio('/sounds/work.mp3')
let breakAudio = new Audio('/sounds/break.mp3');

displayTime();
initialState();

function initialState() {
    startWork.disabled = true;
    startBreak.disabled = true;
    pauseWork.disabled = true;
    pauseBreak.disabled = true;
    resetWork.disabled = true;
}

function displayTime() {
    minWork.innerHTML = `${workTime.minutes}:`;
    secWork.innerHTML = `0${workTime.seconds}`;
    minBreak.innerHTML = `${breakTime.minutes}:`;
    secBreak.innerHTML = `0${breakTime.seconds}`;
}

selectTime.addEventListener('change', timerValues)

function timerValues() {
    if (selectTime.value === '25-5') {
        workTime.minutes = 25;
        workTime.seconds = 0;
        breakTime.minutes = 5;
        breakTime.seconds = 0;
        displayTime();
    }
    if (selectTime.value === '45-15') {
        workTime.minutes = 45;
        workTime.seconds = 0;
        breakTime.minutes = 15;
        breakTime.seconds = 0;
        displayTime();
    }
    startWork.disabled = false;
    pauseWork.disabled = false;
    resetWork.disabled = false;
}

function countDownWork(time) {
    if (time.minutes === 0 && time.seconds === 1) {
        clearInterval(workTimer);
        workAudio.play();
        startBreak.disabled = false;
        pauseBreak.disabled = false;
        pauseWork.disabled = true;
        resetWork.disabled = false;
    }
    if (time.seconds === 0) {
        time.seconds = 60;
        time.minutes--;
    }
    time.seconds--;
    if (time.seconds < 10) {
        secWork.innerHTML = `0${time.seconds}`;
    } else {
        secWork.innerHTML = time.seconds;
    }
    minWork.innerHTML = `${time.minutes}:`;
    startWork.disabled = true;
}

function countDownBreak(time) {
    if (time.minutes === 0 && time.seconds === 1) {
        clearInterval(breakTimer);
        startBreak.disabled = true;
        pauseBreak.disabled = true;
        resetWork.disabled = false;
        breakAudio.play();
    }
    if (time.seconds === 0) {
        time.seconds = 60;
        time.minutes--;
    }
    time.seconds--;
    if (time.seconds < 10) {
        secBreak.innerHTML = `0${time.seconds}`;
    } else {
        secBreak.innerHTML = time.seconds;
    }
    minBreak.innerHTML = `${time.minutes}:`;
    startWork.disabled = true;
}

// Work Timer //

let workTimer;

startWork.addEventListener('click', () => {
    workTimer = setInterval(function () { countDownWork(workTime) }, 1000);
    selectTime.disabled = true;
    startWork.disabled = true;
    resetWork.disabled = true;
    return workTimer;
});

pauseWork.addEventListener('click', () => {
    if (startWork.disabled) {
        startWork.disabled = false;
        resetWork.disabled = false;
    }
    clearInterval(workTimer);
});

resetWork.addEventListener('click', () => {
    selectTime.disabled = false;
    initialState();
    timerValues();
});

// Break timer //

let breakTimer;

startBreak.addEventListener('click', () => {
    breakTimer = setInterval(function () { countDownBreak(breakTime) }, 1000);
    selectTime.disabled = true;
    startBreak.disabled = true;
    startWork.disabled = true;
    resetWork.disabled = true;
    return breakTimer;
});

pauseBreak.addEventListener('click', () => {
    if (startBreak.disabled) {
        startBreak.disabled = false;
        resetWork.disabled = false;
    }
    clearInterval(breakTimer);
});