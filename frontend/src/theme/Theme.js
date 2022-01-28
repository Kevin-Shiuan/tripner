import { createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';

const transparent1 = alpha('#212529', 0.2);
const transparent2 = alpha('#212529', 0.14);
const transparent3 = alpha('#212529', 0.12);

const Theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#344955',
      light: '#4a6572',
      dark: '#232F34',
    },
    secondary: {
      main: '#F9AA33',
      light: '#F9AA33',
      dark: '#F9AA33',
    },
    background: {
      default: '#f1f3f5',
      paper: '#f8f9fa',
    },
    text: {
      primary: '#343a40',
    },
    success: {
      main: '#0ca678',
    },
    error: {
      main: '#f03e3e',
    },
    info: {
      main: '#1c7ed6',
    },
  },
  shadows: [
    'none',
    `0px 2px 1px -1px ${transparent1},0px 1px 1px 0px ${transparent2},0px 1px 3px 0px ${transparent3}`,
    `0px 3px 1px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1px 5px 0px ${transparent3}`,
    `0px 3px 3px -2px ${transparent1},0px 3px 4px 0px ${transparent2},0px 1px 8px 0px ${transparent3}`,
    `0px 2px 4px -1px ${transparent1},0px 4px 5px 0px ${transparent2},0px 1px 10px 0px ${transparent3}`,
    `0px 3px 5px -1px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1px 14px 0px ${transparent3}`,
    `0px 3px 5px -1px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1px 18px 0px ${transparent3}`,
    `0px 4px 5px -2px ${transparent1},0px 7px 10px 1px ${transparent2},0px 2px 16px 1px ${transparent3}`,
    `0px 5px 5px -3px ${transparent1},0px 8px 10px 1px ${transparent2},0px 3px 14px 2px ${transparent3}`,
    `0px 5px 6px -3px ${transparent1},0px 9px 12px 1px ${transparent2},0px 3px 16px 2px ${transparent3}`,
    `0px 6px 6px -3px ${transparent1},0px 10px 14px 1px ${transparent2},0px 4px 18px 3px ${transparent3}`,
    `0px 6px 7px -4px ${transparent1},0px 11px 15px 1px ${transparent2},0px 4px 20px 3px ${transparent3}`,
    `0px 7px 8px -4px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 4px ${transparent3}`,
    `0px 7px 8px -4px ${transparent1},0px 13px 19px 2px ${transparent2},0px 5px 24px 4px ${transparent3}`,
    `0px 7px 9px -4px ${transparent1},0px 14px 21px 2px ${transparent2},0px 5px 26px 4px ${transparent3}`,
    `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`,
    `0px 8px 10px -5px ${transparent1},0px 16px 24px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`,
    `0px 8px 11px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`,
    `0px 9px 11px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 34px 6px ${transparent3}`,
    `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`,
    `0px 10px 13px -6px ${transparent1},0px 20px 31px 3px ${transparent2},0px 8px 38px 7px ${transparent3}`,
    `0px 10px 13px -6px ${transparent1},0px 21px 33px 3px ${transparent2},0px 8px 40px 7px ${transparent3}`,
    `0px 10px 14px -6px ${transparent1},0px 22px 35px 3px ${transparent2},0px 8px 42px 7px ${transparent3}`,
    `0px 11px 14px -7px ${transparent1},0px 23px 36px 3px ${transparent2},0px 9px 44px 8px ${transparent3}`,
    `0px 11px 15px -7px ${transparent1},0px 24px 38px 3px ${transparent2},0px 9px 46px 8px ${transparent3}`
  ],
  typography: {
    fontFamily: 'Quicksand',
    button:{
      textTransform: 'none',
      letterSpacing: '0.05em',
      fontWeight: '500'
    }
  },
  components:{
    MuiPaper:{
        styleOverrides:{
            root:{
              borderRadius: '16px',
              padding: '24px',
            }
        }
    },
    MuiCard:{
      styleOverrides:{
        root:{
          padding: 0,
        }
      }
    },
    MuiCardActionArea:{
      styleOverrides:{
        root:{
          borderRadius: 16,
        }
      }
    },
    MuiAppBar:{
      styleOverrides:{
        root:{
          padding: 8,
          borderRadius: 0,
        },
      }
    },
    MuiMenu:{
      styleOverrides:{
        root:{
          padding: 8,
          borderRadius: 0,
        },
        paper:{
          padding: 8,
          borderRadius: 0,
        }
      }
    },
    MuiAutocomplete:{
      styleOverrides:{
        paper:{
          padding: 0,
          borderRadius: 8
        }
      }
    }
  }
});

export default Theme