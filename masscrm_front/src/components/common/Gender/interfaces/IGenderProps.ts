import { ChangeEvent } from 'react';

export interface IGenderProps {
  value?: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  errorMessage?: string;
  required?: boolean;
}
