import { createStyles, makeStyles } from '@material-ui/core';

export const returnToNCFormStyles = makeStyles(() =>
  createStyles({
    form: {
      padding: '0 24px 54px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    formBlocks: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    formBlock: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '15px'
    },
    formControls: {
      display: 'flex',
      alignItems: 'center'
    },
    formControl: {
      opacity: '.5',
      marginRight: '15px'
    },
    inputColumn: {
      marginRight: '40px'
    },
    commentWrapper: {
      marginRight: '14px'
    },
    commentField: {
      height: '40px'
    },
    formButtons: {
      alignSelf: 'center',
      marginTop: '18px'
    }
  })
);
