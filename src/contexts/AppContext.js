import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../libs/dataStores/firebase';
import { collection, doc, getDocs, query, onSnapshot, where} from '@firebase/firestore';
import { lpAppQueryType, lpStatusValues } from '../config/lpappConfig';

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

  // Flag to use as condition to suppress useEffects from running on mount
  const isMounted = useRef(false);

  const getApps = async (user, type='all') => {
    const appRef = collection(db, 'lpapps');
    const q = query(appRef, where('application.userId', '==', user.uid) );
    const data = await getDocs(q);
    if (data) {
      if (type === lpAppQueryType.FIRST_PREFER_PENDING) {
        const firstPendingApp = data.docs.filter((doc) => doc.data().application.appStatus === lpStatusValues.PENDING).map((doc) => ({...doc.data().application}))[0];
        if (firstPendingApp) {
          setActiveAppId(firstPendingApp.appId);
        } else {
          if (Object.values(data.docs)[0]) { setActiveAppId(Object.values(data.docs)[0].appId)}
        }
      } else {
        // Now lets reset lappData to data matching current appId - filter and map to return what we need, and should be only one, but its an array, so take first element
        setLpappData(data.docs.filter((doc) => doc.data().application.appId === activeAppId).map((doc) => ({...doc.data().application}))[0]);
        setAppList(data.docs.map((doc) => ({...doc.data()})))
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // If here we are setting activeAppId via getApps, which will trigger getApps again
        //  for setting all other state dependent on activeAppId
        setUser(user);
        getApps(user, lpAppQueryType.FIRST_PREFER_PENDING);
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
            setOpenDrawer
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
