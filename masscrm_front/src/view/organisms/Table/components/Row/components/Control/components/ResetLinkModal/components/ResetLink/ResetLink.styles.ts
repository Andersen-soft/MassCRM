import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    mainBlock: {
      width: '584px',
      height: '228px',
      background: '#fff',
      boxShadow: '0 0 50px rgba(0, 0, 0, 0.08)',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '1.14em',
      lineHeight: '200%'
    },
    mainTitle: {
      width: '472px',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      lineHeight: '24px',
      display: 'flex',
      justifyContent: 'center'
    },
    titleLogin: {
      width: '472px',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      lineHeight: '24px',
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '48px'
    }
  })
);
