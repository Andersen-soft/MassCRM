import React, { useMemo } from 'react';
import { connect } from 'formik';
import { Dialog } from '@material-ui/core';
import { format, parse } from 'date-fns';
import {
  IndustryInput,
  ContactCompany,
  CompanySizeInput,
  ContactJobInput
} from 'src/view/organisms';
import { ICompanyForm } from 'src/interfaces';
import { CommonButton, CommonInput, CustomTextarea } from 'src/view/atoms';
import { DateRange, CompanyTypeInput } from 'src/view/molecules';
import { D_MM_YYYY, YYYY_MM_DD } from 'src/constants';
import { TYPE_MAP } from './constants';
import { useStyles } from './ModalUI.styles';

export const ModalUI = connect<ICompanyForm & any>(
  ({
    formik: {
      setFieldValue,
      touched,
      values: {
        name,
        website,
        linkedin,
        sto_full_name,
        type,
        founded,
        comment,
        industry,
        subsidiary,
        holding,
        companySize,
        vacancies
      },
      errors,
      handleSubmit
    },
    onCancel,
    isFullForm,
    onChangeHolding,
    onChangeSubsidiary,
    role,
    handleChange,
    setFieldValueHandler,
    setFieldValues,
    errorsList,
    errorDialog,
    closePopup
  }) => {
    const onChangeDate = (fieldName: string, [value]: Date[]) => {
      setFieldValue(fieldName, value ? format(value, YYYY_MM_DD) : null);
    };

    const styles = useStyles();

    const currentType = useMemo(
      () => TYPE_MAP[type?.toLowerCase()] || TYPE_MAP.default,
      [type]
    );

    return (
      <form>
        <div className={styles.wrap}>
          <div className={styles.createCompany}>
            <div className={styles.createCompanyItem}>
              <CommonInput
                name='company'
                value={name}
                onChangeValue={handleChange('company')}
                placeholder='Company'
                required
                disabled
              />
            </div>
            <div className={styles.createCompanyItem}>
              <CommonInput
                name='website'
                value={website}
                onChangeValue={handleChange('website')}
                placeholder='Company website'
                errorMessage={touched.website && errors.website}
              />
            </div>
            <div className={styles.createCompanyItem}>
              <CommonInput
                name='linkedin'
                value={linkedin}
                onChangeValue={handleChange('linkedin')}
                placeholder='Company Linkedin'
                errorMessage={errors.linkedin}
              />
            </div>
            <div className={styles.createCompanyItem}>
              <CommonInput
                name='sto_full_name'
                value={sto_full_name}
                onChangeValue={handleChange('sto_full_name')}
                placeholder='CTO'
              />
            </div>
            <IndustryInput
              className={styles.createCompanyItem}
              value={industry}
              onChange={setFieldValues}
              errorMessage={touched.industry && errors.industry}
            />
            <CompanySizeInput
              className={styles.createCompanyItem}
              value={companySize}
              onChange={setFieldValues}
            />
            <div className={styles.createCompanyItem}>
              {isFullForm && (
                <CompanyTypeInput
                  onChange={setFieldValueHandler}
                  value={type}
                  name='type'
                />
              )}
            </div>
            <div className={styles.createCompanyItem}>
              {isFullForm && (
                <ContactCompany
                  type={currentType}
                  name='subsidiary'
                  value={type && type !== 'Subsidiary' ? subsidiary : undefined}
                  onSelect={onChangeSubsidiary(setFieldValue)}
                  placeholder='Subsidiary companies'
                  disabled={!type || type === 'Subsidiary'}
                />
              )}
            </div>
            <div className={styles.createCompanyItem}>
              {isFullForm && (
                <ContactCompany
                  type={currentType}
                  name='holding'
                  value={type && type !== 'Holding' ? holding : undefined}
                  onSelect={onChangeHolding(setFieldValue)}
                  placeholder='Holding company'
                  disabled={!type || type === 'Holding'}
                />
              )}
            </div>
            {isFullForm && (
              <div className={styles.createCompanyItem}>
                <DateRange
                  name='founded'
                  code='founded'
                  onChange={onChangeDate}
                  singular
                  date={founded ? [parse(founded, D_MM_YYYY, new Date())] : []}
                  placeholder='Founded'
                />
              </div>
            )}
            {!role?.nc1 && (
              <div className={styles.createCompanyItem}>
                <ContactJobInput
                  role={role}
                  vacancies={vacancies}
                  onChange={setFieldValueHandler}
                  errorMessage={touched.vacancies && errors.vacancies}
                />
              </div>
            )}
            <div className={styles.createCompanyItem}>
              <CustomTextarea
                name='comment'
                value={comment}
                placeholder='Comment'
                onChange={handleChange('comment')}
                width='230px'
              />
            </div>
          </div>
        </div>
        <div className={styles.createCompanyBtn}>
          <CommonButton text='Cancel' type='reset' onClickHandler={onCancel} />
          <CommonButton
            text='Submit'
            color='yellow'
            onClickHandler={handleSubmit}
          />
        </div>
        <Dialog maxWidth='sm' open={errorsList.open} onClose={closePopup}>
          {errorDialog(handleSubmit)}
        </Dialog>
      </form>
    );
  }
);
