import React, { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { CommonInput, CommonButton } from 'src/components/common';
import {
  IContactJobValues,
  IContactsJobs
} from 'src/interfaces/IContactJobInput';
import { contactFormJobsSchema } from 'src/utils/form/validateJobs';
import { getOneCompanyRequest, updateCompany } from 'src/actions';

import { jobInputStyle } from './AddOrEditFormInput.style';

const INITIAL_VALUES: IContactJobValues = {
  job: '',
  link: '',
  skills: ''
};

export const AddOrEditJobForm: FC<{
  onClose: Function;
  onCancel: (event?: any) => void;
  companyId: number;
  vacancies?: IContactsJobs;
  vacancyToEdit: IContactJobValues;
  modalType: string;
}> = ({
  onClose,
  onCancel,
  companyId,
  vacancies,
  vacancyToEdit,
  modalType
}) => {
  const style = jobInputStyle();

  const dispatch = useDispatch();

  const handleSubmitForm = useCallback(
    (value, actions) => {
      if (vacancies?.length) {
        updateCompany(companyId, {
          vacancies:
            modalType === 'add'
              ? [...vacancies, value]
              : [
                  ...vacancies.map(vacancy =>
                    vacancy.id === vacancyToEdit.id
                      ? { id: vacancy.id, ...value }
                      : vacancy
                  )
                ]
        }).then(() => dispatch(getOneCompanyRequest(companyId)));
      } else {
        updateCompany(companyId, { vacancies: [value] }).then(() =>
          dispatch(getOneCompanyRequest(companyId))
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
      <div className={style.modalContent}>
        <div className={style.formItem}>
          <CommonInput
            name='job'
            value={values.job}
            onChangeValue={handleChange}
            placeholder='*Job'
            width='100%'
            errorMessage={errors.job}
          />
        </div>
        <div className={style.formItem}>
          <CommonInput
            name='skills'
            value={values.skills}
            onChangeValue={handleChange}
            placeholder='Job skills'
            width='100%'
            errorMessage={errors.skills}
          />
        </div>
        <div className={style.formItem}>
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
      <div className={style.modalFooter}>
        <CommonButton onClickHandler={onCancel} text='Cancel' />
        <CommonButton color='yellow' text='Save' type='submit' />
      </div>
    </form>
  );
};
