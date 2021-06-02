import React, { FC, useMemo } from 'react';
import { useFormik } from 'formik';
import { Check, Close } from '@material-ui/icons';
import { createProperty } from 'src/utils';
import { format, parse } from 'date-fns';
import { ICommonInputProps } from 'src/interfaces';
import { CommonInput, CommonIcon, CustomSwitch } from 'src/view/atoms';
import {
  D_MM_YYYY,
  INVALID_CHARACTERS_OR_FORMAT,
  YYYY_MM_DD
} from 'src/constants';
import { DateRange } from 'src/view/molecules';
import { SearchInput } from 'src/view/organisms';
import { ISingleInputForm } from './interfaces';
import { useStyles } from './SingleInputForm.styles';

interface IProps {
  inputProps: ICommonInputProps;
  onSubmit: (val?: any) => void;
  onCancel: () => void;
  items?: string[];
  validation?: (val: string) => boolean;
  type?: 'link' | 'text' | 'switch' | 'linkedin' | 'skype' | string;
  switchValue?: boolean;
  isDate?: boolean;
  isDoubleClick?: boolean;
}

export const SingleInputForm: FC<IProps> = ({
  inputProps: { value, placeholder = '', required },
  switchValue,
  onSubmit,
  onCancel,
  items = [],
  validation,
  type,
  isDate,
  isDoubleClick
}) => {
  const styles = useStyles();

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
      setFieldValue(name, format(val, YYYY_MM_DD));
    }
  };

  const input = useMemo(() => {
    const COMPONENTS: { [index: string]: JSX.Element } = {
      [createProperty('items', !!items)]: (
        <SearchInput
          name='editInput'
          value={editInput}
          placeholder={placeholder}
          items={items}
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
          code='edit_input'
          onChange={onChangeDate}
          placeholder='Date'
          singular
          date={editInput ? [parse(editInput, D_MM_YYYY, new Date())] : []}
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
          isDoubleClick
            ? `${styles.wrapperDouble} ${styles.wrapper}`
            : styles.wrapper
        }
      >
        <div className={styles.search}>{input}</div>
        <CommonIcon
          onClick={onSubmitHandler}
          IconComponent={Check}
          fontSize='large'
          className={styles.search}
        />
        <CommonIcon
          IconComponent={Close}
          onClick={onCancel}
          fontSize='large'
          className={styles.icon}
        />
      </div>
    </form>
  );
};
