import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dataTable: {
      position: 'relative',
      width: '100%'
    },
    dataWithout: {
      position: 'relative',
      minHeight: '50vh',
      width: '100%'
    }
  })
);
