import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
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
      flexDirection: 'column',
      position: 'relative'
    },
    search: {
      width: '230px',
      '& .MuiAutocomplete-inputRoot .MuiAutocomplete-input': {
        position: 'relative',
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
    },
    paper: {
      position: 'absolute',
      top: '42px',
      width: '230px'
    },
    addButtonBlock: {
      position: 'absolute',
      bottom: '-42px',
      width: '230px',
      background: '#fff',
      zIndex: 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '42px',
      padding: '5px',
      boxShadow: '0 5px 15px rgba(5, 31, 43, 0.17)',
      borderRadius: '4px',
      boxSizing: 'border-box'
    },
    sendButtonBlock: {
      textAlign: 'center',
      marginTop: '30px'
    }
  })
);
