import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    item: {
      width: '50%',
      boxSizing: 'border-box',
      paddingRight: '40px',
      marginBottom: '16px'
    }
  })
);
