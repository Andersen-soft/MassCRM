import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    customNativeInput: {
      '& .MuiSelect-nativeInput': {
        left: '32px'
      }
    },
    mainForm: {
      height: 543,
      width: 938,
      borderRadius: 8,
      background: '#ffffff'
    },
    title: {
      position: 'absolute',
      top: 24,
      left: 24,
      width: 313,
      height: 32,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 20,
      lineHeight: 23,
      display: 'flex',
      alignItems: 'center'
    },
    info: {
      position: 'absolute',
      top: 72,
      left: 24,
      width: 579,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: 12,
      lineHeight: '140%',
      display: 'flex',
      alignItems: 'center'
    },
    inputsBlock: {
      position: 'absolute',
      top: 139,
      left: 24,
      display: 'grid',
      gridTemplateColumns: '270px 270px',
      gridRowGap: 24,
      gridColumnGap: 40
    },
    textAreaWrapper: {
      position: 'absolute',
      top: 138,
      right: 24,
      width: 270,
      height: 105
    },
    switchBlock: {
      position: 'absolute',
      top: 387,
      left: 24,
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 12,
      color: '#939bb2'
    },
    switchRow: {
      display: 'grid',
      gridTemplateColumns: '55px 36px 34px',
      gridColumnGap: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonsWrapper: {
      position: 'absolute',
      top: 475,
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    modalBack: {
      zIndex: 2,
      position: 'absolute',
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.479)',
      display: 'flex',
      alignItems: 'center'
    },
    modalCanсel: {
      margin: '0px auto',
      width: 584,
      height: 204,
      background: '#ffffff',
      boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.05)',
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    modalText: {
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: 20,
      lineHeight: 24,
      marginBottom: 48
    }
  }),
  { name: 'AddUserForm' }
);
