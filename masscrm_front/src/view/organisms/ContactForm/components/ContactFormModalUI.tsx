import React, { useCallback } from 'react';
import { connect } from 'formik';
import { format, parse } from 'date-fns';
import { CompanyTypeInput, DateRange } from 'src/view/molecules';
import {
  Gender,
  CommonButton,
  CommonInput,
  CustomSwitch,
  CustomTextarea,
  SliderRange
} from 'src/view/atoms';
import {
  IndustryInput,
  ContactCompany,
  CompanySizeInput,
  ContactJobInput
} from 'src/view/organisms';
import {
  validateSocialNetworkFormMulti,
  validateEmailFormMulti,
  validatePhoneFormMulti
} from 'src/utils';
import { IContactForm } from 'src/interfaces';
import { D_MM_YYYY, YYYY_MM_DD } from 'src/constants';
import {
  CountryInput,
  CityInput,
  CompanyInput,
  OriginInput,
  RegionInput,
  CustomMultiInput
} from '.';
import { useStyles } from '../ContactForm.styles';

export const ContactFormModalUI = connect<IContactForm & any>(
  ({
    formik: {
      setFieldValue,
      touched,
      values: {
        first_name = '',
        last_name = '',
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
    autoFocus
  }) => {
    const onChangeConfidence = (val: number) =>
      setFieldValue('confidence', val);

    const onChangeDate = (name: string, [value]: Date[]) => {
      setFieldValue(name, value ? format(value, YYYY_MM_DD) : null);
    };

    const styles = useStyles();

    const getCurrentType = useCallback(
      (typeArg: string) => {
        const companyTypes: { [index: string]: string[] } = {
          Subsidiary: ['Holding'],
          Holding: ['Subsidiary'],
          default: []
        };
        return companyTypes[typeArg] || 'default';
      },
      [company_type]
    );

    return (
      <form>
        <div className={styles.wrap}>
          <div className={styles.createContact}>
            <div className={styles.createContactItem}>
              <CommonInput
                id='first_name'
                onChangeValue={handleChangeFirstLastName('first_name')}
                placeholder='First name'
                required
                value={first_name}
                errorMessage={touched.first_name && errors.first_name}
              />
            </div>
            <div className={styles.createContactItem}>
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
            <div className={styles.createContactItem}>
              <CommonInput
                name='full_name'
                value={
                  isEditedFullName
                    ? full_name
                    : `${first_name}${last_name && ' '}${last_name}`
                }
                onChangeValue={onChangeFullName(setFieldValue)}
                placeholder='Full name'
                autoFocus={autoFocus}
              />
            </div>
            <div className={styles.createContactItem}>
              <Gender
                name='gender'
                value={gender}
                onChangeHandler={handleChange('gender')}
                errorMessage={touched.gender && errors.gender}
              />
            </div>
            {isFullForm && (
              <div className={styles.createContactItem}>
                <DateRange
                  name='birthday'
                  code='birthday'
                  onChange={onChangeDate}
                  placeholder='Date of birth'
                  singular
                  date={
                    birthday ? [parse(birthday, D_MM_YYYY, new Date())] : []
                  }
                />
              </div>
            )}
            <CountryInput
              className={styles.createContactItem}
              value={country}
              onChange={setFieldValues}
              required
              errorMessage={touched.country && errors.country}
            />
            <RegionInput
              className={styles.createContactItem}
              countryCode={countryCode}
              onChange={setFieldValues}
              value={region}
            />
            <CityInput
              className={styles.createContactItem}
              value={city}
              regionCode={regionCode}
              onChange={setFieldValueHandler}
            />
            <div className={styles.createContactItem}>
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
            <div className={styles.createContactItem}>
              <CommonInput
                name='linkedin'
                value={linkedin}
                onChangeValue={handleChange('linkedin')}
                placeholder='Linkedin'
                errorMessage={errors.linkedin}
                autoFocus={autoFocus}
              />
            </div>
            <div className={styles.createContactItem}>
              <CustomMultiInput
                id='social_network'
                name='social_networks'
                items={social_networks}
                onChange={setFieldValueHandler}
                placeholder='Social network'
                errorMessage={errors.social_network}
                validationSchema={validateSocialNetworkFormMulti}
              />
            </div>
            <div className={styles.createContactItem}>
              <CustomMultiInput
                id='phone'
                name='phones'
                items={phones || []}
                placeholder='Phone'
                onChange={setFieldValueHandler}
                errorMessage={errors.phone}
                validationSchema={validatePhoneFormMulti}
              />
            </div>
            {isFullForm && (
              <div className={styles.createContactItem}>
                <CommonInput
                  name='skype'
                  value={skype}
                  onChangeValue={handleChange('skype')}
                  placeholder='Skype'
                  autoFocus={autoFocus}
                />
              </div>
            )}
            <div className={styles.createContactItem}>
              <CustomMultiInput
                id='email'
                name='emails'
                items={emails}
                placeholder='Email'
                onChange={setFieldValueHandler}
                errorMessage={errors?.email}
                errorRequired={touched.emails && errors?.emails}
                required
                validationSchema={validateEmailFormMulti}
              />
            </div>
            <div className={styles.createContactItem}>
              <CustomSwitch
                name='validation'
                value={validation || false}
                onChangeHandler={formikHandleChange}
                label='Requires validation'
              />
            </div>
            {isFullForm && (
              <div className={styles.createContactItem}>
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
                className={styles.createContactItem}
                value={origin}
                onChange={setFieldValueHandler}
              />
            )}
          </div>
          <div className={styles.createContact}>
            <CompanyInput
              className={styles.createContactItem}
              value={company}
              onChange={setFieldValues}
              errorMessage={touched.company && errors.company}
              error={errors.company}
              autoFocus={autoFocus}
            />
            <div className={styles.createContactItem}>
              <CommonInput
                name='companyWebSite'
                value={companyWebSite}
                onChangeValue={handleChange('companyWebSite')}
                placeholder='Company website'
                errorMessage={touched.companyWebSite && errors.companyWebSite}
                autoFocus={autoFocus}
                required
              />
            </div>
            <div className={styles.createContactItem}>
              <CommonInput
                name='companyLinkedIn'
                value={companyLinkedIn}
                onChangeValue={handleChange('companyLinkedIn')}
                placeholder='Company linkedin'
                errorMessage={errors.companyLinkedIn}
                autoFocus={autoFocus}
              />
            </div>
            <div className={styles.createContactItem}>
              <CommonInput
                name='CTO'
                value={CTO}
                onChangeValue={handleChange('CTO')}
                placeholder='CTO'
                autoFocus={autoFocus}
              />
            </div>
            <IndustryInput
              className={styles.createContactItem}
              value={industry}
              onChange={setFieldValues}
              errorMessage={touched.industry && errors.industry}
            />
            <CompanySizeInput
              className={styles.createContactItem}
              value={companySize}
              onChange={setFieldValues}
            />
            <div className={styles.createContactItem}>
              {isFullForm && (
                <CompanyTypeInput
                  onChange={setFieldValueHandler}
                  value={company_type}
                  name='company_type'
                />
              )}
            </div>
            <div className={styles.createContactItem}>
              {isFullForm && (
                <ContactCompany
                  type={getCurrentType(company_type)}
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
            <div className={styles.createContactItem}>
              {isFullForm && (
                <ContactCompany
                  type={getCurrentType(company_type)}
                  name='company_holding'
                  value={company_holding}
                  onSelect={onChangeHolding(setFieldValue)}
                  placeholder='Holding company'
                  disabled={!company_type ? true : company_type === 'Holding'}
                />
              )}
            </div>
            {isFullForm && (
              <div className={styles.createContactItem}>
                <DateRange
                  name='company_founded'
                  code='company_founded'
                  onChange={onChangeDate}
                  singular
                  date={
                    company_founded
                      ? [parse(company_founded, D_MM_YYYY, new Date())]
                      : []
                  }
                  placeholder='Founded'
                />
              </div>
            )}
            {!role?.nc1 && (
              <div className={styles.createContactItem}>
                <ContactJobInput
                  role={role}
                  vacancies={vacancies}
                  onChange={setFieldValueHandler}
                  errorMessage={touched.vacancies && errors.vacancies}
                />
              </div>
            )}
            <div className={styles.createContactItem}>
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
        <div className={styles.createContactBtn}>
          <CommonButton text='Cancel' type='reset' onClickHandler={onCancel} />
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
