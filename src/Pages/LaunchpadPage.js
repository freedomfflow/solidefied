import React from 'react';
import { Button } from '@mui/material';
import { AppState } from '../contexts/AppContext';
import { UserSidebar } from '../components';

// TODO set up cards??
//   If not logged in
//    - Get started button - explainer text about initiating application, N steps, step 1 to create account or log
//    - View My Applications - text -> if you have existing applications, you can view or edit
//    - View applications I am whitelisted to - will need to create acct or login, and we will show projects they are WL to
//    - View a list of pulbic launch pad projects - filter by active, pending..??
//    - If a potential project investor, sign up or login to view rejected LP projects seeking investment outside LP
const LaunchpadPage = () => {
  const { user } = AppState();
  return (
      <>
        <h3> LAUNCH PAD PAGE</h3>
        <br />
        <p>
          If not logged in, this button brings up login/signup modal
          If logged in, button says 'view projects', and will open the left drawer to see projects & links to WL features
           & link to autogenerated website
        </p>
        { !user && (
            <Button
                variant='outlined'
            >
              Get Started
            </Button>
        )}
        { user && (<UserSidebar anchorItem='button' btnText='My Projects' />)}

      </>
  );
};

export default LaunchpadPage;
