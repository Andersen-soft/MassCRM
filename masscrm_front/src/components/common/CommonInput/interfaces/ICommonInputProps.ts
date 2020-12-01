import { ChangeEvent } from 'react';

export interface ICommonInputProps {
  width?: string;
  type?: 'text' | 'email' | 'number' | 'password';
  required?: boolean;
  value?: string;
  isValid?: boolean;
  placeholder?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChangeValue: (
    value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  autoFocus?: string;
}
