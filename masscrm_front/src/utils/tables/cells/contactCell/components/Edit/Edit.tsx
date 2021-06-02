import React, { FC, useCallback, useContext } from 'react';
import { Check, Close, Add, Clear } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, InputAdornment } from '@material-ui/core';
import { FieldArray, Formik, Form } from 'formik';
import { CommonIcon, CommonInput } from 'src/view/atoms';
import {
  getAddContactList,
  updateContact,
  getContact,
  getFilterSettings
} from 'src/store/slices';
import {
  contactFormEmailSchema,
  contactFormPhoneSchema,
  createErrorsObject,
  DoubleClickError,
  getErrorsList
} from 'src/utils';
import { IContactCell } from 'src/interfaces';
import { ErrorsEmitterContext } from 'src/contexts';
import { ALREADY_USED, POPUP_ERRORS, SNACKBAR_ERRORS } from 'src/constants';
import { useStyles } from './Edit.styles';

interface IProps {
  handleClose: () => void;
}

export const Edit: FC<IContactCell & IProps> = ({
  id,
  value = [],
  handleClose,
  type
}) => {
  const styles = useStyles();

  const { errorsEventEmitter } = useContext(ErrorsEmitterContext);

  const dispatch = useDispatch();

  const filter = useSelector(getFilterSettings);

  const createError = (title: string[]) => (data: any[]) => {
    const errorsObject = createErrorsObject(title, data.flat());
    errorsEventEmitter.emit(POPUP_ERRORS, {
      errorsArray: [JSON.stringify(errorsObject)]
    });
  };

  const errorCallback = (inputValue: string[]) => (errors: string) => {
    const parseError: { [x: string]: string[] } = JSON.parse(errors);

    if (getErrorsList('must be', parseError).length) {
      errorsEventEmitter.emit(SNACKBAR_ERRORS, {
        errorsArray: [DoubleClickError(errors)]
      });
    } else if (getErrorsList(ALREADY_USED, parseError).length) {
      const arrayTitle: string[] = [];
      const arrayPromises = Object.keys(parseError).reduce(
        (acc: any, cur: any) => {
          if (cur.includes('emails.')) {
            arrayTitle.push(parseError[cur].toString());
            return [
              ...acc,
              getContact({
                search: {
                  email: inputValue[+cur.substr(7)],
                  skip_responsibility: 1
                }
              })
            ];
          }
          return acc;
        },
        []
      );
      Promise.all(arrayPromises).then(createError(arrayTitle));
    } else if (errors) {
      errorsEventEmitter.emit(SNACKBAR_ERRORS, {
        errorsArray: [DoubleClickError(errors)]
      });
    }
  };

  const onSubmit = async ({ items }: { items: string[] }) => {
    await updateContact({ [type]: items.filter(item => !!item) }, id)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errorCallback(items));
  };

  const onDelete = useCallback(
    (val: string[], idItem: number, setVal: Function) => () => {
      const deleteItem = val.filter((_, index) => index !== idItem);
      const updateItem = val.map((item, index) =>
        index === idItem ? '' : item
      );

      const newValue = idItem ? deleteItem : updateItem;

      return setVal('items', newValue);
    },
    []
  );

  return (
    <div className={styles.listTDWrap}>
      <Formik
        initialValues={{ items: value }}
        onSubmit={onSubmit}
        validationSchema={
          type === 'emails' ? contactFormEmailSchema : contactFormPhoneSchema
        }
      >
        {({ values, handleSubmit, handleChange, errors, setFieldValue }) => (
          <Form>
            <FieldArray
              name='items'
              render={arrayHelpers => (
                <div>
                  {values.items.map((item, index) => (
                    <div className={styles.listTDInput} key={index}>
                      <CommonInput
                        name={`items.${index}`}
                        value={item}
                        errorMessage={errors.items && errors.items[index]}
                        onChangeValue={handleChange}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              onClick={onDelete(
                                values.items,
                                index,
                                setFieldValue
                              )}
                              edge='end'
                            >
                              <Clear />
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </div>
                  ))}
                  <div className={styles.listTDBtns}>
                    <CommonIcon
                      onClick={() => arrayHelpers.push('')}
                      IconComponent={Add}
                      fontSize='large'
                      className={styles.icon}
                    />
                    <div className={styles.listTDBtnsForm}>
                      <CommonIcon
                        onClick={() => handleSubmit()}
                        IconComponent={Check}
                        fontSize='large'
                        className={styles.icon}
                      />
                      <CommonIcon
                        IconComponent={Close}
                        onClick={handleClose}
                        fontSize='large'
                        className={styles.icon}
                      />
                    </div>
                  </div>
                </div>
              )}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
