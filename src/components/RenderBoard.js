import React, { useContext } from 'react';
import { GameContext } from './Context';
import Board from "./Board";

const Letter = (props) => {
  return (
    <li><p>{ props.value }</p></li>
  );
}

const Numbers = (props) => {
  return (
    <div className="number"><p>{ props.value }</p></div>
  );
}

const RenderBoard = () => {
  const { board } = useContext(GameContext);

  return (
    <main className="container-game">
      <div className="game-board">
        <div className="top-edge">
          <ul>
            {board.letters.map(letter =>
              <Letter
                value={letter}
                key={letter}
              />
            )}
          </ul>
        </div>
        <div className="left-edge">
          {board.numbers.map(number => 
            <Numbers
              value={number}
              key={number}
            />
          )}
        </div>
        <div className="board">
              <Board />
        </div>
        <div className="right-edge"></div>
        <div className="bottom-edge"></div>
        </div>
    </main>
  );
}

export default RenderBoard;