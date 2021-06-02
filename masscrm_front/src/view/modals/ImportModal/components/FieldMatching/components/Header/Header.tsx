import React from 'react';
import { useStyles } from './Header.styles';

export const Header = () => {
  const styles = useStyles();

  return (
    <>
      <div className={styles.title}>
        For successful data import, the file should contain required fields:
      </div>
      <div className={styles.fieldContainer}>
        <span className={styles.paddingRight40}>
          <span className={styles.fieldLabel}>For contact:</span>{' '}
          <span className={styles.fieldName}>Email</span>
        </span>
        <span>
          <span className={styles.fieldLabel}>For company:</span>{' '}
          <span className={styles.fieldName}>Company</span>
        </span>
      </div>
    </>
  );
};
