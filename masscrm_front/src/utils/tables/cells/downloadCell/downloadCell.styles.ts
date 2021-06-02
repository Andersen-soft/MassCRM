import { makeStyles, createStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    download: {
      display: 'flex',
      border: 'none',
      background: 'transparent',
      cursor: 'pointer',
      alignItems: 'center',
      padding: 0,
      outline: 'none'
    },
    downloadTitle: {
      color: '#13639D',
      fontWeight: 100,
      fontSize: '0.875rem',
      fontFamily: FONT_FAMILY_PRIMARY
    }
  })
);
