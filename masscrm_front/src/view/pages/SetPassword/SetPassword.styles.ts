import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    mainForm: {
      height: '100vh',
      backgroundSize: 'cover'
    },
    wrapper: {
      width: '100%',
      height: '100%',
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
      height: '507px',
      background: '#ffffff',
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
      fontSize: '1.4em',
      lineHeight: '33px',
      textAlign: 'center',
      color: '#212121'
    },
    loginLabel: {
      display: 'flex',
      flexDirection: 'row',
      marginLeft: '56px'
    },
    loginSubLabel1: {
      color: '#78829d'
    },
    loginSubLabel2: {
      marginLeft: '16px'
    },
    inputBlock: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: '40px'
    },
    helperText: {
      width: '363px',
      height: '51px',
      marginBottom: '40px',
      fontSize: '0.86em',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 300,
      lineHeight: '140%',
      color: '#78829d'
    },
    infoBlock: {
      width: '570px',
      height: '156px',
      background: '#ffffff',
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
    input: {
      marginBottom: '16px'
    },
    inputBig: {
      marginBottom: '32px'
    },
    info: {
      width: '458px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    },
    errorBlock: {
      background: '#fff',
      width: '570px',
      height: '156px',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px'
    }
  })
);
