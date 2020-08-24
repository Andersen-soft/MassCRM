import { IMultiFormState } from 'src/interfaces/ICustomMultiInput';

export const validate = (values: IMultiFormState) => {
  const errors: { formMulti?: string } = {};
  if (!values.formMulti) errors.formMulti = 'required field';
  return errors;
};
