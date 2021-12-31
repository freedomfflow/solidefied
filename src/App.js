import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Theme } from './contexts/ThemeContext';
import { Alert, Header } from './components';
import { HomePage, LaunchpadApplicationPage, LaunchpadPage } from './Pages';

// TODO Code for when user wants to 'COMPLETE APP'
//   - update status & show differently in sidebar
//   - send email messages to applicant & solidefied peeps in launch pad app group email
// TODO Launch pad landing page -- cards as per my desgin ideas
// TODO Create a Theme switch
// TODO fix modal styling & use theme
// TODO fix header styling & use theme
// TODO revisit login stuff to see if react-hook-form is the way to go
// TODO MAKE RESPONSIVE using sx -- replace vertical stepper with a simple one across top for mobile

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
