import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    normalInput: {
      width: '230px'
    },
    input: {
      '& .MuiOutlinedInput-root': {
        paddingRight: '0px !important'
      },
      margin: '8px 0 8px 16px'
    },
    resetButton: {
      marginLeft: '24px'
    },
    dropButton: {
      display: 'flex',
      alignItems: 'center',
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: '#78829D',
      fontSize: '12px',
      marginLeft: '10px'
    },
    dropWrapper: {
      width: '100%',
      marginLeft: '100px'
    },
    hiddenFilterWrapper: {
      maxWidth: '750px'
    }
  })
);
