import React from 'react';
import ReactDOM from 'react-dom';
import ThemeContext from './contexts/ThemeContext';
import AppContext from './contexts/AppContext';
import './i18n';

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext>
      <AppContext>
        <App />
      </AppContext>
    </ThemeContext>
  </React.StrictMode>,
  document.getElementById('root')
);

