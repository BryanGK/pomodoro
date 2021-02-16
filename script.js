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
const resetBreak = document.querySelector('.reset-break');

let workTime = {
    minutes: 0,
    seconds: 0,
};

let breakTime = {
    minutes: 0,
    seconds: 0,
};

minWork.innerHTML = `${workTime.minutes}:`;
secWork.innerHTML = `0${workTime.seconds}`;
minBreak.innerHTML = `${breakTime.minutes}:`;
secBreak.innerHTML = `0${breakTime.seconds}`;

selectTime.addEventListener('change', () => {
    if (selectTime.value === '25-5') {
        workTime.minutes = 25;
        workTime.seconds = 0;
        breakTime.minutes = 5;
        breakTime.seconds = 0;
        minWork.innerHTML = `${workTime.minutes}:`;
        secWork.innerHTML = `0${workTime.seconds}`;
        minBreak.innerHTML = `${breakTime.minutes}:`;
        secBreak.innerHTML = `0${breakTime.seconds}`;
    }
    if (selectTime.value === '45-15') {
        workTime.minutes = 45;
        workTime.seconds = 0;
        breakTime.minutes = 15;
        breakTime.seconds = 0;
        minWork.innerHTML = `${workTime.minutes}:`;
        secWork.innerHTML = `0${workTime.seconds}`;
        minBreak.innerHTML = `${breakTime.minutes}:`;
        secBreak.innerHTML = `0${breakTime.seconds}`;
    }
});

function countDown(time) {
    if (time.minutes === 0 && time.seconds === 1) {
        clearInterval(workTimer);
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
}

let workTimer;
let breakTimer;

startWork.addEventListener('click', () => {
    workTimer = setInterval(function () { countDown(workTime) }, 300);
    startWork.disabled = true;
    return workTimer;
});

pauseWork.addEventListener('click', () => {
    if (startWork.disabled) {
        startWork.disabled = false;
    }
    clearInterval(workTimer);
});

resetWork.addEventListener('click', () => {

})