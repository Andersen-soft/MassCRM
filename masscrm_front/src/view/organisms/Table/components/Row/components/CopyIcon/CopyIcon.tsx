import React, { FC } from 'react';
import { SvgIconProps, SvgIcon } from '@material-ui/core';

export const CopyIcon: FC<SvgIconProps> = props => (
  <SvgIcon {...props}>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M13.5 0H2.5C1.4 0 0.5 0.9 0.5 2V15C0.5 15.55 0.95 16 1.5 16C2.05 16 2.5 15.55 2.5 15V3C2.5 2.45 2.95 2 3.5 2H13.5C14.05 2 14.5 1.55 14.5 1C14.5 0.45 14.05 0 13.5 0ZM17.5 4H6.5C5.4 4 4.5 4.9 4.5 6V20C4.5 21.1 5.4 22 6.5 22H17.5C18.6 22 19.5 21.1 19.5 20V6C19.5 4.9 18.6 4 17.5 4ZM7.5 20H16.5C17.05 20 17.5 19.55 17.5 19V7C17.5 6.45 17.05 6 16.5 6H7.5C6.95 6 6.5 6.45 6.5 7V19C6.5 19.55 6.95 20 7.5 20Z'
    />
  </SvgIcon>
);
