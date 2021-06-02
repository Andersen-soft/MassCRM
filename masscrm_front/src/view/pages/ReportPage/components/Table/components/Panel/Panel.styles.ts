import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    panel: {
      background: '#fff',
      padding: '24px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    panelItem: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '60px',
      '&:last-child': {
        marginRight: 0
      }
    },
    panelTitle: {
      fontSize: '1.3em',
      margin: '0 auto 0 0'
    },
    panelLabel: {
      padding: '5px'
    },
    panelExportIcon: {
      padding: '0 5px',
      color: '#dadada !important',
      marginLeft: '12px',
      ':hover': {
        color: '#69738f !important'
      }
    },
    tooltip: {
      position: 'relative',
      marginLeft: '30px'
    },
    tooltipText: {
      visibility: 'hidden',
      fontSize: '10px',
      backgroundColor: 'white',
      color: '#69738f',
      textAlign: 'center',
      borderRadius: '4px',
      border: '1px solid rgba(0, 0, 0, 0.04)',
      padding: '5px',
      position: 'absolute',
      width: '130px',
      zIndex: 1,
      bottom: '130%',
      right: '10%',
      'tooltip:hover': {
        visibility: 'visible'
      }
    },
    tooltipFilterText: {
      visibility: 'hidden',
      fontSize: '10px',
      backgroundColor: 'white',
      color: '#69738f',
      textAlign: 'center',
      borderRadius: '4px',
      border: '1px solid rgba(0, 0, 0, 0.04)',
      padding: '5px',
      position: 'absolute',
      width: '130px',
      zIndex: 1,
      bottom: '115%',
      right: '10%',
      'tooltip:hover': {
        visibility: 'visible'
      }
    }
  })
);
