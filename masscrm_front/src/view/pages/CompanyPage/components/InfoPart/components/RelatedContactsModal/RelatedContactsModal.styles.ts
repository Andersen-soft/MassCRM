import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    message: {
      fontSize: '20px',
      lineHeight: '24px',
      color: '#212121',
      textAlign: 'center',
      display: 'inline-block',
      padding: '15px'
    }
  })
);
