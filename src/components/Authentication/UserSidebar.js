import React from 'react';
import { Avatar, Box, Button, Drawer, Tooltip, Typography } from '@mui/material';
import { AppState } from '../../contexts/AppContext';
import { signOut } from '@firebase/auth';
import { auth, db } from '../../libs/dataStores/firebase';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router-dom';
import { lpStatusValues, lpStatusValueTooltips, lpStatusValueUrls } from '../../config/lpappConfig';
import { useTranslation } from "react-i18next";

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
  holderSpace: {
    height: '25%'
  },
  projectList: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    padding: 1,
    paddingTop: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: 2,
    overflowY: 'auto'
  },
  project: {
    padding: 2,
    borderRadius: 5,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 0 3px black'
  },
  '&:hover': {
    cursor: 'pointer'
  },
  tooltip: {
    padding: '10px',
    fontSize: '14px',
  }
};

const UserSidebar = ({anchorItem, btnText = 'View Sidebar'}) => {
  const { t } = useTranslation();
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

  const goToSelectedApp = (app, anchor) => {
    let appId;
    let status = 'pending';
    if (typeof(app) === 'object') {
      appId = app.application.appId;
      status = app.application.appStatus;
    } else {
      appId = app;
    }
    // If app is a string, its an appId, if an object, its an app Object
    // For new app we pass a string, otherwise an object as we want more info
    setOpenDrawer({[anchor]: false});

    // This will trigger useEffect in AppState to re-retrieve current appList so when new app created, its added to list
    //  Not very efficient, but since at most someone will have 2 or 3 apps, its irrelevant
    setActiveAppId(appId);
    navigate(lpStatusValueUrls[status.toUpperCase()]);
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
    const newAppData = {'appId': appId, 'userId': user.uid, 'appStatus': lpStatusValues.PENDING}
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
                  <Box sx={style.holderSpace}>
                    <Typography>Other Content Here</Typography>
                  </Box>
                  <Box sx={style.projectList}>
                    <Typography
                        variant='h6'
                    >
                      Project List
                    </Typography>
                    {(appList.length > 0) ?
                        appList.map((app, index) => {
                          return (
                              <Box sx={style.project} key={index}>
                                <Typography
                                    sx={{cursor: 'pointer'}}
                                    variant='p'
                                    key={app.application.appId}
                                    onClick={() => goToSelectedApp(app, 'left')}
                                >
                                  {app.application.projectName ? app.application.projectName : 'project--' + app.application.appId.slice(-4)}
                                </Typography>
                                {
                                  (app.application.appStatus)
                                      ?
                                      (
                                          <Tooltip title={<Typography sx={style.tooltip}>{t(`${lpStatusValueTooltips[app.application.appStatus.toUpperCase()]}`)}</Typography>} placement='top-start'>
                                            <Typography>{app.application.appStatus}</Typography>
                                          </Tooltip>

                                      ) : (
                                          <span>&nbsp;</span>
                                      )
                                }
                              </Box>
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
