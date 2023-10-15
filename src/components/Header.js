import React, { useContext } from 'react';
import { GameContext } from "./Context";
import StartMenu from "./StartMenu";

const Header = () => {
  const { started } = useContext(GameContext);
  const buttons = !started ? <StartMenu /> : null;
  return (
    <header>
      <h1>Play Chess</h1>
      {buttons}
      <hr/>
    </header>
  );
}

export default Header;