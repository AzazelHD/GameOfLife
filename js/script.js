document.addEventListener("DOMContentLoaded", () => {
  const gameBoard = document.getElementById("game-board");
  const startButton = document.getElementById("start");
  const pauseButton = document.getElementById("pause");
  const resetButton = document.getElementById("reset");
  let cells = [];
  let interval;

  const createBoard = () => {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.addEventListener("click", () => {
        cell.classList.toggle("alive");
      });
      gameBoard.appendChild(cell);
      cells.push(cell);
    }
  };

  const getNextState = () => {
    return cells.map((cell, i) => {
      const isAlive = cell.classList.contains("alive");
      const neighbors = getAliveNeighbors(i);
      if (isAlive && (neighbors === 2 || neighbors === 3)) return true;
      if (!isAlive && neighbors === 3) return true;
      return false;
    });
  };

  const getAliveNeighbors = (index) => {
    const row = Math.floor(index / 10);
    const col = index % 10;
    let aliveCount = 0;
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        if (r === 0 && c === 0) continue;
        const neighborRow = row + r;
        const neighborCol = col + c;
        if (
          neighborRow >= 0 &&
          neighborRow < 10 &&
          neighborCol >= 0 &&
          neighborCol < 10
        ) {
          const neighborIndex = neighborRow * 10 + neighborCol;
          if (cells[neighborIndex].classList.contains("alive")) {
            aliveCount++;
          }
        }
      }
    }
    return aliveCount;
  };

  const updateBoard = () => {
    const nextState = getNextState();
    cells.forEach((cell, i) => {
      if (nextState[i]) {
        cell.classList.add("alive");
      } else {
        cell.classList.remove("alive");
      }
    });
  };

  startButton.addEventListener("click", () => {
    interval = setInterval(updateBoard, 1000);
  });

  pauseButton.addEventListener("click", () => {
    clearInterval(interval);
  });

  resetButton.addEventListener("click", () => {
    cells.forEach((cell) => cell.classList.remove("alive"));
  });

  createBoard();
});
