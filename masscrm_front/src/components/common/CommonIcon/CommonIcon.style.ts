import { createStyles, makeStyles } from '@material-ui/core';

export const iconStyle = makeStyles(() =>
  createStyles({
    icon: {
      color: '#DADADA',
      cursor: 'pointer',
      '&:hover': {
        color: '#69738F'
      }
    },
    iconClickable: {
      cursor: 'pointer',
      '&:hover': {
        color: '#69738F'
      }
    },
    iconActive: {
      color: '#69738F',
      '&:hover': {
        color: '#DADADA'
      }
    },
    box: {
      display: 'flex',
      alignItems: 'flex-start'
    },
    iconBtn: {
      padding: 0
    }
  })
);
