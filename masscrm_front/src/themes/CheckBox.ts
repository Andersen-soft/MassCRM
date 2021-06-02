import { createMuiTheme } from '@material-ui/core';

export const CheckBoxTheme = createMuiTheme({
  overrides: {
    MuiIconButton: {
      root: {
        '&:hover': {
          color: '#69738F',
          backgroundColor: 'none'
        }
      },
      label: {
        border: '1px solid rgba(105, 115, 143, 0.5)',
        borderRadius: '4px',
        height: '20px',
        width: '20px'
      }
    },
    MuiCheckbox: {
      root: {
        color: '#78829D'
      }
    }
  }
});
