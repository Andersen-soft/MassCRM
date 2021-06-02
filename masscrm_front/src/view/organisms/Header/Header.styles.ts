import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
  badge: {
    '& .MuiBadge-anchorOriginTopRightCircle': {
      background: '#feda00'
    }
  },
  snackbar: {
    '& .MuiAlert-filledInfo': {
      backgroundColor: '#feda00',
      color: '#212121'
    }
  },

  header: {
    background: '#fff',
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.1)'
  },

  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '3px 28px',
    boxSizing: 'border-box',
    height: '50px',
    fontSize: '1.2em',
    width: '100%'
  },

  headerNav: {
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  },

  headerMenu: {
    marginLeft: '60px',
    height: '100%'
  },

  headerNotificationSnackbar: {
    display: 'flex',
    alignItems: 'center'
  },

  headerItem: {
    display: 'inline-flex',
    alignItems: 'center',
    margin: '0 20px',
    borderBottom: 'solid 3px transparent',
    height: '100%',
    textDecoration: 'none',
    color: 'inherit',

    '&:hover': {
      borderColor: '#feda00'
    }
  },

  headerItemActive: {
    borderColor: '#feda00'
  },

  headerUser: {
    marginLeft: '40px',
    color: '#939bb2',
    padding: '0 8px'
  },

  headerBtns: {
    display: 'flex',
    alignItems: 'center'
  }
}));
