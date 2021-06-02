import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    customBody: {
      '& .MuiTableCell-root ': {
        color: '#212121',
        fontWeight: '100',
        padding: '10px',
        '& :hover': {
          textDecoration: 'underline dashed #939BB2'
        }
      },
      '& .MuiTableRow-root:nth-child(odd)': {
        backgroundColor: '#F9F9FA'
      },
      '& .MuiTableCell-root.bold ': {
        fontWeight: 'bold'
      },
      '& .MuiTableCell-root.blueText ': {
        color: '#13639D'
      }
    },
    customTooltip: {
      background: '#fff'
    },
    customTableRow: {
      display: 'flex'
    },
    wrapper: {
      zIndex: 1,
      position: 'absolute',
      top: '9px',
      left: '8px'
    },
    mainTitle: {
      height: '40px',
      width: '130px',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '16px',
      display: 'flex',
      alignItems: 'center'
    },
    info: {
      height: '40px',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '12px',
      lineHeight: '16px',
      display: 'flex',
      alignItems: 'center'
    },
    wrapperTableRow: {
      padding: '16px'
    }
  })
);
