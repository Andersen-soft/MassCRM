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

export interface ITableCellText {
  className?: string;
  value: string;
  switchValue?: boolean;
  onSubmitChanges: (value?: string | boolean) => void;
  required?: boolean;
  link?: string;
  validation?: (val: string) => boolean;
  type?: 'link' | 'text' | 'switch' | 'linkedin' | 'skype';
  isDate?: boolean;
  href?: string;
}
