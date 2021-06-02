import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    toggleHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '0 25px'
    },
    toggleBlock: {
      marginTop: '16px',
      padding: '25px 0',
      backgroundColor: '#FFFFFF',
      height: 'auto',
      borderRadius: '8px'
    },
    toggleTitle: {
      marginRight: '25px',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: '1.3em'
    }
  })
);
