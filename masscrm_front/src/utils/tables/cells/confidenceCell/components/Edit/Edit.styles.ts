import { makeStyles, createStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    cellEdit: {
      padding: '10px',
      background: '#fff',
      minWidth: '260px'
    },
    cellEditInput: {
      width: '230px'
    },
    cellInput: {
      minWidth: '230px',
      padding: '15px'
    },
    icon: {
      padding: '4px'
    }
  })
);
