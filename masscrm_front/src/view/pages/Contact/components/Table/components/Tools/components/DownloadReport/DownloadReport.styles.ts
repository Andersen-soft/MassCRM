import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    tooltip: {
      position: 'relative',
      top: '-2px'
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
    },
    preExport: {},
    preExportQuestion: {
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      lineHeight: '24px',
      color: '#212121'
    },
    preExportCheckboxBlock: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      p: {
        marginLeft: '20px'
      }
    }
  })
);
