import { green, grey, red, yellow } from '@mui/material/colors';

const testLight = {
  'text': {
    'primary': 'rgba(0, 0, 0, 0.87)',
    'secondary': 'rgba(0, 0, 0, 0.54)',
    'disabled': 'rgba(0, 0, 0, 0.38)',
    'hint': 'rgba(0, 0, 0, 0.38)'
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
  'error': {
    'main': '',
    'light': '',
    'dark': '',
    'contrastText': ''
  },
  'background': {
    'paper': 'rgba(249, 243, 243, 1)',
    'default': 'rgba(251, 251, 251, 1)',
  }
}

const testDark = {
  'text': {
    'primary': 'rgba(214, 214, 228, 1)',
    'secondary': 'rgba(196, 192, 192, 1)',
    'disabled': 'rgba(233, 224, 224, 0.38)',
    'hint': 'rgba(168, 156, 156, 0.38)'
  },
  'primary': {
    'main': 'rgba(87, 96, 121, 1)',
    'light': 'rgba(140, 142, 151, 1)',
    'dark': 'rgba(95, 102, 148, 1)',
    'contrastText': 'rgba(255, 255, 255, 1)',
  },
  'secondary': {
    'main': 'rgba(123, 71, 90, 1)',
    'light': 'rgba(193, 69, 111, 1)',
    'dark': 'rgba(140, 102, 119, 1)',
    'contrastText': 'rgba(249, 198, 198, 1)'
  },
  'error': {
    'main': '#f44336',
    'light': '#e57373',
    'dark': '#d32f2f',
    'contrastText': '#fff',
  },
  'background': {
    'paper': 'rgba(86, 80, 80, 1)',
    'default': 'rgba(8, 7, 7, 1)',
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

// TODO  figure out global style strategy -- want to make a 'Loader' style to center & color globally
// TODO?  make a base theme and deconstruct that to reuse in custom themes
// TODO?  the concept is we might have diff themes as options for new applicants to select for auto generation of web page
// TODO?  do I have a theme file for each theme, or have them all in here in an object??

const getTheme = (mode, theme = 'solidefied') => {
  console.log('MODE', mode);
  console.log('THEME', theme);
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
              background: {
                paper: testLight.background.paper,
                default: testLight.background.default,
              },
              primary: {
                light: testLight.primary.light,
                main: testLight.primary.main,
                dark: testLight.primary.dark,
              },
              secondary: {
                light: testLight.secondary.light,
                main: testLight.secondary.main,
                dark: testLight.secondary.dark,
                contrastText: testLight.secondary.contrastText,
              },
              error: {
                light: testLight.error.light,
                main: testLight.error.main,
                dark: testLight.error.dark,
                contrastText: testLight.error.contrastText,
              },
              text: {
                primary: testLight.text.primary,
                secondary: testLight.text.secondary,
                disabled: testLight.text.disabled,
                hint: testLight.text.hint,
              }
            }
            : {
              common: {
                black: '#000',
                white: '#fff'
              },
              background: {
                paper: testDark.background.paper,
                default: testDark.background.default,
              },
              primary: {
                light: testDark.primary.light,
                main: testDark.primary.main,
                dark: testDark.primary.dark,
              },
              secondary: {
                light: testDark.secondary.light,
                main: testDark.secondary.main,
                dark: testDark.secondary.dark,
                contrastText: testDark.secondary.contrastText,
              },
              error: {
                light: testDark.error.light,
                main: testDark.error.main,
                dark: testDark.error.dark,
                contrastText: testDark.error.contrastText,
              },
              text: {
                primary: testDark.text.primary,
                secondary: testDark.text.secondary,
                disabled: testDark.text.disabled,
                hint: testDark.text.hint,
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
    // add a theme
  } else {
    // Default theme
    console.log('Default Theme');
    return ({
      palette: {
        mode,
        ...(mode === 'light'
            ? {
              primary: {
                main: '#1976d2',
                contrast: grey[900]
              },
              common: {
                black: '#000',
                white: '#fff'
              },
            }
            : {
              primary: {
                main: '#c0c0c0',
                contrast: grey[200]
              }
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
  }
}

export default getTheme;
