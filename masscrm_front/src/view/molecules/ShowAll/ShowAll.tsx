import React, { FC, MouseEvent } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import { CommonIcon } from 'src/view/atoms';
import { useStyles } from './ShowAll.styles';

interface IProps {
  onClick: (event: MouseEvent<HTMLElement>) => void;
  isOpen: boolean;
  title?: string;
}

export const ShowAll: FC<IProps> = ({
  onClick,
  isOpen,
  title = 'Show all'
}) => {
  const styles = useStyles();

  return (
    <Box className={styles.showAll} onClick={onClick}>
      <div className={styles.showAllBtn}>{title}</div>
      <CommonIcon IconComponent={isOpen ? ArrowDropUp : ArrowDropDown} />
    </Box>
  );
};
