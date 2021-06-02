import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    data: {
      position: 'relative',
      overflow: 'hidden',
      marginTop: '16px',
      background: '#fff',
      border: '1px solid rgba(205, 214, 225, 0.3)',
      borderRadius: '8px'
    },
    wrapper: {
      marginBottom: '15px'
    },
    mainSection: {
      display: 'flex',
      justifyContent: 'space-between',
      background: '#F9F9FA'
    }
  })
);
