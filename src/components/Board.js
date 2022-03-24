import React, { useContext } from "react";
import { GameContext } from './Context';
import Square from "./Square";

function boardConfig(side) {
    let config = [];
    for (let i = 0; i < side.numbers.length; i++) {
        let black = true;
        if(i === 0 || i % 2 === 0) {
            black = false;
        }
        for (let j = 0; j < side.letters.length; j++) {
            config.push({
                id: side.letters[j].toLowerCase() + side.numbers[i],
                color: black ? "blackCase" : "whiteCase"
            });
            black = !black;
        }
    }
    return config;
}

const Board = () => {
    const { board } = useContext(GameContext);
    return(
        boardConfig(board).map( (square) =>
        <Square
            color={square.color}
            id={square.id}
            key={square.id}
        />)
    );
}

export default Board;