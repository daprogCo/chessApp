import Pieces from './Pieces';

class Knight extends Pieces {
  constructor(id, color, position, turn) {
    super();
    this.type = "knight";
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
    let pattern = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
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
}

export default Knight;