import React, { FC, MouseEvent } from 'react';
import { GetApp as DownloadIcon } from '@material-ui/icons';
import { CommonIcon } from 'src/view/atoms';
import { useStyles } from '../../downloadCell.styles';

interface IProps {
  onClickHandler: (event: MouseEvent<HTMLElement>) => void;
}

export const Download: FC<IProps> = ({ onClickHandler }) => {
  const styles = useStyles();

  return (
    <button onClick={onClickHandler} type='button' className={styles.download}>
      <CommonIcon IconComponent={DownloadIcon} />
      <span className={styles.downloadTitle}>Download</span>
    </button>
  );
};
