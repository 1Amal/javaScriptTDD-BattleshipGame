export { Gameboard };

class Gameboard {
  constructor() {
    this.board = this.createBoard();
  }

  createBoard() {
    this.gameBoardSize = {
      X: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
      Y: [null, null, null, null, null, null, null, null, null, null],
    };
    const newBoard = {};
    for (let i = 0; i < this.gameBoardSize.X.length; i++) {
      newBoard[this.gameBoardSize.X[i]] = [...this.gameBoardSize.Y];
    }
    return newBoard;
  }

  gameBoardStatus() {
    return this.board;
  }

  placeShips(ship, rowStartCords, columnStartCords) {
    this.ship = ship;
    this.rowStartCords = rowStartCords;
    this.columnStartCords = columnStartCords;

    if (
      this.board[this.rowStartCords][this.columnStartCords] === null &&
      this.board[this.rowStartCords][
        this.columnStartCords + this.ship.shipLength
      ] === null &&
      this.columnStartCords + this.ship.shipLength <= 9 &&
      this.columnStartCords >= 0
    ) {
      for (let i = 0; i < this.ship.shipLength; i++) {
        this.board[this.rowStartCords][this.columnStartCords + i] = this.ship;
      }
      return this.board;
    } else {
      return "Error location occupied or out of bounds";
    }
  }

  receiveAttack(rowAttack, columnAttack) {
    this.rowAttack = rowAttack;
    this.columnAttack = columnAttack;

    if (this.board[this.rowAttack][this.columnAttack] == null) {
      this.board[this.rowAttack][this.columnAttack] = "Hit";
    } else {
      this.shipAtLocation = this.board[this.rowAttack][this.columnAttack];
      this.shipAtLocation.hit();
    }
  }

  allShipsHealth() {
    this.shipCount = 10;
    let sunkShipCount = new Set();

    for (const row of Object.values(this.board)) {
      row.forEach((ship) => {
        if (ship && ship.shipSunk === true) {
          sunkShipCount.add(ship);
        }
      });
    }

    return this.shipCount - sunkShipCount.size;
  }

  computerPlayerSelectionLogic() {}
}
