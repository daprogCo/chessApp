import React, { useContext } from "react";
import { GameContext } from './Context';
import RenderBoard from "./RenderBoard";

const RenderGame = () => {
    return (
        <main className="page">
            <RenderBoard /> 
            <nav id="buttons"></nav>
            <aside id="coups"></aside>
        </main>
    );
}

export default RenderGame;