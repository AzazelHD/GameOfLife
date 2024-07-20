import { grid, resetGrid, play, getTicks, setTicks } from "./script.js";

let playing = false;
let timer;

export function buttonsHandler() {
  const startButton = document.getElementById("start");
  const clearButton = document.getElementById("clear");
  const randomButton = document.getElementById("random");
  const speedSlider = document.getElementById("speed");
  const speedValue = document.getElementById("speed-value");

  speedSlider.value = 100;
  console.log(speedSlider.value);
  speedValue.textContent = `${speedSlider.value} ms`;

  function updateSpeed(newTicks) {
    setTicks(newTicks);
    speedValue.textContent = `${newTicks} ms`;
    if (playing) {
      clearInterval(timer);
      timer = setInterval(play, getTicks());
    }
  }

  startButton.onclick = function () {
    playing = !playing;
    randomButton.disabled = true;
    if (playing) {
      startButton.innerHTML = "Pause";
      timer = setInterval(play, getTicks());
    } else {
      startButton.innerHTML = "Continue";
      clearInterval(timer);
    }
  };

  clearButton.onclick = function () {
    playing = false;
    randomButton.disabled = false;
    startButton.innerHTML = "Start";
    clearInterval(timer);
    resetGrid();
  };

  randomButton.onclick = function () {
    grid.forEach((row) => {
      row.forEach((cell) => {
        cell.alive = Math.random() < 0.37;
        cell.cell.classList.toggle("alive", cell.alive);
      });
    });
  };

  speedSlider.oninput = function () {
    const newTicks = parseInt(this.value, 10);
    updateSpeed(newTicks);
  };
}
