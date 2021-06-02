import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    labelIcon: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingRight: '25px'
    },

    labelIconText: {
      color: '#78829d'
    },

    labelIconCount: {
      padding: '0 8px'
    }
  })
);
