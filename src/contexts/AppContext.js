import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../libs/dataStores/firebase';
import { collection, doc, getDocs, query, onSnapshot, where} from '@firebase/firestore';

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

  const getApps = async (user) => {
    const appRef = collection(db, 'lpapps');
    const q = query(appRef, where('application.userId', '==', user.uid) );
    const data = await getDocs(q);
    setAppList(data.docs.map((doc) => ({...doc.data()})))
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
