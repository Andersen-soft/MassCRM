import { createStyles, makeStyles } from '@material-ui/core';

export const progressStyle = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative'
    },
    top: {
      color: '#FEDA00',
      position: 'absolute',
      left: 0
    },
    bottom: {
      color: '#E5E9F0'
    }
  })
);
