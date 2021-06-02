import { createMuiTheme } from '@material-ui/core';

export const AndersenTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121'
    },
    error: {
      main: '#FD5757'
    }
  },
  overrides: {
    MuiOutlinedInput: {
      root: {
        width: '100%',
        minHeight: '40px',
        border: 'solid 1px #E1E5ED',
        '&:hover': {
          borderColor: '#B6BECF'
        }
      },
      input: {
        padding: '10px',
        fontSize: '14px',
        lineHeight: '16px'
      },
      notchedOutline: {
        border: 'none'
      }
    },
    MuiIconButton: {
      root: {
        padding: '6px'
      }
    },
    MuiInputLabel: {
      root: {
        '&&': {
          color: '#939BB2',
          background: '#fff',
          padding: '0 3px'
        }
      },
      outlined: {
        transform: 'translate(14px, 14px) scale(1)'
      }
    },
    MuiFormControlLabel: {
      root: {
        color: '#939BB2'
      }
    },
    MuiFormLabel: {
      root: {
        color: '#939BB2'
      }
    }
  }
});
