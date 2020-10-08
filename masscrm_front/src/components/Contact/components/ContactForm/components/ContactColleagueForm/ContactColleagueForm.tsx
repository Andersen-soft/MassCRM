import React, { FC, useCallback } from 'react';
import { useFormik } from 'formik';
import { Button, Popover, PopoverOrigin } from '@material-ui/core';
import { CommonInput } from 'src/components/common/CommonInput';
import { CommonButton } from 'src/components/common/CommonButton';
import {
  IColleagueFormState,
  IContactColleagueForm
} from 'src/interfaces/IContactColleague';

import { jobInputStyle } from 'src/components/common/ContactJobInput/ContactJobInput.style';

const INITIAL_VALUES: IColleagueFormState = {
  full_name: '',
  link: ''
};
const ANCHOR_ORIGIN: PopoverOrigin = {
  vertical: 'bottom',
  horizontal: 'left'
};
const TRANSFORM_ORIGIN: PopoverOrigin = {
  vertical: 'top',
  horizontal: 'left'
};

export const ContactColleagueForm: FC<IContactColleagueForm> = ({
  anchorForm,
  data,
  onChange,
  onClose
}) => {
  const style = jobInputStyle();

  const handleClose = useCallback(resetForm => {
    resetForm();
    onClose();
  }, []);
  const handleSubmit = useCallback(
    (values, actions) => {
      if (anchorForm) {
        onChange(values, anchorForm.index);
      }
      handleClose(actions.resetForm);
    },
    [anchorForm]
  );
  const form = useFormik({
    initialValues: data || INITIAL_VALUES,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: handleSubmit
  });

  return (
    <Popover
      id='colleague-popover'
      className={style.modal}
      open={anchorForm !== null}
      onClose={() => handleClose(form.resetForm)}
      anchorEl={anchorForm ? anchorForm.el : null}
      anchorOrigin={ANCHOR_ORIGIN}
      transformOrigin={TRANSFORM_ORIGIN}
    >
      <form onSubmit={form.handleSubmit}>
        <div className={style.modalContent}>
          <div className={style.formItem}>
            <CommonInput
              name='full_name'
              value={form.values.full_name}
              onChangeValue={form.handleChange}
              placeholder='Full name'
              width='250px'
              required
              errorMessage={form.errors.full_name}
            />
          </div>
          <div className={style.formItem}>
            <CommonInput
              name='link'
              value={form.values.link}
              onChangeValue={form.handleChange}
              placeholder='Linkedin'
              width='250px'
              errorMessage={form.errors.link}
            />
          </div>
        </div>
        <div className={style.modalFooter}>
          <Button
            className={style.cancelButton}
            onClick={() => handleClose(form.resetForm)}
          >
            Cancel
          </Button>
          <CommonButton color='yellow' text='Add' type='submit' />
        </div>
      </form>
    </Popover>
  );
};
