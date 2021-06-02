import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    dataMess: {
      display: 'flex',
      margin: '0 auto',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#939bb2',
      fontSize: '1.29em',
      height: 'calc(100vh - 470px)'
    },
    dataMessP: {
      margin: 0,
      padding: 0
    }
  })
);
