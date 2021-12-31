import React from 'react';
import {Box, Button, Drawer, Avatar, Typography} from '@mui/material';
import {AppState} from '../../contexts/AppContext';
import {signOut} from '@firebase/auth';
import { auth, db } from '../../libs/dataStores/firebase';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import { lpStatusValues} from '../../config/lpappConfig';

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
  },
  '&:hover': {
    cursor: 'pointer'
  }
};

const UserSidebar = ({anchorItem, btnText = 'View Sidebar'}) => {
  const {openDrawer, setOpenDrawer, user, setAlert, setLoading, appList, userRoles, setActiveAppId} = AppState();

  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth);
    setAlert({
      open: true,
      message: 'Logout Successful.',
      type: 'success'
    });

    toggleDrawer('left', false);
  };

  const goToSelectedApp = (appId, anchor) => {
    // TODO acquire app for appId and add logic to ensure app can't be edited unless status is 'pending'
    //  - give warning msg stating applicaiton state and that its not able to be edited -- send to other page
    //     that shows app info?  Or to launchpad page where they can see app detail?

    // calling toggleDrawer() not working, so forcing it manually here
    setOpenDrawer({[anchor]: false});
    // This will trigger useEffect in AppState to re-retrieve current appList so when new app created, its added to list
    //  Not very efficient, but since at most someone will have 2 or 3 apps, its irrelevant
    setActiveAppId(appId);
    navigate(`/launchpad/application`);
  }

  /*
   TODO Dec 26, 2021 - This might not be accurate - update and put in README once I'm settled
   DATA STRUCTURE
    - collection - lpapps
      - document -
        - applications
          - appId         - KEY
          - userId        - create index
          - projectName   - create index
          -  ... each additional form field ...
          - white list of users by uid  - MAP or ARRAY?
          - white list of users by eth addr  - MAP or ARRAY?
          - white list of users by nft contract addr  - MAP or ARRAY?
     - collection - userRoles
      - document
        - userId
          - list containing:  [{appId, role}]
   */
  const createNewApplication = async () => {
    setLoading(true);
    const appId = uuid();
    try {
      await firebaseAddNewApplication(appId).then(() => {
        setAlert({
          open: true,
          message: 'New project application initiated',
          type: 'success'
        });
        setLoading(false);
        goToSelectedApp(appId, 'left');
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: 'error',
      });
    }
  }

  // Add 2 docs to 2 diff collections - user Transaction to ensure its atomic
  //  - create lpapps with appId & userId (of logged in user)
  //  - create/update userRole to add appId to list with role 'admin'
  const firebaseAddNewApplication = async (appId) => {
    const appRef = doc(db, 'lpapps', appId);
    const userRoleRef = doc(db, 'userRoles', user.uid);
    const newAppData = { 'appId': appId, 'userId': user.uid, 'appStatus': lpStatusValues.PENDING }
    // Probably a better way to do the firebase updates here??
    try {
        await setDoc(appRef, {
          application: newAppData,
        }, {merge: 'false'})
            .then(async () => {
              // setActiveAppId(appId);
              // Add Role Data
              let roleData = await getDoc(userRoleRef)

              if (roleData.exists()) {
                let hasRoleForApp = roleData.data().some((role) => {
                  return role.appID === appId && role.role === 'admin';
                });
                if (!hasRoleForApp) {
                  await setDoc(userRoleRef, {
                    roles: [...userRoles, {'appId': appId, 'role': 'admin'}]
                  })
                }
              } else {
                await setDoc(userRoleRef, {
                  roles: [{'appId': appId, 'role': 'admin'}]
                })
              }
            })
    } catch (error) {
      return error;
    }
  }

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpenDrawer({[anchor]: open});
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
              <Drawer anchor={anchor} open={openDrawer[anchor]} onClose={toggleDrawer(anchor, false)}>
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
                        variant='h6'
                    >
                      Project List
                    </Typography>
                    { (appList.length > 0) ?
                        appList.map((app, index) => {
                        return (
                          <Typography
                              sx={{cursor: 'pointer'}}
                              variant='p'
                              key={index}
                              onClick={() => goToSelectedApp(app.application.appId, 'left')}
                          >
                            {app.application.projectName ? app.application.projectName : 'project--' + app.application.appId.slice(-4)}
                          </Typography>
                        );
                      }) :
                        ('No Projects Yet')
                    }
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
