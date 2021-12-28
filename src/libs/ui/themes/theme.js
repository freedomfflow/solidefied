import { green, grey, red, yellow } from "@mui/material/colors";

const primaryColor  = '#54637a';
const primaryColorLight  = '#819ca9';
const primaryColorDark = '#29434e';
const secondaryColor  = '#0d47a1';
const secondaryColorLight  = '#5472d3';
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
// TODO  make a base theme and deconstruct that to reuse in custom themes
// TODO  the concept is we might have diff themes as options for new applicants to select for auto generation of web page
// TODO  do I have a theme file for each theme, or have them all in here in an object??

const themes = {
  solidefied: {
      palette: {
        mode: 'dark',
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
      //   MuiCssBaseline: {
      //     styleOverrides: `
      //       a:-webkit-any-link {
      //         text-decoration: none;
      //         &:visited {
      //           color: ${grey[500]}
      //         }
      //         &:hover {
      //           color: ${lightBlue}
      //         }
      //       }
      //    `,
      //   },
      }
    }
  };

export default themes;