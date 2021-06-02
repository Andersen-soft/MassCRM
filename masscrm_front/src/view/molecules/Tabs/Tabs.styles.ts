import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    tab: {
      minWidth: 0,
      padding: 0,
      marginRight: 24,
      borderBottom: '2px solid transparent',
      '&:hover': {
        borderBottom: '2px solid #FEDA00',
        opacity: 1
      }
    },
    contentContainer: {
      padding: '24px 0'
    },
    indicator: {
      backgroundColor: '#FEDA00'
    },
    text: {
      color: '#212121',
      fontSize: '18px',
      lineHeight: '22px',
      textTransform: 'none',
      padding: '16px 0'
    },
    divider: {
      marginTop: -1
    }
  }),
  { name: 'Tabs' }
);
