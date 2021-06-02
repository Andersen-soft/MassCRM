import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      width: '552px',
      background: '#fff',
      borderRadius: '8px'
    },
    close: {
      position: 'absolute',
      right: '8px',
      top: '8px'
    },
    item: {
      padding: '24px'
    },
    itemTitle: {
      margin: 0,
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '20px',
      lineHeight: '24px',
      color: '#212121'
    },
    itemInfo: {
      marginTop: '40px'
    },
    itemInfoDiv: {
      paddingBottom: '8px'
    },
    name: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 300,
      fontSize: '14px',
      lineHeight: '18px',
      display: 'flex',
      alignItems: 'center',
      color: '#13639d'
    },
    created: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#78829d'
    },
    date: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#212121'
    },

    responsible: {
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#78829d'
    },
    responsiblePerson: {
      width: '71px',
      height: '18px',
      fontFamily: FONT_FAMILY_PRIMARY,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#212121'
    }
  })
);
