import { createStyles, makeStyles } from '@material-ui/core';

export const mainFilterStyle = makeStyles(() =>
  createStyles({
    filterWrapper: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative'
    },
    title: {
      fontSize: '18px',
      lineHeight: '18px',
      marginRight: '55px'
    },
    littleInput: {
      width: '160px'
    },
    normalInput: {
      width: '230px'
    },
    input: {
      '& .MuiOutlinedInput-root': {
        paddingRight: '0px !important'
      },
      marginRight: '16px'
    }
  })
);
