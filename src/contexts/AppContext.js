import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../libs/dataStores/firebase';
import { collection, doc, getDocs, query, onSnapshot, where} from '@firebase/firestore';
import { roleHeirarchy } from '../config/lpappConfig';

const App = createContext();

const AppContext = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success'
  });
  // Used with my mui 'Stepper' to keep track of where I am
  const [activeLPStep, setActiveLPStep] = useState(0);
  // An array of apps for a userId - used to list projects in UserSidebar
  const [appList, setAppList] = useState([]);
  // App whose data we want to ensure is in lpappData
  const [activeAppId, setActiveAppId] = useState(null);
  // The current application Data for the activeApp
  const [lpappData, setLpappData] = useState();
  // Literal trigger to force snapshot update from firebase db any time we save data - increment a counter to force state change
  const [lpappUpdateTrigger, setLpappUpdateTrigger] = useState(0);
  // Array of userRoles for logged in user - array of objects
  const [userRoles, setUserRoles] = useState([]);
  // Handle 'left' drawer state from here
  const [openDrawer, setOpenDrawer] = useState({left: false});
  // Current role (string) of the active user/app
  const [currentRole, setCurrentRole] = useState('');

  // Flag to use as condition to suppress useEffects from running on mount
  const isMounted = useRef(false);

  const getApps = async (user) => {
    const appRef = collection(db, 'lpapps');
    const q = query(appRef, where('application.userId', '==', user.uid) );
    const data = await getDocs(q);
    if (data) {
      setAppList(data.docs.map((doc) => ({...doc.data()})))
      // Now lets reset lappData to data matching current appId
      // - filter and map to return what we need, and should be only one, but its an array, so take first element
      setLpappData(data.docs.filter((doc) => doc.data().application.appId === activeAppId).map((doc) => ({...doc.data().application}))[0]);

      // We also want to know the role of this user for this app
      const roleRef = collection(db, 'userRoles');
      const rq = query(roleRef, where('__name__', '==', user.uid));
      const roleData = await getDocs(rq);

      // TODO could prob be a funciton that gets called
      let userRolesForCurrentApp = roleData.docs.map((role, index) => {
          let currRoles = [];
          role.data().roles.forEach((role) => {
            if (role.appId === activeAppId) {
              currRoles.push(role.role);
            }
          })
          return currRoles;
      });
      // This potentially returns an array of roles for a user for an app -- so I need to choose the highest ranked
      if (userRolesForCurrentApp.length) {
        // set to highest indexOf value in roleHierarchy
        if (userRolesForCurrentApp[0].length === 1 ) {
          setCurrentRole(userRolesForCurrentApp[0][0]);
        } else {
          setCurrentRole(getHighestRankingRole(userRolesForCurrentApp[0]));
        }
      }
    }
  }

  // TODO - prob put in a util lib for use elsewhere
  const getHighestRankingRole = (roles) => {
    let highestRole = '';
    let highestRank = -1;
    roles.forEach((role) => {
      if (roleHeirarchy.indexOf(role) > highestRank) {
        highestRole = role;
      }
    })
    return highestRole;
  }

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getApps(user);
      }
      else {
        setUser(null);
      }
      setLoading(false);
    });

  }, []);

  // Inefficient but acceptable trigger - should be only if new app created, but this works fine w/negligable perf impact
  useEffect(() => {
    if (isMounted.current) {
      setLoading(true);
      if (user) {
        getApps(user);
      }
      setLoading(false);
    }
  }, [activeAppId]);

  /* NOTES:  useEffect
    - To avoid useEffect's from rendering onLoad (when component mounts), which they all do even if limited by
       dependencies, set up an 'isMounted' flag & use it as a condition in useEffect instances with dependencies.
       Note that the effect to set 'isMounted' must always be the last useEffect as react runs them in the order they
        written
   */

  // This MUSt always be the last useEffect instance
  useEffect(() => {
    isMounted.current = true;
  }, [])

  return (
      <App.Provider
          value={{
            loading,
            setLoading,
            alert,
            setAlert,
            user,
            activeLPStep,
            setActiveLPStep,
            lpappData,
            setLpappData,
            activeAppId,
            setActiveAppId,
            appList,
            userRoles,
            lpappUpdateTrigger,
            setLpappUpdateTrigger,
            openDrawer,
            setOpenDrawer,
            currentRole
          }}
      >
        {children}
      </App.Provider>
  );
};

export default AppContext;

export const AppState = () => {
  return useContext(App);
}
