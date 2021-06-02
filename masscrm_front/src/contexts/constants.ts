import { IYesNo, IErrorsState } from './interfaces';

export const GENDERS: { label: string; value: string }[] = [
  { label: 'Male', value: 'm' },
  { label: 'Female', value: 'f' }
];

export const VALIDATION_VALUE: IYesNo = {
  Yes: 1,
  No: 0
};

export const INITIAL_VALUES: IErrorsState = {
  snackBarErrors: [],
  popUpErrors: [],
  simplePopUpErrors: [],
  requiredFieldsPopUpErrors: [],
  companyDuplicateErrors: []
};
