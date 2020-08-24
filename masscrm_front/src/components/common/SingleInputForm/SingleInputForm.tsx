import React, { FC } from 'react';
import { useFormik } from 'formik';
import { Check, Close } from '@material-ui/icons';
import { styleNames } from 'src/services';
import { CommonInput, CommonIcon, SearchInput } from '..';
import { ISingleInputFormProps, ISingleInputForm } from './interfaces';
import style from './SingleInputForm.scss';

const sn = styleNames(style);

export const SingleInputForm: FC<ISingleInputFormProps> = ({
  inputProps: { value, placeholder, ...inputProps },
  onSubmit,
  onCancel,
  items,
  validation
}) => {
  const initialValues: ISingleInputForm = { editInput: value };

  const validate = (values: ISingleInputForm) => {
    const error: { editInput?: string } = {};
    if (!values.editInput) error.editInput = 'required field';
    const validMess = validation && validation(values.editInput || '');
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
    validate,
    onSubmit: values => {
      onSubmit(values.editInput);
    }
  });

  const onSubmitHandler = () => {
    handleSubmit();
  };
  const onChangeHandler = (val: string) => {
    setFieldValue('editInput', val);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={sn('wrap')}>
        <div className={sn('search')}>
          {items ? (
            <SearchInput
              name='editInput'
              value={editInput}
              placeholder={placeholder || ''}
              items={items}
              onChange={onChangeHandler}
              errorMessage={errors.editInput}
            />
          ) : (
            <CommonInput
              {...inputProps}
              value={editInput}
              name='editInput'
              placeholder={placeholder}
              onChangeValue={handleChange}
              errorMessage={errors.editInput}
            />
          )}
        </div>
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
