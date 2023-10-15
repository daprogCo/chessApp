import React, { useContext } from "react";
import { GameContext } from './Context';
import RenderGame from "./RenderGame";
import Header from "./Header";

const App = () => {
  const { started } = useContext(GameContext);

  const game = started ? <RenderGame /> : null;

  return (
    <main className="container">
      <Header />
      {game}
    </main>
  );
}

export default App;
