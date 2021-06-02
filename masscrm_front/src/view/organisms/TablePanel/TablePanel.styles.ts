import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    panel: {
      background: '#fff',
      padding: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    panelItem: {
      display: 'flex',
      alignItems: 'center'
    },
    panelTitle: {
      fontSize: '1.3em',
      marginRight: '24px'
    },
    panelLabel: {
      padding: '5px'
    }
  })
);
