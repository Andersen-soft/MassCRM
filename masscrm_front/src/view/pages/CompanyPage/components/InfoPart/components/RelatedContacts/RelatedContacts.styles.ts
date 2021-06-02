import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: '200px',
      paddingBottom: '24px'
    },
    wrapperContacts: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    title: {
      color: '#939BB2',
      marginBottom: '8px'
    },
    contact: {
      color: '#13639D',
      textDecorationStyle: 'dashed',
      textDecorationColor: '#939BB2',
      margin: '5px 15px 0 0',
      width: '32%'
    },
    contactBlock: {
      display: 'flex',
      flexWrap: 'wrap',
      alignContent: 'baseline',
      overflow: 'auto',
      height: '135px'
    },
    spaceBetween: {
      justifyContent: 'space-between'
    }
  })
);
