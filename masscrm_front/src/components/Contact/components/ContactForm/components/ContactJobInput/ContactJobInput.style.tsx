import { createStyles, makeStyles } from '@material-ui/core';

export const jobInputStyle = makeStyles(() =>
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
    jobList: {
      marginTop: '0',
      marginBottom: '0',
      paddingLeft: '0',
      listStyle: 'none'
    },
    jobListEl: {
      display: 'grid',
      gridTemplateColumns: 'auto auto 30px 20px',
      color: '#212121',
      marginBottom: '10px',

      '& > span:not(:last-of-type)': {
        paddingRight: '10px'
      }
    },
    jobListLink: {
      color: '#13639D',
      textDecoration: 'none'
    },
    jobListIcon: {
      opacity: '.5',

      '&:hover': {
        opacity: '1'
      }
    },
    wrap: {
      position: 'relative'
    },
    error: {
      color: '#FD5757'
    }
  })
);
