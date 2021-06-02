import { createStyles, makeStyles } from '@material-ui/core';

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
      width: '452px',
      height: '234px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: '#fff',
      boxShadow: '0 10px 15px rgba(5, 31, 43, 0.05)',
      borderRadius: '8px',
      padding: '93px 60px'
    },
    info: {
      color: '#69738F',
      fontWeight: 300,
      fontSize: '18px',
      margin: '32px 0',
      textAlign: 'center'
    },
    button: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: 'none',
      background: '#F4F5F9',
      outline: 'none',
      fontSize: '14px',
      lineHeight: '16px',
      color: '#69738F',
      borderRadius: '50px',
      padding: '8px 20px',
      cursor: 'pointer'
    },
    buttonSpan: {
      marginRight: '11px'
    }
  })
);
