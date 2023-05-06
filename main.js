const workTime = 25 * 60;
const breakTime = 5 * 60;

let timeLeft = workTime;
let timerInterval;
var stopped = true;

const timerDisplay = document.querySelector(".timer-display");
const timerLabel = document.querySelector(".timer-label");
const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");
const stopbutton = document.querySelector(".stop-button");

function startTimer() {
  timerInterval = setInterval(() => {
    if (stopped) {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft === 0) {
        timeLeft = breakTime;
        let breakTimer = setInterval(() => {
          timeLeft--;
        });
        const audio = new Audio("Alarme Magique.mp3");
        audio.play();

        if (timerLabel.textContent === "Work") {
          timerLabel.textContent = "Break";
          timeLeft = breakTime;
        } else {
          timerLabel.textContent = "Work";
          timeLeft = workTime;
        }
        setTimeout(() => {
          startTimer();
        }, 1000);
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = workTime;
  // timerLabel.textContent = "Work";
  updateTimerDisplay();
  stopped = true;
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

function stopTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  stopped = !stopped;
  stopped ? (stopbutton.innerHTML = "Stop") : (stopbutton.innerHTML = "Run");
}
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
stopbutton.addEventListener("click", stopTimer);
