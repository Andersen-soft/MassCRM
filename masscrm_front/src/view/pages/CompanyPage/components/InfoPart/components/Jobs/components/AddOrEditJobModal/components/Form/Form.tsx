import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { CommonButton, CommonInput } from 'src/view/atoms';
import { IContactJobValues, ContactsJobs } from 'src/interfaces';
import { contactFormJobsSchema, checkJobUrl } from 'src/utils';
import {
  getCompanyWithRelatedContactsRequest,
  updateCompany
} from 'src/store/slices';
import { INITIAL_VALUES } from './constants';
import { useStyles } from './Form.styles';

interface IProps {
  onClose: Function;
  onCancel: (event?: any) => void;
  companyId: number;
  vacancies?: ContactsJobs;
  vacancyToEdit: IContactJobValues;
  modalType: string;
}

export const AddOrEditJobForm: FC<IProps> = ({
  onClose,
  onCancel,
  companyId,
  vacancies,
  vacancyToEdit,
  modalType
}) => {
  const styles = useStyles();

  const dispatch = useDispatch();

  const handleSubmitForm = useCallback(
    (value, actions) => {
      const checkedUrlValue = checkJobUrl(value);

      if (vacancies?.length) {
        updateCompany(companyId, {
          vacancies:
            modalType === 'add'
              ? [...vacancies, checkedUrlValue]
              : [
                  ...vacancies.map(vacancy =>
                    vacancy.id === vacancyToEdit.id
                      ? { id: vacancy.id, ...checkedUrlValue }
                      : vacancy
                  )
                ]
        }).then(() =>
          dispatch(getCompanyWithRelatedContactsRequest(companyId))
        );
      } else {
        updateCompany(companyId, { vacancies: [checkedUrlValue] }).then(() =>
          dispatch(getCompanyWithRelatedContactsRequest(companyId))
        );
      }
      actions.resetForm();
      onClose();
    },
    [vacancyToEdit]
  );

  const initialValues: IContactJobValues = vacancyToEdit || INITIAL_VALUES;

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      job: initialValues.job || '',
      skills: initialValues.skills || '',
      link: initialValues.link || ''
    },
    validationSchema: contactFormJobsSchema,
    validateOnChange: true,
    onSubmit: handleSubmitForm
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.modalContent}>
        <div className={styles.formItem}>
          <CommonInput
            name='job'
            value={values.job}
            onChangeValue={handleChange}
            placeholder='*Job'
            width='100%'
            errorMessage={errors.job}
          />
        </div>
        <div className={styles.formItem}>
          <CommonInput
            name='skills'
            value={values.skills}
            onChangeValue={handleChange}
            placeholder='Job skills'
            width='100%'
            errorMessage={errors.skills}
          />
        </div>
        <div className={styles.formItem}>
          <CommonInput
            name='link'
            value={values.link}
            onChangeValue={handleChange}
            placeholder='Job URL'
            width='100%'
            errorMessage={errors.link}
          />
        </div>
      </div>
      <div className={styles.modalFooter}>
        <CommonButton onClickHandler={onCancel} text='Cancel' />
        <CommonButton color='yellow' text='Save' type='submit' />
      </div>
    </form>
  );
};
