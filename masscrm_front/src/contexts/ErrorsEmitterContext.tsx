import React, { FC, useEffect, useState, createContext } from 'react';
import {
  COMPANY_DUPLICATE_ERRORS,
  POPUP_ERRORS,
  REQUIRED_FIELDS_POPUP_ERRORS,
  SIMPLE_POPUP_ERRORS,
  SNACKBAR_ERRORS
} from 'src/constants';
import { errorsEventEmitter } from 'src/emitters';
import {
  IErrorsState,
  IErrorsEmitterContextDefaultValues,
  IJSXErrorsData,
  IErrorsData
} from './interfaces';
import { INITIAL_VALUES } from './constants';

export const ErrorsEmitterContext = createContext<
  IErrorsEmitterContextDefaultValues
>({
  handleClearErrors: () => false,
  errorsEventEmitter,
  errorsData: {
    snackBarErrors: [],
    popUpErrors: [],
    simplePopUpErrors: [],
    requiredFieldsPopUpErrors: [],
    companyDuplicateErrors: []
  }
});

export const ErrorsEmitterProvider: FC = ({ children }) => {
  const [errorsData, setErrorsData] = useState<IErrorsState>(INITIAL_VALUES);

  const setSnackBarErrors = (data: IJSXErrorsData) =>
    setErrorsData((prev: IErrorsState) => ({
      ...prev,
      snackBarErrors: [
        ...new Set([...prev.snackBarErrors, ...data.errorsArray])
      ]
    }));

  const setPopUpErrors = (data: IErrorsData) =>
    setErrorsData(prev => ({
      ...prev,
      popUpErrors: [
        ...prev.popUpErrors,
        ...new Set(data.errorsArray as string[])
      ]
    }));

  const setSimplePopUpErrors = (data: IErrorsData) =>
    setErrorsData(prev => ({
      ...prev,
      popUpErrors: prev.simplePopUpErrors.length
        ? prev.simplePopUpErrors
        : [...new Set(data.errorsArray as string[])]
    }));

  const setRequiredFieldsPopUpErrors = (data: IErrorsData) => {
    setErrorsData(prev => ({
      ...prev,
      requiredFieldsPopUpErrors: [
        ...prev.requiredFieldsPopUpErrors,
        ...new Set(data.errorsArray as string[])
      ]
    }));
  };

  const setCompanyDuplicateErrors = (data: IErrorsData) =>
    setErrorsData(prev => ({
      ...prev,
      companyDuplicateErrors: data.errorsObject
    }));

  const handleClearErrors = () => setErrorsData(INITIAL_VALUES);

  useEffect(() => {
    errorsEventEmitter.once(SNACKBAR_ERRORS, setSnackBarErrors);
    errorsEventEmitter.once(POPUP_ERRORS, setPopUpErrors);
    errorsEventEmitter.once(SIMPLE_POPUP_ERRORS, setSimplePopUpErrors);
    errorsEventEmitter.once(
      REQUIRED_FIELDS_POPUP_ERRORS,
      setRequiredFieldsPopUpErrors
    );
    errorsEventEmitter.once(
      COMPANY_DUPLICATE_ERRORS,
      setCompanyDuplicateErrors
    );
  }, []);

  return (
    <ErrorsEmitterContext.Provider
      value={{
        handleClearErrors,
        errorsEventEmitter,
        errorsData
      }}
    >
      {children}
    </ErrorsEmitterContext.Provider>
  );
};
