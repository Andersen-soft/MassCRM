import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      width: '24px',
      height: '24px',

      '&:hover': {
        cursor: 'pointer',

        parentStyle: {
          fill: '#69738f'
        }
      }
    },
    parentStyle: {
      fill: '#dadada'
    }
  })
);
