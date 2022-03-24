import React, { useContext } from "react";
import bishopBlack from "../images/bishopBlack.svg";
import bishopWhite from "../images/bishopWhite.svg";
import kingBlack from "../images/kingBlack.svg";
import kingWhite from "../images/kingWhite.svg";
import knightBlack from "../images/knightBlack.svg";
import knightWhite from "../images/knightWhite.svg";
import pawnBlack from "../images/pawnBlack.svg";
import pawnWhite from "../images/pawnWhite.svg";
import queenBlack from "../images/queenBlack.svg";
import queenWhite from "../images/queenWhite.svg";
import rookBlack from "../images/rookBlack.svg";
import rookWhite from "../images/rookWhite.svg";
import { GameContext } from './Context';

const pieces = {
    "bishop-black": bishopBlack,
    "bishop-white": bishopWhite,
    "king-black": kingBlack,
    "king-white": kingWhite,
    "knight-black": knightBlack,
    "knight-white": knightWhite,
    "pawn-black": pawnBlack,
    "pawn-white": pawnWhite,
    "queen-black": queenBlack,
    "queen-white": queenWhite,
    "rook-black": rookBlack,
    "rook-white": rookWhite
}

const Piece = (props) => {
    const { board, actions } = useContext(GameContext);
    
    var onClick = () => {
        if (!board.possibMove) {
            return (props.turn) ? actions.possibMoves(props.id) : null;
        }
        return null
    }
    return (
        <div className="pieces" onClick={() => onClick()}>
            <img
                className={props.type}
                src={pieces[props.type + "-" + props.color]}
                alt={props.color + " " + props.type}
            />
        </div>            
    );

}


export default Piece;