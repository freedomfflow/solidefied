import { green, grey, red, yellow, blue } from '@mui/material/colors';

const defaultLight = {
  'text': {
    'primary': '',
    'secondary': '',
  },
  'primary': {
    'mainOrig': '#0f4eac',
    'main': 'rgba(87, 96, 121, 1)',
    'light': '',
    'dark': '',
  },
  'secondary': {
    'main': 'rgba(123, 71, 90, 1)',
    'light': '',
    'dark': '',
    'contrastText': ''
  },
  'warning': {
    'main': '#f44336',
    'light': '',
    'dark': '',
  },
  'info': {
    'main': 'rgba(249, 198, 198, 1)',
    'light': '',
    'dark': '',
  },
  'background': {
    'paper': '',
    'default': '',
  }
}

const testDark = {
  'text': {
  },
  'primary': {
    'main': '',
    'light': '',
    'dark': '',
  },
  'secondary': {
    'main': '',
    'light': '',
    'dark': '',
    'contrastText': ''
  },
  'warning': {
    'main': '',
    'light': '',
    'dark': '',
  },
  'info': {
    'main': '',
    'light': '',
    'dark': '',
  },
  'background': {
    'paper': '',
    'default': '',
  }
}

const FONT_FAMILIES = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'sans-serif'
].join(',');

// Not using the light/dark custom theming -- letting MUI handle it all based on 'light' palette 'main' settings
const getTheme = (mode, theme = 'solidefied') => {
  if (theme === 'test') {
    console.log('Test Theme');
    return ({
      palette: {
        mode,
        ...(mode === 'light'
            ? {
              common: {
                black: '#000',
                white: '#fff'
              },
              primary: {
                main: '#1e3cef',
              },
              secondary: {
                main: '#ffea00',
              },
              warning: {
                main: '#6737d4',
              },
              info: {
                main: '#e621f3',
              },
            }
            : {
              common: {
                black: '#000',
                white: '#fff'
              },
            }),
      },
      typography: {
        fontFamily: FONT_FAMILIES,
      },
      components: {
        // Name of the component
        MuiFormLabel: {
          styleOverrides: {
            root: {
              fontSize: '1.1rem',
              paddingBottom: '6px',
            },
          },
        },
      }
    })
  } else if (theme === 'other') {
    console.log('Other Theme');
  } else {
    // Default theme
    return ({
      palette: {
        mode: 'light',
        primary: {
          main: defaultLight.primary.main,
        },
        secondary: {
          main: defaultLight.secondary.main,
        },
        warning: {
          main: defaultLight.warning.main,
        },
        info: {
          main: defaultLight.info.main,
        },
      },
      typography: {
        fontFamily: FONT_FAMILIES,
      },
      components: {
        MuiFormLabel: {
          styleOverrides: {
            root: {
              fontSize: '1.1rem',
              paddingBottom: '6px',
            },
          },
        },
      }
    })
  }
}

export default getTheme;

