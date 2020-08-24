import * as React from 'react';
import { useStyles } from './FieldMatchingHead.styles';

export const FieldMatchingHead: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.title}>
        For successful data import, the file should contain required fields:
      </div>
      <div className={classes.fieldContainer}>
        <span className={classes.paddingRight40}>
          <span className={classes.fieldLabel}>For contact:</span>{' '}
          <span className={classes.fieldName}>E-mail</span>
        </span>
        <span>
          <span className={classes.fieldLabel}>For company:</span>{' '}
          <span className={classes.fieldName}>Company</span>
        </span>
      </div>
    </>
  );
};
