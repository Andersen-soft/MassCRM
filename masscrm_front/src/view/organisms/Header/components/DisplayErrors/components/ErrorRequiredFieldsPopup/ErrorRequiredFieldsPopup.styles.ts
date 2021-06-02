import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    content: {
      padding: '24px',
      overflowY: 'initial',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    wrapper: {
      width: '552px',
      background: '#fff',
      borderRadius: '8px'
    },
    close: {
      position: 'absolute',
      right: '8px',
      top: '8px'
    }
  })
);
