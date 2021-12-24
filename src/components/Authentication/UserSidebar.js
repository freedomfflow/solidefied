import React, { useState } from 'react';
import { Box, Button, Drawer, Avatar } from '@mui/material';
import { AppState } from '../../contexts/AppContext';
import { signOut } from '@firebase/auth';
import { auth } from '../../libs/dataStores/firebase';

let style = {
  container: {
    width: 350,
    padding: 5,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  profile: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    height: '92%'
  },
  picture: {
    width: 150,
    height: 150,
    cursor: 'pointer',
    objectFit: 'contain'
  },
  logout: {
    height: '5%',
    width: '100%',
    marginTop: 20,
  },
};

export default function UserSidebar() {
  const [state, setState] = useState({ left: false, });
  const { user, setAlert } = AppState();

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: 'Logout Successful.',
      type: 'success'
    });

    toggleDrawer();
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
      <div>
        {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              <Avatar
                  onClick={toggleDrawer(anchor, true)}
                  sx={{
                    height: 38,
                    width: 38,
                    cursor: 'pointer',
                  }}
                  src={user.photoURL}
                  alt={user.displayName || user.email}
              />
              <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                <Box sx={style.container}>
                  <Box sx={style.profile}>
                    <Avatar
                        sx={style.picture}
                        src={user.photoURL}
                        atl={user.displayName || user.email}
                    />
                    <span
                        style={{
                          width: '100%',
                          fontSize: 25,
                          textAlign: 'center',
                          wordWrap: 'break-word'
                        }}
                    >
                      {user.displayName || user.email}
                    </span>
                  </Box>
                  <Button
                      variant='contained'
                      sx={style.logout}
                      onClick={logOut}
                  >
                    Log Out
                  </Button>
                </Box>
              </Drawer>
            </React.Fragment>
        ))}
      </div>
  );
}