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
  CustomMultiInput
} from 'src/components/common';
import { ContactJobInput } from './ContactJobInput';
import { ContactCompany } from './ContactCompany';
import { IContactForm } from '../interfaces';
import style from '../ContactForm.scss';

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
    formik: {
      initialValues,
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
        vacancies
      },
      errors,
      handleReset,
      handleSubmit,
      handleChange,
      setFieldValue
    },
    isFullForm
  }) => {
    return (
      <form>
        <div className={sn('add-form')}>
          <div className={sn('add-form__item')}>
            <CommonInput
              name='first_name'
              onChangeValue={handleChange}
              placeholder='First name'
              required
              value={first_name || initialValues.first_name}
              errorMessage={errors.first_name}
            />
          </div>
          <div className={sn('add-form__item')}>
            <CommonInput
              name='last_name'
              value={last_name || initialValues.last_name}
              onChangeValue={handleChange}
              placeholder='Last name'
              required
              errorMessage={errors.last_name}
            />
          </div>
          <div className={sn('add-form__item')}>
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
          <div className={sn('add-form__item')}>
            <Gender
              name='gender'
              value={gender || initialValues.gender}
              onChangeHandler={handleChange}
            />
          </div>
          <div className={sn('add-form__item')}>
            <CommonInput
              name='social_networks'
              value={social_networks || initialValues.social_networks}
              onChangeValue={handleChange}
              placeholder='Other social network'
              errorMessage={errors.social_networks}
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
              errorMessage={errors.country}
            />
          </div>
          <div className={sn('add-form__item')}>
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
              onChangeValue={handleChange}
              placeholder='Position'
              errorMessage={errors.position}
            />
          </div>
          <div className={sn('add-form__item')}>
            <CustomMultiInput
              id='phone'
              name='phones'
              items={phones || []}
              placeholder='Phone'
              onChange={setFieldValue}
              errorMessage={errors.phone}
            />
          </div>
          <div className={sn('add-form__item')}>
            <CommonInput
              required
              name='linkedin'
              value={linkedin || initialValues.linkedin}
              onChangeValue={handleChange}
              placeholder='linkedin'
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
              errorMessage={errors.company}
            />
          </div>
          <div className={sn('add-form__item')}>
            <CommonInput
              required
              name='companyWebSite'
              value={companyWebSite || initialValues.companyWebSite}
              onChangeValue={handleChange}
              placeholder='Company website'
              errorMessage={errors.companyWebSite}
            />
          </div>
          <div className={sn('add-form__item')}>
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
          <div className={sn('add-form__item')}>
            <CustomMultiInput
              id='email'
              name='emails'
              items={emails}
              placeholder='E-mail'
              onChange={setFieldValue}
              errorMessage={errors?.email}
              errorRequired={errors?.emails}
              required
            />
          </div>
          <div className={sn('add-form__item')}>
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
          <div className={sn('add-form__item')}>
            <CommonInput
              name='companyLinkedIn'
              value={companyLinkedIn || initialValues.companyLinkedIn}
              onChangeValue={handleChange}
              placeholder='Company linkedin'
            />
          </div>
          <div className={sn('add-form__item')}>
            <CommonInput
              name='CTO'
              value={CTO || initialValues.CTO}
              onChangeValue={handleChange}
              placeholder='CTO'
            />
          </div>
          <div className={sn('add-form__item')}>
            <CustomSwitch
              name='validation'
              value={validation}
              onChangeHandler={handleChange}
              label='Requires validation'
            />
          </div>
          {isFullForm && (
            <>
              <div className={sn('add-form__item')}>
                <ContactJobInput
                  vacancies={vacancies || []}
                  onChange={setFieldValue}
                  errorMessage={errors.vacancies}
                />
              </div>
            </>
          )}
          <div className={sn('add-form__item')}>
            <CustomTextarea
              name='comment'
              value={comment || initialValues.comment}
              placeholder='Comment'
              onChange={handleChange}
              className={sn('form-textarea')}
            />
          </div>
        </div>
        <div className={sn('form-btn')}>
          <CommonButton
            text='Clear'
            type='reset'
            onClickHandler={handleReset}
          />
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
