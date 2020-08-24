import { ReactNode } from 'react';

export interface ICustomSelectProps {
  items: Array<string>;
  placeholder: string;
  multi?: boolean;
  value?: string | Array<string>;
  name?: string;
  required?: boolean;
  errorMessage?: string | string[];
  width?: string;
  disabled?: boolean;
  hideClearBtn?: boolean;
  eventInResult?: boolean;
  onChange: Function;
  inputClassName?: string;
  information?: ReactNode;
}
