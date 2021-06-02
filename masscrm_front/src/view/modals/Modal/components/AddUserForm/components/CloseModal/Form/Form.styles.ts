import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    mainBlock: {
      width: '584px',
      height: '204px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#ffffff',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
      borderRadius: '8px'
    },
    mainTitle: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      lineHeight: '24px',
      marginBottom: '48px'
    }
  })
);
