import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const infoPartStyles = makeStyles(() =>
  createStyles({
    infoBody: {
      marginTop: '16px',
      backgroundColor: '#FFFFFF',
      height: 'auto',
      borderRadius: '8px',
      overflow: 'hidden',
      position: 'relative'
    },
    infoTabsTools: {
      margin: '16px 24px 16px 0',
      position: 'absolute',
      top: '-5px',
      right: 0
    },
    infoContent: {
      padding: '16px 24px 0 24px'
    },
    title: {
      position: 'relative',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontSize: '16px',
      lineHeight: '20px',
      color: '#212121',
      margin: '16px 0'
    },
    titleCurrent: {
      marginLeft: '10px',
      '&:before': {
        content: '',
        position: 'absolute',
        left: '-8px',
        backgroundColor: '#46C662',
        width: '2px',
        height: '20px'
      }
    },
    section: {
      '&:last-child': {
        borderTop: '1px solid #E5E9F0'
      },
      width: '100%'
    },
    wrapper: {
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    },
    column: {
      width: '33%',
      paddingRight: '40px',
      boxSizing: 'border-box',
      '&:nth-child(3n+3)': {
        padding: 0
      }
    },
    columnItem: {
      marginBottom: '16px'
    },
    previousColumn: {
      '&:nth-child(3n+3)': {
        marginRight: 0
      },
      width: '33%',
      marginBottom: '8px',
      marginRight: '7px',
      boxSizing: 'border-box',
      borderRadius: '8px',
      padding: '16px 16px 0 16px',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.15)'
    },
    item: {
      paddingRight: '40px',
      boxSizing: 'border-box',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
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
      float: 'right',
      display: 'flex',
      alignItems: 'center'
    },
    columnValue: {
      marginRight: '8px'
    },
    wrapperMin: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    tabs: {
      marginLeft: '24px'
    }
  })
);
