import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useStyles } from './Loader.styles';

export const Loader = () => {
  const styles = useStyles();

  return (
    <div className={styles.loaderWrapper}>
      <CircularProgress className={styles.loader} />
    </div>
  );
};
