import React, { useEffect, useContext, useState, useCallback } from 'react';
import { ErrorsEmitterContext } from 'src/contexts';
import { Dialog } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContactForBindingToCompany,
  getIsContactForBindingToCompanyUpdated,
  setContactForBindingToCompany,
  setIsContactForBindingToCompanyUpdated
} from 'src/store/slices';
import { DefaultPopup } from 'src/view/molecules';
import { CommonAlert, OccupiedMessage } from 'src/view/atoms';
import { IErrorsObject } from 'src/interfaces';
import { ContactEdit } from 'src/view/organisms';
import { ErrorContactPopup, ErrorRequiredFieldsPopup } from './components';

export const DisplayErrors = () => {
  const dispatch = useDispatch();

  const contactForBindingToCompany = useSelector(getContactForBindingToCompany);
  const isContactForBindingToCompanyUpdated = useSelector(
    getIsContactForBindingToCompanyUpdated
  );

  const [openError, setOpenError] = useState(false);
  const [openEditContact, setOpenEditContact] = useState<boolean>(false);

  const { errorsData, handleClearErrors } = useContext(ErrorsEmitterContext);
  const {
    snackBarErrors,
    popUpErrors,
    simplePopUpErrors,
    requiredFieldsPopUpErrors,
    companyDuplicateErrors
  } = errorsData;

  const handleClose = () => {
    setOpenError(false);
    openError && handleClearErrors();
  };

  const handleToggleErrorModal = useCallback(
    () => setOpenError((val: boolean) => !val),
    [setOpenError]
  );

  const handleToggleEditContact = useCallback(() => {
    setOpenEditContact((val: boolean) => !val);

    if (openEditContact && isContactForBindingToCompanyUpdated) {
      dispatch(
        setContactForBindingToCompany({ contactForBindingToCompany: {} })
      );
    }
    openEditContact && handleClearErrors();
    openError && handleToggleErrorModal();
  }, [setOpenEditContact, openError, openEditContact]);

  const onSubmitSuccess = useCallback(() => {
    dispatch(
      setIsContactForBindingToCompanyUpdated({
        isContactForBindingToCompanyUpdated: true
      })
    );
  }, [isContactForBindingToCompanyUpdated]);

  const TYPES_OF_ERRORS: any = {
    snackBarErrors: () => (
      <CommonAlert
        open={openError}
        onClose={handleClose}
        errorMessage={snackBarErrors}
        type='error'
      />
    ),
    popUpErrors: () => (
      <Dialog open={openError} onClose={handleClose}>
        <ErrorContactPopup errorsData={popUpErrors} handleClose={handleClose} />
      </Dialog>
    ),
    simplePopUpErrors: () => (
      <Dialog open={openError}>
        <OccupiedMessage message={simplePopUpErrors} />
      </Dialog>
    ),
    requiredFieldsPopUpErrors: () => (
      <>
        <Dialog open={openError} onClose={handleClose}>
          <ErrorRequiredFieldsPopup
            handleClose={handleClose}
            handleToggleEditContact={handleToggleEditContact}
            errorsData={requiredFieldsPopUpErrors}
            open={openError}
          />
        </Dialog>
        {openEditContact && (
          <ContactEdit
            contact={contactForBindingToCompany}
            handleClose={handleToggleEditContact}
            open={openEditContact && 'edit'}
            onSubmitSuccess={onSubmitSuccess}
          />
        )}
      </>
    ),
    companyDuplicateErrors: () => {
      const [{ value, submitFunction, helpers }] = companyDuplicateErrors;

      return (
        <Dialog open={openError} onClose={handleClose}>
          <DefaultPopup
            value={value}
            onConfirm={submitFunction}
            onClose={handleClose}
            helpers={helpers}
            questionMessage={
              <>
                {companyDuplicateErrors.map(
                  ({
                    title,
                    value: compDuplicateErrorValue
                  }: IErrorsObject) => (
                    <OccupiedMessage
                      message={title}
                      key={compDuplicateErrorValue}
                    />
                  )
                )}
                <span>Are you sure you want to update this company?</span>
              </>
            }
          />
        </Dialog>
      );
    },
    noError: () => null
  };

  const typesOfErrors = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in errorsData) {
      if (errorsData[key].length) {
        return TYPES_OF_ERRORS[key];
      }
    }
    return TYPES_OF_ERRORS.noError;
  };

  const existErrors = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const key in errorsData) {
      if (errorsData[key].length) {
        return true;
      }
    }
    return false;
  };

  const error = typesOfErrors();

  useEffect(() => {
    const isErrors = existErrors();

    isErrors && setOpenError(true);
  }, [errorsData]);

  return error();
};
