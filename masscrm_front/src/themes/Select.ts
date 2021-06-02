import { createMuiTheme, Theme } from '@material-ui/core';

export const SelectTheme = createMuiTheme({
  overrides: {
    MuiSelect: {
      icon: {
        color: '#69738F'
      },
      outlined: {
        paddingRight: 0,
        width: '85%',
        background: '#fff !important',
        textAlign: 'left'
      }
    },
    MuiOutlinedInput: {
      root: {
        width: '230px',
        minHeight: '40px',
        borderColor: '#E1E5ED',
        border: 'solid 1px #E1E5ED',
        '&:hover': {
          borderColor: '#B6BECF'
        }
      },
      input: {
        padding: '10px'
      },
      notchedOutline: {
        border: 'none'
      }
    },
    MuiPaper: {
      root: {
        width: '230px',
        marginTop: '50px'
      }
    },
    MuiListItem: {
      button: {
        '&:hover': {
          background: '#F9F9FA'
        }
      }
    },
    MuiIconButton: {
      edgeEnd: {
        left: '15px',
        padding: '0',
        marginRight: '0',
        '&:hover': {
          background: 'none'
        }
      }
    },
    MuiInputAdornment: {
      positionEnd: {
        marginLeft: '-65px'
      }
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 14px) scale(1)',
        color: '#939BB2'
      },
      shrink: {
        visibility: 'hidden',
        background: '#fff'
      }
    },
    MuiFormLabel: {
      root: {
        '&&$focused': {
          transform: 'translate(14px, 14px) scale(1)',
          color: '#939BB2',
          visibility: 'hidden'
        }
      }
    },
    MuiSvgIcon: {
      fontSizeSmall: {
        fontSize: '1rem'
      }
    }
  }
});

export const MultiSelectTheme = (theme: Theme) =>
  createMuiTheme({
    ...theme,
    overrides: {
      ...theme.overrides,
      MuiInputLabel: {
        ...theme.overrides?.MuiInputLabel,
        shrink: {
          visibility: 'initial'
        }
      },
      MuiFormLabel: {
        ...theme.overrides?.MuiFormLabel,
        root: {
          '&&$focused': {
            visibility: 'initial'
          }
        }
      }
    }
  });

export const SearchInputTheme = (theme: Theme) =>
  createMuiTheme({
    ...theme,
    overrides: {
      ...theme.overrides,
      MuiInputBase: {
        ...theme.overrides?.MuiInputBase,
        inputAdornedEnd: {
          padding: '0 !important'
        }
      },
      MuiIconButton: {
        ...theme.overrides?.MuiIconButton,
        label: {
          background: '#fff',
          zIndex: 2,
          '&&:hover': {
            background: '#fff'
          }
        },
        root: {
          padding: '0 !important',
          marginRight: '0px !important',
          marginTop: '8px'
        }
      }
    }
  });
