const board = document.getElementById("game-board");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset-button");

let cells = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function createBoard() {
  board.innerHTML = "";
  cells.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.setAttribute("data-index", index);
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", handleCellClick);
    board.appendChild(cellDiv);
  });
}

function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombos.some(combo => {
    return combo.every(index => cells[index] === currentPlayer);
  });
}

resetButton.addEventListener("click", () => {
  cells = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  createBoard();
});

// Initialize the board on page load
createBoard();
statusText.textContent = `Player ${currentPlayer}'s turn`;