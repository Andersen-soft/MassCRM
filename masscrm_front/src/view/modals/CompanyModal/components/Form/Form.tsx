import React, {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Formik, FormikHelpers } from 'formik';
import {
  getUser,
  getIndustries,
  getFiltersDataSelector,
  createCompany,
  updateCompany,
  getFiltersData as getFiltersDataAction
} from 'src/store/slices';
import { ICompany, ICompanyFormInputs } from 'src/interfaces';
import { companyFormSchema, CompanyBuilder } from 'src/utils';
import { DefaultPopup } from 'src/view/molecules';
import { OccupiedMessage } from 'src/view/atoms';
import { ALREADY_USED } from 'src/constants';
import { ModalUI } from './components';
import { INITIAL_VALUES } from './constants';
import { ICompanyFormErrorsContact } from './interfaces';

interface IProps {
  onCloseModal?: () => void;
  onCancelModal?: () => void;
  company?: ICompanyFormInputs;
  onSubmitSuccess?: Function;
}

export const Form: FC<IProps> = ({
  company,
  onCancelModal,
  onCloseModal,
  onSubmitSuccess
}) => {
  const allIndustries = useSelector(getIndustries);
  const { roles } = useSelector(getUser);
  const filtersData = useSelector(getFiltersDataSelector);

  const isFullForm = !!(roles?.manager || roles?.superAdmin);

  const [errorsList, setErrorsList] = useState<ICompanyFormErrorsContact>({
    open: false
  });

  const history = useHistory();

  const dispatch = useDispatch();

  const formForVacancies = !!(
    roles?.nc2 ||
    roles?.manager ||
    roles?.superAdmin
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

  const initialValues = useMemo<ICompanyFormInputs>(
    () => company || INITIAL_VALUES,
    [company]
  );

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
        simpleErr: errorsArray.filter(item => !item.includes(ALREADY_USED)),
        duplicateErr: errorsArray.filter(item => item.includes(ALREADY_USED)),
        open: true
      });
    };

    if (id) {
      return updateCompany(id, newCompany)
        .then(() => sendData())
        .catch(errorCallbackCompany);
    }
    return createCompany(newCompany)
      .then((newCompanyId: number) => {
        sendData();
        history.push(`/company?id=${newCompanyId}`);
      })
      .catch(errorCallbackCompany);
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
          <DefaultPopup
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

  useEffect(() => {
    !Object.keys(filtersData).length && dispatch(getFiltersDataAction());
  }, []);

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
          <ModalUI
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
