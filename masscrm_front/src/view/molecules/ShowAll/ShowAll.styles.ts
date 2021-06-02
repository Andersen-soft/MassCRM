import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    showAll: {
      display: 'flex',
      alignItems: 'center'
    },
    showAllBtn: {
      color: '#78829d'
    }
  })
);
