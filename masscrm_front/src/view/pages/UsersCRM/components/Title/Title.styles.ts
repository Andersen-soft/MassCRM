import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    userTitle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#fff',
      padding: '24px',
      borderRadius: '8px 8px 0 0'
    },
    userTitleTitle: {
      fontSize: '20px',
      lineHeight: '24px'
    },
    userTitleBtn: {
      background: 'transparent',
      border: 'none',
      padding: 0,
      outline: 'none',
      '&:active': {
        outline: 'none'
      },
      '&:visited': {
        outline: 'none'
      },
      '&:focus': {
        outline: 'none'
      }
    }
  })
);
