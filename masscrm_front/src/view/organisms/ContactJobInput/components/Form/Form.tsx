import React, { FC, useCallback } from 'react';
import { useFormik } from 'formik';
import { Button, Popover } from '@material-ui/core';
import { CommonButton, CommonInput } from 'src/view/atoms';
import { IContactJobValues } from 'src/interfaces';
import { contactFormJobsSchema } from 'src/utils';
import { BOTTOM, getPositionConfig, LEFT, TOP } from 'src/constants';
import { jobInputStyles } from 'src/styles';
import { INITIAL_VALUES } from './constants';
import { IContactJobForm } from './interfaces';

export const Form: FC<IContactJobForm> = ({
  anchorForm,
  data,
  onChange,
  onClose
}) => {
  const jobInputClasses = jobInputStyles();

  const handleSubmitForm = useCallback(
    (value, actions) => {
      if (anchorForm) {
        onChange(value, anchorForm.index);
      }
      actions.resetForm();
      onClose();
    },
    [anchorForm, onChange, onClose]
  );

  const initialValues: IContactJobValues = data || INITIAL_VALUES;

  const { values, resetForm, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      job: initialValues.job || '',
      skills: initialValues.skills || '',
      link: initialValues.link || ''
    },
    validationSchema: contactFormJobsSchema,
    validateOnChange: true,
    onSubmit: handleSubmitForm
  });

  const handleClose = useCallback(() => {
    resetForm();
    onClose();
  }, [resetForm, onClose]);

  return (
    <Popover
      id='form-popover'
      className={jobInputClasses.modal}
      open={!!anchorForm}
      onClose={handleClose}
      anchorEl={null ?? anchorForm?.el}
      anchorOrigin={getPositionConfig(BOTTOM, LEFT)}
      transformOrigin={getPositionConfig(TOP, LEFT)}
    >
      <form onSubmit={handleSubmit}>
        <div className={jobInputClasses.modalContent}>
          <div className={jobInputClasses.formItem}>
            <CommonInput
              name='job'
              value={values.job}
              onChangeValue={handleChange}
              placeholder='*Job'
              width='250px'
              errorMessage={errors.job}
            />
          </div>
          <div className={jobInputClasses.formItem}>
            <CommonInput
              name='skills'
              value={values.skills}
              onChangeValue={handleChange}
              placeholder='Job skills'
              width='250px'
              errorMessage={errors.skills}
            />
          </div>
          <div className={jobInputClasses.formItem}>
            <CommonInput
              name='link'
              value={values.link}
              onChangeValue={handleChange}
              placeholder='Job URL'
              width='250px'
              errorMessage={errors.link}
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
