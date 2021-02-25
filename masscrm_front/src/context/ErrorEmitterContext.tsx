import React, { FC, useEffect, useState } from 'react';
import { EventEmitter } from '../utils/EventEmitter';

interface IErrorsObject {
  title: string[];
  value: string;
  submitFunction: Function;
  helpers?: any;
}

interface IErrorsState {
  [index: string]: string[] | JSX.Element[] | IErrorsObject[];
  snackBarErrors: JSX.Element[];
  popUpErrors: string[];
  simplePopUpErrors: string[];
  requiredFieldsPopUpErrors: string[];
  companyDuplicateErrors: IErrorsObject[];
}

interface IDefaultValue {
  handleClearErrors: () => void;
  errorsEventEmitter: any;
  handleSetErrorData?: (value: any) => void;
  errorsData: IErrorsState;
}

interface IErrorsData {
  [key: string]: string[] | IErrorsObject[];
  errorsArray: string[];
  errorsObject: IErrorsObject[];
}
interface IJSXErrorsData {
  [key: string]: JSX.Element[];
  errorsArray: JSX.Element[];
}

const INITIAL_VALUES: IErrorsState = {
  snackBarErrors: [],
  popUpErrors: [],
  simplePopUpErrors: [],
  requiredFieldsPopUpErrors: [],
  companyDuplicateErrors: []
};

const errorsEventEmitter = new EventEmitter();

export const ErrorEmitterContext = React.createContext<IDefaultValue>({
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

export const ErrorEmitterProvider: FC = ({ children }) => {
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
    errorsEventEmitter.once('snackBarErrors', setSnackBarErrors);
    errorsEventEmitter.once('popUpErrors', setPopUpErrors);
    errorsEventEmitter.once('simplePopUpErrors', setSimplePopUpErrors);
    errorsEventEmitter.once(
      'requiredFieldsPopUpErrors',
      setRequiredFieldsPopUpErrors
    );
    errorsEventEmitter.once(
      'companyDuplicateErrors',
      setCompanyDuplicateErrors
    );
  }, []);

  return (
    <ErrorEmitterContext.Provider
      value={{
        handleClearErrors,
        errorsEventEmitter,
        errorsData
      }}
    >
      {children}
    </ErrorEmitterContext.Provider>
  );
};
