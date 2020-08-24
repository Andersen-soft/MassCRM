export type IEmailFormState = { formEmail: string };

export interface IContactEmailValues {
  [index: string]: string;
  formEmail: string;
}

export interface IContactEmailInput {
  items: Array<string>;
  value?: string;
  name?: string;
  required?: boolean;
  errorMessage?: string;
  width?: string;
  disabled?: boolean;
  hideClearBtn?: boolean;
  eventInResult?: boolean;
  onChange: (fieldName: string, value: Array<string>) => void;
}

export interface IContactEmailForm {
  anchorForm: { el: HTMLElement | SVGElement; index: number } | null;
  data: IEmailFormState | null;
  onChange: (data: IEmailFormState, index: number) => void;
  onClose: () => void;
}
