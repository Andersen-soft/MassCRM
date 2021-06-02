import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    mainFilterWrapper: {
      padding: '12px 24px'
    },
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
