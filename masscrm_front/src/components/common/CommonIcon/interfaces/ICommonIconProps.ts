import { FC } from 'react';
import { SvgIconProps } from '@material-ui/core';

export interface ICommonIconProps {
  IconComponent: FC<SvgIconProps>;
  resetFilter?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  dataTestId?: string;
}
