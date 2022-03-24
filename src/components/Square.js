import React, { useContext } from "react";
import { GameContext } from './Context';
import Piece from "./Piece"

const Square = (props) => {
    const { pieces, board, actions } = useContext(GameContext);

    const pieceComponent = () => {
        for (let i = 0; i < pieces.length; i++) {
            if (pieces[i].position === props.id.toLowerCase()) {
                return (
                    <Piece 
                        type={pieces[i].type} 
                        color={pieces[i].color}
                        turn={pieces[i].turn}
                        reach={pieces[i].possibleMoves}
                        moved={pieces[i].moved}
                        id={pieces[i].id}
                    />
                );       
            }
        }
        return null;
    }

    const onClick = () => {
        if (board.possibMoves) {
            return ( 
                actions.moving(props.id) 
            ); 
        }
        return null;
    }
    
    return (
        <div className={props.color} id={props.id} onClick={() => onClick()}>
        {pieceComponent()}
        </div>);               
}  

export default Square;