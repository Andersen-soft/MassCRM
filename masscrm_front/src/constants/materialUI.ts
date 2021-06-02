import { PopoverOrigin } from '@material-ui/core';

type PopoverVertical = 'top' | 'bottom' | 'center';
type PopoverHorizontal = 'left' | 'right' | 'center';

export const getPositionConfig = (
  vertical: PopoverVertical,
  horizontal: PopoverHorizontal
): PopoverOrigin => ({
  vertical,
  horizontal
});

export const TOP = 'top';
export const BOTTOM = 'bottom';
export const LEFT = 'left';
export const RIGHT = 'right';
export const CENTER = 'center';

export const TOP_START = 'top-start';
export const TOP_END = 'top-end';
