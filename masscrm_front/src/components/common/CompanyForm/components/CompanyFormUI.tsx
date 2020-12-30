import React, { useCallback, useState } from 'react';
import { connect } from 'formik';
import { styleNames } from 'src/services';
import {
  CommonInput,
  CustomTextarea,
  CommonButton,
  CommonIcon
} from 'src/components/common';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { CSSTransition } from 'react-transition-group';
import { Dialog } from '@material-ui/core';
import { ICompanyForm } from '../interfaces';
import {
  CompanyInput,
  CompanySizeInput,
  IndustryInput,
  CompanyTypeInput
} from '.';

import style from '../CompanyForm.scss';

const sn = styleNames(style);

export const CompanyFormUI = connect<ICompanyForm & any>(
  ({
    errorDialog,
    errorsList,
    closePopup,
    formik: {
      initialValues,
      values: {
        name,
        website,
        linkedin,
        sto_full_name,
        type,
        comment,
        industries,
        companySize
      },
      errors,
      touched,
      handleReset,
      handleSubmit
    },
    handleChange,
    setFieldValueHandler,
    setFieldValues
  }) => {
    const [checked, setChecked] = useState(false);
    const [clearInput, setClearInput] = useState<boolean>(false);

    const onReset = useCallback(() => {
      !clearInput && setClearInput(true);
      return handleReset();
    }, [clearInput]);

    const onSubmit = () => {
      !clearInput && setClearInput(true);
      return handleSubmit();
    };

    const handleCloseForm = () => setChecked(prev => !prev);

    return (
      <div className={sn('form')}>
        <button type='button' className={sn('form__header')}>
          <span className={sn('form__title')}> New Contact </span>
          <CommonIcon
            IconComponent={checked ? ExpandLess : ExpandMore}
            isActive={checked}
            onClick={handleCloseForm}
          />
        </button>
        <CSSTransition
          in={checked}
          timeout={400}
          classNames={sn(`list-transition`)}
          unmountOnExit
        >
          <div className={sn(`form__body`)}>
            <form>
              <div className={sn('add-form')}>
                <div className={sn('add-form__item')}>
                  <CompanyInput
                    className={sn('add-form__item')}
                    value={name}
                    onChange={setFieldValues}
                    errorMessage={touched.name && errors.name}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    name='website'
                    value={website || initialValues.website}
                    onChangeValue={handleChange('website')}
                    placeholder='Company website'
                    errorMessage={errors.website}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    name='linkedin'
                    value={linkedin}
                    onChangeValue={handleChange('linkedin')}
                    placeholder='Company Linkedin'
                    errorMessage={errors.linkedin}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    name='CTO'
                    value={sto_full_name}
                    onChangeValue={handleChange('CTO')}
                    placeholder='CTO'
                  />
                </div>
                <CompanyTypeInput
                  onChange={setFieldValueHandler}
                  value={type}
                />
                <IndustryInput
                  className={sn('add-form__item')}
                  value={industries}
                  onChange={setFieldValues}
                  errorMessage={touched.industries && errors.industries}
                />
                <CompanySizeInput
                  className={sn('add-form__item')}
                  value={companySize}
                  onChange={setFieldValues}
                />
                <div className={sn('add-form__item')}>
                  <CustomTextarea
                    name='comment'
                    value={comment || initialValues.comment}
                    placeholder='Comment'
                    onChange={handleChange('comment')}
                  />
                </div>
              </div>
              <div className={sn('form-btn')}>
                <CommonButton
                  text='Clear'
                  type='reset'
                  onClickHandler={onReset}
                />
                <CommonButton
                  text='Submit'
                  color='yellow'
                  onClickHandler={onSubmit}
                />
              </div>
            </form>
          </div>
        </CSSTransition>
        <Dialog maxWidth='sm' open={errorsList.open} onClose={closePopup}>
          {errorDialog(handleSubmit)}
        </Dialog>
      </div>
    );
  }
);
