import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles({
  icon: {
    width: '18px',
    height: '18px',
    fill: '#dadada'
  },
  active: {
    cursor: 'pointer',
    '&:hover': {
      fill: '#69738f'
    }
  }
});
