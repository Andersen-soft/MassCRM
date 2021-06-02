import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    item: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '16px',
      '&:last-child': {
        marginBottom: 0
      }
    },

    spanLeft: {
      fontSize: '14px',
      color: '#939BB2',
      marginRight: '10px'
    },

    spanRight: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'right'
    },

    link: {
      color: '#13639D',
      textDecoration: 'none'
    }
  })
);
