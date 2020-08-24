import React, {
  FC,
  useState,
  useContext,
  useEffect,
  ReactElement
} from 'react';
import { MaterialUiPickersDate } from 'material-ui-pickers/typings/date';
import { MuiPickersContext } from '@material-ui/pickers';
import cn from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import { IPickerProps } from './interfaces';
import { pickerStyle, dayStyle } from './Picker.style';

const DatePickerBody: FC<IPickerProps> = ({
  minDate,
  onlyCalendar,
  PickerComponent,
  shouldDisableDate,
  value,
  onChange,
  onClose,
  onOpen,
  classes,
  placeholder,
  singular,
  autoOk,
  labelFunc,
  emptyLabel,
  disabledYear,
  hasDataRangeFilter,
  ...props
}: IPickerProps) => {
  const pickerClasses = pickerStyle();
  const [begin, setBegin] = useState<MaterialUiPickersDate | undefined>(
    value[0]
  );
  const [end, setEnd] = useState<MaterialUiPickersDate | undefined>(value[1]);
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
      ? React.cloneElement(dayComponent, {
          onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            setBegin(day);
            setEnd(undefined);
            if (autoOk) {
              onChange && onChange([begin, day].sort());
              onClose && onClose([begin, day].sort());
            }
          },
          className: stylesDay
        })
      : React.cloneElement(dayComponent, {
          onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            e.stopPropagation();
            if (!begin) setBegin(day);
            else if (!end) {
              setEnd(day);
              if (autoOk) {
                onChange && onChange([begin, day].sort());
                onClose && onClose([begin, day].sort());
              }
            } else {
              setBegin(day);
              setEnd(undefined);
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
    onClose && onClose([begin, end].sort());
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

  const onChangeHandle = () => onClose && onClose([begin, end].sort());

  useEffect(() => {
    if (begin && end && onChange) {
      onChange([begin, end].sort());
    }
  }, [begin, end]);

  return (
    <PickerComponent
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
      InputProps={{
        classes: {
          underline: pickerClasses.MuiInputUnderline
        }
      }}
      PopoverProps={{
        classes: {
          paper: `${pickerClasses.MuiPopoverPaper} ${disabledYear &&
            pickerClasses.MuiPopoverPaperY} `
        }
      }}
    />
  );
};

export const DateRangePicker = withStyles(dayStyle, {
  name: 'DateRangePicker'
})(DatePickerBody);
