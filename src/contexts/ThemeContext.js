import React, { createContext, useContext, useMemo, useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { getTheme } from '../libs/ui';

const ThemeState = createContext();

const ThemeContext = ({children}) => {
  const [darkMode, setDarkMode] = useState(true)

  // TODO will need to expand to another context var if/when we have more themes and want to use based on form selection
  // I can manually change theme here to one defined in themes.js, but I need to add a dark mode palette for custom theme
  let selectedTheme = getTheme('dark', 'test');
  selectedTheme.palette.mode = darkMode ? 'dark' : 'light';
  console.log('SEL THEM MODE', selectedTheme.palette.mode);
  const activeTheme = useMemo(() => createTheme(selectedTheme), [darkMode]);

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