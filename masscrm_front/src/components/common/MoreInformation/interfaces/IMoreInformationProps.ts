import { FC } from 'react';
import { SvgIconProps } from '@material-ui/core';

export interface IMoreInformationProps {
  clearAutocompleteList?: () => void;
  icon?: FC<SvgIconProps>;
  popperInfo?: JSX.Element | Element;
  tooltip?: string;
}
