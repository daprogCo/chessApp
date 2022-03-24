class Pieces {
  constructor(type, id, color, position, turn) {
        this.moved = false;
        this.inPlay = true;
        this.teamPieces = [];
        this.opponentPieces = [];
        this.illegalMoves = [];
        this.type = type;
        this.id = id;
        this.color = color;
        this.position = position;
        this.turn = turn;
      }
      get reach() {
        return this.calcReach(this.position, this.teamPieces, this.opponentPieces);
      }
      get possibleMoves() {
        return this.reach.filter(p => !this.illegalMoves.includes(p));
      }
      objCoord(pos) {
        let coordinates = {};
        let strTest = "abcdefgh";
        for (let i = 0; i < strTest.length; i++) {
          if (pos[0] === strTest[i]) {
            coordinates.col = i + 1;
            break;
          }
        }
        coordinates.row = pos[1] * 1;
        return coordinates;
      }
      strPos(coord) {
        let str = "";
        let strTest = "abcdefgh";
        str += strTest[(coord.col - 1)];
        str += coord.row;
        return str;
      }
      inBound(value) {
        return ((value > 0) && (value < 9));
      }
}
export default Pieces;