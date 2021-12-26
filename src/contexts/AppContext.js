import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from '../libs/dataStores/firebase';
// import { doc, setDoc, onSnapshot } from '@firebase/firestore';o

import uuid from 'react-uuid';

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
  const [lpappData, setLpappData] = useState();
  const [activeAppId, setActiveAppId] = useState(0);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
      else {
        setUser(null);
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
