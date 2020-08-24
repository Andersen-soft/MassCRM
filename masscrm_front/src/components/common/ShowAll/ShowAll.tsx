import React, { FC, MouseEvent } from 'react';
import { ArrowDropDown, ArrowDropUp } from '@material-ui/icons';
import { Box } from '@material-ui/core';
import { styleNames } from 'src/services';
import { CommonIcon } from '../CommonIcon';
import style from './ShowAll.scss';

const sn = styleNames(style);

export const ShowAll: FC<{
  onClick: (event: MouseEvent<HTMLElement>) => void;
  isOpen: boolean;
}> = ({ onClick, isOpen }) => {
  return (
    <Box className={sn('show-all')} onClick={onClick}>
      <div className={sn('show-all_btn')}>Show all</div>
      <CommonIcon IconComponent={isOpen ? ArrowDropUp : ArrowDropDown} />
    </Box>
  );
};
