import React, { FC, useCallback } from 'react';
import { useFormik } from 'formik';
import { Button, Popover, PopoverOrigin } from '@material-ui/core';
import { CommonInput } from 'src/components/common/CommonInput';
import { CommonButton } from 'src/components/common/CommonButton';
import {
  IContactJobForm,
  IContactJobValues
} from 'src/interfaces/IContactJobInput';
import { contactFormJobsSchema } from 'src/utils/form/validateJobs';

import { jobInputStyle } from 'src/components/common/ContactJobInput/ContactJobInput.style';

const INITIAL_VALUES: IContactJobValues = {
  job: '',
  link: '',
  skills: ''
};

const ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left'
};

const TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left'
};

export const ContactJobForm: FC<IContactJobForm> = ({
  anchorForm,
  data,
  onChange,
  onClose
}) => {
  const style = jobInputStyle();
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
      className={style.modal}
      open={anchorForm !== null}
      onClose={handleClose}
      anchorEl={anchorForm ? anchorForm.el : null}
      anchorOrigin={ANCHOR_ORIGIN}
      transformOrigin={TRANSFORM_ORIGIN}
    >
      <form onSubmit={handleSubmit}>
        <div className={style.modalContent}>
          <div className={style.formItem}>
            <CommonInput
              name='job'
              value={values.job}
              onChangeValue={handleChange}
              placeholder='*Job'
              width='250px'
              errorMessage={errors.job}
            />
          </div>
          <div className={style.formItem}>
            <CommonInput
              name='skills'
              value={values.skills}
              onChangeValue={handleChange}
              placeholder='Job skills'
              width='250px'
              errorMessage={errors.skills}
            />
          </div>
          <div className={style.formItem}>
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
        <div className={style.modalFooter}>
          <Button className={style.cancelButton} onClick={handleClose}>
            Cancel
          </Button>
          <CommonButton color='yellow' text='Add' type='submit' />
        </div>
      </form>
    </Popover>
  );
};
