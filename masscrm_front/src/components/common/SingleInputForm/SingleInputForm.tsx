import React, { FC, useMemo } from 'react';
import { useFormik } from 'formik';
import { Check, Close } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { createProperty } from 'src/utils/object';
import { format, parse } from 'date-fns';
import { INVALID_CHARACTERS_OR_FORMAT } from 'src/constants';
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
  isDate,
  isDoubleClick
}) => {
  const initialValues: ISingleInputForm = { editInput: value || switchValue };

  const validate = (values: ISingleInputForm) => {
    const error: { editInput?: string } = {};
    if (!values.editInput) error.editInput = 'Required field';

    const validMess =
      validation &&
      !validation(values.editInput || '') &&
      !error.editInput &&
      `${INVALID_CHARACTERS_OR_FORMAT}`;

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
    const COMPONENTS: { [index: string]: JSX.Element } = {
      [createProperty('items', !!items)]: (
        <SearchInput
          name='editInput'
          value={editInput}
          placeholder={placeholder || ''}
          items={items || []}
          onChange={onChangeHandler}
          errorMessage={errors.editInput as string}
        />
      ),
      [createProperty('switch', type === 'switch')]: (
        <CustomSwitch
          name='editInput'
          value={editInput}
          onChangeHandler={handleChange}
          label='Requires validation'
        />
      ),
      [createProperty('items', !!isDate)]: (
        <DateRange
          name='editInput'
          onChange={onChangeDate}
          placeholder='Date'
          singular
          date={editInput ? [parse(editInput, 'd.MM.yyyy', new Date())] : []}
        />
      ),
      default: (
        <CommonInput
          required={required}
          value={editInput}
          name='editInput'
          placeholder={placeholder}
          onChangeValue={handleChange}
          errorMessage={errors.editInput as string}
          isDoubleClick
        />
      )
    };

    return COMPONENTS[
      Object.keys(COMPONENTS).find(component => component) || 'default'
    ];
  }, [editInput, errors, items]);

  return (
    <form onSubmit={handleSubmit}>
      <div
        className={
          isDoubleClick ? `${sn('wrap-double')} ${sn('wrap')}` : sn('wrap')
        }
      >
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
