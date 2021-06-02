import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '4px',
      background: '#fff',
      alignItems: 'center'
    },
    wrapperDouble: {
      alignItems: 'flex-start'
    },
    icon: {
      padding: '4px'
    },
    search: {
      width: '230px'
    }
  })
);
