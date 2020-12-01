import React, { FC, useMemo } from 'react';
import { useFormik } from 'formik';
import { Check, Close } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { format, parse } from 'date-fns';
import {
  CommonInput,
  CommonIcon,
  SearchInput,
  CustomSwitch,
  DateRange
} from '..';
import { ISingleInputFormProps, ISingleInputForm } from './interfaces';
import style from './SingleInputForm.scss';

const sn = styleNames(style);

export const SingleInputForm: FC<ISingleInputFormProps> = ({
  inputProps: { value, placeholder, required },
  switchValue,
  onSubmit,
  onCancel,
  items,
  validation,
  type,
  isDate
}) => {
  const initialValues: ISingleInputForm = { editInput: value || switchValue };

  const validate = (values: ISingleInputForm) => {
    const error: { editInput?: string } = {};
    if (!values.editInput) error.editInput = 'required field';
    const validMess =
      validation && !validation(values.editInput || '')
        ? 'Invalid link'
        : undefined;
    if (validMess) error.editInput = validMess;
    return error;
  };

  const {
    values: { editInput },
    handleChange,
    handleSubmit,
    errors,
    setFieldValue
  } = useFormik({
    initialValues,
    validate: required || validation ? validate : undefined,
    onSubmit: values => {
      onSubmit(values.editInput);
    }
  });

  const onSubmitHandler = () => {
    handleSubmit();
  };
  const onChangeHandler = (val: string) => {
    setFieldValue('editInput', isDate ? val.toString() : val);
  };

  const onChangeDate = (name: string, [val]: Date[]) => {
    if (val) {
      setFieldValue(name, format(val, 'yyyy-MM-dd'));
    }
  };

  const input = useMemo(() => {
    switch (true) {
      case !!items:
        return (
          <SearchInput
            name='editInput'
            value={editInput}
            placeholder={placeholder || ''}
            items={items || []}
            onChange={onChangeHandler}
            errorMessage={errors.editInput as string}
          />
        );
      case type === 'switch':
        return (
          <CustomSwitch
            name='editInput'
            value={editInput}
            onChangeHandler={handleChange}
            label='Requires validation'
          />
        );
      case isDate:
        return (
          <DateRange
            name='editInput'
            onChange={onChangeDate}
            placeholder='Date'
            singular
            date={editInput ? [parse(editInput, 'd.MM.yyyy', new Date())] : []}
          />
        );
      default:
        return (
          <CommonInput
            required={required}
            value={editInput}
            name='editInput'
            placeholder={placeholder}
            onChangeValue={handleChange}
            errorMessage={errors.editInput as string}
          />
        );
    }
  }, [editInput, errors]);

  return (
    <form onSubmit={handleSubmit}>
      <div className={sn('wrap')}>
        <div className={sn('search')}>{input}</div>
        <CommonIcon
          onClick={onSubmitHandler}
          IconComponent={Check}
          fontSize='large'
          className={sn('icon')}
        />
        <CommonIcon
          IconComponent={Close}
          onClick={onCancel}
          fontSize='large'
          className={sn('icon')}
        />
      </div>
    </form>
  );
};
