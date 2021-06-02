import { createStyles, makeStyles } from '@material-ui/core';
import { FONT_FAMILY_PRIMARY } from 'src/constants';

export const useStyles = makeStyles(() =>
  createStyles({
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
    }
  })
);
