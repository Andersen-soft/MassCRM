import React, {
  FC,
  useState,
  useContext,
  useEffect,
  ReactElement,
  MouseEvent,
  cloneElement
} from 'react';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import { MuiPickersContext, DatePicker } from '@material-ui/pickers';
import cn from 'classnames';
import { withStyles } from '@material-ui/core';
import { useStyles, dayStyle } from './Picker.styles';

interface IProps {
  hasDataRangeFilter?: boolean;
  onlyCalendar: boolean;
  shouldDisableDate: (value: Date) => void;
  minDate?: MaterialUiPickersDate;
  maxDate?: MaterialUiPickersDate;
  value: Date[];
  onChange?: (
    clear: boolean,
    value?: (MaterialUiPickersDate | undefined)[]
  ) => () => void;
  onClose?: (value: Date[]) => void;
  onOpen?: () => void;
  labelFunc?: (dates: MaterialUiPickersDate[], invalid: boolean) => string;
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
  clearable?: boolean;
}

const DatePickerBody: FC<IProps> = ({
  minDate,
  onlyCalendar,
  shouldDisableDate,
  value,
  onChange,
  onClose,
  onOpen,
  classes,
  placeholder,
  singular,
  labelFunc,
  emptyLabel,
  disabledYear,
  hasDataRangeFilter,
  onClean,
  autoOk,
  isCleaned,
  clearable,
  ...props
}) => {
  const styles = useStyles();

  const [{ begin, end }, setPickerValues] = useState<{
    begin: MaterialUiPickersDate | undefined;
    end: MaterialUiPickersDate | undefined;
  }>(() => {
    const [beginDay, endDay] = value;

    return { begin: beginDay, end: endDay };
  });

  const [hover, setHover] = useState<MaterialUiPickersDate | undefined>(
    undefined
  );

  const utils = useContext(MuiPickersContext);

  const formatDate = (date: Date) => utils?.format(date, 'd.M.Y');

  const min = Math.min(begin, end || hover) as MaterialUiPickersDate;
  const max = Math.max(begin, end || hover) as MaterialUiPickersDate;

  const renderDay = (
    day: MaterialUiPickersDate,
    selectedDate: MaterialUiPickersDate,
    dayInCurrentMonth: boolean,
    dayComponent: ReactElement
  ) => {
    const stylesDay = cn(
      classes?.day,
      classes && {
        [classes.hidden]: dayComponent.props.hidden,
        [classes.current]: dayComponent.props.current,
        [classes.isDisabled]: dayComponent.props.disabled,
        [classes.isSelected]: day >= min && day <= max,
        [classes.beginCap]: utils?.isSameDay(day, singular ? begin : min),
        [classes.endCap]: utils?.isSameDay(day, max)
      }
    );

    return singular
      ? cloneElement(dayComponent, {
          onClick: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            setPickerValues({ begin: day, end: undefined });
            if (autoOk) {
              onChange && onChange(false, [begin, day].sort())();
              onClose && onClose([begin, day].sort());
            }
          },
          className: stylesDay
        })
      : cloneElement(dayComponent, {
          onClick: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            if (!begin) {
              setPickerValues(state => ({
                ...state,
                begin: day
              }));
            } else if (!end) {
              setPickerValues(state => ({
                ...state,
                end: day
              }));
              if (autoOk) {
                onChange && onChange(false, [begin, day].sort())();
                onClose && onClose([begin, day].sort());
              }
            } else {
              setPickerValues({ begin: day, end: undefined });
            }
          },
          onMouseEnter: () => setHover(day),
          className: stylesDay
        });
  };

  const currentYear = new Date().getFullYear();

  const newProps = disabledYear
    ? {
        ...props,
        minDate: new Date(currentYear, 1, 1),
        maxDate: new Date(currentYear, 12, 31),
        views: ['month', 'date']
      }
    : { ...props };

  const onCloseHandle = () => {
    onClose && onClose([begin, end]);
  };

  const labelFuncHandle = (
    date: MaterialUiPickersDate,
    invalid: MaterialUiPickersDate
  ) => {
    if (labelFunc) {
      return labelFunc([begin, end].sort(), !!invalid);
    }
    if (date && begin && end) {
      return `${formatDate(begin)} - ${formatDate(end)}`;
    }
    return date && begin ? `${formatDate(begin)}` : emptyLabel || '';
  };

  const onChangeHandle = () => {
    onChange && onChange(false, [begin, end])();
  };

  useEffect(() => {
    if (begin && end && onChange) {
      onChange(false, [begin, end])();
    }
  }, [begin, end]);

  useEffect(() => {
    if (isCleaned) {
      setPickerValues({ begin: undefined, end: undefined });
    }
  }, [isCleaned]);

  return (
    <DatePicker
      {...newProps}
      value={begin}
      renderDay={renderDay}
      placeholder={placeholder}
      onClose={onCloseHandle}
      onOpen={onOpen}
      variant='inline'
      openTo={!hasDataRangeFilter ? 'year' : 'date'}
      disableToolbar
      onChange={onChangeHandle}
      views={['year', 'month', 'date']}
      labelFunc={labelFuncHandle}
      clearable={clearable}
      autoOk={autoOk}
      InputProps={{
        classes: {
          underline: styles.MuiInputUnderline
        }
      }}
      PopoverProps={{
        classes: {
          paper: `${styles.MuiPopoverPaper} ${disabledYear &&
            styles.MuiPopoverPaperY} `
        }
      }}
    />
  );
};

export const DateRangePicker = withStyles(dayStyle, {
  name: 'DateRangePicker'
})(DatePickerBody);
