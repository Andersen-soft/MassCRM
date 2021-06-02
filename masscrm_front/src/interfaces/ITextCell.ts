export interface ICompanyOrContactArgs {
  error: { [key: string]: string[] };
  inputValue: string;
  submitFunction: Function;
  wrongField: string;
  isUrl?: boolean;
}
