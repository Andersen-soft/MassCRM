import { IErrorsObject, IContactFilter } from 'src/interfaces';

export type DateFilter =
  | 'contact_created'
  | 'contact_updated'
  | 'date_of_birth'
  | 'added_to_mailing'
  | 'last_touch'
  | 'sale_created'
  | 'company_created'
  | 'date_of_use'
  | 'founded';

export interface IYesNo {
  [index: string]: number;
  Yes: number;
  No: number;
}

export interface IErrorsState {
  [index: string]: string[] | JSX.Element[] | IErrorsObject[];
  snackBarErrors: JSX.Element[];
  popUpErrors: string[];
  simplePopUpErrors: string[];
  requiredFieldsPopUpErrors: string[];
  companyDuplicateErrors: IErrorsObject[];
}

export interface IErrorsEmitterContextDefaultValues {
  handleClearErrors: () => void;
  errorsEventEmitter: any;
  errorsData: IErrorsState;
}

export interface IErrorsData {
  [key: string]: string[] | IErrorsObject[];
  errorsArray: string[];
  errorsObject: IErrorsObject[];
}

export interface IJSXErrorsData {
  [key: string]: JSX.Element[];
  errorsArray: JSX.Element[];
}

export interface IRequestValuesArgs {
  daily?: boolean;
  myContacts?: boolean;
}

export interface IFiltersContextDefaultValues {
  getRequestValues: ({
    daily,
    myContacts
  }: IRequestValuesArgs) => IContactFilter;
}
