import { FormikProps } from 'formik';

export type IMultiFormState = { formMulti: string };

export interface ICustomMultiValues {
  [index: string]: string;
  formMulti: string;
}

export interface ICustomMultiInput {
  items: Array<string>;
  value?: string;
  id: string;
  name: string;
  placeholder?: string;
  keys?: Array<string>;
  required?: boolean;
  errorMessage?: string;
  errorRequired?: string;
  width?: string;
  disabled?: boolean;
  hideClearBtn?: boolean;
  onChange: (fieldName: string, value: Array<string> | string) => void;
  formik?: FormikProps<Array<string> | string | boolean | undefined>;
  clear?: boolean;
  resetClearInputState?: () => void;
  validationSchema?: Function;
}

export interface ICustomMultiRows {
  items: Array<string>;
  placeholder?: string;
  onEditHandler: (index: number, event: EventTarget) => void;
  onRemoveHandler: (index: number) => void;
}

export interface ICustomMultiForm {
  anchorForm: { el: HTMLElement | SVGElement; index: number } | null;
  data: IMultiFormState | null;
  onChange: (data: IMultiFormState, index: number) => void;
  onClose: () => void;
  placeholder?: string;
  validationSchema?: Function;
}
