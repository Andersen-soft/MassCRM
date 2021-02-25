import { createStyles, makeStyles } from '@material-ui/core';

export const modalStyles = makeStyles(() =>
  createStyles({
    content: {
      padding: '24px',
      overflowY: 'initial',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  })
);
