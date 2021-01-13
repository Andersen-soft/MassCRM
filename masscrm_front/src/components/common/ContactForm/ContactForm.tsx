import React, {
  ChangeEvent,
  FC,
  useCallback,
  useContext,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikHelpers } from 'formik';
import {
  createContact,
  createCompany,
  updateCompany,
  updateContact,
  getContact,
  getAddContactList,
  setPage
} from 'src/actions';
import {
  getUser,
  getFilterSettings,
  getIndustries,
  getCurrentPage
} from 'src/selectors';
import { ICompany, IContact, ILocation } from 'src/interfaces';
import { OccupiedMessage, DefaultPopUp } from 'src/components/common/PopUp';
import { contactFormSchema } from 'src/utils/form/validate';
import { createErrorsObject, getErrorsList } from 'src/utils/errors';
import { deleteEmptyFields } from 'src/utils/form/objectHelpers';
import { CompanyBuilder } from 'src/utils/form/companyBuilder';
import { ContactBuilder } from 'src/utils/form/contactBuilder';
import { ErrorEmitterContext } from 'src/context';
import { IContactFormInputs, IErrorsContact } from './interfaces';
import { ContactFormUI, ContactFormModalUI } from './index';

interface ISearchObject {
  search: {
    skip_responsibility: number;
    email?: string;
    social_networks?: string;
    linkedin?: string;
  };
}

export const ContactForm: FC<{
  onCloseModal?: () => void;
  onCancelModal?: () => void;
  contact?: IContactFormInputs;
  setIsTouchedForm?: (val: boolean) => void;
  autoFocus?: string;
  onSubmitSuccess?: Function;
  typeModal?: 'copy' | 'create' | 'edit';
}> = ({
  onCloseModal,
  contact,
  setIsTouchedForm,
  onCancelModal,
  autoFocus,
  onSubmitSuccess,
  typeModal
}) => {
  const dispatch = useDispatch();
  const allIndustries = useSelector(getIndustries);
  const [isEditedFullName, setIsEditedFullName] = useState<boolean>(false);
  const [errorsList, setErrorsList] = useState<IErrorsContact>({ open: false });
  const { name: nameUser, surname: surnameUser, roles } = useSelector(getUser);
  const isFullForm = Boolean(roles?.manager || roles?.superAdmin);
  const filter = useSelector(getFilterSettings);
  const currentPage: number = useSelector(getCurrentPage);
  const { errorsEventEmitter, handleClearErrors } = useContext(
    ErrorEmitterContext
  );
  const formForVacancies = Boolean(
    roles?.nc2 || roles?.manager || roles?.superAdmin
  );

  const closePopup = useCallback(() => {
    setErrorsList({ open: false });
    handleClearErrors();
  }, []);

  const setTouchedHandler = useCallback(() => {
    setIsTouchedForm && setIsTouchedForm(true);
  }, [setIsTouchedForm]);

  const successCallback = (resetCallback: (val: object) => void) => {
    resetCallback({});

    if (onSubmitSuccess) onSubmitSuccess();
    if (currentPage !== 1) dispatch(setPage(1));
    else dispatch(getAddContactList({ ...filter, page: currentPage }));
    onCloseModal && onCloseModal();
    closePopup();
  };

  const errorCallback = (val: IContactFormInputs) => (error: string) => {
    const parseError = JSON.parse(error);
    const createError = (title: string[]) => (dat: any[]) => {
      const errorsObject = createErrorsObject(title, dat.flat());
      errorsEventEmitter.emit('popUpErrors', {
        errorsArray: [JSON.stringify(errorsObject)]
      });
    };
    if (getErrorsList('already used', parseError).length) {
      const arrayTitle: string[] = [];
      const arrayObjects = Object.keys(parseError).reduce(
        (acc: ISearchObject[], cur: string) => {
          if (cur.includes('emails.')) {
            arrayTitle.push(parseError[cur].toString());
            return [
              ...acc,
              {
                search: {
                  email: val?.emails[Number(cur.substr(7))],
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
                  social_networks: val?.social_networks[Number(cur.substr(16))],
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
      company_holding,
      max_employees,
      min_employees
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
      .setSkipValidation(errorsList.open);

    const sendData = (myData: ContactBuilder) =>
      contact?.id && typeModal !== 'copy'
        ? updateMyContact(myData, formikHelpers.resetForm, contact.id, values)
        : createNewContact(myData, formikHelpers.resetForm, values);

    const errorCallbackCompany = (error: { [key: string]: string[] }) => {
      const errorsArray = Object.values(error).flat();
      setErrorsList({
        simpleErr: errorsArray.filter(item => !item.includes('already used')),
        duplicateErr: errorsArray.filter(item => item.includes('already used')),
        open: true
      });
    };

    if (company_id) {
      updateCompany(company_id, deleteEmptyFields(newCompany))
        .then(() => {
          sendData(data);
        })
        .catch(errorCallbackCompany);
    } else {
      createCompany(deleteEmptyFields(newCompany))
        .then((value: string | number | undefined) => {
          data.company_id = value as number;
          formikHelpers.setFieldValue('company_id', Number(value));
          sendData(data);
        })
        .catch(errorCallbackCompany);
    }
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

  const errorDialog = useCallback(
    (submitFunction: () => void) => {
      if (errorsList?.duplicateErr?.length) {
        return (
          <DefaultPopUp
            onClose={closePopup}
            onConfirm={submitFunction}
            questionMessage={
              <>
                <OccupiedMessage message={errorsList?.duplicateErr} />
                <span>Are you sure you want to create new company?</span>
              </>
            }
          />
        );
      }
      return false;
    },
    [errorsList]
  );

  const props = {
    companies: [],
    onChangeFullName,
    isEditedFullName,
    isFullForm,
    onChangeSubsidiary,
    onChangeHolding,
    errorsList,
    errorDialog,
    closePopup
  };

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
