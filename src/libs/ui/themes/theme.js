import { createTheme } from "@mui/material/styles";

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

const theme =
    createTheme({
      palette: {
        mode: 'light',
        primary: {
          light: primaryColorLight,
          main: primaryColor,
          dark: primaryColorDark,
          contrast: grey[200],
        },
        secondary: {
          light: secondaryColorLight,
          main: secondaryColor,
          dark: secondaryColorDark,
          contrastText: grey[500]
        },
        error: {
          light: red[400],
          main: red[500],
          dark: red[300],
          contrastText: grey[800]
        },
        success: {
          main: green[500]
        },
        warning: {
          main: yellow[500],
          contrastText: grey[800]
        },
        info: {
          main: lightBlue
        },
        text: {
          primary: grey[900],
          secondary: grey[700],
          disabled: grey[500]
        },
        action: {
          active: red[200],
          activeOpacity: 1,
          disabled: grey[700],
          disabledBackground: grey[200],
          hover: red[100],
          hoverOpacity: 0.7,
          focus: red[600],
          focusOpacity: 1,
          selected: red[300],
          selectedOpacity: 1
        },
        background: {
          default: grey[400],
          paper: grey[200]
        },
        common: {
          black: grey[900],
          white: grey[200]
        },
        tonalOffset: 0.2
      },
      typography: {
        fontFamily: FONT_FAMILIES,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: `
            a:-webkit-any-link {
              text-decoration: none;
              color: ${grey[200]};
              &:visited {
                color: ${grey[500]}
              }
              &:hover {
                color: ${lightBlue}
              }
            }
         `,
        },
      },
    });

export default theme;