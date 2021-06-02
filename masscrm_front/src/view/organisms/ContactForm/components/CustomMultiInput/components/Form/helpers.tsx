import { MultiFormState } from 'src/interfaces';

export const validate = (values: MultiFormState) => {
  const errors: { formMulti?: string } = {};
  if (!values.formMulti) errors.formMulti = 'Required field';
  return errors;
};
