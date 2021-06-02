import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    section: {
      backgroundColor: '#feda00'
    },
    subHeader: {
      display: 'flex',
      alignItems: 'center'
    },
    startLine: {
      borderRadius: '1px',
      width: '2px',
      height: '20px',
      margin: '16px 0 0 24px'
    },
    subTitle: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '16px',
      lineHeight: '20px',
      color: '#212121',
      margin: '16px 0 0 24px'
    },
    divide: {
      width: '1298px',
      height: '0px',
      marginLeft: '16px',
      border: '1px solid #E5E9F0'
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    column: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '67%'
    },
    columnSmall: {
      width: '33%'
    },
    anotherTestField: {
      backgroundColor: '#939bb2'
    },
    wrapperForShowMoreButton: {
      marginBottom: '6px'
    },
    spanRightForButton: {
      float: 'right'
    },
    wrapperForDataPair: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    },
    icon: {
      width: '16px',
      height: '16px'
    },
    spanLeft: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#939BB2'
    },
    spanRight: {
      float: 'right'
    },
    logo: {
      width: '16px',
      height: '16px'
    },
    commentField: {
      textAlign: 'right',
      float: 'right',
      width: '275px'
    },
    list: {
      padding: '10px 20px'
    },
    item: {
      width: '50%',
      boxSizing: 'border-box',
      paddingRight: '40px',
      marginBottom: '16px',
      '&:last-child': {
        margin: '0 0 16px auto'
      }
    }
  })
);
