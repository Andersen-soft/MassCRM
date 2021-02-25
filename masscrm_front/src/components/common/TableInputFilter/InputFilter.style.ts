import { createStyles, makeStyles } from '@material-ui/core';

export const searchStyle = makeStyles(() =>
  createStyles({
    searchWrap: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      '& .MuiAutocomplete-endAdornment': {
        right: 0,
        position: 'absolute'
      }
    },
    search: {
      '& .MuiAutocomplete-inputRoot .MuiAutocomplete-input': {
        padding: 0
      },
      '& .MuiAutocomplete-endAdornment': {
        top: 'calc(50% - 16px)',
        right: 0,
        position: 'absolute'
      },
      '& .MuiAutocomplete-clearIndicator': {
        display: 'none'
      },
      '& .Mui-error': {
        borderColor: '#fd5757'
      },
      '& .MuiCircularProgress-svg': {
        color: '#feDa00'
      }
    },
    checkbox: {
      display: 'none'
    },
    input: {
      width: '230px'
    }
  })
);
