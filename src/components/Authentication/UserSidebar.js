import React, {useState} from 'react';
import {Box, Button, Drawer, Avatar, Typography} from '@mui/material';
import {AppState} from '../../contexts/AppContext';
import {signOut} from '@firebase/auth';
import { auth, db } from '../../libs/dataStores/firebase';
import { doc, setDoc } from '@firebase/firestore';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';

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
    marginTop: 2,
  },
  projectList: {
    flex: 1,
    width: '100%',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 1,
    paddingTop: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: 2,
    overflowY: 'scroll'
  },
  project: {
    padding: 10,
    borderRadius: 5,
    color: 'black',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 0 3px black'
  }
};

const UserSidebar = ({anchorItem, btnText = 'View Sidebar'}) => {
  const [state, setState] = useState({left: false,});
  const {user, setAlert, setLoading, lpappData, setActiveAppId} = AppState();

  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: 'Logout Successful.',
      type: 'success'
    });

    toggleDrawer();
  };

  const createNewApplication = async () => {
    //  application = { userId: abc,
    //                  appData: { appId: <uuid>,
    //                            projectName: <proj name>,
    //                            appFormData: { lpappData }
    setLoading(true);
    const appId = uuid();
    const appRef = doc(db, 'lpapps', user.uid);
    const formData = {
      'apps': { 'appId': appId, 'appData': { 'email': user.email, 'projectName': appId }}
    }
    try {
      await setDoc(appRef, {
        application: lpappData ? [...lpappData, formData] : formData,
      }, {merge: 'true'});
      setAlert({
        open: true,
        message: 'New project application created',
        type: 'success'
      });
      setTimeout(() => {
        setLoading(false);
        toggleDrawer();
        setActiveAppId(appId);
        navigate(`/launchpad/application`);
      }, 1000)
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  return (
      <div>
        {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
              {
                (anchorItem === 'avatar') ?
                    (
                        <>
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
                        </>
                    ) : (
                        <Button
                            variant='outlined'
                            onClick={toggleDrawer(anchor, true)}
                        >
                          {btnText}
                        </Button>
                    )
              }
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
                  <Box sx={style.projectList}>
                    <Typography
                        sx={{fontSize: 15}}
                    >
                      Project List
                    </Typography>
                    {/*{projects.map((project) => {*/}
                    {/*  if (lpappData.includes(project.id)) {*/}
                    {/*    return (*/}
                    {/*      <div sx={style.project}>*/}
                    {/*        <span>{project.name}</span>*/}
                    {/*        <span style={{display: 'flex', gap: 8}}>*/}
                    {/*          ticker */}
                    {/*          <AiFillDelete*/}
                    {/*            style={{cursor: 'pointer'}}*/}
                    {/*          />*/}
                    {/*        </span>*/}
                    {/*      </div>*/}
                    {/*    );*/}
                    {/*  }*/}

                    {/*  return '';*/}
                    {/*})}*/}
                  </Box>
                  <Button
                      variant='contained'
                      sx={style.logout}
                      onClick={createNewApplication}
                  >
                    New Project Application
                  </Button>
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

export default UserSidebar;
