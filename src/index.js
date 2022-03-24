import React from 'react';
import ReactDOM from 'react-dom';

import { ChessGame } from './components/Context';
import App from './components/App';
import './index.css';

ReactDOM.render(
  <ChessGame>
    <App />
  </ChessGame>, 
  document.getElementById('root')
);
