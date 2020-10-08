import React, { useEffect } from 'react';
import { connect } from 'formik';
import { styleNames } from 'src/services';
import { CustomTextarea, CommonButton } from 'src/components/common';
import style from './AddForm/AddForm.scss';
import { PLACEHOLDER, PROMPT } from '../../../utils/blacklist';

const sn = styleNames(style);

export const AddFormUI = connect<any>(
  ({
    formik: {
      initialValues,
      values: { emails },
      handleReset,
      handleSubmit,
      handleChange
    },
    changeLines,
    tall
  }) => {
    useEffect(() => {
      changeLines(emails.split('\n').length);
    }, [emails.split('\n').length]);

    return (
      <form>
        <CustomTextarea
          name='emails'
          onChange={handleChange}
          className={tall ? sn('add-textarea-tall') : sn('add-textarea-low')}
          value={emails || initialValues.emails}
          placeholder={PLACEHOLDER}
        />
        <div className={sn('add-prompt')}>{PROMPT}</div>
        <div className={sn('add-button-group')}>
          <CommonButton
            text='Clear'
            type='reset'
            onClickHandler={handleReset}
          />
          <CommonButton
            text='Submit'
            color='yellow'
            onClickHandler={handleSubmit}
          />
        </div>
      </form>
    );
  }
);
