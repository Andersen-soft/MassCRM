import React, { FC, useCallback } from 'react';
import { useFormik } from 'formik';
import { Button, Popover, PopoverOrigin } from '@material-ui/core';
import { CommonInput } from 'src/components/common/CommonInput';
import { CommonButton } from 'src/components/common/CommonButton';
import {
  ICustomMultiForm,
  IMultiFormState
} from 'src/interfaces/ICustomMultiInput';
import { validate } from 'src/components/common/CustomMultiForm/helpers';
import { jobInputStyle } from 'src/components/Contact/components/ContactForm/components/ContactJobInput/ContactJobInput.style';

const INITIAL_VALUES: IMultiFormState = {
  formMulti: ''
};
const ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left'
};
const TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left'
};

export const CustomMultiForm: FC<ICustomMultiForm> = ({
  anchorForm,
  data,
  onChange,
  onClose,
  placeholder
}) => {
  const style = jobInputStyle();

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
      id='email-popover'
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
              name='formMulti'
              value={form.values.formMulti}
              onChangeValue={form.handleChange}
              placeholder={placeholder}
              width='250px'
              required
              errorMessage={form.errors.formMulti}
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
