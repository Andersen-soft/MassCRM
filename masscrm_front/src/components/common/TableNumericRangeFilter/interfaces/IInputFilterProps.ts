export interface INumericRangeFilterProps {
  changeFilter: (value: {
    name: string;
    item: number[];
    isCheckbox?: boolean;
  }) => void;
  name: string;
}
