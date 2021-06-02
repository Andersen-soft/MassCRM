import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    moreBtn: {
      background: 'transparent',
      border: 'none',
      padding: 0,
      outline: 'none',
      width: '24px',
      height: '24px',
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
