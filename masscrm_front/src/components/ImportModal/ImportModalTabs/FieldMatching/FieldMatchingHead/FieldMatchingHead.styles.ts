import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
  () => ({
    title: {
      color: '#212121'
    },
    fieldLabel: {
      fontSize: 12,
      whiteSpace: 'nowrap',
      color: '#939BB2'
    },
    fieldContainer: {
      paddingTop: 8,
      paddingBottom: 16
    },
    fieldName: {
      fontSize: 12,
      whiteSpace: 'nowrap',
      color: '#212121'
    },
    paddingRight40: {
      paddingRight: 40
    }
  }),
  { name: 'FieldMatchingHead' }
);
