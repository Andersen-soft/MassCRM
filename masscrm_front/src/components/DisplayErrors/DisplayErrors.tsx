import React, { useEffect, useContext, useState, useCallback } from 'react';
import { ErrorEmitterContext } from 'src/context';
import { Dialog } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  getContactForBindingToCompany,
  getIsContactForBindingToCompanyUpdated
} from 'src/selectors';
import {
  setContactForBindingToCompany,
  setIsContactForBindingToCompanyUpdated
} from 'src/actions';
import {
  CommonAlert,
  ErrorContactPopup,
  OccupiedMessage,
  ErrorRequiredFieldsPopup,
  ContactEdit,
  DefaultPopUp
} from 'src/components/common';

export const DisplayErrors = () => {
  const dispatch = useDispatch();
  const contactForBindingToCompany = useSelector(getContactForBindingToCompany);

  const [openError, setOpenError] = useState(false);
  const [openEditContact, setOpenEditContact] = useState<boolean>(false);
  const { errorsData, handleClearErrors } = useContext(ErrorEmitterContext);
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

  const isContactForBindingToCompanyUpdated = useSelector(
    getIsContactForBindingToCompanyUpdated
  );

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
          <DefaultPopUp
            value={value}
            onConfirm={submitFunction}
            onClose={handleClose}
            helpers={helpers}
            questionMessage={
              <>
                {companyDuplicateErrors.map(item => (
                  <OccupiedMessage message={item.title} key={item.value} />
                ))}
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
