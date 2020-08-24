import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikHelpers } from 'formik';
import {
  createContact,
  getCitiesListByRegion,
  getCountryList,
  getRegionListByCountry,
  getCompanyList,
  getIndustriesList,
  createCompany,
  getContactListDaily,
  updateCompany,
  getFiltersData,
  getContactList,
  updateContact,
  getContact
} from 'src/actions';
import {
  getCountries,
  getRegion,
  getCity,
  getCompanySizeFilter,
  getOriginsFilter,
  getCompanyTypesFilter,
  getUser
} from 'src/selectors';
import {
  ICompany,
  ICompanySize,
  ICompanyUpdate,
  IContact,
  ICountry,
  ILocation,
  IRegion
} from 'src/interfaces';
import { Dialog } from '@material-ui/core';
import { getIndustries } from 'src/selectors/industry.selector';
import { OccupiedMessage, LinkedInBlock } from 'src/components/common/PopUp';
import { contactFormSchema } from 'src/utils/form/validate';
import { IContactFormInputs, IErrorsContact } from './interfaces';
import { ContactFormUI, ContactFormModalUI } from '.';

export const ContactForm: FC<{
  onCloseModal?: () => void;
  contact?: IContactFormInputs;
}> = ({ onCloseModal, contact }) => {
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
  const isFullForm = Boolean(roles?.nc2 || roles?.manager || roles?.superAdmin);

  const nameMapCallBack = ({ name }: { name: string }) => name;

  const getNamesList = (obj: Array<{ name: string }>) =>
    obj?.map(nameMapCallBack);

  useEffect(() => {
    dispatch(getCountryList());
    dispatch(getFiltersData());
    dispatch(getIndustriesList());
    dispatch(getCompanyList({ mode: 'all' }));
  }, []);

  const successCallback = (resetCallback: (val: object) => void) => {
    resetCallback({});
    dispatch(onCloseModal ? getContactList() : getContactListDaily());
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
    colleagues: [],
    emails: [],
    companySize: '',
    gender: 'f',
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
    social_networks: '',
    confidence: 0,
    formCondition: isFullForm,
    birthday: [],
    company_founded: []
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
      company_founded
    };
    const location: ILocation = { country };
    if (region) location.region = region;
    if (city) location.city = city;

    const data: IContact = {
      responsible: initialValues.responsible,
      first_name,
      last_name,
      gender,
      emails,
      location,
      company_id,
      linkedin,
      position,
      skype,
      confidence: Number(confidence),
      full_name: full_name || `${first_name} ${last_name}`,
      requires_validation: requires_validation ? '0' : '1',
      birthday: birthday && birthday.toString()
    };
    if (origin?.length) {
      [data.origin] = [...origin];
    }

    if (isFullForm && colleagues) {
      data.colleagues = colleagues;
    }

    if (comment) {
      data.comment = comment;
    }

    if (social_networks) {
      data.social_networks = [social_networks];
    }

    if (phones?.length) {
      data.phones = phones;
    }

    const selectedSizeCompany = companySizeFilter?.filter(
      ({ name }: ICompanySize) => name === companySize
    )[0];

    const newCompany: ICompanyUpdate = {
      name: company,
      website: companyWebSite,
      industries: industries
        .filter(({ name }) => industry?.includes(name))
        .map(({ id }) => id),
      min_employees: selectedSizeCompany?.min,
      max_employees: selectedSizeCompany?.max,
      founded: company_founded && company_founded.toString()
    };

    if (company_type) newCompany.type = company_type;
    if (company_subsidiary) newCompany.subsidiaries = [company_subsidiary];
    if (company_holding) newCompany.holding = [company_holding];
    if (isFullForm) newCompany.vacancies = vacancies;
    if (CTO) newCompany.sto_full_name = CTO;
    if (CTO) newCompany.linkedin = companyLinkedIn;

    const sendData = (myData: IContact) =>
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
      setFieldValue: (key: string, data?: string | string[] | number) => void
    ) => (company?: ICompany) => {
      setFieldValue('company', company?.name);
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
        setFieldValue('companyWebSite', website);
        setFieldValue('companyLinkedIn', linkedin);
        setFieldValue('CTO', sto_full_name);
        setFieldValue('industry', companyIndustry?.map(nameMapCallBack));
        setFieldValue('company_type', type);
        setFieldValue(
          'companySize',
          companySizeFilter?.filter(
            ({ max }: ICompanySize) => max === company?.max_employees
          )[0]?.name
        );
      }
    },
    []
  );

  const onChangeSubsidiary = (
    setFieldValue: (key: string, data?: number | string) => void
  ) => (val: ICompany) => {
    setFieldValue('company_subsidiary', val.id);
    setFieldValue('company_holding', '');
  };

  const onChangeHolding = (
    setFieldValue: (key: string, data?: number | string) => void
  ) => (val: ICompany) => {
    setFieldValue('company_holding', val.id);
    setFieldValue('company_subsidiary', '');
  };

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
      {onCloseModal ? (
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange
          validationSchema={contactFormSchema}
          onSubmit={handleSubmit}
        >
          {formikProps => (
            <ContactFormModalUI
              formik={{ ...formikProps }}
              edit={!!onCloseModal}
              onCancel={onCloseModal}
              origins={origins}
              companyTypes={companyTypes}
              {...props}
            />
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={initialValues}
          validateOnBlur={false}
          validateOnChange
          validationSchema={contactFormSchema}
          onSubmit={handleSubmit}
        >
          {formikProps => (
            <ContactFormUI formik={{ ...formikProps }} {...props} />
          )}
        </Formik>
      )}
    </>
  );
};
