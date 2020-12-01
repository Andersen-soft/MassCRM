import React, { useEffect, useContext, useState } from 'react';
import { ErrorEmitterContext } from 'src/context';
import { Dialog } from '@material-ui/core';
import { CommonAlert } from '../common/CommonAlert';
import { ErrorContactPopup, OccupiedMessage } from '../common/PopUp';

export const DisplayErrors = () => {
  const [openError, setOpenError] = useState(false);
  const { errorsData, handleClearErrors } = useContext(ErrorEmitterContext);
  const { snackBarErrors, popUpErrors, simplePopUpErrors } = errorsData;
  const handleClose = () => {
    setOpenError(false);
    openError && handleClearErrors();
  };

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
