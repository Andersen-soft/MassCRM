import { FC } from 'react';
import { SvgIconProps } from '@material-ui/core';

export interface ILabelIconGroupProps {
  label: string | number;
  count: string | number;
  icon: FC<SvgIconProps>;
  isActive?: boolean;
  className?: string;
  dataTestId?: string;
}
