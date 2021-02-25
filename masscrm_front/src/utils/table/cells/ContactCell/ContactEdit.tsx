import React, { FC, useCallback, useContext } from 'react';
import { Check, Close, Add, Clear } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { CommonIcon, CommonInput } from 'src/components/common';
import { getAddContactList, updateContact, getContact } from 'src/actions';
import { getFilterSettings } from 'src/selectors';
import { styleNames } from 'src/services';
import { FieldArray, Formik, Form } from 'formik';
import { contactFormEmailSchema } from 'src/utils/form/validateEmail';
import { contactFormPhoneSchema } from 'src/utils/form/validatePhone';
import { IconButton, InputAdornment } from '@material-ui/core';
import { ErrorEmitterContext } from 'src/context';
import { IContactCell, IContactEdit } from './interfaces';
import style from '../cell.scss';
import {
  createErrorsObject,
  DoubleClickError,
  getErrorsList
} from '../../../errors';

const sn = styleNames(style);

interface IContactForm {
  items: Array<string>;
}

export const ContactEdit: FC<IContactCell & IContactEdit> = ({
  id,
  value = [],
  handleClose,
  type
}) => {
  const { errorsEventEmitter } = useContext(ErrorEmitterContext);
  const dispatch = useDispatch();
  const filter = useSelector(getFilterSettings);

  const createError = (title: string[]) => (data: any[]) => {
    const errorsObject = createErrorsObject(title, data.flat());
    errorsEventEmitter.emit('popUpErrors', {
      errorsArray: [JSON.stringify(errorsObject)]
    });
  };

  const errorCallback = (inputValue: string[]) => (errors: string) => {
    const parseError: { [x: string]: string[] } = JSON.parse(errors);

    if (getErrorsList('must be', parseError).length) {
      errorsEventEmitter.emit('snackBarErrors', {
        errorsArray: [DoubleClickError(errors)]
      });
    } else if (getErrorsList('already used', parseError).length) {
      const arrayTitle: string[] = [];
      const arrayPromises = Object.keys(parseError).reduce(
        (acc: any, cur: any) => {
          if (cur.includes('emails.')) {
            arrayTitle.push(parseError[cur].toString());
            return [
              ...acc,
              getContact({
                search: {
                  email: inputValue[Number(cur.substr(7))],
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
      errorsEventEmitter.emit('snackBarErrors', {
        errorsArray: [DoubleClickError(errors)]
      });
    }
  };

  const onSubmit = async ({ items }: IContactForm) => {
    await updateContact({ [type]: items.filter(item => !!item) }, id)
      .then(() => dispatch(getAddContactList(filter)))
      .catch(errorCallback(items));
  };

  const onDelete = useCallback(
    (val: string[], idItem: number, setVal: Function) => () => {
      const deleteItem = val.filter((item, index) => index !== idItem);
      const updateItem = val.map((item, index) =>
        index === idItem ? '' : item
      );
      const newValue = idItem !== 0 ? deleteItem : updateItem;
      return setVal('items', newValue);
    },
    []
  );

  return (
    <div className={sn('list-td_wrap')}>
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
                    <div className={sn('list-td_input')} key={index}>
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
                  <div className={sn('list-td_btns')}>
                    <CommonIcon
                      onClick={() => arrayHelpers.push('')}
                      IconComponent={Add}
                      fontSize='large'
                      className={sn('icon')}
                    />
                    <div className={sn('list-td_btns-form')}>
                      <CommonIcon
                        onClick={() => handleSubmit()}
                        IconComponent={Check}
                        fontSize='large'
                        className={sn('icon')}
                      />
                      <CommonIcon
                        IconComponent={Close}
                        onClick={handleClose}
                        fontSize='large'
                        className={sn('icon')}
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
