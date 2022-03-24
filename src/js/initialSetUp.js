import Knight from "./PiecesClasses/Knight";
import Bishop from "./PiecesClasses/Bishop";
import King from "./PiecesClasses/King";
import Queen from "./PiecesClasses/Queen";
import Pawn from "./PiecesClasses/Pawn";
import Rook from "./PiecesClasses/Rook";

let createInitialSetUp = () => {
    let pieces = [];
    for (let i = 1; i <= 32; i++) {
      let color = "black";
      let turn = false;
      if (i < 17) {
        color = "white";
        turn = true;
      }
      let position = "";
      if (i <= 8) {
        position += "abcdefgh"[i - 1] + "2";
        pieces.push(new Pawn(i, color, position, turn));
      } else if ((i > 16) && (i <= 24)) {
        position += "abcdefgh"[i - 17] + "7";
        pieces.push(new Pawn(i, color, position, turn));
      } else {
        if (i > 24) {
          position += "abcdefgh"[i-25] + "8";
        } else {
          position += "abcdefgh"[i-9] + "1";
        }
        if ((i === 9) || (i === 16) || (i === 25) || (i === 32)) {
          pieces.push(new Rook(i, color, position, turn));
        } else if ((i === 10) || (i === 15) || (i === 26) || (i === 31)) {
          pieces.push(new Knight(i, color, position, turn));
        } else if ((i === 11) || (i === 14) || (i === 27) || (i === 30)) {
          pieces.push(new Bishop(i, color, position, turn));
        } else if ((i === 12) || (i === 28)) {
          pieces.push(new Queen(i, color, position, turn));
        } else {
          pieces.push(new King(i, color, position, turn));     
        }
      }
    }
    return pieces;
  }
  
let initialSetUp = createInitialSetUp();

export default initialSetUp;