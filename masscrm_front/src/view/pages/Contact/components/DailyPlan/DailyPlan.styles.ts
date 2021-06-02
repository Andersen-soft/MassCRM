import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dailyPlan: {
      padding: '7px 0',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }
  })
);
