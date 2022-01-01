import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { Theme } from './contexts/ThemeContext';
import { Alert, Header } from './components';
import { HomePage, LaunchpadApplicationPage, LaunchpadPage } from './Pages';

// TODO Style project list  - show status and navigate accordingly
// TODO Copy menu formatting from yfdai site
// TODO Add carousel to display crypto assets
//      - link brings up page with chart
// TODO Generate a page from launchpad data
// TODO Work on Launchpad page
//   - use some content from white paper
//   - need WL soln - where user can add WL uids and/or wallet or nft addresses
// TODO add notes to an app - keyed by user_id
// TODO - STARTED - Code for when user wants to 'COMPLETE APP'
//   - update status & show differently in sidebar
//   - send email messages to applicant & solidefied peeps in launch pad app group email
// TODO -STARTED - Launch pad landing page -- cards as per my desgin ideas
// TODO Add marquee with admin ui to manage content
// TODO -DONE - Email - figure out how to send
// TODO - Get access to slack to generate api key and post msgs to slack from website
//      - https://medium.com/trabe/build-and-post-messages-to-slack-using-javascript-and-the-slack-api-55c9b4f43ae7
// TODO - DONE - Create a Theme switch
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
