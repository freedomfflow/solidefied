import React, {Suspense} from 'react';
import {BrowserRouter} from 'react-router-dom';
import logo from './logo.svg';
import {ThemeProvider} from "@mui/material/styles";
import {CssBaseline, GlobalStyles, Paper} from "@mui/material";
import {theme } from './libs/ui';

const Providers = ({children}) => {
  return (
      <BrowserRouter>
        <Suspense fallback={null}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Suspense>
      </BrowserRouter>
  );
};


let style = {
  container: {
    backgroundColor: 'green',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    color: 'white'
  }
}

function App() {
  return (
      <Providers>
        <Paper sx={style.container}>
          <header>
            <img src={logo} className="App-logo" alt="logo"/>
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </Paper>
      </Providers>
  );
}

export default App;
