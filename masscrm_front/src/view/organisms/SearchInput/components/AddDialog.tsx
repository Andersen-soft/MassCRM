import React, { FC, useCallback } from 'react';
import {
  FormControl,
  TextField,
  FormControlClassKey,
  Dialog
} from '@material-ui/core';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createNewIndustry, fetchIndustriesList } from 'src/store/slices';
import { createIndustrySchema } from 'src/utils';
import { CommonButton } from 'src/view/atoms';
import { ISearchItem } from 'src/interfaces';
import { commonInputStyles } from 'src/styles';
import { INITIAL_VALUE } from './constants';

interface IProps {
  name?: string;
  openDialog: boolean;
  handleSetOpenDialog: () => void;
  placeholder: string;
  errorMessage?: string;
  className?: Partial<Record<FormControlClassKey, string>> | undefined;
  handleSubmitAction: Function;
  industries: string[];
  existValue: (string | ISearchItem)[];
  width?: string;
  padding?: string;
}

export const AddDialog: FC<IProps> = ({
  name,
  openDialog,
  handleSetOpenDialog,
  placeholder,
  className,
  handleSubmitAction,
  industries,
  existValue,
  width = '400px',
  padding = '20px'
}) => {
  const commonInputClasses = commonInputStyles();

  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (values, actions) => {
      createNewIndustry(values.industry).then(() => {
        dispatch(fetchIndustriesList());
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
          style={{ width, padding }}
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
          <div className={commonInputClasses.buttonGroup}>
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

export default AddDialog;
