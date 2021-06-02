import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    kebabLink: {
      textDecoration: 'none',
      color: 'rgba(0, 0, 0, 0.87)'
    }
  })
);
