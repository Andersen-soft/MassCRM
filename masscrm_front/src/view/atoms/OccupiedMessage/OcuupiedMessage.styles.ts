import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapperThree: {
      textAlign: 'center',
      minWidth: '500px',
      padding: '30px'
    },

    occupied: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      lineHeight: '24px',
      color: '#212121'
    },
    buttons: {
      marginTop: '40px'
    }
  })
);
