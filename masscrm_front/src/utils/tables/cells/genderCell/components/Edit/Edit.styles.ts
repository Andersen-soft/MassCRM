import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrap: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '4px',
      background: '#fff',
      alignItems: 'center'
    },
    icon: {
      padding: '4px'
    },
    gender: {
      width: '150px'
    }
  })
);
