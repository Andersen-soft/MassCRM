import React from 'react';
import { useStyles } from './Title.styles';

export const Title = () => {
  const styles = useStyles();

  return (
    <div className={styles.dataSearch}>
      <span className={styles.dataTitle}>Today&apos;s contact</span>
    </div>
  );
};
