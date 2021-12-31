import { green, grey, red, yellow } from '@mui/material/colors';

const primaryColor = '#54637a';
const primaryColorLight = '#819ca9';
const primaryColorDark = '#29434e';
const secondaryColor = '#0d47a1';
const secondaryColorLight = '#5472d3';
const secondaryColorDark = '#002171';
const lightBlue = '#64c1ff';

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
  if (theme === 'test') {
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
                paper: 'rgba(249, 243, 243, 1)',
                default: 'rgba(251, 251, 251, 1)'
              },
              primary: {
                light: '#7986cb',
                main: 'rgba(22, 45, 177, 1)',
                dark: '#303f9f', 'contrastText': '#fff'
              },
              secondary: {
                light: 'rgba(135, 222, 99, 1)',
                main: 'rgba(60, 128, 43, 1)',
                dark: 'rgba(35, 90, 19, 1)',
                contrastText: '#fff'
              },
              error: {
                light: '#e57373',
                main: 'rgba(223, 34, 27, 1)',
                dark: '#d32f2f',
                contrastText: '#fff'
              },
              text: {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.54)',
                disabled: 'rgba(0, 0, 0, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)'
              }
            }
            : {
              primary: {
                main: 'red',
                contrast: grey[200]
              },
              text: {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.54)',
                disabled: 'rgba(0, 0, 0, 0.38)',
                hint: 'rgba(0, 0, 0, 0.38)'
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
  } else if (theme === 'other') {
    // add a theme
  } else {
    // Default theme
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
    })
  }
}

export default getTheme;
