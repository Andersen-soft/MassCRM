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
  }
}));
