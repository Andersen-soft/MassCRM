import React, { useCallback, useState } from 'react';
import { connect } from 'formik';
import { styleNames } from 'src/services';
import {
  CommonInput,
  CustomTextarea,
  Gender,
  SearchInput,
  CustomSwitch,
  CommonButton,
  CustomMultiInput,
  ContactJobInput,
  ContactCompany,
  CommonIcon
} from 'src/components/common';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { CSSTransition } from 'react-transition-group';
import style from '../ContactForm.scss';
import { IContactForm } from '../interfaces';

const sn = styleNames(style);

export const ContactFormUI = connect<IContactForm & any>(
  ({
    isEditedFullName,
    onChangeFullName,
    countries,
    regions,
    industries,
    cities,
    onChangeCountry,
    onChangeRegion,
    setSearchField,
    onChangeCompany,
    onChangeIndustry,
    companySizeFilter,
    role,
    formik: {
      initialValues,
      values,
      errors,
      touched,
      handleReset,
      handleSubmit,
      handleBlur,
      setFieldValue,
      handleChange: formikHandleChange
    },
    handleChange,
    handleChangeFirstLastName,
    setFieldValueHandler
  }) => {
    const userNc1 = Boolean(role?.nc1);
    const {
      first_name,
      last_name,
      full_name,
      gender,
      country,
      region,
      city,
      linkedin,
      comment,
      company,
      companyWebSite,
      companySize,
      companyLinkedIn,
      social_networks,
      industry,
      phones,
      position,
      emails,
      CTO,
      validation,
      vacancies
    } = values;
    const [checked, setChecked] = useState(false);
    const [clearInput, setClearInput] = useState<boolean>(false);

    const resetClearInputState = () => setClearInput(false);

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
                  <CommonInput
                    name='first_name'
                    onChangeValue={handleChangeFirstLastName('first_name')}
                    placeholder='First name'
                    required
                    value={first_name || initialValues.first_name}
                    errorMessage={touched.first_name && errors.first_name}
                    onBlur={handleBlur}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    name='last_name'
                    value={last_name || initialValues.last_name}
                    onChangeValue={handleChangeFirstLastName('last_name')}
                    placeholder='Last name'
                    required
                    errorMessage={touched.last_name && errors.last_name}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    name='full_name'
                    value={
                      isEditedFullName
                        ? full_name
                        : `${first_name || ''}${
                            last_name ? ' ' : ''
                          }${last_name || ''}`
                    }
                    onChangeValue={onChangeFullName(setFieldValue)}
                    placeholder='Full name'
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <Gender
                    name='gender'
                    value={gender || initialValues.gender}
                    onChangeHandler={handleChange('gender')}
                    errorMessage={errors.gender}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CustomMultiInput
                    id='social_network'
                    name='social_networks'
                    items={social_networks || initialValues.social_networks}
                    onChange={setFieldValue}
                    placeholder='Social network'
                    errorMessage={errors.social_network}
                    clear={clearInput}
                    resetClearInputState={resetClearInputState}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <SearchInput
                    required
                    name='country'
                    value={country || initialValues.country}
                    placeholder='Country'
                    items={countries}
                    onChange={onChangeCountry(setFieldValue)}
                    errorMessage={!country && touched.country && errors.country}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <SearchInput
                    name='region'
                    value={region || initialValues.region}
                    placeholder='Region'
                    items={regions}
                    onChange={onChangeRegion(setFieldValue)}
                    disabled={!country}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <SearchInput
                    name='city'
                    value={city || initialValues.city}
                    placeholder='City'
                    items={cities}
                    onChange={setSearchField(setFieldValue, 'city')}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    required
                    name='position'
                    value={position || initialValues.position}
                    onChangeValue={handleChange('position')}
                    placeholder='Position'
                    errorMessage={touched.position && errors.position}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CustomMultiInput
                    id='phone'
                    name='phones'
                    items={phones || initialValues.phones}
                    placeholder='Phone'
                    onChange={setFieldValue}
                    errorMessage={errors.phone}
                    clear={clearInput}
                    resetClearInputState={resetClearInputState}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    name='linkedin'
                    value={linkedin}
                    onChangeValue={handleChange('linkedin')}
                    placeholder='Linkedin'
                    errorMessage={errors.linkedin}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <ContactCompany
                    required
                    value={company || initialValues.company}
                    onSelect={onChangeCompany(setFieldValue)}
                    name='company'
                    placeholder='Company'
                    errorMessage={touched.company && errors.company}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    name='companyWebSite'
                    value={companyWebSite || initialValues.companyWebSite}
                    onChangeValue={handleChange('companyWebSite')}
                    placeholder='Company website'
                    errorMessage={errors.companyWebSite}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <SearchInput
                    name='industry'
                    value={industry || initialValues.industry}
                    items={industries}
                    onChange={onChangeIndustry(setFieldValue)}
                    multi
                    placeholder='Industry'
                    required
                    errorMessage={touched.industry && errors.industry}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CustomMultiInput
                    id='email'
                    name='emails'
                    items={emails}
                    placeholder='E-mail'
                    onChange={setFieldValueHandler}
                    errorMessage={errors?.email}
                    errorRequired={touched?.emails && errors?.emails}
                    required
                    clear={clearInput}
                    resetClearInputState={resetClearInputState}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <SearchInput
                    name='companySize'
                    value={companySize || initialValues.companySize}
                    placeholder='Company size'
                    items={companySizeFilter}
                    onChange={setSearchField(setFieldValue, 'companySize')}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    name='companyLinkedIn'
                    value={companyLinkedIn}
                    onChangeValue={handleChange('companyLinkedIn')}
                    placeholder='Company linkedin'
                    errorMessage={errors.companyLinkedIn}
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CommonInput
                    name='CTO'
                    value={CTO || initialValues.CTO}
                    onChangeValue={handleChange('CTO')}
                    placeholder='CTO'
                  />
                </div>
                <div className={sn('add-form__item')}>
                  <CustomSwitch
                    name='validation'
                    value={validation}
                    onChangeHandler={formikHandleChange}
                    label='Requires validation'
                  />
                </div>
                {!userNc1 && (
                  <>
                    <div className={sn('add-form__align')} />
                    <div className={sn('add-form__item')}>
                      <ContactJobInput
                        vacancies={vacancies || []}
                        onChange={setFieldValueHandler}
                        errorMessage={touched.vacancies && errors.vacancies}
                      />
                    </div>
                  </>
                )}
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
      </div>
    );
  }
);
