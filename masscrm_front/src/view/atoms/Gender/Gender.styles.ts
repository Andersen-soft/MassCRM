import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    box: {
      width: '230px',
      textAlign: 'left'
    },
    label: {
      fontSize: '0.85em',
      color: '#939BB2'
    },
    radio: {
      '& .MuiTypography-root': {
        fontSize: '0.85em',
        color: '#939BB2'
      },
      '& .MuiIconButton-root': {
        padding: '5px'
      },
      '& .MuiFormControlLabel-root': {
        marginTop: '2px',
        marginRight: '12px',
        marginLeft: '-7px'
      }
    },
    radioBtn: {
      '& .MuiSvgIcon-root': {
        color: '#69738F'
      }
    },
    error: {
      color: '#FD5757',
      marginTop: '4px',
      fontSize: '0.85em',
      position: 'absolute'
    }
  })
);
