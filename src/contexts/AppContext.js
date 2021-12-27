import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../libs/dataStores/firebase';
import { collection, doc, getDocs, query, where} from '@firebase/firestore';

const App = createContext();

const AppContext = ({children}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success'
  });
  const [activeLPStep, setActiveLPStep] = useState(0);
  // An array of apps for a userId
  const [appList, setAppList] = useState([]);
  const [activeAppId, setActiveAppId] = useState(0);
  // The current application Data for the activeApp
  const [lpappData, setLpappData] = useState();
  // Array of userRoles for logged in user - array of objects
  const [userRoles, setUserRoles] = useState([]);

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
        setAppList([]);
      }
      setLoading(false);
    });

  }, []);



  // TODO
  //  - when a logged in use wants to in initiate an app, I must generate a uuid, and create an app rec
  //    in firebase in lpapps, with a uid = to users uid from their auth record
  //  - then when saving app data, I save to lpapps with 'APP ID' as the key, and a uid must be in each doc

  // TODO  modify this -- coin will be an 'lpapp id', and I will add form data, including the user id from authed user
  //   - will also want to add a app-creator (uid of authed user)
  //   - WL user map (authed user ids), WL wallet map (list of eth addrs admin can upload), WL nt map (list of nft contract addrs admin can load)
  // TODO - create firebase rule for 'reviewer' collection, and have roles for users (to add comments or perhaps edit app)
  // useEffect(() => {
  //   if (user) {
  //     const coinRef = doc(db, 'watchlist', user?.uid);
  //
  //     var unsubscribe = onSnapshot(coinRef, (coin) => {
  //       if (coin.exists()) {
  //         console.log('COIN DATA COINS');
  //         console.log(coin.data().coins);
  //         setWatchlist(coin.data().coins);
  //       } else {
  //         console.log('No items in Watchlist');
  //       }
  //     });
  //
  //     return () => {
  //       unsubscribe();
  //     }
  //   }
  // }, [user]);



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
