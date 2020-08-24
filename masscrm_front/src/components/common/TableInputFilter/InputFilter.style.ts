import { createStyles, makeStyles } from '@material-ui/core';

export const searchStyle = makeStyles(() =>
  createStyles({
    searchWrap: {
      display: 'flex',
      position: 'relative',
      '& .MuiAutocomplete-endAdornment': {
        right: 0,
        position: 'absolute'
      }
    },
    search: {
      maxWidth: '230px',
      width: '230px',
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
        borderColor: '#FD5757'
      }
    }
  })
);
