import Pieces from './Pieces';

class Queen extends Pieces {
    constructor(id, color, position, turn) {
      super();
      this.type = "queen";
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
        for (let i = 1; i <= 7; i++) {
          let testCol = col + (i * dir[0]);
          let testRow = row + (i * dir[1]);
          let square = this.strPos({col: testCol, row: testRow})
          if (!this.inBound(testCol) || !this.inBound(testRow)) {
            break;
          }
          if (team.includes(square)) {
            break;
          }
          arr.push(square);
          if (opp.includes(square)) {
            break;
          }
        }
      }
      return arr;
    }
}

export default Queen;