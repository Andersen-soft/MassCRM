import React, { useMemo } from 'react';
import { connect } from 'formik';
import { styleNames } from 'src/services';
import { Dialog } from '@material-ui/core';
import {
  CommonInput,
  CustomTextarea,
  CommonButton,
  DateRange,
  ContactCompany,
  ContactJobInput
} from 'src/components/common';
import { format, parse } from 'date-fns';
import { ICompanyForm } from '../interfaces';
import {
  CompanyInput,
  CompanySizeInput,
  IndustryInput,
  CompanyTypeInput
} from '.';

import style from '../CompanyForm.scss';

const sn = styleNames(style);

interface Types {
  [key: string]: string[];
}

const TYPE_MAP: Types = {
  holding: ['Subsidiary'],
  subsidiary: ['Holding'],
  default: []
};

export const CompanyFormModalUI = connect<ICompanyForm & any>(
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
      setFieldValue(fieldName, value ? format(value, 'yyyy-MM-dd') : null);
    };

    const userNc1 = Boolean(role?.nc1);

    const currentType = useMemo(
      () => TYPE_MAP[type?.toLowerCase()] || TYPE_MAP.default,
      [type]
    );

    return (
      <form>
        <div className={sn('wrap')}>
          <div className={sn('create-company')}>
            <CompanyInput
              className={sn('create-company__item')}
              value={name}
              onChange={setFieldValues}
              errorMessage={errors.name}
            />
            <div className={sn('create-company__item')}>
              <CommonInput
                name='website'
                value={website}
                onChangeValue={handleChange('website')}
                placeholder='Company website'
                errorMessage={touched.website && errors.website}
              />
            </div>
            <div className={sn('create-company__item')}>
              <CommonInput
                name='linkedin'
                value={linkedin}
                onChangeValue={handleChange('linkedin')}
                placeholder='Company Linkedin'
                errorMessage={errors.linkedin}
              />
            </div>
            <div className={sn('create-company__item')}>
              <CommonInput
                name='sto_full_name'
                value={sto_full_name}
                onChangeValue={handleChange('sto_full_name')}
                placeholder='CTO'
              />
            </div>
            <IndustryInput
              className={sn('create-company__item')}
              value={industry}
              onChange={setFieldValues}
              errorMessage={touched.industry && errors.industry}
            />
            <CompanySizeInput
              className={sn('create-company__item')}
              value={companySize}
              onChange={setFieldValues}
            />
            <div className={sn('create-company__item')}>
              {isFullForm && (
                <CompanyTypeInput
                  onChange={setFieldValueHandler}
                  value={type}
                />
              )}
            </div>
            <div className={sn('create-company__item')}>
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
            <div className={sn('create-company__item')}>
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
              <div className={sn('create-company__item')}>
                <DateRange
                  name='founded'
                  onChange={onChangeDate}
                  singular
                  date={
                    founded ? [parse(founded, 'd.MM.yyyy', new Date())] : []
                  }
                  placeholder='Founded'
                />
              </div>
            )}
            {!userNc1 && (
              <div className={sn('create-company__item')}>
                <ContactJobInput
                  role={role}
                  vacancies={vacancies}
                  onChange={setFieldValueHandler}
                  errorMessage={touched.vacancies && errors.vacancies}
                />
              </div>
            )}
            <div className={sn('create-company__item')}>
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
        <div className={sn('create-company-btn')}>
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
