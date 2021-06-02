import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      position: 'relative'
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
      ':hover': {
        visibility: 'visible'
      }
    }
  })
);
