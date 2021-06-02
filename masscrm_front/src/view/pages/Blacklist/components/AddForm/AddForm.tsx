import React, { useContext, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, FormikHelpers } from 'formik';
import {
  addToBlacklist,
  fetchBlacklistContacts,
  setPage,
  getShowCountBlacklist
} from 'src/store/slices';
import { ErrorsEmitterContext } from 'src/contexts';
import { SnackErrorBarData } from 'src/utils';
import { SNACKBAR_ERRORS, SORT } from 'src/constants';
import { initialValues } from './constants';
import { AddFormUI } from './components';
import { IInitialAdd } from './interfaces';
import { useStyles } from './AddForm.styles';

interface IProps {
  changeLines?: (value: number) => void;
  tall?: boolean;
}

export const AddForm: FC<IProps> = ({ changeLines, tall }) => {
  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const dispatch = useDispatch();

  const showCount = useSelector(getShowCountBlacklist);

  const styles = useStyles();

  const handleSubmit = (
    { emails }: IInitialAdd,
    { resetForm }: FormikHelpers<any>
  ) => {
    addToBlacklist(emails.split('\n'))
      .then(() => {
        dispatch(setPage(1));

        dispatch(
          fetchBlacklistContacts({
            limit: showCount,
            page: 1,
            sort: SORT
          })
        );
        resetForm({});
      })
      .catch(error => {
        const addErrors: string[] = Object.values(error);

        errorsEventEmitter.emit(SNACKBAR_ERRORS, {
          errorsArray: SnackErrorBarData([...new Set(addErrors.flat())])
        });
      });
  };

  return (
    <div className={styles.addWrapper}>
      <div className={styles.addName}>Add contact to blacklist</div>
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
