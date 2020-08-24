export interface ICheckboxFilterProps {
  name: string;
  items: Array<string>;
  itemsChecked: (string | string[])[];
  changeFilter?: (value: {
    name: string;
    item: string | string[] | null;
    isCheckbox?: boolean;
  }) => void;
}
