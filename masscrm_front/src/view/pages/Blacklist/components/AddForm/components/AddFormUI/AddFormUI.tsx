import React, { useEffect } from 'react';
import { connect } from 'formik';
import { CommonButton, CustomTextarea } from 'src/view/atoms';
import { PLACEHOLDER, PROMPT } from 'src/utils';
import { useStyles } from './AddFormUI.styles';

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

    const styles = useStyles();

    return (
      <form>
        <CustomTextarea
          name='emails'
          dataTestId='add-contact-textarea'
          onChange={handleChange}
          className={tall ? styles.addTextAreaTall : styles.addTextAreaLow}
          value={emails || initialValues.emails}
          placeholder={PLACEHOLDER}
        />
        <div className={styles.addPrompt}>{PROMPT}</div>
        <div className={styles.addButtonGroup}>
          <CommonButton
            text='Clear'
            type='reset'
            dataTestId='add-contact-clear'
            onClickHandler={handleReset}
          />
          <CommonButton
            text='Submit'
            color='yellow'
            dataTestId='add-contact-submit'
            onClickHandler={handleSubmit}
          />
        </div>
      </form>
    );
  }
);
