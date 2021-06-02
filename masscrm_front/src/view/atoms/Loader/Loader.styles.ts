import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    loaderWrapper: {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: 1301,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100%',
      height: '100%'
    },

    loader: {
      color: '#feda00'
    }
  })
);
