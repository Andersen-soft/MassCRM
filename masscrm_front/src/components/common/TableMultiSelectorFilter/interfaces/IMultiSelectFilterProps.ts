export interface IMultiSelectFilterProps {
  multi?: boolean;
  value?: Array<string>;
  items: Array<string>;
  changeFilter?: (p: { item: Array<string>; name: string | undefined }) => void;
  resetFilter?: (name: string | undefined) => Function;
  onChange: (event?: string | number) => void;
  placeholder: string;
  name?: string;
  required?: boolean;
  errorMessage?: string;
}
