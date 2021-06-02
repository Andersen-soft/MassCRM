import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    tableTools: {
      display: 'flex',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      padding: '0 24px 12px'
    },
    tooltip: {
      position: 'relative',
      top: '-1px'
    },
    tableToolsItem: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    tableToolsIcon: {
      padding: '0 5px'
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
      right: '10%'
    }
  })
);
