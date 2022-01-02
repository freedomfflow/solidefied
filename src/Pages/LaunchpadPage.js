import React from 'react';
import { Box } from '@mui/material';
import { AppState } from '../contexts/AppContext';
import { LPGetStarted, LPProjectSummary } from '../forms';

// TODO set up cards??
//   If not logged in
//    - Get started button - explainer text about initiating application, N steps, step 1 to create account or log
//    - View My Applications - text -> if you have existing applications, you can view or edit
//    - View applications I am whitelisted to - will need to create acct or login, and we will show projects they are WL to
//    - View a list of pulbic launch pad projects - filter by active, pending..??
//    - If a potential project investor, sign up or login to view rejected LP projects seeking investment outside LP

let style = {
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
}
const LaunchpadPage = () => {
  const {user, appList} = AppState();
  return (
      <>
        <h3> LAUNCH PAD PAGE</h3>
        <Box sx={{...style.cardContainer}}>
          {!user && (
              <>
                <LPGetStarted />
                <LPGetStarted />
              </>
          )}
          {appList.filter((app) => app.application.appStatus === 'submitted').map(submittedApp => (
              <LPProjectSummary app={submittedApp} key={submittedApp.application.appId} />
            ))
          }
        </Box>
      </>
  );
};

export default LaunchpadPage;
