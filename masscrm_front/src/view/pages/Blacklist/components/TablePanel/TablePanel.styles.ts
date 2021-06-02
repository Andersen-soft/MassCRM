import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    tablePanel: {
      boxSizing: 'border-box',
      background: '#fff',
      marginTop: '16px',
      border: '1px solid rgba(205, 214, 225, 0.3)',
      borderRadius: '8px'
    },
    tablePanelFlex: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '25px 24px',
      '& > div': {
        display: 'flex',
        alignItems: 'center'
      }
    },
    title: {
      fontSize: '18px',
      lineHeight: '22px',
      color: '#212121',
      marginRight: '16px'
    },
    button: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: 'none',
      background: '#fff',
      outline: 'none',
      fontSize: '12px',
      width: '62px',
      lineHeight: '140.62%',
      color: '#78829d'
    },
    panelItem: {
      marginRight: '-25px',
      display: 'flex'
    },
    tableSearchIcon: {}
  })
);
