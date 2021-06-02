import React, { FC, useCallback } from 'react';
import { useFormik } from 'formik';
import { Button, Popover } from '@material-ui/core';
import { CommonButton, CommonInput } from 'src/view/atoms';
import { MultiFormState } from 'src/interfaces';
import { jobInputStyles } from 'src/styles';
import { BOTTOM, getPositionConfig, LEFT, TOP } from 'src/constants';
import { INITIAL_VALUES } from './constants';
import { validate } from './helpers';

interface IProps {
  anchorForm: { el: HTMLElement | SVGElement; index: number } | null;
  data: MultiFormState | null;
  onChange: (data: MultiFormState, index: number) => void;
  onClose: () => void;
  placeholder?: string;
  validationSchema?: Function;
}

export const Form: FC<IProps> = ({
  anchorForm,
  data,
  onChange,
  onClose,
  placeholder,
  validationSchema
}) => {
  const jobInputClasses = jobInputStyles();

  const handleSubmit = useCallback(
    (values, actions) => {
      if (anchorForm) {
        onChange(values, anchorForm.index);
      }
      actions.resetForm();
      onClose();
    },
    [anchorForm]
  );

  const form = useFormik({
    initialValues: data || INITIAL_VALUES,
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit,
    validationSchema
  });

  const handleClose = useCallback(() => {
    form.resetForm();
    onClose();
  }, []);

  return (
    <Popover
      id='email-popover'
      className={jobInputClasses.modal}
      open={!!anchorForm}
      onClose={handleClose}
      anchorEl={null ?? anchorForm?.el}
      anchorOrigin={getPositionConfig(BOTTOM, LEFT)}
      transformOrigin={getPositionConfig(TOP, LEFT)}
    >
      <form onSubmit={form.handleSubmit}>
        <div className={jobInputClasses.modalContent}>
          <div className={jobInputClasses.formItem}>
            <CommonInput
              name='formMulti'
              value={form.values.formMulti}
              onChangeValue={form.handleChange}
              placeholder={placeholder}
              width='250px'
              errorMessage={form.errors.formMulti}
            />
          </div>
        </div>
        <div className={jobInputClasses.modalFooter}>
          <Button
            className={jobInputClasses.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <CommonButton color='yellow' text='Add' type='submit' />
        </div>
      </form>
    </Popover>
  );
};
