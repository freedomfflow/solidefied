import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../libs/dataStores/firebase';
// import { doc, setDoc, onSnapshot } from '@firebase/firestore';

const App = createContext();

const AppContext = ({children}) => {
  const [user, setUser] = useState(null)
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

  }, []);

  return (
      <App.Provider
          value={{
            alert,
            setAlert,
            user,
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
