import { FC, ReactNode } from 'react';

export interface ITableCell {
  code?: string;
  type?: 'string' | 'link' | 'socialIcon' | 'done';
  socialName?: 'linkedin' | 'angel' | 'xing' | 'video' | 'skype';
  data?: string | boolean | number;
  component?: FC;
  isBold?: boolean;
  isBlue?: boolean;
}

export interface ITableCellText {
  className?: string;
  value: string;
  onSubmitChanges: (value?: string) => void;
  required?: boolean;
  link?: string;
  td?: ReactNode;
  validation?: (val: string) => string | false;
}
