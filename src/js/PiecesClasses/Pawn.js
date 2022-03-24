import Pieces from './Pieces';

class Pawn extends Pieces {
    constructor(id, color, position, turn) {
      super();
      this.type = "pawn";
      this.id = id;
      this.color = color;
      this.position = position;
      this.turn = turn;
      this.enPassant = null;
    }
    get direction() {
      if (this.color === "white") {
        return 1;
      } else {
        return -1;
      }
    }
    calcReach(pos, team, opp) {
      if (pos === null) {
        return null;
      }
      let arr = [];
      let {col, row} = this.objCoord(pos);
      let allPieces = opp.concat(team);
      if (this.inBound(row + this.direction) && !allPieces.includes(this.strPos({col: col, row: row + this.direction}))) {
        arr.push(this.strPos({col: col, row: row + this.direction}));
        if (!this.moved && !allPieces.includes(this.strPos({col: col, row: row + (2* this.direction)}))) {
          arr.push(this.strPos({col: col, row: row + (2 * this.direction)}));    
        }
      }
      let test = this.strPos({col: col + 1, row: row + this.direction});
      if (this.inBound(col + 1) && opp.includes(test)) {
        arr.push(test);
      }
      test = this.strPos({col: col - 1, row: row + this.direction});
      if (this.inBound(col - 1) && opp.includes(test)) {
        arr.push(test);
      }
      return arr;
    }
  }

export default Pawn;