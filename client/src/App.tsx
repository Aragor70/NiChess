import React from 'react';
import Game from './interface/Game';

const App = () => {
  return (
    <div className="App">
      <header className="header-content">
        <p className="page-title">Chess</p>
      </header>

      <main className="output">
          <Game />
      </main>

    </div>
  );
}

export default App;
