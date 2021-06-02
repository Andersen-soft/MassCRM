import React, { useCallback, useState } from 'react';
import { connect } from 'formik';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { CSSTransition } from 'react-transition-group';
import {
  validateEmailFormMulti,
  validatePhoneFormMulti,
  validateSocialNetworkFormMulti
} from 'src/utils';
import {
  IndustryInput,
  CompanySizeInput,
  ContactJobInput
} from 'src/view/organisms';
import {
  Gender,
  CommonButton,
  CommonIcon,
  CommonInput,
  CustomSwitch,
  CustomTextarea
} from 'src/view/atoms';
import { IContactForm } from 'src/interfaces';
import {
  CountryInput,
  CityInput,
  CompanyInput,
  RegionInput,
  CustomMultiInput
} from '.';
import { useStyles } from '../ContactForm.styles';

export const ContactFormUI = connect<IContactForm & any>(
  ({
    isEditedFullName,
    onChangeFullName,
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
    setFieldValueHandler,
    setFieldValues
  }) => {
    const {
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
      vacancies = [],
      countryCode,
      regionCode
    } = values;

    const [checked, setChecked] = useState(false);
    const [clearInput, setClearInput] = useState<boolean>(false);

    const resetClearInputState = () => setClearInput(false);

    const styles = useStyles();

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
      <div className={styles.form}>
        <button type='button' className={styles.formHeader}>
          <span className={styles.formTitle}> New Contact </span>
          <CommonIcon
            IconComponent={checked ? ExpandLess : ExpandMore}
            isActive={checked}
            onClick={handleCloseForm}
          />
        </button>
        <CSSTransition
          in={checked}
          timeout={400}
          classNames={styles.listTransition}
          unmountOnExit
        >
          <div className={styles.formBody}>
            <form>
              <div className={styles.addForm}>
                <div className={styles.addFormItem}>
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
                <div className={styles.addFormItem}>
                  <CommonInput
                    name='last_name'
                    value={last_name || initialValues.last_name}
                    onChangeValue={handleChangeFirstLastName('last_name')}
                    placeholder='Last name'
                    required
                    errorMessage={touched.last_name && errors.last_name}
                  />
                </div>
                <div className={styles.addFormItem}>
                  <CommonInput
                    name='full_name'
                    value={
                      isEditedFullName
                        ? full_name
                        : `${first_name}${last_name && ' '}${last_name}`
                    }
                    onChangeValue={onChangeFullName(setFieldValue)}
                    placeholder='Full name'
                  />
                </div>
                <div className={styles.addFormItem}>
                  <Gender
                    name='gender'
                    value={gender || initialValues.gender}
                    onChangeHandler={handleChange('gender')}
                    errorMessage={errors.gender}
                  />
                </div>
                <div className={styles.addFormItem}>
                  <CustomMultiInput
                    id='social_network'
                    name='social_networks'
                    items={social_networks || initialValues.social_networks}
                    onChange={setFieldValue}
                    placeholder='Social network'
                    errorMessage={errors.social_network}
                    clear={clearInput}
                    resetClearInputState={resetClearInputState}
                    validationSchema={validateSocialNetworkFormMulti}
                  />
                </div>
                <CountryInput
                  className={styles.addFormItem}
                  value={country}
                  onChange={setFieldValues}
                  required
                  errorMessage={touched.country && errors.country}
                />
                <RegionInput
                  className={styles.addFormItem}
                  countryCode={countryCode}
                  onChange={setFieldValues}
                  value={region}
                />
                <CityInput
                  className={styles.addFormItem}
                  value={city || initialValues.city}
                  regionCode={regionCode}
                  onChange={setFieldValue}
                />
                <div className={styles.addFormItem}>
                  <CommonInput
                    required
                    name='position'
                    value={position || initialValues.position}
                    onChangeValue={handleChange('position')}
                    placeholder='Title'
                    errorMessage={touched.position && errors.position}
                  />
                </div>
                <div className={styles.addFormItem}>
                  <CustomMultiInput
                    id='phone'
                    name='phones'
                    items={phones || initialValues.phones}
                    placeholder='Phone'
                    onChange={setFieldValue}
                    errorMessage={errors.phone}
                    clear={clearInput}
                    resetClearInputState={resetClearInputState}
                    validationSchema={validatePhoneFormMulti}
                  />
                </div>
                <div className={styles.addFormItem}>
                  <CommonInput
                    name='linkedin'
                    value={linkedin}
                    onChangeValue={handleChange('linkedin')}
                    placeholder='Linkedin'
                    errorMessage={errors.linkedin}
                  />
                </div>
                <CompanyInput
                  className={styles.addFormItem}
                  value={company}
                  onChange={setFieldValues}
                  errorMessage={touched.company && errors.company}
                />
                <div className={styles.addFormItem}>
                  <CommonInput
                    name='companyWebSite'
                    value={companyWebSite || initialValues.companyWebSite}
                    onChangeValue={handleChange('companyWebSite')}
                    placeholder='Company website'
                    errorMessage={
                      touched.companyWebSite && errors.companyWebSite
                    }
                    required
                  />
                </div>
                <div className={styles.addFormItem}>
                  <CustomMultiInput
                    id='email'
                    name='emails'
                    items={emails}
                    placeholder='Email'
                    onChange={setFieldValueHandler}
                    errorMessage={errors?.email}
                    errorRequired={touched?.emails && errors?.emails}
                    required
                    clear={clearInput}
                    resetClearInputState={resetClearInputState}
                    validationSchema={validateEmailFormMulti}
                  />
                </div>
                <CompanySizeInput
                  className={styles.addFormItem}
                  value={companySize}
                  onChange={setFieldValues}
                />
                <IndustryInput
                  className={styles.addFormItem}
                  value={industry}
                  onChange={setFieldValues}
                  errorMessage={touched.industry && errors.industry}
                />
                <div className={styles.addFormItem}>
                  <CommonInput
                    name='companyLinkedIn'
                    value={companyLinkedIn}
                    onChangeValue={handleChange('companyLinkedIn')}
                    placeholder='Company linkedin'
                    errorMessage={errors.companyLinkedIn}
                  />
                </div>
                <div className={styles.addFormItem}>
                  <CommonInput
                    name='CTO'
                    value={CTO || initialValues.CTO}
                    onChangeValue={handleChange('CTO')}
                    placeholder='CTO'
                  />
                </div>
                <div className={styles.addFormItem}>
                  <CustomSwitch
                    name='validation'
                    value={validation}
                    onChangeHandler={formikHandleChange}
                    label='Requires validation'
                  />
                </div>
                {!role.userNc1 && (
                  <>
                    <div className={styles.addFormAlign} />
                    <div className={styles.addFormItem}>
                      <ContactJobInput
                        vacancies={vacancies}
                        onChange={setFieldValueHandler}
                        errorMessage={touched.vacancies && errors.vacancies}
                      />
                    </div>
                  </>
                )}
                <div className={styles.addFormItem}>
                  <CustomTextarea
                    name='comment'
                    value={comment || initialValues.comment}
                    placeholder='Comment'
                    onChange={handleChange('comment')}
                  />
                </div>
              </div>
              <div className={styles.formBtn}>
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
