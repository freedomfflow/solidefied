import React from 'react';
import { Box, Typography } from '@mui/material';
import { AppState } from '../contexts/AppContext';
import { LPCarousel, LPGetStarted, LPProjectSummary } from '../forms';

// TODO set up cards??
//   If not logged in
//    - Get started button - explainer text about initiating application, N steps, step 1 to create account or log
//    - View My Applications - text -> if you have existing applications, you can view or edit
//    - View applications I am whitelisted to - will need to create acct or login, and we will show projects they are WL to
//    - View a list of pulbic launch pad projects - filter by active, pending..??
//    - If a potential project investor, sign up or login to view rejected LP projects seeking investment outside LP

let style = {
  temp: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: 6,
  },
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
        <Box sx={style.temp}>
          <Typography variant='h4'> LAUNCH PAD PAGE</Typography>
            <p>
              If not logged in, we have a 'Get started' CTA and list benefits of Launchpad project. <br />
              If a user is logged in, we show applications/projects a user has already submitted.<br />
              It's built assuming a person might be associated with more than one appliation/project, <br />either as a
              principal or an investor, so depending on user role and given project, they'd possibly see more than one project
              here
            </p>
            <p>We can determine what actions are appropriate, if any for a status which include:
              <br/>
              ......Pending, Submitted, Under Review, Rejected, PreLaunch, Active Funding, Launched
            </p>
            <p>The 'Launchpad Tracker' will show a price status (from coingecko??) for all coins launched from
              solidefied, <br />but of course now I'm just showing other coins</p>
            <p>We can show the tracker all the time</p>
        </Box>
        <Box sx={{...style.cardContainer}}>
          {!user && (
              <>
                <LPGetStarted/>
                <LPGetStarted/>
              </>
          )}
          {user && appList.filter((app) => app.application.appStatus === 'submitted').map(submittedApp => (
              <LPProjectSummary app={submittedApp} key={submittedApp.application.appId}/>
          ))
          }
          <LPCarousel/>
        </Box>
      </>
  );
};

export default LaunchpadPage;
