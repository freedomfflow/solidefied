import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Theme } from './contexts/ThemeContext';
import { Alert, Header } from './components';
import { HomePage, LaunchpadApplicationPage, LaunchpadPage } from './Pages';

// TODO move db config to .env file
// TODO fix modal styling & use theme
// TODO fix header styling & use theme
// TODO create Pages page for launchpad landing page
// TODO create Layout launchpad after login so we have steps (vertical steps in UserSidebar)
// TODO create form for launchpad - use react-hook-form - break into sections that map to stpes in sidebar
// TODO revisit login stuff to see if react-hook-form is the way to go
// TODO MAKE RESPONSIVE using sx

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

function App() {
  return (
      <Providers>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} exact />
          <Route path='/launchpad' element={<LaunchpadPage />} />
          <Route path='/launchpad/application' element={<LaunchpadApplicationPage />} />
        </Routes>
        <Alert />
      </Providers>
  );
}

export default App;
