import { createStyles, makeStyles } from '@material-ui/core';

export const searchStyle = makeStyles(() =>
  createStyles({
    searchIcon: {
      width: '16px',
      height: '16px',
      position: 'absolute',
      top: '30%',
      right: '6%',
      color: '#69738F',
      '&:focused': {
        display: 'none'
      }
    },
    searchWrap: {
      display: 'flex',
      position: 'relative'
    },
    search: {
      width: '100%',
      '& .MuiAutocomplete-inputRoot .MuiAutocomplete-input': {
        padding: 0
      },
      '& .Mui-focused .search-icon': {
        visibility: 'hidden'
      },
      '& .Mui-disabled': {
        borderColor: 'rgba(225, 229, 237, 0.5)',
        color: 'rgba(225, 229, 237, 0.5)'
      },
      '& .MuiIconButton-root': {
        background: '#fff',
        zIndex: 1
      },
      '& .Mui-disabled:hover ': {
        borderColor: 'rgba(225, 229, 237, 0.5)'
      },
      '& .Mui-error': {
        borderColor: '#FD5757'
      },
      '& .MuiSvgIcon-fontSizeSmall': {
        fontSize: '1rem'
      }
    },
    disabledIcon: {
      color: 'rgba(225, 229, 237, 0.5)'
    },
    required: {
      '& .MuiInputLabel-outlined::before': {
        content: '"*"'
      }
    }
  })
);
