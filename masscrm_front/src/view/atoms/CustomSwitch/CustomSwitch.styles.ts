import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    switch: {
      color: '#939BB2',
      width: 'auto',
      height: 'auto',
      '& .MuiSwitch-root': {
        padding: '9px'
      },
      '& .MuiTypography-body1': {
        fontSize: '0.85em'
      },
      '& .MuiSwitch-track': {
        width: '36px',
        height: '20px',
        borderRadius: '20px',
        backgroundColor: 'rgba(105, 115, 143, 0.5)'
      },
      '& .MuiSwitch-colorSecondary.Mui-checked': {
        color: '#fff',
        transform: 'translateX(15px)'
      },
      '& .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#FEDA00'
      },
      '& .MuiSwitch-thumb': {
        width: '16px',
        height: '16px'
      },
      '& .MuiSwitch-switchBase': {
        margin: '9px 10px',
        padding: '2px'
      }
    }
  })
);

export const disabledStyles = makeStyles(() => ({
  disabled: {
    cursor: 'default',
    '&:hover': {
      backgroundColor: 'inherit'
    }
  }
}));
