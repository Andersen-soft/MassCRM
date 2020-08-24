import React, { FC, useCallback } from 'react';
import { useFormik } from 'formik';
import { Button, Popover, PopoverOrigin } from '@material-ui/core';
import { CommonInput } from 'src/components/common/CommonInput';
import { CommonButton } from 'src/components/common/CommonButton';
import {
  IContactJobForm,
  IContactJobValues
} from 'src/interfaces/IContactJobInput';
import { jobInputStyle } from '../ContactJobInput/ContactJobInput.style';

const INITIAL_VALUES: IContactJobValues = {
  job: '',
  skills: '',
  link: ''
};
const KEYS: Array<string> = ['job', 'skills', 'link'];
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

  const validate = (values: IContactJobValues) => {
    const errors: {
      [index: string]: string | undefined;
      job?: string;
      skills?: string;
      link?: string;
    } = {};

    KEYS.forEach((item: string) => {
      if (!values[item]) {
        errors[item] = 'Required field';
      }
    });

    return errors;
  };
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
    onSubmit: handleSubmit
  });
  const handleClose = useCallback(() => {
    form.resetForm();
    onClose();
  }, []);

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
      <form onSubmit={form.handleSubmit}>
        <div className={style.modalContent}>
          <div className={style.formItem}>
            <CommonInput
              name='job'
              value={form.values.job}
              onChangeValue={form.handleChange}
              placeholder='Job'
              width='250px'
              required
              errorMessage={form.errors.job}
            />
          </div>
          <div className={style.formItem}>
            <CommonInput
              name='skills'
              value={form.values.skills}
              onChangeValue={form.handleChange}
              placeholder='Job skills'
              width='250px'
              required
              errorMessage={form.errors.skills}
            />
          </div>
          <div className={style.formItem}>
            <CommonInput
              name='link'
              value={form.values.link}
              onChangeValue={form.handleChange}
              placeholder='Job URL'
              width='250px'
              required
              errorMessage={form.errors.link}
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
