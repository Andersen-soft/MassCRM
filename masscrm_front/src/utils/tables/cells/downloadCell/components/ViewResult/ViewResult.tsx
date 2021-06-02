import React, { FC } from 'react';
import { useStyles } from '../../downloadCell.styles';

interface IProps {
  openModalHandler?: () => void;
}

export const ViewResult: FC<IProps> = ({ openModalHandler }) => {
  const styles = useStyles();

  return (
    <button
      className={styles.download}
      type='button'
      onClick={openModalHandler}
    >
      <span className={styles.downloadTitle}>View result</span>
    </button>
  );
};
