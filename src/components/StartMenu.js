import React, { useContext } from "react";
import { GameContext } from './Context';

const StartMenu = () => {
    const { actions } = useContext(GameContext);

    const chooseColor = color => {
        return actions.chooseColor(color);
    }

    const startGame = () => {
        return actions.startGame();
    }

    return (
        <div>
            <div>
                <p>Choose the color you want to play</p>
                <button className="button-54" onClick={() => chooseColor(true)}>
                    <p>White</p>
                </button>
                <button className="button-54" onClick={() => chooseColor(false)}>
                    <p>Black</p>
                </button>
            </div>
            <div>
                <button className="button-24" onClick={() => startGame()}>
                    <p>Start playing</p>
                </button>
            </div>
        </div>
    );
}

export default StartMenu;