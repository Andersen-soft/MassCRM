export interface ICustomSwitch {
  onChangeHandler?: (event?: any) => void;
  value: boolean;
  label?: string;
  name?: string;
  disabled?: boolean;
}
