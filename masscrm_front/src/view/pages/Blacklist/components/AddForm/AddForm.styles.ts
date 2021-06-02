import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    addWrapper: {
      boxSizing: 'border-box',
      width: '100%',
      background: '#fff',
      border: '1px solid rgba(205, 214, 225, 0.3)',
      borderRadius: '8px',
      marginTop: '16px',
      padding: '24px 24px 16px 24px'
    },
    addName: {
      fontSize: '18px',
      lineHeight: '22px',
      color: '#212121'
    }
  })
);
