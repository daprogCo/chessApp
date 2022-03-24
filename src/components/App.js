import React from 'react';
import RenderBoard from "./RenderBoard";
import Header from "./Header";

const App = () => {
  return (
    <main className="container">
      <Header />
      <main className="page">
        <RenderBoard />
        <nav id="buttons"></nav>
        <aside id="coups"></aside>
      </main>
    </main>
  );
}

export default App;
