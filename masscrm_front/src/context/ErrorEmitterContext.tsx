import React, { FC, useEffect, useState } from 'react';
import { EventEmitter } from '../utils/EventEmitter';

interface IErrorsState {
  [index: string]: string[] | JSX.Element[];
  snackBarErrors: JSX.Element[];
  popUpErrors: string[];
  simplePopUpErrors: string[];
}

interface IDefaultValue {
  handleClearErrors: () => void;
  errorsEventEmitter: any;
  handleSetErrorData?: (value: any) => void;
  errorsData: IErrorsState;
}

interface IErrorsData {
  [key: string]: string[];
  errorsArray: string[];
}
interface IJSXErrorsData {
  [key: string]: JSX.Element[];
  errorsArray: JSX.Element[];
}

const INITIAL_VALUES: IErrorsState = {
  snackBarErrors: [],
  popUpErrors: [],
  simplePopUpErrors: []
};

const errorsEventEmitter = new EventEmitter();

export const ErrorEmitterContext = React.createContext<IDefaultValue>({
  handleClearErrors: () => false,
  errorsEventEmitter,
  errorsData: {
    snackBarErrors: [],
    popUpErrors: [],
    simplePopUpErrors: []
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
      popUpErrors: [...prev.popUpErrors, ...new Set(data.errorsArray)]
    }));

  const setSimplePopUpErrors = (data: IErrorsData) =>
    setErrorsData(prev => ({
      ...prev,
      popUpErrors: prev.simplePopUpErrors.length
        ? prev.simplePopUpErrors
        : [...new Set(data.errorsArray)]
    }));

  const handleClearErrors = () => setErrorsData(INITIAL_VALUES);

  useEffect(() => {
    errorsEventEmitter.once('snackBarErrors', setSnackBarErrors);
    errorsEventEmitter.once('popUpErrors', setPopUpErrors);
    errorsEventEmitter.once('simplePopUpErrors', setSimplePopUpErrors);
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
