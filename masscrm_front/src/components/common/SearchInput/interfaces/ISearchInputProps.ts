export interface ISearchItem {
  key: string;
  label: string;
}
export interface ISearchInputProps {
  width?: string;
  placeholder: string;
  items: Array<string | ISearchItem>;
  onChange: Function;
  onSelect?: Function;
  value?: string | ISearchItem;
  name?: string;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  inputValue?: string;
  freeSolo?: boolean;
  onBlur?: () => void;
  onFocus?: () => void;
  multi?: boolean;
  autoFocus?: string;
  createNewIndustry?: Function;
  isScrollForm?: boolean;
}
