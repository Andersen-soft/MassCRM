import { createStyles, makeStyles } from '@material-ui/core';
import { MEDIA_DESKTOP_MEDIUM } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    wrap: {
      background: '#fff',
      display: 'flex',
      paddingBottom: '24px'
    },

    createCompany: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'wrap',
      width: '100%',
      height: '580px',

      [`${MEDIA_DESKTOP_MEDIUM}`]: {
        alignItems: 'center',
        height: '1170px'
      },

      marginTop: '-24px',
      paddingLeft: '20px',

      '&: first-child': {
        paddingRight: '20px',
        paddingLeft: '0'
      }
    },
    createCompanyItem: {
      width: '230px',
      padding: '12px 20px',
      '&: empty': {
        padding: '0'
      }
    },

    createCompanyBtn: {
      textAlign: 'center'
    }
  })
);
