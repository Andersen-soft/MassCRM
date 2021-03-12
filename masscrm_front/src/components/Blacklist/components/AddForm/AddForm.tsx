import React, { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styleNames } from 'src/services';
import { Formik, FormikHelpers } from 'formik';
import { setPage } from 'src/actions';
import { addToBlacklist, getBlacklist } from 'src/actions/blacklist.action';
import { getShowCountBlacklist } from 'src/selectors/blacklist.selector';
import { SORT } from 'src/utils/table';
import { ErrorEmitterContext } from 'src/context';
import style from './AddForm.scss';
import { AddFormUI } from '../AddFormUI';
import { IInitialAdd, IPropsAddForm } from '../../interfaces';
import { SnackErrorBarData } from '../../../../utils/errors';

const sn = styleNames(style);

export const AddForm = ({ changeLines, tall }: IPropsAddForm) => {
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);
  const dispatch = useDispatch();
  const showCount = useSelector(getShowCountBlacklist);
  const initialValues: IInitialAdd = {
    emails: ''
  };

  const handleSubmit = (
    { emails }: IInitialAdd,
    { resetForm }: FormikHelpers<any>
  ) => {
    addToBlacklist(emails.split('\n'))
      .then(() => {
        dispatch(setPage(1));
        dispatch(
          getBlacklist({
            limit: showCount,
            page: 1,
            sort: SORT
          })
        );
        resetForm({});
      })
      .catch(error => {
        const addErrors: string[] = Object.values(error);
        errorsEventEmitter.emit('snackBarErrors', {
          errorsArray: SnackErrorBarData([...new Set(addErrors.flat())])
        });
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
    </div>
  );
};
