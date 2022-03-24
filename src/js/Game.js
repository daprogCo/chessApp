import Knight from "./PiecesClasses/Knight";
import Bishop from "./PiecesClasses/Bishop";
import Queen from "./PiecesClasses/Queen";
import Rook from "./PiecesClasses/Rook";
import initialSetUp from "./initialSetUp"
  
class Game {
  constructor(pieces = initialSetUp){
    this.history = [];
    this.pieces = pieces;
  }
  get onBoard(){
    return this.pieces.filter(p => p.inPlay);
  }
  get active() {
    return this.onBoard.filter(p => p.turn);
  }
  get inactive() {
    return this.onBoard.filter(p => !p.turn);
  }
  get blackPieces() {
    return this.onBoard.filter(p => (p.color === "black")).map(p => p.position);
  }
  get whitePieces() {
    return this.onBoard.filter(p => (p.color === "white")).map(p => p.position);
  }
  get activeKing() {
    return this.active.filter(p => p.type === "king")[0];
  }
  get inCheck() {
    return this.check(this.activeKing.position, this.inactive.map(p => p.reach));
  }
  endGame() {
    if (!this.active.some(p => p.possibleMoves.length !== 0)) {
      if (this.inCheck) {
        console.log("Checkmate");
      } else {
        console.log("Stalemate")
      }
    }
  }
  changeTurn() {
    this.onBoard.forEach(element => {
      element.turn = !element.turn;
    });
    this.updateBoard();
    this.active.filter(p => p.type === "pawn").forEach(element => {
      element.enPassant = null;
    });
  }
  updateBoard() {
    this.onBoard.forEach(element => {
      element.teamPieces = (element.color === "white") ? this.whitePieces : this.blackPieces;
      element.opponentPieces = (element.color === "black") ? this.whitePieces : this.blackPieces;
    });
    this.onBoard.forEach(element => {
      element.illegalMoves = this.illegalMoves(element);
    });
  }
  move(piece, pos) {
    let arr =  [piece.id, pos];
    if (piece.possibleMoves.includes(pos) && piece.turn) {
      if (piece.opponentPieces.includes(pos)) {
        this.capture(pos);
      }
      if (piece.type === "pawn" && !piece.moved) {
        if(pos[0] === piece.position[0]) {
          piece.enPassant = pos[0] + (Number(piece.position[1]) + piece.direction);
        } 
      }
      if (piece.type === "pawn" && Number(pos[1]) + piece.direction === 0 || Number(pos[1]) + piece.direction === 9) {
        piece.position = pos;
        this.pawnPromotion(piece);
        this.changeTurn();
        this.endGame();
      } else {
        piece.position = pos;
        piece.moved = true;
        this.changeTurn();
        this.endGame();
      }
      this.updateHistory(arr);
      return arr;
    } else if (piece === this.activeKing && !this.inCheck && ((piece.color === "white" && (pos === "c1" || pos === "g1")) || (piece.color === "black" && (pos === "c8" || pos === "g8")))) {
      this.castle(pos);
      this.updateHistory(arr);
      return arr;
    } else if (piece.type === "pawn" && this.inactive.filter(p => p.type === "pawn").some(p => p.enPassant === pos)) {
      let dir = piece.direction;
      let coord = piece.objCoord(pos);
      let test = [
        {col: coord.col + 1, row: coord.row - dir},
        {col: coord.col - 1, row: coord.row - dir}
      ];
      if (test.some(p => piece.strPos(p) === piece.position)) {
        this.capture(
          this.inactive.filter(p => p.enPassant === pos)[0].position
        );
        piece.position = pos;
        piece.moved = true;
        this.changeTurn();
        this.endGame();
        this.updateHistory(arr);
        return arr;
      }
    } else {
      console.log("invalid move");
      return false;
    }
  }
  check(kingPos, oppReach) {
    return oppReach.some(p => p.includes(kingPos));
  }
  capture(pos) {
    this.inactive.filter(p => p.position === pos).forEach(obj => {
      obj.inPlay = false;
      obj.position = null;
    });
  }
  illegalMoves(piece) {
    let arr = [];
    if (piece.turn){
      for (let move of piece.reach) {
        let testOpp = piece.teamPieces.filter(p => p !== piece.position);
        testOpp.push(move);
        let testPossMoves = this.inactive.filter(p => p.position !== move).map(p => p.calcReach(p.position, p.teamPieces.filter(p => p !== move),testOpp));
        let kingPos = this.activeKing.position;
        if (piece.type === "king") {
          kingPos = move;  
        }
        if (this.check(kingPos, testPossMoves)) {
          arr.push(move);
        }
      }
    }
    return arr;
  }
  castle(pos) {
    if (this.activeKing.moved) {
      console.log("invalid move");
    } else {
      let rook, noCheck, empty, rookMoved;
      if (this.activeKing.color === "white") {
        if (pos === "c1") {
          rook = this.pieces[8];
          noCheck = ["c1", "d1"];
          empty = ["b1", "c1", "d1"];
          rookMoved = "d1";
        } else {
          rook = this.pieces[15];
          noCheck = ["f1", "g1"];
          empty = noCheck;
          rookMoved = "f1";
        }
      } else {
        if (pos === "c8") {
          rook = this.pieces[24];
          noCheck = ["c8", "d8"];
          empty = ["b8", "c8", "d8"];
          rookMoved = "d8";
        } else {
          rook = this.pieces[31];
          noCheck = ["f8", "g8"];
          empty = noCheck;
          rookMoved = "f8";
        }
      }
      if (!rook.inPlay && rook.moved) {
        console.log("invalid move")
      } else {
        if (!this.onBoard.map(p => p.position).some(p => empty.includes(p)) && !noCheck.some(p => this.check(p, this.inactive.map(p => p.reach)))) {
          this.activeKing.position = pos;
          this.activeKing.moved = true;
          rook.position = rookMoved;
          rook.moved = true;
          this.changeTurn();
          this.endGame();
        } else {
          console.log("invalid move")
        }
      }
    }
  }
  pawnPromotion(pawn, choice = "queen") {
    let promoted;
    if (choice === "queen") {
      promoted = new Queen(pawn.id, pawn.color, pawn.position, pawn.turn);
    } else if (choice === "rook") {
      promoted = new Rook(pawn.id, pawn.color, pawn.position, pawn.turn);
    } else if (choice === "bishop") {
      promoted = new Bishop(pawn.id, pawn.color, pawn.position, pawn.turn);
    } else {
      promoted = new Knight(pawn.id, pawn.color, pawn.position, pawn.turn);
    }
    promoted.moved = true;
    this.pieces.splice((pawn.id - 1), 1, promoted);
  }
  updateHistory(move) {
    this.history.push(move);
    console.log(this.history);
  }
}
  
export default Game;
