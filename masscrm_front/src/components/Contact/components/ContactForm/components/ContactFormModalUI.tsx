import React, { useMemo } from 'react';
import { connect } from 'formik';
import { styleNames } from 'src/services';
import {
  CommonInput,
  CustomTextarea,
  Gender,
  CustomSelect,
  SearchInput,
  CustomSwitch,
  CommonButton,
  SliderRange,
  DateRange,
  CustomMultiInput,
  ContactCompany,
  ContactJobInput
} from 'src/components/common';
import { format, parse } from 'date-fns';
import { IContactForm } from '../interfaces';
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
        birthday
      },
      errors,
      handleSubmit,
      handleChange: formikHandleChange
    },
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
    onCancel,
    origins,
    companyTypes,
    isFullForm,
    onChangeHolding,
    onChangeSubsidiary,
    role,
    handleChange,
    handleChangeFirstLastName,
    setFieldValueHandler
  }) => {
    const onChangeConfidence = (val: number) =>
      setFieldValue('confidence', val);

    const onChangeSelectList = (name: string) => (val: Array<string>) =>
      setFieldValue(name, val);

    const onChangeDate = (name: string, [value]: Date[]) => {
      setFieldValue(name, value ? format(value, 'yyyy-MM-dd') : undefined);
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
            <div className={sn('create-contact__item')}>
              <SearchInput
                required
                name='country'
                value={country}
                placeholder='Country'
                items={countries}
                onChange={onChangeCountry(setFieldValue)}
                errorMessage={touched.country && errors.country}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <SearchInput
                name='region'
                value={region}
                placeholder='Region'
                items={regions}
                onChange={onChangeRegion(setFieldValue)}
                errorMessage={errors.region}
                disabled={!country}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <SearchInput
                name='city'
                value={city}
                placeholder='City'
                items={cities}
                onChange={setSearchField(setFieldValue, 'city')}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                required
                name='position'
                value={position}
                onChangeValue={handleChange('position')}
                placeholder='Position'
                errorMessage={touched.position && errors.position}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='linkedin'
                value={linkedin}
                onChangeValue={handleChange('linkedin')}
                placeholder='Linkedin'
                errorMessage={errors.linkedin}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CustomMultiInput
                id='social_network'
                name='social_networks'
                items={social_networks}
                onChange={setFieldValueHandler}
                placeholder='Social network'
                errorMessage={touched.social_network && errors.social_network}
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
                />
              </div>
            )}
            <div className={sn('create-contact__item')}>
              <CustomMultiInput
                id='email'
                name='emails'
                items={emails}
                placeholder='E-mail'
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
              <div className={sn('create-contact__item')}>
                <CustomSelect
                  name='origin'
                  value={origin}
                  items={origins || []}
                  onChange={onChangeSelectList('origin')}
                  multi
                  placeholder='Origin'
                />
              </div>
            )}
          </div>
          <div className={sn('create-contact')}>
            <div className={sn('create-contact__item')}>
              <ContactCompany
                error={errors.company}
                value={company}
                onSelect={onChangeCompany(setFieldValue)}
                name='company'
                placeholder='Company'
                required
                errorMessage={touched.company && errors.company}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='companyWebSite'
                value={companyWebSite}
                onChangeValue={handleChange('companyWebSite')}
                placeholder='Company website'
                errorMessage={touched.companyWebSite && errors.companyWebSite}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='companyLinkedIn'
                value={companyLinkedIn}
                onChangeValue={handleChange('companyLinkedIn')}
                placeholder='Company linkedin'
                errorMessage={errors.companyLinkedIn}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='CTO'
                value={CTO}
                onChangeValue={handleChange('CTO')}
                placeholder='CTO'
              />
            </div>
            <div className={sn('create-contact__item')}>
              <SearchInput
                name='industry'
                value={industry}
                items={industries}
                onChange={onChangeIndustry(setFieldValue)}
                multi
                placeholder='Industry'
                required
                errorMessage={touched.industry && errors.industry}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <SearchInput
                name='companySize'
                value={companySize}
                placeholder='Company size'
                items={companySizeFilter}
                onChange={setSearchField(setFieldValue, 'companySize')}
              />
            </div>
            <div className={sn('create-contact__item')}>
              {isFullForm && (
                <CustomSelect
                  name='company_type'
                  value={company_type}
                  items={companyTypes || []}
                  onChange={onChangeSelectList('company_type')}
                  placeholder='Type of company'
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
              <>
                <div className={sn('create-contact__item')}>
                  <ContactJobInput
                    role={role}
                    vacancies={vacancies}
                    onChange={setFieldValueHandler}
                    errorMessage={touched.vacancies && errors.vacancies}
                  />
                </div>
              </>
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
      </form>
    );
  }
);
