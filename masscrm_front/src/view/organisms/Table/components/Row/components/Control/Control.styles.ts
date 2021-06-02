import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    control: {
      display: 'flex',
      justifyContent: 'flex-end',
      outline: 'none'
    },
    controlBtn: {
      background: 'transparent',
      width: '24px',
      height: '24px',
      border: 'none',
      padding: 0,
      outline: 'none',
      '&:active': {
        outline: 'none'
      },
      '&:visited': {
        outline: 'none'
      },
      '&:focus': {
        outline: 'none'
      }
    }
  })
);
