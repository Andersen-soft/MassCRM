import React from 'react';
import { useStyles } from './TitlePanel.styles';

export const TitlePanel = () => {
  const styles = useStyles();

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Review page</div>
      <div className={styles.totalBlock}>
        <div className={styles.totalBlockTitle}>Total:</div>
        {/* TODO remove hardcore */}
        <div className={styles.totalBlockNumber}>9</div>
      </div>
    </div>
  );
};

export default TitlePanel;
