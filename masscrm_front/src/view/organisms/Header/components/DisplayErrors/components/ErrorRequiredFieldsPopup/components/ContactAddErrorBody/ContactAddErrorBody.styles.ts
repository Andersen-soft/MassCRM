import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column'
    },

    title: {
      fontSize: '20px',
      margiBottom: '16px',
      lineHeight: '24px'
    },

    subtitle: {
      fontSize: '16px',
      fontWeight: 300,
      lineHeight: '200%'
    },

    link: {
      fontSize: '14px',
      fontWeight: 300,
      display: 'inline - block',
      border: 'none',
      background: 'transparent',
      padding: '0',
      color: '#13639D',
      textDecoration: 'underline',
      cursor: 'pointer',
      '&:focus, &:active': {
        outline: 'none'
      }
    }
  })
);
