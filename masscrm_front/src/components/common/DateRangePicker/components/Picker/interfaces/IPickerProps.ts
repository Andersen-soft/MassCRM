import { MaterialUiPickersDate } from 'material-ui-pickers';

export interface IPickerProps {
  hasDataRangeFilter?: boolean;
  onlyCalendar: boolean;
  shouldDisableDate: (value: Date) => void;
  minDate?: MaterialUiPickersDate;
  maxDate?: MaterialUiPickersDate;
  value: Array<Date>;
  onChange?: (
    clear: boolean,
    value?: Array<MaterialUiPickersDate | undefined>
  ) => () => void;
  onClose?: (value: Array<Date>) => void;
  onOpen?: () => void;
  labelFunc?: (dates: Array<MaterialUiPickersDate>, invalid: boolean) => string;
  emptyLabel?: string;
  autoOk?: boolean;
  classes?: {
    day: MaterialUiPickersDate;
    hidden: string;
    current: string;
    isDisabled: string;
    isSelected: string;
    beginCap: string;
    endCap: string;
  };
  disableToolbar?: boolean;
  disabledYear?: boolean;
  placeholder: string;
  singular?: boolean;
  onClean?: () => void;
  isCleaned?: boolean;
  open: boolean;
}
