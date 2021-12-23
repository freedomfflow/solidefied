import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import logo from './logo.svg';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Paper, Typography } from "@mui/material";
import { Theme } from './contexts/ThemeContext';
import { Alert, Header } from './components';

// TODO move db config to .env file
// TODO fix modal styling & use theme
// TODO fix header styling & use theme
// TODO create Pages page for launchpad landing page
// TODO create Layout launchpad after login so we have steps (vertical steps in UserSidebar)
// TODO create form for launchpad - use react-hook-form - break into sections that map to stpes in sidebar
// TODO revisit login stuff to see if react-hook-form is the way to go

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
  // const  { darkMode, setDarkMode } = Theme();
  return (
      <Providers>
        <Header />
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
        </Paper>
        <Alert />
      </Providers>
  );
}

export default App;
