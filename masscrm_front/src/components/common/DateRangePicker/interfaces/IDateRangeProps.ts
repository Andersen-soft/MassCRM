export interface IDateRangeProps {
  placeholder: string;
  minDate?: Date;
  maxDate?: Date;
  date?: Array<Date>;
  disabledYear?: boolean;
  singular?: boolean;
  onChange: Function;
  name?: string;
  changeFilter?: (value: {
    name: string;
    item: string | string[] | null | Date[];
    isCheckbox?: boolean;
  }) => void;
  hasDataRangeFilter?: boolean;
}
