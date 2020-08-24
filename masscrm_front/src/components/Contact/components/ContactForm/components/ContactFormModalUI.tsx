import React from 'react';
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
  CustomMultiInput
} from 'src/components/common';
import { format } from 'date-fns';
import { IContactForm } from '../interfaces';
import { ContactJobInput } from './ContactJobInput';
import style from '../ContactForm.scss';
import { ContactCompany } from './ContactCompany';

const sn = styleNames(style);

export const ContactFormModalUI = connect<IContactForm & any>(
  ({
    formik: {
      initialValues,
      setFieldValue,
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
      handleChange
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
    onChangeSubsidiary
  }) => {
    const onChangeConfidence = (val: number) =>
      setFieldValue('confidence', val);

    const onChangeSelectList = (name: string) => (val: Array<string>) =>
      setFieldValue(name, val);

    const onChangeDate = (name: string, [value]: Date[]) => {
      if (value) {
        setFieldValue(name, format(value, 'yyyy-MM-dd'));
      }
    };

    return (
      <form>
        <div className={sn('wrap')}>
          <div className={sn('create-contact')}>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='first_name'
                onChangeValue={handleChange}
                placeholder='First name'
                required
                value={first_name || initialValues.first_name}
                errorMessage={errors.first_name}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='last_name'
                value={last_name || initialValues.last_name}
                onChangeValue={handleChange}
                placeholder='Last name'
                required
                errorMessage={errors.last_name}
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
                value={gender || initialValues.gender}
                onChangeHandler={handleChange}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <DateRange
                name='birthday'
                onChange={onChangeDate}
                placeholder='Date of birth'
                singular
                date={birthday}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <SearchInput
                required
                name='country'
                value={country || initialValues.country}
                placeholder='Country'
                items={countries}
                onChange={onChangeCountry(setFieldValue)}
                errorMessage={errors.country}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <SearchInput
                name='region'
                value={region || initialValues.region}
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
                value={city || initialValues.city}
                placeholder='City'
                items={cities}
                onChange={setSearchField(setFieldValue, 'city')}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                required
                name='position'
                value={position || initialValues.position}
                onChangeValue={handleChange}
                placeholder='Position'
                errorMessage={errors.position}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                required
                name='linkedin'
                value={linkedin || initialValues.linkedin}
                onChangeValue={handleChange}
                placeholder='linkedin'
                errorMessage={errors.linkedin}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='social_networks'
                value={social_networks || initialValues.social_networks}
                onChangeValue={handleChange}
                placeholder='Other social network'
                errorMessage={errors.social_networks}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CustomMultiInput
                id='phone'
                name='phones'
                items={phones || []}
                placeholder='Phone'
                onChange={setFieldValue}
                errorMessage={errors.phone}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='skype'
                value={skype || initialValues.skype}
                onChangeValue={handleChange}
                placeholder='Skype'
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CustomMultiInput
                id='email'
                name='emails'
                items={emails || initialValues.emails}
                placeholder='E-mail'
                onChange={setFieldValue}
                errorMessage={errors?.email}
                errorRequired={errors?.emails}
                required
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CustomSwitch
                name='validation'
                value={validation || initialValues.validation}
                onChangeHandler={handleChange}
                label='Requires validation'
              />
            </div>
            {isFullForm && (
              <div className={sn('create-contact__item')}>
                <SliderRange
                  min={0}
                  max={100}
                  value={confidence || initialValues.confidence || 0}
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
                  value={origin || initialValues.origin}
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
                value={company || initialValues.company}
                onSelect={onChangeCompany(setFieldValue)}
                name='company'
                placeholder='Company'
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                required
                name='companyWebSite'
                value={companyWebSite || initialValues.companyWebSite}
                onChangeValue={handleChange}
                placeholder='Company website'
                errorMessage={errors.companyWebSite}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='companyLinkedIn'
                value={companyLinkedIn || initialValues.companyLinkedIn}
                onChangeValue={handleChange}
                placeholder='Company linkedin'
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CommonInput
                name='CTO'
                value={CTO || initialValues.CTO}
                onChangeValue={handleChange}
                placeholder='CTO'
              />
            </div>
            <div className={sn('create-contact__item')}>
              <CustomSelect
                name='industry'
                value={industry || initialValues.industry}
                items={industries}
                onChange={onChangeIndustry(setFieldValue)}
                multi
                placeholder='Industry'
                required
                errorMessage={errors.industry}
              />
            </div>
            <div className={sn('create-contact__item')}>
              <SearchInput
                required
                name='companySize'
                value={companySize || initialValues.companySize}
                placeholder='Company size'
                items={companySizeFilter}
                onChange={setSearchField(setFieldValue, 'companySize')}
                errorMessage={errors.companySize}
              />
            </div>
            <div className={sn('create-contact__item')}>
              {isFullForm && (
                <CustomSelect
                  name='company_type'
                  value={company_type || initialValues.company_type}
                  items={companyTypes || []}
                  onChange={onChangeSelectList('company_type')}
                  placeholder='Type of company'
                />
              )}
            </div>
            <div className={sn('create-contact__item')}>
              {isFullForm && (
                <ContactCompany
                  type={company_type}
                  name='company_subsidiary'
                  value={company_subsidiary || initialValues.company_subsidiary}
                  onSelect={onChangeSubsidiary(setFieldValue)}
                  placeholder='Subsidiary companies'
                  disabled={!(company_type && company_type === 'Holding')}
                />
              )}
            </div>
            <div className={sn('create-contact__item')}>
              {isFullForm && (
                <ContactCompany
                  type={company_type}
                  name='company_holding'
                  value={company_holding || initialValues.company_holding}
                  onSelect={onChangeHolding(setFieldValue)}
                  placeholder='Holding company'
                  disabled={!(company_type && company_type === 'Subsidiary')}
                />
              )}
            </div>
            <div className={sn('create-contact__item')}>
              <DateRange
                name='company_founded'
                onChange={onChangeDate}
                singular
                date={company_founded || initialValues.company_founded}
                placeholder='Founded'
              />
            </div>
            {isFullForm && (
              <>
                <div className={sn('create-contact__item')}>
                  <ContactJobInput
                    vacancies={vacancies || initialValues.vacancies || []}
                    onChange={setFieldValue}
                    errorMessage={errors.vacancies}
                  />
                </div>
              </>
            )}
            <div className={sn('create-contact__item')}>
              <CustomTextarea
                name='comment'
                value={comment || initialValues.comment}
                placeholder='Comment'
                onChange={handleChange}
                className={sn('create-contact__text')}
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
