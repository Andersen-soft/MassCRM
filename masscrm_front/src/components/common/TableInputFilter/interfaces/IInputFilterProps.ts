export interface IInputFilterProps {
  placeholder: string;
  items: Array<string>;
  changeFilter: (value: {
    name: string;
    item: string | string[] | (string | string[])[] | null;
    isCheckbox?: boolean;
  }) => void;
  changeInput?: (value: string, name: string) => void;
  value?: string | string[];
  name: string;
  errorMessage?: string;
  multiSelect?: boolean;
}
