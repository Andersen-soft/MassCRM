import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundSize: 'cover'
    },
    logo: {
      width: '140px',
      height: '43px',
      position: 'absolute',
      top: '50px'
    },
    mainBlock: {
      width: '472px',
      height: '373px',
      background: '#fff',
      boxShadow: '0 10px 15px rgba(5, 31, 43, 0.05)',
      borderRadius: '8px'
    },
    title: {
      position: 'static',
      left: '125px',
      marginTop: '56px',
      marginBottom: '40px',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '2em',
      lineHeight: '33px',
      textAlign: 'center',
      color: '#212121'
    },
    inputBlock: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    input: {
      marginBottom: '32px'
    },
    inputBig: {
      marginBottom: '40px'
    },
    info: {
      width: '458px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    }
  })
);
