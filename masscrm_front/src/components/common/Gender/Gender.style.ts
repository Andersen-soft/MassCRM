import { createStyles, makeStyles } from '@material-ui/core';

export const genderStyle = makeStyles(() =>
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
        marginLeft: '-7px',
        marginTop: '2px'
      }
    },
    radioBtn: {
      '& .MuiSvgIcon-root': {
        color: '#69738F'
      }
    }
  })
);
