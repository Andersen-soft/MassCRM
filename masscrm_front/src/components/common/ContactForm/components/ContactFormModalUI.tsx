import React, { useMemo } from 'react';
import { connect } from 'formik';
import { styleNames } from 'src/services';
import {
  CommonInput,
  CustomTextarea,
  Gender,
  CustomSwitch,
  CommonButton,
  SliderRange,
  DateRange,
  CustomMultiInput,
  ContactCompany,
  ContactJobInput
} from 'src/components/common/index';
import { format, parse } from 'date-fns';
import { Dialog } from '@material-ui/core';
import { IContactForm } from '../interfaces';
import {
  CountryInput,
  CityInput,
  CompanyInput,
  CompanySizeInput,
  IndustryInput,
  OriginInput,
  RegionInput,
  CompanyTypeInput
} from '.';
import style from '../ContactForm.scss';

const sn = styleNames(style);

export const ContactFormModalUI = connect<IContactForm & any>(
  ({
    formik: {
      setFieldValue,
      touched,
      values: {
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
        vacancies,
        company_founded,
        company_holding,
        company_subsidiary,
        company_type,
        confidence,
        origin,
        skype,
        birthday,
        countryCode,
        regionCode
      },
      errors,
      handleSubmit,
      handleChange: formikHandleChange
    },
    isEditedFullName,
    onChangeFullName,
    onCancel,
    isFullForm,
    onChangeHolding,
    onChangeSubsidiary,
    role,
    handleChange,
    handleChangeFirstLastName,
    setFieldValueHandler,
    setFieldValues,
    errorDialog,
    errorsList,
    closePopup,
    autoFocus
  }) => {
    const onChangeConfidence = (val: number) =>
      setFieldValue('confidence', val);

    const onChangeDate = (name: string, [value]: Date[]) => {
      setFieldValue(name, value ? format(value, 'yyyy-MM-dd') : null);
    };

    const userNc1 = Boolean(role?.nc1);

    const currentType = useMemo(() => {
      switch (company_type?.toLowerCase()) {
        case 'holding':
          return ['Subsidiary'];
        case 'subsidiary':
          return ['Holding'];
        default:
          return [];
      }
    }, [company_type]);

    return (
      <form>
        <div className={sn('wrap')}>
          <div className={sn('create-contact')}>
            <div className={sn('create-contact__item')}>
              <CommonInput
                id='first_name'
                onChangeValue={handleChangeFirstLastName('first_name')}
                placeholder='First name'
                required
                value={first_name}
                errorMessage={touched.first_name && errors.first_name}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='last_name'
                value={last_name}
                onChangeValue={handleChangeFirstLastName('last_name')}
                placeholder='Last name'
                required
                errorMessage={touched.last_name && errors.last_name}
                autoFocus={autoFocus}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='full_name'
                value={
                  isEditedFullName
                    ? full_name
                    : `${first_name || ''}${last_name ? ' ' : ''}${last_name ||
                        ''}`
                }
                onChangeValue={onChangeFullName(setFieldValue)}
                placeholder='Full name'
                autoFocus={autoFocus}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <Gender
                name='gender'
                value={gender}
                onChangeHandler={handleChange('gender')}
                errorMessage={touched.gender && errors.gender}
              />
            </div>
            {isFullForm && (
              <div className={sn('create-contact__item')}>
                <DateRange
                  name='birthday'
                  onChange={onChangeDate}
                  placeholder='Date of birth'
                  singular
                  date={
                    birthday ? [parse(birthday, 'd.MM.yyyy', new Date())] : []
                  }
                />
              </div>
            )}
            <CountryInput
              className={sn('create-contact__item')}
              value={country}
              onChange={setFieldValues}
              required
              errorMessage={touched.country && errors.country}
            />
            <RegionInput
              className={sn('create-contact__item')}
              countryCode={countryCode}
              onChange={setFieldValues}
              value={region}
            />
            <CityInput
              className={sn('create-contact__item')}
              value={city}
              regionCode={regionCode}
              onChange={setFieldValueHandler}
            />
            <div className={sn('create-contact__item')}>
              <CommonInput
                required
                name='position'
                value={position}
                onChangeValue={handleChange('position')}
                placeholder='Title'
                errorMessage={touched.position && errors.position}
                autoFocus={autoFocus}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='linkedin'
                value={linkedin}
                onChangeValue={handleChange('linkedin')}
                placeholder='Linkedin'
                errorMessage={errors.linkedin}
                autoFocus={autoFocus}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CustomMultiInput
                id='social_network'
                name='social_networks'
                items={social_networks}
                onChange={setFieldValueHandler}
                placeholder='Social network'
                errorMessage={errors.social_network}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CustomMultiInput
                id='phone'
                name='phones'
                items={phones || []}
                placeholder='Phone'
                onChange={setFieldValueHandler}
                errorMessage={errors.phone}
              />
            </div>
            {isFullForm && (
              <div className={sn('create-contact__item')}>
                <CommonInput
                  name='skype'
                  value={skype}
                  onChangeValue={handleChange('skype')}
                  placeholder='Skype'
                  autoFocus={autoFocus}
                />
              </div>
            )}
            <div className={sn('create-contact__item')}>
              <CustomMultiInput
                id='email'
                name='emails'
                items={emails}
                placeholder='Email'
                onChange={setFieldValueHandler}
                errorMessage={errors?.email}
                errorRequired={touched.emails && errors?.emails}
                required
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CustomSwitch
                name='validation'
                value={validation || false}
                onChangeHandler={formikHandleChange}
                label='Requires validation'
              />
            </div>
            {isFullForm && (
              <div className={sn('create-contact__item')}>
                <SliderRange
                  min={0}
                  max={100}
                  value={confidence}
                  onChange={onChangeConfidence}
                  name='Confidence'
                  disabled={!validation}
                />
              </div>
            )}
            {isFullForm && (
              <OriginInput
                className={sn('create-contact__item')}
                value={origin}
                onChange={setFieldValueHandler}
              />
            )}
          </div>
          <div className={sn('create-contact')}>
            <CompanyInput
              className={sn('create-contact__item')}
              value={company}
              onChange={setFieldValues}
              errorMessage={touched.company && errors.company}
              error={errors.company}
              autoFocus={autoFocus}
            />
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='companyWebSite'
                value={companyWebSite}
                onChangeValue={handleChange('companyWebSite')}
                placeholder='Company website'
                errorMessage={touched.companyWebSite && errors.companyWebSite}
                autoFocus={autoFocus}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='companyLinkedIn'
                value={companyLinkedIn}
                onChangeValue={handleChange('companyLinkedIn')}
                placeholder='Company linkedin'
                errorMessage={errors.companyLinkedIn}
                autoFocus={autoFocus}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='CTO'
                value={CTO}
                onChangeValue={handleChange('CTO')}
                placeholder='CTO'
                autoFocus={autoFocus}
              />
            </div>
            <IndustryInput
              className={sn('create-contact__item')}
              value={industry}
              onChange={setFieldValues}
              errorMessage={touched.industry && errors.industry}
            />
            <CompanySizeInput
              className={sn('create-contact__item')}
              value={companySize}
              onChange={setFieldValues}
            />
            <div className={sn('create-contact__item')}>
              {isFullForm && (
                <CompanyTypeInput
                  onChange={setFieldValueHandler}
                  value={company_type}
                />
              )}
            </div>
            <div className={sn('create-contact__item')}>
              {isFullForm && (
                <ContactCompany
                  type={currentType}
                  name='company_subsidiary'
                  value={company_subsidiary}
                  onSelect={onChangeSubsidiary(setFieldValue)}
                  placeholder='Subsidiary companies'
                  disabled={
                    !company_type ? true : company_type === 'Subsidiary'
                  }
                />
              )}
            </div>
            <div className={sn('create-contact__item')}>
              {isFullForm && (
                <ContactCompany
                  type={currentType}
                  name='company_holding'
                  value={company_holding}
                  onSelect={onChangeHolding(setFieldValue)}
                  placeholder='Holding company'
                  disabled={!company_type ? true : company_type === 'Holding'}
                />
              )}
            </div>
            {isFullForm && (
              <div className={sn('create-contact__item')}>
                <DateRange
                  name='company_founded'
                  onChange={onChangeDate}
                  singular
                  date={
                    company_founded
                      ? [parse(company_founded, 'd.MM.yyyy', new Date())]
                      : []
                  }
                  placeholder='Founded'
                />
              </div>
            )}
            {!userNc1 && (
              <div className={sn('create-contact__item')}>
                <ContactJobInput
                  role={role}
                  vacancies={vacancies}
                  onChange={setFieldValueHandler}
                  errorMessage={touched.vacancies && errors.vacancies}
                />
              </div>
            )}
            <div className={sn('create-contact__item')}>
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
        <div className={sn('create-contact-btn')}>
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
