import { FC } from 'react';
import { SvgIconProps } from '@material-ui/core';

export interface IControlProps {
  icon?: FC<SvgIconProps>;
  id?: number;
  currentPage?: number;
  disableResetPassword?: boolean;
}
