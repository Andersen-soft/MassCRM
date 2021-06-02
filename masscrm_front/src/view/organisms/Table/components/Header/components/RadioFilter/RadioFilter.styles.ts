import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    box: {
      background: '#fff',
      padding: '10px 50px 10px 22px',
      boxShadow: '0 5px 15px rgba(5, 31, 43, 0.17)',
      borderRadius: '4px'
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
      }
    },
    radioBtn: {
      '& .MuiSvgIcon-root': {
        color: '#69738F'
      }
    }
  })
);
