import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    cellEdit: {
      padding: '10px',
      background: '#fff',
      minWidth: '260px'
    },
    cellEditBtn: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    icon: {
      padding: '4px'
    }
  })
);
