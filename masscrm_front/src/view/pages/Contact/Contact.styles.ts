import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
    dailyPlan: {
      padding: '7px 0',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center'
    },
    addContact: {
      marginBottom: '15px'
    },
    mainFilterWrapper: {
      padding: '12px 24px'
    },
    data: {
      position: 'relative',
      overflow: 'hidden',
      marginTop: '16px',
      background: '#fff',
      border: '1px solid rgba(205, 214, 225, 0.3)',
      borderRadius: '8px'
    },
    dataSearch: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      boxSizing: 'border-box',
      padding: '15px 24px'
    },
    dataTitle: {
      fontSize: '1.35em',
      fontFamily: FONT_FAMILY_PRIMARY,
      marginRight: '24px'
    },
    dataTable: {
      position: 'relative',
      width: '100%'
    },
    dataWithout: {
      position: 'relative',
      minHeight: '50vh',
      width: '100%'
    }
  })
);
