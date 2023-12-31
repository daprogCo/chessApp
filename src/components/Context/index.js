import React, { useState } from 'react';
import Game from "../../js/Game.js";

export const GameContext = React.createContext({});

export const ChessGame = props => {
  const [white, setWhite] = useState(true);
  const [game, setGame] = useState(new Game());
  const [started, setStarted] = useState(false);
  const [activePiece, setActivePiece] = useState(false);
  const [pieceId, setPieceId] = useState(null);
  const [moving, setMoving] = useState(null);
  
  game.updateBoard();
  if (!activePiece && moving && started) {     
    game.move(game.pieces[pieceId - 1], moving);
  }

  const startGame = () => {
    setStarted(true);
  }

  const changePlayer = choice => {
    if (choice) {
      setWhite(true); 
    } else {
      setWhite(false);
    }
  }

  const activatePossibMoves = id => {
    setActivePiece(true);
    setPieceId(id);
    setMoving(null);
  }

  const activateMoving = square => {
    setActivePiece(false);
    setMoving(square.toLowerCase());
  }

  return (
  <GameContext.Provider value={{
    started: started,
    player: white,
    board: {
      letters: white
      ? ["A", "B", "C", "D", "E", "F", "G", "H"] 
      : ["H", "G", "F", "E", "D", "C", "B", "A"],
      numbers: white
      ? ["8", "7", "6", "5", "4", "3", "2", "1"] 
      : ["1", "2", "3", "4", "5", "6", "7", "8"],
      possibMoves: activePiece
    },
    pieces: game.onBoard,
    actions: {
      possibMoves: activatePossibMoves,
      moving: activateMoving,
      chooseColor: changePlayer,
      startGame: startGame
    }
  }}>
    {props.children}
  </GameContext.Provider>
  );
}
