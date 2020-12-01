import React, { FC, useCallback } from 'react';
import { FormControl, TextField, FormControlClassKey } from '@material-ui/core';
import { inputStyle } from 'src/styles/CommonInput.style';
import Dialog from '@material-ui/core/Dialog';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createNewIndustry, getIndustriesList } from 'src/actions';
import { createIndustrySchema } from 'src/utils/form/validate';
import { CommonButton } from '../../CommonButton';
import { ISearchItem } from '../interfaces';

interface IInitValues {
  industry: string;
}

interface IPropsAddDialog {
  name?: string;
  openDialog: boolean;
  handleSetOpenDialog: () => void;
  placeholder: string;
  errorMessage?: string;
  className?: Partial<Record<FormControlClassKey, string>> | undefined;
  handleSubmitAction: Function;
  industries: string[];
  existValue: (string | ISearchItem)[];
}

const INITIAL_VALUE: IInitValues = {
  industry: ''
};

export const AddDialog: FC<IPropsAddDialog> = ({
  name,
  openDialog,
  handleSetOpenDialog,
  placeholder,
  className,
  handleSubmitAction,
  industries,
  existValue
}) => {
  const style = inputStyle();
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (values, actions) => {
      createNewIndustry(values.industry).then(() => {
        dispatch(getIndustriesList());
        actions.resetForm();
        handleSubmitAction([...existValue, values.industry]);
        handleSetOpenDialog();
      });
    },
    [openDialog]
  );

  const handleClose = useCallback(() => {
    handleSetOpenDialog();
  }, [openDialog]);

  const form = useFormik({
    initialValues: INITIAL_VALUE,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: handleSubmit,
    validationSchema: createIndustrySchema(industries)
  });

  return (
    <Dialog open={openDialog} onClose={handleSetOpenDialog}>
      <form onSubmit={form.handleSubmit} onReset={form.handleReset}>
        <FormControl
          style={{ width: '400px', padding: '20px' }}
          variant='outlined'
          classes={className}
        >
          <TextField
            id={name}
            name={name}
            value={form.values.industry}
            onChange={form.handleChange}
            label={placeholder}
            variant='outlined'
            autoComplete='off'
            error={!!form.touched && !!form.errors.industry}
            autoFocus
            helperText={!!form.touched && form.errors.industry}
          />
          <div className={style.buttonGroup}>
            <CommonButton
              color='white'
              text='Cancel'
              type='reset'
              onClickHandler={handleClose}
            />
            <CommonButton color='yellow' text='Create' type='submit' />
          </div>
        </FormControl>
      </form>
    </Dialog>
  );
};
