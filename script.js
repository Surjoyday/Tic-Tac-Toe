const CIRCLE_CLASS = "circle";
const X_CLASS = "x";

const board = document.getElementById("board");

const cellElements = document.querySelectorAll("[data-cell]");

const winningScreen = document.getElementById("winningMessage");

const winningText = document.querySelector("[data-winning-message-text]");

const restartBtn = document.getElementById("restartButton");

const WINNING_COMBINATIONS = [
  // row
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // column
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn;

function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();

  winningScreen.classList.remove("show");
}

startGame();

function handleClick(e) {
  const cell = e.target;

  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  placeMarker(cell, currentClass);

  if (checkWinner(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function placeMarker(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(CIRCLE_CLASS);
  board.classList.remove(X_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function checkWinner(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningText.innerText = "Draw!";
  } else {
    winningText.innerText = `${circleTurn ? "O" : "X"}'s Wins!`;
  }
  winningScreen.classList.add("show");
}

function isDraw() {
  return Array.from(cellElements).every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// RESTART

restartBtn.addEventListener("click", () => {
  startGame();
});
