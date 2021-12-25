import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../libs/dataStores/firebase';
// import { doc, setDoc, onSnapshot } from '@firebase/firestore';

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

  return (
      <App.Provider
          value={{
            loading,
            alert,
            setAlert,
            user,
            activeLPStep,
            setActiveLPStep,
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
