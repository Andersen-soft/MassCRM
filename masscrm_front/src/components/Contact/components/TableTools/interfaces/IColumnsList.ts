export interface IColumnsList {
  items: Array<{ name: string; code?: string }>;
  itemsChecked?: Array<string>;
  onChangeFilter: (value: string) => void;
  onChangeAllFilter: () => void;
  indeterminateCheckbox?: boolean;
}
