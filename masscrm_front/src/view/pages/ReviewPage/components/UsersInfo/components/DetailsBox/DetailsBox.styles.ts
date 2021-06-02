import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      border: '1px solid #E5E9F0',
      borderRadius: '8px',
      transition: '.5s',
      padding: '24px',
      background: '#FFFFFF',
      marginBottom: '16px',
      flexBasis: '27%',

      '&:hover': {
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.05)',
        background: '#E5E9F0',
        cursor: 'pointer'
      }
    },
    itemBlock: {
      borderRadius: '8px',
      marginBottom: '8px',

      '&:last-child': {
        marginBottom: 0
      }
    },

    title: {
      color: '#939BB2',
      marginRight: '28px'
    },

    blockWrapper: {
      display: 'flex',
      alignItems: 'center'
    },

    descr: {}
  })
);
