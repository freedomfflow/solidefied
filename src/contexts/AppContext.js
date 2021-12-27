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

  // Flag to use as condition to suppress useEffects from running on mount
  const isMounted = useRef(false);

  const getApps = async (user) => {
    const appRef = collection(db, 'lpapps');
    const q = query(appRef, where('application.userId', '==', user.uid) );
    const data = await getDocs(q);
    // console.log('GET APPS');
    // console.log(data.docs.map((doc) => ({...doc.data()})));
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
        // setAppList([]);
      }
      setLoading(false);
    });

  }, []);

  // If user selects diff app, or if current app is updated, lets get app from db and set lpappData
  useEffect(() => {
    console.log('APP CONTEXT EFFECT FOR activeAppId');
    console.log('activeappid = ', activeAppId);
    console.log('lpappData', lpappData);
    console.log('lpappDataTrigger', lpappUpdateTrigger);
    if (isMounted.current && activeAppId) {
      const appRef = doc(db, 'lpapps', activeAppId);

      // Unsubscribe firebase listener after use
      var unsubscribe = onSnapshot(appRef, (application) => {
        if (application.exists()) {
          console.log('SETTING LP APP DATA IN APP CONTEXT FROM USE EFFECT');
          console.log(application.data().application);
          setLpappData(application.data().application)
          console.log('lpappData right after I set it within unsub');
          console.log(lpappData);
        }
      })

      return () => {
        console.log('About to unsub');
        console.log(lpappData);
        unsubscribe();
      }
    }
  }, [activeAppId, lpappUpdateTrigger])

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
            activeAppId,
            setActiveAppId,
            appList,
            userRoles,
            lpappUpdateTrigger,
            setLpappUpdateTrigger
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
