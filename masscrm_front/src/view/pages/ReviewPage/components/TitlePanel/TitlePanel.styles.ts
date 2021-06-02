import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '1px solid #E5E9F0',
      padding: '24px'
    },

    title: {
      fontSize: '1.3em'
    },

    totalBlock: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },

    totalBlockTitle: {
      color: '#78829d',
      marginRight: '4px'
    },

    totalBlockNumber: {}
  })
);
