import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    root: {
      width: 778
    },
    paddingBottom16: {
      paddingBottom: 16
    },
    paddingBottom40: {
      paddingBottom: 40
    },
    paddingRight24: {
      paddingRight: 24
    },
    labelText: {
      width: 240
    },
    num: {
      color: '#212121'
    },
    downloadContainer: {
      display: 'flex',
      flexWrap: 'nowrap',
      alignItems: 'center'
    },
    link: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      color: '#212121',
      height: 32
    }
  }),
  { name: 'Import' }
);
