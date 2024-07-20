import { buttonsHandler } from "./buttons.js";

const rows = 40;
const cols = 90;
const cellSize = 15;

let ticks = 100;

export const grid = new Array(rows);
export const nextGrid = new Array(rows);

function initGame() {
  initializeBoard();
  buttonsHandler();
}

function initializeBoard() {
  const table = document.getElementById("life-board");
  for (let i = 0; i < rows; i++) {
    const row = document.createElement("tr");
    grid[i] = new Array(cols);
    nextGrid[i] = new Array(cols);
    for (let j = 0; j < cols; j++) {
      const cell = document.createElement("td");
      cell.classList.add("cell");
      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.onclick = () => {
        cell.classList.toggle("alive");
        grid[i][j].alive = cell.classList.contains("alive");
      };
      grid[i][j] = { cell: cell, alive: false };
      nextGrid[i][j] = { cell: cell, alive: false };
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
}

export function resetGrid() {
  grid.forEach((row) =>
    row.forEach((cell) => {
      cell.cell.classList.remove("alive");
      cell.alive = false;
    })
  );
}

export function updateBoard() {
  grid.forEach((row) =>
    row.forEach((cell) => {
      cell.cell.classList.toggle("alive", cell.alive);
    })
  );
}

function countLiveNeighbors(row, col) {
  let count = 0;

  const neighbors = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  neighbors.forEach(([i, j]) => {
    const newRow = (row + i + rows) % rows;
    const newCol = (col + j + cols) % cols;

    if (grid[newRow][newCol].alive) count++;
  });

  return count;
}

function applyRules(row, col) {
  const liveNeighbors = countLiveNeighbors(row, col);

  // Rule 1 - Revive
  if (!grid[row][col].alive && liveNeighbors === 3) {
    nextGrid[row][col].alive = true;
  }
  // Rule 2 - Die
  else if (grid[row][col].alive && (liveNeighbors < 2 || liveNeighbors > 3)) {
    nextGrid[row][col].alive = false;
  }
  // Rule 3 - Stay Alive or remain Dead
  else {
    nextGrid[row][col].alive = grid[row][col].alive;
  }
}

export function copyGrid() {
  grid.forEach((row, i) => {
    row.forEach((_, j) => {
      grid[i][j] = { ...nextGrid[i][j] };
    });
  });
}

export function play() {
  grid.forEach((row, i) => {
    row.forEach((_, j) => {
      applyRules(i, j);
    });
  });
  copyGrid();
  updateBoard();
}

export function getTicks() {
  return ticks;
}

export function setTicks(newTicks) {
  ticks = newTicks;
}

document.addEventListener("DOMContentLoaded", initGame);
