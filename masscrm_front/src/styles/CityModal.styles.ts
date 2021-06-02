import { createStyles, makeStyles } from '@material-ui/core';

export const cityModalStyles = makeStyles(() =>
  createStyles({
    dialog: {
      '& .MuiPaper-rounded': {
        borderRadius: '8px'
      },
      '& .MuiDialogContent-root': {
        padding: '0 24px'
      }
    },
    contentWrapper: {
      width: '820px'
    },
    closeIcon: {
      position: 'absolute',
      right: '8px',
      top: '8px'
    },
    inputWrapper: {
      maxHeight: '210px',
      overflow: 'auto'
    },
    inputsBlock: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '8px',
      marginBottom: '24px'
    },
    inputs: {
      marginRight: '20px'
    },
    countryInputBlock: {
      display: 'flex'
    },
    iconsBlock: {
      display: 'flex',
      marginLeft: '8px',
      paddingTop: '9px'
    },
    iconButton: {
      width: '24px',
      height: '24px',
      color: '#b4b9c7',
      '&:hover': {
        color: '#69738f'
      }
    },
    addMore: {
      width: '90px',
      marginTop: '-10px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      color: '#78829d',
      cursor: 'pointer',
      lineHeight: '14px',
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none'
    },
    addIcon: {
      marginLeft: '4px',
      width: '16px',
      height: '16px'
    },
    buttonBlock: {
      marginTop: '35px',
      marginBottom: '24px',
      textAlign: 'center'
    }
  })
);
