import React, { ChangeEvent, FC, useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import { createCompany, updateCompany } from 'src/actions';
import { getUser, getIndustries } from 'src/selectors';
import { ICompany } from 'src/interfaces';
import { companyFormSchema } from 'src/utils/form/validate';
import { OccupiedMessage, DefaultPopUp } from 'src/components/common/PopUp';
import { CompanyBuilder } from 'src/utils/form/companyBuilder';
import { ICompanyFormInputs } from './interfaces';
import { CompanyFormModalUI } from '.';
import { IErrorsContact } from '../ContactForm/interfaces';

const INITIAL = {
  name: '',
  website: '',
  linkedin: '',
  sto_full_name: '',
  type: '',
  founded: '',
  comment: '',
  industry: [],
  subsidiary: [],
  holding: [],
  vacancies: []
};

export const CompanyForm: FC<{
  onCloseModal?: () => void;
  onCancelModal?: () => void;
  company?: ICompanyFormInputs;
  onSubmitSuccess?: Function;
}> = ({ company, onCancelModal, onCloseModal, onSubmitSuccess }) => {
  const allIndustries = useSelector(getIndustries);
  const { roles } = useSelector(getUser);
  const isFullForm = Boolean(roles?.manager || roles?.superAdmin);
  const [errorsList, setErrorsList] = useState<IErrorsContact>({ open: false });
  const history = useHistory();

  const formForVacancies = Boolean(
    roles?.nc2 || roles?.manager || roles?.superAdmin
  );

  const closePopup = useCallback(() => {
    setErrorsList({ open: false });
  }, []);

  const successCallback = (resetCallback: (val: object) => void) => {
    resetCallback({});
    onSubmitSuccess && onSubmitSuccess();

    onCloseModal && onCloseModal();
    closePopup();
  };

  const updateMyCompany = (resetCallback: (val: object) => void) => {
    successCallback(resetCallback);
  };

  const initialValues = useMemo<ICompanyFormInputs>(() => company || INITIAL, [
    company
  ]);

  const handleSubmit = (
    {
      id,
      name,
      website,
      linkedin,
      sto_full_name,
      type,
      founded,
      industry,
      subsidiary,
      holding,
      vacancies,
      max_employees,
      min_employees,
      comment
    }: ICompanyFormInputs,
    formikHelpers: FormikHelpers<any>
  ) => {
    const newCompany = new CompanyBuilder()
      .setName(name)
      .setWebsite(website)
      .setIndustries(allIndustries, industry)
      .setMinEmployees(min_employees)
      .setMaxEmployees(max_employees)
      .setFounded(founded)
      .setCompanyType(type)
      .setCompanySubsidiary(subsidiary)
      .setCompanyHolding(holding)
      .setVacancies(formForVacancies, vacancies)
      .setCTOFullName(sto_full_name)
      .setComment(comment)
      .setSkipValidation(errorsList.open)
      .setCompanyLinkedIn(linkedin);

    const sendData = () => updateMyCompany(formikHelpers.resetForm);

    const errorCallbackCompany = (error: { [key: string]: string[] }) => {
      const errorsArray = Object.values(error).flat();
      setErrorsList({
        simpleErr: errorsArray.filter(item => !item.includes('already used')),
        duplicateErr: errorsArray.filter(item => item.includes('already used')),
        open: true
      });
    };

    if (id) {
      updateCompany(id, newCompany)
        .then(() => sendData())
        .catch(errorCallbackCompany);
    } else {
      createCompany(newCompany)
        .then((newCompanyId: number) => {
          sendData();
          history.push(`/company?id=${newCompanyId}`);
        })
        .catch(errorCallbackCompany);
    }
  };

  const onChangeSubsidiary = useCallback(
    (setFieldValue: (key: string, data?: number | string) => void) => ({
      id
    }: ICompany) => {
      setFieldValue('subsidiary', id);
      setFieldValue('holding', '');
    },
    []
  );

  const onChangeHolding = useCallback(
    (setFieldValue: (key: string, data?: number | string) => void) => ({
      id
    }: ICompany) => {
      setFieldValue('holding', id);
      setFieldValue('subsidiary', '');
    },
    []
  );

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
      if (errorsList?.simpleErr?.length) {
        errorsList.simpleErr.map(errItem => <div key={errItem}>{errItem}</div>);
      }
      return false;
    },
    [errorsList]
  );

  const props = {
    isFullForm,
    onChangeSubsidiary,
    onChangeHolding,
    errorDialog,
    closePopup,
    errorsList
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange
      validationSchema={companyFormSchema(roles)}
      onSubmit={handleSubmit}
    >
      {({
        touched,
        values,
        setFieldValue,
        setFieldTouched,
        setValues,
        ...formikProps
      }) => {
        const handleChange = (name: string) => ({
          target: { value }
        }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          setFieldTouched(name, true);
          setFieldValue(name, value);
        };

        const setFieldValueHandler = (name: string, value: any) => {
          setFieldTouched(name, true);
          setFieldValue(name, value);
        };

        const setFieldValues = (value: ICompanyFormInputs) => {
          setValues(val => ({ ...val, ...value }));
        };

        return (
          <CompanyFormModalUI
            role={roles}
            formik={{
              touched,
              setFieldValue,
              ...formikProps
            }}
            onCancel={onCancelModal}
            handleChange={handleChange}
            setFieldValueHandler={setFieldValueHandler}
            setFieldValues={setFieldValues}
            {...props}
          />
        );
      }}
    </Formik>
  );
};
