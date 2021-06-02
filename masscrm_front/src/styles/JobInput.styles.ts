import { makeStyles, createStyles } from '@material-ui/core';

export const jobInputStyles = makeStyles(() =>
  createStyles({
    label: {
      fontSize: '0.85em',
      color: '#939BB2',
      marginBottom: '8px'
    },
    modal: {
      '& .MuiPaper-elevation8': {
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)'
      }
    },
    modalContent: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 15px 0'
    },
    formItem: {
      marginBottom: '20px'
    },
    modalFooter: {
      textAlign: 'center',
      padding: '0 15px 20px'
    },
    cancelButton: {
      fontSize: '0.85em',
      color: '#939BB2',
      textTransform: 'inherit',
      fontWeight: 'normal'
    },
    buttonsWrap: {
      display: 'flex'
    },
    wrap: {
      position: 'relative',
      maxHeight: '180px',
      overflow: 'hidden auto'
    },
    error: {
      color: '#FD5757'
    }
  })
);
