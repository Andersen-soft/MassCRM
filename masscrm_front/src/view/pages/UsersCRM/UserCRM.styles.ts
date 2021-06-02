import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    usersWrapper: {
      margin: '16px 10px',
      border: '1px solid rgba(205, 214, 225, 0.3)',
      borderRadius: '8px'
    }
  })
);
