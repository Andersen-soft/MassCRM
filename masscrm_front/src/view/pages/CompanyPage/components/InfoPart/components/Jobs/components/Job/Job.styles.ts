import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      alignSelf: 'baseline',
      flexDirection: 'column',
      margin: '10px',
      boxSizing: 'border-box',
      borderRadius: '8px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.15)',
      padding: '16px'
    },
    editBlock: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '18px'
    },
    editBlockTitle: {
      fontSize: '16px'
    },
    editBlockIcons: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '> div': {
        '&:first-child': {
          marginRight: '16px'
        }
      }
    }
  })
);
