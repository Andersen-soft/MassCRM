import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import { Formik, FormikHelpers } from 'formik';
import { setPage } from 'src/actions';
import {
  addToBlacklist,
  getBlacklist,
  setErrors
} from 'src/actions/blacklist.action';
import {
  getBlacklistErrors,
  getShowCount
} from 'src/selectors/blacklist.selector';
import { CommonAlert } from 'src/components/common/CommonAlert';
import { SORT } from 'src/utils/table';
import style from './AddForm.scss';
import { AddFormUI } from '../AddFormUI';
import { IInitialAdd, IPropsAddForm } from '../../interfaces';

const sn = styleNames(style);

export const AddForm = ({ changeLines, tall }: IPropsAddForm) => {
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const showCount = useSelector(getShowCount);
  const addFormsErrors = useSelector(getBlacklistErrors);
  const initialValues: IInitialAdd = {
    emails: ''
  };

  const handleClose = () => setOpen(false);

  const handleSubmit = (
    { emails }: IInitialAdd,
    { resetForm }: FormikHelpers<any>
  ) => {
    dispatch(setErrors([]));
    addToBlacklist(emails.split('\n'))
      .catch(error => {
        const addErrors: string[] = Object.values(JSON.parse(error));
        if (addErrors.length) {
          setOpen(true);
          dispatch(setErrors(addErrors.flat()));
          return 'reject';
        }
        return 'resolve';
      })
      .then(response => {
        if (response !== 'reject') {
          dispatch(setPage(1));
          dispatch(
            getBlacklist({
              limit: showCount,
              page: 1,
              sort: SORT
            })
          );
          resetForm({});
        }
      });
  };

  return (
    <div className={sn('add-wrapper')}>
      <div className={sn('add-name')}>Add contact to blacklist</div>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {formikProps => (
          <AddFormUI
            formik={{ ...formikProps }}
            changeLines={changeLines}
            tall={tall}
          />
        )}
      </Formik>
      <CommonAlert
        open={open}
        onClose={handleClose}
        type='error'
        errorMessage={
          <>
            {addFormsErrors?.map((item: string, index: number) => (
              <div key={index}>{item}</div>
            ))}
          </>
        }
      />
    </div>
  );
};
