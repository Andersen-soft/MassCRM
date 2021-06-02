import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      width: '285px',
      padding: 0,
      '& .MuiList-root': {
        maxWidth: '285px'
      },
      '& .MuiList-padding': {
        padding: 0
      }
    },
    rootOver: {
      overflow: 'auto',
      maxHeight: '222px'
    },
    newNotification: {
      '& .MuiTypography-displayBlock': {
        fontWeight: 400
      }
    },
    historyNotification: {
      '& .MuiTypography-displayBlock': {
        fontWeight: 300
      }
    },
    typography: {
      marginTop: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '12px',
      lineHeight: '16px'
    },
    date: {
      color: '#939bb2'
    },
    button: {
      outline: 'none',
      border: 'none',
      background: '#fff',
      cursor: 'pointer',
      color: '#13639d'
    }
  }),
  { name: 'List' }
);
