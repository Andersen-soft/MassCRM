import React, { ChangeEvent, FC, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikHelpers } from 'formik';
import {
  createContact,
  getCitiesListByRegion,
  getRegionListByCountry,
  createCompany,
  updateCompany,
  updateContact,
  getContact,
  getAddContactList
} from 'src/actions';
import {
  getCountries,
  getRegion,
  getCity,
  getCompanySizeFilter,
  getOriginsFilter,
  getCompanyTypesFilter,
  getUser,
  getFilterSettings
} from 'src/selectors';
import {
  ICompany,
  ICompanySize,
  IContact,
  ICountry,
  ILocation,
  IRegion
} from 'src/interfaces';
import { Dialog } from '@material-ui/core';
import { getIndustries } from 'src/selectors/industry.selector';
import { OccupiedMessage, LinkedInBlock } from 'src/components/common/PopUp';
import { contactFormSchema } from 'src/utils/form/validate';
import { CompanyBuilder } from 'src/utils/form/companyBuilder';
import { ContactBuilder } from 'src/utils/form/contactBuilder';
import { IContactsJobs } from 'src/interfaces/IContactJobInput';
import { IContactFormInputs, IErrorsContact } from './interfaces';
import { ContactFormUI, ContactFormModalUI } from '.';

export const ContactForm: FC<{
  onCloseModal?: () => void;
  onCancelModal?: () => void;
  contact?: IContactFormInputs;
  setIsTouchedForm?: (val: boolean) => void;
}> = ({ onCloseModal, contact, setIsTouchedForm, onCancelModal }) => {
  const dispatch = useDispatch();
  const countries = useSelector(getCountries);
  const regions = useSelector(getRegion);
  const cites = useSelector(getCity);
  const industries = useSelector(getIndustries);
  const companySizeFilter = useSelector(getCompanySizeFilter);
  const origins = useSelector(getOriginsFilter);
  const companyTypes = useSelector(getCompanyTypesFilter);
  const [isEditedFullName, setIsEditedFullName] = useState<boolean>(false);
  const [errorsList, setErrorsList] = useState<IErrorsContact>({ open: false });
  const { name: nameUser, surname: surnameUser, roles } = useSelector(getUser);
  const isFullForm = Boolean(roles?.manager || roles?.superAdmin);
  const formForVacancies = Boolean(
    roles?.nc2 || roles?.manager || roles?.superAdmin
  );
  const filter = useSelector(getFilterSettings);

  const setTouchedHandler = useCallback(() => {
    setIsTouchedForm && setIsTouchedForm(true);
  }, [setIsTouchedForm]);

  const nameMapCallBack = ({ name }: { name: string }) => name;

  const getNamesList = (obj: Array<{ name: string }>) =>
    obj?.map(nameMapCallBack);

  const successCallback = (resetCallback: (val: object) => void) => {
    resetCallback({});
    dispatch(getAddContactList(filter));
    onCloseModal && onCloseModal();
  };

  const errorCallback = (val: IContactFormInputs) => (error: {
    [key: string]: string;
  }) => {
    if (error?.linkedin) {
      getContact({ search: { linkedin: val.linkedin } }).then(dat => {
        setErrorsList(err => ({
          ...err,
          linkedin: {
            name:
              dat[0].full_name || `${dat[0].first_name} ${dat[0].last_name}`,
            created: dat[0].created_at,
            responsible: dat[0].responsible
          },
          open: true
        }));
      });
    }
    if (error['emails.0'])
      setErrorsList(err => ({
        ...err,
        simpleErr: 'The email has already been taken',
        open: true
      }));
  };

  const createNewContact = (
    data: IContact,
    resetCallback: (val: object) => void,
    val: IContactFormInputs
  ) => {
    createContact(data)
      .then(() => {
        successCallback(resetCallback);
      })
      .catch(errorCallback(val));
  };

  const updateMyContact = (
    data: IContact,
    resetCallback: (val: object) => void,
    id: number,
    val: IContactFormInputs
  ) => {
    updateContact(data, id)
      .then(() => {
        successCallback(resetCallback);
      })
      .catch(errorCallback(val));
  };

  const initialValues: IContactFormInputs = contact || {
    responsible: `${nameUser} ${surnameUser}`,
    first_name: '',
    last_name: '',
    full_name: '',
    company: '',
    company_subsidiary: '',
    company_holding: '',
    colleagues: [],
    emails: [],
    companySize: '',
    gender: '',
    position: '',
    linkedin: '',
    validation: false,
    companyWebSite: '',
    companyLinkedIn: '',
    company_id: 0,
    vacancies: [],
    industry: [],
    CTO: '',
    phones: [],
    confidence: 0,
    formCondition: isFullForm,
    comment: '',
    social_networks: [],
    country: '',
    region: '',
    city: ''
  };

  const handleSubmit = (
    {
      responsible,
      emails,
      country,
      region,
      city,
      comment,
      colleagues,
      social_networks,
      company_id,
      company,
      industry,
      companyWebSite,
      companyLinkedIn,
      companySize,
      company_founded,
      linkedin,
      full_name,
      first_name,
      last_name,
      gender,
      position,
      confidence,
      validation: requires_validation,
      CTO,
      vacancies,
      origin,
      birthday,
      phones,
      skype,
      company_type,
      company_subsidiary,
      company_holding
    }: IContactFormInputs,
    formikHelpers: FormikHelpers<any>
  ) => {
    const values = {
      responsible,
      emails,
      country,
      region,
      city,
      comment,
      colleagues,
      social_networks,
      company_id,
      company,
      industry,
      companyWebSite,
      companyLinkedIn,
      companySize,
      linkedin,
      full_name,
      first_name,
      last_name,
      gender,
      skype,
      confidence,
      validation: requires_validation,
      CTO,
      vacancies,
      origin,
      birthday,
      phones,
      company_founded,
      company_type
    };

    const location: ILocation = { country };

    const data = new ContactBuilder()
      .setResponsible(responsible)
      .setFirstName(first_name)
      .setLastName(last_name)
      .setGender(gender)
      .setLocation(location, region, city)
      .setEmails(emails)
      .setCompanyId(company_id)
      .setPosition(position)
      .setSkype(skype)
      .setConfidence(confidence)
      .setFullName(full_name, isEditedFullName)
      .setRequestValidation(requires_validation)
      .setBirthday(birthday)
      .setOrigin(origin)
      .setLinkedIn(linkedin)
      .setComment(comment)
      .setSocialNetworks(social_networks)
      .setPhones(phones);

    const selectedSizeCompany = companySizeFilter?.find(
      ({ name, min }: ICompanySize) =>
        name === companySize || Number(companySize) >= min
    );

    const newCompany = new CompanyBuilder()
      .setName(company)
      .setWebsite(companyWebSite)
      .setIndustries(industries, industry)
      .setMinEmployees(selectedSizeCompany)
      .setMaxEmployees(selectedSizeCompany)
      .setFounded(company_founded)
      .setCompanyType(company_type)
      .setCompanySubsidiary(company_subsidiary)
      .setCompanyHolding(company_holding)
      .setVacancies(formForVacancies, vacancies)
      .setCTOFullName(CTO)
      .setCompanyLinkedIn(companyLinkedIn);

    const sendData = (myData: ContactBuilder) =>
      contact?.id
        ? updateMyContact(myData, formikHelpers.resetForm, contact.id, values)
        : createNewContact(myData, formikHelpers.resetForm, values);

    const errorCallbackCompany = (error: { [key: string]: string }) =>
      setErrorsList({
        simpleErr: error?.linkedin || error?.website || error?.name,
        open: true
      });
    if (company_id) {
      updateCompany(company_id, newCompany)
        .then(() => {
          sendData(data);
        })
        .catch(errorCallbackCompany);
    } else {
      createCompany(newCompany)
        .then((value: string | number | undefined) => {
          data.company_id = value as number;
          sendData(data);
        })
        .catch(errorCallbackCompany);
    }
  };

  const onChangeCountry = useCallback(
    (setFieldValue: (key: string, data?: string) => void) => (val: string) => {
      setTouchedHandler();
      setFieldValue('country', val);
      const codeOfCountry = countries?.filter(
        ({ name }: ICountry) => name === val
      );
      codeOfCountry?.length &&
        dispatch(getRegionListByCountry(codeOfCountry[0].code));
      setFieldValue('region', '');
      setFieldValue('city', '');
    },
    [countries]
  );

  const onChangeRegion = useCallback(
    (setFieldValue: (key: string, data?: string) => void) => (val: string) => {
      setFieldValue('region', val);
      const codeOfRegion = regions?.filter(({ name }: IRegion) => name === val);
      codeOfRegion?.length &&
        dispatch(getCitiesListByRegion(codeOfRegion[0].code));
      setFieldValue('city', '');
    },
    [regions]
  );

  const onChangeCompany = useCallback(
    (
      setFieldValue: (
        key: string,
        data?: string | string[] | number | IContactsJobs
      ) => void
    ) => (company?: ICompany) => {
      setTouchedHandler();

      if (company) {
        const {
          id,
          website,
          linkedin,
          sto_full_name,
          industries: companyIndustry,
          type
        } = company;
        setFieldValue('company_id', id);
        setFieldValue('company', company.name);
        setFieldValue('companyWebSite', website);
        setFieldValue('companyLinkedIn', linkedin);
        setFieldValue('CTO', sto_full_name);
        setFieldValue('industry', companyIndustry?.map(nameMapCallBack));
        setFieldValue('company_type', type);
        setFieldValue('company_subsidiary', company?.subsidiary?.[0]?.id);
        setFieldValue('company_holding', company?.holding?.[0]?.id);
        setFieldValue('company_founded', company?.founded);
        setFieldValue('vacancies', company?.vacancies || []);
        setFieldValue(
          'companySize',
          companySizeFilter?.filter(
            ({ max }: ICompanySize) => max === company?.max_employees
          )[0]?.name
        );
      }
    },
    [dispatch]
  );

  const onChangeSubsidiary = useCallback(
    (setFieldValue: (key: string, data?: number | string) => void) => (
      val: ICompany
    ) => {
      setFieldValue('company_subsidiary', val.id);
      setFieldValue('company_holding', '');
    },
    []
  );

  const onChangeHolding = useCallback(
    (setFieldValue: (key: string, data?: number | string) => void) => (
      val: ICompany
    ) => {
      setFieldValue('company_holding', val.id);
      setFieldValue('company_subsidiary', '');
    },
    []
  );

  const onChangeFullName = (
    setFieldValue: (key: string, data?: string) => void
  ) => (val: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFieldValue('full_name', val.target.value);
    setIsEditedFullName(true);
  };

  const setSearchField = (
    setFieldValue: (
      key: string,
      data?: number | string | string[] | boolean
    ) => void,
    key: string
  ) => (val: string) => {
    setFieldValue(key, val);
  };

  const onChangeIndustry = (
    setFieldValue: (key: string, data?: string[]) => void
  ) => (val: Array<string>) => {
    setTouchedHandler();
    setFieldValue('industry', val);
  };

  const props = {
    countries: countries ? getNamesList(countries) : [],
    regions: (regions && getNamesList(regions)) || [],
    cities: (cites && getNamesList(cites)) || [],
    industries: (industries && getNamesList(industries)) || [],
    companies: [],
    companySizeFilter:
      (companySizeFilter && getNamesList(companySizeFilter)) || [],
    onChangeCompany,
    onChangeCountry,
    onChangeRegion,
    onChangeFullName,
    onChangeIndustry,
    isEditedFullName,
    setSearchField,
    isFullForm,
    onChangeSubsidiary,
    onChangeHolding
  };

  const closePopup = useCallback(() => setErrorsList({ open: false }), []);

  const errorDialog = useCallback(() => {
    if (errorsList?.linkedin) {
      return (
        <LinkedInBlock
          href={errorsList.linkedin.name}
          linkName={errorsList.linkedin.name}
          name={errorsList.linkedin?.responsible as string}
          date={errorsList.linkedin?.created as string}
        />
      );
    }
    if (errorsList?.simpleErr) {
      return <OccupiedMessage message={errorsList?.simpleErr as string} />;
    }
    return false;
  }, [errorsList]);

  return (
    <>
      <Dialog maxWidth='sm' open={errorsList.open} onClose={closePopup}>
        {errorDialog()}
      </Dialog>
      <Formik
        initialValues={initialValues}
        validateOnChange
        validationSchema={contactFormSchema(roles)}
        onSubmit={handleSubmit}
      >
        {({ setTouched, touched, setFieldValue, ...formikProps }) => {
          const handleChange = (name: string) => ({
            target: { value }
          }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setTouchedHandler();
            setFieldValue(name, value);
          };

          const handleChangeFirstLastName = (name: string) => ({
            target: { value }
          }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setTouchedHandler();
            setFieldValue(name, value);
            setIsEditedFullName(false);
          };

          const setFieldValueHandler = (name: string, value: any) => {
            setTouchedHandler();
            setFieldValue(name, value);
          };

          return onCloseModal ? (
            <ContactFormModalUI
              role={roles}
              formik={{ setTouched, touched, setFieldValue, ...formikProps }}
              edit={!!onCloseModal}
              onCancel={onCancelModal}
              origins={origins}
              companyTypes={companyTypes}
              handleChange={handleChange}
              handleChangeFirstLastName={handleChangeFirstLastName}
              setFieldValueHandler={setFieldValueHandler}
              {...props}
            />
          ) : (
            <ContactFormUI
              role={roles}
              formik={{ setTouched, touched, setFieldValue, ...formikProps }}
              handleChange={handleChange}
              handleChangeFirstLastName={handleChangeFirstLastName}
              setFieldValueHandler={setFieldValueHandler}
              {...props}
            />
          );
        }}
      </Formik>
    </>
  );
};
