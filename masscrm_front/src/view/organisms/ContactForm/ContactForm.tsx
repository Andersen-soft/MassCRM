import React, {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikHelpers } from 'formik';
import {
  getUser,
  getFilterSettings,
  getCurrentPage,
  getContacts,
  getFiltersDataSelector,
  getIndustries,
  createContact,
  createCompany,
  updateCompany,
  updateContact,
  getContact,
  getAddContactList,
  setPage,
  getFiltersData as getFiltersDataAction
} from 'src/store/slices';
import {
  ICompany,
  IContact,
  ILocation,
  IContactFormInputs
} from 'src/interfaces';
import {
  contactFormSchema,
  createErrorsObject,
  getErrorsList,
  deleteEmptyFields,
  CompanyBuilder,
  ContactBuilder
} from 'src/utils';
import { ErrorsEmitterContext } from 'src/contexts';
import {
  ALREADY_USED,
  COMPANY_DUPLICATE_ERRORS,
  POPUP_ERRORS
} from 'src/constants';
import { ISearchObject } from './interfaces';
import { ContactFormUI, ContactFormModalUI } from './components';

interface IProps {
  onCloseModal?: () => void;
  onCancelModal?: () => void;
  contact?: IContactFormInputs;
  setIsTouchedForm?: (val: boolean) => void;
  autoFocus?: string;
  onSubmitSuccess?: Function;
  typeModal?: 'copy' | 'create' | 'edit';
  shouldGetFiltersData: boolean;
}

export const ContactForm: FC<IProps> = ({
  onCloseModal,
  contact,
  setIsTouchedForm,
  onCancelModal,
  autoFocus,
  onSubmitSuccess,
  typeModal,
  shouldGetFiltersData
}) => {
  const dispatch = useDispatch();

  const [isEditedFullName, setIsEditedFullName] = useState(false);

  const contactsData = useSelector(getContacts);
  const filter = useSelector(getFilterSettings);
  const currentPage: number = useSelector(getCurrentPage);
  const { name: nameUser, surname: surnameUser, roles } = useSelector(getUser);
  const filtersData = useSelector(getFiltersDataSelector);
  const allIndustries = useSelector(getIndustries);
  const isNC1 =
    Object.keys(roles).includes('nc1') && Object.keys(roles).length === 1;

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const formForVacancies = !!(
    roles?.nc2 ||
    roles?.manager ||
    roles?.superAdmin
  );

  const isFullForm = !!(roles?.manager || roles?.superAdmin);

  const setTouchedHandler = useCallback(() => {
    setIsTouchedForm && setIsTouchedForm(true);
  }, [setIsTouchedForm]);

  const successCallback = (resetCallback: (val: object) => void) => {
    resetCallback({});

    if (onSubmitSuccess) onSubmitSuccess();

    if (currentPage !== 1) {
      dispatch(setPage(1));
    } else if (
      currentPage === 1 &&
      (!contactsData.length || contactsData.length > 1)
    ) {
      dispatch(getAddContactList({ ...filter, page: currentPage }));
    }

    onCloseModal && onCloseModal();
  };

  const errorCallback = (val: IContactFormInputs) => (error: string) => {
    const parseError = JSON.parse(error);

    const createError = (title: string[]) => (dat: any[]) => {
      const errorsObject = createErrorsObject(title, dat.flat());
      errorsEventEmitter.emit(POPUP_ERRORS, {
        errorsArray: [JSON.stringify(errorsObject)]
      });
    };
    if (getErrorsList(ALREADY_USED, parseError).length) {
      const arrayTitle: string[] = [];
      const arrayObjects = Object.keys(parseError).reduce(
        (acc: ISearchObject[], cur: string) => {
          if (cur.includes('emails.')) {
            arrayTitle.push(parseError[cur].toString());
            return [
              ...acc,
              {
                search: {
                  email: val?.emails[+cur.substr(7)],
                  skip_responsibility: 1
                }
              }
            ];
          }
          if (cur.includes('social_networks') && val?.social_networks) {
            arrayTitle.push(parseError[cur].toString());
            return [
              ...acc,
              {
                search: {
                  social_networks: val?.social_networks[+cur.substr(16)],
                  skip_responsibility: 1
                }
              }
            ];
          }
          if (cur.includes('linkedin') && val?.linkedin) {
            arrayTitle.push(parseError[cur].toString());
            return [
              ...acc,
              {
                search: { linkedin: val.linkedin, skip_responsibility: 1 }
              }
            ];
          }
          return acc;
        },
        []
      );
      const arrayPromises = arrayObjects.map((item: ISearchObject) =>
        getContact(item)
      );
      Promise.all(arrayPromises).then(createError(arrayTitle));
    }
  };

  const createNewContact = (
    data: IContact,
    resetCallback: (val: object) => void,
    val: IContactFormInputs
  ) => {
    createContact(deleteEmptyFields(data))
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
    updateContact(deleteEmptyFields(data), id)
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
    city: '',
    skip_validation: 0
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
      company_holding,
      max_employees,
      min_employees,
      skip_validation
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
      company_type,
      skip_validation
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

    const newCompany = new CompanyBuilder()
      .setName(company)
      .setWebsite(companyWebSite)
      .setIndustries(allIndustries, industry)
      .setMinEmployees(min_employees)
      .setMaxEmployees(max_employees)
      .setFounded(company_founded)
      .setCompanyType(company_type)
      .setCompanySubsidiary(company_subsidiary)
      .setCompanyHolding(company_holding)
      .setVacancies(formForVacancies, vacancies)
      .setCTOFullName(CTO)
      .setCompanyLinkedIn(companyLinkedIn)
      .setSkipValidation(!!skip_validation);

    const sendData = (myData: ContactBuilder) =>
      contact?.id && typeModal !== 'copy'
        ? updateMyContact(myData, formikHelpers.resetForm, contact.id, values)
        : createNewContact(myData, formikHelpers.resetForm, values);

    const errorCallbackCompany = (error: string) => {
      const parseError: { [key: string]: string[] } = JSON.parse(error);
      const isDuplicateErrors =
        parseError.website?.toString().includes('website is already') ||
        parseError.linkedin?.toString().includes('LinkedIn is already');

      if (isDuplicateErrors) {
        errorsEventEmitter.emit(COMPANY_DUPLICATE_ERRORS, {
          errorsObject: [
            {
              title:
                parseError.linkedin && parseError.website
                  ? [...parseError.linkedin, ...parseError.website]
                  : parseError.website || parseError.linkedin,
              value: { ...values, skip_validation: 1 },
              submitFunction: handleSubmit,
              helpers: formikHelpers
            }
          ]
        });
      }
    };

    if (company_id && !isNC1) {
      return updateCompany(company_id, deleteEmptyFields(newCompany))
        .then(() => {
          sendData(data);
        })
        .catch(errorCallbackCompany);
    }
    if (company_id && isNC1) {
      try {
        return sendData(data);
      } catch (e) {
        errorCallbackCompany(e);
      }
    }

    return createCompany(deleteEmptyFields(newCompany))
      .then((value: string | number | undefined) => {
        data.company_id = value as number;
        formikHelpers.setFieldValue('company_id', Number(value));
        sendData(data);
      })
      .catch(errorCallbackCompany);
  };

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

  const props = {
    companies: [],
    onChangeFullName,
    isEditedFullName,
    isFullForm,
    onChangeSubsidiary,
    onChangeHolding
  };

  useEffect(() => {
    !Object.keys(filtersData).length &&
      shouldGetFiltersData &&
      dispatch(getFiltersDataAction());
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      validationSchema={contactFormSchema(roles)}
      onSubmit={handleSubmit}
    >
      {({ setTouched, touched, setFieldValue, setValues, ...formikProps }) => {
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

        const setFieldValues = (value: IContactFormInputs) => {
          setTouchedHandler();
          setValues(val => ({ ...val, ...value }));
        };

        return onCloseModal ? (
          <ContactFormModalUI
            role={roles}
            formik={{
              setTouched,
              touched,
              setFieldValue,
              ...formikProps
            }}
            edit={!!onCloseModal}
            onCancel={onCancelModal}
            handleChange={handleChange}
            handleChangeFirstLastName={handleChangeFirstLastName}
            setFieldValueHandler={setFieldValueHandler}
            setFieldValues={setFieldValues}
            autoFocus={autoFocus}
            {...props}
          />
        ) : (
          <ContactFormUI
            role={roles}
            formik={{
              setTouched,
              touched,
              setFieldValue,
              ...formikProps
            }}
            handleChange={handleChange}
            handleChangeFirstLastName={handleChangeFirstLastName}
            setFieldValueHandler={setFieldValueHandler}
            setFieldValues={setFieldValues}
            {...props}
          />
        );
      }}
    </Formik>
  );
};
