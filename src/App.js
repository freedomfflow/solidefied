import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Paper, Typography, FormControlLabel, Switch } from "@mui/material";
import { Theme } from './ThemeContext';

const Providers = ({children}) => {
  const  { activeTheme } = Theme();

  return (
      <BrowserRouter>
        <Suspense fallback={null}>
          <ThemeProvider theme={activeTheme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </Suspense>
      </BrowserRouter>
  );
};


let style = {
  container: {
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
  const  { darkMode, setDarkMode } = Theme();
  return (
      <Providers>
        <Paper sx={style.container}>
          <header>
            <img src={logo} className="App-logo" alt="logo"/>
            <Typography color='primary.main' sx={{fontWeight: 'bold'}}>
              Edit <code>src/App.js</code> and save to reload.
            </Typography>
            <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
          <FormControlLabel control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />} label="Dark Mode" />
        </Paper>
      </Providers>
  );
}

export default App;
