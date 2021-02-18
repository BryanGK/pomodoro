let workTimer;
let breakTimer;

let workTime = {
  minutes: 0,
  seconds: 0,
};

let breakTime = {
  minutes: 0,
  seconds: 0,
};

const workAudio = new Audio("/sounds/work.mp3");
const breakAudio = new Audio("/sounds/break.mp3");

const minWork = document.querySelector(".minutes-work");
const secWork = document.querySelector(".seconds-work");

const minBreak = document.querySelector(".minutes-break");
const secBreak = document.querySelector(".seconds-break");

const startWork = document.querySelector(".start-work");
startWork.addEventListener("click", () => {
  workTimer = setInterval(() => countDownWork(workTime), 1000);
  selectTime.disabled = true;
  startWork.disabled = true;
  resetWork.disabled = true;
  return workTimer;
});

const pauseWork = document.querySelector(".pause-work");
pauseWork.addEventListener("click", () => {
  if (startWork.disabled) {
    startWork.disabled = false;
    resetWork.disabled = false;
  }
  clearInterval(workTimer);
});

const resetWork = document.querySelector(".reset-work");
resetWork.addEventListener("click", () => {
  selectTime.disabled = false;
  initialState();
  timerValues();
});

const startBreak = document.querySelector(".start-break");
startBreak.addEventListener("click", () => {
  breakTimer = setInterval(() => countDownBreak(breakTime), 1000);
  selectTime.disabled = true;
  startBreak.disabled = true;
  startWork.disabled = true;
  resetWork.disabled = true;
  return breakTimer;
});

const pauseBreak = document.querySelector(".pause-break");
pauseBreak.addEventListener("click", () => {
  if (startBreak.disabled) {
    startBreak.disabled = false;
    resetWork.disabled = false;
  }
  clearInterval(breakTimer);
});

const selectTime = document.querySelector("#time-selector");
selectTime.addEventListener("change", timerValues);

function initialState() {
  startWork.disabled = true;
  startBreak.disabled = true;
  pauseWork.disabled = true;
  pauseBreak.disabled = true;
  resetWork.disabled = true;
}

function displayTime() {
  minWork.textContent = `${workTime.minutes}:`;
  secWork.textContent = `0${workTime.seconds}`;
  minBreak.textContent = `${breakTime.minutes}:`;
  secBreak.textContent = `0${breakTime.seconds}`;
}

function timerValues() {
  if (selectTime.value === "25-5") shortPomodoro();

  if (selectTime.value === "45-15") longPomodoro();

  displayTime();
  startWork.disabled = false;
  pauseWork.disabled = false;
  resetWork.disabled = false;
}

function longPomodoro() {
  workTime.minutes = 45;
  workTime.seconds = 0;
  breakTime.minutes = 15;
  breakTime.seconds = 0;
}

function shortPomodoro() {
  workTime.minutes = 25;
  workTime.seconds = 0;
  breakTime.minutes = 5;
  breakTime.seconds = 0;
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
  decrementTime(time);
  time.seconds < 10
    ? (secWork.textContent = `0${time.seconds}`)
    : (secWork.textContent = time.seconds);

  minWork.textContent = `${time.minutes}:`;
  startWork.disabled = true;
}

function decrementTime(time) {
  if (time.seconds === 0) {
    time.seconds = 60;
    time.minutes--;
  }
  time.seconds--;
}

function countDownBreak(time) {
  if (time.minutes === 0 && time.seconds === 1) {
    clearInterval(breakTimer);
    startBreak.disabled = true;
    pauseBreak.disabled = true;
    resetWork.disabled = false;
    breakAudio.play();
  }
  decrementTime(time);
  time.seconds < 10
    ? (secBreak.textContent = `0${time.seconds}`)
    : (secBreak.textContent = time.seconds);

  minBreak.textContent = `${time.minutes}:`;
  startWork.disabled = true;
}

displayTime();
initialState();