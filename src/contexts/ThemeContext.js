import React, { createContext, useContext, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { themes  } from '../libs/ui';

const ThemeState = createContext();

const ThemeContext = ({children}) => {
  const [darkMode, setDarkMode] = useState(true)

  // TODO will need to expand to another context var if/when we have more themes and want to use based on form selection
  let selectedTheme = themes['solidefied'];
  selectedTheme.palette.mode = darkMode ? 'dark' : 'light';
  const activeTheme = createTheme(selectedTheme);

  return (
      <ThemeState.Provider
          value={{
            activeTheme,
            darkMode,
            setDarkMode,
          }}
      >
        {children}
      </ThemeState.Provider>
  );
};

export default ThemeContext;

export const Theme = () => {
  return useContext(ThemeState);
}