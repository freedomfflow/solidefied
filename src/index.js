import React from 'react';
import ReactDOM from 'react-dom';
import { DAppProvider } from '@usedapp/core'
import ThemeContext from './contexts/ThemeContext';
import AppContext from './contexts/AppContext';
import './i18n';

import App from "./App";

const dappConfig = {};

ReactDOM.render(
  <React.StrictMode>
    <ThemeContext>
      <AppContext>
        <DAppProvider config={dappConfig}>
          <App />
        </DAppProvider>
      </AppContext>
    </ThemeContext>
  </React.StrictMode>,
  document.getElementById('root')
);

