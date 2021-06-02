import { FC } from 'react';

export interface ITableCell {
  code?: string;
  type?: 'string' | 'link' | 'socialIcon' | 'done';
  socialName?: 'linkedin' | 'angel' | 'xing' | 'video' | 'skype';
  data?: string | boolean | number | Date;
  component?: FC;
  isBold?: boolean;
  isComment?: boolean;
  isBlue?: boolean;
}
