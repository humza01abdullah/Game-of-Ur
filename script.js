"use strict";
window.onload = function () {
  // Setting Game Start State \\

  class BoardTiles {
    constructor(id, permission, occupied, piece) {
      this.id = id;
      this.permission = permission;
      this.occupied = occupied;
      this.piece = piece;
    }
  }

  let bluePath = [];
  let redPath = [];

  bluePath.push(new BoardTiles(`blue-start`, `blue`, true, null));
  redPath.push(new BoardTiles(`red-start`, `red`, true, null));
  for (let i = 1; i <= 4; i++) {
    bluePath.push(new BoardTiles(`blue-${i}`, `blue`, false, null));
    redPath.push(new BoardTiles(`red-${i}`, `red`, false, null));
  }

  for (let i = 5; i <= 12; i++) {
    const tempObj = new BoardTiles(`mid-${i}`, `both`, false, null);

    bluePath.push(tempObj);
    redPath.push(tempObj);
  }

  for (let i = 13; i <= 14; i++) {
    bluePath.push(new BoardTiles(`blue-${i}`, `blue`, false, null));
    redPath.push(new BoardTiles(`red-${i}`, `red`, false, null));
  }
  bluePath.push(new BoardTiles(`blue-end`, `blue`, false, []));
  redPath.push(new BoardTiles(`red-end`, `red`, false, []));

  class BoardPiece {
    constructor(id, status, tile) {
      this.id = id;
      this.status = status;
      this.tile = tile;
    }
  }

  let bluePieces = [];
  let redPieces = [];

  for (let i = 1; i <= 7; i++) {
    bluePieces.push(new BoardPiece(`blue${i}`, "waiting", bluePath[0]));
    redPieces.push(new BoardPiece(`red${i}`, "waiting", redPath[0]));
  }

  bluePath[0].piece = bluePieces;
  redPath[0].piece = redPieces;

  let blueWaiting = 7;
  let blueRacing = 0;
  let blueFinished = 0;

  let redWaiting = 7;
  let redRacing = 0;
  let redFinished = 0;

  let currentPlayer = "blue";

  // Gameplay loop \\

  let btnRoll = document.querySelector(`.${currentPlayer}-dice`);
  let diceEl = document.getElementById(`${currentPlayer}-dice-roll`);

  btnRoll.addEventListener("click", function () {
    // btnRoll.classList.add("hidden"); //NOTE uncomment to allow only one roll
    const dice = diceRoll();
    diceEl.textContent = dice;

    const diceValue = countOnes(dice);

    if (diceValue == 0) {
      //NOTE add this as second if condition after 0 dice rolls swaps player: && !isPossibleMove(currentPlayer)
      //TODO Swap player if current player cant play
    } else {
      //TODO player makes a move
    }

    // Check for endgame
    if (blueFinished == 7 || redFinished == 7) {
      document
        .querySelector(`.${currentPlayer}-side .dice`)
        .classList.add("hidden");
      document.querySelector(".title").textContent =
        currentPlayer == "blue" ? "BLUE 🏆" : "RED 🏆";
    }
  });

  // Functions Used

  function diceRoll() {
    let binary = "";
    for (let i = 0; i < 4; i++) {
      binary += Math.floor(Math.random() * 2);
      if (i < 3) {
        binary += " ";
      }
    }
    return binary.trim();
  }

  function countOnes(diceValue) {
    let count = 0;
    for (let i = 0; i < diceValue.length; i++) {
      if (diceValue.charAt(i) === "1") {
        count++;
      }
    }
    return count;
  }

  function isPossibleMove(currentPlayer) {
    //TODO returns true if the player has a possible move to make
    return true; //NOTE just to create moving piece first
  }
};
