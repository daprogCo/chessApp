import Pieces from './Pieces';

class King extends Pieces {
    constructor(id, color, position, turn) {
      super();
      this.type = "king";
      this.id = id;
      this.color = color;
      this.position = position;
      this.turn = turn;
    }
    calcReach(pos, team, opp) {
      if (pos === null) {
        return null;
      }
      let arr = [];
      let {col, row} = this.objCoord(pos);
      let pattern = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]];
      for (let dir of pattern) {
        let testCol = col + (dir[0]);
        let testRow = row + (dir[1]);
        let square = this.strPos({col: testCol, row: testRow})
        if (!this.inBound(testCol) || !this.inBound(testRow)) {
          continue;
        }
        if (team.includes(square)) {
          continue;
        }
        arr.push(square);
      }
      return arr;
    }
    /*move(pos) {
      if (this.possibleMoves.includes(pos) && this.turn) {
        if (this.opponentPieces.includes(pos)) {
          game.capture(pos);
        }
        this.position = pos;
        this.moved = true;
        game.changeTurn();
        game.endGame();
      } else if (this.turn && !game.inCheck && ((this.color === "white" && (pos === "c1" || pos === "g1")) || (this.color === "black" && (pos === "c8" || pos === "g8")))) {
        game.castle(pos);
        this.moved = true;
        game.changeTurn();
        game.endGame();
      } else {
        console.log("invalid move");
      }
    }*/
  }

export default King;